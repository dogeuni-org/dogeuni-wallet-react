export interface Response<T> {
  code: number
  message: string | null | unknown
  data: null | Record<string, T>
}

interface ConnectType<T> {
  data: Record<string, unknown>
  onConnect?: (data: string) => void
  onOpen?: (data: string) => void
  onMessage: (data: T | any) => void
  onError: (data: Response<unknown>) => void
}

export class Bridge {
  private token: string | null = null
  private eventSource: EventSource | null = null
  private BRIDGE_URL: string = import.meta.env.VITE_API_BRIDGE_URL

  async getToken<T extends Record<string, unknown>>(data: T = {} as T): Promise<string> {
    const res = await fetch(`${this.BRIDGE_URL}/message`, { method: 'POST', body: JSON.stringify({ data: { ...data } }) }).then((res) => res.json())
    const {
      data: { token },
    } = res
    return token
  }

  async connect<T>({ data, onConnect, onOpen, onError, onMessage }: ConnectType<T>) {
    const currentToken = await this.getToken({ client: 'pump', ...data })
    this.token = currentToken
    onConnect && onConnect(currentToken)

    this.eventSource = new EventSource(`${this.BRIDGE_URL}/connect?token=${this.token}`)
    // Close the connection after 1 minute
    const timer = setTimeout(() => {
      this.eventSource && this.eventSource.close()
    }, 1000 * 60)

    this.eventSource.onmessage = (event: any) => {
      console.log(`event.data::`, event)
      try {
        if (event.data && typeof event.data === 'string') {
          const res = JSON.parse(event.data)
          console.log(`event.data::`, res)
          if (res?.data && res?.code === 200) {
            console.log(`event.data::`, res.data)
            onMessage(res?.data)
          }
        }
      } catch (error) {
        onError && onError({ code: 500, message: 'Error parsing event data', data: null })
      }
    }

    this.eventSource.onerror = () => {
      clearTimeout(timer)
      onError && onError({ code: 500, message: 'Error connecting to the server', data: null })
      this.eventSource?.close()
    }

    this.eventSource.onopen = (open: any) => {
      onOpen && onOpen(open)
      console.log(`connect open::`, open)
    }
  }
}

export const bridge = new Bridge()
