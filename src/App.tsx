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
  const { sendBox, sendInscribe, sendExchange, sendTransfer, sendSwap, sendNft, address } = useWallet()
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
  const { connect, address, network, signMessage, balance, connected, disconnect } = useWallet()
  const [message, setMessage] = useState<any>(null)

  const singMsg = async (msg: string) => {
    const res = await signMessage(msg)
    setMessage(res)
  }

  return (
    <div style={{ fontSize: 12 }}>
      <div style={{ display: 'flex', background: '#f8f8f8', gap: '10px', alignContent: 'center', justifyContent: 'space-between', padding: 10 }}>
        <h1 style={{ fontWeight: 800, fontSize: 19, textTransform: 'uppercase' }}>unielon</h1>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 18, fontWeight: 800 }}>{valueFormat(balance?.confirmed!)}</span>
            {/* {connected && <button onClick={() => disconnect()}>disconnect</button>} */}
            <button onClick={() => connect && connect()}>{address ? address : 'Connect Wallet'}</button>
            {/* {message} */}
            {/* <button onClick={() => singMsg('hello unielon wallet')}>Sign Message</button> */}
          </div>
        </div>
      </div>
      <br />
      <SendActions />
    </div>
  )
}

export default App
