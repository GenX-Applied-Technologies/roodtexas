// Gun models with AI-generated, license-clear reference images (public/ref/*.webp).
export const GUN_MODELS = [
  { key: "glock-19", label: "Glock 19" },
  { key: "glock-17", label: "Glock 17" },
  { key: "glock-43x", label: "Glock 43X" },
  { key: "sw-mp", label: "Smith & Wesson M&P 2.0" },
  { key: "sig-p365", label: "Sig Sauer P365" },
  { key: "sig-p320", label: "Sig Sauer P320" },
  { key: "ruger-security-9", label: "Ruger Security-9" },
  { key: "ruger-lcp", label: "Ruger LCP II" },
  { key: "1911", label: "1911" },
  { key: "ar-15", label: "AR-15" },
  { key: "ak", label: "AK-47 / AKM" },
  { key: "rem-870", label: "Remington 870" },
] as const;

// Real Cerakote H-Series color names (check availability with your supplier).
export const CERAKOTE_COLORS = [
  { name: "Graphite Black", hex: "#2b2b2b" },
  { name: "Armor Black", hex: "#1c1c1c" },
  { name: "Burnt Bronze", hex: "#7a5230" },
  { name: "Flat Dark Earth", hex: "#9b8466" },
  { name: "Magpul FDE", hex: "#a08869" },
  { name: "Desert Sand", hex: "#c7b08a" },
  { name: "O.D. Green", hex: "#4b5132" },
  { name: "Sniper Grey", hex: "#5f6366" },
  { name: "Tungsten", hex: "#6e6f6f" },
  { name: "Stainless", hex: "#b7b9ba" },
  { name: "Crimson", hex: "#9b1b22" },
  { name: "USMC Red", hex: "#a3232a" },
  { name: "Robin's Egg Blue", hex: "#7fc8c2" },
  { name: "Ridgeway Blue", hex: "#2e4a6b" },
  { name: "Bright White", hex: "#f2f2f2" },
  { name: "Prison Pink", hex: "#e48bb4" },
  { name: "Gold", hex: "#c9a14a" },
] as const;

export const HYDRO_PATTERNS = [
  "Woodland camo", "Digital camo", "Desert camo", "Kryptek-style camo", "Carbon fiber", "Skulls",
  "American flag", "Texas flag", "Aztec / southwest", "Snakeskin", "Damascus steel", "Marble", "Red & black splatter",
] as const;
