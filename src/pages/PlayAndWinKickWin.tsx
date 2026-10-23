import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import FootballGame from "@/components/FootballGame";

const PlayAndWin = () => {
  const navigate = useNavigate();
  const [gameOpen, setGameOpen] = useState(false);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/loyalty")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Play & Win</h1>
      </div>

      <div className="relative mx-4 mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6">
        <div className="flex items-center gap-2 mb-1">
          <Gamepad2 className="h-5 w-5 text-primary-foreground" />
          <h2 className="text-lg font-bold text-primary-foreground">Mini Games</h2>
        </div>
        <p className="text-xs text-primary-foreground/80">Play games and win exciting prizes!</p>
      </div>

      <div className="px-4 pb-8">
        <div className="flex flex-col gap-3">
          {/* Football Game Card */}
          <div
            onClick={() => setGameOpen(true)}
            className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-sm cursor-pointer transition-transform hover:scale-[1.02] border border-border"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0 text-2xl">
              ⚽
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-card-foreground">Kick & Win</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Score a goal past the keeper and win an iPhone 17!
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block rounded-full bg-reward-gold/20 px-2.5 py-0.5 text-[10px] font-bold text-reward-gold">
                  🏆 iPhone 17
                </span>
                <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                  FREE PLAY
                </span>
              </div>
            </div>
          </div>

          {/* Coming soon cards */}
          <div className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-sm border border-border opacity-60">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted shrink-0 text-2xl">
              🎰
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-card-foreground">Spin the Wheel</p>
              <p className="text-xs text-muted-foreground mt-0.5">Spin for bonus points and prizes</p>
              <span className="inline-block mt-2 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                Coming Soon
              </span>
            </div>
          </div>

        </div>
      </div>

      <FootballGame open={gameOpen} onOpenChange={setGameOpen} />
    </div>
  );
};

export default PlayAndWin;
