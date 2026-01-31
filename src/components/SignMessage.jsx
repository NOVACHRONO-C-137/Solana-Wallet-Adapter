import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useState } from "react";
import nacl from "tweetnacl";
import { toast } from "react-toastify";

export function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");

  async function onClick() {
    if (!publicKey) {
      toast.error("Please connect your wallet first!");
      return;
    }

    if (!signMessage) {
      toast.error("Wallet does not support message signing!");
      return;
    }

    if (!message) {
      toast.warn("Please enter a message to sign!");
      return;
    }

    const toastId = toast.loading("Requesting signature...");

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);

      const isValid = nacl.sign.detached.verify(
        encodedMessage,
        signature,
        publicKey.toBytes(),
      );

      if (!isValid) {
        toast.update(toastId, {
          render: "Signature verification failed!",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
        return;
      }

      toast.update(toastId, {
        render: `Message signed successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      console.log("Signature:", bs58.encode(signature));
      setMessage("");
    } catch (error) {
      console.error("Signing failed:", error);

      toast.update(toastId, {
        render: `Signing failed: ${error.message}`,
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
        type="text"
        placeholder="Message to sign"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="airdrop-btn" onClick={onClick}>
        Sign Message
      </button>
    </div>
  );
}
