import { BadgeCheck, ChevronRight } from "lucide-react";
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
        className="tier-premium group w-full rounded-md border border-[#02AD4C]/40 bg-white p-6 text-left overflow-hidden shadow-[0_10px_30px_-12px_rgba(2, 173, 76,0.35),0_2px_6px_-2px_rgba(26, 26, 46,0.06)] ring-1 ring-[#02AD4C]/10 dark:bg-[#1F242D] dark:border-[#02AD4C]/30 dark:shadow-[0_8px_32px_rgba(2, 173, 76,0.12)] dark:ring-0"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[10px] tracking-[0.28em] uppercase" style={{ color: "#02AD4C" }}>
              Current tier
            </p>
            <p
              className="mt-2 text-[22px] leading-none text-foreground transition-colors duration-500 group-hover:text-[#02AD4C]"
              style={{ fontWeight: 300, letterSpacing: "0.02em" }}
            >
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-6 w-6" style={{ color: "#02AD4C" }} strokeWidth={1.75} />
                {currentTier.name}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] tracking-[0.14em] text-foreground/50 transition-all duration-500 group-hover:text-[#02AD4C] group-hover:gap-2">
            <span>Details</span>
            <ChevronRight className="h-3 w-3" strokeWidth={1.25} />
          </div>
        </div>

        {/* Progress bar */}
        {nextTier && (
          <p className="mb-2 flex items-center gap-2 text-[13px] text-foreground/80">
            <span className="h-3.5 w-3.5 rounded-sm bg-[#302F2D]" />
            Next tier, {nextTier.name}: <span className="tabular-nums font-semibold">{nextTier.min.toLocaleString()} pts</span>
          </p>
        )}
        <div className="relative h-9 overflow-hidden rounded-md bg-[#E6F6EC]">
          <div className="h-full rounded-md bg-[#02AD4C]" style={{ width: `${Math.max(progressInTier, 4)}%` }} />
          <span className="absolute inset-y-0 left-3 flex items-center whitespace-nowrap text-[13px] text-[#302F2D]">
            Points earned: <span className="ml-1 tabular-nums font-semibold">{totalEarned.toLocaleString()}</span>
          </span>
        </div>
        <div className="relative mb-2 mt-1 flex justify-between text-[11px] text-foreground/50 tabular-nums">
          {[0, 25, 50, 75, 100].map((pct) => (
            <span key={pct} className="flex flex-col items-center first:items-start last:items-end">
              <span className="h-2 w-px bg-foreground/25" />
              {nextTier ? Math.round((currentTier.min + ((nextTier.min - currentTier.min) * pct) / 100) / 1000) + "K" : ""}
            </span>
          ))}
        </div>
        <div className="mb-6 text-[11px] text-foreground/60">
          {nextTier ? (
            <span>
              <span className="tabular-nums" style={{ color: "#02AD4C" }}>{pointsToNext.toLocaleString()}</span> to {nextTier.name}
            </span>
          ) : (
            <span>Top tier reached</span>
          )}
        </div>

        {/* Tier ladder — text only */}
        <div className="flex items-center justify-between border-t border-[#E6F6EC] pt-4 tier-ladder">
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
