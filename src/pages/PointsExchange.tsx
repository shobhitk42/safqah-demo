import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plane, ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";

type Partner = {
  id: string;
  name: string;
  program: string;
  category: "Airline" | "Retail" | "Hotel";
  ratio: string; // "1 Reward = X Miles" description
  perReward: number; // miles received per 1 reward point
  denominations: number[]; // reward point denominations
  gradient: string;
  initials: string;
};

const partners: Partner[] = [
  { id: "citilink", name: "Saudia", program: "Alfursan", category: "Airline", ratio: "1 Reward = 0.55 Miles", perReward: 0.55, denominations: [100, 500, 1000, 2500, 5000], gradient: "from-emerald-500 to-green-600", initials: "CL" },
  { id: "qatar", name: "Qatar Airways", program: "Privilege Club", category: "Airline", ratio: "1 Reward = 1 Qmiles", perReward: 1, denominations: [500, 1000, 2500, 5000, 10000], gradient: "from-fuchsia-800 to-purple-900", initials: "QR" },
  { id: "flynas", name: "flynas", program: "nasmiles", category: "Airline", ratio: "1 Reward = 1 nasmile", perReward: 1, denominations: [500, 1000, 2500, 5000, 10000], gradient: "from-red-600 to-red-800", initials: "EK" },
  { id: "gulfair", name: "Gulf Air", program: "Falconflyer", category: "Airline", ratio: "1 Reward = 0.8 Miles", perReward: 0.8, denominations: [500, 1000, 2500, 5000], gradient: "from-amber-700 to-yellow-800", initials: "EY" },
  { id: "singapore", name: "Singapore Airlines", program: "KrisFlyer", category: "Airline", ratio: "1 Reward = 0.9 KrisFlyer Miles", perReward: 0.9, denominations: [1000, 2500, 5000, 10000], gradient: "from-blue-700 to-indigo-900", initials: "SQ" },
  { id: "shukran", name: "Shukran", program: "Landmark Group", category: "Retail", ratio: "1 Reward = 0.5 Shukran Points", perReward: 0.5, denominations: [500, 1000, 2500], gradient: "from-teal-600 to-emerald-700", initials: "SK" },
  { id: "marriott", name: "Marriott Bonvoy", program: "Hotel Points", category: "Hotel", ratio: "1 Reward = 1.2 Bonvoy Points", perReward: 1.2, denominations: [1000, 2500, 5000, 10000], gradient: "from-stone-700 to-neutral-900", initials: "MR" },
];

const PointsExchangePage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Partner | null>(null);
  const [amount, setAmount] = useState<number>(0);

  const availableRewards = 24580;

  const openPartner = (p: Partner) => {
    setSelected(p);
    setAmount(p.denominations[0]);
  };

  const milesReceived = selected ? Math.round(amount * selected.perReward * 100) / 100 : 0;

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => (selected ? setSelected(null) : navigate("/loyalty"))} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{selected ? selected.name : "Points Exchange"}</h1>
      </div>

      {!selected && (
        <>
          {/* Balance */}
          <div className="mx-4 mb-5 rounded-2xl safqah-banner p-4 shadow-lg">
            <p className="text-xs text-primary-foreground/80">Your Available Rewards</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-primary-foreground">{availableRewards.toLocaleString()}</span>
              <span className="text-sm text-primary-foreground/80">Points</span>
            </div>
            <p className="text-[11px] text-primary-foreground/70 mt-1">Transfer to airline miles or retail points instantly</p>
          </div>

          <div className="px-4 pb-8">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Transfer Partners</h3>
            <div className="flex flex-col gap-3">
              {partners.map((p) => (
                <button
                  key={p.id}
                  onClick={() => openPartner(p)}
                  className="w-full text-left flex items-center gap-3 rounded-xl bg-[#F1EEEA] p-4 border border-transparent transition-transform hover:scale-[1.01] active:scale-[0.98]"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} shrink-0 shadow-md`}>
                    <span className="text-primary-foreground font-bold text-sm">{p.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-card-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{p.program} · {p.category}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Detail view (Xoxoday-style) */}
      {selected && (
        <div className="px-4 pb-32">
          {/* Breadcrumb */}
          <p className="text-xs text-muted-foreground mb-3">Home / Airmiles / {selected.name}</p>

          {/* Brand card */}
          <div className="border-b py-4">
            <div className="flex items-start justify-between mb-4">
              <div className={`h-24 w-full rounded-xl bg-gradient-to-br ${selected.gradient} flex items-center justify-center`}>
                <span className="text-primary-foreground text-2xl font-bold tracking-wider">{selected.name}</span>
              </div>
            </div>

            <h2 className="text-lg font-bold text-card-foreground">{selected.name}</h2>
            <div className="flex gap-2 mt-2 mb-4">
              <span className="px-2 py-0.5 text-[10px] font-medium bg-secondary text-secondary-foreground rounded">Redeem online</span>
              <span className="px-2 py-0.5 text-[10px] font-medium bg-secondary text-secondary-foreground rounded">Instant</span>
            </div>

            <p className="text-xs text-muted-foreground mb-3">Choose amount & convert into miles</p>

            {/* Amount selector */}
            <label className="text-[10px] font-semibold text-muted-foreground uppercase">Select Amount (Rewards)</label>
            <div className="relative mt-1 mb-3">
              <select
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground pr-8"
              >
                {selected.denominations.map((d) => (
                  <option key={d} value={d}>{d.toLocaleString()} pts</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>

            <label className="text-[10px] font-semibold text-muted-foreground uppercase">You will receive</label>
            <div className="mt-1 mb-4 rounded-lg bg-secondary/60 px-3 py-2.5">
              <span className="text-sm font-semibold text-foreground">{milesReceived.toLocaleString()} Miles / Points</span>
            </div>

            <p className="text-[11px] text-muted-foreground mb-4">{selected.ratio}</p>

            {/* Total row */}
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-base font-bold text-foreground">{amount.toLocaleString()} Rewards</span>
            </div>
          </div>

          {/* T&C accordion */}
          <div className="mt-4 rounded-xl bg-[#ECE8E3] p-4">
            <p className="text-sm font-semibold text-primary mb-2">Terms & Conditions</p>
            <ul className="text-[11px] text-muted-foreground list-disc pl-4 space-y-1">
              <li>Miles are credited to your linked {selected.program} account within 24 hours.</li>
              <li>Conversion is instant and non-reversible.</li>
              <li>Minimum redemption: {selected.denominations[0]} reward points.</li>
            </ul>
          </div>

          {/* Fixed CTA */}
          <div className="fixed bottom-[56px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-background px-5 pb-4 pt-3">
            <button
              onClick={() => {
                toast.success(`Converted ${amount} pts to ${milesReceived} ${selected.name} Miles`, { description: "Miles will be credited within 24 hours." });
                setSelected(null);
              }}
              className="w-full items-center justify-center gap-2 flex items-center justify-center gap-2 h-[52px] rounded-xl bg-primary px-5 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <Check className="h-4 w-4" /> Convert to {selected.category === "Airline" ? "Miles" : "Points"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsExchangePage;
