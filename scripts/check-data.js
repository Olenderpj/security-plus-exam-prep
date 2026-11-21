import { QUESTIONS } from '../src/data/questions/index.js'
import FLASHCARDS from '../src/data/flashcards.js'
let bad = 0
for (const q of QUESTIONS) {
  const multi = /Select (TWO|THREE)/.test(q.question)
  if (q.correct.some((c) => c < 0 || c >= q.options.length)) { console.log('bad index', q.id); bad++ }
  if (multi !== q.correct.length > 1) { console.log('multi mismatch', q.id); bad++ }
  if (new Set(q.options).size !== q.options.length) { console.log('dup option', q.id); bad++ }
}
const by = {}
QUESTIONS.forEach((q) => (by[q.domain] = (by[q.domain] || 0) + 1))
console.log('questions', QUESTIONS.length, by, 'flashcards', FLASHCARDS.length)
process.exit(bad ? 1 : 0)
