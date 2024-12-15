import BigNumber from 'bignumber.js'

export const drcToDec = (drc: number | string | undefined | null | '', decimal: number = 8) => {
  if (!drc) return ''
  return new BigNumber(drc).div(Math.pow(10, decimal)).decimalPlaces(decimal, BigNumber.ROUND_DOWN).toFormat()
}

export const decToDrc = (drc: number | string | undefined | null | '', decimal: number = 8) => {
  if (!drc) return ''
  return new BigNumber(drc).multipliedBy(Math.pow(10, decimal)).decimalPlaces(0, BigNumber.ROUND_DOWN).toString()
}

export const valueFormat = (value: string, decimal: number = 8) => {
  if (!value) return '0'
  return new BigNumber(value).dividedBy(Math.pow(10, decimal)).toString()
}

export const tickView = (tick: string | null | undefined) => {
  if (!tick) return ''
  const tickName = tick && tick.toUpperCase().includes('(WRAPPED-') ? tick.split('(WRAPPED-')[0] : tick
  return tickName
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
