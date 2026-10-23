import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Dices, CircleDot, Ticket, ChevronRight, Gamepad2 } from "lucide-react";
import RollDiceGame from "@/components/RollDiceGame";
import SpinWheelGame from "@/components/SpinWheelGame";
import ScratchCardGame from "@/components/ScratchCardGame";

type GameKey = "dice" | "wheel" | "scratch";

const GAMES: {
  key: GameKey;
  title: string;
  subtitle: string;
  cost: string;
  icon: React.ReactNode;
  gradient: string;
  shadow: string;
}[] = [
  {
    key: "dice",
    title: "Roll A Dice",
    subtitle: "Roll the dice and win instant brand vouchers!",
    cost: "100 POINTS / ROLL",
    icon: <Dices className="h-6 w-6 text-white" />,
    gradient: "from-rose-400 to-orange-400",
    shadow: "shadow-rose-200",
  },
  {
    key: "wheel",
    title: "Spin the Wheel",
    subtitle: "Spin to win brand vouchers from Nike, Amazon.ae, Aldo and more!",
    cost: "100 POINTS / SPIN",
    icon: <CircleDot className="h-6 w-6 text-white" />,
    gradient: "from-violet-400 to-fuchsia-400",
    shadow: "shadow-violet-200",
  },
  {
    key: "scratch",
    title: "Scratch Card",
    subtitle: "Scratch to reveal instant vouchers, free retries and surprises!",
    cost: "100 POINTS / SCRATCH",
    icon: <Ticket className="h-6 w-6 text-white" />,
    gradient: "from-emerald-400 to-cyan-400",
    shadow: "shadow-emerald-200",
  },
];

const PlayAndWin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initial = (location.state as { game?: GameKey } | null)?.game ?? null;
  const [selected, setSelected] = useState<GameKey | null>(initial);

  if (selected) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background animate-fade-in">
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-background/95 px-4 py-3 backdrop-blur">
          <button
            onClick={() => setSelected(null)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Play & Win</h1>
        </div>
        <div className="px-4 pb-8">
          {selected === "dice" && <RollDiceGame open inline onOpenChange={() => setSelected(null)} />}
          {selected === "wheel" && <SpinWheelGame open inline onOpenChange={() => setSelected(null)} />}
          {selected === "scratch" && <ScratchCardGame open inline onOpenChange={() => setSelected(null)} />}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background">
      <div className="flex items-center gap-3 px-4 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Play & Win</h1>
      </div>

      <div className="relative mx-4 mb-6 overflow-hidden rounded-2xl safqah-banner p-6">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
              <Gamepad2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-bold text-primary-foreground">Mini Games</h2>
          </div>
          <p className="text-sm text-primary-foreground/90">Play games and win exciting prizes!</p>
        </div>
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-primary-foreground/10" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-primary-foreground/10" />
      </div>

      <div className="px-4 pb-8">
        <div className="flex flex-col gap-4">
          {GAMES.map((g) => (
            <button
              key={g.key}
              onClick={() => setSelected(g.key)}
              className="group flex items-center gap-4 rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-border transition-all hover:shadow-md hover:ring-primary/30 active:scale-[0.99]"
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${g.gradient} shadow-lg ${g.shadow}`}
              >
                {g.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-card-foreground">{g.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{g.subtitle}</p>
                <span className="mt-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                  {g.cost}
                </span>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10">
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayAndWin;
