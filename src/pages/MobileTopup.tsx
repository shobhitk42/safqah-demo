import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Smartphone, ChevronRight, CheckCircle2 } from "lucide-react";
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
  const [submitted, setSubmitted] = useState(false);

  const selectedDenomObj = denominations.find((d) => d.value === selectedDenom);
  const canProceed = phoneNumber.length >= 9 && selectedOperator && selectedDenom && (selectedDenomObj?.points ?? 0) <= user.availablePoints;

  const handleSubmit = () => {
    if (!canProceed) return;
    setSubmitted(true);
    toast.success("Mobile top-up successful!");
  };

  if (submitted) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={() => navigate("/loyalty")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Mobile Top-up</h1>
        </div>
        <div className="flex flex-col items-center justify-center px-6 pt-16 pb-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">Top-up Successful!</h2>
          <p className="text-sm text-muted-foreground mb-1">
            <span className="font-semibold text-foreground">{selectedDenomObj?.points.toLocaleString()} pts</span> recharged to <span className="font-semibold text-foreground">+966 {phoneNumber}</span>
          </p>
          <p className="text-xs text-muted-foreground mb-1">
            Points redeemed from your balance.
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            Operator: {operators.find((o) => o.id === selectedOperator)?.name}
          </p>
          <Button onClick={() => { setSubmitted(false); setPhoneNumber(""); setSelectedOperator(null); setSelectedDenom(null); }} variant="outline" size="sm">
            Recharge Another Number
          </Button>
        </div>
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
                const affordable = d.points <= user.availablePoints;
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
                    <p className="text-sm font-bold text-card-foreground">{d.points.toLocaleString()} pts</p>
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
              <span className="text-muted-foreground">Remaining points</span>
              <span className="font-medium text-foreground">{(user.availablePoints - selectedDenomObj.points).toLocaleString()}</span>
            </div>
            <div className="border-t border-border my-1" />
            <Button onClick={handleSubmit} disabled={!canProceed} className="w-full gap-1.5" size="lg">
              Proceed to Recharge
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileTopup;
