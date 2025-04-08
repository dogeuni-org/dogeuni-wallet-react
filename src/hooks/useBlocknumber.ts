import { useState, useCallback } from 'react'

export interface BlockDataType {
  index_height: number | null
  chain_height: number | null
}

export interface BlockNumberType {
  uniBlock: number | null
  dogeBlock: number | null
  getBlockNumber: () => Promise<BlockDataType | undefined>
}

export function useBlocknumber(): BlockNumberType {
  const [uniBlock, setUniBlock] = useState<number>(0)
  const [dogeBlock, setDogeBlock] = useState<number>(0)
  const DOGEUNI_API = import.meta.env.VITE_API_DOGEUNI_URL
  const getBlockNumber = useCallback(async (): Promise<BlockDataType | undefined> => {
    try {
      const res = await fetch(`${DOGEUNI_API}/v4/info/blocknumber`, { method: 'POST', body: JSON.stringify({}), headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      const { index_height, chain_height } = data?.data || {}
      setUniBlock(index_height)
      setDogeBlock(chain_height)
      return { index_height, chain_height }
    } catch (error) {
      console.error('Failed to fetch block numbers:', error)
      return { index_height: null, chain_height: null }
    }
  }, [])

  return { uniBlock, dogeBlock, getBlockNumber }
}
