import DealCard from "@/components/DealCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, ChevronsUpDown, Search, Hotel, Star } from "lucide-react";
import { toast } from "sonner";
import hotelBeach from "@/assets/hotel-beach.jpg";
import hotelClassic from "@/assets/hotel-classic.jpg";
import hotelModern from "@/assets/hotel-modern.jpg";
import hotelDesert from "@/assets/hotel-desert.jpg";
import hotelImg from "@/assets/hotel.jpg";

const popular = [
  { name: "Park Hyatt Jeddah", price: 24000, image: hotelBeach, rating: 4.9 },
  { name: "Four Seasons Hotel Riyadh", price: 32000, image: hotelClassic, rating: 4.9 },
  { name: "The Ritz-Carlton, Riyadh", price: 45000, image: hotelModern, rating: 5.0 },
  { name: "Rosewood Jeddah", price: 38000, image: hotelBeach, rating: 4.8 },
  { name: "Banyan Tree AlUla", price: 42000, image: hotelDesert, rating: 4.9 },
  { name: "Habitas AlUla", price: 36000, image: hotelClassic, rating: 4.8 },
];

const searchResults = [
  { name: "Park Hyatt Jeddah", area: "Jeddah Corniche", price: 24000, image: hotelBeach, rating: 4.9, tag: "Beachfront" },
  { name: "Four Seasons Hotel Riyadh", area: "Kingdom Centre, Riyadh", price: 32000, image: hotelClassic, rating: 4.9, tag: "5-Star Villa" },
  { name: "The Ritz-Carlton, Riyadh", price: 45000, image: hotelModern, area: "Al Hada, Riyadh", rating: 5.0, tag: "Luxury Icon" },
  { name: "Rosewood Jeddah", area: "Jeddah Corniche", price: 38000, image: hotelBeach, rating: 4.8, tag: "Waterfront" },
  { name: "Banyan Tree AlUla", area: "AlUla", price: 42000, image: hotelDesert, rating: 4.9, tag: "Desert Retreat" },
];

const HotelsPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"search" | "results">("search");
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("08/04/2026");
  const [checkOut, setCheckOut] = useState("09/04/2026");

  const handleSearch = () => {
    if (!location.trim()) {
      toast.error("Please enter a destination");
      return;
    }
    setStep("results");
  };

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => (step === "results" ? setStep("search") : navigate("/loyalty"))} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{step === "results" ? `Hotels in ${location}` : "Hotels"}</h1>
      </div>

      {step === "search" && (
        <>
          <div className="relative mx-4 overflow-hidden rounded-2xl">
            <img src={hotelImg} alt="Hotels" className="h-32 w-full object-cover" width={512} height={512} />
            <div className="absolute inset-0 bg-primary/60" />
            <div className="absolute inset-0 flex items-center gap-2 px-5">
              <h2 className="text-lg font-bold text-primary-foreground">Book your next luxury stay</h2>
              <Hotel className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>

          <div className="mx-4 mt-4 py-4 border-b">
            <div className="mb-3">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase">Location</label>
              <div className="flex items-center gap-2 mt-1 border-b px-3 py-2.5">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="e.g. Riyadh, Jeddah, AlUla" className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase">Check In</label>
                <div className="flex items-center gap-1 mt-1 border-b px-3 py-2.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <input type="date" value={checkIn.split('/').reverse().join('-')} onChange={(e) => setCheckIn(e.target.value.split('-').reverse().join('/'))} className="w-full bg-transparent text-xs font-medium text-foreground outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase">Check Out</label>
                <div className="flex items-center gap-1 mt-1 border-b px-3 py-2.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <input type="date" value={checkOut.split('/').reverse().join('-')} onChange={(e) => setCheckOut(e.target.value.split('-').reverse().join('/'))} className="w-full bg-transparent text-xs font-medium text-foreground outline-none" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase">Guests</label>
                <div className="flex items-center gap-1 mt-1 rounded-lg px-3 py-2.5">
                  <span className="text-sm font-medium text-foreground">2 · 1 Room</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase">Nationality</label>
                <div className="flex items-center gap-1 mt-1 rounded-lg px-3 py-2.5">
                  <span className="text-sm font-medium text-foreground">Saudi Arabia</span>
                  <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
                </div>
              </div>
            </div>
            <button onClick={handleSearch} className="w-full items-center justify-center gap-2 flex items-center justify-center gap-2 h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
              <Search className="h-4 w-4" />
              Search Hotels
            </button>
          </div>

          <div className="px-4 py-6">
            <h3 className="text-base font-semibold text-foreground mb-3">Popular Luxury Stays</h3>
            <div className="flex flex-col gap-6">
              {popular.map((h) => (
                <DealCard
                  key={h.name}
                  image={h.image}
                  title={h.name}
                  topChips={["Luxury stay"]}
                  rows={[
                    { label: "Points", value: `${h.price.toLocaleString()} pts / night` },
                  ]}
                  onClick={() => toast.success(`Booking ${h.name}`, { description: `${h.price.toLocaleString()} pts / night` })}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {step === "results" && (
        <div className="px-4 py-2">
          <p className="text-xs text-muted-foreground mb-3">{checkIn} - {checkOut} · {searchResults.length} properties</p>
          <div className="flex flex-col gap-6">
            {searchResults.map((h) => (
              <DealCard
                key={h.name}
                image={h.image}
                title={h.name}
                topChips={[h.tag, `★ ${h.rating}`]}
                badge={h.area}
                rows={[
                  { label: "Points", value: `${h.price.toLocaleString()} pts / night` },
                ]}
                onClick={() => toast.success(`Booking ${h.name}`, { description: `${h.price.toLocaleString()} pts / night` })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelsPage;
