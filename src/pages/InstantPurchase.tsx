import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { FlowPage, FlowSuccess, FlowCard, PTS_PER_AED } from "@/components/FlowPage";

const merchants = ["Carrefour", "noon", "Talabat", "Amazon", "Costa Coffee", "Lulu"];

const InstantPurchase = () => {
  const { user } = useUser();
  const [merchant, setMerchant] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [done, setDone] = useState(false);
  const aed = Number(amount) || 0;
  const pts = aed * PTS_PER_AED;
  const canPay = merchant && aed > 0 && pts <= user.availablePoints;
  const reset = () => { setDone(false); setMerchant(null); setAmount(""); };

  if (done)
    return (
      <FlowPage title="Instant Purchase">
        <FlowSuccess title="Payment complete" lines={[`AED ${aed} paid at ${merchant}`, `${pts.toLocaleString()} points redeemed`]} onReset={reset} resetLabel="Make another payment" />
      </FlowPage>
    );

  return (
    <FlowPage title="Instant Purchase">
      <div className="space-y-5 px-4 pb-8">
        <FlowCard title="Pay at">
          <div className="grid grid-cols-3 gap-2">
            {merchants.map((m) => (
              <button key={m} onClick={() => setMerchant(m)} className={`rounded-xl border p-3 text-xs font-medium ${merchant === m ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}>{m}</button>
            ))}
          </div>
        </FlowCard>
        {merchant && (
          <FlowCard title="Bill amount (AED)">
            <Input type="number" inputMode="decimal" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Points required</span><span className="font-semibold text-primary">{pts.toLocaleString()}</span></div>
            {pts > user.availablePoints && <p className="text-xs text-destructive">Amount exceeds your available points.</p>}
            <Button className="w-full" size="lg" disabled={!canPay} onClick={() => { setDone(true); toast.success("Payment complete"); }}>Pay with points</Button>
          </FlowCard>
        )}
      </div>
    </FlowPage>
  );
};

export default InstantPurchase;
