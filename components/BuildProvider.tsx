"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Prefill = { name?: string; email?: string; phone?: string; item?: string; finish?: string; notes?: string; image?: string };

type BuildState = {
  platform: string;
  finish: string;
  setPlatform: (v: string) => void;
  setFinish: (v: string) => void;
  prefill: Prefill;
  prefillVersion: number;
  prefillQuote: (p: Prefill, scroll?: boolean) => void;
};

const Ctx = createContext<BuildState | null>(null);

export function BuildProvider({ children }: { children: ReactNode }) {
  const [platform, setPlatform] = useState("AR-15 Carbine");
  const [finish, setFinish] = useState("Red Mouth Red");
  const [prefill, setPrefill] = useState<Prefill>({});
  const [prefillVersion, setV] = useState(0);
  const prefillQuote = (p: Prefill, scroll = true) => {
    setPrefill((old) => ({ ...old, ...p }));
    setV((v) => v + 1);
    if (scroll) setTimeout(() => document.getElementById("start")?.scrollIntoView({ behavior: "smooth" }), 50);
  };
  return (
    <Ctx.Provider value={{ platform, finish, setPlatform, setFinish, prefill, prefillVersion, prefillQuote }}>{children}</Ctx.Provider>
  );
}

export function useBuild() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBuild must be used within BuildProvider");
  return ctx;
}
