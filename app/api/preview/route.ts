import { generateText } from "ai";
import { readFile } from "fs/promises";
import path from "path";
import { z } from "zod";
import sharp from "sharp";
import { model, PRICE } from "@/lib/ai";
import { check, record, visitorKey } from "@/lib/limits";
import { GUN_MODELS, CERAKOTE_COLORS, HYDRO_PATTERNS } from "@/lib/finishes";

export const runtime = "nodejs";
export const maxDuration = 60;

const Body = z.object({
  modelKey: z.string().max(40).optional(),
  image: z.string().max(3_000_000).optional(), // data URL, client-resized to <=1024px
  finishType: z.enum(["cerakote", "hydro"]),
  finish: z.string().max(60),
  accent: z.string().max(60).optional(),
});

const VARIATIONS = Math.min(4, Math.max(1, Number(process.env.PREVIEW_VARIATIONS || 2)));
const STYLES = [
  "Apply it evenly and cleanly across the frame/receiver and slide/upper.",
  "Use a slightly larger pattern scale and place it differently; keep small controls (trigger, pins, sights, mag release) in matte black.",
  "Two-tone look: the finish on the main body, with the slide/barrel area or upper in a darker complementary tone.",
  "Battleworn take: same finish with subtle hand-worn edge wear showing black underneath.",
];

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false, error: "Bad request." }, { status: 400 });
  const { modelKey, image, finishType, finish, accent } = parsed.data;

  const okFinish = finishType === "cerakote" ? CERAKOTE_COLORS.some((c) => c.name === finish) : (HYDRO_PATTERNS as readonly string[]).includes(finish);
  if (!okFinish) return Response.json({ ok: false, error: "Pick a finish from the list." }, { status: 400 });

  let data: Buffer, mediaType = "image/webp", label = "the firearm";
  if (image) {
    const m = image.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
    if (!m) return Response.json({ ok: false, error: "Upload a JPG, PNG or WebP photo." }, { status: 400 });
    mediaType = m[1];
    data = Buffer.from(m[2], "base64");
    if (data.length > 2_200_000) return Response.json({ ok: false, error: "Photo too large." }, { status: 400 });
  } else {
    const g = GUN_MODELS.find((x) => x.key === modelKey);
    if (!g) return Response.json({ ok: false, error: "Pick a model or upload a photo." }, { status: 400 });
    data = await readFile(path.join(process.cwd(), "public/ref", `${g.key}.webp`));
    label = `the ${g.label}`;
  }

  const visitor = visitorKey(req);
  const est = VARIATIONS * PRICE.image;
  const blocked = await check("preview", visitor, est);
  if (blocked) return Response.json({ ok: false, error: blocked }, { status: 429 });

  const finishText =
    finishType === "cerakote"
      ? `a Cerakote ceramic coating in the color "${finish}"${accent ? ` with "${accent}" accents on small parts` : ""}. Satin/matte ceramic sheen, not glossy paint`
      : `a hydro-dip (water transfer printing) film in a "${finish}" pattern, wrapped naturally over the contours, sealed under a satin clear coat`;

  const run = async (i: number) => {
    const r = await generateText({
      model: model("image"),
      providerOptions: { google: { responseModalities: ["IMAGE"] } },
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: `This is a photo of ${label}. Edit the image: refinish the firearm's exterior in ${finishText}. ${STYLES[i % STYLES.length]} Keep the exact same firearm shape, parts, proportions, camera angle, background and lighting. Do not add text, logos, people or hands. Photorealistic result. If the photo does not show a firearm or firearm part, just refinish the main metal object.` },
            { type: "file", data, mediaType },
          ],
        },
      ],
    });
    const f = r.files.find((x) => x.mediaType.startsWith("image/"));
    if (!f) return null;
    const jpg = await sharp(Buffer.from(f.base64, "base64")).resize(1024, 1024, { fit: "inside" }).jpeg({ quality: 82 }).toBuffer();
    return `data:image/jpeg;base64,${jpg.toString("base64")}`;
  };

  try {
    const imgs = (await Promise.all(Array.from({ length: VARIATIONS }, (_, i) => run(i).catch(() => null)))).filter(Boolean) as string[];
    await record("preview", visitor, imgs.length * PRICE.image);
    if (!imgs.length) return Response.json({ ok: false, error: "The preview didn't come through. Try another photo or finish." }, { status: 502 });
    return Response.json({ ok: true, images: imgs, cost: +(imgs.length * PRICE.image).toFixed(3) });
  } catch {
    return Response.json({ ok: false, error: "Preview service unavailable right now." }, { status: 502 });
  }
}
