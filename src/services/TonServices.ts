import type { Events } from "@/lib/types";
export type WalletDetailsType = {
  balance: number;
  address: string;
};

const TON_URL = import.meta.env.VITE_TON_TESTNET_URL;
const TON_API = import.meta.env.VITE_TON_TESTNET_API;

if (!TON_API || !TON_URL) {
  throw new Error("Missing TON API env vars");
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
    const baseUrl = TON_URL.replace(/\/$/, "");
    const res = await fetch(
      `${baseUrl}/v2/accounts/${address}/events?limit=100`,
      {
        headers: header,
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.events || data.data || [];
  } catch (error) {
    console.error("Error fetching Transaction History", error);
    throw error;
  }
}

/**
 * Estimates the network fee for a TON transaction
 * TON network fees are typically:
 * - Simple transfer: ~0.01-0.02 TON
 * - With comment: ~0.02-0.03 TON
 * - Complex smart contract: ~0.03-0.05 TON
 *
 * This is a conservative estimate. Actual fees may vary based on network conditions.
 */
export function estimateTransactionFee(hasComment: boolean = false): number {
  // Base fee for simple transfer
  const baseFee = 0.015; // ~0.015 TON

  // Additional fee if transaction includes a comment
  const commentFee = hasComment ? 0.01 : 0;

  // Small buffer for network variability
  const buffer = 0.005;

  return baseFee + commentFee + buffer;
}
