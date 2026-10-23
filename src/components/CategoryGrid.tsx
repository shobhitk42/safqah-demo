import { useNavigate } from "react-router-dom";
import {
  Apple, Smartphone, Wallet, PlaneTakeoff, BedDouble, CarFront, Compass, Gift, Package,
  Armchair, Ticket, ArrowLeftRight, Coins, Heart, Users, BadgePercent,
} from "lucide-react";

const categories = [
  { icon: Apple, label: "Apple Store", path: "/apple-store" },
  { icon: Smartphone, label: "Samsung Store", path: "/samsung-store" },
  { icon: Wallet, label: "Instant Purchase", path: "/pay-with-rewards" },
  { icon: PlaneTakeoff, label: "Flights", path: "/flights" },
  { icon: BedDouble, label: "Hotels", path: "/hotels" },
  { icon: CarFront, label: "Car Rental", path: "/car-rental" },
  { icon: Compass, label: "Experiences", path: "/experiences" },
  { icon: Gift, label: "Gift Cards", path: "/gift-cards" },
  { icon: Package, label: "Merchandise", path: "/merchandise" },
  { icon: Armchair, label: "Lounge", path: "/lounge" },
  { icon: Ticket, label: "Sports / Events", path: "/sports-events" },
  { icon: ArrowLeftRight, label: "Miles Exchange", path: "/points-exchange" },
  { icon: Smartphone, label: "Mobile Top-up", path: "/mobile-topup" },
  { icon: Coins, label: "Cashback", path: "/cashback" },
  { icon: Heart, label: "Donations", path: "/donations" },
  { icon: Users, label: "Peer to Peer Transfer", path: "/peer-transfer" },
  { icon: BadgePercent, label: "Offers", path: "/offers" },
];

const CategoryGrid = () => {
  const navigate = useNavigate();
  return (
    <section className="mb-6 px-4 stagger-item stagger-4" aria-label="Explore Rewards">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
        <span className="h-5 w-1 rounded-full bg-[#FCEE21]" />
        Explore Rewards
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {categories.map(({ icon: Icon, label, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card px-2 py-4 text-center shadow-sm transition-transform active:scale-[0.97]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="text-[11px] font-semibold leading-tight text-foreground">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
