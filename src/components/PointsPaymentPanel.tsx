import { useState } from "react";
import { Check, CreditCard, ShieldCheck, Trophy } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export const USER_POINTS = 24580;

export const BANK_CARDS = [
  { id: "flex", name: "Safqah Infinite Card", earnRate: 1.5, color: "from-slate-800 to-slate-950", badge: "💎" },
  { id: "flex-elite", name: "Safqah Signature Card", earnRate: 1.25, color: "from-indigo-700 to-purple-900", badge: "∞" },
];

export interface PaymentResult {
  pointsUsed: number;
  cashAmount: number;
  earnedPoints: number;
  cardName: string;
}

type PaymentMode = "points" | "cash" | "mix";

interface Props {
  priceAed: number;
  pointsPrice: number;
  lineLabel: string;
  ctaLabel?: string;
  note?: string;
  onConfirm: (result: PaymentResult) => void;
}

const PointsPaymentPanel = ({ priceAed, pointsPrice, lineLabel, ctaLabel = "Confirm & Book", note, onConfirm }: Props) => {
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("mix");
  const [pointsPercentage, setPointsPercentage] = useState(50);
  const [selectedCard, setSelectedCard] = useState(BANK_CARDS[0]);

  const pointsUsed =
    paymentMode === "points" ? pointsPrice : paymentMode === "cash" ? 0 : Math.round(pointsPrice * (pointsPercentage / 100));
  const cashAmount =
    paymentMode === "points" ? 0 : paymentMode === "cash" ? priceAed : Math.round(priceAed * ((100 - pointsPercentage) / 100) * 100) / 100;
  const earnedPoints = Math.round(cashAmount * selectedCard.earnRate);

  return (
    <>
      <div className="mx-4 mt-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Pay with</h3>
        <div className="grid grid-cols-3 gap-2">
          {(["points", "cash", "mix"] as PaymentMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setPaymentMode(mode)}
              className={cn(
                "rounded-xl border py-3 text-xs font-semibold transition-all",
                paymentMode === mode
                  ? "scale-[1.02] border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              )}
            >
              {mode === "points" ? "Points" : mode === "cash" ? "Card" : "Points + Card"}
            </button>
          ))}
        </div>
      </div>

      {paymentMode === "mix" && (
        <div className="mx-4 mt-4 animate-fade-in rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">Points</span>
            <span className="text-xs font-semibold text-foreground">Card</span>
          </div>
          <Slider value={[pointsPercentage]} onValueChange={(v) => setPointsPercentage(v[0])} max={100} min={0} step={10} className="mb-3" />
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-primary">{pointsUsed.toLocaleString()} Points ({pointsPercentage}%)</span>
            <span className="font-semibold text-foreground">SAR {cashAmount.toFixed(2)} ({100 - pointsPercentage}%)</span>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">Available: {USER_POINTS.toLocaleString()} Points</p>
        </div>
      )}

      {paymentMode === "points" && (
        <div className="mx-4 mt-4 animate-fade-in rounded-2xl border border-border bg-card p-4">
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-muted-foreground">Points required</span>
            <span className="font-bold text-foreground">{pointsPrice.toLocaleString()} Points</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Available balance</span>
            <span className="font-medium text-primary">{USER_POINTS.toLocaleString()} Points</span>
          </div>
        </div>
      )}

      {(paymentMode === "cash" || paymentMode === "mix") && cashAmount > 0 && (
        <div className="mx-4 mt-4 animate-fade-in">
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground">
            <CreditCard className="h-3.5 w-3.5" /> Select card
          </h3>
          <div className="space-y-2.5">
            {BANK_CARDS.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={cn(
                  "w-full rounded-2xl border p-4 text-left transition-all",
                  selectedCard.id === card.id ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:border-primary/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("flex h-9 w-14 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white shadow-sm", card.color)}>
                    {card.badge}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{card.name}</p>
                    <p className="mt-0.5 text-xs font-medium text-primary">Earn {card.earnRate} Points per SAR spent</p>
                  </div>
                  {selectedCard.id === card.id && (
                    <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          {earnedPoints > 0 && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
              <Trophy className="h-4 w-4 shrink-0 text-primary" />
              <p className="text-xs font-medium text-primary">
                You'll earn <strong>{earnedPoints.toLocaleString()} Points</strong> on SAR {cashAmount.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mx-4 mt-4 rounded-2xl border border-border bg-card p-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">Order summary</h3>
        <div className="flex justify-between py-1 text-sm">
          <span className="text-muted-foreground">{lineLabel}</span>
          <span className="font-semibold text-foreground">SAR {priceAed.toLocaleString()}</span>
        </div>
        {pointsUsed > 0 && (
          <div className="flex justify-between py-1 text-sm">
            <span className="text-muted-foreground">Paid with Points</span>
            <span className="font-semibold text-primary">-{pointsUsed.toLocaleString()} Points</span>
          </div>
        )}
        <div className="my-1.5 h-px bg-border" />
        <div className="flex justify-between py-1 text-sm">
          <span className="font-semibold text-foreground">Total</span>
          <span className="font-bold text-foreground">
            {pointsUsed > 0 && `${pointsUsed.toLocaleString()} Points`}
            {pointsUsed > 0 && cashAmount > 0 && " + "}
            {cashAmount > 0 && `SAR ${cashAmount.toFixed(2)}`}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" /> {note ?? "Secure checkout · Free cancellation within 24h"}
        </div>
      </div>

      <div className="fixed bottom-[56px] left-1/2 w-full max-w-md -translate-x-1/2 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl">
        <button
          onClick={() => onConfirm({ pointsUsed, cashAmount, earnedPoints, cardName: selectedCard.name })}
          className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.99]"
        >
          {ctaLabel}
        </button>
      </div>
    </>
  );
};

export default PointsPaymentPanel;