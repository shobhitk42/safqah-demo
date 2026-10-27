import { Link } from "react-router-dom";
import AppleLogo from "@/components/AppleLogo";
import { ChevronRight } from "lucide-react";
import { formatPoints } from "@/data/appleProducts";
import iphoneHero from "@/assets/iphone-17-pro-hero-new.png.asset.json";

const highlights = [
  { label: "A19 Pro chip", value: "Fastest iPhone ever" },
  { label: "48MP Fusion", value: "Pro camera system" },
  { label: "Titanium", value: "Cosmic Orange finish" },
];

const AppleFeature = () => {
  return (
    <div className="mb-6 px-0">
      <div className="overflow-hidden rounded-3xl bg-foreground shadow-lg">
        <div className="px-5 pt-6 text-center">
          <p className="flex items-center justify-center gap-1.5 text-xs font-medium tracking-wide text-background/70"><AppleLogo className="h-3 w-3" /> New at the Apple Store</p>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-background">iPhone 17 Pro</h3>
          <p className="mt-1 text-sm text-background/70">All out Pro. Redeem entirely with Points.</p>
        </div>
        <img
          src={iphoneHero.url}
          alt="iPhone 17 Pro in Cosmic Orange"
          loading="lazy"
          className="mt-6 w-full object-cover"
        />
        <div className="grid grid-cols-3 gap-2 px-5 pb-5 pt-4">
          {highlights.map((h) => (
            <div key={h.label} className="rounded-2xl bg-background/10 p-2.5 text-center backdrop-blur">
              <p className="text-[11px] font-semibold text-background">{h.label}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-background/60">{h.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-background/10 px-5 py-4">
          <div>
            <p className="text-[11px] text-background/60">From</p>
            <p className="text-base font-bold text-reward-gold">{formatPoints(4699)}</p>
          </div>
          <Link
            to="/apple-store/iphone-17-pro"
            className="flex items-center gap-1 rounded-full bg-background px-4 py-2 text-xs font-semibold text-foreground transition-transform hover:scale-105"
          >
            Buy with Points <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppleFeature;