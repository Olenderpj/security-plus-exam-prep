import d1 from './d1.js'
import d2 from './d2.js'
import d3 from './d3.js'
import d4 from './d4.js'
import d5 from './d5.js'

const tag = (list, domain) =>
  list.map((q, i) => ({
    id: `d${domain}-${i}`,
    domain,
    objective: q.o,
    question: q.q,
    options: q.a,
    correct: Array.isArray(q.c) ? q.c : [q.c],
    explanation: q.e
  }))

export const QUESTIONS = [
  ...tag(d1, 1),
  ...tag(d2, 2),
  ...tag(d3, 3),
  ...tag(d4, 4),
  ...tag(d5, 5)
]
