import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useTonContext } from "@/context/TonContext";
export default function TransactionHistory() {
  const { trxHistory } = useTonContext();
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">TRANSACTION HISTORY</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {trxHistory ? (
            <div className="flex items-center justify-between my-3">
              <p>VALUE</p>
              <p>DATE</p>
              <p>TYPE</p>
              <p>TX</p>
            {Array.isArray(trxHistory) && trxHistory.map((event, eventIdx) => event?.actions?.map((action, actionIdx) => {
              const ton = action?.TonTransfer
              const amount = ton? (ton.amount / 1e9).toFixed(9) : "0"
            }))}
            </div>
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
