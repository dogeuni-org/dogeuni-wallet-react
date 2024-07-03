import React, { createContext, useReducer, useContext, useEffect } from 'react'
import {
  BoxType,
  NftType,
  RunActionType,
  SwapType,
  TransferType,
  ExchangeType,
  StakeType,
  InscribeType,
  WalletActionType,
  WalletResultType,
  WalletStateType,
  ActionType,
  BalanceType,
  GlobalState,
} from './types'

const initialState: WalletStateType = {
  address: null,
  balance: null,
  network: null,
  account: [],
  sendLoading: false,
  connectLoading: false,
  loading: false,
  sendError: '',
  connected: false,
  drc20: [],
  orders: [],
  dogecoinBalance: null,
  publicKey: null,
}
const wallet = (window as any).unielon!

const walletReducer = (state: WalletStateType, action: ActionType) => {
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const getWalletInfo = async (): Promise<WalletStateType> => {
  if (!wallet) {
    throw new Error('🐶 Unielon wallet not installed...')
  } else {
    const account = await wallet.getAccounts()
    const publicKey = await wallet.getPublicKey()
    const balance: BalanceType = await wallet.getBalance()
    const network = await wallet.getNetwork()
    const [address] = account
    console.log('Wallet Account Info::Result ===', { account, address, publicKey, balance, network })
    return { account, address, publicKey, balance, network, dogecoinBalance: balance?.confirmed, connected: !!address }
  }
}

export const walletAction = (dispatch: React.Dispatch<ActionType>): WalletActionType => {
  const wallet = (window as any).unielon
  const { sendBox, createSwap, sendDogecoin, sendTrade, sendNft, createLp } = wallet

  function setState(payload: WalletStateType) {
    dispatch({
      type: 'SET_STATE',
      payload,
    })
  }

  async function sendTransaction(run: (params: RunActionType) => Promise<WalletResultType | null>, params: RunActionType) {
    if (!wallet || !run) return null
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

  async function getBalance() {
    if (wallet) {
      return await wallet.getBalance()
    }
  }

  return {
    setState,
    getBalance,
    sendTransaction,
    networkChange: async (network: string) => {
      const result = await getWalletInfo()
      setState({ ...result, network })
    },
    accountChange: async () => {
      const result = await getWalletInfo()
      setState(result?.address ? result : initialState)
    },
    connect: async () => {
      try {
        setState({ connectLoading: true })
        const result = await wallet.requestAccounts()
        const [address] = result
        const infoWallet = await getWalletInfo()
        setState(infoWallet)
        return address
      } finally {
        setState({ connectLoading: false })
      }
    },
    disconnect: async () => {
      setState(initialState)
    },
    signMessage: async (msg: string): Promise<string | null> => {
      return await wallet.signMessage(msg)
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
  }
}

export const UnielonWalletContext = createContext<GlobalState>(initialState as GlobalState)

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<WalletStateType, ActionType>>(walletReducer, initialState)
  const action = walletAction(dispatch)
  const { setState, accountChange, networkChange } = action as WalletActionType
  const { connected } = state
  const wallet = window.unielon

  const initWallet = async () => {
    if (!wallet) {
      setState({ installed: false, initialize: false })
    } else {
      const result = await getWalletInfo()
      const { address } = result
      setState(address ? { connected: true, ...result } : { connected: false })
      wallet && wallet.on('accountsChanged', accountChange)
      wallet && wallet.on('networkChanged', networkChange)
    }
  }

  useEffect(() => {
    initWallet()
    return () => {
      connected && wallet && wallet.removeListener('accountsChanged', accountChange)
      connected && wallet && wallet.removeListener('networkChanged', networkChange)
    }
  }, [])

  const value: GlobalState = { ...state, ...action }
  return <UnielonWalletContext.Provider value={value}>{children}</UnielonWalletContext.Provider>
}

export const useWallet = () => {
  return useContext(UnielonWalletContext)
}
