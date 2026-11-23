// Study-time tracking: how long the learner has actively used the app, in total, per day, and per area.
//
// Time only counts while a study session is running (practice questions, an exam, or flashcards: see
// useStudySession). Browsing, settings, notes and the setup/results screens do not count. Within a session
// it is "active" while the tab is visible and there was input (mouse, keys, touch, scroll) within the last
// 3 minutes, so leaving a session open does not count.
//
// Each device keeps its own monotonic counter and counters are merged per device (the larger value
// wins), so studying on several devices adds up instead of one device overwriting another. It is
// saved in this browser every few seconds and synced to the account (user profile) every few minutes
// and when the page is hidden or closed.
import { onBeforeUnmount, ref, watch } from 'vue'
import { supabase } from './supabase.js'
import { user } from './auth.js'

const KEY = 'secplus.studytime'
const DEVICE_KEY = 'secplus.deviceId'
const META = 'study_time'
const TICK_MS = 5000
const IDLE_MS = 3 * 60 * 1000
const PUSH_MS = 3 * 60 * 1000
const KEEP_DAYS = 21 // per-day history kept in the account copy

export const AREAS = { practice: 'Practice', exam: 'Exams', flashcards: 'Flashcards', notes: 'Notes', other: 'Review & other' }

const pad = (n) => String(n).padStart(2, '0')
export const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export function areaOf(path = '') {
  if (path.startsWith('/practice')) return 'practice'
  if (path.startsWith('/exam')) return 'exam'
  if (path.startsWith('/flashcards')) return 'flashcards'
  if (path.startsWith('/notes')) return 'notes'
  return 'other'
}

// ── which session is running ──
// The area ('practice' | 'exam' | 'flashcards') of the session in progress, or null when none is.
export const studying = ref(null)
// Call from a view with its stage ref: the clock runs only while stage === 'run'.
export function useStudySession(stage, area) {
  watch(stage, (s) => (studying.value = s === 'run' ? area : null), { immediate: true })
  onBeforeUnmount(() => {
    if (studying.value === area) studying.value = null
  })
}

// ── state ──
function deviceId() {
  try {
    let id = localStorage.getItem(DEVICE_KEY)
    if (!id) {
      id = Math.random().toString(36).slice(2, 10)
      localStorage.setItem(DEVICE_KEY, id)
    }
    return id
  } catch {
    return 'local'
  }
}
function read() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY))
    if (v && v.devs) return v
  } catch {}
  return { devs: {}, u: 0 }
}
const me = deviceId()
// { devs: { [deviceId]: { t: total seconds, a: { area: seconds }, d: { 'YYYY-MM-DD': seconds }, s: first day } } }
export const study = ref(read())

const saveLocal = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(study.value))
  } catch {}
}

// Per device, keep whichever copy has recorded more time (counters only ever grow).
export function mergeDevices(local = {}, remote = {}) {
  const out = { ...local }
  for (const [id, dev] of Object.entries(remote)) if (!out[id] || (dev.t || 0) > (out[id].t || 0)) out[id] = dev
  return out
}
function absorb(remote) {
  if (!remote?.devs) return
  study.value = { ...study.value, devs: mergeDevices(study.value.devs, remote.devs) }
  saveLocal()
}

function prune(dev) {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - KEEP_DAYS)
  const min = dayKey(cutoff)
  for (const k of Object.keys(dev.d)) if (k < min) delete dev.d[k]
}

function add(area, seconds) {
  const dev = (study.value.devs[me] ||= { t: 0, a: {}, d: {}, s: dayKey() })
  dev.t += seconds
  dev.a[area] = (dev.a[area] || 0) + seconds
  const day = dayKey()
  dev.d[day] = (dev.d[day] || 0) + seconds
  prune(dev)
  study.value.u = Date.now()
  saveLocal()
  schedulePush()
}

// ── summary for the UI ──
export function summarize(state, now = new Date()) {
  const devs = Object.values(state?.devs || {})
  const sum = (pick) => devs.reduce((s, d) => s + (pick(d) || 0), 0)
  const days = []
  for (let i = 6; i >= 0; i--) {
    const dt = new Date(now)
    dt.setDate(dt.getDate() - i)
    const key = dayKey(dt)
    days.push({ key, label: dt.toLocaleDateString(undefined, { weekday: 'short' }), seconds: sum((d) => d.d?.[key]) })
  }
  const areas = Object.fromEntries(Object.keys(AREAS).map((k) => [k, sum((d) => d.a?.[k])]))
  return {
    total: sum((d) => d.t),
    today: days[6].seconds,
    week: days.reduce((s, d) => s + d.seconds, 0),
    days,
    areas,
    since: devs.map((d) => d.s).filter(Boolean).sort()[0] || null
  }
}

export function formatDuration(seconds) {
  const s = Math.floor(seconds || 0)
  if (s < 1) return '0m'
  if (s < 60) return '<1m'
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  return h ? `${h}h ${m % 60}m` : `${m}m`
}

// ── account sync ──
let pushTimer = null
async function push() {
  if (!supabase || !user.value) return
  try {
    // Re-read the account copy first so another device's newer counter is not overwritten.
    const { data } = await supabase.auth.getUser()
    absorb(data?.user?.user_metadata?.[META])
    await supabase.auth.updateUser({ data: { [META]: { devs: study.value.devs, u: study.value.u } } })
  } catch {}
}
function schedulePush() {
  if (pushTimer || !user.value) return
  pushTimer = setTimeout(() => {
    pushTimer = null
    push()
  }, PUSH_MS)
}
watch(
  user,
  (u, prev) => {
    if (u && u.id !== prev?.id) {
      absorb(u.user_metadata?.[META])
      push()
    }
  },
  { immediate: true }
)

// ── the timer ──
let started = false
export function startStudyTimer() {
  if (started || typeof window === 'undefined') return
  started = true
  let last = performance.now()
  let lastActive = last
  let carry = 0
  const bump = () => (lastActive = performance.now())
  for (const ev of ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart', 'scroll']) {
    window.addEventListener(ev, bump, { passive: true, capture: true })
  }
  function tick() {
    const now = performance.now()
    const dt = Math.min(now - last, TICK_MS * 2) // ignore long gaps (sleep, throttled background timers)
    last = now
    if (!studying.value || document.visibilityState !== 'visible' || now - lastActive > IDLE_MS) return
    carry += dt
    const whole = Math.floor(carry / 1000)
    if (!whole) return
    carry -= whole * 1000
    add(studying.value, whole)
  }
  setInterval(tick, TICK_MS)
  const leave = () => {
    tick()
    clearTimeout(pushTimer)
    pushTimer = null
    push()
  }
  document.addEventListener('visibilitychange', () => document.visibilityState === 'hidden' && leave())
  window.addEventListener('pagehide', leave)
}
