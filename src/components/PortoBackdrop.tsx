/**
 * Global background: vertical guide lines + subtle dot grid (Framer BG Lines / BG Pattern).
 */
export function PortoBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "url(https://framerusercontent.com/images/ldf53R2pKtKErtQpdz1GxxWt2I.svg)",
          backgroundSize: "13px auto",
        }}
      />
      <div className="absolute inset-y-0 left-[16.666%] w-px bg-gradient-to-b from-transparent via-white/[0.11] to-transparent" />
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.11] to-transparent" />
      <div className="absolute inset-y-0 left-[83.333%] w-px bg-gradient-to-b from-transparent via-white/[0.11] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_42%_at_50%_0%,rgba(255,255,255,0.065),transparent_68%)]" />
    </div>
  );
}
