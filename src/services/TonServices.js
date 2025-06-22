const TON_URL = import.meta.env.VITE_TON_API_URL;
const TON_API_KEY = import.meta.env.VITE_TON_API_KEY;

const header = {
  Authorization: `Bearer ${TON_API_KEY}`,
  "Content-Type": "application/json",
};

export const getWalletBalance = async (address) => {
  const res = await fetch(`${TON_URL}/v2/accounts/${address}`, {
    headers: header,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wallet balance");
  }
  return res.json();
};

export const getTransactions = async (address) => {
  const res = await fetch(`${TON_URL}/v2/accounts/${address}/events?limit=10`, {
    headers: header,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return res.json();
};
