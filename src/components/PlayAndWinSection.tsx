import { useNavigate } from "react-router-dom";
import { Dices, CircleDot, Ticket, ChevronRight, Sparkles } from "lucide-react";

const GAMES = [
  {
    key: "dice",
    title: "Roll A Dice",
    subtitle: "Roll and win instant brand vouchers",
    cost: "100 Points / roll",
    icon: Dices,
    gradient: "from-rose-400 via-orange-400 to-amber-400",
    glow: "bg-rose-400/20",
    accent: "text-rose-500",
  },
  {
    key: "wheel",
    title: "Spin the Wheel",
    subtitle: "Spin to win vouchers from top brands",
    cost: "100 Points / spin",
    icon: CircleDot,
    gradient: "from-violet-400 via-fuchsia-400 to-pink-400",
    glow: "bg-violet-400/20",
    accent: "text-violet-500",
  },
  {
    key: "scratch",
    title: "Scratch Card",
    subtitle: "Scratch to reveal instant surprises",
    cost: "100 Points / scratch",
    icon: Ticket,
    gradient: "from-emerald-400 via-teal-400 to-cyan-400",
    glow: "bg-emerald-400/20",
    accent: "text-emerald-500",
  },
];

const PlayAndWinSection = () => {
  const navigate = useNavigate();
  return (
    <section className="px-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </span>
          <h3 className="text-base font-semibold tracking-tight text-foreground">Play &amp; Win</h3>
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">3 games</span>
      </div>

      <div className="flex flex-col gap-3">
        {GAMES.map((g) => (
          <button
            key={g.key}
            onClick={() => navigate("/play-win", { state: { game: g.key } })}
            className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 hover:ring-primary/30 active:scale-[0.98]"
          >
            {/* soft gradient glow behind icon */}
            <span
              className={`absolute -left-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-opacity duration-300 opacity-40 group-hover:opacity-60 ${g.glow}`}
            />

            <span
              className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${g.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
            >
              <g.icon className="h-7 w-7 text-white" strokeWidth={1.8} />
            </span>

            <span className="relative min-w-0 flex-1">
              <span className="block text-sm font-bold text-card-foreground transition-colors group-hover:text-primary">
                {g.title}
              </span>
              <span className="block truncate text-xs text-muted-foreground mt-0.5">
                {g.subtitle}
              </span>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/8 px-2.5 py-1 text-[10px] font-bold text-primary">
                <Sparkles className="h-3 w-3" />
                {g.cost}
              </span>
            </span>

            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted transition-all duration-300 group-hover:bg-primary group-hover:translate-x-0.5">
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-white" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default PlayAndWinSection;
