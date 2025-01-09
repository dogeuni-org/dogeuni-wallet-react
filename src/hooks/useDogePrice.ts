import { useState } from 'react'

export interface DogePriceType {
  initPriceFee: () => void
  price: number
  fee: DogeFeeType
  getFee: () => void
  getPrice: (c?: string) => void
}
export interface DogeFeeType {
  low: string | number
  hight: string | number
  medium: string | number
}

export function useDogePrice(): DogePriceType {
  const [fee, setFee] = useState<DogeFeeType>({ low: 0, hight: 0, medium: 0 })
  const [price, setPrice] = useState(0)

  const DOGE_PRICE_COINGECKO = (coin: string) => `https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=${coin}`
  const DOGE_PRICE_CRYPTO = (coin: string) => `https://min-api.cryptocompare.com/data/price?fsym=DOGE&tsyms=${coin}`
  const RATE_FEE_URL = 'https://api.blockcypher.com/v1/doge/main'

  const fetchRes = async (url: string, config?: RequestInit) => {
    try {
      const result = await fetch(url, config || {}).then((res) => res.json())
      return result
    } catch (error) {
      return error
    }
  }

  const getOtherPrice = async (c: string) => {
    try {
      const res = await fetchRes(DOGE_PRICE_CRYPTO(c))
      const result = res?.[c]
      setPrice(result)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  const getPrice = async (c?: string) => {
    c = c || 'usd'
    c = c.toUpperCase()
    try {
      const res = await fetchRes(DOGE_PRICE_COINGECKO(c))
      const { dogecoin } = res || {}
      const result = dogecoin?.[c.toLowerCase()]
      if (result) {
        setPrice(result)
        return result
      } else {
        return await getOtherPrice(c)
      }
    } catch {
      return getOtherPrice(c)
    }
  }

  const getFee = async () => {
    try {
      const abortController = new AbortController()
      const signal = abortController.signal
      const data = await fetchRes(RATE_FEE_URL, { signal })
      const { high_fee_per_kb: hight, low_fee_per_kb: low, medium_fee_per_kb: medium } = data || {}
      const feeList = { low, hight, medium }
      setFee(feeList)
      return feeList
    } catch (error) {
      console.warn(error)
    }
  }

  const initPriceFee = () => {
    getFee()
  }

  return { initPriceFee, price, getFee, fee, getPrice }
}
