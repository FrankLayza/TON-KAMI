const fetch = require("node-fetch");
const TON_URL = process.env.VITE_TON_API_URL;
const TON_API_KEY = process.env.VITE_TON_API_KEY;

const header = {
  Authorization: `Bearer ${TON_API_KEY}`,
  "Content-Type": "application/json",
};

async function getWalletBalance(address) {
  const res = await fetch(`${TON_URL}/v2/accounts/${address}`, {
    headers: header,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wallet balance");
  }
  return res.json();
}

module.exports = { getWalletBalance };
