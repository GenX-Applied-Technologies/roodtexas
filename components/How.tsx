import { Section, SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { BRAND } from "@/lib/content";

export function How({ guns = true }: { guns?: boolean }) {
  const steps = [
    ["01", "Request a quote", "Tell us what you have, the look you want, and send a photo if you can."],
    ["02", "Drop off or mail in", guns ? "Bring it to the shop, or contact us before shipping and we confirm what is required for your item." : "Bring it to the shop or ship it in. We send packing instructions with your quote."],
    ["03", "Prep & finish", "Stripped, blasted, coated or dipped, cured, and inspected."],
    ["04", "Pick up or ship back", "Ready when we say it will be. You approve photos before it leaves."],
  ];
  return (
    <Section id="how">
      <SectionHead eyebrow="Mail-in or drop-off" title="How it works">
        Local in {BRAND.city}? Drop it off. Not local? Mail-in service is available.
      </SectionHead>
      <div className="grid gap-5 md:grid-cols-4">
        {steps.map(([n, t, b], i) => (
          <Reveal key={n} delay={i * 70}>
            <div className="h-full rounded-md border border-line bg-panel p-7">
              <div className="font-display text-[40px] font-bold leading-none text-blood/70">{n}</div>
              <h3 className="mt-3 text-[20px]">{t}</h3>
              <p className="mt-2 text-[14.5px] text-ash">{b}</p>
            </div>
          </Reveal>
        ))}
      </div>
      {guns && (
        <Reveal className="mt-8 flex max-w-[820px] items-start gap-5 rounded-md border border-line bg-panel p-7" delay={60}>
          <div className="shrink-0 text-[26px] text-blood">⚠</div>
          <p className="text-[14.5px] text-ash">
            <b className="text-bone">Firearm intake and returns follow federal, state, and carrier rules.</b> Contact us
            before shipping any firearm so we can confirm what is required. Where a transfer is needed, it goes through
            a licensed dealer. We do not sell or ship firearms through this website. {BRAND.ffl}
          </p>
        </Reveal>
      )}
    </Section>
  );
}
