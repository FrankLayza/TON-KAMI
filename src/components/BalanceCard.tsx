import { Card, CardContent } from "@/components/ui/card";
export default function BalanceCard() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardContent className="p-5 md:p-8">
        <div className="space-y-2">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                3000
              </h2>
              <span className="text-2xl md:text-3xl text-muted-foreground font-medium">
                TON
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 items-center">
            <div>
              <p>USD VALUE</p>
              <p>$2222</p>
            </div>
            <div>
              <p>24h change</p>
              <p>-3.22%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
