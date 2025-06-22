import { useTonContext } from "../context/TonContext";
import { getWalletBalance, getTransactions } from "../services/TonServices";
import { useState } from "react";
const WalletInput = () => {
  const { open, setOpen, setBalance, setTrxHistory } = useTonContext();
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const handleConnect = async () => {
    if (!address.trim()) return alert("Enter a valid TON address");

    setIsLoading(true);
    try {
      const response = await getWalletBalance(address);
      if (!response || !response.balance) {
        console.warn("Invalid balance response");
        setBalance(0);
      } else {
        setBalance((response.balance / 1e9).toFixed(9));
      }

      const trxHistory = await getTransactions(address);
      if (!trxHistory || !trxHistory.events) {
        console.log("Invalid transaction history response");
        setTrxHistory([]);
      } else {
        setTrxHistory(trxHistory.events);
      }
      setOpen(false);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      setBalance(0);
      setTrxHistory([]);
      alert("Failed to fetch balance. Check address.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="bg-zinc-300 rounded-xl p-6 w-[90%] max-w-md shadow-xl relative">
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer absolute top-3 right-3 text-black hover:text-red-400 text-3xl"
            >
              &times;
            </button>

            <p className="text-lg font-semibold mb-4">Connect Your Wallet</p>

            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Enter TON Wallet Address"
              className="bg-white text-black w-full px-4 py-2 rounded placeholder:text-sm outline-none focus:ring-2 focus:ring-[#3390ec]"
            />

            {
              <button
                onClick={handleConnect}
                className="cursor-pointer mt-4 w-full bg-[#3390ec] hover:bg-[#2875c1] transition text-white py-2 rounded font-medium"
              >
                {isLoading ? "Loading..." : "Connect Wallet"}
              </button>
            }
          </div>
        </div>
      )}
    </>
  );
};

export default WalletInput;
