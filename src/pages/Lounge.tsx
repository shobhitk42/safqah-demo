import { useNavigate } from "react-router-dom";
import { ArrowLeft, Coffee, MapPin } from "lucide-react";
import { toast } from "sonner";
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

const LoungePage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/loyalty")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
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
          {loungeList.map((lounge, i) => (
            <button
              key={lounge.name}
              onClick={() => toast.success(`${lounge.name} access booked`, { description: `${lounge.airport} · ${lounge.points} pts redeemed` })}
              className="w-full text-left flex items-start gap-3 rounded-xl bg-card p-4 shadow-sm cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <img
                src={lounge.image || (i % 2 === 0 ? loungeImg : hotelImg)}
                alt={lounge.name}
                loading="lazy"
                className="h-16 w-16 shrink-0 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-card-foreground">{lounge.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{lounge.airport}</p>
                </div>
                {lounge.meta && <p className="mt-0.5 text-[11px] text-muted-foreground">{lounge.meta}</p>}
                {lounge.hours && <p className="text-[11px] text-muted-foreground">Open {lounge.hours}</p>}
                {lounge.facilities && <p className="mt-1 text-[11px] text-foreground/60">{lounge.facilities}</p>}
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
