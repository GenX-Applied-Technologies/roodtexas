"use client";

import { useEffect, useRef, useState } from "react";
import { useBuild } from "./BuildProvider";

type Msg = { role: "user" | "assistant"; content: string };
const HELLO: Msg = { role: "assistant", content: "Hey! Ask me about Cerakote, hydro-dip, colors, or how mail-in works. I can also start your quote." };

export function ChatBubble() {
  const { prefillQuote } = useBuild();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([HELLO]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, open]);

  async function send() {
    const t = text.trim();
    if (!t || busy) return;
    const next = [...msgs, { role: "user" as const, content: t.slice(0, 1000) }];
    setMsgs(next);
    setText("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next.filter((m) => m !== HELLO) }) });
      const d = await res.json();
      setMsgs([...next, { role: "assistant", content: d.text || "Sorry, try again." }]);
      if (d.prefill) prefillQuote({ name: d.prefill.name, email: d.prefill.email, phone: d.prefill.phone, item: d.prefill.item, finish: d.prefill.finish, notes: d.prefill.notes }, false);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Chat is down right now. Use the quote form below." }]);
    } finally {
      setBusy(false);
    }
  }

  const render = (s: string) =>
    s.split(/(#ai-preview|#start)/).map((p, i) =>
      p === "#ai-preview" ? <a key={i} href="#ai-preview" className="text-blood underline">AI preview</a> : p === "#start" ? <a key={i} href="#start" className="text-blood underline">quote form</a> : p,
    );

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <div className="mb-3 flex h-[460px] w-[min(92vw,360px)] flex-col overflow-hidden rounded-lg border border-line bg-ink shadow-2xl">
          <div className="flex items-center justify-between border-b border-line bg-panel px-4 py-3">
            <span className="font-display text-sm uppercase tracking-[0.12em]">Red Mouth assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-ash hover:text-bone">✕</button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-[14px]">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "ml-8 rounded-md bg-blood/90 px-3 py-2 text-white" : "mr-8 rounded-md bg-panel-2 px-3 py-2 text-bone"}>{render(m.content)}</div>
            ))}
            {busy && <div className="mr-8 rounded-md bg-panel-2 px-3 py-2 text-ash">…</div>}
            <div ref={end} />
          </div>
          <div className="border-t border-line p-2.5">
            <div className="flex gap-2">
              <input value={text} maxLength={1000} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask a question…" className="flex-1 rounded-[3px] border border-line bg-panel px-3 py-2 text-sm text-bone focus:border-blood focus:outline-none" />
              <button onClick={send} disabled={busy} className="rounded-[2px] bg-blood px-3 text-sm text-white disabled:opacity-60">Send</button>
            </div>
            <p className="mt-1.5 text-[10px] text-ash-dim">AI assistant. No prices or legal advice; the shop confirms everything.</p>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} aria-label="Chat with us" className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-blood text-2xl text-white shadow-xl hover:bg-blood-bright">
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
