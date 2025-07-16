import { useEffect, useState } from "react";
import { useTonContext } from "../context/TonContext";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { getTonPrice } from "../services/CoinGecko";
const BalanceCard = ({ className = "" }) => {
  const [showBalance, setShowBalance] = useState(false);
  const [usdPrice, setUSDPrice] = useState('');
  const { balance } = useTonContext();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getTonPrice("the-open-network");
        console.log(res);
        if (res) setUSDPrice(res);
      } catch (error) {
        console.error("Error in retrieving the usd equivalent", error.message);
      }
    };
    fetch();
  }, [balance]);
  return (
    <>
      <div
        className={`flex flex-col my-5 backdrop-blur-lg border-white/20 rounded shadow-lg p-5 overflow-hidden ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold">Balance Overview</p>
          <button
            onClick={() => setShowBalance((prev) => !prev)}
            className="btn-ghost cursor-pointer"
          >
            {showBalance ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>

        <div className="space-y-2">
          <div className="text-4xl font-bold">
            {showBalance ? `${balance} TON` : "********"}
          </div>
          <div className="text-2xl font-bold">{showBalance ? `~ $${usdPrice * balance}` : "********"}</div>
        </div>
      </div>
    </>
  );
};

export default BalanceCard;
