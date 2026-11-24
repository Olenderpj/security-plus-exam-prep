// Backup restore chains (3.4): how many sets a restore needs. Replaces the earlier availability and storage maths.
import { int } from './util.js'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const an = (word) => (/^[aeiou]/i.test(word) ? `an ${word}` : `a ${word}`)

// Backup restore chains: how many sets a restore needs for full + incremental or full + differential. (Storage and
// data-loss arithmetic, and availability-percentage maths, are not part of the exam and were removed.)
export const backup = {
  key: 'bak',
  d: 3,
  o: '3.4',
  levels: [5, 6],
  make(L, r) {
    const d = int(r, 3, 6) // failure morning
    const diff = r() < 0.5
    const kind = diff ? 'differential' : 'incremental'
    const sets = diff ? 2 : d
    const stems = L < 6
      ? [
          `A full backup runs every Sunday night and ${an(kind)} backup runs each night from Monday through Saturday. The server's disks fail on ${DAYS[d]} morning, before that night's backup. How many backup sets must be restored?`,
          `Backups: full on Sunday night, then ${an(kind)} every night after. The array fails ${DAYS[d]} morning. How many sets are needed to recover to the last good point?`,
          `With a Sunday-night full and nightly ${kind} backups, how many sets does recovery need when the storage fails on ${DAYS[d]} before the nightly job?`
        ]
      : [
          `A file server uses a weekly full backup (Sunday night) and nightly ${kind} backups. On ${DAYS[d]} morning a ransomware infection is confirmed and the server is rebuilt from the most recent clean backup (last night's). How many backup sets are restored?`,
          `Using a Sunday full plus ${kind} backups every night, a server must be restored on ${DAYS[d]} morning from last night's backup. How many sets must be applied?`,
          `Backup design: one full per week and ${an(kind)} backup each night. Recovery starts on ${DAYS[d]} morning and uses last night's backup. How many sets are required?`
        ]
    return {
      q: stems,
      a: [String(sets), String(diff ? d : 2), String(sets + 1), String(Math.max(1, sets - 1))],
      e: diff
        ? `A differential contains everything changed since the last full backup, so recovery needs only the full backup plus the most recent differential = 2 sets. (An incremental chain would need ${d}.)`
        : `An incremental contains only the changes since the previous backup, so recovery needs the full backup plus every incremental since: the Sunday full plus ${d - 1} nightly incrementals (Monday to ${DAYS[d - 1]}) = ${d} sets. (A differential strategy would need just 2.)`
    }
  }
}
