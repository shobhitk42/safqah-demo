import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus } from "lucide-react";

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

const summaryBoxes = [
  { label: "Earned on Spend", value: "17,268", color: "border-primary" },
  { label: "Bonus Points", value: "28,000,000", color: "border-primary" },
  { label: "Redeemed Points", value: "27,955,853", color: "border-destructive" },
  { label: "Expired Points", value: "0", color: "border-destructive" },
  { label: "Available Balance", value: "61,415", color: "border-primary" },
];

const operators = ["+", "+", "−", "−", "="];

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

const RewardsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("transactions");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const tabs: { key: Tab; label: string }[] = [
    { key: "transactions", label: "Spend" },
    { key: "bonus", label: "Bonus" },
    { key: "redemption", label: "Redeemed" },
    { key: "expiry", label: "Expiring" },
  ];

  const currentItems = tabData[activeTab];

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Points Statement</h1>
          <p className="text-[10px] text-muted-foreground">Track every point you earn, redeem and lose to expiry.</p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="mx-4 mb-4 rounded-2xl bg-card border border-border p-4 shadow-sm">
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="text-center">
            <p className="text-[9px] text-muted-foreground mb-1">Earned on spend</p>
            <p className="text-sm font-bold text-card-foreground">17,268</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] text-muted-foreground mb-1">Bonus points</p>
            <p className="text-sm font-bold text-card-foreground">28,000,000</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] text-muted-foreground mb-1">Redeemed</p>
            <p className="text-sm font-bold text-destructive">27,955,853</p>
          </div>
        </div>
        <div className="border-t border-border pt-3 grid grid-cols-2 gap-3">
          <div className="text-center">
            <p className="text-[9px] text-muted-foreground mb-1">Expired</p>
            <p className="text-sm font-bold text-card-foreground">0</p>
          </div>
          <div className="text-center rounded-lg bg-primary/10 py-1.5">
            <p className="text-[9px] text-primary/70 mb-1">Available balance</p>
            <p className="text-base font-bold text-primary">61,415</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-1 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setExpandedIndex(null); }}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="px-4 flex flex-col gap-2.5">
        {currentItems.length === 0 && (
          <p className="py-10 text-center text-xs text-muted-foreground">No activity to show yet.</p>
        )}
        {currentItems.map((item, i) => (
          <div key={i} className="rounded-xl bg-card border border-border overflow-hidden">
            <button
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border shrink-0">
                {expandedIndex === i ? (
                  <Minus className="h-3 w-3 text-muted-foreground" />
                ) : (
                  <Plus className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-card-foreground">{item.narration}</p>
                {item.merchant !== "--" && (
                  <p className="text-[10px] text-muted-foreground">{activeTab === "redemption" ? "Category" : "Merchant"}: {item.merchant}</p>
                )}
                {item.amount !== "--" && (
                  <p className="text-[10px] text-muted-foreground">
                    {activeTab === "redemption" ? "Points redeemed" : activeTab === "expiry" ? "Points expiring" : "Points spent"}: {item.amount}
                  </p>
                )}
                <p className="text-[10px] text-muted-foreground">{activeTab === "expiry" ? "Expires on" : "Date"}: {item.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-xs font-semibold ${item.type === "credit" ? "text-green-600" : "text-destructive"}`}>
                  {item.earned} pts
                </p>
                <p className="text-[10px] text-muted-foreground">{item.type === "credit" ? "Credited" : activeTab === "expiry" ? "Expiry date" : "Deducted"} {item.earnedDate}</p>
              </div>
            </button>
            {expandedIndex === i && (
              <div className="border-t border-border px-4 py-3 bg-muted/30">
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <p className="text-muted-foreground">Description</p>
                    <p className="font-medium text-card-foreground">{item.narration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Merchant</p>
                    <p className="font-medium text-card-foreground">{item.merchant}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Points spent</p>
                    <p className="font-medium text-card-foreground">{item.amount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Points</p>
                    <p className={`font-medium ${item.type === "credit" ? "text-green-600" : "text-destructive"}`}>{item.earned}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;
