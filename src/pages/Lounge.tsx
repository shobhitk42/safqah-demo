import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cashOf, fmtCash, fmtPts, priceText, SAMPLE_RATE, STOREFRONT_RATE, type PaymentResult } from "@/lib/pricing";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import DealCard from "@/components/DealCard";
import { toast } from "sonner";
import BookingHeader from "@/components/booking/BookingHeader";
import BottomAction from "@/components/booking/BottomAction";
import GuestDetailsForm, { emptyPeople, useGuestForm } from "@/components/booking/GuestDetailsForm";
import PaymentStep from "@/components/booking/PaymentStep";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import { makeReference } from "@/components/booking/hotelData";
import { useBookings } from "@/contexts/BookingsContext";
import { useUser } from "@/contexts/UserContext";
import { live } from "@/data/live";

import hotelImg from "@/assets/hotel.jpg";
import loungeImg from "@/assets/exp-lounge.jpg";

const lounges = [
  { name: "Saudia Al Fursan Lounge", airport: "Riyadh (RUH)", points: "3,000" },
  { name: "Plaza Premium Lounge", airport: "Jeddah (JED)", points: "2,500" },
  { name: "Business Lounge", airport: "Dammam (DMM)", points: "2,800" },
  { name: "Qatar Airways Lounge", airport: "Doha (DOH)", points: "3,500" },
  { name: "Gulf Air Falcon Gold Lounge", airport: "Bahrain (BAH)", points: "2,200" },
];

const liveLounges = live.lounge.map((p) => ({
  name: p.name,
  airport: [p.city, p.airport].filter(Boolean).join(" · ") || p.country,
  points: p.points.toLocaleString(),
  image: p.image,
  meta: [p.terminal, p.travelType && `${p.travelType} departures`].filter(Boolean).join(" · "),
  hours: p.hours,
  facilities: p.facilities?.slice(0, 3).join(" · "),
}));
type LoungeItem = { name: string; airport: string; points: string; image?: string; meta?: string; hours?: string; facilities?: string };
const loungeList: LoungeItem[] = liveLounges.length ? liveLounges : lounges;

const HANDLING_RATE = 0.05;
const MAX_TRAVELLERS = 4;
const RATE = liveLounges.length ? STOREFRONT_RATE : SAMPLE_RATE;
const today = () => new Date().toISOString().slice(0, 10);

type Step = "list" | "details" | "payment" | "confirmed";

const LoungePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { addBooking } = useBookings();
  const [step, setStep] = useState<Step>("list");
  const [lounge, setLounge] = useState<LoungeItem | null>(null);
  const [visitDate, setVisitDate] = useState(today());
  const [travellers, setTravellers] = useState(1);
  const form = useGuestForm(1);
  const [payment, setPayment] = useState<PaymentResult>({ mode: "points", pointsUsed: 0, cashPaid: 0 });
  const [reference, setReference] = useState("");

  const unit = lounge ? Number(lounge.points.replace(/,/g, "")) : 0;
  const net = unit * travellers;
  const handling = Math.round(net * HANDLING_RATE);
  const totalPoints = net + handling;
  const totalCash = cashOf(totalPoints, RATE);
  const lead = form.people[0];

  const changeTravellers = (n: number) => {
    const next = Math.min(MAX_TRAVELLERS, Math.max(1, n));
    setTravellers(next);
    form.setPeople((prev) => [...prev, ...emptyPeople(MAX_TRAVELLERS)].slice(0, next));
  };

  const submitDetails = () => {
    if (!visitDate || !form.valid) {
      form.setShowErrors(true);
      toast.error("Please complete the traveller details");
      return;
    }
    setStep("payment");
  };

  const confirm = (result: PaymentResult) => {
    if (!lounge) return;
    const ref = makeReference("LNG");
    addBooking({
      item: lounge.name,
      category: "Lounge",
      points: result.pointsUsed,
      cashPaid: result.cashPaid,
      date: visitDate,
      status: "Confirmed",
      meta: `${travellers} traveller${travellers > 1 ? "s" : ""} · ${lounge.airport} · ${ref}`,
    });
    setPayment(result);
    setReference(ref);
    setStep("confirmed");
  };

  const STEPS = ["Traveller", "Payment"];

  if (step === "confirmed" && lounge) {
    return (
      <BookingConfirmation
        heading="Lounge access confirmed"
        reference={reference}
        email={form.contact.email}
        payment={payment}
        balanceAfter={user.availablePoints - payment.pointsUsed}
        rows={[
          { label: "Lounge", value: lounge.name },
          { label: "Airport", value: lounge.airport },
          { label: "Visit date", value: visitDate },
          { label: "Travellers", value: `${lead.title} ${lead.firstName} ${lead.lastName}${travellers > 1 ? ` +${travellers - 1}` : ""}` },
        ]}
      />
    );
  }

  if (step === "payment" && lounge) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background">
        <BookingHeader title="Payment" onBack={() => setStep("details")} steps={STEPS} current={1} />
        <PaymentStep
          onConfirm={confirm}
          totalPoints={totalPoints}
          totalCash={totalCash}
          rows={[
            { label: "Lounge", value: lounge.name },
            { label: "Visit date", value: visitDate },
            { label: "Travellers", value: String(travellers) },
            { label: "Net redemption value", value: priceText(net, RATE) },
            { label: "Handling charges", value: `+${priceText(handling, RATE)}` },
          ]}
        />
      </div>
    );
  }

  if (step === "details" && lounge) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background">
        <BookingHeader title="Traveller details" onBack={() => setStep("list")} steps={STEPS} current={0} />
        <div className="px-5 pt-5">
          <div className="flex items-center gap-3 rounded-xl bg-[#ECE8E3] p-3">
            <img src={lounge.image || loungeImg} alt={lounge.name} className="h-14 w-14 rounded-lg object-cover" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{lounge.name}</p>
              <p className="text-xs text-muted-foreground">{lounge.airport}</p>
              <p className="mt-0.5 text-xs font-bold text-reward-gold">{priceText(unit, RATE)} <span className="font-normal text-muted-foreground">· per traveller</span></p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Visit date</label>
              <input
                type="date"
                min={today()}
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="mt-1 h-11 w-full rounded-[10px] border border-[#CFCBD0] bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Travellers</label>
              <div className="mt-1 flex h-11 items-center justify-between rounded-[10px] border border-[#CFCBD0] px-2">
                <button onClick={() => changeTravellers(travellers - 1)} aria-label="Fewer travellers" className="flex h-8 w-8 items-center justify-center"><Minus className="h-4 w-4" /></button>
                <span className="text-[14px] font-semibold">{travellers}</span>
                <button onClick={() => changeTravellers(travellers + 1)} aria-label="More travellers" className="flex h-8 w-8 items-center justify-center"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>

        <GuestDetailsForm
          noun="Traveller"
          people={form.people}
          onPeopleChange={form.setPeople}
          contact={form.contact}
          onContactChange={form.setContact}
          showErrors={form.showErrors}
        />
        <BottomAction
          label="Continue to payment"
          onClick={submitDetails}
          hint={<><span className="text-muted-foreground">Total incl. handling</span><span className="font-bold text-foreground">{fmtPts(totalPoints)} · {fmtCash(totalCash)}</span></>}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/loyalty")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Airport Lounges</h1>
      </div>

      <div className="px-5 pb-8">
        <h2 className="mb-4 text-[15px] font-bold text-foreground">Premium lounges</h2>
        <div className="flex flex-col gap-6">
          {loungeList.map((l, i) => (
            <DealCard
              key={l.name}
              image={l.image || (i % 2 === 0 ? loungeImg : hotelImg)}
              title={l.name}
              topChips={[l.meta || "Lounge access"]}
              badge={l.airport}
              rows={[
                { label: "Per visit", value: priceText(Number(l.points.replace(/,/g, "")), RATE) },
                ...(l.hours ? [{ label: "Open", value: l.hours }] : []),
              ]}
              onClick={() => { setLounge(l); setStep("details"); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoungePage;
