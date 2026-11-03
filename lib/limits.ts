// Simple per-visitor daily limits + global daily spend cap.
// Uses Postgres (AiUsage table) when DATABASE_URL is set; otherwise falls back to
// in-memory counters (per server instance, resets on cold start — fine for a preview).
import { createHmac } from "crypto";

type Kind = "preview" | "chat";
const mem = { day: "", spend: 0, hits: new Map<string, number>() };
const today = () => new Date().toISOString().slice(0, 10);

export function visitorKey(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "anon";
  const secret = process.env.RATE_LIMIT_SECRET || "redmouth";
  return createHmac("sha256", secret).update(ip).digest("hex").slice(0, 24);
}

export const LIMITS = {
  preview: Number(process.env.PREVIEW_LIMIT_PER_DAY || 5),
  chat: Number(process.env.CHAT_LIMIT_PER_DAY || 40),
  spendCap: Number(process.env.AI_DAILY_SPEND_CAP_USD || 3),
};

async function db() {
  if (!process.env.DATABASE_URL) return null;
  try {
    const { prisma } = await import("@/lib/prisma");
    return prisma;
  } catch {
    return null;
  }
}

/** Returns null if allowed, else a user-facing error message. */
export async function check(kind: Kind, visitor: string, estCost: number): Promise<string | null> {
  const p = await db();
  const start = new Date(today() + "T00:00:00Z");
  let used = 0, spend = 0;
  if (p) {
    used = await p.aiUsage.count({ where: { kind, visitor, createdAt: { gte: start } } });
    spend = (await p.aiUsage.aggregate({ _sum: { cost: true }, where: { createdAt: { gte: start } } }))._sum.cost || 0;
  } else {
    if (mem.day !== today()) { mem.day = today(); mem.spend = 0; mem.hits.clear(); }
    used = mem.hits.get(kind + visitor) || 0;
    spend = mem.spend;
  }
  if (used >= LIMITS[kind]) return kind === "preview" ? `Daily limit reached (${LIMITS.preview} previews per day). Request a quote and we'll mock it up for you.` : "Chat limit reached for today. Use the quote form and we'll get back to you.";
  if (spend + estCost > LIMITS.spendCap) return "Our AI tools are resting for today. Request a quote below and we'll follow up.";
  return null;
}

export async function record(kind: Kind, visitor: string, cost: number) {
  const p = await db();
  if (p) { await p.aiUsage.create({ data: { kind, visitor, cost } }).catch(() => {}); return; }
  mem.hits.set(kind + visitor, (mem.hits.get(kind + visitor) || 0) + 1);
  mem.spend += cost;
}
