import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
export default function TransactionHistory() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">TRANSACTION HISTORY</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          <p className="text-sm text-muted-foreground text-center py-8">
            NO TRANSACTIONS FOUND
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
