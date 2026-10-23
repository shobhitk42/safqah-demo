import { useState, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, ChevronUp, ChevronDown, Volume2, VolumeX, Gift, RotateCcw } from "lucide-react";

type Prize = {
  label: string;
  short: string;
  type: "reward" | "retry" | "over";
  emoji: string;
};

const PRIZES: Prize[] = [
  { label: "Amazon Voucher", short: "AED 50 voucher", type: "reward", emoji: "📦" },
  { label: "Amazon Voucher", short: "AED 75 voucher", type: "reward", emoji: "📦" },
  { label: "Amazon Voucher", short: "AED 100 voucher", type: "reward", emoji: "📦" },
  { label: "Amazon Voucher", short: "AED 150 voucher", type: "reward", emoji: "📦" },
  { label: "Amazon Voucher", short: "AED 200 voucher", type: "reward", emoji: "📦" },
  { label: "Amazon Voucher", short: "AED 250 voucher", type: "reward", emoji: "📦" },
];

const COST = 100;

/* ---------- sound ---------- */
const useSound = (enabled: boolean) => {
  const ctxRef = useRef<AudioContext | null>(null);
  const noiseRef = useRef<{ src: AudioBufferSourceNode; gain: GainNode } | null>(null);
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

  // continuous scratch noise while dragging
  const startScratch = useCallback(() => {
    const ctx = get();
    if (!ctx || noiseRef.current) return;
    const len = ctx.sampleRate * 1;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.6;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2600;
    filter.Q.value = 0.8;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.05);
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
    noiseRef.current = { src, gain };
  }, [enabled]);

  const stopScratch = useCallback(() => {
    const n = noiseRef.current;
    const ctx = ctxRef.current;
    if (!n || !ctx) return;
    noiseRef.current = null;
    try {
      n.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      n.src.stop(ctx.currentTime + 0.12);
    } catch {}
  }, []);

  const win = useCallback(() => {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.28, "triangle", 0.07, i * 0.1));
  }, [tone]);
  const lose = useCallback(() => {
    [330, 262, 196].forEach((f, i) => tone(f, 0.3, "sawtooth", 0.05, i * 0.13));
  }, [tone]);
  const retry = useCallback(() => {
    [660, 880].forEach((f, i) => tone(f, 0.18, "triangle", 0.06, i * 0.12));
  }, [tone]);

  return { startScratch, stopScratch, win, lose, retry };
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

const ScratchCardGame = ({
  open,
  onOpenChange,
  inline,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  inline?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const revealedRef = useRef(false);

  const [prize, setPrize] = useState<Prize>(() => PRIZES[Math.floor(Math.random() * PRIZES.length)]);
  const [revealed, setRevealed] = useState(false);
  const [scratchesLeft, setScratchesLeft] = useState(10);
  const [points, setPoints] = useState(4027);
  const [showHow, setShowHow] = useState(true);
  const [sessionOver, setSessionOver] = useState(false);
  const [muted, setMuted] = useState(false);
  const [won, setWon] = useState<Prize[]>([]);
  const sound = useSound(!muted);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    g.addColorStop(0, "#b9a2d6");
    g.addColorStop(0.5, "#9d84c4");
    g.addColorStop(1, "#c8b6e2");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, rect.width, rect.height);
    // sparkle texture
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * rect.width, Math.random() * rect.height, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "600 15px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch Here", rect.width / 2, rect.height / 2 + 5);
    ctx.font = "400 11px system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText("Drag your finger to reveal", rect.width / 2, rect.height / 2 + 24);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(paintCover, 60);
    return () => window.clearTimeout(t);
  }, [open, paintCover, prize]);

  const percentCleared = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;
    const { width, height } = canvas;
    const step = 8;
    const img = ctx.getImageData(0, 0, width, height).data;
    let clear = 0;
    let total = 0;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        total++;
        if (img[(y * width + x) * 4 + 3] < 40) clear++;
      }
    }
    return total ? clear / total : 0;
  };

  const finish = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
    sound.stopScratch();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (prize.type === "reward") {
      sound.win();
      setWon((w) => [...w, prize]);
    } else if (prize.type === "retry") {
      sound.retry();
      setScratchesLeft((s) => s + 1);
      setPoints((p) => p + COST);
    } else {
      sound.lose();
      setSessionOver(true);
    }
  }, [prize, sound]);

  const pos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratchTo = (p: { x: number; y: number }) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 34;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    const from = last.current ?? p;
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p.x, p.y, 17, 0, Math.PI * 2);
    ctx.fill();
    last.current = p;
  };

  const canScratch = !revealed && !sessionOver && scratchesLeft > 0;

  const onDown = (e: React.PointerEvent) => {
    if (!canScratch) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = null;
    sound.startScratch();
    scratchTo(pos(e));
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drawing.current || !canScratch) return;
    scratchTo(pos(e));
    if (percentCleared() > 0.5) finish();
  };
  const onUp = () => {
    drawing.current = false;
    last.current = null;
    sound.stopScratch();
  };

  const nextCard = () => {
    if (sessionOver || scratchesLeft <= 0) return;
    revealedRef.current = false;
    setRevealed(false);
    setScratchesLeft((s) => s - 1);
    setPoints((p) => p - COST);
    setPrize(PRIZES[Math.floor(Math.random() * PRIZES.length)]);
  };

  const reset = () => {
    revealedRef.current = false;
    setRevealed(false);
    setSessionOver(false);
    setScratchesLeft(10);
    setWon([]);
    setPrize(PRIZES[Math.floor(Math.random() * PRIZES.length)]);
  };

  useEffect(() => {
    if (open) {
      // first card is paid for on open
      revealedRef.current = false;
      setRevealed(false);
    } else {
      sound.stopScratch();
    }
  }, [open]);

  const gameBody = (
    <>
      <style>{`@keyframes confetti{to{transform:translateY(120vh) rotate(720deg);opacity:0}}`}</style>
      <div className="relative max-h-[85vh] overflow-y-auto bg-gradient-to-b from-primary/15 via-background to-background px-4 pb-5 pt-5">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Scratch &amp; Win</h2>
            <p className="text-xs text-muted-foreground">Scratch the card to reveal exciting rewards!</p>
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

        {/* card */}
        <div className="relative mx-auto mt-5 w-full max-w-[280px]">
          <div
            ref={wrapRef}
            className="relative aspect-square w-full select-none overflow-hidden rounded-2xl border border-border bg-card shadow-md"
          >
            {/* prize underneath */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary to-card px-4 text-center">
              <span className="text-5xl">{prize.emoji}</span>
              <p className="text-sm font-bold text-foreground">{prize.label}</p>
              <p className="text-xs font-medium text-primary">{prize.short}</p>
            </div>
            <canvas
              ref={canvasRef}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerLeave={onUp}
              className={`absolute inset-0 touch-none ${canScratch ? "cursor-grab" : "pointer-events-none"}`}
            />
          </div>
          {revealed && prize.type === "reward" && <Confetti />}
        </div>

        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          {revealed
            ? prize.type === "reward"
              ? `🎉 ${prize.short} credited to your account`
              : prize.type === "retry"
              ? "🔁 Free scratch — your Points were refunded"
              : "😔 Your session has ended"
            : "Scratch the surface to reveal your prize."}
        </p>

        {/* actions */}
        {sessionOver ? (
          <Button onClick={reset} className="mt-3 w-full rounded-xl" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" /> Start new session
          </Button>
        ) : (
          <Button
            onClick={nextCard}
            disabled={!revealed || scratchesLeft <= 0}
            className="mt-3 w-full rounded-xl"
            size="lg"
          >
            {scratchesLeft <= 0 ? "No scratches left" : revealed ? `New card · ${COST} Points` : "Scratch to reveal"}
          </Button>
        )}
        <p className="mt-1.5 text-center text-[11px] text-muted-foreground">{scratchesLeft} scratches remaining</p>

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
              <li>Scratch the card to reveal what is underneath.</li>
              <li>Each scratch costs {COST} Points, deducted already.</li>
              <li>Reveal a reward and it is instantly redeemed and delivered by email.</li>
              <li>Reveal a Retry and you get a free scratch.</li>
              <li>Reveal Better Luck Next Time and your session ends.</li>
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
        <DialogTitle className="sr-only">Scratch &amp; Win</DialogTitle>
        {gameBody}
      </DialogContent>
    </Dialog>
  );
};

export default ScratchCardGame;
