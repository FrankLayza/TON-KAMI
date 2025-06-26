const { saveUser, getWallet, walletExists } = require("../services/userStore");

module.exports = (bot, msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;

  if (!username) {
    bot.sendMessage(
      chatId,
      "❌ You need a Telegram username to register. Please set one in your Telegram settings."
    );
    return;
  }

  bot.sendMessage(
    chatId,
    "📩 Please reply with your TON wallet address (starts with `EQ`, `UQ`, `kQ`, or `0:`).\n" +
      "Example: `UQDKbjIcfM6ezt8KjKJJLshZJJSqX7XOA4ff-W72r5gqPrHF`\n\n" +
      "👉 If you don't have a wallet, you can get one from @wallet or TON Space.",
    { parse_mode: "Markdown" }
  );

  // 👇 Now make reply handler async
  bot.once("message", async (reply) => {
    const wallet = reply.text.trim();
    console.log("Wallet received:", wallet);

    if (wallet.startsWith("/")) {
      bot.sendMessage(
        chatId,
        "❌ Please send only a valid TON wallet address, not a command."
      );
      return;
    }

    try {
      const existingWallet = await getWallet(username);
      if (existingWallet) {
        bot.sendMessage(
          chatId,
          `⚠️ You are already registered with wallet: ${existingWallet}`
        );
        return;
      }

      const walletTaken = await walletExists(wallet);
      if (walletTaken) {
        bot.sendMessage(
          chatId,
          `⚠️ This wallet address is already registered by another user.`
        );
        return;
      }
      console.log(`saving wallet for user: ${username}`);
      await saveUser(username, wallet);
      bot.sendMessage(
        chatId,
        `✅ Wallet address registered successfully for @${username}:\n\n${wallet}`
      );
    } catch (error) {
      console.error("❌ Error saving user:", error);
      bot.sendMessage(
        chatId,
        "❌ Something went wrong while saving your wallet. Please try again later." + error
      );
    }
  });
};
