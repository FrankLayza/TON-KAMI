require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { getWallet, getUsers } = require("./services/userStore");
const token = process.env.TELEGRAM_BOT_TOKEN;
const registerCommand = require("./commands/register");
const checkBalance = require("./services/checkBalance");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "services/data/users.json");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => { res.send('TONKAMI is live') })
app.get("/health", (req, res) => { res.send('TONKAMI is healthy') })
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome Tomodachi! type /register to link your TON wallet."
  );
});
//the register command for the bot
bot.onText(/\/register/, (msg) => {
  registerCommand(bot, msg);
});

//the redirect button to the TG mini app
bot.onText(/\/app/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "🚀 Open the TON Micro-pay", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🧩 Open Mini App",
            web_app: {
              url: "https://ton-kami.vercel.app/", // <-- Use your HTTPS web app URL here
            },
          },
        ],
      ],
    },
  });
});

//displays the available commands
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

//the checkBalance command
bot.onText(/\/balance/, async (msg) => {
  const chat = msg.chat.id;
  const username = msg.from.username;

  try {
    if (!username) {
      bot.sendMessage(
        chat,
        "❌ Please set a username in your Telegram settings."
      );
      return;
    }
    const res = await checkBalance(`@${username}`);
    bot.sendMessage(
      chat,
      "Your wallet balance is: " + (res.balance / 1e9).toFixed(4) + " TON"
    );
  } catch (error) {
    console.error("Error checking balance:", error);
    bot.sendMessage(chat, "❌ Error checking balance. Please try again later.");
    return;
  }
});

//displays the wallet related commands
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
      bot.once("message", (msg) => {
        if (msg.from.username !== username) {
          bot.sendMessage(
            chatId,
            "Please send the update from your own account."
          );
          return;
        }
        const newWallet = msg.text.trim();
        const users = getUsers();
        if (users[`@${username}`]) {
          fs.writeFileSync(
            filePath,
            JSON.stringify(
              {
                ...users,
                [`@${username}`]: newWallet,
              },
              null,
              2
            )
          );
        }
        bot.sendMessage(
          chatId,
          `✅ Your wallet has been updated to: ${newWallet}`
        );
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
