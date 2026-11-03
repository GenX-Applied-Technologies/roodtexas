import Image from "next/image";
import { Section, SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { IMG } from "@/lib/brandimg";

export function Gallery() {
  const ph = ["Two-tone handgun", "Hydro-dip camo", "Aztec pattern", "Battleworn", "Knife / tumbler"];
  return (
    <Section id="gallery">
      <SectionHead eyebrow="Gallery" title="Recent work">
        New before-and-afters go up here as jobs come off the bench.
      </SectionHead>
      <div className="grid gap-4 md:grid-cols-3">
        <Reveal className="relative overflow-hidden rounded-md border border-line md:col-span-2 md:row-span-2">
          <div className="relative aspect-[3/2] h-full">
            <Image src={IMG.rifle} alt="Maroon Cerakote AR-15 with FDE furniture" fill sizes="(max-width: 768px) 100vw, 780px" className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-sm bg-ink/80 px-3 py-1 font-display text-xs uppercase tracking-[0.12em]">Red Cerakote · FDE furniture</span>
          </div>
        </Reveal>
        {ph.map((p) => (
          <div key={p} className="flex aspect-[3/2] items-center justify-center rounded-md border border-dashed border-line bg-panel p-4 text-center text-xs uppercase tracking-[0.12em] text-ash-dim">
            [[PHOTO NEEDED]]<br />{p}
          </div>
        ))}
      </div>
    </Section>
  );
}
