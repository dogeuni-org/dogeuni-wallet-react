import { useWallet } from "./provider"

function App() {
  const { connect, address, network } = useWallet()
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={() => connect && connect()}>{address ? address : "Connect Wallet"}</button>
      <div>{network}</div>
    </div>
  )
}

export default App
