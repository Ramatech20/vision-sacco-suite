import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { transferFunds } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TransferFormProps {
  onSuccess?: () => void;
}

export default function TransferForm({ onSuccess }: TransferFormProps) {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  // Remove local error/success state, use toast instead

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await transferFunds({ fromAccountId, toAccountId, amount: Number(amount) });
      toast.success("Transfer successful!");
      setFromAccountId("");
      setToAccountId("");
      setAmount("");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-card">
      <CardHeader>
        <CardTitle>Transfer Funds</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="From Account ID"
            value={fromAccountId}
            onChange={e => setFromAccountId(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="To Account ID"
            value={toAccountId}
            onChange={e => setToAccountId(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            min={1}
          />
          {/* Feedback handled by toast notifications */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Transferring..." : "Transfer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
