const { getWalletBalance } = require("../../src/services/TonServices");
const { getWallet } = require("./userStore");

async function checkBalance(username) {
  const userWallet = getWallet(username);
  if (!userWallet) {
    throw new Error(`No wallet found for user: ${username}`);
  }
  console.log(userWallet);
  const balance = await getWalletBalance(userWallet);
  console.log(balance / 1e9)
  return balance
}

module.exports={checkBalance}