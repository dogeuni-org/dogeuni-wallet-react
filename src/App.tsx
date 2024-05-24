import { useWallet } from "./provider"
import { useState } from "react"

function SendItem(props: any) {
  const { onSubmit, title } = props
  const [params, setParams] = useState<string>("")

  return (
    <div style={{ margin: "0 90px" }}>
      <div>
        <div>{title}:</div>
        <textarea style={{ width: "100%" }} cols={12} value={params} onChange={(e) => setParams(e.target.value)} />
      </div>
      <div>
        <button onClick={() => onSubmit(params)}>Send {title}</button>
      </div>
      <div>---------------------------------------------------------------------------</div>
    </div>
  )
}

function Send() {
  const { sendBox, sendInscribe, sendExchange, sendTransfer, sendSwap, sendNft } = useWallet()
  return (
    <div style={{ fontSize: 12 }}>
      <SendItem onSubmit={sendInscribe} title="sendInscribe" />
      <SendItem onSubmit={sendExchange} title="sendExchange" />
      <SendItem onSubmit={sendSwap} title="sendSwap" />
      <SendItem onSubmit={sendTransfer} title="sendTransfer" />
      <SendItem onSubmit={sendBox} title="sendBox" />
      <SendItem onSubmit={sendNft} title="sendNfts" />
    </div>
  )
}

function App() {
  const { connect, address, network, signMessage } = useWallet()
  const [message, setMessage] = useState<any>(null)

  const singMsg = async (msg: string) => {
    const res = await signMessage(msg)
    setMessage(res)
  }

  return (
    <div style={{ fontSize: 12 }}>
      <div style={{ display: "flex", gap: "10px", alignContent: "center", justifyContent: "space-between" }}>
        <button onClick={() => connect && connect()}>{address ? address : "Connect Wallet"}</button>
        <div>{network}</div>
      </div>
      <br />
      <div>
        <button onClick={() => singMsg("hello unielon wallet")}>Sign Message</button>
        <div>{message}</div>
        <div>---------------------------------------------------------------------------</div>
      </div>
      <Send />
    </div>
  )
}

export default App
