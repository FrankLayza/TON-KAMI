# TON MicroPay Wallet & Telegram Bot

This project provides a simple way to make and receive micro-payments on The Open Network (TON) blockchain. It consists of two main parts:

1.  **A React-based web application (Frontend)** for connecting to your TON wallet, viewing your balance, transaction history, and sending TON.
2.  **A Node.js Telegram Bot (Backend/Bot)** that allows users to register their TON wallets, check balances via Telegram, and initiate payments to other registered users by deep-linking to the web application.

## Project Structure

```
.
├── bot/                  # Telegram Bot (Node.js, node-telegram-bot-api)
│   ├── commands/         # Bot command handlers (e.g., register)
│   ├── schema/           # Mongoose schemas (e.g., Users)
│   ├── services/         # Bot services (e.g., userStore, checkBalance)
│   │   └── data/         # Database connection
│   ├── bot.js            # Main bot logic
│   ├── package.json
│   └── ...
├── public/               # Static assets for the frontend
├── src/                  # React frontend source code
│   ├── components/       # React components
│   ├── context/          # React context (e.g., TonContext)
│   ├── services/         # Frontend services (e.g., TonServices)
│   ├── App.jsx           # Main React application component
│   ├── main.jsx          # React entry point
│   └── ...
├── .gitignore
├── eslint.config.js      # ESLint configuration for frontend
├── index.html            # Main HTML file for Vite
├── package.json          # Frontend package.json
├── README.md             # This file
└── vite.config.js        # Vite configuration
```

## 1. Frontend (React + Vite) - TON MicroPay Wallet

The frontend is a web application that allows users to interact with the TON blockchain for micro-payments.

### Features

*   **Connect Wallet:** Connects to your TON wallet using TON Connect.
*   **View Balance:** Displays your current TON wallet balance.
*   **Transaction History:** Shows a list of your recent transactions.
*   **Send Micro-Payments:** Send small amounts of TON (up to 0.1 TON by default) to any TON address.
*   **Deep Linking for Payments:** Can receive `recipient` and `amount` via URL parameters to pre-fill payment details (used by the Telegram bot).
*   **Theme Toggle:** Light/Dark mode.

### Setup and Running

1.  **Navigate to the root project directory.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    VITE_TON_API_URL=https_your_ton_api_url # e.g., https://toncenter.com/api/v2
    VITE_TON_API_KEY=your_ton_api_key
    VITE_APP_BASE_URL=http://localhost:5173 # Or your deployment URL (e.g., https://ton-kami.vercel.app/)
    ```
    *   `VITE_TON_API_URL`: The base URL for the TON API endpoint (e.g., Toncenter).
    *   `VITE_TON_API_KEY`: Your API key for the TON API.
    *   `VITE_APP_BASE_URL`: The base URL where the frontend is hosted. This is used by the bot to construct deep links. The live version of this project appears to use `https://ton-kami.vercel.app/`.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

5.  **Build for production:**
    ```bash
    npm run build
    ```

### Key Frontend Dependencies

*   `react`: JavaScript library for building user interfaces.
*   `vite`: Frontend build tool.
*   `@tonconnect/ui-react`: For integrating TON Connect wallet functionality.
*   `tailwindcss`: Utility-first CSS framework.
*   `daisyui`: Tailwind CSS component library.
*   `react-toastify`: For notifications.
*   `motion`: Animation library.

## 2. Telegram Bot (Node.js) - TONKAMI Bot

The Telegram bot allows users to manage their TON wallet association and initiate payments through the web application.

### Features

*   **User Registration:** Users can register their Telegram username with a TON wallet address.
*   **Wallet Management:**
    *   View registered wallet.
    *   Update registered wallet.
    *   Delete registered wallet.
*   **Check Balance:** Users can check the TON balance of their registered wallet.
*   **Initiate Payments:**
    *   The `/send @username amount` command allows users to send TON to another registered Telegram user.
    *   The bot generates a deep link to the frontend web application with the recipient's wallet address and amount pre-filled for transaction confirmation.
*   **Mini App Integration:** The `/app` command provides a button to open the main web application directly within Telegram.

### Setup and Running

1.  **Navigate to the `bot/` directory:**
    ```bash
    cd bot
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the `bot/` directory and add the following:
    ```env
    TELEGRAM_BOT_TOKEN=your_telegram_bot_token
    MONGO_URI=your_mongodb_connection_string
    VITE_TON_API_URL=https_your_ton_api_url # Same as frontend
    VITE_TON_API_KEY=your_ton_api_key      # Same as frontend
    PORT=3000 # Optional: Port for the bot's health check server
    ```
    *   `TELEGRAM_BOT_TOKEN`: Your token from Telegram's BotFather.
    *   `MONGO_URI`: Connection string for your MongoDB database (e.g., `mongodb://localhost:27017/TONBOT` or a cloud MongoDB instance). The bot uses the database name "TONBOT" and collection "users".
    *   `VITE_TON_API_URL` & `VITE_TON_API_KEY`: Same TON API credentials used by the frontend.
    *   `PORT`: (Optional) Port for the bot's simple Express server used for health checks. Defaults to 3000.

4.  **Run the bot:**
    *   For development (with auto-reloading using `nodemon`):
        ```bash
        npm run dev
        ```
    *   For production:
        ```bash
        npm start
        ```

### Key Bot Dependencies

*   `node-telegram-bot-api`: Library for interacting with the Telegram Bot API.
*   `mongoose`: ODM library for MongoDB.
*   `axios`: For making HTTP requests to the TON API.
*   `dotenv`: For loading environment variables.
*   `express`: For the simple health check server.

### Bot Commands

*   `/start` - Welcome message.
*   `/register` - Start the wallet registration process.
*   `/app` - Open the TON MicroPay web application (uses the URL `https://ton-kami.vercel.app/` by default).
*   `/menu` - Show wallet management and other commands via an inline keyboard.
*   `/balance` - Check the balance of your registered wallet.
*   `/send @username <amount>` - Initiate a TON payment to another registered user (e.g., `/send @friend 0.05`). This generates a link to the frontend.

## Interaction between Frontend and Bot

The primary interaction is when the bot's `/send` command is used. The bot looks up the recipient's registered TON wallet address and constructs a URL to the frontend application (e.g., `https://ton-kami.vercel.app/`). This URL includes the recipient's wallet (`recipient`), the `amount`, and the sender's Telegram username (`from`) as query parameters. When the user clicks the link/button in Telegram, it opens the frontend with these details pre-filled, allowing the sender to confirm and execute the transaction using their connected TON wallet.

Example deep link generated by the bot: `https://ton-kami.vercel.app/?recipient=EQ...&amount=0.05&from=@senderusername`

## Contributing

This project is currently maintained by its original authors. If you'd like to contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Create a new Pull Request.

Please ensure your code adheres to the existing style and that any new dependencies are justified.

---
*This README was generated with assistance from an AI coding partner.*
