import { useQuery } from "@tanstack/react-query";
import { getTransactionHistory, getWalletBalance } from "@/services/TonServices";
import { getPriceEquivalent } from "@/services/CoinGeckoService";
import type { CoinGeckoTypes } from "@/services/CoinGeckoService";
export function useWalletBalance(address?: string) {
  return useQuery<number, unknown>({
    queryKey: ["wallet-balance", address],
    queryFn: async () => {
      if (!address) return 0;
      const resp = await getWalletBalance(address!);
      return resp?.balance ? resp.balance / 1e9 : 0;
    },
    enabled: !!address,
    // select: (data) => (data?.balance ? data?.balance / 1e9 : 0),
    staleTime: 20000,
  });
}

export function useTransactionHistory(address?: string){
  return useQuery({
    queryKey: ["trxHistory", address],
    queryFn: async () => {
      if(!address) return 0;
      const resp = await getTransactionHistory(address!)
      return resp
    },
    enabled: !!address,
    staleTime: 1000,
  })
}

export function useCoinGeckoService(coin: string) {
  return useQuery<CoinGeckoTypes, unknown>({
    queryKey: ["coinPrice", coin],
    queryFn: async () => {
      if (!coin) return {usd : 0, change24h : 0};
      return getPriceEquivalent(coin)
    },
    enabled: !!coin,
    staleTime: 20000,
  });
}
