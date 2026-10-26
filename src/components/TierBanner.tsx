import { Crown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const tiers = [
  { name: "Silver", min: 0 },
  { name: "Classic", min: 15000 },
  { name: "Platinum", min: 35000 },
  { name: "Diamond", min: 60000 },
];

const TierBanner = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const totalEarned = user.totalPoints;

  const currentIndex = Math.max(
    0,
    tiers.findIndex((t) => t.name === user.tier),
  );
  const currentTier = tiers[currentIndex];
  const nextTier = currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;

  const progressInTier = nextTier
    ? Math.max(
        0,
        Math.min(
          100,
          ((totalEarned - currentTier.min) / (nextTier.min - currentTier.min)) * 100,
        ),
      )
    : 100;

  const pointsToNext = nextTier ? Math.max(0, nextTier.min - totalEarned) : 0;

  return (
    <div className="mx-5 mb-8 relative">
      {/* Gilt top hairline */}
      <div className="tier-gilt-edge absolute left-6 right-6 -top-px h-px rounded-full" />
      <button
        onClick={() => navigate("/rewards")}
        className="tier-premium tier-platinum group w-full rounded-2xl border border-[#C9CED3] p-6 text-left overflow-hidden shadow-[0_10px_30px_-12px_rgba(48,47,45,0.3)] dark:bg-[#1F242D] dark:border-[#02AD4C]/30 dark:shadow-[0_8px_32px_rgba(2, 173, 76,0.12)] dark:ring-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3.5">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "linear-gradient(145deg, #FFFFFF 0%, #DDE1E5 100%)",
                boxShadow: "0 0 0 1.5px #02AD4C, 0 6px 14px -6px rgba(2, 173, 76, 0.55)",
              }}
            >
              <Crown className="h-6 w-6" style={{ color: "#277D57" }} strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-[10px] tracking-[0.28em] uppercase" style={{ color: "#277D57", fontWeight: 600 }}>
                Current tier
              </p>
              <p className="tier-platinum-text mt-1.5 text-[26px] leading-none" style={{ fontWeight: 600, letterSpacing: "0.04em" }}>
                {currentTier.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] tracking-[0.14em] text-foreground/60 transition-all duration-500 group-hover:text-[#02AD4C] group-hover:gap-2">
            <span>Details</span>
            <ChevronRight className="h-3 w-3" strokeWidth={1.25} />
          </div>
        </div>

        {/* Progress bar */}
        <p className="mb-2.5 text-[13px] text-[#302F2D]">
          Points earned: <span className="ml-1 tabular-nums font-semibold">{totalEarned.toLocaleString()}</span>
        </p>
        <div className="relative h-2.5 overflow-hidden rounded-full bg-white/70 ring-1 ring-[#C9CED3]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#277D57] to-[#02AD4C]" style={{ width: `${Math.max(progressInTier, 4)}%` }} />
        </div>
        <div className="relative mb-2 mt-1 flex justify-between text-[11px] text-foreground/50 tabular-nums">
          {[0, 25, 50, 75, 100].map((pct) => (
            <span key={pct} className="flex flex-col items-center first:items-start last:items-end">
              <span className="h-2 w-px bg-foreground/25" />
              {nextTier ? Math.round((currentTier.min + ((nextTier.min - currentTier.min) * pct) / 100) / 1000) + "K" : ""}
            </span>
          ))}
        </div>
        <div className="mb-6 text-center">
          {nextTier ? (
            <span>
              <span className="tabular-nums text-[18px] font-bold" style={{ color: "#277D57" }}>{pointsToNext.toLocaleString()}</span> <span className="text-[14px] font-semibold text-foreground/80">pts to {nextTier.name}</span>
            </span>
          ) : (
            <span>Top tier reached</span>
          )}
        </div>

        {/* Tier ladder — text only */}
        <div className="flex items-center justify-between border-t border-[#C9CED3] pt-4 tier-ladder">
          {tiers.map((tier, i) => {
            const current = i === currentIndex;
            return (
              <div key={tier.name} className="flex flex-col items-center gap-2">
                <span
                  className={`h-1 w-1 rounded-full ${current ? "tier-dot-on" : "tier-dot-off"}`}
                />
                <span
                  className={`text-[10px] tracking-[0.14em] uppercase ${current ? "tier-label-on" : "tier-label-off"}`}
                  style={{ fontWeight: current ? 500 : 300 }}
                >
                  {tier.name}
                </span>
              </div>
            );
          })}
        </div>
      </button>
    </div>
  );
};

export default TierBanner;
