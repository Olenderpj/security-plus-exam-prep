// Questions flagged by hand for extra practice. A flagged question's sub-section counts as a weak area, and the
// question comes off the list by the same rule as missed questions (see reviewHistory.js) or when unflagged.
import { computed } from 'vue'
import { syncedSet } from './syncedSet.js'
import { QUESTIONS } from '../data/questions/index.js'

const { set, update } = syncedSet('secplus.flagged', 'flagged_questions')
export const flagged = set
export const updateFlagged = update

const objectiveOf = new Map(QUESTIONS.map((q) => [q.id, q.objective]))
// { objective code: number of flagged questions in it }
export const flaggedSections = computed(() => {
  const c = {}
  set.value.forEach((id) => {
    const o = objectiveOf.get(id)
    if (o) c[o] = (c[o] || 0) + 1
  })
  return c
})
