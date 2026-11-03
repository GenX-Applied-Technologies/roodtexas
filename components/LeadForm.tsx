"use client";

import { useState, type FormEvent } from "react";
import { useBuild } from "./BuildProvider";
import { INTENTS, PLATFORMS, FINISHES } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "rounded-[3px] border border-line bg-ink px-3.5 py-[13px] text-[15px] text-bone transition-colors placeholder:text-ash-dim focus:border-blood focus:outline-none";
const labelCls = "text-[13px] font-medium text-ash";

export function LeadForm({ guns = true }: { guns?: boolean }) {
  const { platform, finish, prefill, prefillVersion } = useBuild();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());
    if (prefill.image) payload.previewImage = prefill.image;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-[760px] rounded-md border border-blood/50 bg-blood/[0.06] p-7">
        <h3 className="mb-2 font-display text-[22px] uppercase">Got it.</h3>
        <p className="text-ash">
          Your request is in. We will reach out with the right next step with a quote and next steps.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 font-display text-[13px] uppercase tracking-[0.1em] text-blood hover:text-blood-bright"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form key={prefillVersion} onSubmit={onSubmit} className="max-w-[760px]">
      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <div className="grid gap-3.5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Name</label>
          <input name="name" defaultValue={prefill.name} required placeholder="First and last" className={inputCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Email</label>
          <input name="email" type="email" defaultValue={prefill.email} required placeholder="you@email.com" className={inputCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Phone</label>
          <input name="phone" defaultValue={prefill.phone} placeholder="(806) 000-0000" className={inputCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>What do you want?</label>
          <select name="intent" defaultValue={guns ? INTENTS[0] : "Knife / tumbler / parts / gear"} className={inputCls}>
            {(guns ? INTENTS : INTENTS.filter((i) => !/rifle|mail-in finish/i.test(i))).map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>{guns ? "Platform" : "Item"}</label>
          <input name="platform" list="rm-platforms" defaultValue={prefill.item ?? (guns ? platform : "")} placeholder={guns ? "e.g. Glock 19, AR-15" : "e.g. tumbler, valve cover"} className={inputCls} />
          <datalist id="rm-platforms">
            {(guns ? [...PLATFORMS, "Parts only"] : ["Auto part", "Moto part", "Knife", "Tumbler / drinkware", "Tool", "Outdoor gear"]).map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Finish</label>
          <input name="finish" list="rm-finishes" defaultValue={prefill.finish ?? (guns ? finish : "")} placeholder="Color or pattern, or not sure yet" className={inputCls} />
          <datalist id="rm-finishes">
            {FINISHES.map((f) => (
              <option key={f.name} value={f.name} />
            ))}
          </datalist>
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className={labelCls}>Anything else</label>
          <textarea
            name="notes"
            defaultValue={prefill.notes}
            rows={3}
            placeholder={guns ? "Tell us about the piece, the colors or pattern you want, and your timeline." : "Tell us about the item, the colors or pattern you want, and your timeline."}
            className={inputCls}
          />
        </div>
      </div>

      {prefill.image && (
        <div className="mt-4 flex items-center gap-3 text-sm text-ash">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={prefill.image} alt="Chosen AI preview" className="h-16 w-24 rounded-sm border border-line object-cover" />
          Your chosen AI preview will be attached.
        </div>
      )}

      {status === "error" && <p className="mt-3 text-sm text-blood-bright">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 inline-flex items-center gap-2.5 rounded-[2px] bg-blood px-7 py-[15px] font-display text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all hover:-translate-y-0.5 hover:bg-blood-bright disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send it ›"}
      </button>
    </form>
  );
}
