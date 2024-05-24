import { useWallet } from "./provider"
import { useState } from "react"

function SendItem(props: any) {
  const { onSubmit, title } = props
  const [params, setParams] = useState({})

  return (
    <div>
      <div>
        <div>{title}:</div>
        <textarea onChange={(e) => setParams(e.target.value)} />
      </div>
      <div>
        <button onClick={() => onSubmit(params)}>Send params</button>
      </div>
    </div>
  )
}

function Send() {
  const { sendBox, sendInscribe, sendExchange, sendTransfer, sendSwap } = useWallet()
  return (
    <div style={{ fontSize: 12 }}>
      <SendItem onSubmit={sendBox} title="send box" />
      <SendItem onSubmit={sendInscribe} title="send sendInscribe" />
      <SendItem onSubmit={sendExchange} title="send sendExchange" />
      <SendItem onSubmit={sendSwap} title="send sendSwap" />
      <SendItem onSubmit={sendTransfer} title="send sendTransfer" />
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
    <div>
      <div style={{ display: "flex", gap: "10px", alignContent: "center", justifyContent: "space-between" }}>
        <button onClick={() => connect && connect()}>{address ? address : "Connect Wallet"}</button>
        <div>{network}</div>
      </div>
      <br />
      <div>
        <button onClick={() => singMsg("hello unielon wallet")}>Sign Message</button>
        {message}
      </div>
      <Send />
    </div>
  )
}

export default App
