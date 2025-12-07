import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Events } from "@/lib/types";

export interface ContextProviderProps {
  children: ReactNode;
}

export type TonContextType = {
  recipient: number;
  setRecipient: Dispatch<SetStateAction<number>>;
  balance: number;
  setBalance: Dispatch<SetStateAction<number>>;
  trxHistory: Events[];
  setTrxHistory: Dispatch<SetStateAction<Events[]>>;
};

const TonContext = createContext<TonContextType | undefined>(undefined);

export const TonContextProvider = ({ children }: ContextProviderProps) => {
  const [balance, setBalance] = useState<number>(0);
  const [trxHistory, setTrxHistory] = useState<Events[]>([]);
  const [recipient, setRecipient] = useState(0);

  return (
    <TonContext.Provider
      value={{
        recipient,
        setRecipient,
        balance,
        setBalance,
        trxHistory,
        setTrxHistory,
      }}
    >
      {children}
    </TonContext.Provider>
  );
};

export function useTonContext() {
  const context = useContext(TonContext);
  if (context === undefined) {
    throw new Error("useTon must be defined within the provider");
  }
  return context;
}
// export const useTonContext = () => useContext(TonContext);
