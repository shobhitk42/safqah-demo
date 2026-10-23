import { useState, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, ChevronUp, ChevronDown, Volume2, VolumeX, Gift, RotateCcw } from "lucide-react";

type Face = {
  pips: number;
  label: string;
  short: string;
  type: "reward" | "retry" | "over";
  emoji: string;
};

const FACES: Face[] = [
  { pips: 1, label: "Amazon Voucher", short: "5,000 pts voucher", type: "reward", emoji: "📦" },
  { pips: 2, label: "Amazon Voucher", short: "7,500 pts voucher", type: "reward", emoji: "📦" },
  { pips: 3, label: "Amazon Voucher", short: "10,000 pts voucher", type: "reward", emoji: "📦" },
  { pips: 4, label: "Amazon Voucher", short: "15,000 pts voucher", type: "reward", emoji: "📦" },
  { pips: 5, label: "Amazon Voucher", short: "20,000 pts voucher", type: "reward", emoji: "📦" },
  { pips: 6, label: "Amazon Voucher", short: "25,000 pts voucher", type: "reward", emoji: "📦" },
];

const COST = 100;

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
  // wooden dice clatter
  const clack = useCallback(() => {
    const ctx = get();
    if (!ctx) return;
    const t = ctx.currentTime;
    const len = Math.floor(ctx.sampleRate * 0.06);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 1200 + Math.random() * 900;
    f.Q.value = 1.2;
    const g = ctx.createGain();
    g.gain.value = 0.16;
    src.connect(f).connect(g).connect(ctx.destination);
    src.start(t);
  }, [enabled]);
  const win = useCallback(() => {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.28, "triangle", 0.07, i * 0.1));
  }, [tone]);
  const lose = useCallback(() => {
    [330, 262, 196].forEach((f, i) => tone(f, 0.3, "sawtooth", 0.05, i * 0.13));
  }, [tone]);
  const retry = useCallback(() => {
    [660, 880].forEach((f, i) => tone(f, 0.18, "triangle", 0.06, i * 0.12));
  }, [tone]);
  return { clack, win, lose, retry };
};

const PIP_MAP: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[26, 26], [50, 50], [74, 74]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 24], [72, 24], [28, 50], [72, 50], [28, 76], [72, 76]],
};

const FACE_ROTATION: Record<number, string> = {
  1: "rotateX(0deg) rotateY(0deg)",
  6: "rotateX(180deg) rotateY(0deg)",
  2: "rotateY(90deg)",
  5: "rotateY(-90deg)",
  3: "rotateX(-90deg)",
  4: "rotateX(90deg)",
};

const DieFace = ({ pips }: { pips: number }) => (
  <div className="absolute inset-0 grid place-items-center rounded-2xl bg-card shadow-inner ring-1 ring-border/50 backface-hidden">
    <div className="relative h-full w-full">
      {PIP_MAP[pips].map(([x, y], i) => (
        <span
          key={i}
          className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-inner"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      ))}
    </div>
  </div>
);

const Die = ({ pips, rolling }: { pips: number; rolling: boolean }) => {
  return (
    <div className="relative h-32 w-32" style={{ perspective: "700px" }}>
      <div
        className={`relative h-full w-full transform-style-3d transition-transform duration-500 ease-out ${
          rolling ? "animate-[dice-roll_1.9s_linear_infinite]" : ""
        }`}
        style={
          rolling
            ? undefined
            : { transform: `${FACE_ROTATION[pips]} rotateZ(0deg)` }
        }
      >
        {/* front */}
        <div className="absolute h-32 w-32" style={{ transform: "translateZ(64px)" }}>
          <DieFace pips={1} />
        </div>
        {/* back */}
        <div className="absolute h-32 w-32" style={{ transform: "rotateY(180deg) translateZ(64px)" }}>
          <DieFace pips={6} />
        </div>
        {/* right */}
        <div className="absolute h-32 w-32" style={{ transform: "rotateY(90deg) translateZ(64px)" }}>
          <DieFace pips={2} />
        </div>
        {/* left */}
        <div className="absolute h-32 w-32" style={{ transform: "rotateY(-90deg) translateZ(64px)" }}>
          <DieFace pips={5} />
        </div>
        {/* top */}
        <div className="absolute h-32 w-32" style={{ transform: "rotateX(90deg) translateZ(64px)" }}>
          <DieFace pips={3} />
        </div>
        {/* bottom */}
        <div className="absolute h-32 w-32" style={{ transform: "rotateX(-90deg) translateZ(64px)" }}>
          <DieFace pips={4} />
        </div>
      </div>
    </div>
  );
};

const Confetti = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: 36 }).map((_, i) => (
      <span
        key={i}
        className="absolute block h-2 w-1.5 rounded-[1px] animate-[confetti_1.6s_ease-in_forwards]"
        style={{
          left: `${Math.random() * 100}%`,
          top: "-10%",
          background: ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--reward-gold))"][i % 3],
          animationDelay: `${Math.random() * 0.8}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    ))}
  </div>
);

const RollDiceGame = ({
  open,
  onOpenChange,
  inline,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  inline?: boolean;
}) => {
  const [pips, setPips] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<Face | null>(null);
  const [rollsLeft, setRollsLeft] = useState(10);
  const [points, setPoints] = useState(4027);
  const [showHow, setShowHow] = useState(true);
  const [sessionOver, setSessionOver] = useState(false);
  const [muted, setMuted] = useState(false);
  const [won, setWon] = useState<Face[]>([]);
  const sound = useSound(!muted);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const reset = () => {
    setPips(1);
    setRolling(false);
    setResult(null);
    setSessionOver(false);
    setRollsLeft(10);
    setWon([]);
  };

  const roll = () => {
    if (rolling || sessionOver || rollsLeft <= 0) return;
    const face = FACES[Math.floor(Math.random() * FACES.length)];
    setRolling(true);
    setResult(null);
    setRollsLeft((r) => r - 1);
    setPoints((p) => p - COST);

    let elapsed = 0;
    let delay = 80;
    const step = () => {
      setPips(1 + Math.floor(Math.random() * 6));
      sound.clack();
      elapsed += delay;
      delay = Math.min(260, delay * 1.18);
      if (elapsed < 1900) timers.current.push(window.setTimeout(step, delay));
      else {
        setPips(face.pips);
        setRolling(false);
        setResult(face);
        if (face.type === "reward") {
          sound.win();
          setWon((w) => [...w, face]);
        } else if (face.type === "retry") {
          sound.retry();
          setRollsLeft((r) => r + 1);
          setPoints((p) => p + COST);
        } else {
          sound.lose();
          setSessionOver(true);
        }
      }
    };
    step();
  };

  const gameBody = (
    <>
      <style>{`@keyframes confetti{to{transform:translateY(120vh) rotate(720deg);opacity:0}}
        @keyframes dice-roll{
          0%{transform:rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0)}
          15%{transform:rotateX(180deg) rotateY(120deg) rotateZ(90deg) translateY(-18px)}
          30%{transform:rotateX(360deg) rotateY(240deg) rotateZ(180deg) translateY(0)}
          45%{transform:rotateX(540deg) rotateY(360deg) rotateZ(270deg) translateY(-14px)}
          60%{transform:rotateX(720deg) rotateY(480deg) rotateZ(360deg) translateY(0)}
          75%{transform:rotateX(900deg) rotateY(600deg) rotateZ(450deg) translateY(-8px)}
          90%{transform:rotateX(1080deg) rotateY(720deg) rotateZ(540deg) translateY(0)}
          100%{transform:rotateX(1080deg) rotateY(720deg) rotateZ(540deg) translateY(0)}
        }
        .transform-style-3d{transform-style:preserve-3d}
        .backface-hidden{backface-visibility:hidden}`}</style>

      <div className="relative max-h-[85vh] overflow-y-auto bg-gradient-to-b from-primary/15 via-background to-background px-4 pb-5 pt-5">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Roll &amp; Win</h2>
            <p className="text-xs text-muted-foreground">Roll the dice to win exciting rewards!</p>
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

        {/* dice stage */}
        <div className="relative mx-auto mt-5 w-full max-w-[280px]">
          <button
            onClick={roll}
            disabled={rolling || sessionOver || rollsLeft <= 0}
            className="relative flex aspect-square w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-md disabled:opacity-90"
            aria-label="Roll dice"
          >
            <div className="absolute h-[70%] w-[70%] rounded-full bg-primary-foreground/10" />
            <Die pips={pips} rolling={rolling} />
            <span className="absolute bottom-4 text-xs font-medium text-primary-foreground/85">
              {rolling ? "Rolling…" : "Tap to roll"}
            </span>
          </button>
          {result?.type === "reward" && <Confetti />}
        </div>

        {/* result */}
        <div className="mt-4 min-h-[52px] text-center">
          {!rolling && result && (
            <div className="rounded-xl border border-border bg-card p-3">
              <p className="text-sm font-bold text-foreground">
                {result.type === "reward"
                  ? `🎉 You rolled ${result.pips} — ${result.label}!`
                  : result.type === "retry"
                  ? "🔁 Free roll!"
                  : "😔 Better luck next time"}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {result.type === "reward"
                  ? `${result.short} credited to your account`
                  : result.type === "retry"
                  ? "Your roll has been refunded"
                  : "Your session has ended"}
              </p>
            </div>
          )}
        </div>

        {sessionOver ? (
          <Button onClick={reset} className="mt-3 w-full rounded-xl" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" /> Start new session
          </Button>
        ) : (
          <Button onClick={roll} disabled={rolling || rollsLeft <= 0} className="mt-3 w-full rounded-xl" size="lg">
            {rolling ? "Rolling…" : rollsLeft <= 0 ? "No rolls left" : `Roll Dice · ${COST} Points`}
          </Button>
        )}
        <p className="mt-1.5 text-center text-[11px] text-muted-foreground">{rollsLeft} rolls remaining</p>

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

        <div className="mt-4 rounded-xl border border-border bg-card">
          <button onClick={() => setShowHow((s) => !s)} className="flex w-full items-center justify-between px-3 py-2.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Lightbulb className="h-3.5 w-3.5 text-primary" /> How to Play
            </span>
            {showHow ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {showHow && (
            <ol className="list-decimal space-y-1 px-7 pb-3 text-[11px] text-muted-foreground">
              <li>Tap “Roll Dice” or tap the dice to roll.</li>
              <li>The dice lands on a random face.</li>
              <li>Each roll costs {COST} Points, deducted already.</li>
              <li>Roll a reward and it is instantly redeemed and delivered by email.</li>
              <li>Roll a Retry and you get a free roll.</li>
              <li>Roll Better Luck Next Time and your session ends.</li>
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
        <DialogTitle className="sr-only">Roll &amp; Win</DialogTitle>
        {gameBody}
      </DialogContent>
    </Dialog>
  );
};

export default RollDiceGame;
