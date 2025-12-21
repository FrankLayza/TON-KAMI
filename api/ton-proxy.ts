// api/ton-proxy.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Get the key from the secure server-side environment
  const TON_API_KEY = process.env.VITE_TON_TESTNET_API;
  const TON_URL = process.env.VITE_TON_TESTNET_URL;

  if (!TON_API_KEY || !TON_URL) {
    return res
      .status(500)
      .json({ error: "Server misconfiguration: Missing API Key or URL" });
  }

  const { path } = req.query;

  if (!path || typeof path !== "string") {
    return res.status(400).json({ error: "Path is required" });
  }

  try {
    const targetUrl = `${TON_URL}/${path}`;
    const tonResponse = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TON_API_KEY}`,
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await tonResponse.json();

    // 4. Return the data to your frontend with the correct status code
    return res.status(tonResponse.status).json(data);
  } catch (error) {
    console.error("TON Proxy Error:", error);
    return res
      .status(500)
      .json({ error: "Failed to communicate with TON network" });
  }
}
