import { useState, useCallback } from 'react'

export interface BlockDataType {
  unielon_height: number | null
  chain_height: number | null
}

export default function useBlocknumber() {
  const [uniBlock, setUniBlock] = useState<number>(0)
  const [dogeBlock, setDogeBlock] = useState<number>(0)

  const getBlockNumber = useCallback(async (): Promise<BlockDataType | undefined> => {
    try {
      const res = await fetch('https://api.unielon.com/v4/info/blocknumber', { method: 'POST', body: JSON.stringify({}), headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      const { unielon_height, chain_height } = data?.data || {}
      setUniBlock(unielon_height)
      setDogeBlock(chain_height)
      return { unielon_height, chain_height }
    } catch (error) {
      console.error('Failed to fetch block numbers:', error)
      return undefined
    }
  }, [])

  return { uniBlock, dogeBlock, getBlockNumber }
}
