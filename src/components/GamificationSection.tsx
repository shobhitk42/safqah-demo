import SectionTitle from "@/components/SectionTitle";
import { useState, useEffect, useRef } from "react";
import { useUser, type Milestone, type UserProfile } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import MilestoneCard from "@/components/MilestoneCard";
import { Plane, Trophy as TrophyIcon, Gem, Star, ArrowRight, Wallet, Globe, Crown, Gift } from "lucide-react";
// import FootballGame from "@/components/FootballGame";

// Kick & Win is hidden for now; set to true (and restore the FootballGame import/state) to bring it back.
const SHOW_KICK_WIN = false;

const GamificationSection = () => {
  const { user, role } = useUser();
  // const [gameOpen, setGameOpen] = useState(false);

  return (
    <div className="px-5 mb-8">
      {SHOW_KICK_WIN && (
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/50 mb-3">
          A moment to play
        </p>

        <div
          onClick={() => { /* setGameOpen(true) */ }}
          className="relative w-full overflow-hidden rounded-[16px] bg-[#E6F6EC] p-[1px] shadow-[0_8px_30px_rgba(2, 173, 76,0.08)] cursor-pointer transition-transform active:scale-[0.99]"
        >
          <div className="relative flex items-center justify-between gap-4 rounded-[15px] bg-white p-5 overflow-hidden">
            {/* Decorative glows */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#02AD4C]/5 blur-2xl" />
            <div className="pointer-events-none absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-[#02AD4C]/10 blur-xl" />
            {/* Subtle football geometry */}
            <div className="pointer-events-none absolute right-[20%] -top-3 opacity-[0.05]">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="text-[#02AD4C]">
                <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" />
                <path d="M50 2 L50 98 M2 50 L98 50" stroke="currentColor" strokeWidth="0.5" />
                <path d="M15 15 L85 85 M15 85 L85 15" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            {/* Glossy sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0" />

            <div className="relative z-10 flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#02AD4C]">
                  Level 1
                </span>
                <div className="h-[4px] w-[24px] rounded-full bg-[#E6F6EC] overflow-hidden">
                  <div className="h-full w-1/3 bg-[#02AD4C]" />
                </div>
              </div>
              <h3 className="text-[18px] font-bold leading-tight text-[#302F2D]">
                Kick & Win
              </h3>
              <p className="text-[13px] leading-snug text-[#302F2D]/60 max-w-[170px]">
                Score a goal, win an <span className="font-medium text-[#02AD4C]">iPhone 17.</span>
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <span className="inline-flex h-[44px] items-center gap-2 rounded-full bg-[#02AD4C] pl-5 pr-4 text-white shadow-[0_4px_12px_rgba(2, 173, 76,0.3)]">
                <span className="text-[14px] font-bold">Play</span>
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Milestones */}
      <MilestonesBlock user={user} role={role} />
    </div>
  );
};

/* ----------------------------- Milestones ----------------------------- */

const MilestonesBlock = ({ user, role }: { user: UserProfile; role: "consumer" | "merchant" }) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      <SectionTitle
        title="Milestones"
        action={
          <button onClick={() => navigate("/milestones")} className="flex items-center gap-0.5 pt-0.5 text-[13px] font-semibold text-primary">
            View all
            <ChevronRight className="h-4 w-4" />
          </button>
        }
      />

      <div className="space-y-4">
        {user.milestones
          .filter((ms: Milestone) => ms.role === role)
          .slice(0, 3)
          .map((ms: Milestone, i: number) => (
            <MilestoneCard key={ms.id} ms={ms} visible={visible} index={i} />
          ))}
      </div>

    </div>
  );
};

export default GamificationSection;
