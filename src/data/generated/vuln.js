// CVSS v3.1 vector interpretation (4.3): reading what a vector says about exploitability and impact.
import { pick, shuffle } from './util.js'

const AV = { N: 'over the network (remotely)', A: 'only from the same adjacent network', L: 'only with local access to the system', P: 'only with physical access to the device' }
const AC = { L: 'needs no special conditions beyond the attacker’s own actions', H: 'depends on conditions the attacker does not control (such as timing or configuration)' }
const PR = { N: 'needs no account or privileges', L: 'needs a low-privileged account', H: 'needs administrator-level privileges' }
const UI = { N: 'needs no action from any user', R: 'needs a user to act (for example, open a link or file)' }
const S = { U: 'stays within the vulnerable component', C: 'can affect resources beyond the vulnerable component' }
const CIA = { H: 'total', L: 'partial', N: 'no' }

const STATE = {
  AV: (v) => `The flaw can be exploited ${AV[v]}`,
  AC: (v) => `Exploitation ${AC[v]}`,
  PR: (v) => `Exploitation ${PR[v]}`,
  UI: (v) => `Exploitation ${UI[v]}`,
  S: (v) => `The impact ${S[v]}`,
  C: (v) => `The vulnerability gives ${CIA[v]} loss of confidentiality`,
  I: (v) => `The vulnerability gives ${CIA[v]} loss of integrity`,
  A: (v) => `The vulnerability gives ${CIA[v]} loss of availability`
}
const VALUES = { AV: Object.keys(AV), AC: Object.keys(AC), PR: Object.keys(PR), UI: Object.keys(UI), S: Object.keys(S), C: ['H', 'L', 'N'], I: ['H', 'L', 'N'], A: ['H', 'L', 'N'] }
const ORDER = ['AV', 'AC', 'PR', 'UI', 'S', 'C', 'I', 'A']

export default {
  key: 'cvss',
  d: 4,
  o: '4.3',
  levels: [5, 6, 7, 8, 9, 9.5],
  make(L, r) {
    const v = Object.fromEntries(ORDER.map((m) => [m, pick(r, VALUES[m])]))
    if (v.C === 'N' && v.I === 'N' && v.A === 'N') v.C = 'H'
    const vector = `CVSS:3.1/${ORDER.map((m) => `${m}:${v[m]}`).join('/')}`
    const wrongVal = (m) => pick(r, VALUES[m].filter((x) => x !== v[m]))
    const metrics = shuffle(r, ORDER)
    const truth = (m) => STATE[m](v[m])
    const lie = (m) => STATE[m](wrongVal(m))
    const stem = (extra) => [
      `A scanner reports the vulnerability vector ${vector}. ${extra}`,
      `Review this CVSS 3.1 vector: ${vector}. ${extra}`,
      `Given the vector ${vector}, ${extra[0].toLowerCase() + extra.slice(1)}`
    ]
    if (L < 6.5) {
      const [t, ...f] = metrics
      return {
        q: stem('Which statement about the vulnerability is correct?'),
        a: [truth(t), ...f.slice(0, 3).map(lie)],
        e: `The vector reads: ${ORDER.map((m) => `${m}:${v[m]} → ${STATE[m](v[m]).toLowerCase()}`).join('; ')}. The other options each contradict one metric.`
      }
    }
    if (L < 8.5) {
      const [t1, t2, f1, f2, f3] = metrics
      const both = `${truth(t1)}, and ${truth(t2)[0].toLowerCase()}${truth(t2).slice(1)}`
      const half = (a, b) => `${truth(a)}, and ${lie(b)[0].toLowerCase()}${lie(b).slice(1)}`
      return {
        q: stem('Which statement about the vulnerability is entirely correct?'),
        a: [both, half(f1, f2), half(f2, f3), half(f3, f1)],
        e: `Every option combines two claims, and a statement is only correct if both match the vector. ${ORDER.map((m) => `${m}:${v[m]}`).join(', ')}: ${truth(t1).toLowerCase()}; ${truth(t2).toLowerCase()}. In each wrong option one half contradicts the vector.`
      }
    }
    const [t1, t2, f1, f2, f3, f4] = metrics
    return {
      q: stem('Which TWO statements about the vulnerability are correct? (Select TWO).'),
      a: [truth(t1), truth(t2), lie(f1), lie(f2), lie(f3), lie(f4)],
      e: `Reading the vector: ${ORDER.map((m) => `${m}:${v[m]}`).join(', ')}. ${truth(t1)} and ${truth(t2).toLowerCase()} are correct; the remaining statements each contradict a metric.`,
      nCorrect: 2
    }
  }
}
