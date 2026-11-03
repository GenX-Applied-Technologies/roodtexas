import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const LeadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("A valid email is required").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  intent: z.string().trim().min(1).max(80),
  platform: z.string().trim().max(80).optional().or(z.literal("")),
  finish: z.string().trim().max(80).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot — must stay empty. Bots fill it.
  company: z.string().max(0).optional(),
});

function clean(v?: string | null) {
  const t = (v ?? "").trim();
  return t.length ? t : null;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Invalid submission" },
      { status: 422 },
    );
  }

  // Honeypot tripped — pretend success, drop the lead.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: clean(parsed.data.phone),
    intent: parsed.data.intent,
    platform: clean(parsed.data.platform),
    finish: clean(parsed.data.finish),
    notes: clean(parsed.data.notes),
    userAgent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
    source: "website",
  };

  const results: { db: "saved" | "skipped" | "error"; email: "sent" | "skipped" | "error" } = {
    db: "skipped",
    email: "skipped",
  };

  // 1) Persist to the database if one is configured.
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.lead.create({ data });
      results.db = "saved";
    } catch (err) {
      results.db = "error";
      console.error("[lead] db insert failed:", err);
    }
  }

  // 2) Notify by email if Resend is configured.
  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_TO) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const to = process.env.LEAD_NOTIFY_TO as string;
      const from = process.env.LEAD_NOTIFY_FROM || "Red Mouth Co. <onboarding@resend.dev>";

      await resend.emails.send({
        from,
        to,
        replyTo: data.email,
        subject: `New Red Mouth lead — ${data.intent}${data.finish ? ` (${data.finish})` : ""}`,
        text: [
          `Name:     ${data.name}`,
          `Email:    ${data.email}`,
          `Phone:    ${data.phone ?? "-"}`,
          `Wants:    ${data.intent}`,
          `Platform: ${data.platform ?? "-"}`,
          `Finish:   ${data.finish ?? "-"}`,
          "",
          "Notes:",
          data.notes ?? "-",
        ].join("\n"),
      });
      results.email = "sent";
    } catch (err) {
      results.email = "error";
      console.error("[lead] email send failed:", err);
    }
  }

  // Never lose a lead: if nothing is configured, log it so it shows in server logs.
  if (results.db === "skipped" && results.email === "skipped") {
    console.info("[lead] received (no DB/email configured):", JSON.stringify(data));
  }

  return NextResponse.json({ ok: true, results });
}
