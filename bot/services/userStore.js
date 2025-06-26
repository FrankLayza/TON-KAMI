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
  const user = await Users.findOne({ username });
  return user ? user.wallet : null;
}

async function walletExists(wallet) {
  return await Users.exists({ wallet });
}
async function deleteWallet(username) {
  return await Users.findOneAndDelete({ username: username.toLowerCase() });
}
module.exports = { saveUser, getWallet, walletExists, deleteWallet };

// const filePath = path.join(__dirname, "data/users.json");
// const fs = require("fs");
// const path = require("path");
// function getUsers() {
//   // Ensure directory exists
//   if (!fs.existsSync(path.dirname(filePath))) {
//     fs.mkdirSync(path.dirname(filePath), { recursive: true });
//   }
//   // If file doesn't exist, create it with an empty object
//   if (!fs.existsSync(filePath)) {
//     fs.writeFileSync(filePath, JSON.stringify({}));
//     return {};
//   }
//   return JSON.parse(fs.readFileSync(filePath, "utf8"));
// }

// function saveUser(username, wallet) {
//   const users = getUsers();
//   users[`@${username}`] = wallet;
//   fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
// }

// function getWallet(username) {
//   const users = getUsers();
//   const entry = users[`@${username}`];
//   return entry || null;
// }

// function walletExists(wallet) {
//   const users = getUsers();
//   return Object.values(users).includes(wallet);
// }

// module.exports = { saveUser, getWallet, getUsers, walletExists };
