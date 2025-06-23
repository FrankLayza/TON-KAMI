import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

const SendTon = () => {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const address = useTonAddress();

  const handleAmountChange = (e) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value)) value = 0;
    if (value <= 0) value = 0;
    if (value > 0.1) value = 0.1;
    setAmount(value);
  };

  const handleSend = () => {
    if (!recipient.trim()) {
      alert("Please enter a valid recipient address.");
      return;
    }
    if (amount <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }
    const transact = {
      validUntil: Date.now() + 180,
      messages: [
        {
          address: recipient,
          amount: amount * 1e9,
        },
      ],
    };
    tonConnectUI.sendTransaction(transact);
  };
  return (
    <>
      <div className="rounded-xl shadow-xl my-5 p-5">
        <div className="flex items-center">
          <GoArrowUpRight className="mr-2 size-6" />
          <p>Send Micro-Payment</p>
        </div>

        <div>
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            type="text"
            placeholder="Recipient TON Wallet Address"
            className="bg-white w-full mb-4 px-3 py-1 my-2 placeholder:text-sm outline-none border-gray-200 border rounded  focus:ring-2 focus:ring-[#3390ec]"
          />
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min={0.001}
            max={0.1}
            placeholder="Amount (Max 1 TON)"
            className="bg-white w-full mb-4 px-3 py-1 my-2 placeholder:text-sm outline-none rounded border-gray-200 border  focus:ring-2 focus:ring-[#3390ec]"
          />
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setAmount(0.01)}
            className="cursor-pointer px-3 py-1 border border-gray-300 mr-1"
          >
            0.01 TON
          </button>
          <button
            onClick={() => setAmount(0.05)}
            className="cursor-pointer px-3 py-1 border-gray-300 border mx-1"
          >
            0.05 TON
          </button>
          <button
            onClick={() => setAmount(0.1)}
            className="cursor-pointer px-3 py-1 border-gray-300 border mx-1"
          >
            0.1 TON
          </button>
        </div>

        <button
          onClick={handleSend}
          className="cursor-pointer bg-[#3390ec] text-white font-semibold w-full my-3 py-2 rounded-lg"
        >
          Send TIP
        </button>
      </div>
    </>
  );
};

export default SendTon;
