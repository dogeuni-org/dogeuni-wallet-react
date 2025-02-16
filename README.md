# Dogeuni Wallet browser extension & React Provider

Powering the future for Dogeuni DRC20 Wallet.
Connecting the Unielon Wallet to the base library through React Provider.

## Installation

```shell
yarn add @unielon/wallet-connect-react
```

```shell
npm i @unielon/wallet-connect-react --save
```

## Initialize

```jsx
/* App.jsx */
import { WalletConnect } from '@unielon/wallet-connect-react'

export default App(){
  return (
    <WalletProvider blockRefresh={5000}>
    ...
    </WalletProvider>
  )
}


```

### connect to unielon wallet

```jsx
/* ConnectButton.jsx */
import { useWallet } from './provider'

export default function ConnectButton() {
  const { connect, connectLoading, address } = useWallet()
  return <button onClick={() => connect()}>{connectLoading ? 'connecting...' : address || 'Connect Wallet'}</button>
}
```
