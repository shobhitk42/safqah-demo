import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Info, Wallet, Coins, Gift, ShoppingBag, Clock, Award } from "lucide-react";

type Tab = "transactions" | "bonus" | "redemption" | "expiry";

interface Transaction {
  narration: string;
  merchant: string;
  amount: string;
  date: string;
  earned: string;
  earnedDate: string;
  type: "credit" | "debit";
}

const transactions: Transaction[] = [
  { narration: "Purchase points", merchant: "Panda Supermarket", amount: "50,000 pts", date: "01 Mar 2026", earned: "+1,500", earnedDate: "03 Mar 2026", type: "credit" },
  { narration: "Purchase points", merchant: "Jarir Bookstore", amount: "120,000 pts", date: "01 Mar 2026", earned: "+3,600", earnedDate: "03 Mar 2026", type: "credit" },
  { narration: "Purchase points", merchant: "Othaim Markets", amount: "150,000 pts", date: "01 Mar 2026", earned: "+4,500", earnedDate: "03 Mar 2026", type: "credit" },
  { narration: "Purchase points", merchant: "Tamimi Markets Jeddah", amount: "165,612 pts", date: "01 Mar 2026", earned: "+4,968", earnedDate: "03 Mar 2026", type: "credit" },
  { narration: "Purchase points", merchant: "Aramco Station", amount: "100,000 pts", date: "01 Mar 2026", earned: "+3,000", earnedDate: "03 Mar 2026", type: "credit" },
  { narration: "Purchase points", merchant: "Petromin Station", amount: "25,000 pts", date: "28 Feb 2026", earned: "+750", earnedDate: "02 Mar 2026", type: "credit" },
  { narration: "Purchase points", merchant: "Saudia", amount: "8,000 pts", date: "25 Feb 2026", earned: "+240", earnedDate: "27 Feb 2026", type: "credit" },
];

const bonusItems: Transaction[] = [
  { narration: "Card activation bonus", merchant: "--", amount: "--", date: "15 Jan 2026", earned: "+10,000", earnedDate: "15 Jan 2026", type: "credit" },
  { narration: "First transaction bonus", merchant: "--", amount: "--", date: "16 Jan 2026", earned: "+2,000", earnedDate: "16 Jan 2026", type: "credit" },
  { narration: "Salary transfer bonus", merchant: "--", amount: "--", date: "01 Feb 2026", earned: "+5,000", earnedDate: "01 Feb 2026", type: "credit" },
  { narration: "Monthly spend goal reached", merchant: "--", amount: "--", date: "01 Mar 2026", earned: "+3,000", earnedDate: "01 Mar 2026", type: "credit" },
  { narration: "Birthday bonus", merchant: "--", amount: "--", date: "10 Feb 2026", earned: "+5,000", earnedDate: "10 Feb 2026", type: "credit" },
  { narration: "Referral bonus", merchant: "--", amount: "--", date: "20 Feb 2026", earned: "+3,000", earnedDate: "20 Feb 2026", type: "credit" },
];

const redemptionItems: Transaction[] = [
  { narration: "Aldo KSA gift card", merchant: "Gift cards", amount: "2,500 pts", date: "02 Apr 2026", earned: "−2,500", earnedDate: "02 Apr 2026", type: "debit" },
  { narration: "PlayStation Network gift card", merchant: "Gift cards", amount: "5,000 pts", date: "22 Mar 2026", earned: "−5,000", earnedDate: "22 Mar 2026", type: "debit" },
  { narration: "Hotel booking", merchant: "Travel", amount: "8,000 pts", date: "10 Mar 2026", earned: "−8,000", earnedDate: "10 Mar 2026", type: "debit" },
];

const expiryItems: Transaction[] = [
  { narration: "Points expiring", merchant: "--", amount: "3,200 pts", date: "30 Apr 2026", earned: "−3,200", earnedDate: "30 Apr 2026", type: "debit" },
];

const tabData: Record<Tab, Transaction[]> = {
  transactions,
  bonus: bonusItems,
  redemption: redemptionItems,
  expiry: expiryItems,
};

const EARNED_ON_SPEND = 17268;
const BONUS_POINTS = 28000000;
const REDEEMED = 27955853;
const EXPIRED = 0;
const AVAILABLE = EARNED_ON_SPEND + BONUS_POINTS - REDEEMED - EXPIRED;
const TOTAL_EARNED = EARNED_ON_SPEND + BONUS_POINTS;
const REDEEMED_PCT = (REDEEMED / TOTAL_EARNED) * 100;

const rowIcon: Record<Tab, typeof ShoppingBag> = { transactions: ShoppingBag, bonus: Gift, redemption: Award, expiry: Clock };

const StatTile = ({ icon: Icon, label, value, className = "" }: { icon: typeof Wallet; label: string; value: string; className?: string }) => (
  <div className={`flex flex-col justify-center rounded-2xl bg-[#ECE8E3] p-4 ${className}`}>
    <Icon className="mb-3 h-5 w-5 text-foreground/60" strokeWidth={1.5} />
    <p className="text-[13px] text-foreground/65">{label}</p>
    <p className="mt-1 text-[22px] font-bold leading-tight tabular-nums text-foreground">{value}</p>
  </div>
);

const Heading = ({ children, info }: { children: React.ReactNode; info?: boolean }) => (
  <h2 className="flex items-center gap-2 text-[17px] font-semibold text-foreground">
    {children}
    {info && <Info className="h-4 w-4 text-foreground/60" strokeWidth={1.5} />}
  </h2>
);

const RewardsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("transactions");

  const tabs: { key: Tab; label: string }[] = [
    { key: "transactions", label: "Spend" },
    { key: "bonus", label: "Bonus" },
    { key: "redemption", label: "Redeemed" },
    { key: "expiry", label: "Expiring" },
  ];

  const currentItems = tabData[activeTab];
  const RowIcon = rowIcon[activeTab];

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-40">
      {/* Header */}
      <div className="relative flex items-center justify-center px-5 py-5">
        <button onClick={() => navigate("/loyalty")} aria-label="Back" className="absolute left-4 flex h-9 w-9 items-center justify-center">
          <ChevronLeft className="h-6 w-6 text-foreground" strokeWidth={1.5} />
        </button>
        <h1 className="text-[17px] font-bold text-foreground">Points Statement</h1>
      </div>

      <div className="space-y-8 px-5">
        {/* Summary tiles */}
        <section>
          <p className="mb-4 text-[13px] text-foreground/60">Track every point you earn, redeem and lose to expiry.</p>
          <Heading info>Points summary</Heading>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <StatTile icon={Wallet} label="Available balance" value={AVAILABLE.toLocaleString()} className="row-span-2" />
            <StatTile icon={Coins} label="Earned on spend" value={EARNED_ON_SPEND.toLocaleString()} />
            <StatTile icon={Gift} label="Bonus points" value={BONUS_POINTS.toLocaleString()} />
          </div>
        </section>

        {/* Usage breakdown */}
        <section>
          <Heading>How your points were used</Heading>
          <p className="mt-4 text-[34px] font-bold leading-none text-primary">{REDEEMED_PCT.toFixed(1)}%</p>
          <p className="mt-2 text-[15px] font-semibold text-foreground">of earned points redeemed</p>
          <p className="mt-0.5 text-[13px] text-foreground/60">Compared with total points earned</p>

          <p className="mt-6 flex items-center gap-2 text-[13px] text-foreground/80">
            <span className="h-3.5 w-3.5 rounded-sm bg-[#302F2D]" />
            Total earned: <span className="font-semibold tabular-nums">{TOTAL_EARNED.toLocaleString()} pts</span>
          </p>
          <div className="mt-2 h-9 overflow-hidden rounded-md bg-[#ECE8E3]">
            <div className="flex h-full items-center whitespace-nowrap bg-primary px-3 text-[13px] text-white" style={{ width: `${REDEEMED_PCT}%` }}>
              Redeemed: <span className="ml-1 font-semibold tabular-nums">{REDEEMED.toLocaleString()} pts</span>
            </div>
          </div>
          <div className="mt-1 flex justify-between text-[11px] text-foreground/50 tabular-nums">
            {["0", "7M", "14M", "21M", "28M"].map((t, i) => (
              <span key={t} className={`flex flex-col ${i === 0 ? "items-start" : i === 4 ? "items-end" : "items-center"}`}>
                <span className="h-2 w-px bg-foreground/25" />
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Activity */}
        <section>
          <Heading>Activity details</Heading>
          <div className="mt-4 flex gap-1 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-2 text-[13px] font-medium transition-colors ${
                  activeTab === tab.key ? "border-b-2 border-primary text-primary" : "text-foreground/55"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-2">
            {currentItems.length === 0 && (
              <p className="py-10 text-center text-xs text-muted-foreground">No activity to show yet.</p>
            )}
            {currentItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-border py-4">
                <RowIcon className="mt-0.5 h-4 w-4 shrink-0 text-foreground/55" strokeWidth={1.5} />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] text-foreground">{item.narration}</p>
                  {item.merchant !== "--" && <p className="mt-0.5 text-[12px] text-foreground/55">{item.merchant}</p>}
                  <p className="text-[12px] text-foreground/55">
                    {activeTab === "expiry" ? "Expires" : "Date"}: {item.date}
                  </p>
                  {item.amount !== "--" && (
                    <p className="text-[12px] text-foreground/55">
                      {activeTab === "redemption" ? "Points redeemed" : activeTab === "expiry" ? "Points expiring" : "Points spent"}: {item.amount}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <p className={`text-[14px] font-bold tabular-nums ${item.type === "credit" ? "text-primary" : "text-destructive"}`}>
                    {item.earned} pts
                  </p>
                  <p className="text-[11px] text-foreground/50">
                    {item.type === "credit" ? "Credited" : activeTab === "expiry" ? "Expiry" : "Deducted"} {item.earnedDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-[56px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-background px-5 pb-4 pt-3">
        <button
          onClick={() => navigate("/loyalty")}
          className="h-12 w-full rounded-[10px] bg-primary px-5 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse rewards
        </button>
      </div>
    </div>
  );
};

export default RewardsPage;
