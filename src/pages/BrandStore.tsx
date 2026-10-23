import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { FlowPage, FlowSuccess, FlowCard, PTS_PER_AED } from "@/components/FlowPage";

const stores: Record<string, { name: string; products: { id: string; name: string; aed: number }[] }> = {
  apple: {
    name: "Apple Store",
    products: [
      { id: "iphone", name: "iPhone 16 · 128 GB", aed: 3399 },
      { id: "ipad", name: "iPad Air · 11\"", aed: 2599 },
      { id: "watch", name: "Apple Watch SE", aed: 1099 },
      { id: "airpods", name: "AirPods Pro 2", aed: 999 },
    ],
  },
  samsung: {
    name: "Samsung Store",
    products: [
      { id: "s25", name: "Galaxy S25 · 256 GB", aed: 3199 },
      { id: "tab", name: "Galaxy Tab S10", aed: 2399 },
      { id: "watch", name: "Galaxy Watch 7", aed: 1199 },
      { id: "buds", name: "Galaxy Buds 3 Pro", aed: 799 },
    ],
  },
};

const BrandStore = () => {
  const { brand = "apple" } = useParams();
  const store = stores[brand] ?? stores.apple;
  const { user } = useUser();
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const product = store.products.find((p) => p.id === selected);
  const pts = product ? product.aed * PTS_PER_AED : 0;

  if (done && product)
    return (
      <FlowPage title={store.name}>
        <FlowSuccess
          title="Order placed!"
          lines={[product.name, `${pts.toLocaleString()} points redeemed`, "Delivery in 2–4 working days"]}
          onReset={() => { setDone(false); setSelected(null); }}
          resetLabel="Keep browsing"
        />
      </FlowPage>
    );

  return (
    <FlowPage title={store.name}>
      <div className="space-y-5 px-4 pb-8">
        <FlowCard title="Choose a product">
          <div className="grid grid-cols-2 gap-2">
            {store.products.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`rounded-xl border p-3 text-left transition-colors ${selected === p.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}
              >
                <p className="text-xs font-semibold text-card-foreground">{p.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">AED {p.aed.toLocaleString()}</p>
                <p className="text-[10px] text-primary">{(p.aed * PTS_PER_AED).toLocaleString()} pts</p>
              </button>
            ))}
          </div>
        </FlowCard>
        {product && (
          <FlowCard title="Summary">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Points required</span><span className="font-semibold text-primary">{pts.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Balance</span><span className="font-medium text-foreground">{user.availablePoints.toLocaleString()}</span></div>
            {pts > user.availablePoints && <p className="text-xs text-destructive">Not enough points. Top up the balance with cash at checkout.</p>}
            <Button className="w-full" size="lg" onClick={() => { setDone(true); toast.success("Order placed"); }}>
              {pts > user.availablePoints ? "Pay with points + cash" : "Redeem with points"}
            </Button>
          </FlowCard>
        )}
      </div>
    </FlowPage>
  );
};

export default BrandStore;
