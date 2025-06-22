const {
  saveUser,
  getWallet,
  walletExists,
} = require("../services/userStore");

module.exports = (bot, msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;

 
  if (!username) {
    bot.sendMessage(
      chatId,
      "You need a Telegram username to register. Please set one in your Telegram settings."
    );
    return;
  }

  bot.sendMessage(
    chatId,
    "Please reply with your TON wallet address (starts with EQ, UQ, kQ, or 0:).\n" +
      "Example: UQDKbjIcfM6ezt8KjKJJLshZJJSqX7XOA4ff-W72r5gqPrHF\n" +
      "Get a wallet from @Wallet or TON Space if you don't have one."
  );

  // Listen for reply
  bot.once("message", (reply) => {
    const wallet = reply.text.trim();
    console.log("Wallet received:", wallet, "Length:", wallet.length);

    // Check if reply is a command or invalid input
    if (wallet.startsWith("/")) {
      bot.sendMessage(
        chatId,
        "Please send a TON wallet address, not a command."
      );
      return;
    }

   
    if (getWallet(username)) {
      bot.sendMessage(
        chatId,
        `You are already registered with wallet ${getWallet(username)}.`
      );
      return;
    }
    if (walletExists(wallet)) {
      bot.sendMessage(
        chatId,
        `Wallet address ${wallet} is already registered by another user.`
      );
      return;
    }

    // Save new user
    try {
      saveUser(username, wallet);
      bot.sendMessage(
        chatId,
        `Wallet ${wallet} registered successfully for @${username}!`
      );
    } catch (error) {
      console.error("Error saving user:", error.message);
      bot.sendMessage(
        chatId,
        "Error saving wallet address. Please try again later."
      );
    }
  });
};
