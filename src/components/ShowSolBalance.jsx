import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import "./ShowSolBalance.css";

export function ShowSolBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function getBalance() {
      if (wallet.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    }

    getBalance();
  }, [wallet.publicKey, connection]);

  return (
    <div className="balance-container">
      <p className="balance-label">Your Sol Balance</p>
      <div className="balance-value">{wallet.publicKey ? balance : 0} SOL</div>
    </div>
  );
}
