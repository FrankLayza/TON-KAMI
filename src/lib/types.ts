interface TonTransfer {
  sender: Account;
  recipient: Account;
  amount: number;
  comment?: string;
}
interface Actions {
  type: string;
  status: string;
  TonTransfer?: TonTransfer;
}

 export interface Events {
  event_id: string;
  account: Account;
  timestamp: number;
  actions: Actions[];
}
interface Account {
  address: string;
  name: string;
  is_scam: boolean;
  icon?: string;
  is_wallet: boolean;
}
export interface TransactionHistoryResponse {
  events: Events[];
}
