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
import v1 from './variants-d1.js'
import v2 from './variants-d2.js'
import v3 from './variants-d3.js'
import v4 from './variants-d4.js'
import v5 from './variants-d5.js'

// Alternate question wordings keyed by question ID (same concept, same answers).
export const VARIANTS = { ...v1, ...v2, ...v3, ...v4, ...v5 }

// Normalizes the compact authoring format into one shape per question type:
//   mc:    options[], correct[]              (answer = selected option indexes)
//   match: items[{label, choices, answer}]   (answer = chosen choice index per item)
//   order: items[], correct[]                (answer = item indexes in chosen order)
function normalize(q, domain, id) {
  const base = { id, domain, objective: q.o, question: q.q, explanation: q.e, exhibit: q.x || null }
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
const withWordings = (q) => ({ ...q, wordings: [q.question, ...[].concat(VARIANTS[q.id] || [])] })

const tag = (list, domain) => list.map((q, i) => withWordings(normalize(q, domain, `d${domain}-${i}`)))

export const QUESTIONS = [
  ...tag([...d1, ...d1b], 1),
  ...tag([...d2, ...d2b], 2),
  ...tag([...d3, ...d3b], 3),
  ...tag([...d4, ...d4b], 4),
  ...tag([...d5, ...d5b], 5),
  ...pbq.map((q, i) => withWordings(normalize(q, q.d, `p-${i}`)))
]

// Performance-based = anything that isn't plain multiple choice.
export const isPBQ = (q) => q.type !== 'mc'
export const hasExhibit = (q) => Boolean(q.exhibit)
