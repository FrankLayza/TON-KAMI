import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { TonContextProvider } from "./context/TonContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <TonContextProvider>
        <TonConnectUIProvider manifestUrl="https://ton-kami.vercel.app/tonconnect-manifest.json">
          <App />
        </TonConnectUIProvider>
      </TonContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
