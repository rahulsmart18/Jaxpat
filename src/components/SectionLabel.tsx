type SectionLabelProps = {
  index: string;
  tag: string;
  eyebrow?: string;
  className?: string;
};

export function SectionLabel({
  index,
  tag,
  eyebrow,
  className = "",
}: SectionLabelProps) {
  return (
    <div className={`flex flex-wrap items-start gap-5 sm:gap-6 ${className}`}>
      <span className="font-sans text-[11px] tabular-nums tracking-[0.22em] text-neutral-600 sm:text-xs sm:tracking-[0.2em]">
        {index}
      </span>
      <div className="space-y-1.5 sm:space-y-2">
        <p className="font-sans text-[11px] uppercase leading-snug tracking-[0.32em] sm:tracking-[0.35em]">
          <span className="text-portoAccent">{"//"}</span>{" "}
          <span className="text-neutral-400">{tag}</span>
        </p>
        {eyebrow ? (
          <p className="font-sans text-[11px] text-neutral-500 sm:text-xs">
            {eyebrow}
          </p>
        ) : null}
      </div>
    </div>
  );
}
