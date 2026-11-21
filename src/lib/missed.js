// Questions answered incorrectly in practice or exams. A question is removed
// from the list as soon as it is answered correctly.
import { syncedSet } from './syncedSet.js'
import { isCorrect } from './exam.js'

const { set, update } = syncedSet('secplus.missed', 'missed_questions')

export const missed = set

export function recordAnswer(q, ans = []) {
  isCorrect(q, ans) ? update([], [q.id]) : update([q.id])
}

// For exams: every wrong or unanswered question is recorded, correct ones cleared.
export function recordResults(questions, answers) {
  const add = []
  const remove = []
  questions.forEach((q, i) => (isCorrect(q, answers[i] || []) ? remove : add).push(q.id))
  update(add, remove)
}

export const clearMissed = () => update([], [...set.value])
