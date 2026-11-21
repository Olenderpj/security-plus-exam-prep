// Difficulty of a question on a 1–10 scale. Questions can carry an explicit level (q.lvl, used by the
// hard tier); every other question is rated from features that make real exam items harder:
// performance-based formats, multiple selections, exhibits, long scenarios, and answer options that
// look alike (plausible distractors).
const cache = new Map()
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x))

const words = (s) => new Set(String(s).toLowerCase().match(/[a-z0-9]{3,}/g) || [])

// Mean pairwise word overlap (Jaccard) between options: 0 = unrelated, higher = look-alike options.
function optionOverlap(options) {
  const sets = options.map(words)
  let total = 0
  let pairs = 0
  for (let i = 0; i < sets.length; i++) {
    for (let j = i + 1; j < sets.length; j++) {
      const inter = [...sets[i]].filter((w) => sets[j].has(w)).length
      const union = new Set([...sets[i], ...sets[j]]).size || 1
      total += inter / union
      pairs++
    }
  }
  return pairs ? total / pairs : 0
}

export function difficultyOf(q) {
  if (cache.has(q.id)) return cache.get(q.id)
  let d
  if (q.lvl != null) d = q.lvl
  else if (q.type === 'match') d = 5.5 + Math.min(1.5, q.items.length / 6)
  else if (q.type === 'order') d = 6
  else {
    d = 3
    if (q.correct.length > 1) d += 2
    if (q.exhibit) d += 1.5
    d += clamp((q.question.length - 130) / 70, -1, 1.5)
    d += clamp(optionOverlap(q.options) * 5, 0, 1.8)
    const avgOpt = q.options.reduce((s, o) => s + o.length, 0) / q.options.length
    d += clamp((avgOpt - 25) / 40, 0, 1)
  }
  d = Math.round(clamp(d, 1, 10) * 10) / 10
  cache.set(q.id, d)
  return d
}
