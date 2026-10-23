import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, ChevronsUpDown, Plane, Clock, ChevronRight, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import travelImg from "@/assets/travel.jpg";
import comeraLogo from "@/assets/comera-logo.png.asset.json";

const CITIES = [
  { code: "MCT", name: "Port Louis", country: "Mauritius" },
  { code: "DXB", name: "Dubai", country: "UAE" },
  { code: "DOH", name: "Doha", country: "Qatar" },
  { code: "BAH", name: "Bahrain", country: "Bahrain" },
  { code: "AUH", name: "Abu Dhabi", country: "UAE" },
  { code: "RUH", name: "Riyadh", country: "Saudi Arabia" },
  { code: "KWI", name: "Kuwait", country: "Kuwait" },
];

const FLIGHTS = [
  { id: 1, airline: "CitiLink", code: "QG 601", depart: "06:15", arrive: "07:45", duration: "1h 30m", stops: "Non-stop", price: 42, points: 4200, logo: "✈️" },
  { id: 2, airline: "Emirates", code: "EK 863", depart: "08:30", arrive: "10:00", duration: "1h 30m", stops: "Non-stop", price: 65, points: 6500, logo: "🇦🇪" },
  { id: 3, airline: "CitiLink", code: "QG 102", depart: "09:45", arrive: "11:20", duration: "1h 35m", stops: "Non-stop", price: 29, points: 2900, logo: "✈️" },
  { id: 4, airline: "CitiLink", code: "QG 605", depart: "11:00", arrive: "12:30", duration: "1h 30m", stops: "Non-stop", price: 47, points: 4700, logo: "✈️" },
  { id: 5, airline: "FlyDubai", code: "FZ 8044", depart: "13:20", arrive: "14:50", duration: "1h 30m", stops: "Non-stop", price: 35, points: 3500, logo: "🛩️" },
  { id: 6, airline: "Emirates", code: "EK 865", depart: "15:00", arrive: "16:30", duration: "1h 30m", stops: "Non-stop", price: 58, points: 5800, logo: "🇦🇪" },
  { id: 7, airline: "CitiLink", code: "QG 106", depart: "16:40", arrive: "18:15", duration: "1h 35m", stops: "Non-stop", price: 31, points: 3100, logo: "✈️" },
  { id: 8, airline: "CitiLink", code: "QG 609", depart: "18:45", arrive: "20:15", duration: "1h 30m", stops: "Non-stop", price: 48, points: 4800, logo: "✈️" },
  { id: 9, airline: "FlyDubai", code: "FZ 8048", depart: "20:30", arrive: "22:00", duration: "1h 30m", stops: "Non-stop", price: 38, points: 3800, logo: "🛩️" },
  { id: 10, airline: "CitiLink", code: "QG 613", depart: "22:15", arrive: "23:45", duration: "1h 30m", stops: "Non-stop", price: 44, points: 4400, logo: "✈️" },
];

const USER_POINTS = 24580;

type Step = "search" | "results" | "payment" | "success";
type PaymentMode = "points" | "cash" | "mix";

const FlightsPage = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [step, setStep] = useState<Step>("search");
  const [from, setFrom] = useState<typeof CITIES[0] | null>(null);
  const [to, setTo] = useState<typeof CITIES[0] | null>(null);
  const [date, setDate] = useState<Date>();
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");

  // Payment state
  const [selectedFlight, setSelectedFlight] = useState<typeof FLIGHTS[0] | null>(null);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("mix");
  const [pointsPercentage, setPointsPercentage] = useState(50);

  const canSearch = from && to && date;

  const handleSearch = () => {
    if (canSearch) setStep("results");
  };

  const handleSelectFlight = (flight: typeof FLIGHTS[0]) => {
    setSelectedFlight(flight);
    setStep("payment");
  };

  const handleBook = () => {
    setStep("success");
  };

  const filteredCities = (search: string, exclude?: string) =>
    CITIES.filter(
      (c) =>
        c.code !== exclude &&
        (c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code.toLowerCase().includes(search.toLowerCase()))
    );

  // Payment calculations
  const flightPrice = selectedFlight?.price || 0;
  const flightPoints = selectedFlight?.points || 0;

  const pointsUsed = paymentMode === "points" ? flightPoints : paymentMode === "cash" ? 0 : Math.round(flightPoints * (pointsPercentage / 100));
  const cashAmount = paymentMode === "points" ? 0 : paymentMode === "cash" ? flightPrice : Math.round(flightPrice * ((100 - pointsPercentage) / 100) * 100) / 100;

  // ─── SUCCESS SCREEN ───
  if (step === "success") {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background flex flex-col items-center justify-center px-6 py-10 pb-24">
        <div className="w-full max-w-sm text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Booking Confirmed! 🎉</h1>
          <p className="text-sm text-muted-foreground mb-6">Your flight has been booked successfully</p>

          {/* Flight summary card */}
          <div className="rounded-2xl bg-card border border-border p-4 mb-4 text-left shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{selectedFlight?.logo}</span>
              <span className="text-sm font-semibold text-foreground">{selectedFlight?.airline}</span>
              <span className="text-xs text-muted-foreground ml-auto">{selectedFlight?.code}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{selectedFlight?.depart}</p>
                <p className="text-xs text-muted-foreground">{from?.code}</p>
              </div>
              <div className="flex-1 mx-4 flex flex-col items-center">
                <div className="w-full h-px bg-border relative">
                  <Plane className="h-3 w-3 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card" />
                </div>
                <span className="text-[10px] text-muted-foreground mt-1">{selectedFlight?.duration}</span>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{selectedFlight?.arrive}</p>
                <p className="text-xs text-muted-foreground">{to?.code}</p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{date && format(date, "EEE, dd MMM yyyy")} · 1 Passenger · Economy</div>
          </div>

          {/* Payment summary */}
          <div className="rounded-2xl bg-card border border-border p-4 mb-4 text-left shadow-sm space-y-2.5">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Payment Summary</h3>
            {pointsUsed > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Points redeemed</span>
                <span className="font-semibold text-foreground">{pointsUsed.toLocaleString()} pts</span>
              </div>
            )}
            {cashAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cash paid</span>
                <span className="font-semibold text-foreground">AED {cashAmount.toFixed(2)}</span>
              </div>
            )}
            {cashAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment method</span>
                <span className="font-semibold text-foreground">Safqah Capital</span>
              </div>
            )}
            <div className="h-px bg-border" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Previous balance</span>
              <span className="font-medium text-foreground">{USER_POINTS.toLocaleString()} pts</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Points used</span>
              <span className="font-medium text-destructive">-{pointsUsed.toLocaleString()} pts</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-xl bg-primary text-primary-foreground py-3.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ─── PAYMENT SCREEN ───
  if (step === "payment" && selectedFlight) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <button onClick={() => setStep("results")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Payment</h1>
        </div>

        {/* Flight summary */}
        <div className="mx-4 mt-4 rounded-2xl bg-card border border-border p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{selectedFlight.logo}</span>
            <span className="text-sm font-semibold text-foreground">{selectedFlight.airline}</span>
            <span className="text-xs text-muted-foreground ml-auto">{selectedFlight.code}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-base font-bold text-foreground">{selectedFlight.depart}</p>
              <p className="text-[10px] text-muted-foreground">{from?.code}</p>
            </div>
            <div className="flex-1 mx-3 flex flex-col items-center">
              <span className="text-[10px] text-muted-foreground mb-1">{selectedFlight.duration}</span>
              <div className="w-full h-px bg-border relative">
                <Plane className="h-3 w-3 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card" />
              </div>
              <span className="text-[10px] text-primary font-medium mt-1">{selectedFlight.stops}</span>
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-foreground">{selectedFlight.arrive}</p>
              <p className="text-[10px] text-muted-foreground">{to?.code}</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-border flex justify-between text-xs">
            <span className="text-muted-foreground">{date && format(date, "EEE, dd MMM")}</span>
            <span className="font-semibold text-foreground">AED {selectedFlight.price} / {selectedFlight.points.toLocaleString()} pts</span>
          </div>
        </div>

        {/* Payment Mode */}
        <div className="mx-4 mt-4">
          <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">Pay with</h3>
          <div className="grid grid-cols-3 gap-2">
            {(["points", "cash", "mix"] as PaymentMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setPaymentMode(mode)}
                className={cn(
                  "rounded-xl py-3 text-xs font-semibold border transition-colors",
                  paymentMode === mode
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/40"
                )}
              >
                {mode === "points" ? "Points Only" : mode === "cash" ? "Cash Only" : "Points + Cash"}
              </button>
            ))}
          </div>
        </div>

        {/* Points slider for mix mode */}
        {paymentMode === "mix" && (
          <div className="mx-4 mt-4 rounded-2xl bg-card border border-border p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-foreground">Points</span>
              <span className="text-xs font-semibold text-foreground">Cash</span>
            </div>
            <Slider
              value={[pointsPercentage]}
              onValueChange={(v) => setPointsPercentage(v[0])}
              max={100}
              min={0}
              step={10}
              className="mb-3"
            />
            <div className="flex justify-between text-xs">
              <span className="text-primary font-semibold">{pointsUsed.toLocaleString()} pts ({pointsPercentage}%)</span>
              <span className="text-foreground font-semibold">AED {cashAmount.toFixed(2)} ({100 - pointsPercentage}%)</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Available: {USER_POINTS.toLocaleString()} pts</p>
          </div>
        )}

        {/* Points only summary */}
        {paymentMode === "points" && (
          <div className="mx-4 mt-4 rounded-2xl bg-card border border-border p-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Points required</span>
              <span className="font-bold text-foreground">{flightPoints.toLocaleString()} pts</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Available balance</span>
              <span className="text-primary font-medium">{USER_POINTS.toLocaleString()} pts</span>
            </div>
          </div>
        )}

        {/* Safqah Capital payment option */}
        {(paymentMode === "cash" || paymentMode === "mix") && cashAmount > 0 && (
          <div className="mx-4 mt-4">
            <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">Payment</h3>
            <div className="flex items-center gap-3 rounded-2xl border border-primary bg-primary/5 p-4 shadow-sm">
              <img src={comeraLogo.url} alt="Safqah Capital" className="h-10 w-10 rounded-lg object-contain" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Pay with Safqah Capital</p>
                <p className="text-xs text-muted-foreground">Secure one-tap checkout</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            </div>
          </div>
        )}

        {/* Total & Book button */}
        <div className="mx-4 mt-6">
          <div className="rounded-2xl bg-card border border-border p-4 mb-4">
            <h3 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Order Summary</h3>
            {pointsUsed > 0 && (
              <div className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">Points</span>
                <span className="font-semibold text-foreground">{pointsUsed.toLocaleString()} pts</span>
              </div>
            )}
            {cashAmount > 0 && (
              <div className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">Cash</span>
                <span className="font-semibold text-foreground">AED {cashAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="h-px bg-border my-1.5" />
            <div className="flex justify-between text-sm py-1">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-foreground">
                {pointsUsed > 0 && `${pointsUsed.toLocaleString()} pts`}
                {pointsUsed > 0 && cashAmount > 0 && " + "}
                {cashAmount > 0 && `AED ${cashAmount.toFixed(2)}`}
              </span>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full rounded-xl bg-primary text-primary-foreground py-3.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Confirm & Book
          </button>
        </div>
      </div>
    );
  }

  // ─── RESULTS SCREEN ───
  if (step === "results") {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background pb-20">
        <div className="bg-primary px-4 py-4 pb-5">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => setStep("search")} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
              <ArrowLeft className="h-4 w-4 text-primary-foreground" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-primary-foreground">
                <span className="font-bold text-sm">{from?.code}</span>
                <Plane className="h-3.5 w-3.5" />
                <span className="font-bold text-sm">{to?.code}</span>
              </div>
              <p className="text-xs text-primary-foreground/70 mt-0.5">
                {date && format(date, "EEE, dd MMM yyyy")} · 1 Passenger · Economy
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <span className="text-xs text-muted-foreground font-medium">{FLIGHTS.length} flights found</span>
          <span className="text-xs text-primary font-semibold">Sort by: Price ↑</span>
        </div>

        <div className="px-4 py-3 space-y-3">
          {FLIGHTS.map((flight) => (
            <button
              key={flight.id}
              onClick={() => handleSelectFlight(flight)}
              className="w-full rounded-2xl bg-card border border-border p-4 shadow-sm text-left hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{flight.logo}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{flight.airline}</p>
                    <p className="text-[10px] text-muted-foreground">{flight.code}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">AED {flight.price}</p>
                  <p className="text-[10px] text-primary font-medium">{flight.points.toLocaleString()} pts</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-base font-bold text-foreground">{flight.depart}</p>
                  <p className="text-[10px] text-muted-foreground">{from?.code}</p>
                </div>
                <div className="flex-1 mx-3 flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground mb-1">{flight.duration}</span>
                  <div className="w-full h-px bg-border relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-[10px] text-primary font-medium mt-1">{flight.stops}</span>
                </div>
                <div className="text-center">
                  <p className="text-base font-bold text-foreground">{flight.arrive}</p>
                  <p className="text-[10px] text-muted-foreground">{to?.code}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── SEARCH SCREEN ───
  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Flights</h1>
      </div>

      <div className="relative mx-4 overflow-hidden rounded-2xl">
        <img src={travelImg} alt="Flights" className="h-32 w-full object-cover" width={800} height={512} />
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      <div className="mx-4 -mt-4 relative z-10 rounded-2xl bg-card p-5 shadow-lg border border-border">
        <div className="flex gap-6 mb-6 border-b border-border">
          <button
            onClick={() => setTripType("one-way")}
            className={`pb-2.5 text-sm font-medium transition-colors ${
              tripType === "one-way" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
            }`}
          >
            One-way
          </button>
          <button
            onClick={() => setTripType("round-trip")}
            className={`pb-2.5 text-sm font-medium transition-colors ${
              tripType === "round-trip" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
            }`}
          >
            Round-trip
          </button>
        </div>

        {/* From */}
        <div className="mb-4 relative">
          <label className="text-xs font-semibold text-foreground mb-1.5 block">From*</label>
          <button
            onClick={() => { setShowFromDropdown(!showFromDropdown); setShowToDropdown(false); }}
            className="flex w-full items-center rounded-lg border border-border px-3 py-2.5"
          >
            <span className={cn("flex-1 text-sm text-left truncate", from ? "text-foreground" : "text-muted-foreground")}>
              {from ? `${from.name} (${from.code})` : "Select city or airport"}
            </span>
            <MapPin className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
          </button>
          {showFromDropdown && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
              <input
                autoFocus
                value={fromSearch}
                onChange={(e) => setFromSearch(e.target.value)}
                placeholder="Search city..."
                className="w-full px-3 py-2.5 text-sm bg-transparent border-b border-border outline-none text-foreground placeholder:text-muted-foreground"
              />
              {filteredCities(fromSearch, to?.code).map((city) => (
                <button
                  key={city.code}
                  onClick={() => { setFrom(city); setShowFromDropdown(false); setFromSearch(""); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors"
                >
                  <span>{city.name}, {city.country}</span>
                  <span className="text-xs text-muted-foreground font-mono">{city.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* To */}
        <div className="mb-4 relative">
          <label className="text-xs font-semibold text-foreground mb-1.5 block">To*</label>
          <button
            onClick={() => { setShowToDropdown(!showToDropdown); setShowFromDropdown(false); }}
            className="flex w-full items-center rounded-lg border border-border px-3 py-2.5"
          >
            <span className={cn("flex-1 text-sm text-left truncate", to ? "text-foreground" : "text-muted-foreground")}>
              {to ? `${to.name} (${to.code})` : "Select city or airport"}
            </span>
            <MapPin className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
          </button>
          {showToDropdown && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
              <input
                autoFocus
                value={toSearch}
                onChange={(e) => setToSearch(e.target.value)}
                placeholder="Search city..."
                className="w-full px-3 py-2.5 text-sm bg-transparent border-b border-border outline-none text-foreground placeholder:text-muted-foreground"
              />
              {filteredCities(toSearch, from?.code).map((city) => (
                <button
                  key={city.code}
                  onClick={() => { setTo(city); setShowToDropdown(false); setToSearch(""); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors"
                >
                  <span>{city.name}, {city.country}</span>
                  <span className="text-xs text-muted-foreground font-mono">{city.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">Departure*</label>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex w-full items-center rounded-lg border border-border px-3 py-2.5">
                  <span className={cn("flex-1 text-sm text-left truncate", date ? "text-foreground" : "text-muted-foreground")}>
                    {date ? format(date, "dd MMM yyyy") : "Select Date"}
                  </span>
                  <Clock className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">Passengers*</label>
            <div className="flex items-center rounded-lg border border-border px-3 py-2.5">
              <span className="flex-1 text-sm text-foreground truncate">1 Pax, Economy</span>
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
            </div>
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={!canSearch}
          className={cn(
            "w-full rounded-xl py-3.5 text-sm font-semibold transition-colors",
            canSearch
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Search Flights
        </button>
      </div>
    </div>
  );
};

export default FlightsPage;
