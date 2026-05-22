import { voiceGallery } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import Image from "next/image";

export function VoiceOfGrey() {
  return (
    <section className="border-t border-portoLine px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="05" tag="Voice Of Jaxpat" eyebrow="Since 2000" />
        </Reveal>
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal delay={0.05}>
            <p className="porto-body max-w-xl text-white">
              Jaxpat Technology is a Chennai-based, product-based engineering
              company helping
              teams ship modern software in 2026: Next.js and Three.js web
              products, Android Studio and Flutter mobile apps, AI integrations
              with RAG, cloud APIs, MongoDB Atlas/Supabase data layers, and
              production-ready VR/AR experiences.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {voiceGallery.map((src) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-xl border border-portoLine bg-neutral-900"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
