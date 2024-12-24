import { useWallet } from './provider'
import { useState } from 'react'
import './App.css'
import { valueFormat } from './utils'

function SendItem(props: any) {
  const { onSubmit, title, eg } = props
  const [params, setParams] = useState<string>('')
  const [result, setResult] = useState<any>(null)

  const submit = async () => {
    const res = await onSubmit(JSON.parse(params))
    setResult(res)
  }

  return (
    <div style={{ borderBottom: '1px solid #eee', padding: '20px 0' }}>
      <div>
        <div style={{ padding: '10px 0' }}>
          <code>{title}@example:</code>
          <div>
            <code>{eg}</code>
          </div>
        </div>
        <textarea placeholder="This is send to wallet params..." style={{ width: '100%', fontSize: 14, padding: 6 }} cols={12} value={params} onChange={(e) => setParams(e.target.value)} />
      </div>
      <div>
        <button onClick={submit}>Send {title}</button>
      </div>
      <div>result:{result}</div>
    </div>
  )
}

function SendActions() {
  const { sendBox, sendInscribe, sendExchange, sendTransfer, sendSwap, sendNft, address, setState } = useWallet()
  return (
    <div style={{ fontSize: 12, width: 800, margin: '0 auto' }}>
      <div>{address}</div>
      <SendItem key={1} onSubmit={sendInscribe} eg={'{"p":"drc20","op":"mint","amt":100000000,"tick":"THANKS","to_address":""}'} title="sendInscribe" />
      <SendItem key={2} onSubmit={sendExchange} title="sendExchange" />
      <SendItem key={3} onSubmit={sendSwap} title="sendSwap" />
      <SendItem key={4} onSubmit={sendTransfer} title="sendTransfer" />
      <SendItem key={5} onSubmit={sendBox} title="sendBox" />
      <SendItem key={22} onSubmit={sendNft} title="sendNfts" />
    </div>
  )
}

function App() {
  // const { connect, address, network, signMessage, balance, connected, disconnect } = useWallet()
  const { connect, address, signMessage, balance, dogeBlock, uniBlock, price, fee, currency, setState, getPrice } = useWallet()
  const [message, setMessage] = useState<any>(null)

  const singMsg = async (msg: string) => {
    const res = await signMessage(msg)
    setMessage(res)
  }

  return (
    <div style={{ fontSize: 12 }}>
      <div style={{ display: 'flex', background: '#f8f8f8', gap: '10px', alignContent: 'center', justifyContent: 'space-between', padding: 10 }}>
        <div>
          <h1 style={{ fontWeight: 900, margin: 0, padding: 0, fontSize: 14, textTransform: 'uppercase' }}>DOGEUNI.WALLET</h1>
          <div style={{ textTransform: 'uppercase' }}>
            <p style={{ fontSize: '0.8em' }}>
              BLOCK_HEIGHT:DOGE{dogeBlock}-DOGEUNI:{uniBlock}
            </p>
            <p style={{ fontSize: '0.8em' }}>
              FEE:low:{valueFormat(fee?.low)} medium:{valueFormat(fee?.medium)} hight:{valueFormat(fee?.hight)}
            </p>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'column' }}>
              <p>
                <span style={{ fontSize: 16, fontWeight: 800 }}>{valueFormat(balance?.confirmed || '0')}</span>
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <p>
                  1DOGE={price}
                  {currency}
                </p>
                <select
                  onChange={(e) => {
                    console.log(e.target.value)
                    setState({ currency: e.target.value })
                    // setState({ currency: e.target.value })
                  }}
                  value={currency}
                >
                  {[
                    'USD',
                    'CNY',
                    'JPY',
                    'KRW',
                    'EUR',
                    'GBP',
                    'RUB',
                    'TRY',
                    'VND',
                    'IDR',
                    'PHP',
                    'INR',
                    'ARS',
                    'SAR',
                    'AED',
                    'IQD',
                    'BND',
                    'LAK',
                    'NPR',
                    'PKR',
                    'SGD',
                    'MMK',
                    'MNT',
                    'COP',
                    'CLP',
                    'VES',
                    'MXN',
                    'BRL',
                    'PEN',
                    'HNL',
                    'UYU',
                    'CHF',
                    'UAH',
                    'AUD',
                    'NZD',
                    'CAD',
                    'ZAR',
                    'ILS',
                    'TWD',
                    'HKD',
                  ].map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* {connected && <button onClick={() => disconnect()}>disconnect</button>} */}
            <button onClick={() => connect && connect()}>{address ? address : 'Connect Wallet'}</button>
            {/* {message} */}
            {/* <button onClick={() => singMsg('hello unielon wallet')}>Sign Message</button> */}
          </div>
        </div>
      </div>
      <br />
      <div style={{ display: 'flex', alignItems: 'center', width: 800, margin: '0 auto', gap: 20 }}>
        <button onClick={() => singMsg('hello unielon wallet')}>Sign Message</button>
        {message}
      </div>
      <SendActions />
    </div>
  )
}

export default App
