import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, ChevronsUpDown, Plane, Clock, ChevronRight, Check, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import travelImg from "@/assets/travel.jpg";
import { toast } from "sonner";
import BookingHeader from "@/components/booking/BookingHeader";
import BottomAction from "@/components/booking/BottomAction";
import GuestDetailsForm, { useGuestForm } from "@/components/booking/GuestDetailsForm";
import PointsPaymentStep from "@/components/booking/PointsPaymentStep";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import FlightDetail from "@/components/booking/FlightDetail";
import { makeReference } from "@/components/booking/hotelData";
import { useBookings } from "@/contexts/BookingsContext";
import { useUser } from "@/contexts/UserContext";

const CITIES = [
  // Featured destinations first
  { code: "LHR", name: "London", country: "United Kingdom" },
  { code: "CDG", name: "Paris", country: "France" },
  { code: "JFK", name: "New York", country: "USA" },
  { code: "MXP", name: "Milan", country: "Italy" },
  { code: "GVA", name: "Geneva", country: "Switzerland" },
  { code: "BCN", name: "Barcelona", country: "Spain" },
  { code: "NRT", name: "Tokyo", country: "Japan" },
  { code: "SIN", name: "Singapore", country: "Singapore" },
  { code: "MLE", name: "Maldives", country: "Maldives" },
  { code: "IST", name: "Istanbul", country: "Türkiye" },
  // Saudi Arabia
  { code: "RUH", name: "Riyadh", country: "Saudi Arabia" },
  { code: "JED", name: "Jeddah", country: "Saudi Arabia" },
  { code: "DMM", name: "Dammam", country: "Saudi Arabia" },
  { code: "MED", name: "Madinah", country: "Saudi Arabia" },
  // Regional
  { code: "DXB", name: "Dubai", country: "UAE" },
  { code: "DOH", name: "Doha", country: "Qatar" },
  { code: "BAH", name: "Bahrain", country: "Bahrain" },
  { code: "KWI", name: "Kuwait", country: "Kuwait" },
];

const FLIGHTS = [
  { id: 1, airline: "Saudia", code: "SV 601", depart: "06:15", arrive: "07:45", duration: "1h 30m", stops: "Non-stop", price: 42, points: 4200, logo: "✈️" },
  { id: 2, airline: "flynas", code: "XY 301", depart: "08:30", arrive: "10:00", duration: "1h 30m", stops: "Non-stop", price: 65, points: 6500, logo: "🇸🇦" },
  { id: 3, airline: "Saudia", code: "SV 102", depart: "09:45", arrive: "11:20", duration: "1h 35m", stops: "Non-stop", price: 29, points: 2900, logo: "✈️" },
  { id: 4, airline: "Saudia", code: "SV 605", depart: "11:00", arrive: "12:30", duration: "1h 30m", stops: "Non-stop", price: 47, points: 4700, logo: "✈️" },
  { id: 5, airline: "flyadeal", code: "F3 410", depart: "13:20", arrive: "14:50", duration: "1h 30m", stops: "Non-stop", price: 35, points: 3500, logo: "🛩️" },
  { id: 6, airline: "flynas", code: "XY 305", depart: "15:00", arrive: "16:30", duration: "1h 30m", stops: "Non-stop", price: 58, points: 5800, logo: "🇸🇦" },
  { id: 7, airline: "Saudia", code: "SV 106", depart: "16:40", arrive: "18:15", duration: "1h 35m", stops: "Non-stop", price: 31, points: 3100, logo: "✈️" },
  { id: 8, airline: "Saudia", code: "SV 609", depart: "18:45", arrive: "20:15", duration: "1h 30m", stops: "Non-stop", price: 48, points: 4800, logo: "✈️" },
  { id: 9, airline: "flyadeal", code: "F3 418", depart: "20:30", arrive: "22:00", duration: "1h 30m", stops: "Non-stop", price: 38, points: 3800, logo: "🛩️" },
  { id: 10, airline: "Saudia", code: "SV 613", depart: "22:15", arrive: "23:45", duration: "1h 30m", stops: "Non-stop", price: 44, points: 4400, logo: "✈️" },
];

const USER_POINTS = 24580;

type Step = "search" | "results" | "details" | "travellers" | "payment" | "success";

const FlightsPage = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [step, setStep] = useState<Step>("search");
  const [from, setFrom] = useState<typeof CITIES[0] | null>(null);
  const [to, setTo] = useState<typeof CITIES[0] | null>(null);
  const [date, setDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");

  // Payment state
  const [selectedFlight, setSelectedFlight] = useState<typeof FLIGHTS[0] | null>(null);
  const [reference, setReference] = useState("");
  const traveller = useGuestForm(1);
  const { addBooking } = useBookings();
  const { user } = useUser();

  const isRound = tripType === "round-trip";
  const canSearch = from && to && date && (!isRound || returnDate);

  const handleSearch = () => {
    if (canSearch) setStep("results");
  };

  const handleSelectFlight = (flight: typeof FLIGHTS[0]) => {
    setSelectedFlight(flight);
    setStep("details");
  };

  const handleBook = () => {
    if (!selectedFlight || !from || !to) return;
    const ref = makeReference("FLT");
    setReference(ref);
    addBooking({
      item: `${from.name} → ${to.name}`,
      category: "Flights",
      points: selectedFlight.points,
      date: date ? format(date, "dd MMM yyyy") + (isRound && returnDate ? ` – ${format(returnDate, "dd MMM yyyy")}` : "") : "",
      status: "Confirmed",
      meta: `${selectedFlight.airline} ${selectedFlight.code} · ${ref}`,
    });
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
  const flightPoints = selectedFlight?.points || 0;

  const pointsUsed = flightPoints;

  const STEPS = ["Flight", "Traveller", "Payment"];
  const wrap = (children: React.ReactNode, title: string, current: number, back: () => void) => (
    <div className="mx-auto min-h-screen max-w-md bg-background">
      <BookingHeader title={title} onBack={back} steps={STEPS} current={current} />
      {children}
    </div>
  );
  const dateLabel = date ? format(date, "EEE, dd MMM yyyy") : "";
  const returnLabel = isRound && returnDate ? format(returnDate, "EEE, dd MMM yyyy") : "";
  const lead = traveller.people[0];

  // ─── FLIGHT DETAILS ───
  if (step === "details" && selectedFlight && from && to) {
    return wrap(
      <FlightDetail flight={selectedFlight} from={from} to={to} dateLabel={returnLabel ? `${dateLabel} · Return ${returnLabel}` : dateLabel} onContinue={() => { traveller.setShowErrors(false); setStep("travellers"); }} />,
      "Flight details",
      0,
      () => setStep("results"),
    );
  }

  // ─── TRAVELLER DETAILS ───
  if (step === "travellers" && selectedFlight) {
    return wrap(
      <>
        <GuestDetailsForm
          noun="Traveller"
          people={traveller.people}
          onPeopleChange={traveller.setPeople}
          contact={traveller.contact}
          onContactChange={traveller.setContact}
          showErrors={traveller.showErrors}
        />
        <BottomAction
          label="Continue to payment"
          onClick={() => {
            if (!traveller.valid) {
              traveller.setShowErrors(true);
              toast.error("Please complete the traveller details");
              return;
            }
            setStep("payment");
          }}
        />
      </>,
      "Traveller details",
      1,
      () => setStep("details"),
    );
  }

  // ─── PAYMENT ───
  if (step === "payment" && selectedFlight && from && to) {
    return wrap(
      <PointsPaymentStep
        totalPoints={flightPoints}
        onConfirm={handleBook}
        rows={[
          { label: "Flight", value: `${selectedFlight.airline} ${selectedFlight.code}` },
          { label: "Route", value: `${from.name} (${from.code}) → ${to.name} (${to.code})` },
          { label: isRound ? "Departure date" : "Date", value: dateLabel },
          ...(returnLabel ? [{ label: "Return date", value: returnLabel }] : []),
          { label: "Time", value: `${selectedFlight.depart} – ${selectedFlight.arrive}` },
          { label: "Traveller", value: `${lead.title} ${lead.firstName} ${lead.lastName}` },
          { label: "Cabin", value: "Economy" },
        ]}
      />,
      "Payment",
      2,
      () => setStep("travellers"),
    );
  }

  // ─── CONFIRMATION ───
  if (step === "success" && selectedFlight && from && to) {
    return (
      <BookingConfirmation
        heading="Flight booked"
        reference={reference}
        email={traveller.contact.email}
        pointsUsed={flightPoints}
        balanceAfter={user.availablePoints - flightPoints}
        rows={[
          { label: "Flight", value: `${selectedFlight.airline} ${selectedFlight.code}` },
          { label: "Route", value: `${from.code} → ${to.code}` },
          { label: "Departure", value: `${dateLabel}, ${selectedFlight.depart}` },
          ...(returnLabel ? [{ label: "Return", value: returnLabel }] : []),
          { label: "Arrival", value: selectedFlight.arrive },
          { label: "Traveller", value: `${lead.title} ${lead.firstName} ${lead.lastName}` },
        ]}
      />
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
                {date && format(date, "EEE, dd MMM yyyy")}{isRound && returnDate && ` – ${format(returnDate, "EEE, dd MMM")}`} · 1 Passenger · Economy
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
              className="w-full rounded-2xl bg-[#F1EEEA] border border-transparent p-4 text-left hover:border-primary/40 transition-colors"
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
                  <p className="text-sm font-bold text-primary">{flight.points.toLocaleString()} pts</p>
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
        <button onClick={() => navigate("/loyalty")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Flights</h1>
      </div>

      <div className="relative mx-4 overflow-hidden rounded-2xl">
        <img src={travelImg} alt="Flights" className="h-32 w-full object-cover" width={800} height={512} />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 flex items-center gap-2 px-5">
          <Plane className="h-5 w-5 text-primary-foreground" />
          <h2 className="text-lg font-bold text-primary-foreground">Fly with your points</h2>
        </div>
      </div>

      <div className="mx-4 mt-5 pb-6 border-b border-border">
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
            className="flex w-full items-center border-b border-[#CFCBD0] px-0 py-3 text-left"
          >
            <span className={cn("flex-1 text-sm text-left truncate", from ? "text-foreground" : "text-muted-foreground")}>
              {from ? `${from.name} (${from.code})` : "Select city or airport"}
            </span>
            <MapPin className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
          </button>
          {showFromDropdown && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-xl border border-border bg-card shadow-lg">
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
            className="flex w-full items-center border-b border-[#CFCBD0] px-0 py-3 text-left"
          >
            <span className={cn("flex-1 text-sm text-left truncate", to ? "text-foreground" : "text-muted-foreground")}>
              {to ? `${to.name} (${to.code})` : "Select city or airport"}
            </span>
            <MapPin className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
          </button>
          {showToDropdown && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-xl border border-border bg-card shadow-lg">
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

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">Departure*</label>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex w-full items-center border-b border-[#CFCBD0] px-0 py-3 text-left">
                  <span className={cn("flex-1 text-sm text-left truncate", date ? "text-foreground" : "text-muted-foreground")}>
                    {date ? format(date, "dd MMM yyyy") : "Select Date"}
                  </span>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { setDate(d); if (d && returnDate && returnDate < d) setReturnDate(undefined); }}
                  disabled={(d) => d < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          {isRound && (
            <div>
              <label className="text-xs font-semibold text-foreground mb-1.5 block">Return*</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex w-full items-center border-b border-[#CFCBD0] px-0 py-3 text-left">
                    <span className={cn("flex-1 text-sm text-left truncate", returnDate ? "text-foreground" : "text-muted-foreground")}>
                      {returnDate ? format(returnDate, "dd MMM yyyy") : "Select Date"}
                    </span>
                    <CalendarIcon className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    disabled={(d) => d < (date ?? new Date())}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
          {!isRound && (
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">Passengers*</label>
            <div className="flex items-center border-b border-[#CFCBD0] px-0 py-3">
              <span className="flex-1 text-sm text-foreground truncate">1 Pax, Economy</span>
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
            </div>
          </div>
          )}
        </div>
        {isRound ? <div className="mb-6">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">Passengers*</label>
            <div className="flex items-center border-b border-[#CFCBD0] px-0 py-3">
              <span className="flex-1 text-sm text-foreground truncate">1 Pax, Economy</span>
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
            </div>
          </div>
        </div> : null}

        <button
          onClick={handleSearch}
          disabled={!canSearch}
          className="h-12 w-full rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          Search Flights
        </button>
      </div>
    </div>
  );
};

export default FlightsPage;
