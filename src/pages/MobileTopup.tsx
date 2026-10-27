import { useState } from "react";
import { fmtCash, fmtPts, type PaymentResult } from "@/lib/pricing";
import PaymentStep from "@/components/booking/PaymentStep";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import BookingHeader from "@/components/booking/BookingHeader";
import { makeReference } from "@/components/booking/hotelData";
import { useBookings } from "@/contexts/BookingsContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Smartphone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { live } from "@/data/live";

interface Operator {
  id: string;
  name: string;
  color: string;
  initials: string;
  image?: string;
}

const mockOperators: Operator[] = [
  { id: "myt", name: "STC", color: "hsl(280, 70%, 45%)", initials: "ST" },
  { id: "emtel", name: "Mobily", color: "hsl(350, 80%, 50%)", initials: "MO" },
  { id: "chili", name: "Zain KSA", color: "hsl(24, 90%, 50%)", initials: "ZN" },
  { id: "mtml", name: "Virgin Mobile KSA", color: "hsl(140, 60%, 40%)", initials: "VM" },
];

// Real operators from the storefront when available
const liveOperators: Operator[] = live.topup.map((p) => {
  const name = p.name.replace(/\s*PIN\b/i, "").replace(/\s*Saudi Arabia$/i, "").trim();
  return { id: String(p.id), name, color: "hsl(140, 60%, 40%)", initials: name.slice(0, 2).toUpperCase(), image: p.image };
});
const operators: Operator[] = liveOperators.length ? liveOperators : mockOperators;

const denominations = [
  { value: 1, points: 334 },
  { value: 2, points: 667 },
  { value: 3, points: 1000 },
  { value: 5, points: 1667 },
  { value: 10, points: 3334 },
  { value: 20, points: 6667 },
];

const MobileTopup = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [selectedDenom, setSelectedDenom] = useState<number | null>(null);
  const { addBooking } = useBookings();
  const [paying, setPaying] = useState(false);
  const [payment, setPayment] = useState<PaymentResult | null>(null);
  const [reference, setReference] = useState("");

  const selectedDenomObj = denominations.find((d) => d.value === selectedDenom);
  const canProceed = phoneNumber.length >= 9 && selectedOperator && selectedDenom;

  const operatorName = operators.find((o) => o.id === selectedOperator)?.name ?? "";

  const handleConfirm = (result: PaymentResult) => {
    if (!selectedDenomObj) return;
    const ref = makeReference("TOP");
    addBooking({
      item: `${operatorName} top-up · SAR ${selectedDenomObj.value}`,
      category: "Mobile Top-up",
      points: result.pointsUsed,
      cashPaid: result.cashPaid,
      date: new Date().toLocaleDateString("en-GB"),
      status: "Completed",
      meta: `+966 ${phoneNumber} · ${ref}`,
    });
    setPayment(result);
    setReference(ref);
  };

  if (payment && selectedDenomObj) {
    return (
      <BookingConfirmation
        noun="Order"
        heading="Top-up successful"
        reference={reference}
        payment={payment}
        balanceAfter={user.availablePoints - payment.pointsUsed}
        rows={[
          { label: "Operator", value: operatorName },
          { label: "Number", value: `+966 ${phoneNumber}` },
          { label: "Recharge value", value: fmtCash(selectedDenomObj.value) },
        ]}
      />
    );
  }

  if (paying && selectedDenomObj) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background">
        <BookingHeader title="Payment" onBack={() => setPaying(false)} steps={["Top-up", "Payment"]} current={1} />
        <PaymentStep
          noun="order"
          totalPoints={selectedDenomObj.points}
          totalCash={selectedDenomObj.value}
          onConfirm={handleConfirm}
          rows={[
            { label: "Operator", value: operatorName },
            { label: "Number", value: `+966 ${phoneNumber}` },
          ]}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/loyalty")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Mobile Top-up</h1>
      </div>

      {/* Banner */}
      <div className="relative mx-4 mb-6 overflow-hidden rounded-2xl safqah-banner p-6">
        <div className="flex items-center gap-2 mb-1">
          <Smartphone className="h-5 w-5 text-primary-foreground" />
          <h2 className="text-lg font-bold text-primary-foreground">Prepaid Mobile Recharge</h2>
        </div>
        <p className="text-xs text-primary-foreground/80">Recharge your mobile using reward points</p>
      </div>

      <div className="px-4 pb-8 space-y-5">
        {/* Phone Number */}
        <div className="border-b py-4 space-y-3">
          <p className="text-sm font-semibold text-card-foreground">Enter Mobile Number</p>
          <div className="flex items-center gap-2">
            <div className="flex h-10 items-center justify-center rounded-lg bg-muted px-3">
              <span className="text-sm font-medium text-muted-foreground">+966</span>
            </div>
            <Input
              type="tel"
              placeholder="Enter number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 9))}
              className="flex-1"
              maxLength={9}
            />
          </div>
        </div>

        {/* Choose Operator */}
        <div className="border-b border-border py-4 space-y-3">
          <p className="text-sm font-semibold text-card-foreground">Choose Operator</p>
          <div className="grid grid-cols-2 gap-2">
            {operators.map((op) => (
              <button
                key={op.id}
                onClick={() => setSelectedOperator(op.id)}
                className={`flex items-center gap-2.5 rounded-xl p-3 border transition-colors ${
 selectedOperator === op.id
 ?"border-primary bg-primary/5"
 :"border-transparent bg-[#F1EEEA] hover:bg-[#E9E5E0]"
 }`}
              >
                {op.image ? (
                  <div className="flex h-10 w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                    <img src={op.image} alt={op.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                  </div>
                ) : (
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg shrink-0 text-[10px] font-bold text-primary-foreground"
                    style={{ backgroundColor: op.color }}
                  >
                    {op.initials.length <= 2 ? op.initials : op.initials.slice(0, 2)}
                  </div>
                )}
                <span className="text-xs font-medium text-card-foreground text-left leading-tight">{op.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Select Amount */}
        {selectedOperator && (
          <div className="border-b border-border py-4 space-y-3">
            <p className="text-sm font-semibold text-card-foreground">Select Amount</p>
            <div className="grid grid-cols-3 gap-2">
              {denominations.map((d) => {
                const affordable = true;
                return (
                  <button
                    key={d.value}
                    onClick={() => affordable && setSelectedDenom(d.value)}
                    className={`rounded-xl p-3 border text-center transition-colors ${
 selectedDenom === d.value
 ?"border-primary bg-primary/5"
 : affordable
 ?"border-transparent bg-[#F1EEEA] hover:bg-[#E9E5E0]"
 :"border-transparent opacity-40 cursor-not-allowed"
 }`}
                    disabled={!affordable}
                  >
                    <p className="text-sm font-bold text-card-foreground">{fmtPts(d.points)} · {fmtCash(d.value)}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary & Proceed */}
        {selectedDenom && selectedDenomObj && (
          <div className="rounded-xl bg-[#ECE8E3] p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Points required</span>
              <span className="font-semibold text-primary">{selectedDenomObj.points.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cash value</span>
              <span className="font-medium text-foreground">{fmtCash(selectedDenomObj.value)}</span>
            </div>
            <div className="border-t border-border my-1" />
            <Button onClick={() => setPaying(true)} disabled={!canProceed} className="w-full gap-1.5" size="lg">
              Continue to payment
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileTopup;
