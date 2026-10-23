import { useState, useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import { Plane, Trophy as TrophyIcon, Gem, Star, ArrowRight, Wallet, Globe, Crown, Gift } from "lucide-react";
import FootballGame from "@/components/FootballGame";

const GamificationSection = () => {
  const { user, role } = useUser();
  const [gameOpen, setGameOpen] = useState(false);

  return (
    <div className="px-5 mb-10">
      {/* Play & Win */}
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/50 mb-3">
          A moment to play
        </p>

        <div
          onClick={() => setGameOpen(true)}
          className="relative w-full overflow-hidden rounded-[16px] bg-[#E6F2F6] p-[1px] shadow-[0_8px_30px_rgba(43, 140, 168,0.08)] cursor-pointer transition-transform active:scale-[0.99]"
        >
          <div className="relative flex items-center justify-between gap-4 rounded-[15px] bg-white p-5 overflow-hidden">
            {/* Decorative glows */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#2B8CA8]/5 blur-2xl" />
            <div className="pointer-events-none absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-[#2B8CA8]/10 blur-xl" />
            {/* Subtle football geometry */}
            <div className="pointer-events-none absolute right-[20%] -top-3 opacity-[0.05]">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="text-[#2B8CA8]">
                <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" />
                <path d="M50 2 L50 98 M2 50 L98 50" stroke="currentColor" strokeWidth="0.5" />
                <path d="M15 15 L85 85 M15 85 L85 15" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            {/* Glossy sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0" />

            <div className="relative z-10 flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#2B8CA8]">
                  Level 1
                </span>
                <div className="h-[4px] w-[24px] rounded-full bg-[#E6F2F6] overflow-hidden">
                  <div className="h-full w-1/3 bg-[#2B8CA8]" />
                </div>
              </div>
              <h3 className="text-[18px] font-bold leading-tight text-[#1A1A2E]">
                Kick & Win
              </h3>
              <p className="text-[13px] leading-snug text-[#1A1A2E]/60 max-w-[170px]">
                Score a goal, win an <span className="font-medium text-[#2B8CA8]">iPhone 17.</span>
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <span className="inline-flex h-[44px] items-center gap-2 rounded-full bg-[#2B8CA8] pl-5 pr-4 text-white shadow-[0_4px_12px_rgba(43, 140, 168,0.3)]">
                <span className="text-[14px] font-bold">Play</span>
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <FootballGame open={gameOpen} onOpenChange={setGameOpen} />

      {/* Milestones */}
      <MilestonesBlock user={user} role={role} />
    </div>
  );
};

/* ----------------------------- Milestones ----------------------------- */

const MilestonesBlock = ({ user, role }: { user: any; role: "consumer" | "merchant" }) => {
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
      <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/50">
        Next
      </p>
      <h3
        className="mt-2 mb-5 text-[22px] leading-none text-foreground"
        style={{ fontWeight: 300, letterSpacing: "0.005em" }}
      >
        Milestones
      </h3>

      <div className="space-y-4">
        {user.milestones
          .filter((ms: any) => ms.role === role)
          .map((ms: any, i: number) => {
          const pct = Math.min(100, Math.round((ms.current / ms.target) * 100));
          const MIcon = ms.id === "m1" || ms.id === "m3" ? Wallet : ms.id === "m2" ? Globe : Crown;
          const cleanReward = ms.reward.replace(/^[^\p{L}\p{N}]+/u, "").trim();
          const RIcon = ms.id === "m1" || ms.id === "m3" ? Gift : ms.id === "m2" ? Plane : Gem;
          return (
            <div
              key={ms.id}
              className="milestone-card group relative rounded-md bg-card border border-[#E8E8EE] px-5 py-5 overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:border-[#2B8CA8]/60 hover:shadow-[0_14px_36px_-18px_rgba(43,140,168,0.45)] cursor-pointer"
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
                    style={{ borderColor: "#E8E8EE", backgroundColor: "#F7F8FA" }}
                  >
                    <MIcon
                      className="h-3.5 w-3.5"
                      strokeWidth={1.25}
                      style={{ color: "#2B8CA8", fill: "#2B8CA8" }}
                    />
                  </span>
                  <p className="text-[13px] leading-snug text-foreground transition-colors duration-300 group-hover:text-[#2B8CA8]">
                    {ms.label}
                  </p>
                </div>
                <span
                  className="shrink-0 text-[11px] tabular-nums text-foreground/50 transition-colors duration-300 group-hover:text-[#2B8CA8]"
                  style={{ fontWeight: 500 }}
                >
                  {pct}%
                </span>
              </div>

              {/* Animated progress bar */}
              <div
                className="relative h-[4px] w-full rounded-full bg-[#E6F2F6] mb-4 overflow-hidden"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: visible ? `${pct}%` : "0%",
                    background:
                      "linear-gradient(90deg, #2B8CA8 0%, #4FB3CF 55%, #2B8CA8 100%)",
                    transition: `width 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 120 + 150}ms`,
                    boxShadow:
                      "0 0 0 0.5px rgba(43,140,168,0.35), 0 0 10px rgba(43,140,168,0.35)",
                  }}
                />
                {/* Shimmer sweep */}
                <div
                  aria-hidden
                  className="milestone-shimmer absolute inset-y-0 left-0"
                  style={{
                    width: visible ? `${pct}%` : "0%",
                    transition: `width 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 120 + 150}ms`,
                  }}
                >
                  <span className="milestone-shimmer__bar" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-foreground/50 tabular-nums">
                  {ms.current.toLocaleString()} / {ms.target.toLocaleString()}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  style={{ color: "#2B8CA8" }}
                >
                  <RIcon
                    className="h-3 w-3 transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.25}
                    style={{ color: "#2B8CA8", fill: "#2B8CA8" }}
                  />
                  {cleanReward}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GamificationSection;
