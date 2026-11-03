"use client";

import { useState, type FormEvent } from "react";
import { useBuild } from "./BuildProvider";
import { INTENTS, PLATFORMS, FINISHES } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "rounded-[3px] border border-line bg-ink px-3.5 py-[13px] text-[15px] text-bone transition-colors placeholder:text-ash-dim focus:border-blood focus:outline-none";
const labelCls = "text-[13px] font-medium text-ash";

export function LeadForm({ guns = true }: { guns?: boolean }) {
  const { platform, finish } = useBuild();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
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
    <form onSubmit={onSubmit} className="max-w-[760px]">
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
          <input name="name" required placeholder="First and last" className={inputCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Email</label>
          <input name="email" type="email" required placeholder="you@email.com" className={inputCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Phone</label>
          <input name="phone" placeholder="(806) 000-0000" className={inputCls} />
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
          <select name="platform" key={`p-${platform}`} defaultValue={guns ? platform : undefined} className={inputCls}>
            {(guns ? [...PLATFORMS, "Parts only", "Other / not sure"] : ["Auto part", "Moto part", "Knife", "Tumbler / drinkware", "Tool", "Outdoor gear", "Other"]).map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Finish</label>
          <select name="finish" key={`f-${finish}`} defaultValue={finish} className={inputCls}>
            {[...FINISHES.map((f) => f.name), "Not sure yet"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className={labelCls}>Anything else</label>
          <textarea
            name="notes"
            rows={3}
            placeholder={guns ? "Tell us about the piece, the colors or pattern you want, and your timeline." : "Tell us about the item, the colors or pattern you want, and your timeline."}
            className={inputCls}
          />
        </div>
      </div>

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
