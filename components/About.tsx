import Image from "next/image";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { IMG } from "@/lib/brandimg";

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="mx-auto max-w-[360px]">
          <Image src={IMG.patch} alt="Red Mouth Co. round patch, Est. 2026" width={600} height={600} className="h-auto w-full" />
        </Reveal>
        <Reveal delay={80}>
          <p className="eyebrow">About</p>
          <h2 className="mt-4 text-[clamp(30px,4.4vw,50px)]">Speak Softly. Carry Fire.</h2>
          <p className="mt-5 text-[17px] text-ash">
            Red Mouth Co. is a custom finish shop in Lubbock, Texas, established in 2026. Desert colors, Aztec
            patterns, and a lot of red. We take the piece you already own and make it look like nobody else&apos;s.
          </p>
          <p className="mt-4 text-sm text-ash-dim">[[OWNER BIO / STORY: owner to provide]]</p>
        </Reveal>
      </div>
    </Section>
  );
}
