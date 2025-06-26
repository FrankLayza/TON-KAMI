const User = require("../schema/Users"); // Changed from Users to User

async function saveUser(username, wallet) {
  try {
    const user = await User.findOneAndUpdate(
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
  const user = await User.findOne({ username: username.toLowerCase() });
  return user ? user.wallet : null;
}

async function walletExists(wallet) {
  return await User.exists({ wallet });
}
async function deleteWallet(username) {
  return await User.findOneAndDelete({ username: username.toLowerCase() });
}
module.exports = { saveUser, getWallet, walletExists, deleteWallet };
