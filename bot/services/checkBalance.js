// const { getWalletBalance } = require("./tonApi");
const { getWallet } = require("./userStore");
const axios = require("axios");
const TON_URL = process.env.VITE_TON_API_URL;
const TON_API_KEY = process.env.VITE_TON_API_KEY;


module.exports = async function checkBalance(username) {
  const userWallet = await getWallet(username);
  if (!userWallet) {
    throw new Error(`No wallet found for user: ${username}`);
  }
  const res= await axios.get(`${TON_URL}/v2/accounts/${userWallet}`, {
    headers: {
      Authorization: `Bearer ${TON_API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  const tonBalance = parseFloat(res.data.balance / 1e9)
  console.log(tonBalance);
  return tonBalance.toFixed(9); // Return balance in TON with 9 decimal places
}


