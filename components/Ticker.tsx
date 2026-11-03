const ITEMS = ["Custom Cerakote", "Hydro-dipping", "Two-tone & camo", "Aztec & southwest patterns", "Battleworn", "Mail-in service", "Speak Softly. Carry Fire."];

export function Ticker({ items = ITEMS }: { items?: readonly string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-panel">
      <div className="aztec-band" />
      <div className="flex w-max animate-[ticker_30s_linear_infinite] whitespace-nowrap py-3.5">
        {row.map((item, i) => (
          <span key={i} className="mx-7 font-display text-[13px] uppercase tracking-[0.22em] text-ash">
            {item}
            <span className="ml-7 text-blood">◆</span>
          </span>
        ))}
      </div>
      <div className="aztec-band" />
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
