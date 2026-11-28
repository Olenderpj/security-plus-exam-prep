<script setup>
// "How many" as a slider from 1 to everything available. The scale is curved (square root) so small counts get
// more room. While dragging, the thumb sticks lightly to the stops (10, 20, 50, 100): within about 1.5% of the
// track from one, it settles on it. Arrow keys move one question at a time (Page Up/Down by 10).
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: { type: Number, required: true },
  max: { type: Number, required: true },
  noun: { type: String, default: 'questions' }
})
const emit = defineEmits(['update:modelValue'])

const STEPS = 1000 // slider positions
const STOPS = [10, 20, 50, 100]
const SNAP = 15 // positions (1.5% of the track)
const top = computed(() => Math.max(1, props.max))
const span = computed(() => Math.max(1, props.max - 1))
const posOf = (v) => Math.round(STEPS * Math.sqrt((Math.min(Math.max(v, 1), top.value) - 1) / span.value))
const valueAt = (pos) => 1 + Math.round(span.value * (pos / STEPS) ** 2)
const pct = (v) => posOf(v) / (STEPS / 100)
const stops = computed(() => STOPS.filter((s) => s < props.max))
const value = computed(() => Math.min(Math.max(1, props.modelValue), top.value))

// Stop labels, skipping any that would crowd the one before it or the "All" label at the end.
const labels = computed(() => {
  const out = []
  let last = -100
  for (const s of stops.value) {
    const p = pct(s)
    if (p - last >= 6 && p <= 90) {
      out.push({ s, p })
      last = p
    }
  }
  return out
})

const dragging = ref(false)
function onInput(e) {
  const pos = Number(e.target.value)
  let v = valueAt(pos)
  if (dragging.value) {
    const near = stops.value.find((s) => Math.abs(pos - posOf(s)) <= SNAP)
    if (near != null) {
      v = near
      e.target.value = String(posOf(near))
    }
  }
  emit('update:modelValue', v)
}
function onKey(e) {
  const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }[e.key]
  const to = e.key === 'Home' ? 1 : e.key === 'End' ? top.value : step ? value.value + step : null
  if (to == null) return
  e.preventDefault()
  emit('update:modelValue', Math.min(Math.max(1, to), top.value))
}
</script>

<template>
  <div>
    <div class="row between head">
      <label class="label" for="count-slider" style="margin: 0">How many</label>
      <span class="val num"><strong>{{ value === max ? `All ${max}` : value }}</strong> <span class="muted small">{{ noun }}</span></span>
    </div>
    <div class="wrap" :style="{ '--f': pct(value) / 100 }">
      <input
        id="count-slider"
        type="range"
        min="0"
        :max="STEPS"
        step="1"
        :value="posOf(value)"
        :disabled="max <= 1"
        :aria-valuemin="1"
        :aria-valuemax="top"
        :aria-valuenow="value"
        :aria-valuetext="`${value} ${noun}${value === max ? ' (all)' : ''}`"
        @pointerdown="dragging = true"
        @pointerup="dragging = false"
        @pointercancel="dragging = false"
        @blur="dragging = false"
        @input="onInput"
        @keydown="onKey"
      />
      <span v-for="s in stops" :key="s" class="tick" :class="{ on: s <= value }" :style="{ left: pct(s) + '%' }" aria-hidden="true" />
    </div>
    <div class="scale small muted" aria-hidden="true">
      <span v-for="l in labels" :key="l.s" class="lab" :class="{ cur: l.s === value }" :style="{ left: l.p + '%' }">{{ l.s }}</span>
      <span class="edge end" :class="{ cur: value === max }">All</span>
    </div>
  </div>
</template>

<style scoped>
.head { align-items: baseline; margin-bottom: .35rem; }
.val strong { font-size: 1.1rem; font-variant-numeric: tabular-nums; }
/* Track geometry: the thumb is 1.25rem wide, so stop positions are inset by half of it on each side. */
.wrap { position: relative; height: 1.5rem; margin: 0 .625rem; }
input[type='range'] {
  position: absolute; inset: 0 -.625rem; width: calc(100% + 1.25rem); height: 100%; margin: 0; background: none;
  -webkit-appearance: none; appearance: none; cursor: pointer; z-index: 1; touch-action: none;
}
input[type='range']:disabled { cursor: default; opacity: .5; }
/* The visible track is drawn by .wrap (so the stop ticks can sit on it, under the thumb); the input's own track is clear. */
.wrap::before {
  content: ''; position: absolute; left: -.625rem; right: -.625rem; top: 50%; height: 6px; margin-top: -3px; border-radius: 99px;
  background: linear-gradient(to right, var(--text) 0 calc(.625rem + (100% - 1.25rem) * var(--f)), var(--soft) 0);
}
input[type='range']::-webkit-slider-runnable-track { height: 6px; background: transparent; }
input[type='range']::-moz-range-track { height: 6px; background: transparent; }
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none; width: 1.25rem; height: 1.25rem; margin-top: calc(3px - .625rem);
  border-radius: 50%; background: var(--surface); border: 2px solid var(--text); box-shadow: 0 1px 4px rgb(0 0 0 / .2);
  transition: transform .1s;
}
input[type='range']::-moz-range-thumb {
  width: 1.25rem; height: 1.25rem; box-sizing: border-box; border-radius: 50%; background: var(--surface); border: 2px solid var(--text);
  box-shadow: 0 1px 4px rgb(0 0 0 / .2);
}
input[type='range']:active::-webkit-slider-thumb { transform: scale(1.12); }
input[type='range']:focus-visible { outline: none; }
input[type='range']:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 30%, transparent); }
input[type='range']:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 30%, transparent); }
.tick {
  position: absolute; top: 50%; width: 2px; height: 12px; margin: -6px 0 0 -1px; border-radius: 1px;
  background: color-mix(in srgb, var(--muted) 55%, var(--border)); pointer-events: none;
}
.tick.on { background: var(--surface); }
.scale { position: relative; height: 1.2rem; margin: .2rem .625rem 0; font-variant-numeric: tabular-nums; }
.lab { position: absolute; transform: translateX(-50%); }
.edge { position: absolute; left: 0; transform: translateX(-50%); }
.edge.end { left: auto; right: 0; transform: translateX(50%); }
.cur { color: var(--text); font-weight: 600; }
</style>
