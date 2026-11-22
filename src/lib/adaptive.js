// Ties finished sessions to the rating engine: updates sub-section/domain/overall ratings from the
// answers, and returns what changed so the results screen can show it and ask for feedback.
import { difficultyOf } from './difficulty.js'
import { points, score } from './exam.js'
import { applyAnswers, applyFeedback, estimate, objectiveRating, snapshot, stats } from './level.js'

export function recordSession(questions, answers) {
  const before = snapshot()
  const items = questions.map((q, i) => ({ q, d: difficultyOf(q), score: points(q, answers[i] || []) }))

  // Per-section view of the session: what was served and how it went, with the level before the update.
  const sections = {}
  for (const { q, d, score: s } of items) {
    const sec = (sections[q.objective] ||= { code: q.objective, domain: q.domain, n: 0, points: 0, diff: 0, before: objectiveRating(q.objective), first: stats(q.objective).answered === 0 })
    sec.n++
    sec.points += s
    sec.diff += d
  }

  applyAnswers(items, score(questions, answers).pct)
  return {
    sections: Object.values(sections)
      .map((s) => ({ code: s.code, domain: s.domain, n: s.n, points: s.points, avgDifficulty: Math.round((s.diff / s.n) * 10) / 10, before: s.before, first: s.first }))
      .sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true })),
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
