import { useEffect } from "react";
import { IoWalletSharp } from "react-icons/io5";
import { useTonContext } from "../context/TonContext";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { getWalletBalance, getTransactions } from "../services/TonServices";
import ToggleTheme from "./ThemeToggle";

const Navbar = () => {
  const { setBalance, setTrxHistory } = useTonContext();
  const wallet = useTonWallet();

  useEffect(() => {
    const fetchBalance = async () => {
      if (!wallet || !wallet.account?.address) {
        setBalance(0);
        return;
      }

      try {
        const response = await getWalletBalance(wallet.account.address);
        const balance = response?.balance
          ? (response.balance / 1e9).toFixed(9)
          : 0;
        setBalance(balance);
      } catch (error) {
        console.error("Error fetching user's balance:", error);
        setBalance(0);
      }
    };

    const fetchHistory = async () => {
      if (!wallet || !wallet.account?.address) {
        setTrxHistory([]);
        return;
      }

      try {
        const trxHistory = await getTransactions(wallet.account.address);
        if (!trxHistory || !trxHistory.events) {
          console.log("Invalid transaction history response");
          setTrxHistory([]);
        } else {
          setTrxHistory(trxHistory.events);
        }
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        setTrxHistory([]);
      }
    };

    fetchBalance();
    fetchHistory();
  }, [wallet, setBalance, setTrxHistory]);

  return (
    <div className="p-3 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <IoWalletSharp className="text-[#3390ec]" />
        <h1 className="font-semibold px-2 text-[12px] md:text-[24px]">
          TON MicroPay Wallet
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {/* <ToggleTheme /> */}
        <TonConnectButton className="text-xs" />
      </div>
    </div>
  );
};

export default Navbar;
