<script setup>
// "?" opens a reference of every keyboard shortcut in the app.
import { onBeforeUnmount, onMounted } from 'vue'
import { sheetOpen } from '../lib/shortcuts.js'

const groups = [
  { title: 'Everywhere', rows: [[['/', 'Ctrl F', 'Ctrl K'], 'Search everything and quick actions'], [['?'], 'This sheet'], [['Esc'], 'Close dialogs']] },
  { title: 'Search', rows: [[['↑', '↓'], 'Move through results'], [['↵'], 'Open the highlighted result']] },
  { title: 'Practice', rows: [[['A–D', '1–4'], 'Choose an answer'], [['↵'], 'Check, then continue'], [['↵'], 'Start (on the setup screen)']] },
  { title: 'Exam', rows: [[['←', '→'], 'Previous / next question'], [['A–D', '1–4'], 'Choose an answer'], [['F'], 'Flag question (selects option F when there is one)']] },
  { title: 'Flashcards', rows: [[['Space'], 'Flip the card'], [['→'], 'Got it'], [['←'], 'Still learning'], [['M'], 'Mark for review']] },
  { title: 'Notes', rows: [[['* ', '- '], 'Start a bullet'], [['Tab', 'Shift Tab'], 'Indent / outdent'], [['Ctrl B'], 'Bold selection']] }
]

const typing = (el) => el && (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || el.isContentEditable)
function onKey(e) {
  if (sheetOpen.value && e.key === 'Escape') return (sheetOpen.value = false)
  if (e.key === '?' && !typing(e.target) && !e.metaKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault()
    sheetOpen.value = !sheetOpen.value
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div v-if="sheetOpen" class="overlay" @mousedown.self="sheetOpen = false">
      <div class="sheet" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts">
        <div class="head">
          <h2>Keyboard shortcuts</h2>
          <button class="x" type="button" aria-label="Close" @click="sheetOpen = false">✕</button>
        </div>
        <div class="cols">
          <section v-for="g in groups" :key="g.title">
            <div class="label">{{ g.title }}</div>
            <div v-for="(r, i) in g.rows" :key="i" class="row2">
              <span class="keys"><span v-for="k in r[0]" :key="k" class="kbd">{{ k }}</span></span>
              <span class="muted small">{{ r[1] }}</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay { position: fixed; inset: 0; z-index: 120; display: flex; align-items: center; justify-content: center; padding: 1rem; background: rgba(0, 0, 0, .55); backdrop-filter: blur(2px); }
.sheet {
  width: 100%; max-width: 640px; max-height: 86vh; overflow-y: auto; padding: 1.1rem 1.4rem 1.4rem; color: var(--text); background: var(--surface);
  border: 1px solid color-mix(in srgb, var(--text) 25%, transparent); border-radius: 18px; box-shadow: 0 24px 60px rgba(0, 0, 0, .45);
}
.head { display: flex; align-items: center; justify-content: space-between; margin-bottom: .75rem; }
.head h2 { margin: 0; font-family: var(--display); font-size: 1.4rem; font-weight: 500; }
.x { background: none; border: 0; color: var(--muted); font-size: 1rem; cursor: pointer; padding: .3rem .5rem; border-radius: 8px; }
.x:hover { color: var(--text); background: var(--soft); }
.cols { display: grid; gap: 1.1rem 2rem; grid-template-columns: 1fr; }
@media (min-width: 560px) { .cols { grid-template-columns: 1fr 1fr; } }
.row2 { display: flex; align-items: center; justify-content: space-between; gap: .75rem; padding: .3rem 0; }
.keys { display: inline-flex; gap: .25rem; flex-wrap: wrap; }
</style>
