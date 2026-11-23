// Helpers for the generated question families: a seeded random generator (so every question is the same on
// every device, and ids are stable), number formatting and small utilities.
export function rng(seed) {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507)
  h = Math.imul(h ^ (h >>> 13), 3266489909)
  let a = (h ^ (h >>> 16)) >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
export const int = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1))
export const pick = (r, arr) => arr[Math.floor(r() * arr.length)]
export function shuffle(r, arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
export const money = (n) => `${n < 0 ? '-' : ''}$${Math.abs(Math.round(n)).toLocaleString('en-US')}`
export const num = (n) => n.toLocaleString('en-US')
export const round = (x, p = 2) => Math.round(x * 10 ** p) / 10 ** p
// 3520 -> "3.52 × 10^3"
export const sci = (x, d = 2) => {
  const [m, e] = x.toExponential(d).split('e')
  return `${m} × 10^${Number(e)}`
}
