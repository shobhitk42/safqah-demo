import { useMemo, useState } from "react";
import { cashOf, fmtCash, priceText, STOREFRONT_RATE, type PaymentResult } from "@/lib/pricing";
import PaymentStep from "@/components/booking/PaymentStep";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import BookingHeader from "@/components/booking/BookingHeader";
import { makeReference } from "@/components/booking/hotelData";
import { useBookings } from "@/contexts/BookingsContext";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronDown, Coins, Mail } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { findLive, giftCategoryLabel } from "@/data/live";

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

const defaultDenominations = [5000, 10000, 25000, 50000, 100000, 250000];

const GiftCardDetail = () => {
  const navigate = useNavigate();
  const { slug = "" } = useParams();
  const { user } = useUser();
  const liveCard = findLive("giftcards", slug);
  const card = catalog[slug] ?? (liveCard && { name: liveCard.name, category: giftCategoryLabel(liveCard.category), blurb: liveCard.description });
  const denominations = liveCard?.pointsOptions.length ? liveCard.pointsOptions : defaultDenominations;

  const [picked, setPicked] = useState<number | null>(null);
  const [recipient, setRecipient] = useState("");
  const [step, setStep] = useState<"select" | "payment" | "success">("select");
  const { addBooking } = useBookings();
  const { addItem, items } = useCart();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [payment, setPayment] = useState<PaymentResult>({ mode: "points", pointsUsed: 0, cashPaid: 0 });
  const [reference, setReference] = useState("");

  const amount = picked ?? denominations[Math.min(1, denominations.length - 1)];
  const setAmount = setPicked;
  const pointsNeeded = amount;

  if (!card) {
    return (
      <div className="mx-auto min-h-screen max-w-md flex items-center justify-center">
        <button onClick={() => navigate("/gift-cards")} className="text-[11px] uppercase tracking-[0.24em]" style={{ color: "#02AD4C" }}>
          ← Back to gift cards
        </button>
      </div>
    );
  }

  if (step === "payment") {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background">
        <BookingHeader title="Payment" onBack={() => setStep("select")} steps={["Gift card", "Payment"]} current={1} />
        <PaymentStep
          noun="order"
          totalPoints={pointsNeeded}
          totalCash={cashOf(pointsNeeded, STOREFRONT_RATE)}
          rows={[
            { label: "Gift card", value: card.name },
            { label: "Delivered to", value: recipient || "Your registered email" },
          ]}
          onConfirm={(result) => {
            const ref = makeReference("GFT");
            addBooking({
              item: `${card.name} gift card`,
              category: "Gift Cards",
              points: result.pointsUsed,
              cashPaid: result.cashPaid,
              date: new Date().toLocaleDateString("en-GB"),
              status: "Delivered",
              meta: ref,
            });
            setPayment(result);
            setReference(ref);
            setStep("success");
          }}
        />
      </div>
    );
  }

  if (step === "success") {
    return (
      <BookingConfirmation
        noun="Order"
        heading="Order confirmed"
        reference={reference}
        email={recipient}
        payment={payment}
        balanceAfter={user.availablePoints - payment.pointsUsed}
        rows={[
          { label: "Gift card", value: card.name },
          { label: "Value", value: priceText(pointsNeeded, STOREFRONT_RATE) },
          { label: "Delivery", value: "Within moments" },
        ]}
      />
    );
  }

  const delivery = liveCard?.delivery === "delayed" ? `Delivery in ${liveCard.deliveryDays} days` : "Instant delivery";
  const useMode = liveCard && /online/i.test(liveCard.redemption) ? "Online use" : "In-store use";
  const chips = [delivery, useMode, liveCard?.currency ?? "SAR"];
  const validity = liveCard?.terms.match(/Valid for ([^.]+)\./)?.[1];

  const inCart = items.some((i) => i.id === `${slug}-${amount}`);

  const handleAddToCart = () => {
    addItem({ id: `${slug}-${amount}`, name: `${card.name} · ${amount.toLocaleString()}`, image: liveCard?.image ?? "", points: pointsNeeded, price: cashOf(pointsNeeded, STOREFRONT_RATE) });
    toast.success("Added to cart", { description: card.name, duration: 1800 });
  };

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={() => navigate("/gift-cards")} aria-label="Back" className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Gift card</p>
        <span className="flex items-center gap-1.5 rounded-full bg-[#ECE8E3] px-3 py-1.5 text-[13px] font-semibold tabular-nums text-foreground">
          <Coins className="h-3.5 w-3.5 text-primary" /> {user.availablePoints.toLocaleString()}
        </span>
      </div>

      {/* Brand tile */}
      <div className="px-4">
        <div className="flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-8">
          {liveCard?.image ? (
            <img src={liveCard.image} alt={card.name} className="max-h-full max-w-full object-contain" />
          ) : (
            <p className="text-center text-[26px] font-bold text-foreground">{card.name}</p>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="px-4 pt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{card.category}</p>
        <h1 className="mt-1 text-[26px] font-bold leading-tight text-foreground">{card.name}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className="rounded-full bg-foreground px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-background">{c}</span>
          ))}
        </div>
      </div>

      {/* Denomination + points */}
      <div className="mt-8 grid grid-cols-[1fr_auto] items-end gap-3 px-4">
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Denomination</label>
          <div className="relative mt-2">
            <select
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="h-14 w-full appearance-none rounded-xl border border-[#CFCBD0] bg-background px-4 pr-10 text-[15px] font-medium text-foreground outline-none focus:border-primary"
            >
              {denominations.map((d) => (
                <option key={d} value={d}>{liveCard?.currency ?? "SAR"} {cashOf(d, STOREFRONT_RATE).toLocaleString()}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <div className="min-w-[132px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Points required</p>
          <div className="mt-2 flex h-14 flex-col items-center justify-center rounded-xl border border-primary/50 bg-primary/5">
            <span className="text-[17px] font-bold leading-none tabular-nums text-primary">{pointsNeeded.toLocaleString()} pts</span>
            <span className="mt-1 text-[10px] text-muted-foreground">{fmtCash(cashOf(pointsNeeded, STOREFRONT_RATE))}</span>
          </div>
        </div>
      </div>

      {/* Delivery */}
      <section className="mx-4 mt-8">
        <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Deliver to</label>
        <div className="mt-2 flex items-center gap-3 border-b border-[#CFCBD0] pb-3">
          <Mail className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <input
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="recipient@email.com"
            className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">Leave blank to send to your own registered email.</p>
      </section>

      {/* About */}
      <section className="mx-4 mt-8 border-y border-border">
        <button onClick={() => setAboutOpen((o) => !o)} className="flex w-full items-center justify-between py-4 text-left">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground">About this card</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
        </button>
        {aboutOpen && (
          <div className="space-y-3 pb-5 text-[13px] leading-relaxed text-muted-foreground">
            <p>{card.blurb}</p>
            {liveCard?.redemption && <p><span className="font-semibold text-foreground">How to redeem: </span>{liveCard.redemption}</p>}
            {validity && <p><span className="font-semibold text-foreground">Validity: </span>{validity}</p>}
            {liveCard?.termsList && (
              <ul className="list-disc space-y-1 pl-5">{liveCard.termsList.map((t) => <li key={t}>{t}</li>)}</ul>
            )}
          </div>
        )}
      </section>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-[56px] left-1/2 z-40 flex w-full max-w-md -translate-x-1/2 gap-2 border-t border-border bg-card px-4 py-3">
        <button
          onClick={() => (inCart ? navigate("/cart") : handleAddToCart())}
          className="h-12 flex-1 rounded-[10px] border border-[#CFCBD0] bg-transparent px-5 text-[15px] font-semibold text-primary transition-colors hover:bg-primary/5"
        >
          {inCart ? "Go to Cart" : "Add to Cart"}
        </button>
        <button
          onClick={() => setStep("payment")}
          className="h-12 flex-1 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default GiftCardDetail;
