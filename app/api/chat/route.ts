import { generateText, tool, stepCountIs } from "ai";
import { z } from "zod";
import { model, PRICE } from "@/lib/ai";
import { check, record, visitorKey } from "@/lib/limits";
import { BRAND } from "@/lib/content";

export const runtime = "nodejs";
export const maxDuration = 30;

const Body = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(1000) })).min(1).max(30),
});

const SYSTEM = `You are the website assistant for ${BRAND.name} ("${BRAND.tagline}"), a custom Cerakote and hydro-dip finishing shop in ${BRAND.city}.
Keep replies short: 1-4 sentences, plain text, friendly West Texas tone.
What you know:
- Cerakote: thin ceramic coating, sprayed and oven-cured; very durable, solid colors, two-tone, stencilled camo, Aztec/southwest patterns, battleworn.
- Hydro-dip (water transfer printing): a printed film (camo, carbon fiber, skulls, flags, Aztec, snakeskin, Damascus, etc.) is transferred in water, then sealed with a clear coat. Great for busy full-coverage patterns.
- They also finish knives, tumblers, auto and moto parts, tools and outdoor gear.
- Process: request a quote, drop off locally or mail in, prep (strip and blast), coat or dip, cure, inspect, pick up or ship back.
- Turnaround: not published yet; say the shop confirms turnaround with the quote.
- Firearms: customers must CONTACT THE SHOP BEFORE SHIPPING any firearm; where a transfer is needed it goes through a licensed dealer (FFL). The website does not sell or ship guns.
- The site has an AI Finish Preview tool (section "Preview your finish", link #ai-preview): upload a photo of your gun or pick a model, choose a color or pattern, and see 2 AI mockups.
Hard rules:
- NEVER quote or estimate prices, even ranges. Say pricing depends on the piece and the shop will quote it; offer to start a quote.
- NEVER give legal advice about shipping, transferring, or owning firearms, or state laws. Say the shop will confirm what is required before anything ships.
- Don't invent facts (reviews, hours, address, phone, warranties). Contact info not on file yet: tell them to use the quote form.
- Stay on topic (finishes, the shop). Politely decline anything else.
Leads: when the visitor wants a quote, ask for name, phone or email, the item, and the finish they want. Once you have a name and a phone or email, call fill_quote_form, then tell them the form below is filled in and they just need to review and press Send.`;

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false, error: "Bad request." }, { status: 400 });
  const visitor = visitorKey(req);
  const blocked = await check("chat", visitor, 0.001);
  if (blocked) return Response.json({ ok: true, text: blocked });

  let prefill: Record<string, string> | null = null;
  try {
    const r = await generateText({
      model: model("chat"),
      system: SYSTEM,
      messages: parsed.data.messages.slice(-12),
      maxOutputTokens: 220,
      stopWhen: stepCountIs(2),
      tools: {
        fill_quote_form: tool({
          description: "Pre-fill the website quote form with the visitor's details.",
          inputSchema: z.object({
            name: z.string(),
            email: z.string().optional(),
            phone: z.string().optional(),
            item: z.string().optional().describe("gun make/model or item only, without the finish"),
            finish: z.string().optional().describe("color or pattern only"),
            notes: z.string().optional(),
          }),
          execute: async (input) => {
            prefill = Object.fromEntries(Object.entries(input).filter(([, v]) => v)) as Record<string, string>;
            return { ok: true };
          },
        }),
      },
    });
    const u = r.totalUsage;
    const cost = (u.inputTokens || 0) * PRICE.chatIn + (u.outputTokens || 0) * PRICE.chatOut;
    await record("chat", visitor, cost);
    return Response.json({ ok: true, text: r.text || (prefill ? "Done. The quote form below is filled in. Review it and press Send." : "Sorry, say that again?"), prefill, cost });
  } catch (e) {
    console.error(e);
    return Response.json({ ok: false, text: "Chat is down right now. Use the quote form and we'll get back to you." });
  }
}
