export interface Response<T> {
  code: number
  message: string | null | unknown
  data: null | Record<string, T>
}

class Bridge {
  private token: string | null = null
  private eventSource: EventSource | null = null
  private BRIDGE_URL: string = 'https://bridge.unielon.com'

  async getToken<T extends Record<string, unknown>>(data: T = {} as T): Promise<string> {
    const res = await fetch(`${this.BRIDGE_URL}/message`, { method: 'POST', body: JSON.stringify({ data: { ...data } }) }).then((res) => res.json())
    const {
      data: { token },
    } = res
    return token
  }

  async connect<T extends Record<string, unknown>>(data: T = {} as T, callback?: (data: string) => void): Promise<void> {
    const currentToken = await this.getToken({ client: 'pump', ...data })
    this.token = currentToken
    callback && callback(currentToken)

    new Promise((resolve, reject) => {
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
            if (res?.data && res?.code === 200) {
              resolve(res?.data)
            }
          }
        } catch (error) {
          reject(error)
        }
      }

      this.eventSource.onerror = (error) => {
        reject(error)
        clearTimeout(timer)
        this.eventSource?.close()
      }

      this.eventSource.onopen = (open: any) => {
        console.log(`connect open::`, open)
      }
    })
  }
}

export const bridge = new Bridge()
