// Saves a running practice / exam / flashcard session in this browser so a refresh (or closing and
// reopening the tab) resumes exactly where you were instead of losing the answers.
// A saved session older than RESUME_MS is treated as abandoned (see sweepStaleSessions).
import { recordSession } from './adaptive.js'
import { breakdown, isCorrect } from './exam.js'
import { saveAttempt } from './progress.js'

const KEY = (kind) => `secplus.session.${kind}`
export const RESUME_MS = 12 * 60 * 60 * 1000

export function saveSession(kind, data) {
  try {
    localStorage.setItem(KEY(kind), JSON.stringify({ ...data, t: Date.now() }))
  } catch {}
}
export function clearSession(kind) {
  try {
    localStorage.removeItem(KEY(kind))
  } catch {}
}
// The saved session, or null when there is none (or it is unusable or too old).
export function loadSession(kind, validate = (s) => Array.isArray(s.questions) && s.questions.length) {
  try {
    const s = JSON.parse(localStorage.getItem(KEY(kind)))
    if (s && Date.now() - s.t < RESUME_MS && validate(s)) return s
  } catch {}
  return null
}

// Practice sessions abandoned for a long time still count: the answered questions are scored and
// recorded, like ending the session early. Exams and flashcard decks that were never resumed are dropped.
export async function sweepStaleSessions() {
  clearIfStale('exam')
  clearIfStale('flashcards')
  clearIfStale('match')
  let s = null
  try {
    s = JSON.parse(localStorage.getItem(KEY('practice')))
  } catch {}
  if (!s || Date.now() - s.t < RESUME_MS) return
  clearSession('practice')
  const n = Math.min((s.idx || 0) + (s.revealed ? 1 : 0), s.questions?.length || 0)
  if (n < 1) return
  const qs = s.questions.slice(0, n)
  const ans = (s.answers || []).slice(0, n)
  recordSession(qs, ans)
  await saveAttempt({
    mode: 'practice',
    domain: s.domain ?? null,
    total: qs.length,
    correct: qs.filter((q, i) => isCorrect(q, ans[i] || [])).length,
    timed: false,
    duration_seconds: Math.round(((s.t || Date.now()) - (s.startedAt || s.t)) / 1000),
    domain_breakdown: { ...breakdown(qs, ans), ...(s.domains?.length > 1 ? { domains: s.domains } : {}) }
  })
}
function clearIfStale(kind) {
  try {
    const s = JSON.parse(localStorage.getItem(KEY(kind)))
    if (s && Date.now() - s.t >= RESUME_MS) clearSession(kind)
  } catch {}
}
