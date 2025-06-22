import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TonContextProvider } from "./context/TonContext.jsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TonContextProvider>
      <TonConnectUIProvider manifestUrl="https://ton-kami.vercel.app/tonconnect-manifest.json">
        <App />
      </TonConnectUIProvider>
    </TonContextProvider>
  </StrictMode>
);
