import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { TonContextProvider } from "./context/TonContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TonContextProvider>
      <TonConnectUIProvider manifestUrl="https://ton-kami.vercel.app/tonconnect-manifest.json">
        <App />
      </TonConnectUIProvider>
    </TonContextProvider>
  </StrictMode>
);
