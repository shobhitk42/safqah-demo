import { useNavigate } from "react-router-dom";
import AppleLogo from "@/components/AppleLogo";
import { ArrowRight } from "lucide-react";
import { samsungImages } from "@/data/samsungProducts";
import iphoneShort from "@/assets/iphone-17-pro-short.png.asset.json";

const TechRewardsBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-foreground via-primary to-accent shadow-2xl animate-slide-up">
        {/* ambient radial glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-accent/30 blur-3xl animate-card-glow" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-primary-foreground/10 blur-2xl animate-pulse" />

        {/* diagonal sheen — distinct from the carousel sweep */}
        <div className="pointer-events-none absolute inset-0 -skew-x-12 animate-shimmer bg-gradient-to-r from-transparent via-primary-foreground/15 to-transparent" />

        <div className="relative flex h-52 items-center">
          {/* copy */}
          <div className="z-10 w-1/2 space-y-2 pl-5">
            <span className="inline-flex items-center rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur">
              Tech Rewards
            </span>
            <h2 className="text-xl font-bold leading-tight text-primary-foreground">
              iPhone & Galaxy
            </h2>
            <p className="text-xs leading-snug text-primary-foreground/75">
              Redeem the latest devices with your Rewards Points.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => navigate("/apple-store")}
                className="group flex w-fit items-center gap-1 rounded-full bg-primary-foreground px-3.5 py-1.5 text-[11px] font-semibold text-foreground transition-transform hover:scale-105"
              >
                <AppleLogo className="h-3 w-3" /> Store <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => navigate("/samsung-store")}
                className="group flex w-fit items-center gap-1 rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-3.5 py-1.5 text-[11px] font-semibold text-primary-foreground backdrop-blur transition-transform hover:scale-105"
              >
                Samsung Store <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* product cutouts */}
          <div className="absolute inset-y-0 right-0 w-[55%]">
            <img
              src={samsungImages.s26Ultra}
              alt="Samsung Galaxy S26 Ultra"
              className="absolute left-[-8%] top-[68%] z-10 h-20 w-auto -translate-y-1/2 object-contain drop-shadow-[0_20px_40px_-8px_rgba(0,0,0,0.45)] animate-float -rotate-12"
              loading="lazy"
            />
            <img
              src={iphoneShort.url}
              alt="iPhone 17 Pro"
              className="absolute right-[-4%] top-1/2 z-20 h-28 w-auto -translate-y-1/2 object-contain drop-shadow-[0_20px_40px_-8px_rgba(0,0,0,0.45)] animate-float"
              style={{ animationDelay: "0.7s" }}
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechRewardsBanner;
