import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";
import { toast } from "react-toastify";
import "./SendTokens.css";

export function SendTokens() {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  async function sendTokens() {
    if (!wallet.publicKey) {
      toast.error("Please connect your wallet first!");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.warn("Please enter a valid amount!");
      return;
    }

    let toPublicKey;
    try {
      toPublicKey = new PublicKey(to);
    } catch (err) {
      console.error("Invalid address:", err);
      toast.error("Invalid Recipient Address!");
      return;
    }

    const toastId = toast.loading("Processing transaction...");

    try {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: toPublicKey,
          lamports: Number(amount) * LAMPORTS_PER_SOL,
        }),
      );

      await wallet.sendTransaction(transaction, connection);

      toast.update(toastId, {
        render: `Successfully sent ${amount} SOL!`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      setTo("");
      setAmount("");
    } catch (error) {
      console.error("Transaction failed:", error);

      toast.update(toastId, {
        render: "Transaction failed!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  }

  return (
    <div className="send-tokens-container">
      <input
        className="send-tokens-input"
        type="text"
        placeholder="To (Wallet Address)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        className="send-tokens-input"
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="send-tokens-btn" onClick={sendTokens}>
        Send Tokens
      </button>
    </div>
  );
}
