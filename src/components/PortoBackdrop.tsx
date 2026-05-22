/**
 * Global background — balanced to logo-original (navy left / blue right on black).
 */
export function PortoBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(https://framerusercontent.com/images/ldf53R2pKtKErtQpdz1GxxWt2I.svg)",
          backgroundSize: "13px auto",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 52% 48% at 14% 38%, rgba(11, 29, 53, 0.42), transparent 62%),
            radial-gradient(ellipse 48% 44% at 86% 42%, rgba(0, 86, 179, 0.22), transparent 60%),
            radial-gradient(ellipse 70% 55% at 50% 100%, rgba(6, 18, 32, 0.65), transparent 70%)
          `,
        }}
      />

      <div className="absolute inset-y-0 left-[16.666%] w-px bg-gradient-to-b from-transparent via-[rgba(11,29,53,0.35)] to-transparent" />
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />
      <div className="absolute inset-y-0 left-[83.333%] w-px bg-gradient-to-b from-transparent via-[rgba(0,86,179,0.28)] to-transparent" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_42%_at_50%_0%,rgba(232,238,245,0.035),transparent_68%)]" />
    </div>
  );
}
