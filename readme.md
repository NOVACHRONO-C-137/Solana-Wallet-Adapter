# Solana Wallet Adapter DApp

![Project Preview](https://via.placeholder.com/800x400?text=App+Preview+Placeholder)

## About The Project

This application serves as a comprehensive dashboard for interacting with the Solana Devnet. It allows users to connect their wallets, manage their SOL balance, and perform on-chain transactions with a seamless user experience.

## Key Features

*  Multi-Wallet Support: Connect via Phantom, Solflare, Backpack, and more using the Solana Wallet Adapter.
*  Airdrop Request: Instantly request SOL from the Solana Devnet to your wallet.
*  Live Balance: Real-time display of your wallet's SOL balance.
*  Send Tokens: Securely transfer SOL to any valid Solana address with input validation.
*  Sign Messages: Cryptographically sign messages to prove wallet ownership (verified via TweetNaCl).

## Tech Stack

* Frontend: React (Vite)
* Blockchain SDK: `@solana/web3.js`
* Wallet Integration: `@solana/wallet-adapter-react` & `@solana/wallet-adapter-wallets`
* Cryptography: `tweetnacl`, `bs58`
* UI/Styling: Google Fonts (Roboto Slab, Bitcount Single)
* Notifications: `react-toastify`


## Note on Network
This DApp is configured for the **Solana Devnet**.
* **Airdrops** will only work on Devnet.
* **Sending Tokens** uses Devnet SOL (which has no real monetary value).
* Ensure your wallet (e.g., Phantom) is switched to **Developer Settings > Change Network > Devnet**.

## Standard Solana Wallet Adapter Github 
![anza-xyz/wallet-adapter](https://github.com/anza-xyz/wallet-adapter)

