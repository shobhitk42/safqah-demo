import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, Check, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUser } from "@/contexts/UserContext";
import BottomNav from "@/components/BottomNav";

const POINTS_PER_AED = 100;

const PayWithRewards = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [full, setFull] = useState(false);
  const [amount, setAmount] = useState(0);
  const [done, setDone] = useState(false);

  const availablePoints = user.availablePoints;
  const maxAed = Math.floor(availablePoints / POINTS_PER_AED);
  const value = full ? maxAed : amount;
  const pointsUsed = value * POINTS_PER_AED;

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-28">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Instant Purchase</h1>
      </div>

      <div className="mx-4 mb-5 rounded-2xl bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] p-5">
        <div className="mb-1 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary-foreground/80" />
          <p className="text-xs text-primary-foreground/80">Available Rewards</p>
        </div>
        <p className="text-2xl font-bold text-primary-foreground">{availablePoints.toLocaleString()} Points</p>
        <p className="text-xs text-primary-foreground/80">= AED {maxAed.toLocaleString()} reward credit</p>
        <p className="mt-3 text-[11px] leading-snug text-primary-foreground/70">
          Turn your rewards into real savings. Reward credit automatically offsets your next card purchase.
        </p>
      </div>

      <div className="mx-4 mb-4 rounded-2xl border border-border bg-card p-4">
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox checked={full} onCheckedChange={(v) => setFull(Boolean(v))} />
          <span className="flex-1 text-sm font-semibold text-card-foreground">Redeem full value</span>
          <span className="text-sm font-bold text-primary">AED {maxAed.toLocaleString()}</span>
        </label>
      </div>

      <div className={`mx-4 mb-4 rounded-2xl border border-border bg-card p-4 transition-opacity ${full ? "pointer-events-none opacity-50" : ""}`}>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-card-foreground">Select specific value</p>
          <span className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground">AED {value.toLocaleString()}</span>
        </div>
        <Slider value={[amount]} onValueChange={(v) => setAmount(v[0])} min={0} max={maxAed} step={5} />
        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
          <span>AED 0</span>
          <span>AED {maxAed.toLocaleString()}</span>
        </div>
      </div>

      <div className="mx-4 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Points utilised</span>
          <span className="font-bold text-reward-gold">{pointsUsed.toLocaleString()} Points</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Reward credit</span>
          <span className="font-bold text-foreground">AED {value.toLocaleString()}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="text-muted-foreground">Remaining balance</span>
          <span className="font-semibold text-foreground">{(availablePoints - pointsUsed).toLocaleString()} Points</span>
        </div>
      </div>

      <div className="fixed bottom-[56px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-card px-4 py-4">
        <button
          onClick={() => setDone(true)}
          disabled={value <= 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          <Wallet className="h-4 w-4" /> Submit Request
        </button>
      </div>

      <Dialog open={done} onOpenChange={setDone}>
        <DialogContent className="mx-auto max-w-sm rounded-2xl">
          <DialogHeader>
            <div className="mb-3 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <Check className="h-8 w-8 text-accent" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Request Submitted</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-center">
            <button
              onClick={() => { setDone(false); navigate("/"); }}
              className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
            >
              Done
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default PayWithRewards;
