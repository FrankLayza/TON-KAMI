// import { useEffect } from "react";
import { GrTransaction } from "react-icons/gr";
import { useTonContext } from "../context/TonContext";
const TransactionHistory = () => {
  const { trxHistory } = useTonContext();
  return (
    <>
      <div className="rounded-xl shadow-xl my-5 p-5">
        <div className="flex items-center">
          <GrTransaction className="mr-2 size-6" />
          <p>Transaction History</p>
        </div>

        <div className="flex items-center justify-between my-3 text-[#9cb4d5] text-sm pt-4">
          <p>VALUE</p>
          <p>DATE</p>
          <p>TYPE</p>
          <p>TX</p>
        </div>
        {Array.isArray(trxHistory) &&
          trxHistory.map((event, eventIdx) =>
            event?.actions?.map((action, actionIdx) => {
              const ton = action?.TonTransfer;
              const amount = ton ? (ton.amount / 1e9).toFixed(9) : "0";
              const date = new Date(event?.timestamp * 1000).toLocaleDateString(
                "en-GB",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              );
              return ton ? (
                <div
                  key={`${eventIdx}-${actionIdx}`}
                  className="flex items-center justify-between my-3 text-xs text-black bg-[#eceeee] rounded p-2"
                >
                  <p>{amount} TON</p>
                  <p>{date}</p>
                  <p className="text-center">TonTransfer</p>
                  <p className="truncate max-w-[120px] text-blue-600 underline cursor-pointer text-center">
                    {event?.event_id?.slice(0, 8)}...
                    {event?.event_id?.slice(-6)}
                  </p>
                </div>
              ) : null;
            })
          )}
      </div>
    </>
  );
};

export default TransactionHistory;
