<script setup>
// Renders the dialog requested through lib/dialog.js. While open it owns the keyboard (Escape cancels,
// Enter confirms) so keys never reach the page behind it, e.g. an exam's answer shortcuts.
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { dialog, closeDialog } from '../lib/dialog.js'

const cancelBtn = ref(null)
const okBtn = ref(null)
let returnFocus = null

watch(dialog, async (d, prev) => {
  if (d && !prev) returnFocus = document.activeElement
  if (!d) {
    returnFocus?.focus?.({ preventScroll: true })
    return
  }
  await nextTick()
  // Destructive actions start on Cancel; others on the confirm button.
  ;(d.danger ? cancelBtn : okBtn).value?.focus()
})

function onKey(e) {
  if (!dialog.value) return
  if (e.key === 'Escape') { e.preventDefault(); closeDialog(false) }
  else if (e.key === 'Enter') { e.preventDefault(); closeDialog(document.activeElement !== cancelBtn.value) }
  else if (e.key === 'Tab') {
    // Keep focus inside the dialog.
    e.preventDefault()
    ;(document.activeElement === okBtn.value ? cancelBtn : okBtn).value?.focus()
  } else return
  e.stopImmediatePropagation()
}
// Capture phase, so the dialog sees keys before page shortcuts do; other keys are swallowed while open.
const swallow = (e) => dialog.value && !['Tab', 'Escape', 'Enter'].includes(e.key) && e.stopImmediatePropagation()
onMounted(() => {
  window.addEventListener('keydown', onKey, true)
  window.addEventListener('keydown', swallow, true)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey, true)
  window.removeEventListener('keydown', swallow, true)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="dlg">
      <div v-if="dialog" class="backdrop" @mousedown.self="closeDialog(false)">
        <div class="dlg" role="alertdialog" aria-modal="true" aria-labelledby="dlg-title" :aria-describedby="dialog.message ? 'dlg-msg' : undefined">
          <h2 id="dlg-title">{{ dialog.title }}</h2>
          <p v-if="dialog.message" id="dlg-msg" class="muted">{{ dialog.message }}</p>
          <div class="actions">
            <button ref="cancelBtn" type="button" class="btn" @click="closeDialog(false)">{{ dialog.cancelText }}</button>
            <button ref="okBtn" type="button" class="btn" :class="dialog.danger ? 'danger' : 'primary'" @click="closeDialog(true)">{{ dialog.confirmText }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop {
  position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 1rem;
  background: color-mix(in srgb, #000 38%, transparent);
}
.dlg {
  width: min(26rem, 100%); background: var(--surface); color: var(--text); border: 1px solid var(--border);
  border-radius: 18px; padding: 1.35rem 1.35rem 1.1rem; box-shadow: 0 24px 60px rgba(0, 0, 0, .28);
}
h2 { margin: 0 0 .4rem; font-size: 1.15rem; }
p { margin: 0 0 1.1rem; white-space: pre-line; }
.actions { display: flex; justify-content: flex-end; gap: .5rem; flex-wrap: wrap; }
.dlg-enter-active, .dlg-leave-active { transition: opacity .15s ease; }
.dlg-enter-active .dlg, .dlg-leave-active .dlg { transition: transform .15s ease; }
.dlg-enter-from, .dlg-leave-to { opacity: 0; }
.dlg-enter-from .dlg, .dlg-leave-to .dlg { transform: scale(.97) translateY(4px); }
@media (prefers-reduced-motion: reduce) {
  .dlg-enter-active, .dlg-leave-active, .dlg-enter-active .dlg, .dlg-leave-active .dlg { transition: none; }
}
</style>
