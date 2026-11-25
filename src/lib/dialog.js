// In-app confirmation dialog (replaces the browser's window.confirm).
// Usage: if (await confirmDialog({ title, message, confirmText, danger: true })) { ... }
import { ref } from 'vue'

export const dialog = ref(null) // { title, message, confirmText, cancelText, danger, resolve }

export function confirmDialog({ title, message = '', confirmText = 'OK', cancelText = 'Cancel', danger = false }) {
  dialog.value?.resolve(false) // a newer request replaces an open one
  return new Promise((resolve) => {
    dialog.value = { title, message, confirmText, cancelText, danger, resolve }
  })
}

export function closeDialog(result) {
  const d = dialog.value
  if (!d) return
  dialog.value = null
  d.resolve(result)
}
