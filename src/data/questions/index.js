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
  ...tag([...d1, ...d1b], 1),
  ...tag([...d2, ...d2b], 2),
  ...tag([...d3, ...d3b], 3),
  ...tag([...d4, ...d4b], 4),
  ...tag([...d5, ...d5b], 5)
]
