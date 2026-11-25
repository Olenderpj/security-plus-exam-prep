// Views call useFocusMode(stage) so the page-level search box is hidden only while a
// practice session, exam, or flashcard deck is actually running (stage === 'run').
import { onBeforeUnmount, ref, watch } from 'vue'

export const focusMode = ref(false)

export function useFocusMode(stage) {
  watch(stage, (s) => (focusMode.value = s === 'run'), { immediate: true })
  onBeforeUnmount(() => (focusMode.value = false))
}

// Views without a running session can ask for the wider page layout (e.g. the flashcard grid).
export const widePage = ref(false)
