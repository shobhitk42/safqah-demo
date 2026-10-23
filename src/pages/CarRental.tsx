import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Car, Users, Fuel } from "lucide-react";
import { toast } from "sonner";
import travelImg from "@/assets/travel.jpg";

const providers = [
  { name: "Europcar Mauritius", model: "Nissan Almera", type: "Economy", seats: 5, fuel: "Petrol", pts: 2500, cash: 750 },
  { name: "Avis Mauritius", model: "Toyota Yaris", type: "Economy", seats: 5, fuel: "Petrol", pts: 2800, cash: 840 },
  { name: "Hertz Mauritius", model: "Hyundai Tucson", type: "SUV", seats: 5, fuel: "Diesel", pts: 4500, cash: 1350 },
  { name: "Sixt Mauritius", model: "BMW 3 Series", type: "Luxury", seats: 5, fuel: "Petrol", pts: 8500, cash: 2550 },
  { name: "Budget Mauritius", model: "Kia Picanto", type: "Compact", seats: 4, fuel: "Petrol", pts: 2200, cash: 660 },
];

const CarRentalPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"search" | "results">("search");
  const [pickup, setPickup] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropDate, setDropDate] = useState("");

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
        <button onClick={() => (step === "results" ? setStep("search") : navigate("/"))} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
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

          <div className="mx-4 mt-4 rounded-2xl bg-card p-5 shadow-lg border border-border">
            <div className="mb-4">
              <label className="text-xs font-semibold text-foreground mb-1.5 block">Pick-up Location*</label>
              <div className="flex items-center rounded-lg border border-border px-3 py-2.5">
                <input value={pickup} onChange={(e) => setPickup(e.target.value)} type="text" placeholder="Port Louis, SSR Airport, Grand Baie" className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                <MapPin className="h-4 w-4 text-muted-foreground ml-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Pick-up Date*</label>
                <div className="flex items-center rounded-lg border border-border px-3 py-2.5">
                  <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                  <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Drop-off Date*</label>
                <div className="flex items-center rounded-lg border border-border px-3 py-2.5">
                  <input type="date" value={dropDate} onChange={(e) => setDropDate(e.target.value)} className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                  <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
                </div>
              </div>
            </div>
            <button onClick={handleSearch} className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground">Search Cars</button>
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
                onClick={() => toast.success(`Booking ${p.model} from ${p.name}`, { description: `${p.pts.toLocaleString()} pts or AED ${p.cash.toLocaleString()} / day` })}
                className="w-full text-left rounded-xl bg-card border border-border shadow-sm p-4 active:scale-[0.99] transition-transform"
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
                    <p className="text-[10px] text-muted-foreground">or AED {p.cash.toLocaleString()}/day</p>
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
