// Adaptive difficulty. Every exam sub-section (objective, e.g. "2.4") has its own rating on a 1–10
// scale that moves with your success there; the domain rating is derived from its objectives and an
// overall rating drives the estimated exam score. Question difficulty (difficulty.js) is on the same
// scale, so "rating ≈ difficulty" means roughly a 50% chance of answering correctly.
import { syncedValue } from './syncedValue.js'
import { DOMAINS, objectivesOf } from '../data/domains.js'

export const START = 4
const MIN = 1
const MAX = 10
const SCALE = 1.2 // how sharply success probability changes with (rating − difficulty)
const PRIOR = 8 // pseudo-answers that pull a lightly-practiced sub-section toward the overall rating
export const EXAM_REF = 6 // difficulty of a typical real-exam question on this scale
export const MIN_FOR_ESTIMATE = 20

const clamp = (x, lo = MIN, hi = MAX) => Math.min(hi, Math.max(lo, x))
const sigmoid = (x) => 1 / (1 + Math.exp(-x))
const round = (x, p = 100) => Math.round(x * p) / p
const blank = () => ({ g: START, n: 0, o: {}, h: [], f: { easy: 0, right: 0, hard: 0 }, u: 0 })
// g = overall rating, n = answers recorded, o = { objective: [rating, answered, points] },
// h = recent sessions [[time, overall rating, percent]], f = feedback counts

export const { state, save, replace } = syncedValue('secplus.level', 'difficulty_level', blank)

export const expectedCorrect = (rating, difficulty) => sigmoid((rating - difficulty) / SCALE)

// How much evidence a sub-section entry carries: answered questions, plus a quarter-answer per acronym lookup.
const LOOKUP_WEIGHT = 0.25
const LOOKUP_PENALTY = 0.06 // rating points taken off the sub-section per lookup (slight, and recoverable)
const weight = (e) => e[1] + LOOKUP_WEIGHT * (e[3] || 0)

// Rating for a sub-section, blended toward the overall rating until it has enough answers.
export function objectiveRating(code) {
  const e = state.value.o[code]
  if (!e) return state.value.g
  return (e[0] * weight(e) + state.value.g * PRIOR) / (weight(e) + PRIOR)
}

export function domainRating(id) {
  const codes = objectivesOf(DOMAINS.find((d) => d.id === Number(id))).map((o) => o.code)
  let sum = 0
  let n = 0
  for (const c of codes) {
    const e = state.value.o[c]
    if (e) {
      sum += objectiveRating(c) * weight(e)
      n += weight(e)
    }
  }
  return (sum + state.value.g * PRIOR) / (n + PRIOR)
}

export function stats(code) {
  const e = state.value.o[code]
  return { rating: objectiveRating(code), answered: e?.[1] || 0, accuracy: e?.[1] ? e[2] / e[1] : null, lookups: e?.[3] || 0 }
}

export function domainStats(id) {
  const codes = objectivesOf(DOMAINS.find((d) => d.id === Number(id))).map((o) => o.code)
  const rows = codes.map((c) => state.value.o[c]).filter(Boolean)
  const answered = rows.reduce((s, e) => s + e[1], 0)
  const points = rows.reduce((s, e) => s + e[2], 0)
  return { rating: domainRating(id), answered, accuracy: answered ? points / answered : null }
}

// Difficulty to serve for a question: a little above the user's level in that question's sub-section
// (practice), or a full point above it for exams, so the better you do, the harder it gets.
export const targetFor = (q, mode = 'practice') => clamp(objectiveRating(q.objective) + (mode === 'exam' ? 1 : 0.5), 1.5, 9.5)

// items: [{ q, d, score }] with score 0–1 (partial credit allowed). pct: session percent for the history.
export function applyAnswers(items, pct) {
  const s = state.value
  for (const { q, d, score } of items) {
    const o = (s.o[q.objective] ||= [s.g, 0, 0])
    const kObj = o[1] < 20 ? 0.25 : 0.12
    o[0] = clamp(o[0] + kObj * (score - expectedCorrect(objectiveRating(q.objective), d)))
    o[1] += 1
    o[2] = round(o[2] + score)
    s.g = clamp(s.g + 0.08 * (score - expectedCorrect(s.g, d)))
    s.n += 1
  }
  for (const e of Object.values(s.o)) e[0] = round(e[0])
  s.g = round(s.g)
  s.h = [...s.h, [Date.now(), s.g, Math.round(pct)]].slice(-15)
  save()
}

// Looking up an acronym during practice counts slightly against that sub-section. It lowers the level a
// little (and the level recovers as questions there are answered correctly) and is tallied for review.
export function applyLookup(code) {
  const s = state.value
  const o = (s.o[code] ||= [s.g, 0, 0])
  o[0] = round(clamp(o[0] - LOOKUP_PENALTY))
  o[3] = (o[3] || 0) + 1
  save()
}

// Sub-sections to focus on: the ones where the level is lowest, using only sections with some evidence
// (at least 3 answers). Prefers sections clearly below the overall level; otherwise the three lowest.
export function weakSections(limit = 5) {
  const rows = DOMAINS.flatMap((d) => objectivesOf(d).map((o) => ({ code: o.code, name: o.name, ...stats(o.code) })))
    .filter((r) => r.answered >= 3)
    .sort((a, b) => a.rating - b.rating)
  const below = rows.filter((r) => r.rating < state.value.g - 0.15)
  return (below.length ? below : rows.slice(0, 3)).slice(0, limit)
}

// Practice weighting: questions in sections further below your overall level are favoured (up to 2x).
export const weakBoost = (q) => clamp(1 + (state.value.g - objectiveRating(q.objective)) / 2, 1, 2)

// Manual feedback after a session nudges every sub-section that session covered.
const NUDGE = { easy: 0.5, right: 0, hard: -0.5 }
export function applyFeedback(kind, codes = []) {
  const s = state.value
  const nudge = NUDGE[kind] ?? 0
  s.f[kind] = (s.f[kind] || 0) + 1
  if (nudge) {
    s.g = round(clamp(s.g + nudge))
    for (const c of codes) {
      const e = s.o[c]
      if (e) e[0] = round(clamp(e[0] + nudge))
    }
  }
  save()
}

export const snapshot = () => state.value.g

// A level is only a measurement once there are answers behind it. Sections with none inherit the overall
// level purely to pick starting difficulty, so they must never be labelled (e.g. "Proficient") in the UI.
export const EVIDENCE_MIN = 5
export const toneFor = (r) => (r >= 6.5 ? 'good' : r >= 5 ? 'brand' : 'warn')
export function sectionBadge(stat) {
  if (!stat.answered) return { text: 'Not started', tone: '', measured: false }
  if (stat.answered < EVIDENCE_MIN) return { text: 'Early', tone: '', measured: false }
  return { text: labelFor(stat.rating), tone: toneFor(stat.rating), measured: true }
}
// The overall label waits for enough answers too (the same threshold as the exam-score estimate).
export const overallLabel = () => (state.value.n >= MIN_FOR_ESTIMATE ? labelFor(state.value.g) : 'Getting started')
export const overallTone = () => (state.value.n >= MIN_FOR_ESTIMATE ? toneFor(state.value.g) : '')

export function labelFor(rating) {
  return rating < 3 ? 'Foundational' : rating < 5 ? 'Developing' : rating < 6.5 ? 'Proficient' : rating < 8 ? 'Advanced' : 'Expert'
}

// Each sub-section's share of the real exam: its domain's official weight split evenly across the domain's objectives.
const OBJECTIVES = DOMAINS.flatMap((d) => objectivesOf(d).map((o) => ({ code: o.code, w: d.weight / d.objectives.length })))
const TOTAL_WEIGHT = OBJECTIVES.reduce((s, o) => s + o.w, 0)

// Predicted accuracy on real-exam-difficulty questions, as a 100–900 score with a range. Only sub-sections the
// learner has attempted are scored (weighted by their share of the exam); ones not started are left out rather
// than assumed, and the result reports how much of the exam it covers. The range widens when coverage is low and
// narrows as more answers are recorded. Returns null until there is enough data.
export function estimate() {
  const n = state.value.n
  if (n < MIN_FOR_ESTIMATE) return null
  const started = OBJECTIVES.filter((o) => (state.value.o[o.code]?.[1] || 0) > 0)
  if (!started.length) return null
  const w = started.reduce((s, o) => s + o.w, 0)
  const p = started.reduce((s, o) => s + o.w * expectedCorrect(objectiveRating(o.code), EXAM_REF), 0) / w
  const coverage = w / TOTAL_WEIGHT
  const scaled = Math.round(100 + 800 * p)
  const half = Math.round(((110 / Math.sqrt(1 + n / 40)) * (1 + 1.5 * (1 - coverage))) / 10) * 10
  return {
    scaled,
    low: Math.max(100, scaled - half),
    high: Math.min(900, scaled + half),
    answers: n,
    coverage,
    started: started.length,
    sections: OBJECTIVES.length
  }
}

// "6 of 22 sections · 28% of the exam"
export const coverageText = (est) => `${est.started} of ${est.sections} sections (${Math.round(est.coverage * 100)}% of the exam)`

export const reset = () => replace(blank())
