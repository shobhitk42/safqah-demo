import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarRange, Eye, EyeOff, Handshake, ListTree, Settings, ShieldCheck, Wallet, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import DealCard from "@/components/DealCard";
import RewardsLoader from "@/components/RewardsLoader";
import hotelModern from "@/assets/hotel-modern.jpg";
import hotelClassic from "@/assets/hotel-classic.jpg";
import exploreImg from "@/assets/exp-ritz-dubai.jpg";

const Chip = ({ icon: Icon, label }: { icon: typeof CalendarRange; label: string }) => (
  <>
    <Icon className="h-4 w-4" strokeWidth={1.75} />
    {label}
  </>
);

const deals = [
  { name: "Badie AlQairawan", roi: "38.16%", duration: "30 month", image: hotelModern, chips: ["Multiple durations", "Periodic Distributions"] },
  { name: "Al Reem 36", roi: "31.08%", duration: "24 month", image: hotelClassic, chips: ["Periodic Distributions"] },
  { name: "Ishbiliya", roi: "39.68%", duration: "30 month", image: exploreImg, chips: ["Multiple durations"] },
];

const navItems = [
  { icon: Handshake, label: "Deals", active: true },
  { icon: Wallet, label: "Portfolio", active: false },
  { icon: Settings, label: "Settings", active: false },
];

/** Static replica of the Safqah investment app's Deals screen; the CTA opens the rewards app. */
const SafqahDeals = () => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const openRewards = () => {
    if (loading) return;
    setLoading(true);
    // the home screen picks up the loader and fades it out, so there is no hard cut
    timer.current = setTimeout(() => navigate("/loyalty", { state: { fromLoader: true } }), 2400);
  };

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-28">
      {loading && <RewardsLoader />}
      <div className="flex items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-3">
          <span className="text-[17px] font-bold text-foreground">Hi</span>
          <button
            onClick={() => setHidden((h) => !h)}
            aria-label={hidden ? "Show details" : "Hide details"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted"
          >
            {hidden ? <EyeOff className="h-4 w-4 text-foreground/70" /> : <Eye className="h-4 w-4 text-foreground/70" />}
          </button>
        </div>
        <Button size="sm" className="gap-2" onClick={openRewards} disabled={loading}>
          <Gift className="h-4 w-4" />
          Redeem your points
        </Button>
      </div>

      <div className="px-5 pt-10">
        <p className="text-[13px] text-foreground/50">Choose what suits you from</p>
        <h1 className="mt-1 text-[19px] font-bold text-foreground">Available deals for investment</h1>

        <div className="mt-6 flex flex-col gap-8">
          {deals.map((d) => (
            <DealCard
              key={d.name}
              image={d.image}
              title={d.name}
              topChips={d.chips.map((c) => (
                <Chip key={c} icon={c === "Multiple durations" ? CalendarRange : ListTree} label={c} />
              ))}
              badge={<Chip icon={ShieldCheck} label="Land Pledged" />}
              rows={[
                { label: "ROI", value: d.roi },
                { label: "Duration", value: d.duration },
              ]}
            />
          ))}
        </div>
      </div>

      <nav aria-label="Deals navigation" className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-border bg-card/95 backdrop-blur">
        <div className="flex">
          {navItems.map(({ icon: Icon, label, active }) => (
            <div key={label} className="relative flex flex-1 flex-col items-center gap-1 pb-3 pt-3">
              {active && <span className="absolute inset-x-6 top-0 h-[3px] rounded-full bg-primary" />}
              <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-foreground/40"}`} strokeWidth={1.5} />
              <span className={`text-[12px] ${active ? "font-semibold text-primary" : "text-foreground/40"}`}>{label}</span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SafqahDeals;
