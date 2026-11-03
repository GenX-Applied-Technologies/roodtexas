import { Section, SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { LeadForm } from "./LeadForm";
import { BRAND } from "@/lib/content";

export function Start({ guns = true }: { guns?: boolean }) {
  return (
    <Section id="start">
      <SectionHead eyebrow="Request a quote" title="Tell us what you want finished">
        Send the details and a photo if you have one. We follow up with a quote and next steps.
      </SectionHead>
      <Reveal>
        <LeadForm guns={guns} />
      </Reveal>
      <Reveal className="mt-10 grid max-w-[820px] gap-4 text-sm text-ash sm:grid-cols-2" delay={60}>
        <div><b className="text-bone">Phone:</b> {BRAND.phone}</div>
        <div><b className="text-bone">Email:</b> {BRAND.email}</div>
        <div><b className="text-bone">Shop:</b> {BRAND.address}</div>
        <div><b className="text-bone">Hours:</b> {BRAND.hours}</div>
      </Reveal>
    </Section>
  );
}
