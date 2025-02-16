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

### WalletProvider coinfig state

| state        | type     | default     | description                                        |
| ------------ | -------- | ----------- | -------------------------------------------------- |
| blockRefresh | `number` | `1000 * 60` | Interval in milliseconds to refresh the block data |

### connect to dogeuni wallet

```jsx
/* ConnectButton.jsx */
import { useWallet } from './provider'

export default function ConnectButton() {
  const { connect, connectLoading, address } = useWallet()
  return <button onClick={() => connect()}>{connectLoading ? 'connecting...' : address || 'Connect Wallet'}</button>
}
```

### wallet state

| state             | type       | default                        | description                                        |
| ----------------- | ---------- | ------------------------------ | -------------------------------------------------- |
| `address`         | `string`   | `null`                         | The currently connected wallet address             |
| `installed`       | `boolean`  | `false`                        | Whether the extension is installed                 |
| `connected`       | `boolean`  | `false`                        | Whether it is connected to the wallet extension    |
| `sendLoading`     | `boolean`  | `false`                        | Loading state for sending transactions             |
| `connectLoading`  | `boolean`  | `false`                        | Loading state for connecting to the wallet         |
| `sendError`       | `string`   |                                | Error message for sending transactions             |
| `dogecoinBalance` | `number`   | `null`                         | Balance of Dogecoin                                |
| `publicKey`       | `string`   | `null`                         | Public key of the wallet                           |
| `network`         | `string`   | `null`                         | Current network                                    |
| `currency`        | `string`   | `usd`                          | Current currency                                   |
| `currentCurrency` | `string`   | `{ name: 'USD', symbol: '$' }` | Current selected currency                          |
| `currencyList`    | `array`    | `CurrencyItemType[]`           | List of available currencies, `CurrencyItemType[]` |
| `uniBlock`        | `function` | `null`                         | get the current Unielon block                      |
| `dogeBlock`       | `function` | `null`                         | get the current Dogecoin block                     |
| `price`           | `function` | `null`                         | get the current price                              |
| `fee`             | `function` | `null`                         | get the current fee                                |

### wallet actions

| action           | type       | default | about                        |
| ---------------- | ---------- | ------- | ---------------------------- |
| `sendTransfer`   | `function` | `null`  | base wallet action           |
| `connect`        | `function` | `null`  | connect to the wallet        |
| `sendInscribe`   | `function` | `null`  | mint & inscribe DRC20 tick   |
| `sendTransfer`   | `function` | `null`  | DRC20 tick transfer          |
| `sendSwap`       | `function` | `null`  | DRC20 swap exchange          |
| `sendExchange`   | `function` | `null`  | DRC20 market exchange        |
| `sendBox`        | `function` | `null`  | send box exchange            |
| `sendNft`        | `function` | `null`  | NFT exchange                 |
| `sendStake`      | `function` | `null`  | stake                        |
| `sendPump`       | `function` | `null`  | pump swap & transfer         |
| `getBalance`     | `function` | `null`  | get Dogecoin balance         |
| `networkChange`  | `function` | `null`  | current Dogecoin network     |
| `accountChange`  | `function` | `null`  | address account change       |
| `currencyChange` | `function` | `null`  | current currency change      |
| `getBlockNumber` | `function` | `null`  | get the current block number |
| `getFee`         | `function` | `null`  | retrieve the fee             |
| `getPrice`       | `function` | `null`  | retrieve the price           |
| `initPriceFee`   | `function` | `null`  | initialize the price and fee |
