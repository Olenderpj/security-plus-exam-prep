import { QUESTIONS } from '../src/data/questions/index.js'
import FLASHCARDS from '../src/data/flashcards.js'
import ACRONYMS from '../src/data/acronyms.js'
let bad = 0
const fail = (msg, q) => { console.log(msg, q.id, q.question.slice(0, 60)); bad++ }
const seen = new Set()
for (const q of QUESTIONS) {
  if (seen.has(q.question)) fail('duplicate question', q)
  seen.add(q.question)
  if (q.type === 'mc') {
    const multi = /Select (TWO|THREE)/.test(q.question)
    if (q.correct.some((c) => c < 0 || c >= q.options.length)) fail('bad index', q)
    if (multi !== q.correct.length > 1) fail('multi mismatch', q)
    if (new Set(q.options).size !== q.options.length) fail('dup option', q)
  } else if (q.type === 'match') {
    q.items.forEach((it) => it.answer < 0 && fail(`answer not in choices: ${it.label}`, q))
  } else if (q.type === 'order') {
    if (q.items.length < 3) fail('order too short', q)
  }
}
const by = {}
QUESTIONS.forEach((q) => { const k = `${q.domain}:${q.type}`; by[k] = (by[k] || 0) + 1 })
console.log('questions', QUESTIONS.length, by)
console.log('exhibits', QUESTIONS.filter((q) => q.exhibit).length, 'flashcards', FLASHCARDS.length, 'acronyms', ACRONYMS.length)
process.exit(bad ? 1 : 0)
