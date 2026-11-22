// Finds known acronyms (src/data/acronyms.js) inside question text so they can be made clickable.
// Matching is case-sensitive and whole-word; a trailing "s" or digit is allowed (ACLs, WPA2).
import ACRONYMS from '../data/acronyms.js'

const byFront = new Map()
for (const a of ACRONYMS) if (!byFront.has(a.front)) byFront.set(a.front, a)

let re = null
function regex() {
  if (!re) {
    const fronts = [...byFront.keys()]
      .sort((a, b) => b.length - a.length) // longest first, so DNSSEC wins over DNS
      .map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    re = new RegExp(`(?<![A-Za-z0-9])(${fronts.join('|')})(?:s|\\d)?(?![A-Za-z0-9])`, 'g')
  }
  return re
}

const cache = new Map()

// "Which of the ACLs…" -> [{ text: 'Which of the ' }, { text: 'ACLs', acr: <entry> }, { text: '…' }]
export function splitAcronyms(text) {
  const s = String(text ?? '')
  if (cache.has(s)) return cache.get(s)
  const out = []
  const r = regex()
  r.lastIndex = 0
  let last = 0
  for (let m; (m = r.exec(s)); ) {
    if (m.index > last) out.push({ text: s.slice(last, m.index) })
    out.push({ text: m[0], acr: byFront.get(m[1]) })
    last = m.index + m[0].length
  }
  if (last < s.length) out.push({ text: s.slice(last) })
  cache.set(s, out)
  return out
}
