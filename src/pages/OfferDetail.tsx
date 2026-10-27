import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronDown, Coins } from "lucide-react";
import { getOffer } from "@/data/offers";
import { useUser } from "@/contexts/UserContext";
import { useBookings } from "@/contexts/BookingsContext";
import { cashOf, fmtCash, type PaymentResult } from "@/lib/pricing";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import BookingHeader from "@/components/booking/BookingHeader";
import PaymentStep from "@/components/booking/PaymentStep";
import { makeReference } from "@/components/booking/hotelData";

const OfferDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const offer = slug ? getOffer(slug) : undefined;
  const { user } = useUser();
  const { addBooking } = useBookings();

  const [aboutOpen, setAboutOpen] = useState(false);
  const [step, setStep] = useState<"detail" | "payment" | "confirmed">("detail");
  const [payment, setPayment] = useState<PaymentResult>({ mode: "points", pointsUsed: 0, cashPaid: 0 });
  const [reference, setReference] = useState("");

  if (!offer) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center">
        <button onClick={() => navigate("/offers")} className="text-[11px] uppercase tracking-[0.24em] text-primary">
          ← Back to offers
        </button>
      </div>
    );
  }

  const free = offer.cost === 0;
  const validUntil = offer.validUntil ?? "31 Aug 2026";

  const activate = (result: PaymentResult) => {
    const ref = makeReference("OFR");
    addBooking({
      item: `${offer.brand} — ${offer.headline}`,
      category: "Offers",
      points: result.pointsUsed,
      cashPaid: result.cashPaid,
      date: new Date().toLocaleDateString("en-GB"),
      status: "Activated",
      meta: ref,
    });
    setPayment(result);
    setReference(ref);
    setStep("confirmed");
  };

  if (step === "confirmed") {
    return (
      <BookingConfirmation
        noun="Offer"
        heading="Offer activated"
        reference={reference}
        payment={payment}
        balanceAfter={user.availablePoints - payment.pointsUsed}
        rows={[
          { label: "Brand", value: offer.brand },
          { label: "Offer", value: offer.headline },
          { label: "Valid until", value: validUntil },
        ]}
      />
    );
  }

  if (step === "payment") {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background">
        <BookingHeader title="Payment" onBack={() => setStep("detail")} steps={["Offer", "Payment"]} current={1} />
        <PaymentStep
          noun="order"
          totalPoints={offer.cost}
          totalCash={cashOf(offer.cost)}
          onConfirm={activate}
          rows={[
            { label: "Brand", value: offer.brand },
            { label: "Offer", value: offer.headline },
          ]}
        />
      </div>
    );
  }

  const chips = [free ? "Free" : "Points offer", `Valid until ${validUntil}`];

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={() => navigate("/offers")} aria-label="Back" className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Offer</p>
        <span className="flex items-center gap-1.5 rounded-full bg-[#ECE8E3] px-3 py-1.5 text-[13px] font-semibold tabular-nums text-foreground">
          <Coins className="h-3.5 w-3.5 text-primary" /> {user.availablePoints.toLocaleString()}
        </span>
      </div>

      {/* Brand tile */}
      <div className="px-4">
        <div className="flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-8">
          <img src={offer.image} alt={offer.brand} className="max-h-full max-w-full object-contain" />
        </div>
      </div>

      {/* Title */}
      <div className="px-4 pt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{offer.brand}</p>
        <h1 className="mt-1 text-[26px] font-bold leading-tight text-foreground">{offer.headline}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className="rounded-full bg-foreground px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-background">{c}</span>
          ))}
        </div>
      </div>

      {/* Value + cost */}
      <div className="mt-8 grid grid-cols-[1fr_auto] items-end gap-3 px-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">You get</p>
          <div className="mt-2 flex min-h-14 items-center rounded-xl border border-[#CFCBD0] px-4 py-2 text-[14px] font-medium leading-snug text-foreground">
            {offer.value}
          </div>
        </div>
        <div className="min-w-[110px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Cost</p>
          <div className="mt-2 flex h-14 flex-col items-center justify-center rounded-xl border border-primary/50 bg-primary/5">
            <span className="text-[17px] font-bold leading-none tabular-nums text-primary">{free ? "Free" : `${offer.cost.toLocaleString()} pts`}</span>
            {!free && <span className="mt-1 text-[10px] text-muted-foreground">{fmtCash(cashOf(offer.cost))}</span>}
          </div>
        </div>
      </div>

      {/* About */}
      <section className="mx-4 mt-8 border-y border-border">
        <button onClick={() => setAboutOpen((o) => !o)} className="flex w-full items-center justify-between py-4 text-left">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground">About this offer</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
        </button>
        {aboutOpen && (
          <div className="space-y-4 pb-5 text-[13px] leading-relaxed text-muted-foreground">
            <p>{offer.description}</p>
            {offer.howTo && (
              <div>
                <p className="font-semibold text-foreground">How to use</p>
                <ol className="mt-1 list-decimal space-y-1 pl-5">{offer.howTo.map((s) => <li key={s}>{s}</li>)}</ol>
              </div>
            )}
            {offer.terms && (
              <div>
                <p className="font-semibold text-foreground">Terms</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">{offer.terms.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-[56px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-card px-4 py-3">
        <button
          onClick={() => (free ? activate({ mode: "points", pointsUsed: 0, cashPaid: 0 }) : setStep("payment"))}
          className="h-12 w-full rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Activate Offer
        </button>
      </div>
    </div>
  );
};

export default OfferDetail;
