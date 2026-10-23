import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, Check, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUser } from "@/contexts/UserContext";
import BottomNav from "@/components/BottomNav";

const POINTS_STEP = 500;

const PayWithRewards = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [full, setFull] = useState(false);
  const [amount, setAmount] = useState(0);
  const [done, setDone] = useState(false);

  const availablePoints = user.availablePoints;
  const maxPoints = Math.floor(availablePoints / POINTS_STEP) * POINTS_STEP;
  const value = full ? maxPoints : amount;
  const pointsUsed = value;

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-28">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Instant Purchase</h1>
      </div>

      <div className="mx-4 mb-5 rounded-2xl safqah-banner p-5">
        <div className="mb-1 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary-foreground/80" />
          <p className="text-xs text-primary-foreground/80">Available Rewards</p>
        </div>
        <p className="text-2xl font-bold text-primary-foreground">{availablePoints.toLocaleString()} Points</p>
        <p className="mt-3 text-[11px] leading-snug text-primary-foreground/70">
          Use your points on your next purchase. Redeemed points are applied automatically at checkout.
        </p>
      </div>

      <div className="mx-4 mb-4 rounded-2xl border border-border bg-card p-4">
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox checked={full} onCheckedChange={(v) => setFull(Boolean(v))} />
          <span className="flex-1 text-sm font-semibold text-card-foreground">Redeem all available points</span>
          <span className="text-sm font-bold text-primary">{maxPoints.toLocaleString()} pts</span>
        </label>
      </div>

      <div className={`mx-4 mb-4 rounded-2xl border border-border bg-card p-4 transition-opacity ${full ? "pointer-events-none opacity-50" : ""}`}>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-card-foreground">Select points to redeem</p>
          <span className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground">{value.toLocaleString()} pts</span>
        </div>
        <Slider value={[amount]} onValueChange={(v) => setAmount(v[0])} min={0} max={maxPoints} step={POINTS_STEP} />
        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
          <span>0 pts</span>
          <span>{maxPoints.toLocaleString()} pts</span>
        </div>
      </div>

      <div className="mx-4 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Points utilised</span>
          <span className="font-bold text-reward-gold">{pointsUsed.toLocaleString()} Points</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="text-muted-foreground">Remaining balance</span>
          <span className="font-semibold text-foreground">{(availablePoints - pointsUsed).toLocaleString()} Points</span>
        </div>
      </div>

      <div className="fixed bottom-[56px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-background px-5 pb-4 pt-3">
        <button
          onClick={() => setDone(true)}
          disabled={value <= 0}
          className="w-full items-center justify-center gap-2 flex items-center justify-center gap-2 h-[52px] rounded-xl bg-primary px-5 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
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
              onClick={() => { setDone(false); navigate("/loyalty"); }}
              className="mt-4 w-full flex items-center justify-center gap-2 h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
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
