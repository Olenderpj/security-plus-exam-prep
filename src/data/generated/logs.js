// Authentication log analysis (2.4): recognising the pattern behind an attack from the log itself.
import { int, pick, shuffle } from './util.js'

const USERS = ['jsmith', 'mlopez', 'akhan', 'bwong', 'tnguyen', 'rpatel', 'cdavis', 'lfischer', 'omurphy', 'sromero', 'dkim', 'ewhite']
const GEO = { US: '198.51.100', DE: '203.0.113', BR: '192.0.2', JP: '198.18.0', RU: '100.64.1', IN: '100.64.2' }
const ts = (base, sec) => {
  const t = base + sec
  const h = Math.floor(t / 3600) % 24
  const m = Math.floor((t % 3600) / 60)
  const s = t % 60
  return `2026-03-14 ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
const line = (time, res, user, ip, geo) => `${time}  ${res.padEnd(7)} user=${user.padEnd(9)} src=${ip.padEnd(15)} geo=${geo}`
const NAMES = {
  brute: 'Brute force against one account',
  spray: 'Password spraying',
  stuff: 'Credential stuffing',
  travel: 'Impossible travel (a compromised account in use)',
  slow: 'Low-and-slow brute force against one account'
}

const build = {
  brute(r) {
    const u = pick(r, USERS)
    const ip = `${GEO.RU}.${int(r, 2, 250)}`
    const base = int(r, 2, 4) * 3600
    const rows = []
    let t = 0
    for (let i = 0; i < int(r, 7, 9); i++) rows.push(line(ts(base, (t += int(r, 1, 2))), 'FAIL', u, ip, 'RU'))
    rows.push(line(ts(base, t + 2), 'SUCCESS', u, ip, 'RU'))
    return rows
  },
  spray(r) {
    const ip = `${GEO.BR}.${int(r, 2, 250)}`
    const base = int(r, 2, 4) * 3600
    const rows = []
    let t = 0
    for (const u of shuffle(r, USERS).slice(0, int(r, 8, 10))) rows.push(line(ts(base, (t += int(r, 2, 5))), 'FAIL', u, ip, 'BR'))
    rows.push(line(ts(base, t + 3), 'SUCCESS', pick(r, USERS), ip, 'BR'))
    return rows
  },
  stuff(r) {
    const base = int(r, 2, 4) * 3600
    const rows = []
    let t = 0
    const us = shuffle(r, USERS).slice(0, int(r, 9, 11))
    us.forEach((u, i) => {
      const g = pick(r, Object.keys(GEO))
      rows.push(line(ts(base, (t += int(r, 1, 3))), i === us.length - 2 ? 'SUCCESS' : 'FAIL', u, `${GEO[g]}.${int(r, 2, 250)}`, g))
    })
    return rows
  },
  travel(r) {
    const u = pick(r, USERS)
    const base = int(r, 8, 14) * 3600
    const [g1, g2] = shuffle(r, Object.keys(GEO)).slice(0, 2)
    const rows = [line(ts(base, 0), 'SUCCESS', u, `${GEO[g1]}.${int(r, 2, 250)}`, g1)]
    for (const other of shuffle(r, USERS).slice(0, 3)) rows.push(line(ts(base, int(r, 30, 300)), 'SUCCESS', other, `${GEO.US}.${int(r, 2, 250)}`, 'US'))
    rows.push(line(ts(base, int(r, 420, 780)), 'SUCCESS', u, `${GEO[g2]}.${int(r, 2, 250)}`, g2))
    return rows.sort()
  },
  slow(r) {
    const u = pick(r, USERS)
    const ip = `${GEO.IN}.${int(r, 2, 250)}`
    const base = 1 * 3600
    const rows = []
    for (let i = 0; i < int(r, 7, 9); i++) rows.push(line(ts(base, i * int(r, 1500, 1700)), 'FAIL', u, ip, 'IN'))
    return rows
  }
}

export default {
  key: 'log',
  d: 2,
  o: '2.4',
  levels: [5, 6.5, 8, 9.5],
  make(L, r) {
    const pool = L < 6 ? ['brute', 'travel'] : L < 7.5 ? ['brute', 'spray', 'travel'] : L < 9 ? ['spray', 'stuff', 'brute'] : ['slow', 'spray', 'brute', 'stuff']
    const kind = pick(r, pool)
    const rows = build[kind](r)
    const optionKinds = L < 9 ? shuffle(r, ['brute', 'spray', 'stuff', 'travel']) : shuffle(r, ['slow', 'spray', 'brute', 'stuff'])
    const ask = [
      'The authentication log in the exhibit was exported from the identity provider. Which attack pattern does it MOST likely show?',
      'An analyst reviews the sign-in log shown in the exhibit. What is the MOST likely activity?',
      'Based on the log excerpt in the exhibit, which type of attack is occurring?'
    ]
    const why = {
      brute: 'many failures for ONE account from ONE source within seconds, then a success: a high-rate brute-force attack',
      spray: 'ONE source trying many DIFFERENT accounts, only once or twice each, so no single account locks out: password spraying',
      stuff: 'MANY different sources, each trying a different account once: credential stuffing with leaked username/password pairs from a botnet',
      travel: 'the same account succeeding from two countries a few minutes apart, which is physically impossible: a stolen credential or session in use',
      slow: 'failures for ONE account from ONE source spaced about 25 minutes apart, slow enough to stay under lockout thresholds: a low-and-slow brute force'
    }[kind]
    return {
      q: ask,
      x: rows.join('\n'),
      a: [NAMES[kind], ...optionKinds.filter((k) => k !== kind).map((k) => NAMES[k])],
      e: `The log shows ${why}.`
    }
  }
}
