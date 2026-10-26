import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Car, Users, Fuel } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar as DayPicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import travelImg from "@/assets/travel.jpg";

const providers = [
  { name: "Europcar Saudi Arabia", model: "Nissan Almera", type: "Economy", seats: 5, fuel: "Petrol", pts: 2500 },
  { name: "Avis Saudi Arabia", model: "Toyota Yaris", type: "Economy", seats: 5, fuel: "Petrol", pts: 2800 },
  { name: "Hertz Saudi Arabia", model: "Hyundai Tucson", type: "SUV", seats: 5, fuel: "Diesel", pts: 4500 },
  { name: "Sixt Saudi Arabia", model: "BMW 3 Series", type: "Luxury", seats: 5, fuel: "Petrol", pts: 8500 },
  { name: "Budget Saudi Arabia", model: "Kia Picanto", type: "Compact", seats: 4, fuel: "Petrol", pts: 2200 },
];

const CarRentalPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"search" | "results">("search");
  const [pickup, setPickup] = useState("");
  const [pickupDate, setPickupDate] = useState<Date>();
  const [dropDate, setDropDate] = useState<Date>();

  const handleSearch = () => {
    if (!pickup.trim()) {
      toast.error("Please enter pick-up location");
      return;
    }
    setStep("results");
  };

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => (step === "results" ? setStep("search") : navigate("/loyalty"))} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{step === "results" ? "Available Cars" : "Car Rental"}</h1>
      </div>

      {step === "search" && (
        <>
          <div className="relative mx-4 overflow-hidden rounded-2xl">
            <img src={travelImg} alt="Car Rental" className="h-32 w-full object-cover" width={800} height={512} />
            <div className="absolute inset-0 bg-primary/60" />
            <div className="absolute inset-0 flex items-center px-6">
              <div className="flex items-center gap-2">
                <Car className="h-6 w-6 text-primary-foreground" />
                <h2 className="text-lg font-bold text-primary-foreground">Rent a car with points</h2>
              </div>
            </div>
          </div>

          <div className="mx-4 mt-4 py-4 border-b">
            <div className="mb-4">
              <label className="text-xs font-semibold text-foreground mb-1.5 block">Pick-up Location*</label>
              <div className="flex items-center border-b border-[#CFCBD0] py-3">
                <input value={pickup} onChange={(e) => setPickup(e.target.value)} type="text" placeholder="City or airport" className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                <MapPin className="h-4 w-4 text-muted-foreground ml-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Pick-up Date*</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex w-full items-center border-b border-[#CFCBD0] px-0 py-3 text-left">
                      <span className={cn("flex-1 truncate text-sm", pickupDate ? "text-foreground" : "text-muted-foreground")}>
                        {pickupDate ? format(pickupDate, "dd MMM yyyy") : "Select date"}
                      </span>
                      <Calendar className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DayPicker mode="single" selected={pickupDate} onSelect={(d) => { setPickupDate(d); if (d && dropDate && dropDate < d) setDropDate(undefined); }} disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Drop-off Date*</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex w-full items-center border-b border-[#CFCBD0] px-0 py-3 text-left">
                      <span className={cn("flex-1 truncate text-sm", dropDate ? "text-foreground" : "text-muted-foreground")}>
                        {dropDate ? format(dropDate, "dd MMM yyyy") : "Select date"}
                      </span>
                      <Calendar className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <DayPicker mode="single" selected={dropDate} onSelect={setDropDate} disabled={(d) => d < (pickupDate ?? new Date(new Date().setHours(0,0,0,0)))} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <button onClick={handleSearch} className="w-full flex items-center justify-center gap-2 h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">Search Cars</button>
          </div>
        </>
      )}

      {step === "results" && (
        <div className="px-4 py-2">
          <p className="text-xs text-muted-foreground mb-3">Pick-up: {pickup} · {providers.length} vehicles available</p>
          <div className="flex flex-col gap-3">
            {providers.map((p) => (
              <button
                key={p.name}
                onClick={() => toast.success(`Booking ${p.model} from ${p.name}`, { description: `${p.pts.toLocaleString()} pts / day` })}
                className="w-full text-left rounded-xl bg-[#F1EEEA] border border-transparent p-4 active:scale-[0.99] transition-transform"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-card-foreground">{p.model}</p>
                    <p className="text-[11px] text-muted-foreground">{p.name} · {p.type}</p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {p.seats}</span>
                      <span className="flex items-center gap-1"><Fuel className="h-3 w-3" /> {p.fuel}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-reward-gold">{p.pts.toLocaleString()} pts</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarRentalPage;
