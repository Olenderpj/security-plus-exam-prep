// Cryptography and credential maths: key counts (1.4) and password entropy / work factor (4.6).
import { int, num, pick, sci, shuffle } from './util.js'

export const keys = {
  key: 'keys',
  d: 1,
  o: '1.4',
  levels: [4.5, 5.5, 6.5, 7.5, 8.5],
  make(L, r) {
    const n = int(r, 5, 25)
    const pairs = (x) => (x * (x - 1)) / 2
    if (L < 5) {
      return {
        q: [
          `${n} employees must each be able to exchange confidential messages with every other employee, using a different secret symmetric key for every pair of people. How many symmetric keys are needed in total?`,
          `A company gives every pair of its ${n} staff a unique shared symmetric key. How many keys must be generated and distributed?`,
          `How many unique symmetric keys does full-mesh secure messaging need for ${n} people if each pair shares its own key?`
        ],
        a: [num(pairs(n)), num(n * (n - 1)), num(n * n), num(2 * n)],
        e: `Each pair needs its own key: n(n−1)/2 = ${n}×${n - 1}/2 = ${pairs(n)}. n(n−1) counts every pair twice, n² counts people paired with themselves, and 2n is the number of keys in an asymmetric scheme.`
      }
    }
    if (L < 6) {
      return {
        q: [
          `Instead of pairwise secrets, each of ${n} employees is given an asymmetric key pair so anyone can send encrypted mail to anyone else. How many individual keys (public and private counted separately) exist in total?`,
          `With public-key encryption for ${n} users, how many keys exist if every user has one key pair and each key is counted once?`,
          `${n} users each generate an asymmetric key pair for secure email. How many keys is that altogether?`
        ],
        a: [num(2 * n), num(n), num(pairs(n)), num(pairs(n) * 2)],
        e: `Each user needs exactly one pair = 2 keys, so ${n} users hold 2 × ${n} = ${2 * n} keys regardless of how many people they talk to. Symmetric pairwise keys would need ${pairs(n)}.`
      }
    }
    if (L < 7) {
      const m = n + int(r, 3, 10)
      return {
        q: [
          `A team using unique pairwise symmetric keys grows from ${n} to ${m} people. How many additional keys must be created and distributed?`,
          `The pairwise-key scheme for ${n} staff must be extended to ${m} staff. How many new symmetric keys are required?`,
          `How many more pairwise symmetric keys are needed when headcount rises from ${n} to ${m}?`
        ],
        a: [num(pairs(m) - pairs(n)), num(pairs(m)), num(2 * (m - n)), num((m - n) * m)],
        e: `Before: ${n}(${n - 1})/2 = ${pairs(n)} keys. After: ${m}(${m - 1})/2 = ${pairs(m)} keys. New keys = ${pairs(m)} − ${pairs(n)} = ${pairs(m) - pairs(n)}. Each newcomer needs a key with everyone already present, which is why symmetric key management scales poorly.`
      }
    }
    if (L < 8) {
      const offices = int(r, 6, 20)
      return {
        q: [
          `${offices} branch offices exchange files using hybrid encryption: each transfer generates a fresh random symmetric session key that is wrapped with the recipient's public key. How many long-term keys must be provisioned and managed (public and private keys counted separately)?`,
          `A hybrid scheme lets ${offices} offices send each other files; session keys are generated per transfer and discarded afterwards. How many long-term keys exist in total?`,
          `In a hybrid design where every one of ${offices} sites holds one asymmetric key pair and session keys are ephemeral, how many long-term keys need managing?`
        ],
        a: [num(2 * offices), num(pairs(offices)), num(offices), num(offices * (offices - 1))],
        e: `Session keys are generated and thrown away per transfer, so they are not provisioned. Only identity keys last: one key pair (2 keys) per office = ${2 * offices}. This is how hybrid encryption keeps symmetric speed without the n(n−1)/2 = ${pairs(offices)} key explosion.`
      }
    }
    const t = int(r, 1, 3)
    const hold = { 1: 'counting each user’s public/private key pair as one key', 2: 'counting a user’s public and private keys separately (2 keys per user)', 3: 'where each user holds a key pair plus one personal symmetric file-encryption key (3 keys per user)' }[t]
    const ans = 2 * t + 2
    return {
      q: [
        `Pairwise symmetric keys need n(n−1)/2 keys for n users. Compared with an asymmetric scheme ${hold}, what is the smallest number of users for which the symmetric mesh needs strictly more keys?`,
        `Find the smallest group size at which a pairwise symmetric mesh (n(n−1)/2 keys) outnumbers the keys in an asymmetric scheme ${hold}.`,
        `At what minimum number of users does pairwise symmetric key management require more keys than an asymmetric scheme ${hold}?`
      ],
      a: [String(ans), String(ans - 1), String(ans + 1), String(ans + 3)],
      e: `Symmetric: n(n−1)/2. Asymmetric: ${t}n keys. n(n−1)/2 > ${t}n ⇔ n − 1 > ${2 * t} ⇔ n > ${2 * t + 1}, so n = ${ans} (${(ans * (ans - 1)) / 2} versus ${t * ans}). At n = ${ans - 1} the symmetric mesh needs ${((ans - 1) * (ans - 2)) / 2}, which only equals the ${t * (ans - 1)} keys of the asymmetric scheme, not more.`
    }
  }
}

const SETS = [
  { name: 'digits only', size: 10 },
  { name: 'lowercase letters', size: 26 },
  { name: 'upper and lowercase letters', size: 52 },
  { name: 'letters and digits', size: 62 },
  { name: 'all printable ASCII characters', size: 94 }
]
const bits = (size, len) => len * Math.log2(size)
const fmtTime = (secs) => {
  const units = [['seconds', 1], ['minutes', 60], ['hours', 3600], ['days', 86400], ['years', 31557600]]
  let u = units[0]
  for (const x of units) if (secs >= x[1]) u = x
  const v = secs / u[1]
  return `about ${v >= 100 ? Math.round(v).toLocaleString('en-US') : v >= 10 ? v.toFixed(0) : v.toFixed(1)} ${u[0]}`
}

export const entropy = {
  key: 'ent',
  d: 4,
  o: '4.6',
  levels: [5, 6, 7, 8, 9],
  make(L, r) {
    if (L < 6) {
      const ps = shuffle(r, SETS).slice(0, 4).map((s) => ({ ...s, len: int(r, 6, 14) }))
      const sorted = [...ps].sort((a, b) => bits(b.size, b.len) - bits(a.size, a.len))
      if (bits(sorted[0].size, sorted[0].len) - bits(sorted[1].size, sorted[1].len) < 1) return null
      const names = ['A', 'B', 'C', 'D']
      return {
        q: [
          'A company is choosing a password policy. All passwords are generated randomly. According to the exhibit, which policy gives the highest entropy?',
          'Using the exhibit, which random-password policy resists offline brute force the best (highest entropy)?',
          'Which of the randomly generated password policies in the exhibit has the largest keyspace?'
        ],
        x: ps.map((p, i) => `Policy ${names[i]}: ${p.len} characters, ${p.name}`).join('\n'),
        a: [`Policy ${names[ps.indexOf(sorted[0])]}`, ...names.filter((_, i) => ps[i] !== sorted[0]).map((n) => `Policy ${n}`)],
        e: `Entropy = length × log2(character-set size). ${ps.map((p, i) => `${names[i]}: ${p.len} × log2(${p.size}) = ${bits(p.size, p.len).toFixed(1)} bits`).join('; ')}. Policy ${names[ps.indexOf(sorted[0])]} is highest.`
      }
    }
    if (L < 7) {
      const words = int(r, 4, 7)
      const chars = int(r, 9, 14)
      const set = pick(r, [SETS[3], SETS[4]])
      const bp = words * Math.log2(7776)
      const bc = bits(set.size, chars)
      if (Math.abs(bp - bc) < 2) return null
      const win = bp > bc ? 'passphrase' : 'password'
      return {
        q: [
          `Which is harder to brute force: a passphrase of ${words} words chosen at random from a 7,776-word list (like Diceware), or a random ${chars}-character password using ${set.name}?`,
          `Compare a randomly generated ${words}-word Diceware passphrase (7,776-word list) with a random ${chars}-character password drawn from ${set.name}. Which has more entropy?`,
          `A user can pick ${words} random Diceware words (list of 7,776) or ${chars} random characters from ${set.name}. Which choice is stronger?`
        ],
        a: win === 'passphrase'
          ? ['The passphrase (higher entropy)', 'The password (higher entropy)', 'They are equal', 'The passphrase, only because it is longer in characters']
          : ['The password (higher entropy)', 'The passphrase (higher entropy)', 'They are equal', 'The password, only because it is longer in characters'],
        e: `Each Diceware word adds log2(7,776) ≈ 12.9 bits: ${words} words = ${bp.toFixed(1)} bits. The password has ${chars} × log2(${set.size}) = ${bc.toFixed(1)} bits. The ${win} is stronger. Visual length is not the measure; the size of the space the attacker must search is.`
      }
    }
    if (L < 9) {
      const set = pick(r, SETS.slice(2))
      const len = int(r, 7, 10)
      const rate = pick(r, [1e9, 1e10, 1e11])
      const t = set.size ** len / rate
      return {
        q: [
          `An attacker with a GPU rig tries ${sci(rate, 0)} password hashes per second against a stolen file. Passwords are random, ${len} characters, from ${set.name}. About how long to exhaust the entire keyspace?`,
          `Estimate the worst-case time to try every possible ${len}-character random password built from ${set.name} at ${num(rate)} guesses per second.`,
          `A cracking rig performs ${num(rate)} guesses a second. How long does it need to try every random ${len}-character password over ${set.name}?`
        ],
        a: [fmtTime(t), fmtTime(t * 10), fmtTime(t / 10), fmtTime(t * 62 > t * 10 ? t * 62 : t * 3)],
        e: `Keyspace = ${set.size}^${len} ≈ ${sci(set.size ** len)}. Dividing by ${num(rate)} guesses per second gives ${sci(t)} seconds, ${fmtTime(t)}. (On average a password falls in half that time.) Each extra character multiplies the work by ${set.size}.`
      }
    }
    const set = pick(r, [SETS[1], SETS[2], SETS[3]])
    const len = int(r, 8, 12)
    const bigger = SETS[SETS.indexOf(set) + 1]
    const f = {
      'Add one more character': set.size,
      'Add two more characters': set.size ** 2,
      [`Switch the character set to ${bigger.name} (same length)`]: (bigger.size / set.size) ** len
    }
    const best = Object.entries(f).sort((a, b) => b[1] - a[1])
    if (best[0][1] / best[1][1] < 1.2) return null
    return {
      q: [
        `Passwords are random, ${len} characters, from ${set.name} (${set.size} symbols). Which single policy change increases the brute-force work factor the most?`,
        `A policy currently requires ${len} random characters from ${set.name}. Which change multiplies an attacker's work the most?`,
        `Which of these changes gives the greatest increase in keyspace for ${len}-character random passwords over ${set.name}?`
      ],
      a: [...best.map((b) => b[0]), 'Require a password change every 30 days instead of every 90'],
      e: `Work factor multipliers: ${Object.entries(f).map(([k, v]) => `${k.toLowerCase()} ×${sci(v, 1)}`).join('; ')}. The largest is "${best[0][0].toLowerCase()}". Rotation frequency does not change the size of the space an offline attacker must search.`
    }
  }
}
