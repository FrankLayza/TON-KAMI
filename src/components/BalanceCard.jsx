import { useTonContext } from "../context/TonContext";
const BalanceCard = () => {
  const { balance } = useTonContext();
  return (
    <>
      <div className="flex flex-col my-5 rounded shadow-lg p-5">
        <p className="font-semibold">Balance Overview</p>
        {/* <div className="mx-4">
            <p className="text-xs py-1 transform rotate-90 origin-top-left">
              BALANCE
            </p>
            <div className="flex flex-col items-center">
              <span>TON</span>
              <span className="mx-2 text-lg">{balance}</span>
            </div>
          </div> */}
        <div className="flex items-center my-5">
          <p className="transform -rotate-90 text-xs">Balance</p>
          <div className="flex flex-col">
            <p>TON</p>
            <p className="text-2xl font-bold">{balance}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BalanceCard;
