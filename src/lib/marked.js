// Flashcards marked for review. Cards you mark yourself stay until you unmark them. Cards added automatically
// (acronyms you looked up during practice) come off once your last four attempts at them average 75% or
// better ("Got it" = 1, "Still learning" = 0), the same rule as missed questions.
import { syncedSet } from './syncedSet.js'
import { dropHistory, recordScore, reviewProgress } from './reviewHistory.js'

const { set, update } = syncedSet('secplus.marked', 'marked_cards')
const auto = syncedSet('secplus.markedAuto', 'marked_auto')

export const marked = set
export const autoMarked = auto.set

// Manual: toggling (either way) makes the card a manual mark, which only you can remove.
export function toggleMarked(id) {
  if (set.value.has(id)) update([], [id])
  else update([id])
  auto.update([], [id])
  dropHistory([id])
}
export function markMany(ids) {
  update(ids)
  auto.update([], ids)
  dropHistory(ids)
}
// Automatic (acronym lookups): only cards not already marked become automatic marks.
export function markAuto(ids) {
  const fresh = ids.filter((id) => !set.value.has(id))
  if (!fresh.length) return
  update(fresh)
  auto.update(fresh)
}
// A flashcard grade. Only automatic marks are scored and can clear themselves.
export function recordCard(id, gotIt) {
  if (!auto.set.value.has(id)) return
  recordScore(id, gotIt ? 1 : 0)
  if (reviewProgress(id).cleared) {
    update([], [id])
    auto.update([], [id])
    dropHistory([id])
  }
}
