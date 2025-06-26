const { getWalletBalance } = require("./tonApi");
const { getWallet } = require("./userStore");

async function checkBalance(username) {
  const userWallet = getWallet(username);
  if (!userWallet) {
    throw new Error(`No wallet found for user: ${username}`);
  }
  console.log(userWallet);
  const result = await getWalletBalance(userWallet);
  console.log(result.balance / 1e9);
  return (result.balance / 1e9).toFixed(9); // Return just the balance value
}

module.exports = { checkBalance };
