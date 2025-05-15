import { useCallback, useState, useEffect } from 'react'

function isBrowserEnvironment(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  return isBrowserEnvironment() ? useStorage(key, defaultValue, window.localStorage) : [defaultValue as T, () => {}, () => {}]
}

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  return isBrowserEnvironment() ? useStorage(key, defaultValue, window.sessionStorage) : [defaultValue as T, () => {}, () => {}]
}

function useStorage<T>(key: string, defaultValue: T | (() => T), storageObject: Storage): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = storageObject.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)
    if (typeof defaultValue === 'function') {
      return (defaultValue as () => T)()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined as unknown as T)
  }, [])

  return [value, setValue, remove]
}
