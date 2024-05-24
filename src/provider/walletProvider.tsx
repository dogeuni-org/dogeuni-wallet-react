import React, { createContext, useReducer, useContext, useEffect } from "react"
import { BoxType, NftType, RunActionType, SwapType, TransferType, ExchangeType, StakeType } from "./types"

declare global {
  interface Window {
    unielon: any
  }
}

export interface WalletInfoType {
  address: string | null
  publicKey?: string | null | undefined
  balance: any[]
  network: string | null
  addressList: string[]
}

export type WalletStateType = {
  installed?: boolean | false
  initialize?: boolean | false
  connected?: boolean | false
  sendLoading?: boolean | false
  connectLoading?: boolean | false
  loading?: boolean
  sendError?: string
  drc20?: any[]
  orders?: any[]
  dogecoinBalance?: string | null
  address?: string | null
  publicKey?: string | null | undefined
  balance?: any[]
  network?: string | null
  addressList?: string[]
  account?: string[]
}

export type ActionType = {
  type: string
  payload: any
}

export type InscribeType = {
  p: string
  op: string
  amt: string
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
}

export type GlobalState = WalletStateType & WalletActionType

const initialState: WalletStateType = {
  address: null,
  balance: {} as any,
  network: null,
  addressList: [],
  account: [],
  sendLoading: false,
  connectLoading: false,
  loading: false,
  sendError: "",
  installed: false,
  initialize: false,
  connected: false,
  drc20: [],
  orders: [],
  dogecoinBalance: null,
}

const walletReducer = (state: WalletStateType, action: ActionType) => {
  switch (action.type) {
    case "SET_STATE":
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const getWalletInfo = async (): Promise<WalletInfoType> => {
  const wallet = window.unielon
  if (!window.unielon) {
    throw new Error("🐶 Unielon wallet not installed...")
  } else {
    const addressList = await wallet.getAccounts()
    const publicKey = await wallet.getPublicKey()
    const balance = await wallet.getBalance()
    const network = await wallet.getNetwork()
    const [address] = addressList
    console.log("Init::Result ===", { addressList, address, publicKey, balance, network })
    return { addressList, address, publicKey, balance, network }
  }
}

export const walletAction = (state: WalletStateType, dispatch: React.Dispatch<ActionType>): WalletActionType => {
  const wallet = window.unielon
  const { sendBox, createSwap, sendDogecoin, sendTrade, sendNft, createLp } = wallet

  /**
   * Sets the state of the wallet.
   * @param payload - The payload to set the state.
   */
  function setState(payload: WalletStateType) {
    dispatch({
      type: "SET_STATE",
      payload,
    })
  }

  /**
   * Sends a transaction using the provided run function and parameters.
   * @param run - The function to run the transaction.
   * @param params - The parameters for the transaction.
   * @returns The result of the transaction or null if an error occurred.
   */
  async function sendTransaction(run: (params: RunActionType) => Promise<WalletResultType | null>, params: RunActionType) {
    if (!window.unielon || !run) return null
    try {
      setState({ loading: true })
      return await run(params)
    } catch (error: any) {
      setState({
        sendError: error.message,
      })
      return null
    } finally {
      setState({ loading: false })
    }
  }

  return {
    setState,
    sendTransaction,
    networkChange: async (network: string) => {
      setState({ network })
    },
    accountChange: async (accounts: string[]) => {
      setState({ account: accounts, address: accounts[0] })
    },
    connect: async () => {
      try {
        setState({ connectLoading: true })
        const result = await window?.unielon.requestAccounts()
        return result
      } finally {
        setState({ connectLoading: false })
      }
    },
    signMessage: async (msg: string): Promise<string | null> => {
      return await window.unielon.signMessage(msg)
    },
    sendInscribe: async (params: InscribeType) => {
      return await sendTransaction(sendDogecoin, params)
    },
    sendTransfer: async (params: TransferType) => {
      return await sendTransaction(sendDogecoin, params)
    },
    sendExchange: async (params: ExchangeType) => {
      return await sendTransaction(sendTrade, params)
    },
    sendSwap: async (params: SwapType) => {
      return await sendTransaction(createSwap, params)
    },
    sendBox: async (params: BoxType) => {
      return await sendTransaction(sendBox, params)
    },
    sendNft: async (params: NftType) => {
      return await sendTransaction(sendNft, params)
    },
    sendStake: async (params: StakeType) => {
      return await sendTransaction(createLp, params)
    },
    getBalance: async () => {
      return await window.unielon.getBalance()
    },
  }
}

export const UnielonWalletContext = createContext<GlobalState>(initialState as GlobalState)

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<WalletStateType, ActionType>>(walletReducer, initialState)
  const action = walletAction(state, dispatch)
  const { setState, accountChange, networkChange } = action
  const { initialize } = state
  const wallet = (window as any).unielon

  const initWallet = async () => {
    if (!wallet) {
      setState({ installed: false, initialize: false })
    } else {
      const result = await getWalletInfo()
      setState({ installed: true, initialize: true, ...result })
      wallet.on("accountsChanged", accountChange)
      wallet.on("networkChanged", networkChange)
    }
  }

  useEffect(() => {
    initWallet()
    return () => {
      initialize && wallet && wallet.removeListener("accountsChanged", accountChange)
      initialize && wallet && wallet.removeListener("networkChanged", networkChange)
    }
  }, [])

  const value: GlobalState = { ...state, ...action }
  return <UnielonWalletContext.Provider value={value}>{children}</UnielonWalletContext.Provider>
}

export const useWallet = () => {
  return useContext(UnielonWalletContext)
}
