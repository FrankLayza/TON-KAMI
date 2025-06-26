const Users = require("../schema/Users");

async function saveUser(username, wallet) {
  try {
    const user = await Users.findOneAndUpdate(
      { username: username.toLowerCase() },
      { $set: { wallet, displayName: username } },
      { upsert: true, new: true }
    );
    console.log(`User saved: ${user.displayName}, Wallet: ${user.wallet}`);
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
}

async function getWallet(username) {
  const user = await Users.findOne({ username: username.toLowerCase() });
  return user ? user.wallet : null;
}

async function walletExists(wallet) {
  return await Users.exists({ wallet });
}
async function deleteWallet(username) {
  return await Users.findOneAndDelete({ username: username.toLowerCase() });
}
module.exports = { saveUser, getWallet, walletExists, deleteWallet };

