import { QUESTIONS, isGuide, isPBQ } from '../data/questions/index.js'
import { DOMAINS, EXAM } from '../data/domains.js'
import { shuffle, shuffleQuestion } from './random.js'
import { difficultyOf } from './difficulty.js'
import { targetFor, weakBoost } from './level.js'
import { inRange } from './serving.js'

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

// Picks a wording for each question, avoiding the one shown last time.
const WORDING_KEY = 'secplus.wording'
function applyWordings(questions) {
  let last = {}
  try {
    last = JSON.parse(localStorage.getItem(WORDING_KEY)) || {}
  } catch {}
  const out = questions.map((q) => {
    const n = q.wordings?.length || 1
    if (n < 2) return q
    const options = [...Array(n).keys()].filter((i) => i !== last[q.id])
    const pick = options[Math.floor(Math.random() * options.length)]
    last[q.id] = pick
    return { ...q, question: q.wordings[pick], wording: pick }
  })
  try {
    localStorage.setItem(WORDING_KEY, JSON.stringify(last))
  } catch {}
  return out
}

// Random order, but least-recently-seen questions come first.
function freshFirst(pool, seen) {
  return shuffle(pool).sort((a, b) => (seen[a.id] || 0) - (seen[b.id] || 0))
}

// Adaptive pick: questions near the difficulty the user should be seeing in their own sub-section
// are favoured (Gaussian weight), then ones not seen recently. Weighted sampling without replacement.
function pickAdaptive(pool, n, mode, seen, boost = null) {
  const now = Date.now()
  return pool
    .map((q) => {
      const gap = difficultyOf(q) - targetFor(q, mode)
      const age = seen[q.id] ? Math.min(14, (now - seen[q.id]) / 864e5) : 14
      const w = Math.max(1e-6, Math.exp(-(gap * gap) / (2 * 1.5 * 1.5)) * (0.4 + (0.6 * age) / 14) * (boost ? boost(q) : 1))
      return { q, k: Math.random() ** (1 / w) }
    })
    .sort((a, b) => b.k - a.k)
    .reduce((out, { q }) => {
      // At most one rung of a difficulty ladder per session.
      if (out.length < n && !(q.family && out.some((x) => x.family === q.family))) out.push(q)
      return out
    }, [])
}

// kind: 'all' | 'mc' | 'pbq' (performance-based + exhibit questions)
export const matchesKind = (q, kind) =>
  kind === 'all' || (kind === 'pbq' ? isPBQ(q) || Boolean(q.exhibit) : !isPBQ(q) && !q.exhibit)

// Practice pool. domain: one domain id, or null. kind: question type. onlyIds: restrict to a set of question ids
// (e.g. missed questions). objective: one sub-section code, or several (array/Set). sections: restrict to a set
// of objective codes (e.g. the learner's weak areas).
// Questions come from near the learner's level in each sub-section (see serving.js). If that leaves fewer than
// POOL_FLOOR questions, the range is widened step by step, finally to everything that matches the other
// choices, so a selection never comes up empty while questions of that kind exist.
const POOL_FLOOR = 10
const asSet = (x) => (x == null ? null : x instanceof Set ? (x.size ? x : null) : [].concat(x).length ? new Set([].concat(x)) : null)
// Everything matching the learner's choices, before any difficulty window is applied.
function basePool(domain, kind, onlyIds, objective, sections) {
  const objs = asSet(objective)
  return QUESTIONS.filter(
    (q) =>
      (!domain || q.domain === Number(domain)) &&
      (!sections || sections.has(q.objective)) &&
      (!objs || objs.has(q.objective)) &&
      matchesKind(q, kind) &&
      (!onlyIds || onlyIds.has(q.id))
  )
}
// Narrowest window (see serving.js) that still yields `need` questions, widening step by step up to `ladder`'s end.
function widenTo(base, need, ladder = [0, 0.1, 0.2, 0.35, Infinity]) {
  const floor = Math.min(need, base.length)
  let pool = []
  for (const extra of ladder) {
    pool = base.filter((q) => inRange(q, extra))
    if (pool.length >= floor) break
  }
  return pool
}
export function practicePool(domain, kind = 'all', onlyIds = null, objective = null, sections = null) {
  return widenTo(basePool(domain, kind, onlyIds, objective, sections), POOL_FLOOR)
}

// About 80% of every practice set and exam comes from the questions adapted from the study guide; the rest come
// from the app's own bank. Guide questions are still chosen near the learner's level, widening the range a little
// (never past +35%) when too few fit, and if there still are not enough the other bank fills the gap.
export const GUIDE_SHARE = 0.8
const GUIDE_LADDER = [0, 0.1, 0.2, 0.35]
function pickMix(guidePool, otherPool, n, mode, seen, boost) {
  const want = Math.min(Math.round(n * GUIDE_SHARE), guidePool.length)
  const g = pickAdaptive(guidePool, want, mode, seen, boost)
  const used = new Set(g.map((q) => q.id))
  const o = pickAdaptive(otherPool.filter((q) => !used.has(q.id)), n - g.length, mode, seen, boost)
  const picked = [...g, ...o]
  if (picked.length < n) {
    o.forEach((q) => used.add(q.id))
    picked.push(...pickAdaptive(guidePool.filter((q) => !used.has(q.id)), n - picked.length, mode, seen, boost))
  }
  return picked
}

export function practiceSet(domain, count, kind = 'all', onlyIds = null, objective = null, sections = null) {
  const pool = practicePool(domain, kind, onlyIds, objective, sections)
  let picked
  if (count === 'all') picked = pool
  // Retesting a chosen set (missed questions) uses exactly that set.
  else if (onlyIds) picked = freshFirst(pool, readSeen()).slice(0, Number(count))
  else {
    const n = Number(count)
    const guidePool = widenTo(basePool(domain, kind, null, objective, sections).filter(isGuide), Math.round(n * GUIDE_SHARE), GUIDE_LADDER)
    picked = pickMix(guidePool, pool.filter((q) => !isGuide(q)), n, 'practice', readSeen(), sections ? weakBoost : null)
  }
  markSeen(picked)
  return applyWordings(shuffle(picked).map(shuffleQuestion))
}

// Questions per domain for an exam of `total` questions, weighted by the official SY0-701 domain
// percentages (12 / 22 / 18 / 28 / 20). Largest-remainder rounding makes the counts add up exactly
// and keeps every length (90, 45, 25, ...) as close to the official ratio as whole questions allow.
export function domainTargets(total) {
  const rows = DOMAINS.map((d) => {
    const exact = (d.weight / 100) * total
    return { id: d.id, weight: d.weight, n: Math.floor(exact), rem: exact - Math.floor(exact) }
  })
  const left = total - rows.reduce((s, r) => s + r.n, 0)
  ;[...rows].sort((a, b) => b.rem - a.rem || b.weight - a.weight).slice(0, left).forEach((r) => r.n++)
  return rows.map(({ id, n }) => ({ id, n }))
}

// How big an exam can be built from questions near the learner's level (each sub-section's range widens until it
// has enough, see serving.js). If a domain still has too few eligible questions the exam is shortened, to the
// largest size that still honours the official domain ratio.
// Questions an exam may draw on: those near the learner's level, plus guide questions within a slightly wider range.
const examEligible = () => QUESTIONS.filter((q) => inRange(q) || (isGuide(q) && inRange(q, GUIDE_LADDER[GUIDE_LADDER.length - 1])))

export function examPlan(requested = EXAM.questions) {
  const pool = examEligible()
  const avail = Object.fromEntries(DOMAINS.map((d) => [d.id, pool.filter((q) => q.domain === d.id).length]))
  const cap = Math.min(requested, pool.length)
  for (let total = cap; total >= 1; total--) {
    const targets = domainTargets(total)
    if (targets.every((t) => t.n <= avail[t.id])) return { requested, size: total, available: pool.length, perDomain: avail, targets }
  }
  return { requested, size: 0, available: pool.length, perDomain: avail, targets: [] }
}

// Builds an exam weighted by the official domain percentages (as many questions as the difficulty window
// allows, up to `total`). Like the real exam, performance-based questions are presented first and count
// toward their domain's share.
export function examSet(total = EXAM.questions, onlyIds = null) {
  const seen = readSeen()
  const eligible = examEligible()
  if (onlyIds) {
    // Retest exam from a given set (e.g. missed questions): exactly those questions, at any difficulty.
    const picked = freshFirst(QUESTIONS.filter((q) => onlyIds.has(q.id)), seen).slice(0, total)
    markSeen(picked)
    return applyWordings([...shuffle(picked.filter(isPBQ)), ...shuffle(picked.filter((q) => !isPBQ(q)))].map(shuffleQuestion))
  }
  const plan = examPlan(total)
  total = plan.size
  const left = Object.fromEntries(plan.targets.map((t) => [t.id, t.n]))

  // Performance-based questions first (about 1 in 18), each using a slot in its own domain.
  const pbqWanted = total ? Math.max(1, Math.round(total / 18)) : 0
  const allPbqs = eligible.filter(isPBQ)
  const pbqs = []
  // Guide PBQs are tried first so the exam keeps its 80% guide share.
  const pbqOrder = [...pickAdaptive(allPbqs.filter(isGuide), allPbqs.length, 'exam', seen), ...pickAdaptive(allPbqs.filter((q) => !isGuide(q)), allPbqs.length, 'exam', seen)]
  for (const q of pbqOrder) {
    if (pbqs.length >= pbqWanted) break
    if (left[q.domain] > 0) {
      pbqs.push(q)
      left[q.domain]--
    }
  }

  const used = new Set(pbqs.map((q) => q.id))
  const rest = []
  for (const [id, n] of Object.entries(left)) {
    const domainPool = eligible.filter((q) => q.domain === Number(id))
    const mcPool = domainPool.filter((q) => !isPBQ(q) && !used.has(q.id))
    // Guide questions in this domain only need the wider range when the normal window has too few of them.
    const guideNear = mcPool.filter((q) => isGuide(q) && inRange(q))
    const guidePool = guideNear.length >= Math.round(n * GUIDE_SHARE) ? guideNear : mcPool.filter(isGuide)
    const mc = pickMix(guidePool, mcPool.filter((q) => !isGuide(q) && inRange(q)), n, 'exam', seen)
    mc.forEach((q) => used.add(q.id))
    rest.push(...mc)
    // Same-domain top-up (extra PBQs) before anything else.
    const short = n - mc.length
    if (short > 0) {
      const extra = pickAdaptive(domainPool.filter((q) => !used.has(q.id)), short, 'exam', seen)
      extra.forEach((q) => used.add(q.id))
      rest.push(...extra)
    }
  }

  const picked = [...shuffle(pbqs), ...shuffle(rest.filter(isPBQ)), ...shuffle(rest.filter((q) => !isPBQ(q)))]
  markSeen(picked)
  return applyWordings(picked.map(shuffleQuestion))
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

// Points for one question: 1 for a correct answer; performance-based questions earn partial credit
// for the fraction of parts correct.
export function points(q, ans = []) {
  const p = partsCorrect(q, ans)
  return p.of ? p.got / p.of : 0
}

// Approximation of CompTIA's 100–900 scale (linear, 750 to pass). CompTIA does not publish its exact
// scaling, so this is the closest standard model rather than the official formula.
export const scaled = (correct, total) => Math.round(100 + (800 * correct) / Math.max(total, 1))

// Session score: points (with partial credit), percentage, and the scaled score.
export function score(questions, answers) {
  const total = questions.length
  const pts = questions.reduce((s, q, i) => s + points(q, answers[i] || []), 0)
  const pct = total ? (100 * pts) / total : 0
  const sc = scaled(pts, total)
  return { points: pts, total, pct, scaled: sc, pass: sc >= EXAM.passScaled }
}

// Per-domain results keyed by domain id, plus per-objective results under
// "objectives" (e.g. { "1": {...}, "objectives": { "1.4": {...} } }).
export function breakdown(questions, answers) {
  const out = { objectives: {} }
  questions.forEach((q, i) => {
    const ok = isCorrect(q, answers[i] || [])
    for (const b of [(out[q.domain] ||= { correct: 0, total: 0 }), (out.objectives[q.objective] ||= { correct: 0, total: 0 })]) {
      b.total++
      if (ok) b.correct++
    }
  })
  return out
}
