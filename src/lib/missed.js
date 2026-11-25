// Review lists for questions: missed (any wrong answer in practice or an exam adds it) and flagged (added by
// hand). While a question is on either list every attempt is scored, and it comes off both once its last
// four attempts average 75% or better (reviewHistory.js). A flagged question can also be unflagged by hand.
import { watch } from 'vue'
import { syncedSet } from './syncedSet.js'
import { isCorrect, points } from './exam.js'
import { QUESTIONS } from '../data/questions/index.js'
import { authReady } from './auth.js'
import { flagged, updateFlagged } from './flagged.js'
import { dropHistory, recordScore, reviewProgress } from './reviewHistory.js'

const { set, update } = syncedSet('secplus.missed', 'missed_questions')

export const missed = set
export { flagged }

// Drop IDs of questions that no longer exist (e.g. a retired question family), so list counts match what
// can actually be practised and stale entries don't sit on the lists forever. Waits for auth so a signed-in
// device's copy is never rewritten before the account's list has loaded.
const KNOWN = new Set(QUESTIONS.map((q) => q.id))
watch(
  [set, flagged, authReady],
  ([m, f, ready]) => {
    if (!ready) return
    const goneMissed = [...m].filter((id) => !KNOWN.has(id))
    const goneFlagged = [...f].filter((id) => !KNOWN.has(id))
    if (goneMissed.length) update([], goneMissed)
    if (goneFlagged.length) updateFlagged([], goneFlagged)
    if (goneMissed.length || goneFlagged.length) dropHistory([...goneMissed, ...goneFlagged])
  },
  { immediate: true }
)

function review(pairs) {
  const add = []
  const clear = []
  pairs.forEach(([q, ans]) => {
    const wrong = !isCorrect(q, ans)
    if (wrong && !set.value.has(q.id)) add.push(q.id)
    if (!wrong && !set.value.has(q.id) && !flagged.value.has(q.id)) return // not on a list: nothing to track
    recordScore(q.id, points(q, ans))
    if (reviewProgress(q.id).cleared) clear.push(q.id)
  })
  update(add, clear)
  if (clear.length) {
    updateFlagged([], clear)
    dropHistory(clear)
  }
}

export const recordAnswer = (q, ans = []) => review([[q, ans]])
// For exams: every wrong or unanswered question is recorded.
export const recordResults = (questions, answers) => review(questions.map((q, i) => [q, answers[i] || []]))

export const isFlagged = (id) => flagged.value.has(id)
export function toggleFlag(id) {
  if (flagged.value.has(id)) {
    updateFlagged([], [id])
    if (!set.value.has(id)) dropHistory([id])
  } else updateFlagged([id])
}
export const onReviewList = (id) => set.value.has(id) || flagged.value.has(id)

export function clearMissed() {
  const ids = [...set.value]
  update([], ids)
  dropHistory(ids.filter((id) => !flagged.value.has(id)))
}
