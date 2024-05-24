import { useWallet } from "./provider"

function App() {
  const wallet = useWallet()
  console.log(wallet)
  return <button onClick={() => wallet?.connect()}>{wallet?.address ? wallet.address : "Connect Wallet"}</button>
}

export default App
