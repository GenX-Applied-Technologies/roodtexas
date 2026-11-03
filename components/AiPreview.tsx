"use client";

import { useState } from "react";
import { Section, SectionHead } from "./Section";
import { useBuild } from "./BuildProvider";
import { GUN_MODELS, CERAKOTE_COLORS, HYDRO_PATTERNS } from "@/lib/finishes";

async function resize(file: File, max = 1024): Promise<string> {
  const img = await createImageBitmap(file);
  const s = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement("canvas");
  c.width = Math.round(img.width * s);
  c.height = Math.round(img.height * s);
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  return c.toDataURL("image/jpeg", 0.85);
}

async function thumb(dataUrl: string): Promise<string> {
  const img = new Image();
  img.src = dataUrl;
  await img.decode();
  const s = Math.min(1, 640 / Math.max(img.width, img.height));
  const c = document.createElement("canvas");
  c.width = Math.round(img.width * s);
  c.height = Math.round(img.height * s);
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  return c.toDataURL("image/jpeg", 0.8);
}

const chip = (on: boolean) =>
  `rounded-[2px] border px-3 py-2 text-[13px] transition-all ${on ? "border-blood bg-blood text-white" : "border-line bg-panel text-ash hover:text-bone"}`;

export function AiPreview() {
  const { prefillQuote } = useBuild();
  const [mode, setMode] = useState<"upload" | "model">("upload");
  const [photo, setPhoto] = useState<string>("");
  const [gun, setGun] = useState<string>(GUN_MODELS[0].key);
  const [ftype, setFtype] = useState<"cerakote" | "hydro">("cerakote");
  const [finish, setFinish] = useState<string>(CERAKOTE_COLORS[0].name);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [imgs, setImgs] = useState<string[]>([]);

  const gunLabel = mode === "upload" ? "My firearm (photo uploaded)" : GUN_MODELS.find((g) => g.key === gun)!.label;
  const finishLabel = `${ftype === "cerakote" ? "Cerakote" : "Hydro-dip"}: ${finish}`;

  async function go() {
    setErr("");
    if (mode === "upload" && !photo) return setErr("Upload a photo first.");
    setBusy(true);
    setImgs([]);
    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ finishType: ftype, finish, ...(mode === "upload" ? { image: photo } : { modelKey: gun }) }),
      });
      const d = await res.json();
      if (!d.ok) throw new Error(d.error);
      setImgs(d.images);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section id="ai-preview">
      <SectionHead eyebrow="AI finish preview" title="See your gun in a new finish">
        Upload a photo of your own firearm, or pick a popular model. Choose a Cerakote color or hydro-dip pattern and get AI mockups in about 15 seconds.
      </SectionHead>

      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="flex gap-2">
            <button className={chip(mode === "upload")} onClick={() => setMode("upload")}>Upload my gun (best)</button>
            <button className={chip(mode === "model")} onClick={() => setMode("model")}>Pick a model</button>
          </div>

          {mode === "upload" ? (
            <label className="block cursor-pointer rounded-md border border-dashed border-line bg-panel p-5 text-center text-sm text-ash hover:border-blood">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt="Your upload" className="mx-auto max-h-48 rounded-sm" />
              ) : (
                <>Tap to upload a clear side-view photo (unloaded, on a plain surface)</>
              )}
              <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setPhoto(await resize(f)); }} />
            </label>
          ) : (
            <div>
              <select value={gun} onChange={(e) => setGun(e.target.value)} className="w-full rounded-[3px] border border-line bg-ink px-3.5 py-3 text-bone">
                {GUN_MODELS.map((g) => <option key={g.key} value={g.key}>{g.label}</option>)}
              </select>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/ref/${gun}.webp`} alt="Representative reference" className="mt-3 w-full rounded-sm border border-line" />
              <p className="mt-1 text-[11px] text-ash-dim">Representative AI-generated reference image, not an exact factory photo.</p>
            </div>
          )}

          <div>
            <div className="mb-2 flex gap-2">
              <button className={chip(ftype === "cerakote")} onClick={() => { setFtype("cerakote"); setFinish(CERAKOTE_COLORS[0].name); }}>Cerakote color</button>
              <button className={chip(ftype === "hydro")} onClick={() => { setFtype("hydro"); setFinish(HYDRO_PATTERNS[0]); }}>Hydro-dip pattern</button>
            </div>
            <div className="flex max-h-56 flex-wrap gap-2 overflow-auto">
              {ftype === "cerakote"
                ? CERAKOTE_COLORS.map((c) => (
                    <button key={c.name} className={chip(finish === c.name) + " flex items-center gap-2"} onClick={() => setFinish(c.name)}>
                      <span className="h-3.5 w-3.5 rounded-full border border-white/20" style={{ background: c.hex }} />
                      {c.name}
                    </button>
                  ))
                : HYDRO_PATTERNS.map((p) => (
                    <button key={p} className={chip(finish === p)} onClick={() => setFinish(p)}>{p}</button>
                  ))}
            </div>
          </div>

          <button onClick={go} disabled={busy} className="rounded-[2px] bg-blood px-7 py-[15px] font-display text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-blood-bright disabled:opacity-60">
            {busy ? "Painting… (about 15s)" : "Generate preview ›"}
          </button>
          {err && <p className="text-sm text-blood-bright">{err}</p>}
          <p className="text-xs text-ash-dim">AI preview, final finish may vary. Limited free previews per day. Photos are used only to make your preview.</p>
        </div>

        <div className="grid content-start gap-4 sm:grid-cols-2">
          {busy && [0, 1].map((i) => <div key={i} className="aspect-[3/2] animate-pulse rounded-md border border-line bg-panel" />)}
          {!busy && !imgs.length && (
            <div className="flex aspect-[3/2] items-center justify-center rounded-md border border-dashed border-line bg-panel p-6 text-center text-sm text-ash-dim sm:col-span-2">Your previews show up here.</div>
          )}
          {imgs.map((src, i) => (
            <figure key={i} className="overflow-hidden rounded-md border border-line bg-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`AI preview ${i + 1}: ${finishLabel}`} className="w-full" />
              <figcaption className="flex items-center justify-between gap-2 p-3">
                <span className="text-[11px] uppercase tracking-[0.1em] text-ash-dim">AI preview · may vary</span>
                <button
                  onClick={async () => prefillQuote({ item: gunLabel, finish: finishLabel, notes: `From AI preview #${i + 1}: ${finishLabel} on ${gunLabel}.`, image: await thumb(src) })}
                  className="rounded-[2px] bg-blood px-3 py-1.5 font-display text-[12px] uppercase tracking-[0.08em] text-white hover:bg-blood-bright"
                >
                  Request this finish
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
