import { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const STEPS = ["Syncing your points…", "Unlocking your Platinum benefits…", "Preparing your rewards…"];
const DURATION = 2400;

/** Full-screen transition shown while the Deals screen hands over to the rewards app. */
/** `settled` shows the finished state straight away (used to hand over to the next screen). */
const RewardsLoader = ({ leaving = false, settled = false }: { leaving?: boolean; settled?: boolean }) => {
  const { user } = useUser();
  const [count, setCount] = useState(settled ? user.availablePoints : 0);
  const [step, setStep] = useState(settled ? STEPS.length - 1 : 0);

  useEffect(() => {
    if (settled) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (DURATION - 400));
      setCount(Math.round(user.availablePoints * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const timer = setInterval(() => setStep((s) => Math.min(STEPS.length - 1, s + 1)), DURATION / STEPS.length);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, [user.availablePoints, settled]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`z-[100] flex flex-col items-center justify-center overflow-hidden ${settled ? "pointer-events-none" : "animate-in fade-in zoom-in-95 duration-500"}`}
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginInline: "auto",
        width: "100%",
        maxWidth: "28rem",
        opacity: leaving ? 0 : 1,
        transition: "opacity 400ms ease",
        background:
          "radial-gradient(70% 90% at 0% 0%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 60%), radial-gradient(75% 105% at 100% 100%, rgba(8,40,24,0.80) 0%, rgba(8,40,24,0.35) 40%, rgba(8,40,24,0) 75%), #0E9A48",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1.4px)",
          backgroundSize: "16px 16px",
          WebkitMaskImage: "radial-gradient(ellipse 75% 100% at 100% 0%, #000 0%, transparent 70%)",
          maskImage: "radial-gradient(ellipse 75% 100% at 100% 0%, #000 0%, transparent 70%)",
        }}
      />
      <div className="relative flex h-44 w-44 items-center justify-center">
        <span className="rewards-ripple absolute inset-0 rounded-full border border-white/50" />
        <span className="rewards-ripple absolute inset-0 rounded-full border border-white/50 [animation-delay:600ms]" />
        <span className="rewards-ripple absolute inset-0 rounded-full border border-white/50 [animation-delay:1200ms]" />
        <span className="rewards-orbit absolute inset-3 rounded-full border-2 border-dashed border-white/60" />
        <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)]">
          <Coins className="rewards-coin h-11 w-11 text-[#02AD4C]" strokeWidth={1.5} />
        </span>
      </div>

      <p className="mt-10 text-[44px] font-bold leading-none tabular-nums text-white">{count.toLocaleString()}</p>
      <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.28em] text-white/80">Points available</p>

      <p key={step} className="mt-8 h-5 text-[15px] font-medium text-white animate-in fade-in slide-in-from-bottom-1 duration-300">
        {STEPS[step]}
      </p>

      <div className="mt-6 h-1 w-44 overflow-hidden rounded-full bg-white/25">
        <div className="rewards-progress h-full rounded-full bg-white" style={settled ? { width: "100%", animation: "none" } : { animationDuration: `${DURATION}ms` }} />
      </div>
    </div>
  );
};

export default RewardsLoader;
