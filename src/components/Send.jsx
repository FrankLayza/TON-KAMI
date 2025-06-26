import { useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { useTonConnectUI } from "@tonconnect/ui-react";

const SendTon = () => {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => { 
    const params = new URLSearchParams(window.location.search);
    const recipientParam = params.get("recipient");
    const amountParam = params.get("amount");

    if(recipientParam) {
      setRecipient(recipientParam);
    }
    if(amountParam && !isNaN(amountParam)) {
      const parsedAmount = parseFloat(amountParam);
      if(parsedAmount > 0 && parsedAmount <= 0.1) {
        setAmount(parsedAmount);
      } else {
        setAmount(0.01); 
      }
    }
  }, [])
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
    toast.success("Transaction sent successfully!");
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
            className="bg-white w-full mb-4 px-3 py-1 my-2 text-black placeholder:text-sm outline-none border-gray-200 border rounded  focus:ring-2 focus:ring-[#3390ec]"
            readOnly={
              !!new URLSearchParams(window.location.search).get("recipient")
            }
          />
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min={0.001}
            max={0.1}
            placeholder="Amount (Max 1 TON)"
            className="bg-white w-full mb-4 px-3 py-1 my-2 text-black placeholder:text-sm outline-none rounded border-gray-200 border  focus:ring-2 focus:ring-[#3390ec]"
            readOnly={
              !!new URLSearchParams(window.location.search).get("amount")
            }
          />
        </div>

        <div className="flex items-center ">
          <motion.button
            whileHover={{
              backgroundColor: "#3390ec",
              scale: 1.02,
              color: "white",
            }}
            whileTap={{
              scale: 0.95,
              y: 2,
            }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setAmount(0.01)}
            className="cursor-pointer px-3 py-1 border border-gray-300 mr-1"
          >
            0.01 TON
          </motion.button>
          <motion.button
            whileHover={{
              backgroundColor: "#3390ec",
              scale: 1.02,
              color: "white",
            }}
            whileTap={{
              scale: 0.95,
              y: 2,
            }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setAmount(0.05)}
            className="cursor-pointer px-3 py-1 border-gray-300 border mx-1"
          >
            0.05 TON
          </motion.button>
          <motion.button
            whileHover={{
              backgroundColor: "#3390ec",
              scale: 1.02,
              color: "white",
            }}
            whileTap={{
              scale: 0.95,
              y: 2,
            }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setAmount(0.1)}
            className="cursor-pointer px-3 py-1 border-gray-300 border mx-1"
          >
            0.1 TON
          </motion.button>
        </div>

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
            y: 2,
          }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={handleSend}
          className="cursor-pointer shadow-2xl bg-[#3390ec] text-white font-semibold w-full my-3 py-2 rounded-lg"
        >
          Send TIP
        </motion.button>
      </div>
    </>
  );
};

export default SendTon;
