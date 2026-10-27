import { useMemo, useState } from "react";
import AppleLogo from "@/components/AppleLogo";
import { Check, CreditCard, Coins, Layers, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useUser } from "@/contexts/UserContext";
import { fmtCash, fmtPts, type PaymentMode, type PaymentResult } from "@/lib/pricing";
import BottomAction from "./BottomAction";

interface PaymentStepProps {
  rows?: { label: string; value: string }[];
  totalPoints: number;
  totalCash: number;
  onConfirm: (result: PaymentResult) => void;
  /** "booking" or "order" — only used in wording. */
  noun?: string;
}

const METHODS = ["Card", "mada", "Apple Pay"] as const;
type Method = (typeof METHODS)[number];

const digits = (v: string) => v.replace(/\D/g, "");
const groupCard = (v: string) => digits(v).slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
const fmtExpiry = (v: string) => {
  const d = digits(v).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

/**
 * Checkout payment: pay with points, pay with cash, or split between the two.
 * The cash value of a point comes from the item itself (totalCash / totalPoints).
 */
const PaymentStep = ({ rows, totalPoints, totalCash, onConfirm, noun = "booking" }: PaymentStepProps) => {
  const { user } = useUser();
  const balance = user.availablePoints;
  const enoughForPoints = balance >= totalPoints;
  const maxSplitPoints = Math.min(balance, totalPoints);
  const ratio = totalPoints > 0 ? totalCash / totalPoints : 0;

  const [mode, setMode] = useState<PaymentMode>(enoughForPoints ? "points" : "split");
  const [splitPoints, setSplitPoints] = useState(Math.floor(maxSplitPoints / 2));
  const [method, setMethod] = useState<Method>("Card");
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [agreed, setAgreed] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const pointsUsed = mode === "points" ? totalPoints : mode === "cash" ? 0 : splitPoints;
  const cashPaid = useMemo(() => {
    if (mode === "points") return 0;
    if (mode === "cash") return totalCash;
    return Math.max(0, Math.round((totalCash - splitPoints * ratio) * 100) / 100);
  }, [mode, totalCash, splitPoints, ratio]);

  const needsCard = cashPaid > 0 && method !== "Apple Pay";
  const errors = {
    name: !card.name.trim() ? "Enter the name on the card" : "",
    number: digits(card.number).length < 16 ? "Enter the 16-digit card number" : "",
    expiry: !/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry) ? "Use MM/YY" : "",
    cvv: !/^\d{3,4}$/.test(card.cvv) ? "3 or 4 digits" : "",
  };
  const cardValid = !needsCard || !Object.values(errors).some(Boolean);

  const label =
    mode === "points" ? `Pay ${fmtPts(pointsUsed)}` : mode === "cash" ? `Pay ${fmtCash(cashPaid)}` : `Pay ${fmtPts(pointsUsed)} + ${fmtCash(cashPaid)}`;
  const modeOk = mode === "points" ? enoughForPoints : mode === "split" ? splitPoints > 0 && splitPoints < totalPoints : true;

  const submit = () => {
    setShowErrors(true);
    if (!agreed || !modeOk || !cardValid) return;
    onConfirm({ mode, pointsUsed, cashPaid });
  };

  const options: { id: PaymentMode; title: string; sub: string; value: string; icon: typeof Coins; disabled?: boolean; note?: string }[] = [
    {
      id: "points",
      title: "Pay with points",
      sub: `Balance ${fmtPts(balance)}`,
      value: fmtPts(totalPoints),
      icon: Coins,
      disabled: !enoughForPoints,
      note: !enoughForPoints ? `Short by ${fmtPts(totalPoints - balance)}` : undefined,
    },
    { id: "cash", title: "Pay with cash", sub: "Card, mada or Apple Pay", value: fmtCash(totalCash), icon: CreditCard },
    { id: "split", title: "Pay with cash + points", sub: "Use some points, pay the rest by card", value: "You choose", icon: Layers },
  ];

  const field = "mt-1 h-11 w-full rounded-[10px] border border-[#CFCBD0] bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary";
  const err = (k: keyof typeof errors) => showErrors && needsCard && errors[k] && <p className="mt-1 text-[11px] text-destructive">{errors[k]}</p>;

  return (
    <>
      <div className="space-y-6 px-5 pb-48 pt-5">
        {rows && rows.length > 0 && (
          <section>
            <h2 className="text-[15px] font-bold text-foreground">{noun === "order" ? "Order summary" : "Booking summary"}</h2>
            <div className="mt-3 divide-y divide-border border-y border-border">
              {rows.map((r) => (
                <div key={r.label} className="flex items-start justify-between gap-4 py-3 text-[14px]">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="text-right font-medium text-foreground">{r.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl bg-[#ECE8E3] p-4">
          <p className="text-[12px] text-muted-foreground">Total</p>
          <p className="mt-0.5 text-[24px] font-bold leading-tight tabular-nums text-foreground">
            {fmtPts(totalPoints)} <span className="text-[15px] font-semibold text-muted-foreground">or {fmtCash(totalCash)}</span>
          </p>
        </section>

        {/* Payment method options */}
        <section>
          <h2 className="text-[15px] font-bold text-foreground">How would you like to pay?</h2>
          <div role="radiogroup" className="mt-3 space-y-3">
            {options.map((o) => {
              const active = mode === o.id;
              return (
                <button
                  key={o.id}
                  role="radio"
                  aria-checked={active}
                  disabled={o.disabled}
                  onClick={() => setMode(o.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                    active ? "border-primary bg-primary/5" : "border-transparent bg-[#F1EEEA] hover:bg-[#E9E5E0]"
                  } ${o.disabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${active ? "bg-primary text-primary-foreground" : "bg-background text-foreground/70"}`}>
                    <o.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-foreground">{o.title}</span>
                    <span className="block text-[12px] text-muted-foreground">{o.note ?? o.sub}</span>
                  </span>
                  <span className="text-right">
                    <span className="block text-[13px] font-bold tabular-nums text-foreground">{o.value}</span>
                    <span className={`ml-auto mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${active ? "border-primary bg-primary" : "border-[#CFCBD0]"}`}>
                      {active && <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Points: balance breakdown */}
        {mode === "points" && (
          <section className="rounded-2xl bg-[#ECE8E3] p-4 text-[13px]">
            <div className="flex justify-between"><span className="text-muted-foreground">Points to redeem</span><span className="font-bold tabular-nums text-primary">{fmtPts(totalPoints)}</span></div>
            <div className="mt-1 flex justify-between"><span className="text-muted-foreground">Your balance</span><span className="tabular-nums">{fmtPts(balance)}</span></div>
            <div className="mt-1 flex justify-between"><span className="text-muted-foreground">Balance after {noun}</span><span className="tabular-nums">{fmtPts(balance - totalPoints)}</span></div>
          </section>
        )}

        {/* Split: choose how many points to use */}
        {mode === "split" && (
          <section className="rounded-2xl bg-[#ECE8E3] p-4">
            <div className="flex items-baseline justify-between">
              <h3 className="text-[14px] font-bold text-foreground">Points to use</h3>
              <span className="text-[12px] text-muted-foreground">Balance {fmtPts(balance)}</span>
            </div>
            <p className="mt-2 text-[28px] font-bold tabular-nums text-primary">{splitPoints.toLocaleString()}<span className="ml-1 text-[14px] font-semibold text-muted-foreground">pts</span></p>
            <Slider
              className="mt-3"
              min={0}
              max={Math.max(maxSplitPoints, 1)}
              step={Math.max(1, Math.round(totalPoints / 200))}
              value={[splitPoints]}
              onValueChange={(v) => setSplitPoints(v[0])}
              aria-label="Points to use"
            />
            <div className="mt-3 flex gap-2">
              {[0.25, 0.5, 0.75, 1].map((f) => {
                const v = Math.floor(maxSplitPoints * f);
                return (
                  <button
                    key={f}
                    onClick={() => setSplitPoints(v)}
                    className={`h-8 flex-1 rounded-full border text-[12px] font-semibold ${splitPoints === v ? "border-primary bg-primary/10 text-primary" : "border-transparent bg-background text-foreground/70"}`}
                  >
                    {f === 1 ? "Max" : `${f * 100}%`}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-[13px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Points applied</span><span className="tabular-nums">{fmtPts(splitPoints)} <span className="text-muted-foreground">(− {fmtCash(Math.round(splitPoints * ratio * 100) / 100)})</span></span></div>
              <div className="flex justify-between"><span className="font-semibold text-foreground">Pay by card</span><span className="font-bold tabular-nums text-foreground">{fmtCash(cashPaid)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Balance after {noun}</span><span className="tabular-nums">{fmtPts(balance - splitPoints)}</span></div>
            </div>
            {showErrors && !modeOk && <p className="mt-2 text-[12px] text-destructive">Choose how many points to use, more than 0 and less than the full amount.</p>}
          </section>
        )}

        {/* Cash: method and card details */}
        {(mode === "cash" || mode === "split") && cashPaid > 0 && (
          <section>
            <h2 className="text-[15px] font-bold text-foreground">Payment details</h2>
            <div className="mt-3 flex gap-2">
              {METHODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`h-10 flex-1 rounded-[10px] border text-[13px] font-semibold ${method === m ? "border-primary bg-primary/10 text-primary" : "border-transparent bg-[#F1EEEA] text-foreground/70"}`}
                >
                  {m === "Apple Pay" ? <span className="inline-flex items-center gap-1"><AppleLogo className="h-3.5 w-3.5" /> Pay</span> : m}
                </button>
              ))}
            </div>
            {method === "Apple Pay" ? (
              <p className="mt-4 rounded-xl bg-[#F1EEEA] p-4 text-[13px] leading-relaxed text-muted-foreground">
                You'll confirm {fmtCash(cashPaid)} with Face ID or Touch ID when you tap pay.
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Name on card</label>
                  <input className={field} value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="As shown on the card" autoComplete="cc-name" />
                  {err("name")}
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Card number</label>
                  <input className={field} inputMode="numeric" value={card.number} onChange={(e) => setCard({ ...card, number: groupCard(e.target.value) })} placeholder="0000 0000 0000 0000" autoComplete="cc-number" />
                  {err("number")}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Expiry</label>
                    <input className={field} inputMode="numeric" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: fmtExpiry(e.target.value) })} placeholder="MM/YY" autoComplete="cc-exp" />
                    {err("expiry")}
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">CVV</label>
                    <input className={field} inputMode="numeric" type="password" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: digits(e.target.value).slice(0, 4) })} placeholder="•••" autoComplete="cc-csc" />
                    {err("cvv")}
                  </div>
                </div>
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Lock className="h-3 w-3" /> Prototype only. No payment is processed and nothing is stored.</p>
              </div>
            )}
          </section>
        )}

        <label className="flex cursor-pointer items-start gap-3 text-[13px] text-foreground/70">
          <Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(Boolean(v))} className="mt-0.5" />
          <span>I have reviewed the {noun} details and agree to the cancellation policy and terms of use.</span>
        </label>
        {showErrors && !agreed && <p className="-mt-3 text-[12px] text-destructive">Please accept the terms to continue.</p>}
      </div>
      <BottomAction label={label} onClick={submit} disabled={mode === "points" && !enoughForPoints} />
    </>
  );
};

export default PaymentStep;
