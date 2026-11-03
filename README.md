# Red Mouth Co.

Marketing site for Red Mouth Co. (Lubbock, TX): custom gun Cerakote and hydro-dip finishes.
"Speak Softly. Carry Fire." Est. 2026.

- `/` — main site, firearm finishing focus (organic/SEO).
- `/finishes/[auto|moto|knives|tumblers|tools|outdoor]` — ad-safe landing pages. No firearm images, words, or links. Keep it that way.
- Edit copy in `lib/content.ts`. Values marked `[[LIKE THIS]]` are placeholders waiting on owner info.
- Lead form posts to `/api/lead`; stores in Postgres if `DATABASE_URL`, emails if `RESEND_API_KEY` + `LEAD_NOTIFY_TO`.
- Brand images in `public/brand` (webp, background-removed from owner logos).
