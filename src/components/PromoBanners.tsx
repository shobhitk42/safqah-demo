import { useNavigate } from "react-router-dom";
import { Plane, Gift, Sparkles, ArrowRight } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const PromoBanners = () => {
  const navigate = useNavigate();
  const { mode } = useUser();

  const banners = [
    {
      title: mode === "points" ? "Fly with points" : "Flights, on your terms",
      subtitle: mode === "points" ? "Port Louis → Réunion from 12,000 pts" : "Instalments on all flight bookings",
      icon: Plane,
      to: "/flights",
    },
    {
      title: "Gift card selection",
      subtitle: "Additional value across curated partners",
      icon: Gift,
      to: "/gift-cards",
    },
    {
      title: "Weekend privileges",
      subtitle: "Enhanced earn rate across the collection",
      icon: Sparkles,
      to: "/merchandise",
    },
  ];

  return (
    <div className="mb-8 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto px-5 pb-1 scrollbar-hide snap-x snap-mandatory">
        {banners.map((b) => {
          const Icon = b.icon;
          return (
            <button
              key={b.title}
              onClick={() => navigate(b.to)}
              className="snap-start shrink-0 w-[calc(100%-2.5rem)] relative overflow-hidden rounded-[16px] p-6 text-left bg-card border border-[#E8E8EE]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/50">Featured</p>
                  <p
                    className="mt-3 text-[17px] leading-snug text-foreground"
                    style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 400, letterSpacing: 0 }}
                  >
                    {b.title}
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-foreground/55">{b.subtitle}</p>
                  <span
                    className="mt-5 inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em]"
                    style={{ color: "#02AD4C" }}
                  >
                    Explore <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                  </span>
                </div>
                <Icon className="h-5 w-5 text-foreground shrink-0" strokeWidth={1.25} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PromoBanners;
