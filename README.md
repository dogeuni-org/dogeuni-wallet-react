# Unielon React

Powering the future for Unielon DRC20 Wallet.
Connecting the Unielon Wallet to the base library through React Provider.

## Installation

```shell
yarn add unielon-wallet-react
```

```shell
npm i unielon-wallet-react --save
```

## Initialize

```jsx
// App.jsx
import { WalletConnect } from 'unielon-react-react'

export default App(){
  return (
    <WalletProvider>
    ...
    </WalletProvider>
  )
}

```

### connect to unielon wallet

```jsx
// Header.jsx
import { useWallet } from "./provider"

export default function Header() {
  const { connect, connectLoading, address } = useWallet()
  console.log(wallet)
  return <button onClick={() => wallet?.connect()}>{connectLoading ? "connecting..." : address ? wallet.address : "Connect Wallet"}</button>
}
```
