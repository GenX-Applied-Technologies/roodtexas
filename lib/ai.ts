import { google } from "@ai-sdk/google";

// Uses GEMINI_API_KEY (direct Google) if set; otherwise Vercel AI Gateway
// (AI_GATEWAY_API_KEY, or the automatic OIDC token on Vercel deployments).
export function model(id: "image" | "chat") {
  const g: string = id === "image" ? (process.env.IMAGE_MODEL || "gemini-2.5-flash-image") : (process.env.CHAT_MODEL || "gemini-3.1-flash-lite");
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY) {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) process.env.GOOGLE_GENERATIVE_AI_API_KEY = process.env.GEMINI_API_KEY;
    return google(g);
  }
  return `google/${g}`; // AI Gateway model string
}

export const PRICE = {
  image: Number(process.env.AI_PRICE_PER_IMAGE || 0.039), // Gemini 2.5 Flash Image, per output image
  chatIn: 0.25 / 1e6,
  chatOut: 1.5 / 1e6,
};
