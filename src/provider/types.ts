export enum InscribeOp {
  DEPLOY = 'deploy',
  MINT = 'mint',
}

// for inscribe mint & deoply
export type InscribeType = {
  p: string
  op: InscribeOp
  tick: string
  max?: string
  lim?: string
}

export enum SwapOp {
  WITHDRAW = 'withdraw',
  DEPOSIT = 'deposit',
  SWAP = 'swap',
}

// for swap & pools create & remove
export type SwapType = {
  p: 'wdoge' | 'drc-20' | 'pair-v1' | 'pair-v2' | string
  op: 'swap' | 'trade' | 'create' | 'remove' | 'add' | string
  tick?: string
  amt?: string
  pair_id?: string
  amt0?: string
  amt1?: string
  amt0_min?: string
  amt1_min?: string
  doge?: 0 | 1 | number
  tick0_id?: string
  tick1_id?: string
  tick0?: string
  tick1?: string
  liquidity?: string
}

// for nfts mint & deploy
export type NftType = {
  p: string
  op: string
  amt: string
}

// for drc20 transfer
export type TransferType = {
  p: string
  op: string
  amt: string
  to: string
}

// for market
export type ExchangeType = {
  p: string
  op: string
  amt: string
  to: string
  tick0: string
  tick1: string
}

// for stake
export type StakeType = {
  p: string
  op: string
  amt: string
  tick: string
}

// for box
export type BoxType = {
  p: string
  op: InscribeOp
  amt0: string
  amt1: string
  liqblock: number
  tick: string
}

export type DogeType = {
  toAddress: string
  sendAmount: number
}

export type RunActionType = InscribeType | TransferType | NftType | BoxType | SwapType | ExchangeType | StakeType | PumpType[] | unknown

export type BalanceType = {
  confirmed: string | null
  unconfirmed: string | null
  total: string | null
}

export type WalletInfoType = {
  address: string | null
  publicKey?: string | null | undefined
  balance: BalanceType
  network: string | null
  account: string[]
}

export interface CurrencyItemType {
  name: string
  symbol: string
}

export interface UserInfoType {
  bio?: string | null
  profile_photo?: string | null
  username?: string | null
  address?: string | null
}

export type WalletStateType = {
  address?: string | null
  balance?: BalanceType | null
  installed?: boolean
  initialize?: boolean
  connected?: boolean
  sendLoading?: boolean
  connectLoading?: boolean
  sendError?: string | null | Record<string, any> | null | undefined
  dogecoinBalance?: string | null
  publicKey?: string | null | undefined
  network?: string | null
  account?: string[]
  currency?: string
  currentCurrency?: CurrencyItemType
  currencyList?: CurrencyItemType[]
  userInfo?: UserInfoType
}

import { BlockNumberType } from '../hooks/useBlocknumber'

import { DogePriceType } from '../hooks/useDogePrice'

export type ActionType = {
  type: string
  payload: WalletStateType
}

export type WalletResultType = {
  tx_hash?: string
  fee_address?: string
  code?: number
  data?: Record<string, any> | null | undefined
  msg?: string | null | undefined
}

export interface PumpType {
  p?: 'pump'
  op?: 'deploy' | 'trade' | 'swap' | 'add' | 'remove'
  tick?: string
  amt?: string
  symbol?: string
  name?: string
  doge?: 0 | 1
  pair_id?: string
  tick0_id?: string
  tick1_id?: string
  amt0?: string
  amt1_min?: string
}

export type WalletActionType = {
  setState: (payload: WalletStateType) => void
  connect: () => void
  sendInscribe: (params: InscribeType) => Promise<WalletResultType | null>
  sendTransfer: (params: TransferType) => Promise<WalletResultType | null>
  sendExchange: (params: ExchangeType) => Promise<WalletResultType | null>
  sendSwap: (params: SwapType) => Promise<WalletResultType | null>
  sendBox: (params: BoxType) => Promise<WalletResultType | null>
  sendNft: (params: NftType) => Promise<WalletResultType | null>
  sendStake: (params: StakeType) => Promise<WalletResultType | null>
  sendPump: (params: PumpType[]) => Promise<WalletResultType | null>
  sendDoge: (params: DogeType[]) => Promise<WalletResultType | null>
  sendTransaction: (run: (params: RunActionType) => Promise<WalletResultType | null>, params: RunActionType) => void
  getBalance: () => Promise<any>
  networkChange: (network: string) => void
  accountChange: (accounts: string[]) => void
  signMessage: (msg: string) => Promise<string | null>
  disconnect: () => void
  currencyChange: (currency: string, callback: (currency: string) => void) => void
}

export type GlobalState = WalletStateType & WalletActionType & DogePriceType & BlockNumberType
