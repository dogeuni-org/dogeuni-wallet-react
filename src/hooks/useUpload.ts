import { useState } from 'react'

export function useUpload() {
  const IPFS_URL: string = import.meta.env.VITE_API_IPFS_URL
  const IPFS_UPLOAD_URL: string = `${import.meta.env.VITE_API_DOGEUNI_URL}/v4/info/ipfs/upload`
  const getUrl = (path: string) => `${IPFS_URL}/ipfs/${path}`
  const [loading, setLoading] = useState(false)

  const upload = async (arg: { file?: File } = {}) => {
    const { file } = arg
    if (!file || loading) return
    const formData = new FormData()
    formData.append('file', file)
    return new Promise(async (res, rej) => {
      try {
        setLoading(true)
        const result = await fetch(IPFS_UPLOAD_URL, {
          method: 'POST',
          body: formData,
        }).then((res) => res.json())
        const { hash } = result || {}
        res(getUrl(hash))
      } catch (e) {
        alert(`upload files size max is 1mb`)
        rej(e)
      } finally {
        setLoading(false)
      }
    })
  }
  return { upload, getUrl, loading }
}
