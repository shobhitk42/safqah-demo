import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CircleDollarSign, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

const POINTS_TO_MUR_RATE = 0.30; // 1 point = AED 0.30
const MIN_POINTS = 1000;

const Cashback = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const available = user.availablePoints;

  const [selectedPoints, setSelectedPoints] = useState(Math.min(available, MIN_POINTS));
  const [submitted, setSubmitted] = useState(false);

  const cashValue = (selectedPoints * POINTS_TO_MUR_RATE).toFixed(2);

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success("Cashback request submitted!");
  };

  if (submitted) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Cashback</h1>
        </div>

        <div className="flex flex-col items-center justify-center px-6 pt-16 pb-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">Request Submitted!</h2>
          <p className="text-sm text-muted-foreground mb-1">
            <span className="font-semibold text-foreground">{selectedPoints.toLocaleString()}</span> points → <span className="font-semibold text-foreground">{cashValue} AED</span>
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            The cashback will be credited to your linked bank account within 3-5 business days.
          </p>
          <Button onClick={() => { setSubmitted(false); setSelectedPoints(Math.min(available, MIN_POINTS)); }} variant="outline" size="sm">
            Make Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Cashback</h1>
      </div>

      {/* Banner */}
      <div className="relative mx-4 mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6">
        <div className="flex items-center gap-2 mb-1">
          <CircleDollarSign className="h-5 w-5 text-primary-foreground" />
          <h2 className="text-lg font-bold text-primary-foreground">Convert Points to Cash</h2>
        </div>
        <p className="text-xs text-primary-foreground/80">Redeem your points directly as cashback to your bank account</p>
      </div>

      <div className="px-4 pb-8 space-y-5">
        {/* Available Balance */}
        <div className="rounded-xl bg-card border border-border p-4">
          <p className="text-xs text-muted-foreground mb-0.5">Available Points</p>
          <p className="text-2xl font-bold text-foreground">{available.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">≈ {(available * POINTS_TO_MUR_RATE).toFixed(2)} AED</p>
        </div>

        {/* Points selector */}
        <div className="rounded-xl bg-card border border-border p-4 space-y-4">
          <div>
            <p className="text-sm font-semibold text-card-foreground mb-1">Select Points to Redeem</p>
            <p className="text-xs text-muted-foreground">Min {MIN_POINTS.toLocaleString()} points</p>
          </div>

          {/* Amount display */}
          <div className="text-center py-3 rounded-lg bg-muted/50">
            <p className="text-3xl font-bold text-foreground">{selectedPoints.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">points</p>
            <p className="text-lg font-bold text-primary mt-1">{cashValue} AED</p>
          </div>

          {/* Slider */}
          <Slider
            value={[selectedPoints]}
            onValueChange={(v) => setSelectedPoints(v[0])}
            min={MIN_POINTS}
            max={available}
            step={100}
            className="py-2"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>{MIN_POINTS.toLocaleString()}</span>
            <span>{available.toLocaleString()}</span>
          </div>

        </div>

        {/* Rate info */}
        <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
          <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">1,000 points = {(1000 * POINTS_TO_MUR_RATE).toFixed(2)} AED</span>
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Cashback is credited to your linked bank account within 3-5 business days.
            </p>
          </div>
        </div>

        {/* Summary & Submit */}
        <div className="rounded-xl bg-card border border-border p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Points to redeem</span>
            <span className="font-semibold text-foreground">{selectedPoints.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cash value</span>
            <span className="font-semibold text-primary">{cashValue} AED</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Remaining points</span>
            <span className="font-medium text-foreground">{(available - selectedPoints).toLocaleString()}</span>
          </div>
          <div className="border-t border-border my-1" />
          <Button onClick={handleSubmit} className="w-full" size="lg">
            Request Cashback — {cashValue} AED
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cashback;
