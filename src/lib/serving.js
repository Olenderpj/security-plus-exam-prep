// Which questions are served. Questions are chosen near the learner's current level in each question's own
// sub-section: a window of ±10% around that level. That window is only the starting point. The bank is
// thinner in some places than others, so the window widens, in 5% steps, until the sub-section has at
// least MIN_PER_SECTION questions in range. Beyond that, practice sets that still come up short widen
// further (see practicePool), so there is always something to study. Questions nearest the level are
// still favoured when a set is built.
//
// The level used for the window is held between FLOOR and CEIL, because the bank has little below
// difficulty ~2.7 or above ~9.9. The Settings page shows the range in use for every sub-section.
import { objectiveRating } from './level.js'
import { difficultyOf } from './difficulty.js'
import { QUESTIONS } from '../data/questions/index.js'

export const RANGE = 0.1
const STEP = 0.05
const MAX_RANGE = 0.6
export const MIN_PER_SECTION = 12 // (or half of the sub-section's questions, if it has fewer than 24)
export const FLOOR = 3.0
export const CEIL = 9.0
const EPS = 1e-9

const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x))

// Difficulties of every question in a sub-section (the bank never changes at runtime).
const bySection = new Map()
const levelsOf = (code) => {
  if (!bySection.has(code)) bySection.set(code, QUESTIONS.filter((q) => q.objective === code).map(difficultyOf))
  return bySection.get(code)
}

// Half-width of the window for a sub-section at a given centre: 10%, widened until enough questions fit.
const widths = new Map()
function baseRange(code, centre) {
  const key = `${code}|${centre.toFixed(2)}`
  if (widths.has(key)) return widths.get(key)
  const ds = levelsOf(code)
  const need = Math.min(MIN_PER_SECTION, Math.ceil(ds.length / 2))
  let w = RANGE
  while (w < MAX_RANGE - EPS && ds.filter((d) => d >= centre * (1 - w) - EPS && d <= centre * (1 + w) + EPS).length < need) w = Math.round((w + STEP) * 100) / 100
  widths.set(key, w)
  return w
}

// The window for a sub-section, e.g. level 5.6 -> 5.04–6.16 (wider if that holds too few questions).
// `extra` widens it further for sets that would otherwise be too small; Infinity removes the limits.
export function servingWindow(code, extra = 0) {
  const level = objectiveRating(code)
  const centre = clamp(level, FLOOR, CEIL)
  const range = baseRange(code, centre) + (Number.isFinite(extra) ? extra : 0)
  const open = !Number.isFinite(extra)
  return {
    level,
    centre,
    range,
    lo: open ? -Infinity : centre * (1 - range),
    hi: open ? Infinity : centre * (1 + range),
    clamped: centre !== level,
    widened: range > RANGE + EPS
  }
}

export function inRange(q, extra = 0) {
  const { lo, hi } = servingWindow(q.objective, extra)
  const d = difficultyOf(q)
  return d >= lo - EPS && d <= hi + EPS
}

// How many questions are currently available for a sub-section (or the whole bank).
export const countInRange = (code = null) => QUESTIONS.filter((q) => (!code || q.objective === code) && inRange(q)).length
