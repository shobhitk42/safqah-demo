import SectionTitle from "@/components/SectionTitle";
import { useNavigate } from "react-router-dom";
import {
  Apple, Smartphone, Wallet, PlaneTakeoff, BedDouble, CarFront, Compass, Gift, Package,
  Armchair, Ticket, ArrowLeftRight, Coins, Heart, Users, BadgePercent,
} from "lucide-react";

const categories = [
  // { icon: Apple, label: "Apple Store", path: "/apple-store" }, // hidden for now
  // { icon: Smartphone, label: "Samsung Store", path: "/samsung-store" }, // hidden for now
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
    <section className="mb-8 px-5 stagger-item stagger-4" aria-label="Explore Rewards">
      <SectionTitle title="Explore Rewards" />
      <div className="grid grid-cols-4 gap-x-2 gap-y-5">
        {categories.map(({ icon: Icon, label, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="group flex flex-col items-center gap-2 rounded-2xl text-center focus-visible:outline-none"
          >
            <span
              className="flex h-[60px] w-[60px] items-center justify-center rounded-[20px] border border-[#02AD4C]/15 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-[#02AD4C]/60 group-hover:!bg-[#E6F6EC] group-hover:shadow-[0_10px_20px_-10px_rgba(2,173,76,0.45)] group-focus-visible:border-[#02AD4C] group-focus-visible:ring-2 group-focus-visible:ring-[#02AD4C]/30 group-active:translate-y-0 group-active:scale-95"
              style={{
                background: "linear-gradient(160deg, #FFFFFF 0%, #F1FAF4 100%)",
                boxShadow: "0 1px 2px rgba(48, 47, 45, 0.04), 0 6px 14px -8px rgba(2, 173, 76, 0.25)",
              }}
            >
              <Icon className="h-6 w-6 text-[#02AD4C] transition-transform duration-200 group-hover:scale-110" strokeWidth={1.75} />
            </span>
            <span className="text-[11px] font-medium leading-tight text-foreground/70 transition-colors group-hover:text-[#02AD4C]">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
