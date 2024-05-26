enum InscribeOp {
  DEPLOY = 'deploy',
  MINT = 'mint',
}

// sendDogecoin = async (toAddress: string, satoshis?: number,
// for inscribe mint & deoply
export type InscribeType = {
  p: string
  op: InscribeOp
  tick: string
  max?: string
  lim?: string
}

enum SwapOp {
  WITHDRAW = 'withdraw',
  DEPOSIT = 'deposit',
  SWAP = 'swap',
}

// for swap & pools create & remove
export type SwapType = {
  p: 'wdoge' | 'drc-20'
  op: SwapOp
  tick: string
  amt: string
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

export type RunActionType = InscribeType | TransferType | NftType | BoxType | SwapType | ExchangeType | StakeType

export type BalanceType = {
  confirmed: string
  unconfirmed: string
  total: string
}

export type WalletInfoType = {
  address: string | null
  publicKey?: string | null | undefined
  balance: BalanceType
  network: string | null
  account: string[]
}

export type WalletStateType = {
  installed?: boolean
  initialize?: boolean
  connected?: boolean
  sendLoading?: boolean
  connectLoading?: boolean
  loading?: boolean
  sendError?: string
  drc20?: any[]
  orders?: any[]
  dogecoinBalance?: string | null
  address?: string | null
  publicKey?: string | null | undefined
  balance?: BalanceType
  network?: string | null
  account?: string[]
}

export type ActionType = {
  type: string
  payload: WalletStateType
}

export type WalletResultType = {
  tx_hash?: string
  fee_address?: string
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
  sendTransaction: (run: (params: RunActionType) => Promise<WalletResultType | null>, params: RunActionType) => void
  getBalance: () => Promise<any>
  networkChange: (network: string) => void
  accountChange: (accounts: string[]) => void
  signMessage: (msg: string) => Promise<string | null>
  disconnect: () => void
}

export type GlobalState = WalletStateType & WalletActionType
