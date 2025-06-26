require("dotenv").config();
const connectDB = require("./services/data/db");
connectDB()
const TelegramBot = require("node-telegram-bot-api");
const { getWallet,saveUser, deleteWallet } = require("./services/userStore");
const token = process.env.TELEGRAM_BOT_TOKEN;
const registerCommand = require("./commands/register");
const checkBalance = require("./services/checkBalance");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("TONKAMI is live");
});
app.get("/health", (req, res) => {
  res.send("TONKAMI is healthy");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

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
              url: "https://ton-kami.vercel.app/",
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

console.log('type of checkbalance:', typeof checkBalance);
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
    const res = await checkBalance(`${username}`);
    bot.sendMessage(chat, "Your wallet balance is: " + res + " TON");
  } catch (error) {
    console.error("Error checking balance:", error);
    bot.sendMessage(chat, "❌ Error checking balance. Please try again later.");
    return;
  }
});

//the send command
bot.onText(/\/send\s+@(\w+)\s+([\d.]+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const senderUsername = msg.from.username;
  const recipient = match[1];
  const amount = parseFloat(match[2]);

  try {
    if (!senderUsername) {
      bot.sendMessage(
        chatId,
        "❌ Please set a username in your Telegram settings."
      );
      return;
    }

    if (!recipient || isNaN(amount) || amount <= 0) {
      bot.sendMessage(
        chatId,
        "❌ Invalid command format. Use /send @username amount"
      );
      return;
    }

    const recipientWallet = await getWallet(recipient);
    if (!recipientWallet) {
      bot.sendMessage(
        chatId,
        `❌ No wallet found for user @${recipient}. Please ask them to register their wallet using /register.`
      );
      return;
    }

    const miniAppUrl = "https://ton-kami.vercel.app/";
    const transactionUrl = `${miniAppUrl}?recipient=${recipientWallet}&amount=${amount}&from=${senderUsername}`;

    bot.sendMessage(
      chatId,
      `🔗 Click below to send *${amount} TON* to @${recipient}:`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🚀 Confirm Transaction",
                web_app: { url: transactionUrl },
              },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error("Error processing /send command:", error);
    bot.sendMessage(chatId, "❌ Something went wrong. Try again later.");
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
      const wallet = await getWallet(username);
      bot.sendMessage(
        chatId,
        wallet ? `💼 Your wallet: ${wallet}` : "❌ No wallet found."
      );
      break;

    case "update":
      bot.sendMessage(chatId, "Send your *new* TON wallet address to update.", {
        parse_mode: "Markdown",
      });
      bot.once("message", async (msg) => {
        if (msg.from.username !== username) {
          bot.sendMessage(
            chatId,
            "Please send the update from your own account."
          );
          return;
        }
        const newWallet = msg.text.trim();
        try {
          await saveUser(username, newWallet);
          bot.sendMessage(chatId, 'Updated your wallet to: ' + newWallet);
        } catch (error) {
          console.error("Error updating wallet:", error);
          bot.sendMessage(
            chatId,
            "❌ Something went wrong while updating your wallet. Please try again later."
          );
          return;
          
        }
        bot.sendMessage(
          chatId,
          `✅ Your wallet has been updated to: ${newWallet}`
        );
      });
      break;

    case "delete":
      try {
        const wallet = await getWallet(username);
        if (!wallet) {
          bot.sendMessage(chatId, "❌ No wallet found to delete.");
          return;
        }
        else {
          await deleteWallet(username);
          bot.sendMessage(chatId, "✅ Your wallet has been deleted successfully.");
        }
      } catch (error) {
        bot.sendMessage(chatId, "❌ Error deleting wallet. Please try again later.");
        console.error("Error deleting wallet:", error);
      }
      break;

    default:
      bot.sendMessage(chatId, "Unknown command.");
      break;
  }
  bot.answerCallbackQuery(query.id);
});
