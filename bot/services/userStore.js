const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data/users.json");

function getUsers() {
  // Ensure directory exists
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }
  // If file doesn't exist, create it with an empty object
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
    return {};
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveUser(username, wallet) {
  const users = getUsers();
  users[`@${username}`] = wallet;
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

function getWallet(username) {
  const users = getUsers();
  return users[`@${username}`] || null;
}

function walletExists(wallet) {
  const users = getUsers();
  return Object.values(users).includes(wallet);
}

module.exports = { saveUser, getWallet, getUsers, walletExists };
