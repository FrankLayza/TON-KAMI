import { createContext, useContext, useState } from "react";

const TonContext = createContext();

export const TonContextProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [jettonBalance, setJettonBalance] = useState(0);
  const [trxHistory, setTrxHistory] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <TonContext.Provider
      value={{
        balance,
        setBalance,
        jettonBalance,
        setJettonBalance,
        setOpen,
        open,
        trxHistory,
        setTrxHistory,
      }}
    >
      {children}
    </TonContext.Provider>
  );
};
export const useTonContext = () => useContext(TonContext);
