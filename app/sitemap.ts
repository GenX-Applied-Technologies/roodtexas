import type { MetadataRoute } from "next";
import { AD_PAGES } from "@/lib/content";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://redmouthco.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...AD_PAGES.map((p) => ({ url: `${BASE}/finishes/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
