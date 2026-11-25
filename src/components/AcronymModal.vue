<script setup>
// Floating acronym lookup. It first asks for confirmation (looking it up counts slightly against
// the section level) and shows the definition only after the learner chooses to reveal it.
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { objectiveName } from '../data/domains.js'

const props = defineProps({ info: { type: Object, default: null } })
const emit = defineEmits(['close', 'reveal'])

const safe = ref(null)
const done = ref(null)
// Focus the safe choice first so a held Enter key cannot reveal the answer by accident.
watch(
  () => props.info,
  async (i, old) => {
    if (!i) return
    await nextTick()
    if (!i.revealed) safe.value?.focus()
    else if (!old?.revealed) done.value?.focus()
  }
)

const onKey = (e) => props.info && e.key === 'Escape' && emit('close')
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div v-if="info" class="overlay" @mousedown.self="emit('close')">
      <div class="dlg" role="dialog" aria-modal="true" :aria-label="`Acronym ${info.entry.front}`">
        <div class="head">
          <div class="acro">{{ info.entry.front }}</div>
          <button class="x" type="button" aria-label="Close" @click="emit('close')">✕</button>
        </div>

        <template v-if="!info.revealed">
          <p class="ask">Want to see what this stands for?</p>
          <p class="muted small cost">
            Looking it up counts <strong>slightly</strong> against your
            <strong>{{ info.objective }} {{ objectiveName(info.objective) }}</strong> level. It also goes into your marked flashcards so
            you can review it later, and answering questions in this section correctly brings your level back up.
          </p>
          <div class="actions">
            <button ref="safe" class="btn" type="button" @click="emit('close')">Never mind</button>
            <button class="btn primary" type="button" @click="emit('reveal')">Show definition</button>
          </div>
        </template>

        <template v-else>
          <div class="back">{{ info.entry.back }}</div>
          <p v-if="info.entry.note" class="note">{{ info.entry.note }}</p>
          <p class="muted small cost">
            <template v-if="info.where === 'flashcard'">Looking up acronyms on flashcards is free: it doesn't affect your level.</template>
            <template v-else-if="info.free">This question is already answered, so looking it up does not affect your score.</template>
            <template v-else-if="info.repeat">You already looked this up for this question, so it costs nothing extra.</template>
            <template v-else>Counted slightly against {{ info.objective }} and added to your marked flashcards (Flashcards → Marked).</template>
          </p>
          <div class="actions">
            <button ref="done" class="btn primary" type="button" @click="emit('close')">Got it</button>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed; inset: 0; z-index: 110; display: flex; align-items: center; justify-content: center;
  padding: 1rem; background: rgba(0, 0, 0, .55); backdrop-filter: blur(2px);
}
.dlg {
  width: 100%; max-width: 420px; padding: 1.1rem 1.25rem 1.25rem; color: var(--text); background: var(--surface);
  border: 1px solid color-mix(in srgb, var(--text) 25%, transparent); border-radius: 14px; box-shadow: 0 24px 60px rgba(0, 0, 0, .45);
}
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
.acro { font-size: 1.6rem; font-weight: 700; letter-spacing: .01em; }
.x { background: none; border: 0; color: var(--muted); font-size: 1rem; cursor: pointer; padding: .25rem; border-radius: 6px; }
.x:hover { color: var(--text); background: var(--soft); }
.ask { margin: .5rem 0 .4rem; font-size: 1.05rem; }
.cost { margin: 0 0 1rem; line-height: 1.5; }
.back { margin-top: .5rem; font-size: 1.15rem; font-weight: 600; }
.note { margin: .5rem 0 .75rem; }
.actions { display: flex; justify-content: flex-end; gap: .5rem; flex-wrap: wrap; }
</style>
