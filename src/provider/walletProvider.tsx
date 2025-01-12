import React, { createContext, useReducer, useContext, useEffect, useRef, Fragment } from 'react'
declare global {
  interface Window {
    unielon?: any
  }
}

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
  PumpType,
} from './types'
import { useBlocknumber, useDogePrice, useLocalStorage } from '../hooks'
export const currencyList = [
  { name: 'USD', symbol: '$' },
  { name: 'CNY', symbol: '¥' },
  { name: 'JPY', symbol: '¥' },
  { name: 'KRW', symbol: '₩' },
  { name: 'EUR', symbol: '€' },
  { name: 'GBP', symbol: '£' },
  { name: 'RUB', symbol: '₽' },
  { name: 'TRY', symbol: '₺' },
  { name: 'VND', symbol: '₫' },
  { name: 'IDR', symbol: 'Rp' },
  { name: 'PHP', symbol: '₱' },
  { name: 'INR', symbol: '₹' },
  { name: 'ARS', symbol: '$' },
  { name: 'SAR', symbol: '﷼' },
  { name: 'AED', symbol: 'د.إ' },
  { name: 'IQD', symbol: 'ع.د' },
  { name: 'BND', symbol: '$' },
  { name: 'LAK', symbol: '₭' },
  { name: 'NPR', symbol: '₨' },
  { name: 'PKR', symbol: '₨' },
  { name: 'SGD', symbol: '$' },
  { name: 'MMK', symbol: 'K' },
  { name: 'MNT', symbol: '₮' },
  { name: 'COP', symbol: '$' },
  { name: 'CLP', symbol: '$' },
  { name: 'VES', symbol: 'Bs.' },
  { name: 'MXN', symbol: '$' },
  { name: 'BRL', symbol: 'R$' },
  { name: 'PEN', symbol: 'S/.' },
  { name: 'HNL', symbol: 'L' },
  { name: 'UYU', symbol: '$' },
  { name: 'CHF', symbol: 'CHF' },
  { name: 'UAH', symbol: '₴' },
  { name: 'AUD', symbol: '$' },
  { name: 'NZD', symbol: '$' },
  { name: 'CAD', symbol: '$' },
  { name: 'ZAR', symbol: 'R' },
  { name: 'ILS', symbol: '₪' },
  { name: 'TWD', symbol: 'NT$' },
  { name: 'HKD', symbol: 'HK$' },
]
export const initialState: WalletStateType = {
  address: null,
  balance: {
    confirmed: null,
    unconfirmed: null,
    total: null,
  },
  network: null,
  account: [],
  sendLoading: false,
  connectLoading: false,
  loading: false,
  sendError: '',
  connected: false,
  publicKey: null,
  currency: 'usd',
  walletLoading: false,
  currentCurrency: { name: 'USD', symbol: '$' },
  currencyList,
}

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
  const wallet = window?.unielon
  if (!wallet) {
    throw new Error('🐶 Unielon wallet not installed...')
  } else {
    const account = await wallet.getAccounts()
    const publicKey = await wallet.getPublicKey()
    const balance: BalanceType = await wallet.getBalance()
    const network = await wallet.getNetwork()
    const [address] = account
    console.log('💰 Wallet Account Info::Result ===', { account, address, publicKey, balance, network })
    return { account, address, publicKey, balance, network, dogecoinBalance: balance?.confirmed, connected: !!address }
  }
}

export const walletAction = (dispatch: React.Dispatch<ActionType>): WalletActionType => {
  const wallet = window?.unielon
  const { sendBox, createSwap, sendDogecoin, sendTrade, sendNft, createLp, createPump } = wallet || {}
  function setState(payload: WalletStateType) {
    dispatch({
      type: 'SET_STATE',
      payload,
    })
  }
  async function sendTransaction(run: (params: RunActionType) => Promise<WalletResultType | null>, params: RunActionType) {
    const wallet = window?.unielon
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
    const wallet = window?.unielon
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
    currencyChange: async (currency: string, cb: (v: string) => void) => {
      currency = currency.toLowerCase()
      setState({ currency, currentCurrency: currencyList.find((item) => item.name === currency.toUpperCase()) })
      cb(currency)
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
    sendPump: async (params: PumpType[]) => {
      return await sendTransaction(createPump, params)
    },
  }
}

export const UnielonWalletContext = createContext<GlobalState>(initialState as GlobalState)

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<WalletStateType, ActionType>>(walletReducer, initialState)
  const action = walletAction(dispatch)
  const { uniBlock, dogeBlock, getBlockNumber } = useBlocknumber()
  const { price, fee, getPrice, initPriceFee, getFee } = useDogePrice()
  const [currency, setCurrency] = useLocalStorage<{ currency: string; time: number }>('currency', { currency: 'usd', time: new Date().getTime() })
  const initRef = useRef<boolean | undefined>(undefined)
  const { setState, accountChange, networkChange } = action as WalletActionType
  const { connected } = state

  if (typeof window === 'undefined' || !window?.unielon) {
    return <Fragment>{children}</Fragment>
  }

  const wallet = window?.unielon

  const initWallet = async () => {
    getBlockNumber()
    initPriceFee()
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
    if (!initRef.current) {
      initRef.current = true
      initWallet()
      getPrice(currency?.currency)
    }
    return () => {
      connected && wallet && wallet.removeListener('accountsChanged', accountChange)
      connected && wallet && wallet.removeListener('networkChanged', networkChange)
    }
  }, [])

  useEffect(() => {
    if (initRef.current && state.currency && state.currency !== currency?.currency) {
      getPrice(state.currency)
      setCurrency({ currency: state.currency, time: new Date().getTime() })
    }
  }, [state.currency])

  const value: GlobalState = { ...state, ...action, setState, getBlockNumber, uniBlock, dogeBlock, price, fee, getFee, getPrice, initPriceFee }
  return <UnielonWalletContext.Provider value={value}>{children}</UnielonWalletContext.Provider>
}

export const useWallet = () => {
  const context = useContext(UnielonWalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
