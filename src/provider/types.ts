export type InscribeType = {
  p: string
  op: string
  amt: string
}

export type SwapType = {
  p: string
  op: string
  amt: string
  to: string
}

export type BoxType = {
  p: string
  op: string
  amt: string
}

export type NftType = {
  p: string
  op: string
  amt: string
}

export type TransferType = {
  p: string
  op: string
  amt: string
  to: string
}

export type ExchangeType = {
  p: string
  op: string
  amt: string
  to: string
}

export type RunActionType = InscribeType | TransferType | NftType | BoxType | SwapType | ExchangeType
