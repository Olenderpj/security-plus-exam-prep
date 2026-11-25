import d1 from './d1.js'
import d2 from './d2.js'
import d3 from './d3.js'
import d4 from './d4.js'
import d5 from './d5.js'
import d1b from './d1-more.js'
import d2b from './d2-more.js'
import d3b from './d3-more.js'
import d4b from './d4-more.js'
import d5b from './d5-more.js'
import pbq from './pbq.js'
import pbqMore from './pbq-more.js'
import hard from './hard.js'
import ladders from './ladders.js'
import generated from '../generated/index.js'
import scenarios from './scenarios.js'
import resilience from './resilience.js'
import guide from './guide.js'
import guidePbq from './guide-pbq.js'
import v1 from './variants-d1.js'
import v2 from './variants-d2.js'
import v3 from './variants-d3.js'
import v4 from './variants-d4.js'
import v5 from './variants-d5.js'
import extra from './variants-extra.js'

// Alternate question wordings keyed by question ID (same concept, same answers).
export const VARIANTS = { ...v1, ...v2, ...v3, ...v4, ...v5 }
// Two further wordings per question, so every question can be asked several different ways.
export const EXTRA_WORDINGS = extra

// Normalizes the compact authoring format into one shape per question type:
//   mc:    options[], correct[]              (answer = selected option indexes)
//   match: items[{label, choices, answer}]   (answer = chosen choice index per item)
//   order: items[], correct[]                (answer = item indexes in chosen order)
function normalize(q, domain, id) {
  const base = { id, domain, objective: q.o, question: q.q, explanation: q.e, exhibit: q.x || null, lvl: q.lv ?? null, alt: q.w || [], panels: q.p || null }
  if (q.t === 'match') {
    const items = q.items.map(([label, ans, own]) => {
      const choices = own || q.choices
      return { label, choices, answer: choices.indexOf(ans) }
    })
    return { ...base, type: 'match', items, mono: !!q.mono }
  }
  if (q.t === 'order') {
    return { ...base, type: 'order', items: q.items, correct: q.items.map((_, i) => i) }
  }
  return { ...base, type: 'mc', options: q.a, correct: Array.isArray(q.c) ? q.c : [q.c] }
}

// Every question carries all of its wordings; the first is the original.
const withWordings = (q) => ({ ...q, wordings: [...new Set([q.question, ...[].concat(VARIANTS[q.id] || []), ...(EXTRA_WORDINGS[q.id] || []), ...(q.alt || [])])] })

const tag = (list, domain) => list.map((q, i) => withWordings(normalize(q, domain, `d${domain}-${i}`)))

export const QUESTIONS = [
  ...tag([...d1, ...d1b], 1),
  ...tag([...d2, ...d2b], 2),
  ...tag([...d3, ...d3b], 3),
  ...tag([...d4, ...d4b], 4),
  ...tag([...d5, ...d5b], 5),
  ...pbq.map((q, i) => withWordings(normalize(q, q.d, `p-${i}`))),
  ...pbqMore.map((q, i) => withWordings(normalize(q, q.d, `p-${pbq.length + i}`))),
  ...hard.map((q, i) => withWordings(normalize(q, q.d, `h-${i}`))),
  // System-analysis scenarios: several computers with logs and other evidence to investigate.
  ...scenarios.map((q, i) => withWordings(normalize(q, q.d, `s-${i}`))),
  // Questions adapted from the user's SY0-701 practice-exam study guide (served for about 80% of each set; see exam.js).
  ...guide.map((q) => withWordings(normalize(q, q.d, `m-${q.id}`))),
  ...guidePbq.map((q, i) => withWordings(normalize(q, q.d, `mp-${i}`))),
  // Resilience, availability and recovery scenarios in the exam's style.
  ...resilience.map((q, i) => withWordings(normalize(q, q.d, `r-${i}`))),
  // Generated families (calculations, rule and log analysis, vector reading) at every level from 4.5 to 9.5.
  ...generated.map((g) => withWordings(normalize(g, g.d, g.id))),
  // Ladders: the same concept at several difficulty rungs; `family` keeps a session to one rung per ladder.
  ...ladders.flatMap((ladder, li) =>
    ladder.rungs.map((r, ri) => ({
      ...withWordings(normalize({ ...r, o: r.o ?? ladder.o }, ladder.d, `l-${li}-${ri}`)),
      family: `l${li}`,
      topic: ladder.topic
    }))
  )
]

// Performance-based = anything that isn't plain multiple choice.
export const isPBQ = (q) => q.type !== 'mc'
export const hasExhibit = (q) => Boolean(q.exhibit)
// Questions derived from the study guide.
export const isGuide = (q) => q.id.startsWith('m-') || q.id.startsWith('mp-')
// Where a guide question sits in the original practice exams: { exam: 'A' | 'B' | 'C', n: question number }.
// MC ids carry it (m-B39); the 15 PBQs are Q1–Q5 of exams A, B and C in turn (mp-0 … mp-14).
export const PRACTICE_EXAMS = ['A', 'B', 'C']
export function guideRef(q) {
  const m = /^m-([ABC])(\d+)$/.exec(q.id)
  if (m) return { exam: m[1], n: Number(m[2]) }
  const p = /^mp-(\d+)$/.exec(q.id)
  return p ? { exam: PRACTICE_EXAMS[Math.floor(p[1] / 5)], n: (p[1] % 5) + 1 } : null
}
