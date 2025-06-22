import { GoArrowUpRight } from "react-icons/go";
const SendTon = () => {
  return (
    <>
      <div className="rounded-xl shadow-xl my-5 p-5">
        <div className="flex items-center">
          <GoArrowUpRight className="mr-2 size-6" />
          <p>Send Micro-Payment</p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Recipient TON Wallet Address"
            className="bg-white w-full mb-4 px-3 py-1 my-2 placeholder:text-sm outline-none border-gray-200 border rounded  focus:ring-2 focus:ring-[#3390ec]"
          />
          <input
            type="number"
            min={0.001}
            max={1.0}
            placeholder="Amount (Max 1 TON)"
            className="bg-white w-full mb-4 px-3 py-1 my-2 placeholder:text-sm outline-none rounded border-gray-200 border  focus:ring-2 focus:ring-[#3390ec]"
          />
        </div>

        <div className="flex items-center">
          <button className="cursor-pointer px-3 py-1 border border-gray-300 mr-1">
            0.01 TON
          </button>
          <button className="cursor-pointer px-3 py-1 border-gray-300 border mx-1">
            0.05 TON
          </button>
          <button className="cursor-pointer px-3 py-1 border-gray-300 border mx-1">
            0.1 TON
          </button>
        </div>

        <button className="cursor-pointer bg-[#3390ec] text-white font-semibold w-full my-3 py-2 rounded-lg">
          Send TIP
        </button>
      </div>
    </>
  );
};

export default SendTon;
