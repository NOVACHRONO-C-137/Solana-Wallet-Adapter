import React, { useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { Airdrop } from "./components/Airdrop.jsx";
import { ShowSolBalance } from "./components/ShowSolBalance.jsx";
import { SendTokens } from "./components/SendTokens.jsx";
import { SignMessage } from "./components/SignMessage.jsx";

// Default styles
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DAPP_ICON = "/dapp.svg";
const ICON_THEME_LIGHT = "/sun.svg";
const ICON_THEME_DARK = "/moon.svg";

function App() {
  return (
    <ConnectionProvider
      endpoint={"https://solana-devnet.g.alchemy.com/v2/1QlrQeEYSekmsO7WjUbu1"}
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <AppContent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

function AppContent() {
  const [theme, setTheme] = useState("dark");
  const { publicKey } = useWallet();

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`app-root theme-${theme}`}>
      <div className="app-shell">
        <header className="app-header">
          <div className="header-left">
            <img src={DAPP_ICON} alt="icon" className="app-logo" />
            <h1>Wallet Adapter DAPP</h1>
          </div>

          <button className="theme-toggle" onClick={toggleTheme}>
            <img
              src={theme === "dark" ? ICON_THEME_LIGHT : ICON_THEME_DARK}
              alt="theme"
              className="theme-toggle-icon"
            />
          </button>
        </header>

        <div className="wallet-status-container">
          <div className="wallet-address-box">
            <span className="label">Current Wallet Address:</span>
            <span className="address">
              {publicKey ? publicKey.toBase58() : "Not Connected"}
            </span>
          </div>
          <div className="wallet-buttons">
            {!publicKey ? <WalletMultiButton /> : <WalletDisconnectButton />}
          </div>
        </div>

        <div className="content-container">
          <ShowSolBalance />
          <Airdrop />
          <SendTokens />
          <SignMessage />
        </div>
        <ToastContainer
          position="bottom-right"
          theme={theme}
          autoClose={5000}
        />
      </div>
    </div>
  );
}

export default App;
