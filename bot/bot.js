require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { getWallet, getUsers } = require("./services/userStore");
const token = process.env.TELEGRAM_BOT_TOKEN;
const registerCommand = require("./commands/register");

const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome Tomodachi! type /register to link your TON wallet."
  );
});
bot.onText(/\/register/, (msg) => {
  registerCommand(bot, msg);
});
bot.onText(/\/menu/, (msg) => {
  const chatId = msg.chat.id;

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🔗 Register Wallet", callback_data: "register" },
          { text: "💼 View Wallet", callback_data: "view" },
        ],
        [
          { text: "✏️ Update Wallet", callback_data: "update" },
          { text: "❌ Delete Wallet", callback_data: "delete" },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, "🔘 *Command Menu:*", {
    parse_mode: "Markdown",
    ...keyboard,
  });
});
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const username = query.from.username;
  const action = query.data;

  switch (action) {
    case "register":
      bot.sendMessage(
        chatId,
        "Please send your TON wallet address to register."
      );
      break;

    case "view":
      const wallet = getWallet(username);
      bot.sendMessage(
        chatId,
        wallet ? `💼 Your wallet: ${wallet}` : "❌ No wallet found."
      );
      break;

    case "update":
      bot.sendMessage(chatId, "Send your *new* TON wallet address to update.", {
        parse_mode: "Markdown",
      });
      break;

    case "delete":
      const users = getUsers();
      if (users[`@${username}`]) {
        delete users[`@${username}`];
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        bot.sendMessage(chatId, "🗑️ Your wallet has been deleted.");
      } else {
        bot.sendMessage(chatId, "❌ No wallet to delete.");
      }
      break;

    default:
      bot.sendMessage(chatId, "Unknown command.");
      break;
  }
  bot.answerCallbackQuery(query.id);
});

