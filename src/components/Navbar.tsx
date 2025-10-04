import { useTonContext } from "@/context/TonContext";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
// import { useState } from "react";
const Navbar = () => {
  // const [showBalance, setShowBalance] = useState<boolean>(false)
  const {setBalance, setTrxHistory} = useTonContext()
  const wallet = useTonWallet()
  return (
    <div className="flex justify-between items-center pb-4 px-2">
      <h2  className="text-3xl font-semibold">TON KAMI</h2>
      <TonConnectButton />
    </div>
  );
};

export default Navbar;
