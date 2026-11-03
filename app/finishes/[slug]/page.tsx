// Ad-safe landing pages: "custom Cerakote and hydro-dip for anything metal".
// Keep these free of firearm images, words, and links (Google/Meta ad policy).
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Ticker } from "@/components/Ticker";
import { Services } from "@/components/Services";
import { How } from "@/components/How";
import { Start } from "@/components/Start";
import { Footer } from "@/components/Footer";
import { BuildProvider } from "@/components/BuildProvider";
import { AD_PAGES } from "@/lib/content";
import { IMG } from "@/lib/brandimg";

export function generateStaticParams() {
  return AD_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = AD_PAGES.find((x) => x.slug === slug);
  return p ? { title: p.h1, description: `${p.blurb} Custom Cerakote and hydro-dip in Lubbock, TX.`, openGraph: { title: p.h1, images: [{ url: "/brand/badge-mouth.webp", alt: "Red Mouth Co." }] }, twitter: { card: "summary_large_image", images: ["/brand/badge-mouth.webp"] } } : {};
}

const LINKS = [
  ...AD_PAGES.map((p) => ({ href: `/finishes/${p.slug}`, label: p.title })),
];

export default async function AdPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = AD_PAGES.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <BuildProvider>
      <Nav links={LINKS} />
      <main>
        <section className="relative overflow-hidden pt-[130px] pb-20 md:pt-[160px]">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_80%_20%,rgba(200,20,28,0.2),transparent_60%)]" />
          <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-10 px-6 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">Custom Cerakote & hydro-dip for anything metal</p>
              <h1 className="mt-5 text-[clamp(40px,6.4vw,78px)]">{p.h1}</h1>
              <p className="mt-6 max-w-[34rem] text-[clamp(17px,2vw,20px)] text-ash">{p.blurb}</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {p.items.map((i) => (
                  <li key={i} className="rounded-sm border border-line bg-panel px-3 py-1.5 text-sm text-ash">{i}</li>
                ))}
              </ul>
              <a href="#start" className="mt-9 inline-flex rounded-[2px] bg-blood px-7 py-[15px] font-display text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-blood-bright">Get a quote ›</a>
            </div>
            <Image src={IMG.badge} alt="Red Mouth Co." width={900} height={626} priority className="h-auto w-full" />
          </div>
        </section>
        <Ticker items={["Custom Cerakote", "Hydro-dipping", "Auto & moto", "Knives", "Tumblers", "Tools & gear", "Speak Softly."]} />
        <Services guns={false} />
        <How guns={false} />
        <section className="border-t border-line py-16">
          <div className="mx-auto max-w-[1180px] px-6">
            <p className="eyebrow">Gallery</p>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex aspect-square items-center justify-center rounded-md border border-dashed border-line bg-panel text-center text-xs uppercase tracking-[0.12em] text-ash-dim">[[PHOTO NEEDED]]<br />{p.title}</div>
              ))}
            </div>
          </div>
        </section>
        <Start guns={false} />
      </main>
      <Footer guns={false} />
    </BuildProvider>
  );
}
