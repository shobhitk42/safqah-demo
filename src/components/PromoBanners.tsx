import { useNavigate } from "react-router-dom";
import { Plane, Gift, Sparkles } from "lucide-react";
import Banner from "@/components/Banner";
import { useUser } from "@/contexts/UserContext";

const PromoBanners = () => {
  const navigate = useNavigate();
  const { mode } = useUser();

  const banners = [
    {
      title: mode === "points" ? "Fly with points" : "Flights, on your terms",
      subtitle: mode === "points" ? "Riyadh → Jeddah from 12,000 pts" : "Instalments on all flight bookings",
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
      <div className="flex gap-4 overflow-x-auto px-5 scroll-px-5 pb-1 scrollbar-hide snap-x snap-mandatory">
        {banners.map((b) => (
          <div key={b.title} className="snap-start shrink-0 w-[calc(100%-2.5rem)]">
            <Banner title={b.title} subtitle={b.subtitle} cta="Explore" icon={b.icon} onClick={() => navigate(b.to)} className="h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoBanners;
