import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Gift, Mail, ShieldCheck, Zap } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const catalog: Record<string, { name: string; category: string; blurb: string }> = {
  "iconic": { name: "Iconic", category: "Fashion & Lifestyle", blurb: "Curated fashion and lifestyle across the region's most-loved storefronts." },
  "urban-home": { name: "Urban Home", category: "Home & Living", blurb: "Refined homeware, furniture and decor from a single voucher." },
  "happy-card": { name: "Happy Card", category: "Fashion & Lifestyle", blurb: "One card, dozens of premium brands under a single group." },
  "decathlon": { name: "Decathlon KSA", category: "Sport & Outdoor", blurb: "Everything for the field, court and open road." },
  "espace-maison": { name: "Espace Maison", category: "Home & Kitchen", blurb: "Interiors, garden and DIY across Espace Maison stores." },
  "le-connoisseur": { name: "Le Connoisseur", category: "Dining", blurb: "A private table across Le Connoisseur restaurants." },
  "dominos": { name: "Domino's Pizza MRU", category: "Dining", blurb: "Delivered, hot, whenever the evening calls for it." },
  "swype-visa": { name: "Swype Global Virtual VISA", category: "Prepaid", blurb: "A virtual VISA accepted anywhere Visa is — worldwide." },
  "paypal-usd": { name: "PayPal International — USD", category: "Prepaid", blurb: "Top up your PayPal balance in USD, instantly." },
  "playstation": { name: "PlayStation Network", category: "Gaming & Entertainment", blurb: "Games, add-ons and PS Plus, straight to your account." },
};

const denominations = [5000, 10000, 25000, 50000, 100000, 250000];

const GiftCardDetail = () => {
  const navigate = useNavigate();
  const { slug = "" } = useParams();
  const { user } = useUser();
  const card = catalog[slug];

  const [amount, setAmount] = useState<number>(10000);
  const [recipient, setRecipient] = useState("");
  const [step, setStep] = useState<"select" | "success">("select");

  const pointsNeeded = amount;
  const canAfford = user.availablePoints >= pointsNeeded;

  if (!card) {
    return (
      <div className="mx-auto min-h-screen max-w-md flex items-center justify-center">
        <button onClick={() => navigate("/gift-cards")} className="text-[11px] uppercase tracking-[0.24em]" style={{ color: "#02AD4C" }}>
          ← Back to gift cards
        </button>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="mx-auto min-h-screen max-w-md pb-24 px-6 pt-6">
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "#302F2D" }}>
            <Check className="h-6 w-6" style={{ color: "#02AD4C" }} strokeWidth={1.5} />
          </div>
          <p className="mt-6 text-[10px] uppercase tracking-[0.28em]" style={{ color: "rgba(2, 173, 76,0.7)" }}>
            Redemption confirmed
          </p>
          <h1 className="mt-3 text-[26px] leading-tight text-foreground" style={{ fontWeight: 300 }}>
            Your {card.name} card<br />is on its way.
          </h1>
          <span aria-hidden className="mt-5 block h-px" style={{ width: 60, backgroundColor: "#02AD4C" }} />
          <p className="mt-6 text-[13px] leading-relaxed text-foreground/60 max-w-[300px]">
            Your gift card is delivered to {recipient || "your registered email"} within moments. A copy is filed under your orders.
          </p>

          <div className="mt-10 w-full rounded-md bg-card border border-[#E8E8EE] p-6" style={{ boxShadow: "0 2px 12px rgba(2, 173, 76,0.06)" }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.24em] text-foreground/50">Points debited</span>
              <span className="text-[13px] tabular-nums" style={{ color: "#02AD4C", fontWeight: 500 }}>
                {pointsNeeded.toLocaleString()} PTS
              </span>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-3">
            <button
              onClick={() => navigate("/orders")}
              className="w-full rounded-md py-4 text-[11px] uppercase tracking-[0.24em] text-primary-foreground transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#302F2D" }}
            >
              View in orders
            </button>
            <button
              onClick={() => navigate("/gift-cards")}
              className="w-full py-3 text-[11px] uppercase tracking-[0.24em] text-foreground/60 hover:text-foreground transition-colors"
            >
              Back to gift cards
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-md pb-32">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 pt-6 pb-4">
        <button
          onClick={() => navigate("/gift-cards")}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E8EE] text-foreground hover:bg-card transition-colors"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.25} />
        </button>
        <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">Gift card</p>
      </div>

      {/* Hero card */}
      <div className="px-6">
        <div
          className="relative overflow-hidden rounded-md px-7 py-10"
          style={{ backgroundColor: "#302F2D" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "#02AD4C" }} />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full border border-[hsl(0_0%_100%/0.06)]" />
          <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "#02AD4C" }}>{card.category}</p>
          <h1 className="mt-4 text-[30px] leading-[1.1] text-[hsl(0_0%_100%)]" style={{ fontWeight: 200 }}>{card.name}</h1>
          <p className="mt-5 max-w-[300px] text-[13px] leading-relaxed text-[hsl(0_0%_100%/0.6)]">{card.blurb}</p>
          <div className="mt-8 flex items-baseline gap-2">
            <span className="text-[38px] leading-none tabular-nums text-[hsl(0_0%_100%)]" style={{ fontWeight: 200 }}>
              {amount.toLocaleString()}
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "#02AD4C" }}>PTS</span>
          </div>
        </div>
      </div>

      {/* Denomination */}
      <section className="px-6 mt-10">
        <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">Choose denomination</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {denominations.map((d) => {
            const active = amount === d;
            return (
              <button
                key={d}
                onClick={() => setAmount(d)}
                className={`rounded-md border py-3.5 text-[13px] tabular-nums transition-all ${
                  active
                    ? "text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground bg-card"
                }`}
                style={{
                  backgroundColor: active ? "#302F2D" : undefined,
                  borderColor: active ? "#302F2D" : "#E8E8EE",
                  fontWeight: 400,
                }}
              >
                {d.toLocaleString()} pts
              </button>
            );
          })}
        </div>
      </section>

      {/* Recipient */}
      <section className="px-6 mt-10">
        <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">Deliver to</p>
        <div className="mt-4 flex items-center gap-3 border-b border-[#E8E8EE] pb-3">
          <Mail className="h-4 w-4 text-foreground/40" strokeWidth={1.25} />
          <input
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="recipient@email.com"
            className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-foreground/35 outline-none"
          />
        </div>
        <p className="mt-2 text-[11px] text-foreground/45">Leave blank to send to your own registered email.</p>
      </section>

      {/* Summary */}
      <section className="mx-6 mt-10 rounded-md bg-card border border-[#E8E8EE] p-6" style={{ boxShadow: "0 2px 12px rgba(2, 173, 76,0.06)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/50">Points required</span>
          <span className="text-[15px] tabular-nums" style={{ color: "#02AD4C", fontWeight: 500 }}>
            {pointsNeeded.toLocaleString()} PTS
          </span>
        </div>
        <div className="my-4 h-px bg-[#E8E8EE]" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/50">Available balance</span>
          <span className="text-[13px] text-foreground/70 tabular-nums">{user.availablePoints.toLocaleString()} PTS</span>
        </div>
      </section>

      {/* Trust row */}
      <div className="px-6 mt-6 grid grid-cols-3 gap-4 text-center">
        {[
          { icon: Zap, label: "Instant delivery" },
          { icon: ShieldCheck, label: "Secure by Safqah" },
          { icon: Gift, label: "No expiry" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Icon className="h-4 w-4 text-foreground/60" strokeWidth={1.25} />
            <span className="text-[10px] uppercase tracking-[0.16em] text-foreground/50 leading-tight">{label}</span>
          </div>
        ))}
      </div>

      {/* Fixed CTA */}
      <div
        className="fixed bottom-[56px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-background px-5 pb-4 pt-3"
      >
        <button
          disabled={!canAfford}
          onClick={() => setStep("success")}
          className="h-[52px] w-full rounded-xl bg-primary text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {canAfford ? `Redeem for ${pointsNeeded.toLocaleString()} pts` : "Insufficient points"}
        </button>
      </div>
    </div>
  );
};

export default GiftCardDetail;