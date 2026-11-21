// Ties finished sessions to the rating engine: updates sub-section/domain/overall ratings from the
// answers, and returns what changed so the results screen can show it and ask for feedback.
import { difficultyOf } from './difficulty.js'
import { points, score } from './exam.js'
import { applyAnswers, applyFeedback, estimate, snapshot } from './level.js'

export function recordSession(questions, answers) {
  const before = snapshot()
  const items = questions.map((q, i) => ({ q, d: difficultyOf(q), score: points(q, answers[i] || []) }))
  applyAnswers(items, score(questions, answers).pct)
  return {
    before,
    after: snapshot(),
    estimate: estimate(),
    codes: [...new Set(questions.map((q) => q.objective))],
    avgDifficulty: Math.round((items.reduce((s, x) => s + x.d, 0) / (items.length || 1)) * 10) / 10
  }
}

export function rateSession(session, kind) {
  applyFeedback(kind, session.codes)
  return { after: snapshot(), estimate: estimate() }
}
