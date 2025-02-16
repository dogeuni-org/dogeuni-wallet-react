import BigNumber from 'bignumber.js'

export const drcToDec = (drc: number | string | undefined | null | '', places?: number, decimal?: number) => {
  if (!drc) return ''
  return new BigNumber(drc)
    .dividedBy(Math.pow(10, decimal || 8))
    .decimalPlaces(decimal || 8, BigNumber.ROUND_DOWN)
    .toFormat(places || 0)
}

export const drcToView = (drc: number | string | undefined | null | '', des?: number, decimal?: number) => {
  if (!drc) return ''
  return new BigNumber(drc)
    .dividedBy(Math.pow(10, decimal || 8))
    .decimalPlaces(decimal || 8, BigNumber.ROUND_DOWN)
    .toFormat(des || 4)
}

export const amtToView = (value: string | number, decimal?: number, len?: number): string => {
  if (!value) return '0.0000'
  const bn = new BigNumber(value).dividedBy(Math.pow(10, len || 8))
  const d = decimal || 4
  if (bn.isLessThan(1000)) {
    return bn.toFormat()
  } else if (bn.isLessThan(1e6)) {
    return `${bn.dividedBy(1e3).toFormat(d)}K`
  } else if (bn.isLessThan(1e9)) {
    return `${bn.dividedBy(1e6).toFormat(d)}M`
  } else if (bn.isLessThan(1e12)) {
    return `${bn.dividedBy(1e9).toFormat(d)}B`
  } else {
    return `${bn.dividedBy(1e12).toFormat(d)}T`
  }
}

export const decToDrc = (drc: number | string | undefined | null | '', decimal: number = 8) => {
  if (!drc) return ''
  return new BigNumber(drc).multipliedBy(Math.pow(10, decimal)).integerValue(BigNumber.ROUND_DOWN).toString()
}

export const valueFormat = (value: string | number, decimal: number = 8) => {
  if (!value) return '0'
  return new BigNumber(value).dividedBy(Math.pow(10, decimal)).toString()
}

export const getTickName = (tick: string | null | undefined, doge: 0 | 1 = 1) => {
  if (!tick) return ''
  const tickName = tick && tick.toUpperCase().includes('(WRAPPED-') ? tick.split('(WRAPPED-')[0] : tick
  return tickName === 'WDOGE' ? (doge === 1 ? 'DOGE' : 'WDOGE') : tickName
}

export const currencyValue = (value: string | number, price: string | number, decimal?: number, pe?: number): string => {
  if (+value === 0 || +price === 0 || !value || !price) return '0.0000'
  pe = pe || 4
  decimal = decimal || 8
  return new BigNumber(value).multipliedBy(price).div(Math.pow(10, decimal)).decimalPlaces(pe, BigNumber.ROUND_DOWN).toFormat()
}

/*
 * @param {Array} list
 * @param {string} p
 * @return {Array}
 * @examples
 * getOrderItemStatus({wdoge_tx_block:'0x1234567890abcdef1234567890abcdef12345678', tx_hash: '0x1234567890abcdef1234567890abcdef12345678', block_number: 123456}, 'deposit')
 */

export const getOrderItemStatus = (item: any, p: string): { status: string } => {
  let status = 'unconfirmed'
  const { tx_hash, block_number } = item
  const txHash = item[`${p}_tx_hash`]
  const txBlock = item[`${p}_tx_block`]
  const txBlockNumber = item[`${p}_tx_block_number`]
  if (tx_hash || txHash) status = 'pending'
  if (txBlock && (txBlockNumber || block_number)) status = 'completed'
  return { status }
}

/*
 * @param {Array} list
 * @param {string} p
 * @return {Array}
 * @example
 * getOrderListStatus([{tx_hash: '0x1234567890abcdef1234567890abcdef12345678', block_number: 123456}], 'deposit')
 * // => [{tx_hash: '0x1234567890abcdef1234567890abcdef12345678', block_number: 123456, status: 'pending'}]
 */
export const getOrderListStatus = (list: [], p: string): any[] => {
  return list.map((item: { [k: string]: any }) => ({ ...item, ...getOrderItemStatus(item, p) }))
}

/*
 * @param {string} address
 * @return {string}
 * @example
 * formatAddress('0x1234567890abcdef1234567890abcdef12345678')
 * // => '0x123456...12345678'
 */
export const formatAddress = (address: string) => {
  if (!address) return ''
  return address.slice(0, 6) + '...' + address.slice(-6)
}

/*
 * @param {string} amt
 * @param {number} len
 * @param {number} decimal
 * @return {string}
 * @example
 * amtToFormat('12345678901234567890', 8, 8)
 * // => '123,456.78901234'
 */
export const amtToFormat = (amt: string | number, len?: number, decimal?: number) => {
  if (!amt) return '0'
  return new BigNumber(new BigNumber(amt).dividedBy(Math.pow(10, decimal || 8)).toFixed(len || 8)).toFormat()
}

/*

*/
export const formatAmount = (amount: number | string | null | undefined, precision: number, decimal?: number) => {
  if (!amount) return ''
  decimal = decimal ?? 1
  const bigAmount = new BigNumber(amount).dividedBy(Math.pow(10, precision ?? 8))
  const divs = (s: number) => bigAmount.div(s).decimalPlaces(decimal, BigNumber.ROUND_DOWN).toFormat()
  if (bigAmount.isGreaterThanOrEqualTo(1e9)) {
    // B for billions
    return `${divs(1e9)}B` // bigAmount.div(1e9).toFixed(1) + 'B';
  } else if (bigAmount.isGreaterThanOrEqualTo(1e6)) {
    // M for millions
    return `${divs(1e6)}M`
  } else if (bigAmount.isGreaterThanOrEqualTo(1e3)) {
    // K for thousands
    return `${divs(1e3)}K`
  }
  return bigAmount.decimalPlaces(decimal, BigNumber.ROUND_DOWN).toFormat() // Return as is if smaller than 1000
}
