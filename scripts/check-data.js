import { QUESTIONS, VARIANTS, EXTRA_WORDINGS } from '../src/data/questions/index.js'
import FLASHCARDS from '../src/data/flashcards.js'
import ACRONYMS from '../src/data/acronyms.js'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
let bad = 0
const fail = (msg, q) => { console.log(msg, q.id, q.question.slice(0, 60)); bad++ }
const seen = new Set()
for (const q of QUESTIONS) {
  const sig = `${q.question}|${q.exhibit || ''}`
  if (seen.has(sig)) fail('duplicate question', q)
  seen.add(sig)
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
for (const id of Object.keys(EXTRA_WORDINGS)) if (!ids.has(id)) { console.log('extra wording for unknown id', id); bad++ }
for (const q of QUESTIONS) if (q.wordings.length < 3) fail(`only ${q.wordings.length} wordings (need >= 3)`, q)
for (const q of QUESTIONS) if (Number(String(q.objective).split('.')[0]) !== q.domain) fail(`objective ${q.objective} is not in domain ${q.domain}`, q)
for (const id of Object.keys(VARIANTS)) if (!ids.has(id)) { console.log('variant for unknown id', id); bad++ }
for (const q of QUESTIONS) {
  for (const w of q.wordings.slice(1)) {
    if (/Select (TWO|THREE)/.test(w) !== /Select (TWO|THREE)/.test(q.question)) fail('variant select-count mismatch', q)
    const wk = `${w}|${q.exhibit || ''}`
    if (seen.has(wk) || (!q.exhibit && seen.has(`${w}|`))) fail('variant duplicates a question', q)
    seen.add(wk)
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
// IDs are mostly positional (e.g. d1-14 = 15th Domain 1 question, r-3, l-2-5) and are stored in users'
// missed/flagged lists, review history, wording history and flashcard marks. This lock catches an
// insertion, removal or reorder that would silently point saved IDs at different content.
// After appending new content: node scripts/check-data.js --update-lock
const LOCK = new URL('./ids.lock.json', import.meta.url)
const current = Object.fromEntries([
  ...QUESTIONS.map((q) => [q.id, q.question.slice(0, 60)]),
  ...FLASHCARDS.map((f) => [f.id, f.front]),
  ...ACRONYMS.map((a) => [a.id, a.front])
])
const lock = existsSync(LOCK) ? JSON.parse(readFileSync(LOCK, 'utf8')) : {}
for (const [id, text] of Object.entries(lock)) {
  if (current[id] !== text) {
    console.log(`ID ${id} changed: was "${text}", now "${current[id] ?? '(missing)'}". Append new content at the end instead of inserting or removing it.`)
    bad++
  }
}
if (!bad && process.argv.includes('--update-lock')) {
  writeFileSync(LOCK, JSON.stringify({ ...lock, ...current }, null, 0).replace(/","/g, '",\n"') + '\n')
  console.log('ids.lock.json updated:', Object.keys({ ...lock, ...current }).length, 'ids')
}
process.exit(bad ? 1 : 0)
