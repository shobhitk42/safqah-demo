import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, Award, ShoppingCart } from "lucide-react";

const tabs = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Award, label: "Rewards", path: "/rewards" },
  { icon: ShoppingCart, label: "Cart", path: "/cart" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-card/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_-8px_rgba(15,23,42,0.12)]"
      style={{
        paddingBottom: "max(env(safe-area-inset-bottom), 4px)",
      }}
    >
      <div className="flex items-stretch justify-around px-1 pt-1.5">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[48px] py-1 rounded-lg"
              style={{ transition: "transform 120ms ease-out" }}
            >
              <span
                className="relative flex items-center justify-center h-6 w-9"
                style={{
                  color: isActive ? "#02AD4C" : "#9CA3AF",
                  transition: "color 200ms ease",
                }}
              >
                <Icon
                  className="relative h-[18px] w-[18px] transition-all"
                  strokeWidth={isActive ? 2 : 1.5}
                  fill={isActive ? "currentColor" : "none"}
                />
              </span>
              <span
                className="text-[9px] font-medium tracking-wide leading-tight"
                style={{
                  color: isActive ? "#02AD4C" : "#9CA3AF",
                  transition: "color 200ms ease",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
