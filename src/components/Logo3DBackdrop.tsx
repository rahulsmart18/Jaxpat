"use client";

/**
 * Logo3DBackdrop — Three.js sub-background layer.
 *
 * Sits between `PortoBackdrop` (z-0) and the page content (z-10) as a
 * `pointer-events-none` fixed canvas. Uses the Jaxpat mono logo PNG mapped
 * across stacked, depth-offset planes for a holographic / parallax look,
 * surrounded by slowly orbiting wireframe shapes in the brand palette.
 *
 * Motion is driven by:
 *  – GSAP intro timeline (scale + rotation + opacity)
 *  – useFrame lerp toward pointer position (parallax)
 *  – Window scroll (rotation drift + fade-out further down the page)
 */

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { brandColors } from "@/lib/brand-colors";
import { BRAND_LOGOS } from "@/lib/brand-logos";

const LOGO_SRC = BRAND_LOGOS.mono;

/**
 * Stacked, depth-offset logo planes.
 *
 *  – Back/middle layers use ADDITIVE blending → coloured chromatic glow.
 *    These need something underneath to add to, so on pure dark sections
 *    they nearly vanish; that's why we also need a front layer.
 *  – Front layer uses NORMAL blending with a silver tint → this is what
 *    actually gives the logo a *shape* on every section regardless of
 *    background luminance. Without it the logo "disappears" past the hero.
 */
type LogoLayer = {
  z: number;
  scale: number;
  opacity: number;
  color: string;
  blending: THREE.Blending;
};

const LOGO_LAYERS: LogoLayer[] = [
  {
    z: -0.55,
    scale: 1.16,
    opacity: 0.18,
    color: brandColors.navy,
    blending: THREE.AdditiveBlending,
  },
  {
    z: -0.28,
    scale: 1.08,
    opacity: 0.28,
    color: brandColors.blue,
    blending: THREE.AdditiveBlending,
  },
  {
    z: -0.08,
    scale: 1.02,
    opacity: 0.32,
    color: brandColors.blueBright,
    blending: THREE.AdditiveBlending,
  },
  {
    z: 0.0,
    scale: 1.0,
    opacity: 0.42,
    color: brandColors.silver,
    blending: THREE.NormalBlending,
  },
];

function LogoStack() {
  const texture = useLoader(THREE.TextureLoader, LOGO_SRC);

  // Texture tuning — keep alpha crisp and avoid color-space surprises.
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  const aspect = useMemo(() => {
    const img = texture.image as { width: number; height: number } | undefined;
    if (!img?.width || !img?.height) return 1;
    return img.width / img.height;
  }, [texture]);

  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  useEffect(() => {
    if (!group.current) return;
    const g = group.current;

    g.scale.setScalar(0.55);
    g.rotation.set(0.35, -0.6, -0.25);

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(g.scale, { x: 1, y: 1, z: 1, duration: 2.4 }, 0);
    tl.to(g.rotation, { x: 0, y: 0, z: 0, duration: 2.6 }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    const d = Math.min(delta, 0.05);
    const lerp = 1 - Math.pow(0.001, d); // frame-rate independent smoothing

    /**
     * Pointer-driven parallax only — no scroll-driven rotation/tilt/slide.
     * The group eases toward a rotation + offset proportional to the
     * normalized pointer position, with a gentle idle bob on Y.
     */
    const targetRotY = pointer.current.x * 0.28;
    const targetRotX = -pointer.current.y * 0.18;
    const targetPosX = pointer.current.x * 0.25;
    const targetPosY =
      Math.sin(performance.now() * 0.0004) * 0.12 - pointer.current.y * 0.1;

    g.rotation.y += (targetRotY - g.rotation.y) * lerp;
    g.rotation.x += (targetRotX - g.rotation.x) * lerp;
    g.rotation.z += (0 - g.rotation.z) * lerp;
    g.position.x += (targetPosX - g.position.x) * lerp;
    g.position.y += (targetPosY - g.position.y) * lerp;
  });

  // Smaller footprint than before so it ghosts behind the hero rather
  // than overlapping the JAXPAT wordmark + head silhouette.
  const baseHeight = 2.2;
  const baseWidth = baseHeight * aspect;

  return (
    <group ref={group}>
      {LOGO_LAYERS.map((layer, i) => (
        <mesh key={i} position={[0, 0, layer.z]} scale={layer.scale}>
          <planeGeometry args={[baseWidth, baseHeight]} />
          <meshBasicMaterial
            map={texture}
            color={layer.color}
            transparent
            opacity={layer.opacity}
            depthWrite={false}
            blending={layer.blending}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

type OrbitShapeProps = {
  radius: number;
  speed: number;
  phase: number;
  yOffset: number;
  size: number;
  color: string;
  detail?: number;
};

function OrbitShape({
  radius,
  speed,
  phase,
  yOffset,
  size,
  color,
  detail = 0,
}: OrbitShapeProps) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const t = clock.elapsedTime * speed + phase;
    m.position.x = Math.cos(t) * radius;
    m.position.z = Math.sin(t) * radius - 0.5;
    m.position.y = yOffset + Math.sin(t * 1.3) * 0.25;
    m.rotation.x += 0.003;
    m.rotation.y += 0.005;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[size, detail]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
    </mesh>
  );
}

/**
 * Per-section ring color palette — "neon tech" hues inspired by the
 * circuit-board / acrylic-cube reference imagery. Each section emits a
 * different contrasting color as the user scrolls.
 *
 * Order is tuned for adjacent-section contrast (blue → magenta → green →
 * amber → violet → cyan → pink → gold) so two consecutive scrolls never
 * land on similar hues.
 */
const SECTION_RING_COLORS = [
  new THREE.Color("#1A7FED"), // electric blue (brand)
  new THREE.Color("#B14AFF"), // vivid purple
  new THREE.Color("#22FF88"), // neon mint / green
  new THREE.Color("#FF3D8C"), // hot magenta
  new THREE.Color("#00E5FF"), // neon cyan
  new THREE.Color("#FFB13D"), // amber gold
  new THREE.Color("#7B61FF"), // violet
  new THREE.Color("#3DFFE3"), // teal aqua
];

/**
 * Pick a palette color based on which `<section>` is currently dominant
 * in the viewport. Falls back to a scroll-progress mapping if no
 * sections are found (e.g. on pages without `<section>` markup).
 */
function pickRingColor(): THREE.Color {
  if (typeof window === "undefined") return SECTION_RING_COLORS[0];

  const sections = document.querySelectorAll<HTMLElement>("main section");
  if (sections.length > 0) {
    // Find the section whose top edge is closest to (or just past) the
    // viewport's vertical midpoint — that's the "currently reading" one.
    const focus = window.innerHeight * 0.4;
    let bestIdx = 0;
    let bestDist = Infinity;
    sections.forEach((s, i) => {
      const top = s.getBoundingClientRect().top;
      const dist = Math.abs(top - focus);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    return SECTION_RING_COLORS[bestIdx % SECTION_RING_COLORS.length];
  }

  const doc = document.documentElement;
  const max = Math.max(doc.scrollHeight - window.innerHeight, 1);
  const t = Math.min(0.999, Math.max(0, window.scrollY / max));
  const idx = Math.floor(t * SECTION_RING_COLORS.length);
  return SECTION_RING_COLORS[Math.min(idx, SECTION_RING_COLORS.length - 1)];
}

/**
 * Concentric ring particle system.
 *
 *  – Each "burst" spawns N particles distributed evenly around 360°,
 *    travelling outward at a shared speed → they form an expanding ring.
 *  – Fast scrolling queues multiple rings, drained at fixed intervals so
 *    they read as separate concentric circles rather than one cloud.
 *  – Ring color is picked from the section palette at spawn time, so each
 *    section of the page emits its own contrasting ring.
 *  – Particle lifetime + outward velocity are tuned so rings reach the
 *    viewport edges before fading.
 */
function ParticleField() {
  const COUNT = 360;
  const pointsRef = useRef<THREE.Points>(null);

  /** Per-particle CPU-side state (life=0 means dead/available for reuse). */
  const state = useMemo(() => {
    return {
      positions: new Float32Array(COUNT * 3),
      velocities: new Float32Array(COUNT * 3),
      colors: new Float32Array(COUNT * 3),
      life: new Float32Array(COUNT),
      maxLife: new Float32Array(COUNT),
    };
  }, []);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(state.positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(state.colors, 3));
    // Park all particles far off-screen until spawned.
    for (let i = 0; i < COUNT; i++) {
      state.positions[i * 3 + 1] = -9999;
    }
    return g;
  }, [state]);

  type RingDirection = "out" | "in";

  /**
   * Queue of pending rings tagged with direction.
   *  – "out" = scroll-down → particles spawn near the logo and fly outward
   *  – "in"  = scroll-up   → particles spawn far away and converge inward
   *    into the logo, "absorbing" when they reach the center.
   */
  const ringQueue = useRef<RingDirection[]>([]);
  const lastRingAt = useRef(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  /** Ambient ring timer so the system breathes even when idle. */
  const ambientTimer = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    lastScrollY.current = window.scrollY;
    lastScrollTime.current = performance.now();

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastScrollTime.current);
      const dy = window.scrollY - lastScrollY.current;
      const velocity = Math.abs(dy) / dt; // px/ms
      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;
      if (dy === 0) return;

      // velocity ~2 = casual scroll → 1 ring, ~6 = flick → 3 rings.
      const ringsToQueue = Math.floor(velocity * 0.8);
      if (ringsToQueue <= 0) return;

      const direction: RingDirection = dy > 0 ? "out" : "in";
      for (
        let i = 0;
        i < ringsToQueue && ringQueue.current.length < 6;
        i++
      ) {
        ringQueue.current.push(direction);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Spawn one ring. Direction controls geometry:
   *  – "out": start near logo, velocity points outward, dies at end of life.
   *  – "in":  start far away (off-screen), velocity points toward center,
   *           dies on arrival (absorbed by the logo).
   */
  /**
   * Radius of the logo's outer silhouette. Both outward and inward rings
   * use this as their interface with the logo: outward particles *start*
   * here and fly out; inward particles *end* here (they're killed when
   * they reach this boundary, so they never overlap the logo itself).
   */
  const LOGO_EDGE_RADIUS = 1.15;

  function spawnRing(particlesPerRing: number, direction: RingDirection) {
    const { positions, velocities, colors, life, maxLife } = state;
    const ringColor = pickRingColor();

    // Find available slots first so we know our actual ring size.
    const slots: number[] = [];
    for (let i = 0; i < COUNT && slots.length < particlesPerRing; i++) {
      if (life[i] <= 0) slots.push(i);
    }
    const n = slots.length;
    if (n === 0) return;

    const isOutward = direction === "out";
    // Outward rings start at the logo edge; inward rings start far away.
    const startRadius = isOutward
      ? LOGO_EDGE_RADIUS + Math.random() * 0.2
      : 4.6 + Math.random() * 0.6;
    // Speed is similar in both directions so travel time ≈ lifetime.
    const speed = 1.6 + Math.random() * 0.5;
    // Inward particles need enough life to reach the edge from far away.
    const lifeBase = isOutward
      ? 2.4
      : Math.max(1.4, (startRadius - LOGO_EDGE_RADIUS) / speed + 0.3);
    const angleOffset = Math.random() * Math.PI * 2;

    for (let k = 0; k < n; k++) {
      const i = slots[k];
      const ix = i * 3;
      const angle =
        angleOffset + (k / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
      const cx = Math.cos(angle);
      const cy = Math.sin(angle);

      positions[ix] = cx * startRadius;
      positions[ix + 1] = cy * startRadius;
      positions[ix + 2] = (Math.random() - 0.5) * 0.4;

      // Outward: +radial. Inward: -radial (toward origin).
      const dirSign = isOutward ? 1 : -1;
      velocities[ix] = cx * speed * dirSign;
      velocities[ix + 1] = cy * speed * dirSign;
      velocities[ix + 2] = (Math.random() - 0.5) * 0.2;

      colors[ix] = ringColor.r;
      colors[ix + 1] = ringColor.g;
      colors[ix + 2] = ringColor.b;

      const lifeSeconds = lifeBase + Math.random() * 0.8;
      life[i] = lifeSeconds;
      maxLife[i] = lifeSeconds;
    }
  }

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const { positions, velocities, life } = state;
    const now = performance.now();
    // Advance shader clock so the neon pulse keeps moving.
    uniforms.uTime.value += d;

    // Drain queued rings with a small gap so they read as concentric.
    if (ringQueue.current.length > 0 && now - lastRingAt.current > 140) {
      const dir = ringQueue.current.shift() as RingDirection;
      spawnRing(48, dir);
      lastRingAt.current = now;
    }

    // Ambient outward ring every ~3s so the layer keeps breathing when idle.
    ambientTimer.current += d;
    if (ambientTimer.current > 3.0) {
      ambientTimer.current = 0;
      spawnRing(36, "out");
    }

    // Integrate motion + lifetime. Velocity is preserved (no gravity) so
    // rings keep their circular shape as they travel.
    for (let i = 0; i < COUNT; i++) {
      if (life[i] <= 0) continue;
      const ix = i * 3;
      positions[ix] += velocities[ix] * d;
      positions[ix + 1] += velocities[ix + 1] * d;
      positions[ix + 2] += velocities[ix + 2] * d;
      life[i] -= d;

      // Inward particles stop at the *edge* of the logo so they never
      // overlap the silhouette. Only kill those still moving toward the
      // center, so outward particles passing nearby are untouched.
      const r2 =
        positions[ix] * positions[ix] +
        positions[ix + 1] * positions[ix + 1];
      if (r2 < LOGO_EDGE_RADIUS * LOGO_EDGE_RADIUS) {
        const movingInward =
          positions[ix] * velocities[ix] +
            positions[ix + 1] * velocities[ix + 1] <
          0;
        if (movingInward) {
          life[i] = 0;
        }
      }

      if (life[i] <= 0) {
        positions[ix + 1] = -9999;
      }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  });

  // Pixel-ratio-aware sizing so particles render crisp on retina without
  // becoming oversized on standard displays. uTime drives a subtle
  // per-particle pulse so the neon feels alive instead of static.
  const dpr = useThree((s) => s.gl.getPixelRatio());
  const { size } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  /**
   * Base point size in screen pixels at z=6, before DPR + viewport scaling.
   * On mobile the scene group shrinks (≈ 0.5×) but DPR roughly doubles, so
   * without compensation particles look ~2× too large and the additive
   * bloom is overpowering. Scaling `uSize` by the same factor as the
   * scene group restores visual parity with desktop.
   */
  const BASE_POINT_SIZE = 110;

  const uniforms = useMemo(
    () => ({
      uSize: { value: BASE_POINT_SIZE },
      uPixelRatio: { value: dpr },
      uBrightness: { value: 1 },
      uTime: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  useEffect(() => {
    uniforms.uPixelRatio.value = dpr;
  }, [dpr, uniforms]);

  // Keep point size + overall brightness in lockstep with the scene scale.
  // Brightness curve is gentler than the size curve so the layer still
  // reads on mobile while not blooming hot.
  useEffect(() => {
    const scale = computeSceneScale(size.width, size.height);
    uniforms.uSize.value = BASE_POINT_SIZE * scale;
    // 1.0 at desktop → ~0.65 on a typical phone portrait.
    uniforms.uBrightness.value = 0.6 + 0.4 * scale;
  }, [size.width, size.height, uniforms]);

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={PARTICLE_VERTEX_SHADER}
        fragmentShader={PARTICLE_FRAGMENT_SHADER}
      />
    </points>
  );
}

/**
 * Vertex shader — passes per-particle color through, computes a
 * perspective-correct point size, and forwards a per-particle phase
 * (derived from world position) into the fragment shader so each
 * particle pulses out of sync from its neighbours.
 *
 * `attribute vec3 color` is declared manually because `ShaderMaterial`
 * with a fully-custom shader doesn't auto-inject color attributes the
 * way `PointsMaterial` does.
 */
const PARTICLE_VERTEX_SHADER = /* glsl */ `
  attribute vec3 color;
  uniform float uSize;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vPhase;

  void main() {
    vColor = color;
    // Cheap pseudo-random phase from the spawn position so particles
    // don't pulse in lockstep.
    vPhase = fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    // Size falls off with depth; multiplied by DPR for crispness on retina.
    gl_PointSize = uSize * uPixelRatio / -mvPosition.z;
  }
`;

/**
 * Fragment shader — emissive "neon tube" look, NOT a shaded sphere.
 *
 *   – `core`  : tight white-hot center (the filament)
 *   – `inner` : saturated colored ring just outside the core
 *   – `outer` : wide soft halo bleeding past the bead → bloom feel
 *   – `pulse` : ±10% brightness oscillation, phase-offset per particle
 *
 * Combined with additive blending and a soft full-disc alpha falloff,
 * overlapping particles accumulate into a real-looking neon glow.
 */
const PARTICLE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uBrightness;
  varying vec3 vColor;
  varying float vPhase;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    // Normalise distance from center: 0 at core, 1 at edge of disc.
    float t = d * 2.0;

    // White-hot filament: very tight peak at center.
    float core = pow(max(0.0, 1.0 - t), 10.0);
    // Colored neon ring just outside the core.
    float inner = pow(max(0.0, 1.0 - t), 3.0);
    // Wide soft halo — what gives neon its bleed/bloom.
    float outer = pow(max(0.0, 1.0 - t), 1.3) * 0.55;

    // Per-particle pulse (±10%) — keeps the field alive.
    float pulse = 0.9 + 0.1 * sin(uTime * 2.6 + vPhase * 6.2831);

    // Slightly oversaturated color so the additive bloom doesn't wash
    // it out to pure white when many particles overlap.
    vec3 neon = vColor * 1.15;

    vec3 col = vec3(1.0) * core * 1.4
             + neon * inner * 1.1
             + neon * outer * 0.85;
    col *= pulse * uBrightness;

    // Soft full-disc alpha falloff — the halo bleeds out to the edge
    // instead of stopping at a hard rim. Also damped by viewport
    // brightness so mobile gets less additive bloom from overlap.
    float alpha = pow(max(0.0, 1.0 - t), 2.0) * 0.9 * uBrightness;
    gl_FragColor = vec4(col, alpha);
  }
`;

/**
 * Pure formula version of {@link useResponsiveSceneScale} so other
 * components (e.g. the particle shader sizing) can match the same scale
 * without re-running the React hook.
 */
function computeSceneScale(width: number, height: number): number {
  if (!height) return 1;
  const aspect = width / height;
  if (aspect >= 1.4) return 1;
  // Linear ramp 1.4 → 0.45 maps to scale 1.0 → 0.42.
  const t = (aspect - 0.45) / (1.4 - 0.45);
  return Math.max(0.42, Math.min(1, 0.42 + t * (1 - 0.42)));
}

/**
 * Computes a uniform scale for the whole 3D scene based on the canvas
 * aspect ratio so the logo + particle rings stay visible on narrow
 * mobile viewports where the frustum width is much smaller than desktop.
 *
 *   aspect ≥ 1.4 (wide desktop)        → 1.0
 *   aspect ≈ 1.0 (square / tablet)     → 0.78
 *   aspect ≈ 0.56 (typical mobile)     → 0.50
 *   aspect ≤ 0.45 (very tall portrait) → 0.42 (floor)
 */
function useResponsiveSceneScale(): number {
  const { size } = useThree();
  return useMemo(
    () => computeSceneScale(size.width, size.height),
    [size.width, size.height],
  );
}

function Scene() {
  const sceneScale = useResponsiveSceneScale();

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={0.7}
        color={brandColors.blueBright}
      />
      <directionalLight
        position={[-5, -3, 2]}
        intensity={0.3}
        color={brandColors.navy}
      />

      <group scale={sceneScale}>
        <Suspense fallback={null}>
          <LogoStack />
        </Suspense>

        <ParticleField />

        {/* Orbits sit wider than the hero text column so they don't crowd it. */}
        <OrbitShape
          radius={4.8}
          speed={0.18}
          phase={0}
          yOffset={0.5}
          size={0.45}
          color={brandColors.blue}
        />
        <OrbitShape
          radius={5.4}
          speed={-0.12}
          phase={Math.PI * 0.7}
          yOffset={-0.7}
          size={0.35}
          color={brandColors.blueBright}
          detail={1}
        />
        <OrbitShape
          radius={6.0}
          speed={0.08}
          phase={Math.PI}
          yOffset={1.2}
          size={0.55}
          color={brandColors.navy}
        />
      </group>
    </>
  );
}

export function Logo3DBackdrop() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  /**
   * Wrapper opacity stays steady at `BASE_OPACITY` across the entire page
   * so the logo never disappears — the per-layer opacities are already
   * low enough that it reads as backdrop rather than competing content.
   * A small dip on the hero hands attention to the JAXPAT wordmark, then
   * recovers as you scroll into sections where the wordmark is gone.
   */
  const BASE_OPACITY = 0.7;
  const HERO_DIP = 0.28; // how much to dim while hero is in view

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0 });
    const tween = gsap.to(el, {
      opacity: BASE_OPACITY - HERO_DIP,
      duration: 1.6,
      ease: "expo.out",
      delay: 0.2,
    });

    const onScroll = () => {
      // Dip is strongest at scroll=0, fully gone by the time hero leaves.
      const heroEnd = window.innerHeight * 0.9;
      const past = Math.min(1, window.scrollY / heroEnd);
      const next = BASE_OPACITY - HERO_DIP * (1 - past);
      gsap.to(el, {
        opacity: next,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      tween.kill();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.75]}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default Logo3DBackdrop;
