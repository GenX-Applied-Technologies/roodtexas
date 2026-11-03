// Central content for Red Mouth Co. Edit copy here.
// PLACEHOLDER values are marked [[LIKE THIS]] until the owner sends real info.

export const BRAND = {
  name: "Red Mouth Co.",
  tagline: "Speak Softly. Carry Fire.",
  est: "Est. 2026",
  city: "Lubbock, Texas",
  phone: "[[PHONE NUMBER]]",
  email: "[[EMAIL ADDRESS]]",
  address: "[[SHOP ADDRESS / DROP-OFF LOCATION]]",
  hours: "[[SHOP HOURS]]",
  ffl: "[[FFL STATUS / LICENSE INFO]]",
  socials: [
    { label: "Instagram", href: "#", note: "[[INSTAGRAM URL]]" },
    { label: "TikTok", href: "#", note: "[[TIKTOK URL]]" },
    { label: "Facebook", href: "#", note: "[[FACEBOOK URL]]" },
    { label: "YouTube", href: "#", note: "[[YOUTUBE URL]]" },
  ],
} as const;

export const SERVICES = [
  {
    name: "Cerakote, single color",
    tier: "Core service",
    note: "A durable, thin-film ceramic finish in the color you pick. Clean, even, and built to take abuse.",
  },
  {
    name: "Two-tone & multi-color",
    tier: "Custom",
    note: "Split colors by part: slide and frame, upper and lower, accents on controls and hardware.",
  },
  {
    name: "Patterns & camo",
    tier: "Custom",
    note: "Stencilled camo, Aztec and southwest patterns, stripes, splatter, and fades.",
  },
  {
    name: "Battleworn / distressed",
    tier: "Custom",
    note: "Hand-worked edge wear for a used-hard look.",
  },
  {
    name: "Hydro-dipping",
    tier: "Custom",
    note: "Full-coverage printed films like camo, carbon fiber, skulls, flags, and more, sealed with a clear coat.",
  },
  {
    name: "Engraved & logo details",
    tier: "Add-on",
    note: "Ask about custom graphics, logos, and personal touches on your piece.",
  },
] as const;

export const COLORWAYS = [
  {
    name: "Red Mouth Red",
    type: "House color",
    blurb: "Deep maroon red, the color the brand was built around.",
    css: "linear-gradient(135deg, #5a0d12 0%, #1a0507 45%, #9b1b22 100%)",
  },
  {
    name: "Cracked Stone",
    type: "Distressed silver",
    blurb: "Worn stone gray with silver edges. Pairs with black or red accents.",
    css: "linear-gradient(135deg, #6b6e72 0%, #2c2e31 50%, #b9bcbf 100%)",
  },
  {
    name: "Desert FDE",
    type: "Southwest classic",
    blurb: "Flat dark earth tones that look right on the Llano Estacado.",
    css: "linear-gradient(135deg, #8a6f4d 0%, #3d2f20 50%, #c2a27a 100%)",
  },
] as const;

export const FINISHES = [
  { name: "Red Mouth Red", c1: "#5a0d12", c2: "#1a0507", c3: "#9b1b22", dot: "#9b1b22" },
  { name: "Cracked Stone", c1: "#6b6e72", c2: "#2c2e31", c3: "#b9bcbf", dot: "#8a8d91" },
  { name: "Desert FDE", c1: "#8a6f4d", c2: "#3d2f20", c3: "#c2a27a", dot: "#a88a62" },
  { name: "Midnight Black", c1: "#1a1c22", c2: "#0c0d10", c3: "#2a2d36", dot: "#1a1c22" },
  { name: "OD Green", c1: "#4b5132", c2: "#22261a", c3: "#6c744a", dot: "#5d6440" },
  { name: "Blackout Redline", c1: "#181818", c2: "#050505", c3: "#b01620", dot: "#b01620" },
] as const;

export const PLATFORMS = ["AR-15 Carbine", "AR-15 Pistol", "Handgun slide", "Bolt rifle"] as const;

export const INTENTS = [
  "Cerakote quote",
  "Hydro-dip quote",
  "Mail-in finish question",
  "Knife / tumbler / parts / gear",
  "Rifle build question",
  "Gun show / other",
] as const;

// Ad-safe "anything metal" landing pages. NO firearm imagery or wording here.
export const AD_PAGES = [
  { slug: "auto", title: "Auto parts", h1: "Custom Cerakote for auto parts", items: ["Valve covers", "Intake parts", "Brackets & hardware", "Emblems & trim", "Wheels & accessories (ask)"], blurb: "Heat-tolerant ceramic coatings and hydro-dip patterns for under-hood and interior parts." },
  { slug: "moto", title: "Motorcycle & powersports", h1: "Custom finishes for bikes & powersports", items: ["Engine covers", "Levers & controls", "Brackets & mounts", "Pegs & hardware", "ATV / UTV parts"], blurb: "Durable color and patterns for street, dirt, and side-by-side parts." },
  { slug: "knives", title: "Knives", h1: "Custom Cerakote for knives", items: ["Folding knife blades & scales", "Fixed blades", "Pocket clips & hardware", "Multitools"], blurb: "Thin, tough coatings that keep edges clean and handles looking custom." },
  { slug: "tumblers", title: "Tumblers & drinkware", h1: "Custom Cerakote & hydro-dip tumblers", items: ["Tumblers", "Bottles", "Flasks", "Can coolers", "Custom gift sets"], blurb: "One-off or matching sets for gifts, teams, and events." },
  { slug: "tools", title: "Tools", h1: "Custom finishes for tools", items: ["Hand tools", "Flashlights", "Tool boxes (ask)", "Shop gear"], blurb: "Color-code your kit or make it impossible to borrow." },
  { slug: "outdoor", title: "Outdoor gear", h1: "Custom finishes for outdoor gear", items: ["Optics housings & mounts", "Hunting & fishing gear", "Camp gear", "Hard cases"], blurb: "Desert, camo, and Aztec patterns that hold up outside." },
] as const;
