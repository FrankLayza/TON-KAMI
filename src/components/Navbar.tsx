import { TonConnectButton } from "@tonconnect/ui-react";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-4 px-2">
      <h2  className="text-3xl font-semibold">TON KAMI</h2>
      <TonConnectButton />
    </div>
  );
};

export default Navbar;
