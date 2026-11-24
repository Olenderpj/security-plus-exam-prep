// Network design and rule analysis: subnet maths (3.2) and firewall rule evaluation (4.5).
import { int, pick, shuffle } from './util.js'

const toInt = (ip) => ip.split('.').reduce((a, o) => ((a << 8) | Number(o)) >>> 0, 0)
const toIp = (n) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join('.')
const maskOf = (p) => (p === 0 ? 0 : (~0 << (32 - p)) >>> 0)
const netOf = (ip, p) => (toInt(ip) & maskOf(p)) >>> 0
const sizeOf = (p) => 2 ** (32 - p)

// Subnet maths is supporting knowledge only (reading CIDR in rules and ACLs); the exam does not test subnetting
// calculations, so this family stops at level 6.5 and never reaches the harder tiers.
export const cidr = {
  key: 'cidr',
  d: 3,
  o: '3.2',
  levels: [4.5, 5.5, 6.5],
  make(L, r) {
    const a = pick(r, [10, 172, 192])
    const b = a === 10 ? int(r, 0, 250) : a === 172 ? int(r, 16, 31) : 168
    const c = int(r, 0, 250)
    if (L < 5) {
      const p = int(r, 24, 30)
      const hosts = sizeOf(p) - 2
      return {
        q: [
          `A network architect carves ${a}.${b}.${c}.0/${p} out of the address plan for a new server segment. How many usable host addresses does it provide?`,
          `How many usable host addresses are available in the subnet ${a}.${b}.${c}.0/${p}?`,
          `The DMZ segment is defined as ${a}.${b}.${c}.0/${p}. How many hosts can be assigned addresses in it?`
        ],
        a: [String(hosts), String(hosts + 2), String(hosts + 1), String(sizeOf(p + 1) - 2)],
        e: `A /${p} leaves ${32 - p} host bits: 2^${32 - p} = ${hosts + 2} addresses. The network and broadcast addresses are unusable, so ${hosts} are usable.`
      }
    }
    if (L < 6) {
      const hosts = int(r, 20, 460)
      let p = 30
      while (sizeOf(p) - 2 < hosts) p--
      return {
        q: [
          `A VLAN must hold ${hosts} hosts today. Which is the smallest subnet (longest prefix) that fits them all?`,
          `Which CIDR prefix is the most efficient choice for a segment that needs ${hosts} usable host addresses?`,
          `An engineer must size a subnet for ${hosts} devices and wants to waste as few addresses as possible. Which prefix length should be used?`
        ],
        a: [`/${p}`, `/${p - 1}`, `/${p + 1}`, `/${p - 2}`],
        e: `Usable hosts = 2^(32−prefix) − 2. A /${p} gives ${sizeOf(p) - 2} usable addresses, enough for ${hosts}; a /${p + 1} gives only ${sizeOf(p + 1) - 2}. Shorter prefixes (/${p - 1}, /${p - 2}) work but waste addresses.`
      }
    }
    if (L < 7) {
      const p = int(r, 26, 29)
      const size = sizeOf(p)
      const base = netOf(`${a}.${b}.${c}.0`, p)
      const blk = int(r, 1, 3)
      const start = (base + blk * size) >>> 0
      const same = toIp(start + int(r, 1, size - 2))
      const host = toIp(start + int(r, 1, size - 2))
      const hostInt = toInt(host)
      const cands = new Set([same])
      const near = [start + size + int(r, 1, size - 2), start - size + int(r, 1, size - 2), start + 2 * size + int(r, 1, size - 2)]
      near.forEach((x) => cands.add(toIp(x >>> 0)))
      const options = [...cands]
      if (options.length < 4 || toInt(same) === hostInt) return null
      return {
        q: [
          `Host ${host}/${p} must reach a printer without crossing a router. Which address is in the same subnet as the host?`,
          `Which of these addresses belongs to the same subnet as ${host}/${p}?`,
          `A workstation is configured as ${host} with a /${p} mask. Which device can it reach directly, with no default gateway?`
        ],
        a: options,
        e: `A /${p} subnet is a block of ${size} addresses. ${host} is in ${toIp(start)}–${toIp(start + size - 1)}, so only ${same} falls in that block; the others sit in neighbouring blocks.`
      }
    }
    if (L < 8) {
      const p = int(r, 22, 29)
      const size = sizeOf(p)
      const host = toIp(((netOf(`${a}.${b}.${c}.0`, p) + int(r, 0, 3) * size + int(r, 1, size - 2)) >>> 0))
      const net = netOf(host, p)
      const bc = (net + size - 1) >>> 0
      return {
        q: [
          `Packets for the directed broadcast of the subnet containing ${host}/${p} are being filtered. What is that broadcast address?`,
          `What is the broadcast address of the network that host ${host}/${p} belongs to?`,
          `Calculate the broadcast address for ${host}/${p}.`
        ],
        a: [toIp(bc), toIp(net), toIp(bc - 1), toIp((bc + 1) >>> 0)],
        e: `${host}/${p} lives in ${toIp(net)}/${p}, a block of ${size} addresses. The last address, ${toIp(bc)}, is the broadcast; ${toIp(net)} is the network address, ${toIp(bc - 1)} the last usable host, and ${toIp((bc + 1) >>> 0)} is the next network.`
      }
    }
    if (L < 9) {
      const count = pick(r, [2, 4, 8])
      const bits = Math.log2(count)
      const third = int(r, 0, 31) * count // aligned start
      const s = third % 256
      const nets = Array.from({ length: count }, (_, i) => `${a}.${b}.${s + i}.0/24`)
      if (s + count > 255) return null
      const p = 24 - bits
      return {
        q: [
          `A router advertises these networks: ${nets.join(', ')}. Which single route summarizes exactly these networks and nothing else?`,
          `Which one summary route covers all of ${nets.join(', ')} with no extra address space?`,
          `To shrink the routing table, an engineer replaces ${count} contiguous /24 routes (${nets[0]} through ${nets[count - 1]}) with one. Which summary is correct?`
        ],
        a: [`${a}.${b}.${s}.0/${p}`, `${a}.${b}.${s}.0/${p + 1}`, `${a}.${b}.${s}.0/${p - 1}`, `${a}.${b}.${s + count}.0/${p}`],
        e: `${count} contiguous /24 blocks span ${count * 256} addresses = 2^${8 + bits}, so the prefix is /${p}. The starting address ${a}.${b}.${s}.0 is aligned on that boundary. A /${p + 1} would leave networks out; a /${p - 1} would pull in extra address space.`
      }
    }
    // VLSM
    const sets = pick(r, [[100, 50, 20], [100, 30, 12], [60, 28, 12], [120, 60, 28], [50, 25, 10]])
    const sizes = sets.map((h) => {
      let p = 30
      while (sizeOf(p) - 2 < h) p--
      return p
    })
    let off = 0
    const starts = sizes.map((p) => {
      const s = off
      off += sizeOf(p)
      return s
    })
    if (off > 256) return null
    const which = 2
    const net = `${a}.${b}.${c}.${starts[which]}/${sizes[which]}`
    const wrongOrder = `${a}.${b}.${c}.0/${sizes[which]}`
    return {
      q: [
        `The ${a}.${b}.${c}.0/24 block is divided with variable-length subnetting for three departments needing ${sets.join(', ')} hosts. Subnets are allocated from the lowest address upward, largest requirement first, each with the smallest prefix that fits. What is the subnet for the ${sets[which]}-host department?`,
        `Using VLSM on ${a}.${b}.${c}.0/24, assign subnets largest-first from the bottom of the range to departments of ${sets.join(', ')} hosts, each with the smallest fitting prefix. Which subnet does the ${sets[which]}-host department receive?`,
        `Allocating ${a}.${b}.${c}.0/24 largest-first for ${sets.join(', ')} hosts with VLSM, which network is assigned to the department that needs ${sets[which]} hosts?`
      ],
      a: [net, wrongOrder, `${a}.${b}.${c}.${starts[which] + sizeOf(sizes[which])}/${sizes[which]}`, `${a}.${b}.${c}.${starts[which]}/${sizes[which] - 1}`],
      e: `Largest first: ${sets.map((h, i) => `${h} hosts → /${sizes[i]} at ${a}.${b}.${c}.${starts[i]}`).join('; ')}. Allocating the largest blocks first keeps every subnet aligned on its own boundary; starting with the small one would push the others off alignment.`
    }
  }
}

// ── firewall rule evaluation ──
const NETS = ['10.0.0.0/8', '10.2.0.0/16', '172.16.0.0/12', '192.168.10.0/24', '203.0.113.0/24', '198.51.100.0/24', 'any']
const DSTS = ['192.168.10.0/24', '192.168.10.5/32', '10.2.0.0/16', '172.16.5.0/24', 'any']
const PORTS = [22, 25, 53, 80, 443, 3389, 'any']
const inNet = (ip, c) => {
  if (c === 'any') return true
  const [n, p] = c.split('/')
  return netOf(ip, Number(p)) === netOf(n, Number(p))
}
const hostIn = (c, r) => {
  if (c === 'any') return `${pick(r, [10, 172, 198, 203])}.${int(r, 0, 31)}.${int(r, 0, 250)}.${int(r, 1, 250)}`
  const [n, p] = c.split('/')
  const base = netOf(n, Number(p))
  return toIp(base + int(r, 0, Math.min(sizeOf(Number(p)) - 1, 250)))
}
const matches = (rule, pkt) =>
  (rule.proto === 'any' || rule.proto === pkt.proto) && inNet(pkt.src, rule.src) && inNet(pkt.dst, rule.dst) && (rule.port === 'any' || rule.port === pkt.port)

export function evalRules(rules, pkt) {
  const hit = rules.findIndex((x) => matches(x, pkt))
  return hit < 0 ? { action: 'DENY', rule: null } : { action: rules[hit].action, rule: hit + 1 }
}

export const fwrules = {
  key: 'fw',
  d: 4,
  o: '4.5',
  levels: [5, 6, 7, 8, 9, 9.5],
  make(L, r) {
    const count = Math.min(8, 3 + Math.floor((L - 5) * 1.2))
    const rules = Array.from({ length: count }, () => {
      const proto = pick(r, ['tcp', 'tcp', 'tcp', 'udp', 'any'])
      return { action: pick(r, ['ALLOW', 'DENY']), proto, src: pick(r, NETS), dst: pick(r, DSTS), port: proto === 'any' ? 'any' : pick(r, PORTS) }
    })
    // craft a packet that matches a later rule so earlier, broader rules matter
    const j = int(r, Math.min(1, count - 1), count - 1)
    const target = rules[j]
    const noMatch = L >= 8 && r() < 0.3
    const pkt = noMatch
      ? { proto: 'tcp', src: '8.8.4.4', dst: '1.1.1.1', port: 8080 }
      : { proto: target.proto === 'any' ? pick(r, ['tcp', 'udp']) : target.proto, src: hostIn(target.src, r), dst: hostIn(target.dst, r), port: target.port === 'any' ? pick(r, [22, 80, 443, 8080]) : target.port }
    const res = evalRules(rules, pkt)
    const text = (action, rule) => (rule ? `${action === 'ALLOW' ? 'Allowed' : 'Denied'} by rule ${rule}` : 'Denied by the implicit deny at the end')
    const correct = text(res.action, res.rule)
    const pool = new Set()
    if (res.rule) {
      pool.add(text(res.action === 'ALLOW' ? 'DENY' : 'ALLOW', res.rule))
      pool.add(text('DENY', null))
    }
    rules.forEach((x, i) => pool.add(text(x.action, i + 1)))
    pool.add(text('DENY', null))
    pool.delete(correct)
    const wrongs = shuffle(r, [...pool]).slice(0, 3)
    if (wrongs.length < 3) return null
    const table = ['#  Action  Proto  Source             Destination        Port']
    rules.forEach((x, i) => table.push(`${String(i + 1).padEnd(3)}${x.action.padEnd(8)}${x.proto.padEnd(7)}${x.src.padEnd(19)}${x.dst.padEnd(19)}${x.port}`))
    table.push('', `Packet: ${pkt.proto}  ${pkt.src} -> ${pkt.dst}  port ${pkt.port}`)
    return {
      q: [
        'The firewall rule set and a packet are shown in the exhibit. Rules are evaluated top to bottom and the first match decides. What happens to the packet?',
        'Using the exhibit, determine what the firewall does with the packet. Rules are processed in order and the first match wins.',
        'Based on the ordered rule set in the exhibit, which result applies to the packet shown?'
      ],
      x: table.join('\n'),
      a: [correct, ...wrongs],
      e: res.rule
        ? `Evaluating in order, rule ${res.rule} is the first whose protocol, source, destination and port all match, so its action (${res.action}) applies and later rules are never consulted.`
        : 'No rule matches the protocol, addresses and port of the packet, so it falls through to the implicit deny at the end of the list.'
    }
  }
}
