// Recent results for items on a review list (missed or flagged questions, auto-marked flashcards). An item
// comes off its list once its last CLEAR_WINDOW attempts average CLEAR_AVG or better, so one lucky answer
// is not enough. Only items on a list are tracked, and their history is dropped when they leave it.
import { computed } from 'vue'
import { syncedValue } from './syncedValue.js'

export const CLEAR_WINDOW = 4
export const CLEAR_AVG = 0.75

const { state, save } = syncedValue('secplus.review', 'review_history', () => ({ s: {} }))
export const reviewScores = computed(() => state.value.s)

// score: 0–1 (performance-based questions earn partial credit).
export function recordScore(id, score) {
  const s = state.value.s
  s[id] = [...(s[id] || []), Math.round(score * 100) / 100].slice(-CLEAR_WINDOW)
  save()
}
export function dropHistory(ids) {
  const s = state.value.s
  let changed = false
  ids.forEach((id) => id in s && (delete s[id], (changed = true)))
  if (changed) save()
}
// { n: attempts recorded (max CLEAR_WINDOW), avg: average of them or null, cleared }
export function reviewProgress(id) {
  const h = state.value.s[id] || []
  const avg = h.length ? h.reduce((a, b) => a + b, 0) / h.length : null
  return { n: h.length, scores: h, avg, cleared: h.length >= CLEAR_WINDOW && avg >= CLEAR_AVG - 1e-9 }
}
