import type { Events } from "@/lib/types";

export type WalletDetailsType = {
  balance: number;
  address: string;
};

/**
 * Helper function to route requests through your Vercel Proxy
 * @param path - The specific TON API endpoint (e.g., "v2/accounts/EQ...")
 * @param options - Fetch options (method, body, etc.)
 */
async function fetchFromProxy(path: string, options: RequestInit = {}) {
  try {
    const encodedPath = encodeURIComponent(path);

    const res = await fetch(`/api/ton-proxy?path=${encodedPath}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error(`Proxy Error Response:`, errorData);
      throw new Error(
        `Proxy Error: ${res.status} ${res.statusText} - ${
          errorData?.error || "Unknown error"
        }`
      );
    }

    return await res.json();
  } catch (error) {
    console.error(`Proxy Request failed for path: ${path}`, error);
    throw error;
  }
}

export async function getWalletBalance(
  address: string
): Promise<WalletDetailsType> {
  return fetchFromProxy(`v2/accounts/${address}`);
}

export async function getTransactionHistory(
  address: string
): Promise<Events[]> {
  try {
    const data = await fetchFromProxy(
      `v2/accounts/${address}/events?limit=100`
    );
    return Array.isArray(data) ? data : data.events || data.data || [];
  } catch (error) {
    console.error("Error fetching Transaction History", error);
    throw error;
  }
}

/**
 * Estimates the network fee for a TON transaction
 * (This logic is client-side math and remains unchanged)
 */
export function estimateTransactionFee(hasComment: boolean = false): number {
  const baseFee = 0.015; // ~0.015 TON
  const commentFee = hasComment ? 0.01 : 0;
  const buffer = 0.005;

  return baseFee + commentFee + buffer;
}
