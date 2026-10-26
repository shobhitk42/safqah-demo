import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/contexts/UserContext";
import BottomAction from "./BottomAction";

interface PointsPaymentStepProps {
  rows: { label: string; value: string }[];
  totalPoints: number;
  onConfirm: () => void;
  ctaLabel?: string;
}

/** Points-only payment: order summary, balance check, terms and a confirm CTA. */
const PointsPaymentStep = ({ rows, totalPoints, onConfirm, ctaLabel = "Confirm & pay with points" }: PointsPaymentStepProps) => {
  const { user } = useUser();
  const [agreed, setAgreed] = useState(false);
  const balance = user.availablePoints;
  const enough = balance >= totalPoints;

  return (
    <>
      <div className="space-y-6 px-5 pb-48 pt-5">
        <section>
          <h2 className="text-[15px] font-bold text-foreground">Booking summary</h2>
          <div className="mt-3 divide-y divide-border border-y border-border">
            {rows.map((r) => (
              <div key={r.label} className="flex items-start justify-between gap-4 py-3 text-[14px]">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="text-right font-medium text-foreground">{r.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-[#ECE8E3] p-4">
          <div className="flex items-center justify-between text-[14px]">
            <span className="text-muted-foreground">Total</span>
            <span className="text-[20px] font-bold tabular-nums text-primary">{totalPoints.toLocaleString()} pts</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[13px]">
            <span className="text-muted-foreground">Your balance</span>
            <span className="tabular-nums text-foreground">{balance.toLocaleString()} pts</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[13px]">
            <span className="text-muted-foreground">Balance after booking</span>
            <span className={`tabular-nums ${enough ? "text-foreground" : "text-destructive"}`}>
              {enough ? (balance - totalPoints).toLocaleString() : `Short by ${(totalPoints - balance).toLocaleString()}`} pts
            </span>
          </div>
        </section>

        <label className="flex cursor-pointer items-start gap-3 text-[13px] text-foreground/70">
          <Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(Boolean(v))} className="mt-0.5" />
          <span>I have reviewed the booking details and agree to the cancellation policy and terms of use.</span>
        </label>
        {!enough && <p className="text-[12px] text-destructive">You don't have enough points for this booking.</p>}
      </div>
      <BottomAction label={ctaLabel} onClick={onConfirm} disabled={!agreed || !enough} />
    </>
  );
};

export default PointsPaymentStep;
