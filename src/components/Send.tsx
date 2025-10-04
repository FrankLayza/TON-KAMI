import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function Send() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">SEND TON</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Recipient Address</Label>
          <Input />
        </div>

        <div className="space-y-2">
          <Label>Recipient Address</Label>
          <Input
            type="number"
            min={0.001}
            max={0.1}
            placeholder="Max 0.1 TON"
          />
        </div>

        <Button
          className="w-full font-medium cursor-pointer 
        bg-secondary-accent text-secondary-accent-foreground 
        hover:bg-secondary-accent/90"
        >
          Send
        </Button>
      </CardContent>
    </Card>
  );
}
