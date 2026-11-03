import Image from "next/image";
import { IMG } from "@/lib/brandimg";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[120px] pb-24 md:pt-[150px] md:pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 md:left-auto md:right-0 md:h-full md:w-[55%]">
          <Image src={IMG.rifle} alt="Custom red Cerakote AR-15 build with flat dark earth furniture" fill priority sizes="(max-width: 768px) 100vw, 55vw" className="object-cover object-center" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/50 to-transparent md:block" />
          <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-transparent to-ink/40 md:block" />
          <div className="absolute inset-0 bg-ink/50 md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35 md:hidden" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_82%_18%,rgba(200,20,28,0.18),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] px-6">
        <p className="eyebrow">Custom gun Cerakote & hydro-dipping · Lubbock, Texas</p>
        <h1 className="mt-5 text-[clamp(44px,7.6vw,92px)] tracking-[0.004em]">
          Make it
          <br />
          <span className="text-blood">yours.</span>
        </h1>
        <p className="mt-4 font-display text-[clamp(16px,2vw,22px)] uppercase tracking-[0.18em] stone-text">Speak Softly. Carry Fire.</p>
        <p className="mt-6 max-w-[34rem] text-[clamp(17px,2vw,20px)] text-ash">
          Red Mouth Co. personalizes firearms with custom Cerakote and hydro-dip finishes: solid colors, two-tone,
          camo, Aztec and southwest patterns, battleworn, and one-off designs. Drop it off or mail it in.
        </p>
        <div className="mt-9 flex flex-wrap gap-3.5">
          <a href="#start" className="inline-flex items-center gap-2.5 rounded-[2px] bg-blood px-7 py-[15px] font-display text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all hover:-translate-y-0.5 hover:bg-blood-bright">Request a quote ›</a>
          <a href="#ai-preview" className="inline-flex items-center gap-2.5 rounded-[2px] border border-line px-7 py-[15px] font-display text-sm font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:border-blood">Try the AI preview</a>
        </div>
        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6">
          {[["Cerakote", "Colors & patterns"], ["Hydro-dip", "Printed films"], ["Mail-in", "Or local drop-off"]].map(([num, lbl]) => (
            <div key={lbl}>
              <div className="font-display text-[30px] font-bold">{num}</div>
              <div className="mt-0.5 text-xs uppercase tracking-[0.14em] text-ash-dim">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
