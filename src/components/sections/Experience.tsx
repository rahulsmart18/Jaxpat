import { experience } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-portoLine px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="07" tag="Experience" eyebrow="2008 - Present" />
        </Reveal>
        <div className="mt-14">
          <Reveal delay={0.05}>
            <h2 className="font-display text-porto-display-sm font-semibold uppercase text-white">
              Experience
            </h2>
          </Reveal>
          <div className="mt-10 space-y-0 divide-y divide-portoLine border-y border-portoLine">
            {experience.map((job, i) => (
              <Reveal key={`${job.company}-${job.period}`} delay={0.06 * i}>
                <div className="grid gap-6 py-10 md:grid-cols-[220px_1fr] md:gap-12">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {job.company}
                    </h3>
                    <p className="porto-body porto-muted mt-2">{job.role}</p>
                    <p className="mt-3 font-sans text-xs text-neutral-600">
                      {job.period}
                    </p>
                  </div>
                  <p className="porto-body porto-muted max-w-2xl">
                    {job.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
