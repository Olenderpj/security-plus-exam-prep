import { QUESTIONS } from '../data/questions/index.js'
import { DOMAINS, EXAM } from '../data/domains.js'
import { shuffle, shuffleOptions } from './random.js'

export function practiceSet(domain, count) {
  const pool = domain ? QUESTIONS.filter((q) => q.domain === Number(domain)) : QUESTIONS
  const picked = shuffle(pool)
  return (count === 'all' ? picked : picked.slice(0, Number(count))).map(shuffleOptions)
}

// Builds an exam weighted by the official domain percentages.
export function examSet(total = EXAM.questions) {
  total = Math.min(total, QUESTIONS.length)
  const targets = DOMAINS.map((d) => ({ id: d.id, n: Math.round((d.weight / 100) * total) }))
  let diff = total - targets.reduce((s, t) => s + t.n, 0)
  targets.sort((a, b) => b.n - a.n)
  for (let i = 0; diff !== 0; i = (i + 1) % targets.length) {
    targets[i].n += Math.sign(diff)
    diff -= Math.sign(diff)
  }
  const used = new Set()
  let picked = []
  for (const t of targets) {
    const pool = shuffle(QUESTIONS.filter((q) => q.domain === t.id)).slice(0, t.n)
    pool.forEach((q) => used.add(q.id))
    picked.push(...pool)
  }
  // Top up if any domain ran short.
  if (picked.length < total) {
    picked.push(...shuffle(QUESTIONS.filter((q) => !used.has(q.id))).slice(0, total - picked.length))
  }
  return shuffle(picked).map(shuffleOptions)
}

export const isCorrect = (q, selected) =>
  selected.length === q.correct.length && selected.every((i) => q.correct.includes(i))

// Approximation of CompTIA's 100–900 scale. The real scaling is not published.
export const scaled = (correct, total) => Math.round(100 + (800 * correct) / Math.max(total, 1))

export function breakdown(questions, answers) {
  const out = {}
  questions.forEach((q, i) => {
    const b = (out[q.domain] ||= { correct: 0, total: 0 })
    b.total++
    if (isCorrect(q, answers[i] || [])) b.correct++
  })
  return out
}
