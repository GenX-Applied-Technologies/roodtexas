import { Section, SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { COLORWAYS } from "@/lib/content";

export function Colorways() {
  return (
    <Section id="colorways">
      <SectionHead eyebrow="Color ideas" title="Start with a house color">
        A few starting points. Bring your own color, match a truck, or mix a pattern. If you can describe it,
        we can quote it.
      </SectionHead>

      <div className="grid gap-5 md:grid-cols-3">
        {COLORWAYS.map((c, i) => (
          <Reveal key={c.name} delay={i * 90}>
            <div className="group h-full overflow-hidden rounded-md border border-line bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-blood/50">
              <div className="relative h-52" style={{ background: c.css }}>
                <div className="absolute inset-0 bg-[repeating-linear-gradient(120deg,transparent_0_18px,rgba(0,0,0,0.06)_18px_19px)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.16em] text-ash-dim">{c.type}</div>
                <h3 className="mb-1.5 mt-2 text-[22px]">{c.name}</h3>
                <p className="text-sm text-ash">{c.blurb}</p>
                <span className="mt-3.5 inline-block rounded-[2px] border border-blood/40 px-2.5 py-1 font-display text-[11px] uppercase tracking-[0.14em] text-blood">
                  Example
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
