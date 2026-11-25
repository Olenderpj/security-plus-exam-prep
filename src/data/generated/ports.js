// Port questions (4.5: port and protocol selection, firewall rules), built from the shared port list so the
// questions and the Ports flashcard deck always agree. Low levels are straight recall; higher levels apply the
// ports the way the exam does: secure replacements, reading connection logs, and hardening a scanned server.
import { PORTS, portByKey as P } from '../ports.js'
import { pick, shuffle } from './util.js'

const label = (p) => `${p.proto} ${p.port}`
const flipProto = (p) => (p.proto === 'TCP' ? 'UDP' : p.proto === 'UDP' ? 'TCP' : null)
// The number a log or scan line would show for an entry with several ports.
const SHOWN = { ftp: '21', netbios: '139', smtps: '587', ftps: '990' }
const first = (p) => SHOWN[p.key] || p.port.split(/[/–]/)[0]
const transport = (p) => (p.key === 'dns' || p.key === 'sip' ? 'UDP' : p.proto.split('/')[0])
// Entries whose number a question can name without ambiguity (SFTP shares 22 with SSH).
const SINGLE = PORTS.filter((p) => p.key !== 'sftp')
// Cleartext protocols that have a secure replacement on a different port (SFTP replaces FTP and TFTP on 22).
const REPLACE = ['telnet', 'ftp', 'http', 'pop3', 'imap', 'ldap', 'syslog', 'smtp', 'tftp'].map((k) => P[k])
// Distractors must not be a second right answer: FTPS is also a valid secure replacement for FTP.
const alsoRight = { ftp: ['ftps'], tftp: ['ftps'] }
const others = (r, exclude, n) => shuffle(r, SINGLE.filter((p) => !exclude.includes(p.key))).slice(0, n)

export default {
  key: 'ports',
  d: 4,
  o: '4.5',
  levels: [2, 3, 4, 5, 6, 7],
  variants: 5,
  make(L, r) {
    // 1. Port → protocol.
    if (L < 3) {
      const t = pick(r, SINGLE)
      const wrong = others(r, [t.key, ...SINGLE.filter((p) => p.port === t.port).map((p) => p.key)], 3)
      return {
        q: [
          `Which protocol uses ${label(t)} by default?`,
          `A firewall log shows traffic on ${label(t)}. Which protocol is this MOST likely to be?`,
          `${label(t)} is the default for which service?`
        ],
        a: [t.name, ...wrong.map((p) => p.name)],
        e: `${label(t)} is ${t.name}${t.full !== t.name ? ` (${t.full})` : ''}: ${t.use}. ${wrong.map((p) => `${p.name} uses ${label(p)}`).join('; ')}.`
      }
    }
    // 2. Protocol → port and transport.
    if (L < 4) {
      const t = pick(r, SINGLE.filter((p) => p.key !== 'ssh' || r() < 0.5))
      const flip = flipProto(t)
      const near = others(r, [t.key], flip ? 2 : 3)
      const opts = [label(t), ...(flip ? [`${flip} ${t.port}`] : []), ...near.map(label)]
      return {
        q: [
          `A firewall rule must allow ${t.name}${t.full !== t.name ? ` (${t.full})` : ''}. Which protocol and port should it specify?`,
          `Which port and transport does ${t.name} use by default?`,
          `An administrator is writing an ACL entry for ${t.name} traffic. What should the entry match?`
        ],
        a: opts,
        e: `${t.name} uses ${label(t)}: ${t.use}.${flip ? ` It runs over ${t.proto}, not ${flip}.` : ''} The other ports belong to ${near.map((p) => p.name).join(' and ')}.`
      }
    }
    // 3. Replace a cleartext protocol with its secure alternative.
    if (L < 5) {
      const t = pick(r, REPLACE)
      const alt = P[t.alt]
      const flip = flipProto(alt)
      const skip = [t.key, alt.key, ...(alsoRight[t.key] || []), ...SINGLE.filter((p) => p.port === alt.port).map((p) => p.key)]
      const pool = [label(t), ...(flip ? [`${flip} ${alt.port}`] : []), ...others(r, skip, 3).filter((p) => p.secure).map(label), ...others(r, skip, 3).map(label)]
      const opts = [label(alt), ...[...new Set(pool)].slice(0, 3)]
      return {
        q: [
          `An audit finds ${t.name} in use, which sends data in cleartext. The team will replace it with its secure equivalent. Which port must the firewall allow instead?`,
          `Policy now bans ${t.name}. Which port does its encrypted replacement use?`,
          `To stop ${t.name} credentials from crossing the network in cleartext, an administrator switches to the secure alternative. Which port should be opened?`
        ],
        a: opts,
        e: `${t.name} (${label(t)}) is cleartext; its secure replacement is ${alt.name} on ${label(alt)} (${alt.use}). Keeping ${label(t)} open would leave the insecure protocol reachable.`
      }
    }
    // 4. Read a connection log: which connection is cleartext?
    if (L < 6) {
      const bad = pick(r, REPLACE.filter((p) => p.key !== 'smtp'))
      const good = shuffle(r, ['ssh', 'https', 'ldaps', 'imaps', 'pop3s', 'syslogtls', 'rdp', 'ike'].map((k) => P[k])).slice(0, 3)
      const rows = shuffle(r, [bad, ...good])
      const ip = (n) => `10.20.${n}.${10 + n * 7}`
      const x = ['#  Time      Source         Destination      Proto  Dport  Action']
        .concat(rows.map((p, i) => `${i + 1}  09:${14 + i * 3}:0${i}  ${ip(i + 1).padEnd(14)} ${`203.0.113.${40 + i * 11}`.padEnd(16)} ${transport(p).padEnd(6)} ${first(p).padEnd(6)} ALLOW`))
        .join('\n')
      const line = (p) => `Line ${rows.indexOf(p) + 1} (port ${first(p)})`
      return {
        q: [
          'The firewall log shows four allowed outbound connections. Which one sends its data, including any credentials, in cleartext?',
          'Which connection in this log is using an unencrypted protocol?',
          'A review of allowed connections must flag any cleartext protocol. Which entry should be flagged?'
        ],
        a: [line(bad), ...good.map(line)],
        x,
        e: `Port ${first(bad)} is ${bad.name}, which is cleartext; ${P[bad.alt].name} on ${label(P[bad.alt])} is the secure replacement. The others are encrypted: ${good.map((p) => `${first(p)} ${p.name}`).join(', ')}.`
      }
    }
    // 5–6. Harden a scanned server: which ports should be closed? (Select TWO / THREE.)
    const roles = [
      { name: 'public web server', keep: ['https', 'ssh'] },
      { name: 'log collector', keep: ['syslogtls', 'ssh'] },
      { name: 'directory server', keep: ['ldaps', 'kerberos'] },
      { name: 'mail server for remote staff', keep: ['imaps', 'smtps'] },
      { name: 'file transfer server', keep: ['ssh', 'https'] }
    ]
    const role = pick(r, roles)
    const n = L < 7 ? 2 : 3
    const close = shuffle(r, ['telnet', 'ftp', 'tftp', 'http', 'pop3', 'imap', 'ldap', 'syslog', 'snmp', 'netbios'].map((k) => P[k]).filter((p) => !role.keep.includes(p.alt))).slice(0, n)
    const keep = role.keep.map((k) => P[k])
    const open = shuffle(r, [...close, ...keep])
    const scan = (p) => `${first(p)}/${transport(p).toLowerCase()}`
    const x = ['PORT       STATE', ...open.map((p) => `${scan(p).padEnd(11)}open`)].join('\n')
    const why = (p) => (p.key === 'netbios' ? 'legacy Windows service that should not be exposed' : p.key === 'snmp' ? 'v1/v2c community strings in cleartext' : 'cleartext')
    const word = n === 2 ? 'TWO' : 'THREE'
    return {
      q: [
        `A scan of a ${role.name} shows these open ports. It should only offer its service and management over encrypted protocols. Which ${word} ports should be closed? (Select ${word}.)`,
        `Hardening a ${role.name}: which ${word} of the open ports below run insecure services that should be disabled? (Select ${word}.)`,
        `Based on the scan, which ${word} ports on this ${role.name} expose insecure services? (Select ${word}.)`
      ],
      a: [...close.map(scan), ...keep.map(scan)],
      nCorrect: n,
      x,
      e: `Close ${close.map((p) => `${scan(p)} (${p.name}: ${why(p)})`).join(', ')}. Keep ${keep.map((p) => `${scan(p)} (${p.name})`).join(' and ')}: the encrypted ${role.name.includes('directory') ? 'directory and authentication' : 'service and management'} ports.`
    }
  }
}
