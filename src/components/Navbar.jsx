import { IoWalletSharp } from "react-icons/io5";
import { useTonContext } from "../context/TonContext";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
const Navbar = () => {
  const { setOpen } = useTonContext();
  const address = useTonAddress();
  const toggleWalletConnect = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <div className=" p-3 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <IoWalletSharp className="text-[#3390ec]" />
          <h1 className="font-semibold px-2 text-[24px]">
            TON MicroPay Wallet
          </h1>
        </div>
        {/* <button
          onClick={toggleWalletConnect}
          className="cursor-pointer bg-[#3390ec] rounded-lg px-3 py-1 text-white font-semibold"
        >
          Connect Wallet
        </button> */}
        <TonConnectButton />
       
      </div>
    </>
  );
};

export default Navbar;
