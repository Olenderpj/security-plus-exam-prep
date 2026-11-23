// Quantitative risk (5.2): SLE, ALE, control cost-benefit, residual risk. Levels add steps and trade-offs.
import { int, money, pick } from './util.js'

const asset = (r) => ({ av: int(r, 5, 50) * 10000, ef: int(r, 2, 18) * 5 })
const sle = (av, ef) => (av * ef) / 100

export default {
  key: 'ale',
  d: 5,
  o: '5.2',
  levels: [4.5, 5.5, 6.5, 7.5, 8.5, 9.5],
  make(L, r) {
    const { av, ef } = asset(r)
    const SLE = sle(av, ef)
    const n = pick(r, [2, 4, 5, 10]) // one event every n years
    const ALE = SLE / n
    const assetTxt = `a system valued at ${money(av)}`
    if (L < 5) {
      return {
        q: [
          `A risk analyst is assessing ${assetTxt}. A successful ransomware attack would destroy ${ef}% of its value, and such an attack is expected about once every ${n} years. What is the single loss expectancy (SLE)?`,
          `${assetTxt[0].toUpperCase() + assetTxt.slice(1)} would lose ${ef}% of its value in one ransomware incident, which is expected roughly once every ${n} years. What is the SLE?`,
          `For ${assetTxt} with a ${ef}% exposure factor and an expected incident frequency of once every ${n} years, which value is the SLE?`
        ],
        a: [money(SLE), money(av * (1 - ef / 100)), money(ALE), money(SLE * n)],
        e: `SLE = asset value × exposure factor = ${money(av)} × ${ef}% = ${money(SLE)}. ${money(ALE)} is the annualized figure (ALE = SLE × ARO = ${money(SLE)} × 1/${n}); ${money(av * (1 - ef / 100))} is the value that remains after the loss.`
      }
    }
    if (L < 6) {
      return {
        q: [
          `${assetTxt[0].toUpperCase() + assetTxt.slice(1)} would lose ${ef}% of its value in a single outage, and an outage is expected once every ${n} years. What is the annualized loss expectancy (ALE)?`,
          `An outage destroys ${ef}% of the value of ${assetTxt} and happens about once every ${n} years. Calculate the ALE.`,
          `What is the ALE for ${assetTxt} when one incident causes ${ef}% damage and incidents occur roughly once every ${n} years?`
        ],
        a: [money(ALE), money(SLE), money(SLE * n), money(av / n)],
        e: `ARO = 1/${n} per year. SLE = ${money(av)} × ${ef}% = ${money(SLE)}. ALE = SLE × ARO = ${money(SLE)} ÷ ${n} = ${money(ALE)}.`
      }
    }
    if (L < 7) {
      const n2 = pick(r, [4, 5, 10, 20].filter((x) => x > n))
      const gain = SLE / n - SLE / n2
      const cost = Math.max(1000, Math.round((gain * pick(r, [0.3, 0.5, 0.7, 1.2])) / 1000) * 1000)
      const net = gain - cost
      return {
        q: [
          `${assetTxt[0].toUpperCase() + assetTxt.slice(1)} has an exposure factor of ${ef}% and is expected to be hit once every ${n} years. A control costing ${money(cost)} per year would stretch that to once every ${n2} years. What is the net annual benefit of the control?`,
          `A ${money(cost)}-per-year control reduces how often ${assetTxt} (exposure factor ${ef}%) is hit, from once every ${n} years to once every ${n2} years. What is its net annual benefit?`,
          `Given an exposure factor of ${ef}% on ${assetTxt}, calculate the net yearly benefit of a ${money(cost)}/year control that changes the event frequency from 1 per ${n} years to 1 per ${n2} years.`
        ],
        a: [money(net), money(gain), money(SLE / n2 + cost), money(SLE / n - cost)],
        e: `ALE before = ${money(SLE)} ÷ ${n} = ${money(SLE / n)}. ALE after = ${money(SLE)} ÷ ${n2} = ${money(SLE / n2)}. Risk reduction = ${money(gain)}. Net benefit = reduction − annual cost = ${money(gain)} − ${money(cost)} = ${money(net)}. A negative result would mean the control costs more than it saves.`
      }
    }
    if (L < 8) {
      const ef2 = Math.max(5, ef - pick(r, [10, 15, 20]))
      const y = pick(r, [2, 4, 5])
      const purchase = y * int(r, 3, 12) * 1000
      const maint = int(r, 1, 6) * 1000
      const annual = purchase / y + maint
      const SLE2 = sle(av, ef2)
      const gain = (SLE - SLE2) / n
      const net = gain - annual
      return {
        q: [
          `${assetTxt[0].toUpperCase() + assetTxt.slice(1)} is hit about once every ${n} years, currently losing ${ef}% of its value each time. New hardening costing ${money(purchase)} up front (amortized over ${y} years) plus ${money(maint)} per year in maintenance would cut the loss to ${ef2}%. What is the net annual benefit?`,
          `Hardening for ${assetTxt} costs ${money(purchase)} to buy (spread evenly over ${y} years) and ${money(maint)} per year to run, and lowers the exposure factor from ${ef}% to ${ef2}%. Incidents occur once every ${n} years. What is the net annual benefit?`,
          `A control with a ${money(purchase)} purchase price amortized over ${y} years and ${money(maint)} annual upkeep reduces the damage from ${ef}% to ${ef2}% of ${money(av)} per incident (one incident per ${n} years). What is the control's net annual benefit?`
        ],
        a: [money(net), money(gain - purchase - maint), money(gain - maint), money(gain - purchase / y)],
        e: `Annual cost = ${money(purchase)} ÷ ${y} + ${money(maint)} = ${money(annual)}. SLE before = ${money(SLE)}, after = ${money(SLE2)}, so ALE falls by (${money(SLE)} − ${money(SLE2)}) ÷ ${n} = ${money(gain)}. Net = ${money(gain)} − ${money(annual)} = ${money(net)}. Counting the whole purchase price in one year, or forgetting maintenance or amortization, gives the wrong figures.`
      }
    }
    // Two competing controls
    const n2 = pick(r, [5, 10, 20].filter((x) => x > n))
    const costA = int(r, 2, 9) * 1000
    const ef2 = Math.max(5, ef - pick(r, [10, 15, 20]))
    const costB = int(r, 2, 9) * 1000
    const gainA = SLE / n - SLE / n2
    const gainB = (SLE - sle(av, ef2)) / n
    const netA = gainA - costA
    const netB = gainB - costB
    if (netA === netB) return null
    const winner = netA > netB ? 'A' : 'B'
    const loser = winner === 'A' ? 'B' : 'A'
    const diff = Math.abs(netA - netB)
    const gross = Math.abs(gainA - gainB)
    if (L < 9) {
      return {
        q: [
          `${assetTxt[0].toUpperCase() + assetTxt.slice(1)} is hit once every ${n} years with ${ef}% damage. Control A (${money(costA)}/year) makes incidents happen once every ${n2} years. Control B (${money(costB)}/year) keeps the frequency but cuts the damage to ${ef2}%. Only one can be bought. Which gives the greater net annual benefit, and by how much?`,
          `Choose between two controls for ${assetTxt}: A costs ${money(costA)} a year and stretches the incident interval from ${n} to ${n2} years; B costs ${money(costB)} a year and reduces damage per incident from ${ef}% to ${ef2}%. Which is better, and by what margin?`,
          `Control A (${money(costA)}/yr) lowers the frequency of ${ef}%-damage incidents on ${assetTxt} from 1 per ${n} years to 1 per ${n2}; Control B (${money(costB)}/yr) lowers the damage to ${ef2}%. Which has the higher net annual benefit, and by how much?`
        ],
        a: [`Control ${winner}, by ${money(diff)}`, `Control ${loser}, by ${money(diff)}`, `Control ${winner}, by ${money(gross)}`, `Control ${loser}, by ${money(gross)}`],
        e: `Control A: reduction ${money(SLE / n)} − ${money(SLE / n2)} = ${money(gainA)}; net ${money(gainA)} − ${money(costA)} = ${money(netA)}. Control B: reduction (${money(SLE)} − ${money(sle(av, ef2))}) ÷ ${n} = ${money(gainB)}; net ${money(gainB)} − ${money(costB)} = ${money(netB)}. Control ${winner} wins by ${money(diff)}. Comparing only the gross risk reduction (${money(gross)}) ignores what each control costs.`
      }
    }
    const resid = (sle(av, ef2) / n2)
    return {
      q: [
        `${assetTxt[0].toUpperCase() + assetTxt.slice(1)} suffers ${ef}% damage once every ${n} years. The company buys both Control A (incidents drop to once every ${n2} years) and Control B (damage drops to ${ef2}%). What is the residual ALE?`,
        `Both controls are deployed on ${assetTxt}: one stretches the incident interval from ${n} to ${n2} years and the other cuts damage per incident from ${ef}% to ${ef2}%. What annualized loss remains (residual ALE)?`,
        `After combining a control that changes the event rate from 1/${n} to 1/${n2} per year with one that lowers exposure from ${ef}% to ${ef2}% on ${assetTxt}, what is the residual ALE?`
      ],
      a: [money(resid), money(SLE / n2), money(sle(av, ef2) / n), money(SLE / n)],
      e: `Residual ALE = new SLE × new ARO = (${money(av)} × ${ef2}%) × 1/${n2} = ${money(sle(av, ef2))} ÷ ${n2} = ${money(resid)}. Applying only one control leaves ${money(SLE / n2)} (frequency only) or ${money(sle(av, ef2) / n)} (damage only); ${money(SLE / n)} is the original ALE.`
    }
  }
}
