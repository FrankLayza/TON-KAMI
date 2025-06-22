import BalanceCard from "./components/BalanceCard";
import Navbar from "./components/Navbar";
import SendTon from "./components/Send";
import TransactionHistory from "./components/TransactionHistory";
import WalletInput from "./components/WalletInput";

function App() {
  return (
    <>
      <div className="font-lexend">
        <Navbar />
        <div className="w-[95%] mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <WalletInput />
            <BalanceCard />
            <SendTon />
          </div>
          <TransactionHistory />
        </div>
      </div>
    </>
  );
}

export default App;
