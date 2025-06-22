import { useEffect } from "react";
import { IoWalletSharp } from "react-icons/io5";
import { useTonContext } from "../context/TonContext";
import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
} from "@tonconnect/ui-react";
import { getWalletBalance } from "../services/TonServices";

const Navbar = () => {
  const { setBalance } = useTonContext();
  const wallet = useTonWallet();

  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet?.account?.address) {
        try {
          const response = await getWalletBalance(wallet.account.address);
          const balance = response?.balance
            ? (response.balance / 1e9).toFixed(9)
            : 0;
          setBalance(balance);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchBalance();
  }, [wallet, setBalance]);

  return (
    <div className="p-3 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <IoWalletSharp className="text-[#3390ec]" />
        <h1 className="font-semibold px-2 text-[24px]">TON MicroPay Wallet</h1>
      </div>
      <TonConnectButton />
    </div>
  );
};

export default Navbar;
