import { useState, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, ChevronUp, ChevronDown, Volume2, VolumeX, Gift, RotateCcw } from "lucide-react";

type Segment = {
  label: string;
  short: string;
  color: string;
  type: "reward" | "retry" | "over";
  emoji: string;
};

const SEGMENTS: Segment[] = [
  { label: "Amazon Voucher", short: "5,000 pts voucher", color: "#7C6BE8", type: "reward", emoji: "📦" },
  { label: "Amazon Voucher", short: "7,500 pts voucher", color: "#F2586F", type: "reward", emoji: "📦" },
  { label: "Amazon Voucher", short: "10,000 pts voucher", color: "#F58A5B", type: "reward", emoji: "📦" },
  { label: "Amazon Voucher", short: "15,000 pts voucher", color: "#27A567", type: "reward", emoji: "📦" },
  { label: "Amazon Voucher", short: "20,000 pts voucher", color: "#5B9BF5", type: "reward", emoji: "📦" },
  { label: "Amazon Voucher", short: "25,000 pts voucher", color: "#F5B95B", type: "reward", emoji: "📦" },
];

const SEG = 360 / SEGMENTS.length;
const SPIN_COST = 100;

/* ---------- sound ---------- */
const useSound = (enabled: boolean) => {
  const ctxRef = useRef<AudioContext | null>(null);
  const get = () => {
    if (!enabled) return null;
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  };
  const tone = useCallback(
    (freq: number, dur = 0.08, type: OscillatorType = "square", gain = 0.05, at = 0) => {
      const ctx = get();
      if (!ctx) return;
      const t = ctx.currentTime + at;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    },
    [enabled]
  );
  const tick = useCallback(() => tone(880, 0.03, "square", 0.03), [tone]);
  const win = useCallback(() => {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.28, "triangle", 0.07, i * 0.1));
  }, [tone]);
  const lose = useCallback(() => {
    [330, 262, 196].forEach((f, i) => tone(f, 0.3, "sawtooth", 0.05, i * 0.13));
  }, [tone]);
  const retry = useCallback(() => {
    [660, 880].forEach((f, i) => tone(f, 0.18, "triangle", 0.06, i * 0.12));
  }, [tone]);
  return { tick, win, lose, retry };
};

/* ---------- wheel svg ---------- */
const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

const Wheel = ({ rotation, spinning }: { rotation: number; spinning: boolean }) => {
  const size = 440;
  const c = size / 2;
  const r = c - 18;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-full w-full"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: spinning ? "transform 5s cubic-bezier(0.12, 0.62, 0.06, 1)" : "none",
        filter: "drop-shadow(0 12px 24px hsl(var(--primary) / 0.25))",
      }}
    >
      <defs>
        <filter id="segText" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* outer rim */}
      <circle cx={c} cy={c} r={c - 2} fill="#fff" />
      <circle cx={c} cy={c} r={c - 6} fill="none" stroke="hsl(var(--primary) / 0.25)" strokeWidth={3} />

      {SEGMENTS.map((s, i) => {
        const start = i * SEG;
        const mid = start + SEG / 2;
        const p1 = polar(c, c, r, start);
        const p2 = polar(c, c, r, start + SEG);
        const flip = mid > 180;
        const words = s.label.split(" ");
        const lines: string[] = [];
        let cur = "";
        words.forEach((w) => {
          if ((cur + " " + w).trim().length > 11) {
            if (cur) lines.push(cur);
            cur = w;
          } else cur = (cur + " " + w).trim();
        });
        if (cur) lines.push(cur);

        return (
          <g key={s.label}>
            <path
              d={`M ${c} ${c} L ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y} Z`}
              fill={s.color}
              stroke="#fff"
              strokeWidth={2.5}
            />
            {/* label laid along the radius, always upright-readable */}
            <g transform={`rotate(${mid} ${c} ${c})`}>
              <g transform={`translate(${c} ${c - r * 0.62}) rotate(${flip ? 180 : 0})`}>
                <text
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="15"
                  y={-14}
                  filter="url(#segText)"
                >
                  {s.emoji}
                </text>
                {lines.map((ln, li) => (
                  <text
                    key={li}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="11"
                    fontWeight={800}
                    y={4 + li * 13}
                    filter="url(#segText)"
                    style={{ letterSpacing: "0.02em" }}
                  >
                    {ln}
                  </text>
                ))}
                <text
                  textAnchor="middle"
                  fill="#fff"
                  fillOpacity={0.95}
                  fontSize="9.5"
                  fontWeight={600}
                  y={6 + lines.length * 13}
                  filter="url(#segText)"
                >
                  {s.short}
                </text>
              </g>
            </g>
          </g>
        );
      })}

      {/* hub */}
      <circle cx={c} cy={c} r={34} fill="#fff" />
      <circle cx={c} cy={c} r={34} fill="none" stroke="hsl(var(--primary) / 0.2)" strokeWidth={2} />
      <circle cx={c} cy={c} r={9} fill="hsl(var(--primary))" />
    </svg>
  );
};

const Confetti = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: 40 }).map((_, i) => (
      <span
        key={i}
        className="absolute block h-2 w-1.5 rounded-[1px] animate-[confetti_1.6s_ease-in_forwards]"
        style={{
          left: `${Math.random() * 100}%`,
          top: "-10%",
          background: SEGMENTS[i % SEGMENTS.length].color,
          animationDelay: `${Math.random() * 0.8}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    ))}
  </div>
);

const SpinWheelGame = ({
  open,
  onOpenChange,
  inline,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  inline?: boolean;
}) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(10);
  const [points, setPoints] = useState(4027);
  const [result, setResult] = useState<Segment | null>(null);
  const [showHow, setShowHow] = useState(true);
  const [sessionOver, setSessionOver] = useState(false);
  const [muted, setMuted] = useState(false);
  const [won, setWon] = useState<Segment[]>([]);
  const sound = useSound(!muted);
  const tickTimer = useRef<number>();

  useEffect(() => () => window.clearInterval(tickTimer.current), []);

  const reset = () => {
    setRotation(0);
    setSpinning(false);
    setResult(null);
    setSessionOver(false);
    setSpinsLeft(10);
    setWon([]);
  };

  const spin = () => {
    if (spinning || sessionOver || spinsLeft <= 0) return;
    const index = Math.floor(Math.random() * SEGMENTS.length);
    const target = SEGMENTS[index];
    const turns = 6 + Math.floor(Math.random() * 3);
    // pointer at top (0deg). center of segment i is at i*SEG + SEG/2
    const finalAngle = 360 * turns - (index * SEG + SEG / 2);
    const base = rotation - (rotation % 360);
    setSpinning(true);
    setResult(null);
    setSpinsLeft((s) => s - 1);
    setPoints((p) => p - SPIN_COST);
    setRotation(base + finalAngle);

    // ticking that slows down
    let delay = 55;
    const runTick = () => {
      sound.tick();
      delay = Math.min(320, delay * 1.13);
      tickTimer.current = window.setTimeout(runTick, delay);
    };
    runTick();

    window.setTimeout(() => {
      window.clearTimeout(tickTimer.current);
      setSpinning(false);
      setResult(target);
      if (target.type === "reward") {
        sound.win();
        setWon((w) => [...w, target]);
      } else if (target.type === "retry") {
        sound.retry();
        setSpinsLeft((s) => s + 1);
        setPoints((p) => p + SPIN_COST);
      } else {
        sound.lose();
        setSessionOver(true);
      }
    }, 5100);
  };

  const gameBody = (
    <>
      <style>{`@keyframes confetti{to{transform:translateY(120vh) rotate(720deg);opacity:0}}`}</style>
      <div className="relative bg-gradient-to-b from-primary/15 via-background to-background px-4 pb-5 pt-5">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Spin &amp; Win</h2>
            <p className="text-xs text-muted-foreground">Get a chance to win rewards with every spin!</p>
          </div>
          <button
            onClick={() => setMuted((m) => !m)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="h-4 w-4 text-muted-foreground" /> : <Volume2 className="h-4 w-4 text-primary" />}
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between rounded-xl bg-card px-3 py-2 shadow-sm">
          <span className="text-[11px] font-medium text-muted-foreground">Balance</span>
          <span className="text-sm font-bold text-foreground">{points.toLocaleString()} Points</span>
        </div>

        {/* wheel */}
        <div
          className={`relative mx-auto mt-6 aspect-square w-full max-w-[400px] px-1 ${
            spinning || spinsLeft <= 0 ? "cursor-default" : "cursor-pointer"
          }`}
          onClick={() => {
            if (!spinning && spinsLeft > 0) spin();
          }}
          role="button"
          aria-label={spinning ? "Wheel spinning" : spinsLeft <= 0 ? "No spins left" : "Tap wheel to spin"}
        >
          <div className="absolute left-1/2 top-[-14px] z-10 -translate-x-1/2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-md">
              <div className="h-0 w-0 border-l-[9px] border-r-[9px] border-t-[14px] border-l-transparent border-r-transparent border-t-primary-foreground" />
            </div>
          </div>
          <Wheel rotation={rotation} spinning={spinning} />
          {result?.type === "reward" && <Confetti />}
        </div>

        {/* result */}
        <div className="mt-4 min-h-[52px] text-center">
          {spinning && <p className="text-sm font-medium text-muted-foreground">Spinning…</p>}
          {!spinning && result && (
            <div className="rounded-xl border border-border bg-card p-3">
              <p className="text-sm font-bold text-foreground">
                {result.type === "reward" ? `🎉 You won ${result.label} — ${result.short}!` : result.type === "retry" ? "🔁 Free spin!" : "😔 Better luck next time"}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {result.type === "reward"
                  ? `${result.short} credited to your account`
                  : result.type === "retry"
                  ? "Your spin has been refunded"
                  : "Your session has ended"}
              </p>
            </div>
          )}
        </div>

        {/* actions */}
        {sessionOver ? (
          <Button onClick={reset} className="mt-3 w-full rounded-xl" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" /> Start new session
          </Button>
        ) : (
          <Button onClick={spin} disabled={spinning || spinsLeft <= 0} className="mt-3 w-full rounded-xl" size="lg">
            {spinning ? "Spinning…" : spinsLeft <= 0 ? "No spins left" : `Start Spinning · ${SPIN_COST} Points`}
          </Button>
        )}
        <p className="mt-1.5 text-center text-[11px] text-muted-foreground">{spinsLeft} spins remaining</p>

        {won.length > 0 && (
          <div className="mt-4 rounded-xl border border-border bg-card p-3">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Gift className="h-3.5 w-3.5 text-primary" /> Your rewards
            </p>
            <div className="flex flex-col gap-1.5">
              {won.map((w, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="text-foreground">{w.emoji} {w.label}</span>
                  <span className="font-semibold text-primary">{w.short}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* how to play */}
        <div className="mt-4 rounded-xl border border-border bg-card">
          <button
            onClick={() => setShowHow((s) => !s)}
            className="flex w-full items-center justify-between px-3 py-2.5"
          >
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Lightbulb className="h-3.5 w-3.5 text-primary" /> How to Play
            </span>
            {showHow ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {showHow && (
            <ol className="list-decimal space-y-1 px-7 pb-3 text-[11px] text-muted-foreground">
              <li>Tap ‘Start Spinning’ to spin the wheel.</li>
              <li>The wheel lands on a random segment.</li>
              <li>Each spin costs {SPIN_COST} Points.</li>
              <li>Land on a reward and it is instantly credited.</li>
              <li>Land on a free spin and your Points are refunded.</li>
              <li>Land on Better Luck Next Time and the session ends.</li>
            </ol>
          )}
        </div>
      </div>
    </>
  );

  if (inline) {
    return <div className="w-full overflow-hidden rounded-2xl border border-border bg-background shadow-sm">{gameBody}</div>;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-[26rem] gap-0 overflow-y-auto overflow-x-hidden rounded-2xl border-0 p-0 max-h-[88svh]">
        <DialogTitle className="sr-only">Spin &amp; Win</DialogTitle>
        {gameBody}
      </DialogContent>
    </Dialog>
  );
};

export default SpinWheelGame;
