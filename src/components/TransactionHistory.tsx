import { useTransactionHistory } from "@/hooks/useWalletDetails";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useTonWallet } from "@tonconnect/ui-react";
export default function TransactionHistory() {
  const wallet = useTonWallet();
  const { data: trxHistory } = useTransactionHistory(wallet?.account?.address);

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">TRANSACTION HISTORY</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {trxHistory && trxHistory.length > 0 ? (
            <>
              <div className="flex items-center justify-between my-3 font-semibold text-sm text-muted-foreground border-b pb-2">
                <p>VALUE</p>
                <p>DATE</p>
                <p>TYPE</p>
                <p>TX</p>
              </div>
              {trxHistory.flatMap(
                (event, eventIdx) =>
                  event?.actions
                    ?.filter((action) => action?.TonTransfer)
                    .map((action, actionIdx) => {
                      const ton = action?.TonTransfer;
                      const amount = ton ? (ton.amount / 1e9).toFixed(9) : "0";
                      const date = new Date(
                        event?.timestamp * 1000
                      ).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      });
                      return (
                        <div
                          key={`${eventIdx}-${actionIdx}`}
                          className="flex items-center justify-between py-2 border-b last:border-b-0"
                        >
                          <p>{amount} TON</p>
                          <p>{date}</p>
                          <p className="text-center">TonTransfer</p>
                          <p className="truncate max-w-[120px] text-blue-600 underline cursor-pointer text-center">
                            {event?.event_id?.slice(0, 8)}...
                            {event?.event_id?.slice(-6)}
                          </p>
                        </div>
                      );
                    }) || []
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              NO TRANSACTIONS FOUND
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
