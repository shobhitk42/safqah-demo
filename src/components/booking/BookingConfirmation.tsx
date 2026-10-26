import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingConfirmationProps {
  heading: string;
  reference: string;
  rows: { label: string; value: string }[];
  email: string;
  pointsUsed: number;
  balanceAfter: number;
}

const BookingConfirmation = ({ heading, reference, rows, email, pointsUsed, balanceAfter }: BookingConfirmationProps) => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto min-h-screen max-w-md bg-background px-5 pb-28 pt-12">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-10 w-10 text-primary" strokeWidth={1.5} />
        </span>
        <h1 className="mt-5 text-[22px] font-bold text-foreground">{heading}</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">A confirmation has been sent to {email}</p>
        <div className="mt-5 rounded-xl bg-[#ECE8E3] px-5 py-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Booking reference</p>
          <p className="mt-0.5 text-[18px] font-bold tracking-wider text-foreground">{reference}</p>
        </div>
      </div>

      <div className="mt-8 divide-y divide-border border-y border-border">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start justify-between gap-4 py-3 text-[14px]">
            <span className="text-muted-foreground">{r.label}</span>
            <span className="text-right font-medium text-foreground">{r.value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between py-3 text-[14px]">
          <span className="text-muted-foreground">Points redeemed</span>
          <span className="font-bold tabular-nums text-primary">{pointsUsed.toLocaleString()} pts</span>
        </div>
        <div className="flex items-center justify-between py-3 text-[14px]">
          <span className="text-muted-foreground">Remaining balance</span>
          <span className="tabular-nums text-foreground">{balanceAfter.toLocaleString()} pts</span>
        </div>
      </div>

      <div className="fixed bottom-[56px] left-1/2 z-40 flex w-full max-w-md -translate-x-1/2 gap-3 border-t border-border bg-background px-5 pb-4 pt-3">
        <Button variant="outline" className="h-[52px] flex-1 rounded-xl text-base font-bold" onClick={() => navigate("/orders")}>
          My bookings
        </Button>
        <Button className="h-[52px] flex-1 rounded-xl text-base font-bold" onClick={() => navigate("/loyalty")}>
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
