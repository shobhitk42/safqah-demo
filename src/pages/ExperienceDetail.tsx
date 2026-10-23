import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Search, Clock, Gauge, MapPin, ChevronDown, ChevronUp, Check, X, Calendar } from "lucide-react";
import { getExperience } from "@/data/experiences";
import { useUser } from "@/contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Step = "details" | "availability" | "review";

const ExperienceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const experience = getExperience(id || "");
  const [openSection, setOpenSection] = useState<string>("itinerary");
  const [rate, setRate] = useState(0);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("2026-08-04");
  const [time, setTime] = useState("19:00");
  const [confirmed, setConfirmed] = useState(false);
  const [step, setStep] = useState<Step>("details");
  const [slotChosen, setSlotChosen] = useState<number | null>(null);

  if (!experience) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Experience not found</p>
      </div>
    );
  }

  const currentRate = experience.rateTypes[rate];
  const totalPoints = currentRate.points * guests;

  const timeSlots = ["09:00", "11:30", "14:00", "16:30", "19:00"];

  const toggle = (s: string) => setOpenSection(openSection === s ? "" : s);

  const Section = ({ id: sid, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="border-b border-border">
      <button
        onClick={() => toggle(sid)}
        className={`w-full flex items-center justify-between py-4 text-left ${
          openSection === sid ? "text-primary" : "text-foreground"
        }`}
      >
        <span className="text-sm font-semibold">{title}</span>
        {openSection === sid ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {openSection === sid && <div className="pb-4 text-sm text-muted-foreground leading-relaxed">{children}</div>}
    </div>
  );

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-[88px]">
      {/* Top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-2 bg-background/95 backdrop-blur px-4 py-3 border-b border-border">
        <button
          onClick={() => (step === "details" ? navigate(-1) : setStep(step === "review" ? "availability" : "details"))}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <div className="flex items-center gap-1.5 rounded-full bg-reward-gold/15 px-3 py-1.5">
          <span className="h-4 w-4 rounded-full bg-reward-gold flex items-center justify-center text-[10px] font-bold text-white">P</span>
          <span className="text-xs font-bold text-foreground">
            {(user.availablePoints / 1000).toFixed(2)}k
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted" aria-label="Search">
            <Search className="h-4 w-4 text-foreground" />
          </button>
          <button onClick={() => navigate("/cart")} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted" aria-label="Cart">
            <ShoppingCart className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 py-3 border-b border-border bg-card/40">
        {(["details", "availability", "review"] as Step[]).map((s, i) => {
          const active = step === s;
          const done = ["details", "availability", "review"].indexOf(step) > i;
          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  active || done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span className={`text-[11px] font-medium capitalize ${active ? "text-foreground" : "text-muted-foreground"}`}>
                {s === "details" ? "Details" : s === "availability" ? "Availability" : "Review"}
              </span>
              {i < 2 && <span className="h-px w-6 bg-border" />}
            </div>
          );
        })}
      </div>

      {step === "details" && (
        <>
          {/* Hero image */}
          <div className="relative">
            <img src={experience.image} alt={experience.name} className="h-56 w-full object-cover" width={1024} height={1024} />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute top-3 left-3 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-semibold px-2.5 py-1 uppercase tracking-wider">
              {experience.category}
            </span>
          </div>

          {/* Title */}
          <div className="px-4 pt-5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{experience.location}</p>
            <h1 className="text-xl font-bold text-foreground leading-tight mt-1">{experience.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" /> {experience.duration}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                <Gauge className="h-3 w-3" /> {experience.difficulty}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                <MapPin className="h-3 w-3" /> {experience.location}
              </span>
            </div>
          </div>

          {/* Price card */}
          <div className="mx-4 mt-5 rounded-2xl border border-border bg-card p-4">
            <p className="text-[11px] text-muted-foreground">From</p>
            <p className="text-2xl font-bold text-primary">
              {experience.points.toLocaleString()} pts
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">per guest · free cancellation up to 24h</p>
          </div>

          {/* Details accordion */}
          <div className="px-4 mt-6">
            <h2 className="text-base font-bold text-foreground mb-1">Experience Details</h2>
            <Section id="itinerary" title="Itinerary">
              <p className="text-xs font-semibold text-foreground mb-2">Overview</p>
              <p>{experience.overview}</p>
            </Section>
            <Section id="description" title="Description">
              <p>{experience.description}</p>
            </Section>
            <Section id="inclusion" title="Inclusion">
              <ul className="space-y-1.5">
                {experience.inclusions.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section id="exclusion" title="Exclusion">
              <ul className="space-y-1.5">
                {experience.exclusions.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </>
      )}

      {step === "availability" && (
        <div className="px-4 pt-5">
          <h2 className="text-lg font-bold text-foreground">Check availability</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Select date, guests and rate to see live availability.</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-muted-foreground">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground">Guests</label>
              <input
                type="number"
                min={1}
                max={10}
                value={guests}
                onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] text-muted-foreground">Rate</label>
              <select
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
              >
                {experience.rateTypes.map((r, i) => (
                  <option key={r.label} value={i}>
                    {r.label} — {r.points.toLocaleString()} pts
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-foreground mb-2">Available time slots</p>
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
                    className={`rounded-lg border py-2.5 text-sm font-semibold transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-primary-soft/40 border border-primary/20 px-5 py-4">
            <div className="flex items-start gap-3 text-primary">
              <Calendar className="h-4 w-4 mt-0.5 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <p className="text-xs font-semibold leading-tight">Instant confirmation available</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Your booking will be confirmed instantly upon payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "review" && (
        <div className="px-4 pt-5">
          <h2 className="text-lg font-bold text-foreground">Review your booking</h2>
          <div className="mt-4 rounded-2xl border border-border bg-card overflow-hidden">
            <img src={experience.image} alt={experience.name} className="h-32 w-full object-cover" />
            <div className="p-4 space-y-3">
              <div>
                <p className="text-sm font-bold text-foreground">{experience.name}</p>
                <p className="text-[11px] text-muted-foreground">{experience.location}</p>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <span className="text-muted-foreground">Date</span>
                <span className="text-right text-foreground font-medium">{date}</span>
                <span className="text-muted-foreground">Time</span>
                <span className="text-right text-foreground font-medium">{time}</span>
                <span className="text-muted-foreground">Rate</span>
                <span className="text-right text-foreground font-medium">{currentRate.label}</span>
                <span className="text-muted-foreground">Guests</span>
                <span className="text-right text-foreground font-medium">{guests}</span>
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <div className="text-right">
                  <p className="text-base font-bold text-primary">{totalPoints.toLocaleString()} pts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA card */}
      <div className="mx-4 mt-6 rounded-2xl border border-border bg-card p-4">
        {step === "details" && (
          <>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] text-muted-foreground">From</p>
                <p className="text-base font-bold text-foreground">
                  {experience.points.toLocaleString()} pts
                  <span className="text-xs text-muted-foreground font-normal"> · per guest</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setStep("availability")}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              Check availability
            </button>
          </>
        )}
        {step === "availability" && (
          <>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] text-muted-foreground">Total</p>
                <p className="text-base font-bold text-foreground">
                  {totalPoints.toLocaleString()} pts
                  <span className="text-xs text-muted-foreground font-normal"> · {guests} guest{guests > 1 ? "s" : ""}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setStep("review")}
              disabled={slotChosen === null}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {slotChosen === null ? "Select a time slot" : "Continue to review"}
            </button>
          </>
        )}
        {step === "review" && (
          <button
            onClick={() => setConfirmed(true)}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            Book now · {totalPoints.toLocaleString()} pts
          </button>
        )}
      </div>

      <Dialog open={confirmed} onOpenChange={setConfirmed}>
        <DialogContent className="max-w-[360px] rounded-2xl border border-[#02AD4C]/45 !bg-[#FFFFFF] p-7 shadow-[0_24px_70px_rgba(26, 26, 46,0.24),0_0_0_1px_rgba(2, 173, 76,0.12)] dark:border-[#02AD4C]/55 dark:!bg-[#1F242D] dark:shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_34px_rgba(2, 173, 76,0.18)]">
          <DialogHeader className="space-y-3">
            <div className="mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-full border border-[#02AD4C]/45 bg-[#02AD4C]/12">
              <Check className="h-6 w-6 text-[#02AD4C]" strokeWidth={1.8} />
            </div>
            <DialogTitle className="text-center text-[24px] font-light leading-tight text-[#302F2D] dark:text-[#FFFFFF]">
              Booking Confirmed
            </DialogTitle>
            <DialogDescription className="text-center text-sm leading-6 text-[#6B6B7A] dark:text-[#FFFFFF]/75">
              Your {experience.name} is booked for {date} at {time}. Confirmation sent to your email.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2">
            <button
              onClick={() => {
                setConfirmed(false);
                navigate("/orders");
              }}
              className="w-full rounded-xl bg-[#02AD4C] py-3 text-sm font-semibold text-[#302F2D] shadow-[0_10px_28px_rgba(2, 173, 76,0.28)] transition hover:translate-y-[-1px] hover:shadow-[0_14px_34px_rgba(2, 173, 76,0.34)]"
            >
              View my bookings
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExperienceDetail;
