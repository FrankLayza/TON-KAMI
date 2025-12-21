import { Telegraf } from "telegraf";
// import {message} from 'telegraf/filters'
import { createUser, getUserByTelegramId } from "./userService";
import dotenv from "dotenv";
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);
bot.start(async (ctx) => {
  // 1. Send the welcome message
  ctx.reply("Welcome to the bot");

  // 2. Handle Database Logic
  // Ensure 'ctx.from' exists (it contains user info)
  if (ctx.from) {
    try {
      const user = await getUserByTelegramId(ctx.from.id);

      // If user exists, you can update their info or do something else
      if (user) {
        console.log(`User ${ctx.from.id} already exists in database`);
      }
    } catch (error) {
      // User doesn't exist (Supabase returns error when .single() finds no rows)
      // Try to create them
      const supabaseError = error as { code?: string; message?: string };
      if (
        supabaseError.code === "PGRST116" ||
        supabaseError.message?.includes("No rows")
      ) {
        try {
          await createUser({
            telegram_id: ctx.from.id,
            username: ctx.from.username,
            first_name: ctx.from.first_name,
          });
          console.log(`Created new user: ${ctx.from.id}`);
        } catch (createError) {
          console.error("Error creating user:", createError);
        }
      } else {
        console.error("Error fetching user:", error);
      }
    }
  }
});
bot.launch();
console.log("Bot is running...");
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

export default bot;
