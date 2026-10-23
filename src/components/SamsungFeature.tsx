import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { formatPoints } from "@/data/samsungProducts";
import samsungHero from "@/assets/samsung-s26-family.png.asset.json";

const highlights = [
  { label: "200MP Camera", value: "ProVisual Engine" },
  { label: "Galaxy AI", value: "On-device intelligence" },
  { label: "S Pen", value: "Titanium Violet" },
];

const SamsungFeature = () => {
  return (
    <div className="mb-4 px-3">
      <div className="relative overflow-hidden rounded-2xl bg-foreground shadow-lg">
        <div className="pointer-events-none absolute -left-10 top-6 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-8 bottom-10 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />

        <div className="relative px-4 pt-4 text-center">
          <p className="text-[10px] font-medium tracking-wide text-background/70">New at the Samsung Store</p>
          <h3 className="mt-0.5 text-lg font-bold tracking-tight text-background">Galaxy S26 Ultra</h3>
          <p className="mt-0.5 text-[11px] text-background/70">Epic, just like that. Redeem with Points.</p>
        </div>
        <img
          src={samsungHero.url}
          alt="Samsung Galaxy S26 series in Titanium Violet, Silver and Blue"
          loading="lazy"
          className="relative mx-auto mt-2 h-40 w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.4)]"
        />
        <div className="relative grid grid-cols-3 gap-1.5 px-4 pb-3 pt-2">
          {highlights.map((h) => (
            <div key={h.label} className="rounded-xl bg-background/10 p-2 text-center backdrop-blur">
              <p className="text-[10px] font-semibold text-background">{h.label}</p>
              <p className="mt-0.5 text-[9px] leading-tight text-background/60">{h.value}</p>
            </div>
          ))}
        </div>
        <div className="relative flex items-center justify-between border-t border-background/10 px-4 py-3">
          <div>
            <p className="text-[10px] text-background/60">From</p>
            <p className="text-sm font-bold text-reward-gold">{formatPoints(5399)}</p>
          </div>
          <Link
            to="/samsung-store/galaxy-s26-ultra"
            className="flex items-center gap-1 rounded-full bg-background px-3 py-1.5 text-[11px] font-semibold text-foreground transition-transform hover:scale-105"
          >
            Buy with Points <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SamsungFeature;
