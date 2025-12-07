import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Send() {
  const [tonnConnectUI] = useTonConnectUI();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SendFormData>();
  const [isLoading, setLoading] = useState(false);

  interface SendFormData {
    address: string;
    amount: number;
  }

  const handleSend = async (data: SendFormData) => {
    const { amount, address } = data;
    if (!address.trim()) return;
    const transact = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address,
          amount: String(amount * 1e9),
        },
      ],
    };
    try {
      await tonnConnectUI.sendTransaction(transact);
      setLoading(true);
      console.log(transact);
    } catch (error) {
      console.error("Transaction failed : ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">SEND TON</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(handleSend)} className="space-y-2">
          <div className="space-y-2 mb-4">
            <Label>Recipient Address</Label>
            <Input
              {...register("address", {
                required: "Recipient Address is required",
              })}
              type="string"
              placeholder="Enter the recipient's address"
            />
            {errors.address && (
              <p className="text-xs text-red-600">{errors.address.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              {...register("amount", { required: "Amount is required" })}
              type="number"
              min={0.001}
              max={0.1}
              placeholder="Max 0.1 TON"
            />
            {errors.amount && (
              <p className="text-xs text-red-600">{errors.amount.message}</p>
            )}
          </div>
          <Button
            className="w-full font-medium cursor-pointer
          bg-secondary-accent text-secondary-accent-foreground
          hover:bg-secondary-accent/90 py-5"
          >
            {isLoading ? <p>Sending...</p> : <p>Send</p>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
