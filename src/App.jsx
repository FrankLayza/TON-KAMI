import BalanceCard from "./components/BalanceCard";
import Navbar from "./components/Navbar";
import SendTon from "./components/Send";
import TransactionHistory from "./components/TransactionHistory";
import WalletInput from "./components/WalletInput";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
