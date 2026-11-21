import { QUESTIONS, VARIANTS } from '../src/data/questions/index.js'
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
// Alternate wordings
const ids = new Set(QUESTIONS.map((q) => q.id))
for (const id of Object.keys(VARIANTS)) if (!ids.has(id)) { console.log('variant for unknown id', id); bad++ }
for (const q of QUESTIONS) {
  for (const w of q.wordings.slice(1)) {
    if (/Select (TWO|THREE)/.test(w) !== /Select (TWO|THREE)/.test(q.question)) fail('variant select-count mismatch', q)
    if (seen.has(w)) fail('variant duplicates a question', q)
    seen.add(w)
    if (q.type === 'mc') {
      for (const c of q.correct) {
        const ans = q.options[c].toLowerCase()
        if (ans.length > 4 && w.toLowerCase().includes(ans)) console.log('  warn: variant contains answer', q.id, '->', q.options[c])
      }
    }
  }
}
const withVariants = QUESTIONS.filter((q) => q.wordings.length > 1).length
console.log('questions with alternate wordings:', withVariants, 'of', QUESTIONS.filter((q) => q.type === 'mc' && !/^[phl]-/.test(q.id)).length, 'standard MC')

const by = {}
QUESTIONS.forEach((q) => { const k = `${q.domain}:${q.type}`; by[k] = (by[k] || 0) + 1 })
console.log('questions', QUESTIONS.length, by)
console.log('exhibits', QUESTIONS.filter((q) => q.exhibit).length, 'flashcards', FLASHCARDS.length, 'acronyms', ACRONYMS.length)
process.exit(bad ? 1 : 0)
