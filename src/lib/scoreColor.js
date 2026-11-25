// Colour for a score percentage in 8 distinct bands of 12.5% (0–12.4% red … 87.5–100% green), going
// red → orange → yellow → green. The shades are theme tokens (--s0…--s7 in style.css) chosen to stay readable
// as text on their own light tint in both light and dark mode. Returns inline styles for a small pill.
export const scoreBand = (pct) => Math.min(7, Math.floor(Math.max(0, Number(pct) || 0) / 12.5))

export function scoreStyle(pct) {
  const c = `var(--s${scoreBand(pct)})`
  return { color: c, background: `color-mix(in srgb, ${c} 13%, var(--surface))`, borderColor: `color-mix(in srgb, ${c} 30%, transparent)` }
}
