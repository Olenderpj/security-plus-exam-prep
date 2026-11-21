// Flashcards marked for review.
import { syncedSet } from './syncedSet.js'

const { set, update } = syncedSet('secplus.marked', 'marked_cards')

export const marked = set
export const toggleMarked = (id) => (set.value.has(id) ? update([], [id]) : update([id]))
export const markMany = (ids) => update(ids)
