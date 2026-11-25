// Official SY0-701 exam objectives (see src/data/objectives.json for the source),
// with a stable anchor for every objective and bullet so comments can attach to them.
import { ref } from 'vue'
import data from '../data/objectives.json'

export const SOURCE = data.source

// Anchors: "1.4" for an objective, "1.4#12" for its 13th bullet.
export const DOMAINS = data.domains.map((d) => ({
  ...d,
  objectives: d.objectives.map((o) => {
    const trail = []
    return {
      ...o,
      anchor: o.num,
      items: o.items.map((it, i) => {
        trail.length = it.level
        trail[it.level] = it.text
        return { ...it, anchor: `${o.num}#${i}`, path: [...trail] }
      })
    }
  })
}))

const LABELS = {}
DOMAINS.forEach((d) =>
  d.objectives.forEach((o) => {
    LABELS[o.anchor] = { num: o.num, title: `${o.num} ${o.title}`, path: [] }
    o.items.forEach((it) => (LABELS[it.anchor] = { num: o.num, title: `${o.num} ${o.title}`, path: it.path }))
  })
)

// e.g. { num: '1.4', title: '1.4 Explain the importance…', path: ['Certificates', 'Wildcard'] }
export const anchorLabel = (anchor) => LABELS[anchor] || { num: anchor.split('#')[0], title: anchor, path: [] }

// Document order, for sorting comments the way the objectives read.
const ORDER = Object.fromEntries(Object.keys(LABELS).map((a, i) => [a, i]))
export const anchorOrder = (anchor) => ORDER[anchor] ?? 1e9

// Shared between the Objectives page and its sidebar outline.
export const currentObjective = ref(null) // objective number in view, e.g. "2.4"
export const jumpToObjective = ref(null) // set by the page: (num) => scroll there
