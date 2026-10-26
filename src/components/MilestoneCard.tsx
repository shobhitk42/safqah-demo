import { Gift, Gem, Globe, Crown, Plane, Wallet, TrendingUp, Mail } from "lucide-react";
import type { Milestone } from "@/contexts/UserContext";

const milestoneIcon: Record<string, typeof Wallet> = { m1: Wallet, m2: Globe, m3: Wallet, m5: TrendingUp, m6: Mail, m7: TrendingUp, m8: TrendingUp };

interface MilestoneCardProps {
  ms: Milestone;
  visible: boolean;
  index: number;
}

const MilestoneCard = ({ ms, visible, index: i }: MilestoneCardProps) => {
  const pct = Math.min(100, Math.round((ms.current / ms.target) * 100));
  const MIcon = milestoneIcon[ms.id] ?? Crown;
  const cleanReward = ms.reward.replace(/^[^\p{L}\p{N}]+/u, "").trim();
  const RIcon = /points/i.test(ms.reward) ? Gift : ms.reward.includes("✈") ? Plane : Gem;
  const unit = ms.unit ? ` ${ms.unit}` : "";
  return (
    <div
      className="milestone-card group relative rounded-2xl bg-[#ECE8E3] border border-transparent px-5 py-5 overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:border-[#02AD4C]/60 hover:shadow-[0_14px_36px_-18px_rgba(2,173,76,0.45)] cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 500ms ease ${i * 120}ms, transform 500ms cubic-bezier(0.23,1,0.32,1) ${i * 120}ms, border-color 300ms ease, box-shadow 400ms ease`,
      }}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[6deg]"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <MIcon className="h-3.5 w-3.5" strokeWidth={1.25} style={{ color: "#02AD4C" }} />
          </span>
          <p className="text-[13px] leading-snug text-foreground transition-colors duration-300 group-hover:text-[#02AD4C]">{ms.label}</p>
        </div>
        <span className="shrink-0 text-[11px] tabular-nums text-foreground/50 transition-colors duration-300 group-hover:text-[#02AD4C]" style={{ fontWeight: 500 }}>
          {pct}%
        </span>
      </div>

      <div className="relative h-[4px] w-full rounded-full bg-[#E6F6EC] mb-4 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: visible ? `${pct}%` : "0%",
            background: "linear-gradient(90deg, #02AD4C 0%, #4FB3CF 55%, #02AD4C 100%)",
            transition: `width 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 120 + 150}ms`,
            boxShadow: "0 0 0 0.5px rgba(2, 173, 76,0.35), 0 0 10px rgba(2, 173, 76,0.35)",
          }}
        />
        <div
          aria-hidden
          className="milestone-shimmer absolute inset-y-0 left-0"
          style={{ width: visible ? `${pct}%` : "0%", transition: `width 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 120 + 150}ms` }}
        >
          <span className="milestone-shimmer__bar" />
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px]">
        <span className="text-foreground/50 tabular-nums">
          {ms.current.toLocaleString()} / {ms.target.toLocaleString()}
          {unit}
        </span>
        <span className="inline-flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-x-0.5" style={{ color: "#02AD4C" }}>
          <RIcon className="h-3 w-3 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.25} style={{ color: "#02AD4C" }} />
          {cleanReward}
        </span>
      </div>
    </div>
  );
};

export default MilestoneCard;
