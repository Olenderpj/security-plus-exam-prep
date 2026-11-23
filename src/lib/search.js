// Full-text search across every question, flashcard, and acronym.
// All terms must match (AND); matches in the title/front rank above matches in the body.
import { QUESTIONS } from '../data/questions/index.js'
import FLASHCARDS from '../data/flashcards.js'
import ACRONYMS from '../data/acronyms.js'
import { domainById, objectiveName } from '../data/domains.js'
import { notes } from './notes.js'
import { stripMarkup } from './richtext.js'

const low = (s) => String(s ?? '').toLowerCase()

const optionText = (q) =>
  q.type === 'mc' ? q.options : q.type === 'match' ? q.items.flatMap((i) => [i.label, ...i.choices]) : q.items

let index = null
function buildIndex() {
  return {
    questions: QUESTIONS.map((q) => ({
      item: q,
      title: low(q.wordings.join(' ')),
      body: low([...optionText(q), q.explanation, q.exhibit, ...(q.panels || []).flatMap((p) => [p.name, p.role, ...p.s.flat()]), q.objective, objectiveName(q.objective)].join(' '))
    })),
    cards: FLASHCARDS.map((c) => ({
      item: c,
      title: low(c.front),
      body: low(`${c.back} ${domainById(c.domain).name}`)
    })),
    acronyms: ACRONYMS.map((a) => ({
      item: a,
      title: low(`${a.front} ${a.back}`),
      body: low(a.note)
    }))
  }
}

export const termsOf = (query) => low(query).split(/\s+/).filter(Boolean)

function rank(entries, terms) {
  const hits = []
  for (const e of entries) {
    let score = 0
    for (const t of terms) {
      if (e.title.includes(t)) score += e.title.startsWith(t) ? 5 : 3
      else if (e.body.includes(t)) score += 1
      else { score = 0; break }
    }
    if (score) hits.push({ item: e.item, score })
  }
  return hits.sort((a, b) => b.score - a.score).map((h) => h.item)
}

// Notes change as you type, so they are matched live instead of indexed.
// Each hit carries the section plus its lines that contain a search term.
function searchNotes(terms) {
  const hits = []
  for (const s of notes.value.sections) {
    const title = low(s.title)
    const body = low(stripMarkup(s.body))
    let score = 0
    for (const t of terms) {
      if (title.includes(t)) score += 3
      else if (body.includes(t)) score += 1
      else { score = 0; break }
    }
    if (!score) continue
    const lines = stripMarkup(s.body).split('\n').filter((l) => terms.some((t) => low(l).includes(t))).slice(0, 4)
    hits.push({ id: s.id, title: s.title, lines, score })
  }
  return hits.sort((a, b) => b.score - a.score)
}

export function search(query) {
  const terms = termsOf(query)
  if (!terms.length) return { terms, questions: [], cards: [], acronyms: [], notes: [] }
  index ??= buildIndex()
  return {
    terms,
    questions: rank(index.questions, terms),
    cards: rank(index.cards, terms),
    acronyms: rank(index.acronyms, terms),
    notes: searchNotes(terms)
  }
}

// Splits text into [{ text, hit }] segments so matches can be marked without v-html.
export function highlight(text, terms) {
  const s = String(text ?? '')
  if (!terms.length) return [{ text: s, hit: false }]
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return s.split(re).map((text, i) => ({ text, hit: i % 2 === 1 })).filter((p) => p.text)
}

// The correct answer of a question as display lines, for any question type.
export function answerLines(q) {
  if (q.type === 'mc') return q.correct.map((i) => q.options[i])
  if (q.type === 'match') return q.items.map((it) => `${it.label} → ${it.choices[it.answer]}`)
  return q.correct.map((i, n) => `${n + 1}. ${q.items[i]}`)
}
