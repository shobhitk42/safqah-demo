import { useState, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, X, RotateCcw } from "lucide-react";

type GameState = "idle" | "aiming" | "kicked" | "goal" | "miss";

const GOAL_LEFT = 80;
const GOAL_RIGHT = 280;
const GOAL_TOP = 30;
const GOAL_BOTTOM = 110;

const KEEPER_WIDTH = 40;

const FootballGame = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [ballPos, setBallPos] = useState({ x: 175, y: 260 });
  const [keeperX, setKeeperX] = useState(160);
  const [aimTarget, setAimTarget] = useState<{ x: number; y: number } | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>();

  const resetGame = useCallback(() => {
    setGameState("idle");
    setBallPos({ x: 175, y: 260 });
    setKeeperX(160);
    setAimTarget(null);
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  const handleFieldClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== "idle") return;
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Only allow aiming at upper half (towards goal)
    if (y > 180) return;

    setAimTarget({ x, y });
    setGameState("kicked");

    // Keeper dives to a random side
    const keeperTarget = Math.random() > 0.5 ? GOAL_LEFT + 20 : GOAL_RIGHT - 60;
    const keeperStart = 160;

    const startTime = performance.now();
    const duration = 600;

    const animate = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = t * (2 - t); // ease-out

      const bx = 175 + (x - 175) * eased;
      const by = 260 + (y - 260) * eased;
      setBallPos({ x: bx, y: by });

      const kx = keeperStart + (keeperTarget - keeperStart) * eased;
      setKeeperX(kx);

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Check goal
        const isInGoal = x >= GOAL_LEFT && x <= GOAL_RIGHT && y >= GOAL_TOP && y <= GOAL_BOTTOM;
        const keeperSaved = Math.abs(x - (keeperTarget + KEEPER_WIDTH / 2)) < 35 && isInGoal;

        if (isInGoal && !keeperSaved) {
          setGameState("goal");
        } else {
          setGameState("miss");
        }
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) resetGame(); onOpenChange(v); }}>
      <DialogContent className="max-w-[380px] p-0 overflow-hidden rounded-2xl border-0 bg-transparent gap-0">
        <DialogTitle className="sr-only">Football Game</DialogTitle>
        <div className="bg-card rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚽</span>
              <h3 className="text-sm font-bold text-primary-foreground">Kick & Win</h3>
            </div>
            <button onClick={() => { resetGame(); onOpenChange(false); }}>
              <X className="h-4 w-4 text-primary-foreground/70" />
            </button>
          </div>

          {/* Prize */}
          <div className="bg-gradient-to-r from-reward-gold/20 to-reward-gold/5 px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">🏆 Score a goal to win!</span>
            <span className="text-xs font-bold text-reward-gold">iPhone 17</span>
          </div>

          {/* Field */}
          <div
            ref={fieldRef}
            onClick={handleFieldClick}
            className="relative mx-4 my-3 rounded-xl overflow-hidden select-none"
            style={{
              height: 300,
              background: "linear-gradient(180deg, #1a7a3a 0%, #22943f 40%, #2ba84a 100%)",
              cursor: gameState === "idle" ? "crosshair" : "default",
            }}
          >
            {/* Field lines */}
            <div className="absolute inset-x-8 top-[100px] h-px bg-white/20" />
            <div className="absolute left-1/2 -translate-x-1/2 top-[60px] w-20 h-10 rounded-b-full border border-white/20 border-t-0" />

            {/* Goal frame */}
            <svg className="absolute" style={{ left: GOAL_LEFT, top: GOAL_TOP, width: GOAL_RIGHT - GOAL_LEFT, height: GOAL_BOTTOM - GOAL_TOP }}>
              <rect x="0" y="0" width={GOAL_RIGHT - GOAL_LEFT} height={GOAL_BOTTOM - GOAL_TOP} fill="none" stroke="white" strokeWidth="3" rx="2" />
              {/* Net lines */}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`v${i}`} x1={(i + 1) * 20} y1="0" x2={(i + 1) * 20} y2={GOAL_BOTTOM - GOAL_TOP} stroke="white" strokeWidth="0.5" opacity="0.3" />
              ))}
              {Array.from({ length: 3 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={(i + 1) * 20} x2={GOAL_RIGHT - GOAL_LEFT} y2={(i + 1) * 20} stroke="white" strokeWidth="0.5" opacity="0.3" />
              ))}
            </svg>

            {/* Keeper */}
            <div
              className="absolute transition-none"
              style={{
                left: keeperX,
                top: GOAL_BOTTOM - 36,
                width: KEEPER_WIDTH,
                height: 36,
                fontSize: 28,
                textAlign: "center",
                lineHeight: "36px",
                transition: gameState === "kicked" ? "none" : undefined,
              }}
            >
              🧤
            </div>

            {/* Ball */}
            <div
              className="absolute"
              style={{
                left: ballPos.x - 14,
                top: ballPos.y - 14,
                width: 28,
                height: 28,
                fontSize: 22,
                textAlign: "center",
                lineHeight: "28px",
                transition: gameState === "idle" ? "none" : undefined,
                filter: gameState === "idle" ? "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" : undefined,
              }}
            >
              ⚽
            </div>

            {/* Aim hint */}
            {gameState === "idle" && (
              <div className="absolute inset-x-0 bottom-4 text-center">
                <p className="text-[10px] text-white/70 font-medium animate-pulse">Tap towards the goal to shoot!</p>
              </div>
            )}
          </div>

          {/* Result overlay */}
          {(gameState === "goal" || gameState === "miss") && (
            <div className="px-4 pb-4">
              <div className={`rounded-xl p-4 text-center ${gameState === "goal" ? "bg-green-500/10 border border-green-500/30" : "bg-destructive/10 border border-destructive/30"}`}>
                {gameState === "goal" ? (
                  <>
                    <div className="flex justify-center mb-2">
                      <Trophy className="h-8 w-8 text-reward-gold" />
                    </div>
                    <p className="text-sm font-bold text-foreground">GOAL! 🎉</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You've won a chance to get the <span className="font-bold text-reward-gold">iPhone 17</span>!
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      Our team will contact you within 48 hours.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-bold text-foreground">Saved! 😅</p>
                    <p className="text-xs text-muted-foreground mt-1">The keeper got it. Try again!</p>
                  </>
                )}
                <Button
                  onClick={resetGame}
                  variant="outline"
                  size="sm"
                  className="mt-3 gap-1.5"
                >
                  <RotateCcw className="h-3 w-3" />
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FootballGame;
