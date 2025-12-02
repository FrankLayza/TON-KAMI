import type{ TransactionHistoryResponse, Events } from "@/lib/types"
export type WalletDetailsType = {
  balance: number,
  address: string
}

const TON_URL = import.meta.env.VITE_TON_TESTNET_URL
const TON_API = import.meta.env.VITE_TON_TESTNET_API

if(!TON_API || !TON_URL){
  throw new Error('Missing TON API env vars')
}

const header = {
  Authorization: `Bearer ${TON_API}`,
  "Content-Type": "application/json",
};

export async function getWalletBalance(
  address: string 
): Promise<WalletDetailsType> {
  try {
    const res = await fetch(`${TON_URL}/v2/accounts/${address}`, {
      headers: header,
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Wallet Balance fetch failed", error);
    throw error;
  }
}

export async function getTransactionHistory(
  address: string
): Promise<Events[]> {
  try {
    const res = await fetch(`${TON_URL}/v2/accounts/${address}`, {
      headers: header,
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data: TransactionHistoryResponse = await res.json();
    return data.events;
  } catch (error) {
    console.error("Error fetching Transaction History", error);
    throw error;
  }
}
