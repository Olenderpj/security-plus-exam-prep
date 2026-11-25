// Colour for a score percentage, red (0%) → amber (50%) → green (100%), built from the theme's own
// --bad / --warn / --good colours so it stays readable in light and dark mode. Returns inline styles for a
// small pill: the text uses the full colour and the background a light tint of it.
export function scoreStyle(pct) {
  const p = Math.max(0, Math.min(100, Number(pct) || 0))
  const c = p < 50
    ? `color-mix(in srgb, var(--warn) ${Math.round(p * 2)}%, var(--bad))`
    : `color-mix(in srgb, var(--good) ${Math.round((p - 50) * 2)}%, var(--warn))`
  return { color: c, background: `color-mix(in srgb, ${c} 13%, var(--surface))`, borderColor: `color-mix(in srgb, ${c} 30%, transparent)` }
}
