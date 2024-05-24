import BigNumber from 'bignumber.js'

export const drcToDecimal = (drc: string, decimal: number = 8) => {
  if (!drc) return '0'
  return new BigNumber(drc).dividedBy(Math.pow(10, decimal)).toString()
}

export const DecimalToDrc = (drc: string, decimal: number = 8) => {
  if (!drc) return '0'
  return new BigNumber(drc).multipliedBy(Math.pow(10, decimal)).toString()
}

export const valueFormat = (value: string, decimal: number = 8) => {
  if (!value) return '0'
  return new BigNumber(value).dividedBy(Math.pow(10, decimal)).toString()
}

export const getOrderStatus = (item: any, p): { status: value } => {
  const { p, op } = item
  let status = 'pending'
  const { tx_hash } = item

  return status
}
