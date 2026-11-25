<script setup>
// Google Docs-style comments for the exam objectives page: a thread for the selected line,
// or every comment grouped by the line it's on.
import { computed, nextTick, ref, watch } from 'vue'
import { anchorLabel, anchorOrder } from '../lib/objectives.js'
import { comments, activeAnchor, addComment, editComment, deleteComment, setResolved } from '../lib/comments.js'
import { user } from '../lib/auth.js'
import { supabaseEnabled } from '../lib/supabase.js'
import CommentIcon from './CommentIcon.vue'

const emit = defineEmits(['close'])
const showResolved = ref(false)
const draft = ref('')
const busy = ref(false)
const error = ref('')
const editing = ref(null) // comment id
const editText = ref('')
const box = ref(null)

const label = computed(() => activeAnchor.value && anchorLabel(activeAnchor.value))
const thread = computed(() => comments.value.filter((c) => c.anchor === activeAnchor.value))
const openTotal = computed(() => comments.value.filter((c) => !c.resolved).length)

const groups = computed(() => {
  const by = {}
  comments.value.filter((c) => showResolved.value || !c.resolved).forEach((c) => (by[c.anchor] ||= []).push(c))
  return Object.entries(by)
    .sort(([a], [b]) => anchorOrder(a) - anchorOrder(b))
    .map(([anchor, list]) => ({ anchor, label: anchorLabel(anchor), list }))
})

watch(activeAnchor, async (a) => {
  draft.value = ''
  error.value = ''
  editing.value = null
  if (!a) return
  await nextTick()
  box.value?.focus({ preventScroll: true })
})

async function run(fn) {
  busy.value = true
  error.value = ''
  try {
    await fn()
  } catch (e) {
    error.value = e.message || 'Something went wrong. Try again.'
  } finally {
    busy.value = false
  }
}
const submit = () => draft.value.trim() && run(async () => {
  await addComment(activeAnchor.value, draft.value)
  draft.value = ''
})
const saveEdit = (id) => editText.value.trim() && run(async () => {
  await editComment(id, editText.value)
  editing.value = null
})
const remove = (c) => window.confirm('Delete this comment?') && run(() => deleteComment(c.id))
const when = (s) => new Date(s).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
</script>

<template>
  <aside class="crail" aria-label="Comments">
    <div class="chead">
      <strong>Comments</strong>
      <span class="muted small">{{ openTotal }} open</span>
      <button type="button" class="x" title="Close" aria-label="Close comments" @click="activeAnchor ? (activeAnchor = null) : emit('close')">×</button>
    </div>
    <p v-if="supabaseEnabled && !user" class="muted small note">
      Saved in this browser. <RouterLink to="/login">Sign in</RouterLink> to keep comments on every device.
    </p>

    <!-- One line's thread -->
    <div v-if="activeAnchor" class="cbody">
      <button type="button" class="link small" @click="activeAnchor = null">‹ All comments</button>
      <div class="ctx">
        <div class="small muted">{{ label.title }}</div>
        <div v-if="label.path.length" class="quote">{{ label.path.join(' › ') }}</div>
      </div>

      <div v-for="c in thread" :key="c.id" class="cc" :class="{ resolved: c.resolved }">
        <div class="cmeta small muted">
          <span>{{ when(c.created_at) }}<template v-if="c.resolved"> · Resolved</template></span>
          <span class="acts">
            <button type="button" class="link" @click="run(() => setResolved(c.id, !c.resolved))">{{ c.resolved ? 'Reopen' : '✓ Resolve' }}</button>
            <button v-if="!c.resolved" type="button" class="link" @click="editing = c.id; editText = c.body">Edit</button>
            <button type="button" class="link" @click="remove(c)">Delete</button>
          </span>
        </div>
        <template v-if="editing === c.id">
          <textarea v-model="editText" rows="3" maxlength="4000" @keydown.meta.enter="saveEdit(c.id)" @keydown.ctrl.enter="saveEdit(c.id)" />
          <div class="cbtns">
            <button type="button" class="btn ghost sm" @click="editing = null">Cancel</button>
            <button type="button" class="btn primary sm" :disabled="busy || !editText.trim()" @click="saveEdit(c.id)">Save</button>
          </div>
        </template>
        <p v-else class="ctext">{{ c.body }}</p>
      </div>

      <div class="cc compose">
        <textarea ref="box" v-model="draft" rows="3" maxlength="4000" placeholder="Add a comment…"
          @keydown.meta.enter="submit" @keydown.ctrl.enter="submit" />
        <div class="cbtns">
          <span class="muted tiny">Ctrl/⌘ + Enter</span>
          <button type="button" class="btn ghost sm" @click="activeAnchor = null">Cancel</button>
          <button type="button" class="btn primary sm" :disabled="busy || !draft.trim()" @click="submit">Comment</button>
        </div>
      </div>
      <p v-if="error" class="bad small">{{ error }}</p>
    </div>

    <!-- Every comment -->
    <div v-else class="cbody">
      <label class="check small"><input v-model="showResolved" type="checkbox" /> Show resolved</label>
      <p v-if="!groups.length" class="muted small">
        No {{ showResolved ? '' : 'open ' }}comments yet. Hover any objective or bullet and click <CommentIcon /> to add one.
      </p>
      <button v-for="g in groups" :key="g.anchor" type="button" class="cc group" @click="activeAnchor = g.anchor">
        <div class="small muted">{{ g.label.title }}</div>
        <div v-if="g.label.path.length" class="quote">{{ g.label.path.join(' › ') }}</div>
        <p v-for="c in g.list" :key="c.id" class="ctext" :class="{ resolved: c.resolved }">{{ c.body }}</p>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.crail { display: grid; gap: .5rem; align-content: start; }
.chead { display: flex; align-items: baseline; gap: .5rem; }
.chead strong { font-size: 1rem; }
.x { margin-left: auto; background: none; border: 0; color: var(--muted); font-size: 1.3rem; line-height: 1; cursor: pointer; padding: 0 .3rem; border-radius: 6px; }
.x:hover { background: var(--soft); color: var(--text); }
.note { margin: 0; }
.cbody { display: grid; gap: .6rem; }
.ctx { display: grid; gap: .25rem; }
.quote { border-left: 3px solid var(--warn); padding: .15rem .5rem; font-size: .86rem; background: var(--highlight); border-radius: 0 6px 6px 0; }
.cc {
  display: grid; gap: .35rem; padding: .65rem .75rem; border: 1px solid var(--border); border-radius: 12px; background: var(--surface);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .05); text-align: left; font: inherit; color: var(--text);
}
.cc.resolved, .ctext.resolved { opacity: .55; }
.group { cursor: pointer; width: 100%; }
.group:hover { border-color: var(--muted); }
.cmeta { display: flex; justify-content: space-between; gap: .5rem; flex-wrap: wrap; }
.acts { display: inline-flex; gap: .6rem; }
.ctext { margin: 0; white-space: pre-wrap; font-size: .92rem; }
.link { background: none; border: 0; padding: 0; font: inherit; color: var(--muted); cursor: pointer; justify-self: start; }
.link:hover { color: var(--text); text-decoration: underline; }
textarea {
  width: 100%; resize: vertical; font: inherit; font-size: .92rem; padding: .5rem .6rem; border: 1px solid var(--border);
  border-radius: 8px; background: var(--surface); color: var(--text);
}
textarea:focus { outline: 2px solid var(--brand); outline-offset: -1px; }
.cbtns { display: flex; align-items: center; justify-content: flex-end; gap: .4rem; }
.cbtns .tiny { margin-right: auto; }
.btn.sm { padding: .35rem .75rem; font-size: .85rem; }
.tiny { font-size: .72rem; }
</style>
