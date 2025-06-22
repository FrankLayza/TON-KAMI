import { useTonContext } from "../context/TonContext";
const BalanceCard = () => {
  const { balance } = useTonContext();

  return (
    <>
      <div className="flex flex-col my-5 rounded shadow-lg p-5">
        <p>Balance Overview</p>
        <div className="flex-1 flex justify-between my-1">
          <p className="text-xs py-1">
            Toncoin Balance <span className="mx-2">{balance}TON</span>
          </p>
          <p className="text-xs">Jetton Tokens</p>
        </div>
      </div>
    </>
  );
};

export default BalanceCard;
