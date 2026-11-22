// Which questions may be served. A question is eligible only if its difficulty is within ±10% of the
// learner's current level in that question's own sub-section; nothing outside that window is ever served.
//
// The bank has very little below difficulty ~2.7 or above ~9.9, so the level used for the window is held
// between FLOOR and CEIL. Without that, a learner whose level drifted below the easiest content would get
// no questions at all and could never recover. The Settings page says when this applies.
import { objectiveRating } from './level.js'
import { difficultyOf } from './difficulty.js'
import { QUESTIONS } from '../data/questions/index.js'

export const RANGE = 0.1
export const FLOOR = 3.0
export const CEIL = 9.0
const EPS = 1e-9

const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x))

// The ±10% window for a sub-section, e.g. level 5.6 -> 5.04–6.16.
export function servingWindow(code) {
  const level = objectiveRating(code)
  const centre = clamp(level, FLOOR, CEIL)
  return { level, centre, lo: centre * (1 - RANGE), hi: centre * (1 + RANGE), clamped: centre !== level }
}

export function inRange(q) {
  const { lo, hi } = servingWindow(q.objective)
  const d = difficultyOf(q)
  return d >= lo - EPS && d <= hi + EPS
}

// How many questions are currently available for a sub-section (or the whole bank).
export const countInRange = (code = null) => QUESTIONS.filter((q) => (!code || q.objective === code) && inRange(q)).length
