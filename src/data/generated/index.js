// Generated question families. Each family is a function of a difficulty level and a seed, so it can
// produce technical, calculation- and log-based questions at every level, and the same question every time
// (ids are stable). Harder levels add steps, trade-offs and more look-alike answers.
import { rng, round, shuffle } from './util.js'
import risk from './risk.js'
import { cidr, fwrules } from './network.js'
import { availability, backup } from './resilience.js'
import { entropy, keys } from './crypto.js'
import cvss from './vuln.js'
import logs from './logs.js'

export const FAMILIES = [risk, cidr, fwrules, backup, availability, keys, entropy, cvss, logs]
const VARIANTS_PER_LEVEL = 3

const used = new Set() // generated questions must not repeat one another
function build(fam, L, k) {
  for (let salt = 0; salt < 40; salt++) {
    const r = rng(`${fam.key}:${L}:${k}:${salt}`)
    const out = fam.make(L, r)
    if (!out) continue
    const n = out.nCorrect || 1
    const opts = out.a
    if (new Set(opts).size !== opts.length || opts.length < 4) continue
    const sig = `${out.q[0]}|${out.x || ''}`
    if (used.has(sig)) continue
    used.add(sig)
    const order = shuffle(r, opts.map((_, i) => i))
    const answers = order.map((i) => opts[i])
    const correct = order.map((orig, pos) => (orig < n ? pos : -1)).filter((p) => p >= 0)
    return {
      id: `g-${fam.key}-${String(L).replace('.', '_')}-${k}`,
      d: fam.d,
      o: fam.o,
      lv: round(L + (k - 1) * 0.2, 1),
      q: out.q[0],
      a: answers,
      c: n > 1 ? correct : correct[0],
      e: out.e,
      x: out.x,
      w: out.q.slice(1),
      family: `g-${fam.key}-${L}`
    }
  }
  throw new Error(`generator ${fam.key} could not produce level ${L} variant ${k}`)
}

export default FAMILIES.flatMap((fam) => fam.levels.flatMap((L) => Array.from({ length: VARIANTS_PER_LEVEL }, (_, k) => build(fam, L, k))))
