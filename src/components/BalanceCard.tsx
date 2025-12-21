import { Card, CardContent } from "@/components/ui/card";
import { useTonWallet } from "@tonconnect/ui-react";
import { useWalletBalance , useCoinGeckoService} from "@/hooks/useWalletDetails";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa"
import { useState } from "react";
export default function BalanceCard() {
  const [open, setOpen] = useState(false)
  const wallet = useTonWallet()
  const {data: balance } = useWalletBalance(wallet?.account?.address)
  const {data: coinPrice = {usd: 0, change24h: 0} } = useCoinGeckoService("the-open-network")
  const usdPriceOfTon = (coinPrice.usd ?? 0) * (balance ?? 0)
  return (
    <Card className="border-border/50 shadow-sm">
      <CardContent className="p-5 md:p-8">
        <div className="space-y-2">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
            <div className="flex items-baseline gap-3 flex-wrap">
              {open ? <h2 className="text-4xl md:text-3xl font-semibold tracking-tight">
                {balance && typeof balance === "number" ? balance.toFixed(4) : 0}
              </h2> : 
                <h2 className="text-3xl md:text-2xl font-semibold tracking-tight">*********</h2>
              }
              <span className="text-2xl md:text-2xl text-muted-foreground font-medium">
                TON
              </span>
              <button className="cursor-pointer" onClick={() => setOpen(!open)}>
               {open ? <FaRegEye className="size-5" /> : <FaRegEyeSlash className="size-5" />}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 items-center mt-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">USD VALUE</p>
              <p className="text-xl font-semibold">{usdPriceOfTon.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">24h change</p>
              <p className="text-xl font-semibold text-red-500">{coinPrice.change24h}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
