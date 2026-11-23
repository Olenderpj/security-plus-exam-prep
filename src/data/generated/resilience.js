// Resilience calculations (3.4): restore chains and storage for backup strategies, availability maths.
import { int, money, num, pick, round } from './util.js'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const backup = {
  key: 'bak',
  d: 3,
  o: '3.4',
  levels: [5, 6, 7, 8, 9, 9.5],
  make(L, r) {
    if (L < 7) {
      const d = int(r, 3, 6) // failure morning
      const diff = r() < 0.5
      const sets = diff ? 2 : d
      return {
        q: [
          `A full backup runs every Sunday night and a ${diff ? 'differential' : 'incremental'} backup runs each night from Monday through Saturday. The server's disks fail on ${DAYS[d]} morning, before that night's backup. How many backup sets must be restored?`,
          `Backups: full on Sunday night, then a ${diff ? 'differential' : 'incremental'} every night after. The array fails ${DAYS[d]} morning. How many sets are needed to recover to the last good point?`,
          `With a Sunday-night full and nightly ${diff ? 'differential' : 'incremental'} backups, how many sets does recovery need when the storage fails on ${DAYS[d]} before the nightly job?`
        ],
        a: [String(sets), String(diff ? d : 2), String(sets + 1), String(Math.max(1, sets - 1))],
        e: diff
          ? `A differential contains everything changed since the last full, so recovery needs only the full backup plus the most recent differential = 2 sets. (An incremental chain would need ${d}.)`
          : `An incremental contains only changes since the previous backup, so recovery needs the full backup plus every incremental since: Sunday full + ${d - 1} nightly incrementals (Monday–${DAYS[d - 1]}) = ${d} sets. (A differential strategy would need just 2.)`
      }
    }
    if (L < 8.5) {
      const d = int(r, 2, 5)
      const hour = int(r, 1, 21)
      const lastBackupHour = 23
      const lost = hour + (24 - lastBackupHour)
      const incr = r() < 0.5
      const sets = incr ? d + 1 : 2
      const f = (h, s) => `Up to ${h} hours of changes lost; restore ${s} sets`
      return {
        q: [
          `Backups: a full on Sunday at 23:00 and a${incr ? 'n incremental' : ' differential'} every night at 23:00. A ransomware outbreak is detected on ${DAYS[d + 1]} at ${String(hour).padStart(2, '0')}:00 and the systems are rebuilt from backup. What is the worst-case data loss, and how many sets are restored (last backup was the previous night)?`,
          `Nightly jobs run at 23:00 (full on Sunday, then${incr ? ' incremental' : ' differential'}). Ransomware hits ${DAYS[d + 1]} at ${String(hour).padStart(2, '0')}:00. Which statement describes the data lost since the last backup and the sets needed to restore?`,
          `Full backup Sunday 23:00, ${incr ? 'incrementals' : 'differentials'} every following night at 23:00. Recovery starts ${DAYS[d + 1]} at ${String(hour).padStart(2, '0')}:00. How much data is lost at most, and how many sets are restored?`
        ],
        a: [f(lost, sets), f(lost + 24, sets), f(lost, incr ? 2 : d + 1), f(24 - lost > 0 ? 24 - lost : lost + 2, sets)],
        e: `The newest backup finished the previous night at 23:00, so everything changed in the ${lost} hours since is lost. ${incr ? `Incrementals chain: full + ${d} incrementals = ${d + 1} sets.` : 'A differential needs only the full plus the latest differential = 2 sets.'}`
      }
    }
    const full = int(r, 4, 10) * 100
    const pct = pick(r, [2, 3, 5])
    const change = (full * pct) / 100
    const incrTotal = full + 6 * change
    const diffTotal = full + 21 * change
    const weeks = L < 9 ? 1 : int(r, 2, 4)
    return {
      q: [
        `A system holding ${num(full)} GB takes a full backup every Sunday. About ${pct}% of the data (${num(change)} GB) changes each day and no data change overlaps with another day's. Nightly backups run Monday–Saturday. Compared with incremental backups, how much more storage do differential backups use over ${weeks === 1 ? 'one week' : `a ${weeks}-week retention cycle`}?`,
        `Over ${weeks === 1 ? 'a week' : `${weeks} weekly cycles`}, how many more GB does a nightly-differential strategy consume than a nightly-incremental one, for a ${num(full)} GB dataset that changes by ${num(change)} GB per day (full backup each Sunday, nightly jobs Monday–Saturday)?`,
        `A ${num(full)} GB file server changes ${pct}% per day. Full backups run Sundays; nightly backups run Monday through Saturday. What is the extra storage consumed by differentials compared with incrementals over ${weeks === 1 ? 'the week' : `${weeks} weeks`}?`
      ],
      a: [`${num(15 * change * weeks)} GB`, `${num(21 * change * weeks)} GB`, `${num(6 * change * weeks)} GB`, `${num(7 * change * weeks)} GB`],
      e: `Incremental nights each store one day of change: 6 × ${num(change)} = ${num(6 * change)} GB per week. Differential nights store the cumulative change since Sunday: (1+2+3+4+5+6) × ${num(change)} = ${num(21 * change)} GB per week. The extra is ${num(21 * change)} − ${num(6 * change)} = ${num(15 * change)} GB per week${weeks > 1 ? `, ${num(15 * change * weeks)} GB over ${weeks} weeks` : ''}. (Weekly totals: incremental ${num(incrTotal)} GB, differential ${num(diffTotal)} GB, including the full.)`
    }
  }
}

const pctText = (x, dp = 2) => `${(x * 100).toFixed(dp)}%`

export const availability = {
  key: 'avail',
  d: 3,
  o: '3.4',
  levels: [5, 6, 7, 8, 9, 9.5],
  make(L, r) {
    if (L < 6) {
      const A = pick(r, [99, 99.5, 99.9, 99.95, 99.99])
      const mins = (1 - A / 100) * 525600
      const fmt = (m) => (m >= 120 ? `${round(m / 60, 2)} hours` : `${round(m, 2)} minutes`)
      return {
        q: [
          `An SLA promises ${A}% availability. What is the maximum downtime allowed per year?`,
          `A provider guarantees ${A}% uptime over a year (525,600 minutes). Roughly how much downtime does that permit?`,
          `How much unplanned downtime per year is consistent with ${A}% availability?`
        ],
        a: [fmt(mins), fmt(mins * 10), fmt(mins / 10), fmt(mins / 12)],
        e: `Allowed downtime = (100% − ${A}%) × 525,600 minutes = ${fmt(mins)} per year. The other figures are off by a factor of ten or are a monthly share.`
      }
    }
    if (L < 7) {
      const mtbf = pick(r, [500, 1000, 2000, 4000, 8000])
      const mttr = pick(r, [2, 4, 5, 8, 10])
      const A = mtbf / (mtbf + mttr)
      return {
        q: [
          `A server has a mean time between failures (MTBF) of ${num(mtbf)} hours and a mean time to repair (MTTR) of ${mttr} hours. What is its availability?`,
          `Given MTBF = ${num(mtbf)} h and MTTR = ${mttr} h, calculate the availability of the system.`,
          `A component fails on average every ${num(mtbf)} hours and takes ${mttr} hours to restore. Which availability figure is correct?`
        ],
        a: [pctText(A), pctText(1 - mttr / mtbf), pctText(mtbf / (mtbf + mttr + mttr)), pctText(mtbf / (mtbf + mttr * 2 + 1))],
        e: `Availability = MTBF ÷ (MTBF + MTTR) = ${num(mtbf)} ÷ ${num(mtbf + mttr)} = ${pctText(A, 4)}. Using 1 − MTTR/MTBF or doubling the repair time gives nearby but incorrect values.`
      }
    }
    if (L < 8.5) {
      const a1 = pick(r, [0.99, 0.995, 0.999])
      const a2 = pick(r, [0.98, 0.99, 0.995].filter((x) => x !== a1))
      return {
        q: [
          `A web application depends on a front-end tier with ${pctText(a1, 1)} availability and a database with ${pctText(a2, 1)} availability. If either failing takes the application down, what is the application's overall availability?`,
          `Two components in series: one is available ${pctText(a1, 1)} of the time and the other ${pctText(a2, 1)}. Both must work for the service to work. What is the service's availability?`,
          `The service needs both a ${pctText(a1, 1)}-available API tier and a ${pctText(a2, 1)}-available database. Calculate the combined availability.`
        ],
        a: [pctText(a1 * a2, 3), pctText(Math.min(a1, a2), 3), pctText((a1 + a2) / 2, 3), pctText(1 - (1 - a1) * (1 - a2), 3)],
        e: `Components in series multiply: ${a1} × ${a2} = ${(a1 * a2).toFixed(5)} = ${pctText(a1 * a2, 3)}. The weaker component alone (${pctText(Math.min(a1, a2), 3)}) overstates it, an average is wrong, and ${pctText(1 - (1 - a1) * (1 - a2), 3)} is what redundant (parallel) components would give.`
      }
    }
    const s = pick(r, [0.95, 0.98, 0.99])
    const n = pick(r, [2, 3])
    const lb = pick(r, [0.999, 0.9995, 0.9999])
    const par = 1 - (1 - s) ** n
    const total = lb * par
    return {
      q: [
        `${n} identical application servers, each ${pctText(s, 0)} available, run active/active behind a load balancer that is itself ${pctText(lb, 2)} available. The service works if at least one server and the load balancer work. What is the overall availability?`,
        `A load balancer (${pctText(lb, 2)}) fronts ${n} redundant servers of ${pctText(s, 0)} availability each, any one of which can carry the load. Calculate the availability of the whole service.`,
        `Calculate the end-to-end availability: a ${pctText(lb, 2)}-available load balancer in series with a pool of ${n} parallel servers, each ${pctText(s, 0)} available, needing only one server up.`
      ],
      a: [pctText(total, 4), pctText(par, 4), pctText(lb * s, 4), pctText(lb * s ** n, 4)],
      e: `The server pool fails only if all ${n} fail: 1 − (1 − ${s})^${n} = ${pctText(par, 4)}. The load balancer is in series with the pool, so multiply: ${lb} × ${par.toFixed(6)} = ${pctText(total, 4)}. Ignoring the load balancer gives ${pctText(par, 4)}; treating the servers as a series chain (${pctText(lb * s ** n, 4)}) or using one server (${pctText(lb * s, 4)}) underestimates it.`
    }
  }
}
