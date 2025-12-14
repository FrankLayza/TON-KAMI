import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Standard estimated fee for a simple TON transfer
const NETWORK_FEE = 0.0055;

export default function Send() {
  const [tonConnectUI] = useTonConnectUI();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch, // 1. Added watch to track input values
  } = useForm<SendFormData>();
  const [isLoading, setLoading] = useState(false);

  // 2. Watch the amount field to calculate total dynamically
  const amountValue = watch("amount");

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
          // Note: The fee is paid by the wallet ON TOP of this amount usually.
          // This amount is exactly what the recipient receives.
          amount: String(amount * 1e9),
        },
      ],
    };

    try {
      setLoading(true); // 3. Set loading BEFORE the await
      await tonConnectUI.sendTransaction(transact);
      console.log(transact);
    } catch (error) {
      console.error("Transaction failed : ", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to calculate total safely
  const totalAmount = (Number(amountValue || 0) + NETWORK_FEE).toFixed(4);

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
              step="0.0001"
              min={0.001}
              max={0.1}
              placeholder="Max 0.1 TON"
            />
            {errors.amount && (
              <p className="text-xs text-red-600">{errors.amount.message}</p>
            )}

            {/* 4. Network Fee & Total Inclusion Display */}
            <div className="flex flex-col gap-1 mt-2">
              <p className="text-xs text-muted-foreground italic">
                + {NETWORK_FEE} TON Network fee included
              </p>
              {amountValue > 0 && (
                <div className="flex justify-between items-center text-sm font-medium pt-1 border-t">
                  <span>Total Deduction:</span>
                  <span>{totalAmount} TON</span>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full font-medium cursor-pointer
          bg-secondary-accent text-secondary-accent-foreground
          hover:bg-secondary-accent/90 py-5 mt-4"
          >
            {isLoading ? <p>Sending...</p> : <p>Send</p>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
