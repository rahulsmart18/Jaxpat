import { awards } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export function Awards() {
  return (
    <section className="border-t border-portoLine px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="08" tag="Highlights" eyebrow="Capabilities" />
        </Reveal>
        <div className="mt-14">
          <Reveal delay={0.05}>
            <h2 className="font-display text-porto-display-sm font-semibold uppercase text-white">
              Delivery focus
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {awards.map((a, i) => (
              <Reveal key={a.title} delay={0.08 * i}>
                <article className="flex h-full flex-col border border-portoLine bg-white/[0.02] p-8">
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                    {a.title}
                  </p>
                  <p className="mt-4 font-display text-xl text-white">
                    {a.subtitle}
                  </p>
                  <p className="mt-2 font-sans text-xs text-neutral-600">
                    {a.year}
                  </p>
                  <p className="porto-body porto-muted mt-6 flex-1">
                    {a.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
