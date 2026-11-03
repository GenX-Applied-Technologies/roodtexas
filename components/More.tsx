import { Section, SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { AD_PAGES } from "@/lib/content";

export function More() {
  return (
    <Section id="more">
      <SectionHead eyebrow="Beyond guns" title="We finish anything metal">
        Knives, tumblers, auto and bike parts, tools, and gear get the same Cerakote and hydro-dip treatment.
      </SectionHead>
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-6">
        {AD_PAGES.map((p, i) => (
          <Reveal key={p.slug} delay={i * 50}>
            <a href={`/finishes/${p.slug}`} className="block rounded-md border border-line bg-panel px-4 py-6 text-center font-display text-sm uppercase tracking-[0.08em] text-ash transition-colors hover:border-blood hover:text-bone">{p.title} →</a>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 grid gap-5 md:grid-cols-2" delay={60}>
        <div className="rounded-md border border-line bg-panel p-7">
          <h3 className="text-[20px]">Rifle builds</h3>
          <p className="mt-2 text-[14.5px] text-ash">We also put together custom AR-platform builds. Ask about options and availability. Any purchase is completed in person through a licensed dealer.</p>
        </div>
        <div className="rounded-md border border-line bg-panel p-7">
          <h3 className="text-[20px]">Find us at gun shows</h3>
          <p className="mt-2 text-[14.5px] text-ash">See finishes up close and talk through your project. [[UPCOMING SHOW DATES]]</p>
        </div>
      </Reveal>
    </Section>
  );
}
