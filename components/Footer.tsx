import Image from "next/image";
import { BRAND, AD_PAGES } from "@/lib/content";
import { IMG } from "@/lib/brandimg";

export function Footer({ guns = true }: { guns?: boolean }) {
  const cols = [
    {
      title: "Finishes",
      links: guns
        ? [
            { label: "Cerakote & hydro-dip", href: "/#services" },
            { label: "Mail-in / drop-off", href: "/#how" },
            { label: "Visualizer", href: "/#visualizer" },
            { label: "Gallery", href: "/#gallery" },
          ]
        : AD_PAGES.map((p) => ({ label: p.title, href: `/finishes/${p.slug}` })),
    },
    { title: "Follow", links: BRAND.socials.map((s) => ({ label: `${s.label} ${s.note}`, href: s.href })) },
    {
      title: "Contact",
      links: [
        { label: `Phone: ${BRAND.phone}`, href: "#start" },
        { label: `Email: ${BRAND.email}`, href: "#start" },
        { label: BRAND.address, href: "#start" },
        { label: "Request a quote", href: "#start" },
      ],
    },
  ];
  return (
    <footer className="border-t border-line pb-10 pt-16">
      <div className="aztec-band mb-14" />
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-[300px]">
            <Image src={IMG.patch} alt="Red Mouth Co. patch" width={120} height={120} />
            <p className="mt-3.5 text-sm text-ash">Custom Cerakote and hydro-dip finishes. {BRAND.city}. {BRAND.est}.</p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-display text-xs uppercase tracking-[0.16em] text-ash-dim">{col.title}</h4>
              {col.links.map((l) => (
                <a key={l.label} href={l.href} className="mb-2.5 block text-sm text-ash transition-colors hover:text-bone">{l.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3.5 border-t border-line pt-7 text-[13px] text-ash-dim">
          <span>© 2026 {BRAND.name} All rights reserved.</span>
          <span className="stone-text font-display uppercase tracking-[0.16em]">{BRAND.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
