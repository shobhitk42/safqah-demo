import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Search,
  Clock,
  MapPin,
  Star,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Calendar,
  CreditCard,
  Coins,
  Blend,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { conciergeExperiences } from "@/data/conciergeExperiences";
import { useUser } from "@/contexts/UserContext";
import { useBookings } from "@/contexts/BookingsContext";
import comeraLogo from "@/assets/comera-logo.png.asset.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Step = "details" | "availability" | "review";

const DEFAULT_EXCLUSIONS = [
  "Flights and international travel",
  "Personal expenses and gratuities",
  "Travel insurance",
];

const parseCash = (price: string): number => {
  const match = price.match(/([\d,]+)/);
  if (!match) return 0;
  return Number(match[1].replace(/,/g, ""));
};

const ConciergeExperience = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { addBooking } = useBookings();
  const fromNotification = (location.state as { fromNotification?: boolean } | null)
    ?.fromNotification;
  const exp = slug ? conciergeExperiences[slug] : undefined;

  const [openSection, setOpenSection] = useState<string>("itinerary");
  const [rate, setRate] = useState(0);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("2026-08-04");
  const [time, setTime] = useState("19:00");
  const [confirmed, setConfirmed] = useState(false);
  const [step, setStep] = useState<Step>("details");
  const [slotChosen, setSlotChosen] = useState<number | null>(null);
  const [payMode, setPayMode] = useState<"points" | "mix" | "cash">("points");
  const [pointsPct, setPointsPct] = useState(60);

  if (!exp) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background flex items-center justify-center">
        <p className="text-foreground/60 text-sm">Experience not found</p>
      </div>
    );
  }

  const cashPrice = parseCash(exp.price);
  const basePoints = cashPrice * 100;
  const rateTypes = [
    { label: "Private experience", points: basePoints },
    { label: "Concierge Plus (fully arranged)", points: Math.round(basePoints * 1.25) },
  ];
  const currentRate = rateTypes[rate];
  const totalPoints = currentRate.points * guests;
  const totalCash = cashPrice * guests;

  const timeSlots = ["09:00", "11:30", "14:00", "16:30", "19:00"];

  const primaryBtnStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #2B8CA8 0%, #1F6B85 100%)",
    color: "#FFFFFF",
    fontWeight: 600,
    letterSpacing: "0.04em",
    boxShadow: "0 8px 24px -6px rgba(43,140,168,0.45), inset 0 1px 0 rgba(255,255,255,0.18)",
  };

  // Payment split calculations
  const pointsToUse =
    payMode === "points"
      ? totalPoints
      : payMode === "mix"
        ? Math.round((totalPoints * pointsPct) / 100)
        : 0;
  const cashToPay =
    payMode === "cash"
      ? totalCash
      : payMode === "mix"
        ? Math.round(totalCash * (1 - pointsPct / 100))
        : 0;

  const toggle = (s: string) => setOpenSection(openSection === s ? "" : s);

  const handleBack = () => {
    if (step !== "details") {
      setStep(step === "review" ? "availability" : "details");
      return;
    }
    if (fromNotification) navigate("/");
    else navigate(-1);
  };

  const Section = ({
    id: sid,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-[#E8E8EE]">
      <button
        onClick={() => toggle(sid)}
        className="w-full flex items-center justify-between py-4 text-left text-foreground"
      >
        <span
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: openSection === sid ? "#2B8CA8" : "#8A8A98", fontWeight: 500 }}
        >
          {title}
        </span>
        {openSection === sid ? (
          <ChevronUp className="h-4 w-4" strokeWidth={1.25} style={{ color: "#2B8CA8" }} />
        ) : (
          <ChevronDown className="h-4 w-4" strokeWidth={1.25} style={{ color: "#8A8A98" }} />
        )}
      </button>
      {openSection === sid && (
        <div
          className="pb-5 text-[14px] leading-[1.75] text-foreground/70"
          style={{ fontWeight: 300 }}
        >
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      {/* Top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-2 bg-background/95 backdrop-blur px-4 py-3 border-b border-[#E8E8EE]">
        <button
          onClick={handleBack}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F7F8FA] transition"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border border-[#2B8CA8]/40 bg-[#2B8CA8]/10 dark:bg-[#2B8CA8]/15">
          <span
            className="h-4 w-4 rounded-full flex items-center justify-center text-[10px]"
            style={{ background: "#2B8CA8", color: "#1A1A2E", fontWeight: 600 }}
          >
            P
          </span>
          <span className="text-xs text-foreground dark:text-[#FFFFFF]" style={{ fontWeight: 500 }}>
            {(user.availablePoints / 1000).toFixed(2)}k
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F7F8FA]"
            aria-label="Search"
          >
            <Search className="h-4 w-4 text-foreground" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F7F8FA]"
            aria-label="Cart"
          >
            <ShoppingCart className="h-4 w-4 text-foreground" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 py-3 border-b border-[#E8E8EE]">
        {(["details", "availability", "review"] as Step[]).map((s, i) => {
          const active = step === s;
          const done = ["details", "availability", "review"].indexOf(step) > i;
          const filled = active || done;
          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] transition-all"
                style={{
                  background: filled ? "#2B8CA8" : "#FFFFFF",
                  color: filled ? "#FFFFFF" : "#8A8A98",
                  border: filled ? "1px solid #2B8CA8" : "1px solid #D1D5DB",
                  fontWeight: 600,
                  boxShadow: active ? "0 0 0 3px rgba(43,140,168,0.15)" : "none",
                }}
              >
                {done ? <Check className="h-3 w-3" strokeWidth={2.5} /> : i + 1}
              </div>
              <span
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{
                  color: filled ? "#2B8CA8" : "#8A8A98",
                  fontWeight: active ? 600 : 500,
                }}
              >
                {s}
              </span>
              {i < 2 && (
                <span
                  className="h-px w-6 transition-colors"
                  style={{ background: done ? "#2B8CA8" : "#E8E8EE" }}
                />
              )}
            </div>
          );
        })}
      </div>


      {step === "details" && (
        <>
          {/* Hero */}
          <div className="relative">
            <img src={exp.image} alt={exp.title} className="h-64 w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
            <span
              className="absolute top-3 left-4 rounded-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.24em]"
              style={{ background: "#1A1A2E", color: "#2B8CA8", fontWeight: 500 }}
            >
              Concierge
            </span>
          </div>

          {/* Title */}
          <div className="px-6 pt-6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8A8A98]">
              {exp.location}
            </p>
            <h1
              className="mt-2 text-[26px] leading-[1.2] text-foreground"
              style={{ fontWeight: 300, letterSpacing: "0.005em" }}
            >
              {exp.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[#8A8A98]">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" strokeWidth={1.25} />
                {exp.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" strokeWidth={1.25} />
                {exp.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Star
                  className="h-3 w-3"
                  strokeWidth={1.25}
                  style={{ color: "#2B8CA8", fill: "#2B8CA8" }}
                />
                <span style={{ color: "#2B8CA8", fontWeight: 500 }}>{exp.rating}</span>
                <span>({exp.reviews})</span>
              </span>
            </div>

            <p
              className="mt-5 text-[14px] leading-relaxed text-foreground/60"
              style={{ fontWeight: 300, fontStyle: "italic" }}
            >
              {exp.note}
            </p>
          </div>

          {/* Price card */}
          <div
            className="mx-6 mt-6 rounded-md p-5 bg-white"
            style={{ border: "1px solid #E8E8EE" }}
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8A8A98]">From</p>
            <p
              className="mt-2 text-[22px] text-foreground"
              style={{ fontWeight: 400, letterSpacing: "0.005em" }}
            >
              <span style={{ color: "#2B8CA8" }}>{basePoints.toLocaleString()} pts</span>
              <span className="text-[13px] text-[#8A8A98] font-light">
                {" "}
                · AED {cashPrice.toLocaleString()}
              </span>
            </p>
            <p className="mt-1 text-[11px] text-[#8A8A98]">
              per guest · free cancellation up to 24h
            </p>
          </div>

          {/* Accordion */}
          <div className="px-6 mt-8">
            <h2 className="text-[10px] uppercase tracking-[0.22em] text-[#8A8A98] mb-1">
              Experience details
            </h2>
            <Section id="itinerary" title="Itinerary">
              <p>{exp.about}</p>
            </Section>
            <Section id="description" title="Description">
              <p>{exp.note}</p>
            </Section>
            <Section id="inclusion" title="What's included">
              <ul className="space-y-2">
                {exp.included.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check
                      className="h-3.5 w-3.5 mt-1 shrink-0"
                      strokeWidth={1.5}
                      style={{ color: "#2B8CA8" }}
                    />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section id="exclusion" title="Not included">
              <ul className="space-y-2">
                {DEFAULT_EXCLUSIONS.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X
                      className="h-3.5 w-3.5 mt-1 shrink-0"
                      strokeWidth={1.5}
                      style={{ color: "#8A8A98" }}
                    />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Inline CTA */}
          <div className="px-6 mt-8">
            <button
              onClick={() => setStep("availability")}
              className="w-full rounded-xl py-4 text-[13px] uppercase tracking-[0.18em] transition-all hover:brightness-110 active:scale-[0.98]"
              style={primaryBtnStyle}
            >
              {exp.ctaLabel ?? "Check availability"}
            </button>
          </div>
        </>
      )}

      {step === "availability" && (
        <div className="px-6 pt-6">
          <h2
            className="text-[22px] leading-[1.2] text-foreground"
            style={{ fontWeight: 300 }}
          >
            Check availability
          </h2>
          <p className="text-[12px] text-[#8A8A98] mt-1" style={{ fontWeight: 300 }}>
            Select date, guests and rate to see live availability.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-[0.22em] text-[#8A8A98]">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full rounded-md bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#2B8CA8]"
                style={{ border: "1px solid #E8E8EE" }}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.22em] text-[#8A8A98]">
                Guests
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={guests}
                onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
                className="mt-2 w-full rounded-md bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#2B8CA8]"
                style={{ border: "1px solid #E8E8EE" }}
              />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] uppercase tracking-[0.22em] text-[#8A8A98]">
                Rate
              </label>
              <select
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="mt-2 w-full rounded-md bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#2B8CA8]"
                style={{ border: "1px solid #E8E8EE" }}
              >
                {rateTypes.map((r, i) => (
                  <option key={r.label} value={i}>
                    {r.label} — {r.points.toLocaleString()} pts
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8A8A98] mb-3">
              Available time slots
            </p>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot, i) => {
                const active = slotChosen === i;
                return (
                  <button
                    key={slot}
                    onClick={() => {
                      setSlotChosen(i);
                      setTime(slot);
                    }}
                    className="rounded-md py-2.5 text-sm transition"
                    style={{
                      background: active ? "#1A1A2E" : "#FFFFFF",
                      color: active ? "#FFFFFF" : "#1A1A2E",
                      border: active ? "1px solid #1A1A2E" : "1px solid #E8E8EE",
                      fontWeight: 400,
                    }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="mt-8 rounded-md p-4 bg-white"
            style={{ border: "1px solid #E8E8EE" }}
          >
            <div className="flex items-center gap-2" style={{ color: "#2B8CA8" }}>
              <Calendar className="h-4 w-4" strokeWidth={1.5} />
              <p
                className="text-[10px] uppercase tracking-[0.22em]"
                style={{ fontWeight: 500 }}
              >
                Instant confirmation
              </p>
            </div>
            <p className="text-[12px] text-[#8A8A98] mt-2" style={{ fontWeight: 300 }}>
              Your booking will be confirmed instantly upon payment.
            </p>
          </div>

          {/* Inline CTA */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#8A8A98]">
                  Total
                </p>
                <p className="text-[16px] text-foreground" style={{ fontWeight: 500 }}>
                  <span style={{ color: "#2B8CA8" }}>
                    {totalPoints.toLocaleString()} pts
                  </span>
                  <span className="text-[11px] text-[#8A8A98] font-light">
                    {" "}
                    · {guests} guest{guests > 1 ? "s" : ""}
                  </span>
                </p>
              </div>
              <p className="text-[11px] text-[#8A8A98]">
                or AED {totalCash.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => setStep("review")}
              disabled={slotChosen === null}
              className="w-full rounded-xl py-4 text-[13px] uppercase tracking-[0.18em] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              style={primaryBtnStyle}
            >
              {slotChosen === null ? "Select a time slot" : "Continue to review"}
            </button>
          </div>
        </div>
      )}

      {step === "review" && (
        <div className="pt-4 pb-28">
          {/* Header title */}
          <div className="px-4 mb-4">
            <h1 className="text-lg font-semibold text-foreground">Checkout</h1>
          </div>

          {/* Product Summary */}
          <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-card p-3 border border-border">
            <img src={exp.image} alt={exp.title} className="h-14 w-14 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-card-foreground truncate">{exp.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs font-bold" style={{ color: "#2B8CA8" }}>
                  {totalPoints.toLocaleString()} pts
                </span>
                <span className="text-xs text-muted-foreground">or AED {totalCash.toLocaleString()}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {date} · {time} · {guests} guest{guests > 1 ? "s" : ""} · {currentRate.label}
              </p>
            </div>
          </div>

          {/* Points Balance */}
          <div
            className="mx-4 mb-5 rounded-xl p-4"
            style={{ background: "linear-gradient(135deg,#2B8CA8 0%,#1F6B85 100%)" }}
          >
            <p className="text-xs text-white/70">Your Available Points</p>
            <p className="text-2xl font-bold text-white">
              {user.availablePoints.toLocaleString()} pts
            </p>
          </div>

          {/* Payment Method */}
          <div className="mx-4 mb-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">How would you like to pay?</h3>
            <RadioGroup
              value={payMode}
              onValueChange={(v) => setPayMode(v as "points" | "mix" | "cash")}
              className="gap-2.5"
            >
              <label
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                  payMode === "points" ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <RadioGroupItem value="points" />
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                  <Coins className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Points Only</p>
                  <p className="text-xs text-muted-foreground">
                    Use {totalPoints.toLocaleString()} points
                  </p>
                </div>
                {user.availablePoints < totalPoints && (
                  <span className="text-[10px] text-destructive font-medium">Insufficient</span>
                )}
              </label>

              <label
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                  payMode === "cash" ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <RadioGroupItem value="cash" />
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                  <CreditCard className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Cash Only</p>
                  <p className="text-xs text-muted-foreground">
                    Pay AED {totalCash.toLocaleString()} with Comera Pay
                  </p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                  payMode === "mix" ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <RadioGroupItem value="mix" />
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                  <Blend className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Points + Cash</p>
                  <p className="text-xs text-muted-foreground">Split between points & Comera Pay</p>
                </div>
              </label>
            </RadioGroup>
          </div>

          {/* Mix Slider */}
          {payMode === "mix" && (
            <div className="mx-4 mb-4 rounded-xl bg-card p-4 border border-border">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium text-muted-foreground">Points: {pointsPct}%</span>
                <span className="text-xs font-medium text-muted-foreground">Cash: {100 - pointsPct}%</span>
              </div>
              <Slider
                value={[pointsPct]}
                onValueChange={(v) => setPointsPct(v[0])}
                max={90}
                min={10}
                step={5}
                className="mb-4"
              />
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Points Used</p>
                  <p className="text-sm font-bold" style={{ color: "#2B8CA8" }}>
                    {pointsToUse.toLocaleString()} pts
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Cash to Pay</p>
                  <p className="text-sm font-bold text-foreground">AED {cashToPay.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Comera Pay payment option */}
          {(payMode === "cash" || payMode === "mix") && (
            <div className="mx-4 mb-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Payment</h3>
              <div className="flex items-center gap-3 rounded-xl border border-primary bg-primary/5 p-4">
                <img src={comeraLogo.url} alt="Comera Pay" className="h-10 w-10 rounded-lg object-contain" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">Pay with Comera Pay</p>
                  <p className="text-xs text-muted-foreground">Secure one-tap checkout</p>
                </div>
                <Check className="h-5 w-5 text-primary" />
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="mx-4 mb-6 rounded-2xl bg-card p-4 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Order Summary</h3>
            {pointsToUse > 0 && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Points</span>
                <span className="font-semibold" style={{ color: "#2B8CA8" }}>
                  {pointsToUse.toLocaleString()} pts
                </span>
              </div>
            )}
            {cashToPay > 0 && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Comera Pay</span>
                <span className="font-semibold text-foreground">AED {cashToPay.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-border pt-3 mt-2 flex justify-between">
              <span className="text-sm font-bold text-foreground">Total</span>
              <div className="text-right">
                {pointsToUse > 0 && (
                  <span className="text-sm font-bold" style={{ color: "#2B8CA8" }}>
                    {pointsToUse.toLocaleString()} pts
                  </span>
                )}
                {cashToPay > 0 && (
                  <span className={`text-sm font-bold text-foreground ${pointsToUse > 0 ? "ml-2" : ""}`}>
                    {pointsToUse > 0 ? `+ AED ${cashToPay.toLocaleString()}` : `AED ${cashToPay.toLocaleString()}`}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Fixed Bottom CTA */}
          <div className="fixed bottom-[56px] left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border px-4 py-4 z-40">
            <button
              onClick={() => {
                addBooking({
                  item: exp.title,
                  category: "Concierge",
                  points: pointsToUse,
                  date: `${date} · ${time}`,
                  status: "Confirmed",
                  meta: `${guests} guest${guests > 1 ? "s" : ""} · ${currentRate.label}${
                    cashToPay > 0 ? ` · AED ${cashToPay.toLocaleString()}` : ""
                  }`,
                });
                setConfirmed(true);
              }}
              disabled={payMode === "points" && user.availablePoints < totalPoints}
              className="w-full rounded-xl py-3.5 text-sm font-semibold text-white disabled:opacity-50 transition-all hover:brightness-110 active:scale-[0.98]"
              style={primaryBtnStyle}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      <Dialog open={confirmed} onOpenChange={setConfirmed}>
        <DialogContent className="max-w-sm bg-[#FFFFFF] border border-[#2B8CA8]/40 shadow-[0_20px_60px_-20px_rgba(43, 140, 168,0.35)] dark:bg-[#1F242D] dark:border-[#2B8CA8]/30 rounded-lg">
          <DialogHeader>
            <div
              className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: "#F7F8FA" }}
            >
              <Check className="h-6 w-6" strokeWidth={1.5} style={{ color: "#2B8CA8" }} />
            </div>
            <DialogTitle className="text-center" style={{ fontWeight: 300 }}>
              Booking Confirmed
            </DialogTitle>
            <DialogDescription className="text-center">
              Your {exp.title} is booked for {date} at {time}. Confirmation sent to your email.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => {
                setConfirmed(false);
                navigate("/orders");
              }}
              className="w-full rounded-md py-3 text-[12px] uppercase tracking-[0.18em]"
              style={{ background: "#1A1A2E", color: "#FFFFFF", fontWeight: 500 }}
            >
              View my bookings
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConciergeExperience;