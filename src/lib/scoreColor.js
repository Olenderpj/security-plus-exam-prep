// Colour for a score percentage in 8 distinct bands of 12.5% (0–12.4% red … 87.5–100% green), going
// red → orange → yellow → green. The shades are theme tokens (--s0…--s7 in style.css) chosen to stay readable
// as text on their own light tint in both light and dark mode. Returns inline styles for a small pill.
export const scoreBand = (pct) => Math.min(7, Math.floor(Math.max(0, Number(pct) || 0) / 12.5))

export function scoreStyle(pct) {
  const c = `var(--s${scoreBand(pct)})`
  return { color: c, background: `color-mix(in srgb, ${c} 13%, var(--surface))`, borderColor: `color-mix(in srgb, ${c} 30%, transparent)` }
}

// Plain colour (text, bars) for a percentage, using the same 8 bands.
export const scoreColor = (pct) => `var(--s${scoreBand(pct)})`

// Levels (1–10) and scaled exam scores (100–900) on the same bands, so every rating in the app reads alike.
export const levelPct = (rating) => ((Number(rating) - 1) / 9) * 100
export const scaledPct = (scaled) => ((Number(scaled) - 100) / 800) * 100

// Pill styles for a level; pass measured=false for 'Early' / 'Not started' to keep the neutral grey.
export const levelStyle = (rating, measured = true) => (measured ? scoreStyle(levelPct(rating)) : {})
