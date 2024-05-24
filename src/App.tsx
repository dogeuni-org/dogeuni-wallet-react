import { useWallet } from "./provider"
import { useState } from "react"
import "./App.css"

function SendItem(props: any) {
  const { onSubmit, title } = props
  const [params, setParams] = useState<string>("")
  const { address } = useWallet()
  return (
    <div style={{ margin: "0 90px", borderBottom: "1px solid #eee", padding: "20px 0" }}>
      <div>
        <div>
          {title}:{address}
        </div>
        <textarea placeholder="This is send to wallet params..." style={{ width: "100%", color: "blue", padding: 6 }} cols={12} value={params} onChange={(e) => setParams(e.target.value)} />
      </div>
      <div>
        <button onClick={() => onSubmit(params)}>Send {title}</button>
      </div>
    </div>
  )
}

function Send() {
  const { sendBox, sendInscribe, sendExchange, sendTransfer, sendSwap, sendNft, address } = useWallet()
  return (
    <div style={{ fontSize: 12 }}>
      <div>{address}</div>
      <SendItem key={1} onSubmit={sendInscribe} title="sendInscribe" />
      <SendItem key={2} onSubmit={sendExchange} title="sendExchange" />
      <SendItem key={3} onSubmit={sendSwap} title="sendSwap" />
      <SendItem key={4} onSubmit={sendTransfer} title="sendTransfer" />
      <SendItem key={5} onSubmit={sendBox} title="sendBox" />
      <SendItem key={22} onSubmit={sendNft} title="sendNfts" />
    </div>
  )
}

function App() {
  const { connect, address, network, signMessage, balance, connected } = useWallet()
  const [message, setMessage] = useState<any>(null)

  const singMsg = async (msg: string) => {
    const res = await signMessage(msg)
    setMessage(res)
  }

  return (
    <div style={{ fontSize: 12 }}>
      <div style={{ display: "flex", gap: "10px", alignContent: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <h1>wallet</h1>
          <div>{connected ? "connected" : "no connected..."}</div>
          <button onClick={() => connect && connect()}>{address ? address : "Connect Wallet"}</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div>{network}</div>-<div>{balance?.confirmed}</div>
          <button onClick={() => singMsg("hello unielon wallet")}>Sign Message</button>
        </div>
      </div>
      <br />
      {/* <div>SingMessage: {message}</div> */}
      <Send />
    </div>
  )
}

export default App
