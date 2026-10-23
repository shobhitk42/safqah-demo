import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  PlaneTakeoff,
  Repeat,
  ShoppingBag,
  Gift,
  Smartphone,
  Coins,
  Heart,
  Trophy,
  Dices,
  BedDouble,
  CarFront,
  Gem,
  Armchair,
  Tag,
} from "lucide-react";

const travelSubcategories = [
  { icon: PlaneTakeoff, label: "Flights", path: "/flights" },
  { icon: BedDouble, label: "Hotels", path: "/hotels" },
  { icon: CarFront, label: "Car Rental", path: "/car-rental" },
  { icon: Armchair, label: "Lounge", path: "/lounge" },
];

const categories = [
  { icon: Plane, label: "Travel", hasSubmenu: true, path: "" },
  { icon: Tag, label: "Offers", path: "/offers" },
  { icon: Gem, label: "Experiences", path: "/experiences" },
  { icon: Repeat, label: "Points Exchange", path: "/points-exchange" },
  { icon: ShoppingBag, label: "Merchandise", path: "/merchandise" },
  { icon: Trophy, label: "Sports / Events", path: "/sports-events" },
  { icon: Heart, label: "Charity", path: "/category/charity" },
  { icon: Gift, label: "Gift Cards", path: "/gift-cards" },
  { icon: Smartphone, label: "Mobile Top-up", path: "/mobile-topup" },
  { icon: Coins, label: "Cashback", path: "/cashback" },
  { icon: Dices, label: "Play & Win", path: "/play-win" },
];

const CategoryNav = () => {
  const navigate = useNavigate();
  const [showTravel, setShowTravel] = useState(false);
  const [active, setActive] = useState<string>("Travel");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowTravel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      ref={dropdownRef}
      className={`relative bg-background border-y border-[#E8E8EE] py-4 mb-6 stagger-item stagger-4 ${showTravel ? "z-[60]" : ""}`}
      aria-label="Categories"
    >
      <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
        <ul className="flex items-center gap-x-12 px-6 whitespace-nowrap">
          {categories.map((cat) => {
            const isActive = active === cat.label;
            const Icon = cat.icon;
            return (
              <li key={cat.label} className="relative">
                <button
                  onClick={() => {
                    setActive(cat.label);
                    if (cat.hasSubmenu) {
                      setShowTravel((prev) => !prev);
                    } else if (cat.path) {
                      navigate(cat.path);
                    }
                  }}
                  className="group relative inline-flex items-center gap-2 py-2"
                  style={{ transition: "transform 160ms ease-out" }}
                >
                  <Icon
                    className="h-4 w-4 transition-all"
                    strokeWidth={isActive ? 2 : 1.5}
                    fill={isActive ? "#02AD4C" : "none"}
                    style={{ color: isActive ? "#02AD4C" : "#9CA3AF" }}
                  />
                  <span
                    className="text-[11px] tracking-[0.22em] uppercase"
                    style={{
                      color: isActive ? "#02AD4C" : "#9CA3AF",
                      fontWeight: isActive ? 600 : 500,
                      transition: "color 200ms cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                  >
                    {cat.label}
                  </span>
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute left-0 right-0 -bottom-[17px] h-[2px] origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    style={{
                      backgroundColor: "#02AD4C",
                      transition: "transform 300ms cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>


      {showTravel && (
        <div className="absolute left-6 top-full z-[100] mt-2 w-52 bg-card border border-[#E8E8EE] shadow-lg rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {travelSubcategories.map((sub) => {
            const SubIcon = sub.icon;
            return (
              <button
                key={sub.label}
                onClick={() => {
                  setShowTravel(false);
                  navigate(sub.path);
                }}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-[11px] tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground hover:bg-muted/40 transition-colors"
              >
                <SubIcon className="h-3.5 w-3.5" strokeWidth={1} />
                {sub.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default CategoryNav;
