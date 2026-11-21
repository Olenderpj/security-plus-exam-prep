import { QUESTIONS, isPBQ } from '../data/questions/index.js'
import { DOMAINS, EXAM } from '../data/domains.js'
import { shuffle, shuffleQuestion } from './random.js'

// Remembers when each question was last served (in this browser) so new
// sessions favour questions you haven't seen recently.
const SEEN_KEY = 'secplus.seen'
function readSeen() {
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY)) || {}
  } catch {
    return {}
  }
}
function markSeen(questions) {
  const seen = readSeen()
  const now = Date.now()
  questions.forEach((q) => (seen[q.id] = now))
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen))
  } catch {}
}

// Random order, but least-recently-seen questions come first.
function freshFirst(pool, seen) {
  return shuffle(pool).sort((a, b) => (seen[a.id] || 0) - (seen[b.id] || 0))
}

// kind: 'all' | 'mc' | 'pbq' (performance-based + exhibit questions)
export const matchesKind = (q, kind) =>
  kind === 'all' || (kind === 'pbq' ? isPBQ(q) || Boolean(q.exhibit) : !isPBQ(q) && !q.exhibit)

// onlyIds: restrict to a set of question IDs (e.g. previously missed questions)
export const practicePool = (domain, kind = 'all', onlyIds = null) =>
  QUESTIONS.filter(
    (q) => (!domain || q.domain === Number(domain)) && matchesKind(q, kind) && (!onlyIds || onlyIds.has(q.id))
  )

export function practiceSet(domain, count, kind = 'all', onlyIds = null) {
  const pool = practicePool(domain, kind, onlyIds)
  const picked = count === 'all' ? pool : freshFirst(pool, readSeen()).slice(0, Number(count))
  markSeen(picked)
  return shuffle(picked).map(shuffleQuestion)
}

// Builds an exam weighted by the official domain percentages. Like the real
// exam, performance-based questions are presented first.
export function examSet(total = EXAM.questions, onlyIds = null) {
  const seen = readSeen()
  if (onlyIds) {
    // Retest exam from a given set (e.g. missed questions): PBQs first, then the rest.
    const picked = freshFirst(QUESTIONS.filter((q) => onlyIds.has(q.id)), seen).slice(0, total)
    markSeen(picked)
    return [...shuffle(picked.filter(isPBQ)), ...shuffle(picked.filter((q) => !isPBQ(q)))].map(shuffleQuestion)
  }
  total = Math.min(total, QUESTIONS.length)
  const pbqs = freshFirst(QUESTIONS.filter(isPBQ), seen).slice(0, Math.max(1, Math.round(total / 18)))

  const targets = DOMAINS.map((d) => ({ id: d.id, n: Math.round((d.weight / 100) * total) }))
  let diff = total - targets.reduce((s, t) => s + t.n, 0)
  targets.sort((a, b) => b.n - a.n)
  for (let i = 0; diff !== 0; i = (i + 1) % targets.length) {
    targets[i].n += Math.sign(diff)
    diff -= Math.sign(diff)
  }
  pbqs.forEach((q) => {
    const t = targets.find((t) => t.id === q.domain)
    t.n = Math.max(0, t.n - 1)
  })

  const used = new Set(pbqs.map((q) => q.id))
  const rest = []
  for (const t of targets) {
    const pool = freshFirst(QUESTIONS.filter((q) => q.domain === t.id && !isPBQ(q)), seen).slice(0, t.n)
    pool.forEach((q) => used.add(q.id))
    rest.push(...pool)
  }
  const short = total - pbqs.length - rest.length
  if (short > 0) rest.push(...freshFirst(QUESTIONS.filter((q) => !used.has(q.id) && !isPBQ(q)), seen).slice(0, short))

  const picked = [...shuffle(pbqs), ...shuffle(rest)]
  markSeen(picked)
  return picked.map(shuffleQuestion)
}

const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])

export function isCorrect(q, ans = []) {
  if (q.type === 'match') return q.items.every((it, i) => ans[i] === it.answer)
  if (q.type === 'order') return eq(ans, q.correct)
  return ans.length === q.correct.length && ans.every((i) => q.correct.includes(i))
}

// True once every part of the question has a response.
export function isComplete(q, ans = []) {
  if (q.type === 'match') return q.items.every((_, i) => ans[i] != null)
  if (q.type === 'order') return ans.length === q.items.length
  return ans.length === q.correct.length
}

export const isStarted = (ans = []) => ans.some((x) => x != null)

// Parts correct, for partial feedback on performance-based questions.
export function partsCorrect(q, ans = []) {
  if (q.type === 'match') return { got: q.items.filter((it, i) => ans[i] === it.answer).length, of: q.items.length }
  if (q.type === 'order') return { got: q.correct.filter((c, i) => ans[i] === c).length, of: q.correct.length }
  return { got: isCorrect(q, ans) ? 1 : 0, of: 1 }
}

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
