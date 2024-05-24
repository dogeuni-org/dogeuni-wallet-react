import React from "react"
import ReactDOM from "react-dom/client"
import { WalletProvider } from "./provider"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>
)
