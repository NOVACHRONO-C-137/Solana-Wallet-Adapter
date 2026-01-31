import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { toast } from "react-toastify";
import "./Airdrop.css";

export function Airdrop() {
  const wallet = useWallet();
  const [amount, setAmount] = useState("");

  async function sendAirdropToUser() {
    if (!wallet.publicKey) {
      toast.error("Please connect your wallet first!");
      return;
    }

    if (!amount || amount <= 0) {
      toast.warn("Please enter a valid amount!");
      return;
    }

    const toastId = toast.loading("Requesting Airdrop... please wait");

    try {
      const publicConnection = new Connection(
        "https://api.devnet.solana.com",
        "confirmed",
      );

      const signature = await publicConnection.requestAirdrop(
        wallet.publicKey,
        Number(amount) * LAMPORTS_PER_SOL,
      );

      await publicConnection.confirmTransaction(signature, "confirmed");

      toast.update(toastId, {
        render: `Success! Airdropped ${amount} SOL`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Airdrop failed:", error);

      toast.update(toastId, {
        render: "Airdrop failed! (Rate limit or network error)",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  }

  return (
    <div className="airdrop-container">
      <input
        className="airdrop-input"
        id="amount"
        type="text"
        placeholder="Amount of SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="airdrop-btn" onClick={sendAirdropToUser}>
        Send Airdrop
      </button>
    </div>
  );
}
