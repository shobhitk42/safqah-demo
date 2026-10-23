import { useNavigate } from "react-router-dom";
import { ArrowLeft, Coffee, MapPin } from "lucide-react";
import { toast } from "sonner";

import hotelImg from "@/assets/hotel.jpg";

const lounges = [
  { name: "Saudia Al Fursan Lounge", airport: "Riyadh (RUH)", points: "3,000" },
  { name: "Plaza Premium Lounge", airport: "Jeddah (JED)", points: "2,500" },
  { name: "Business Lounge", airport: "Dammam (DMM)", points: "2,800" },
  { name: "Qatar Airways Lounge", airport: "Doha (DOH)", points: "3,500" },
  { name: "Gulf Air Falcon Gold Lounge", airport: "Bahrain (BAH)", points: "2,200" },
];

const LoungePage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Airport Lounges</h1>
      </div>

      <div className="relative mx-4 mb-6 overflow-hidden rounded-2xl">
        <img src={hotelImg} alt="Lounges" className="h-36 w-full object-cover" width={512} height={512} />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 flex flex-col justify-center px-6">
          <div className="flex items-center gap-2 mb-1">
            <Coffee className="h-5 w-5 text-primary-foreground" />
            <h2 className="text-lg font-bold text-primary-foreground">Premium Lounges</h2>
          </div>
          <p className="text-xs text-primary-foreground/80">Relax before your flight with reward points</p>
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="flex flex-col gap-3">
          {lounges.map((lounge) => (
            <button
              key={lounge.name}
              onClick={() => toast.success(`${lounge.name} access booked`, { description: `${lounge.airport} · ${lounge.points} pts redeemed` })}
              className="w-full text-left flex items-start gap-3 rounded-xl bg-card p-4 shadow-sm cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                <Coffee className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-card-foreground">{lounge.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{lounge.airport}</p>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs font-bold text-reward-gold">{lounge.points} pts</span>
                </div>
              </div>
            </button>

          ))}
        </div>
      </div>
    </div>
  );
};

export default LoungePage;
