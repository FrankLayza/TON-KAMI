# Telegram Bot Setup

## Prerequisites

1. **Node.js** (v18 or higher)
2. **pnpm** package manager
3. **Telegram Bot Token** (get from [@BotFather](https://t.me/BotFather))
4. **Supabase Account** with a `users` table

## Setup Instructions

### 1. Install Dependencies

```bash
cd bot
pnpm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `bot` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
BOT_TOKEN=your_telegram_bot_token_here
SUPABASE_URL=your_supabase_project_url
SUPABASE_API=your_supabase_anon_key
```

### 3. Get Telegram Bot Token

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the bot token and add it to your `.env` file

### 4. Set Up Supabase Database

Create a `users` table in your Supabase project with the following schema:

```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username TEXT,
  first_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. Run the Bot

**Development mode** (with auto-reload):
```bash
pnpm dev
```

**Production mode**:
```bash
pnpm start
```

**Build TypeScript** (optional):
```bash
pnpm build
```

## Testing

1. Start the bot using `pnpm dev` or `pnpm start`
2. Open Telegram and search for your bot (using the username you set with BotFather)
3. Send `/start` to your bot
4. The bot should reply with "Welcome to the bot"
5. Check your Supabase database to see if the user was created

## Troubleshooting

- **"Missing the Supabase env vars"**: Make sure your `.env` file exists and has all required variables
- **"Missing TON API env vars"**: This error is for the frontend, not the bot
- **Bot doesn't respond**: Check that your bot token is correct and the bot is running
- **Database errors**: Verify your Supabase credentials and that the `users` table exists

