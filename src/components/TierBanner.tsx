import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";
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
        className="tier-premium group w-full rounded-md border border-[#2B8CA8]/40 bg-white p-6 text-left overflow-hidden shadow-[0_10px_30px_-12px_rgba(43, 140, 168,0.35),0_2px_6px_-2px_rgba(26, 26, 46,0.06)] ring-1 ring-[#2B8CA8]/10 dark:bg-[#1F242D] dark:border-[#2B8CA8]/30 dark:shadow-[0_8px_32px_rgba(43, 140, 168,0.12)] dark:ring-0"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[10px] tracking-[0.28em] uppercase" style={{ color: "#2B8CA8" }}>
              Current tier
            </p>
            <p
              className="mt-2 text-[22px] leading-none text-foreground transition-colors duration-500 group-hover:text-[#2B8CA8]"
              style={{ fontWeight: 300, letterSpacing: "0.02em" }}
            >
              {currentTier.name}
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] tracking-[0.14em] text-foreground/50 transition-all duration-500 group-hover:text-[#2B8CA8] group-hover:gap-2">
            <span>Details</span>
            <ChevronRight className="h-3 w-3" strokeWidth={1.25} />
          </div>
        </div>

        {/* Hairline progress */}
        <div className="mb-3">
          <Progress value={progressInTier} className="h-[2px] bg-[#E6F2F6]" />
        </div>

        {/* Labels */}
        <div className="flex items-center justify-between text-[11px] mb-6">
          <span className="text-foreground/60 tabular-nums">
            {totalEarned.toLocaleString()} pts
          </span>
          {nextTier ? (
            <span className="text-foreground/60">
              <span className="tabular-nums" style={{ color: "#2B8CA8" }}>
                {pointsToNext.toLocaleString()}
              </span>{" "}
              to {nextTier.name}
            </span>
          ) : (
            <span className="text-foreground/60">Top tier reached</span>
          )}
        </div>

        {/* Tier ladder — text only */}
        <div className="flex items-center justify-between border-t border-[#E6F2F6] pt-4 tier-ladder">
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
