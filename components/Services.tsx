import Image from "next/image";
import { Section, SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { SERVICES } from "@/lib/content";
import { IMG } from "@/lib/brandimg";

export function Services({ guns = true }: { guns?: boolean }) {
  return (
    <Section id="services">
      <SectionHead eyebrow="Cerakote & hydro-dip" title={guns ? "Personalize your firearm" : "Custom finishes for anything metal"}>
        {guns
          ? "Rifles, pistols, slides, uppers, lowers, and parts. Pick a color, a pattern, or bring an idea and we will work it out with you. Every job is quoted up front."
          : "Parts, knives, tumblers, tools, and gear. Pick a color, a pattern, or bring an idea and we will work it out with you. Every job is quoted up front."}
      </SectionHead>

      {guns && (
        <Reveal className="relative mb-8 overflow-hidden rounded-lg border border-line">
          <div className="relative min-h-[380px] w-full md:min-h-0 md:aspect-[21/8]">
            <Image src={IMG.rifle} alt="Red Cerakote AR-15 by Red Mouth Co." fill sizes="(max-width: 1180px) 100vw, 1180px" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent md:bg-gradient-to-r md:from-ink/90 md:via-ink/30 md:to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-7 md:max-w-md md:justify-center md:p-12">
              <p className="font-display text-[clamp(22px,3vw,34px)] uppercase leading-tight">One of one, not off the shelf</p>
              <p className="mt-3 max-w-md text-sm text-ash">Red Cerakote with flat dark earth furniture: one of our own builds.</p>
            </div>
          </div>
        </Reveal>
      )}

      <Reveal className="overflow-hidden rounded-md border border-line bg-panel" delay={80}>
        {SERVICES.map((s) => (
          <div key={s.name} className="grid items-center gap-3 border-b border-line px-6 py-[22px] transition-colors last:border-0 hover:bg-panel-2 md:grid-cols-[1.3fr_0.7fr_2fr] md:gap-5">
            <div className="font-display text-[18px] font-semibold uppercase tracking-[0.04em]">{s.name}</div>
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-blood">{s.tier} · Quote</div>
            <div className="text-sm text-ash">{s.note}</div>
          </div>
        ))}
      </Reveal>
      <p className="mt-4 text-xs text-ash-dim">Pricing depends on the piece, prep, and pattern. [[PRICING / STARTING-AT PRICES: owner to confirm]]</p>
    </Section>
  );
}
