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
  { label: "On Spend Rewards", value: "17,268", color: "border-primary" },
  { label: "Bonus Rewards", value: "28,000,000", color: "border-primary" },
  { label: "Redeemed Rewards", value: "27,955,853", color: "border-destructive" },
  { label: "Expired Rewards", value: "0", color: "border-destructive" },
  { label: "Available Rewards", value: "61,415", color: "border-primary" },
];

const operators = ["+", "+", "−", "−", "="];

const transactions: Transaction[] = [
  { narration: "Spend Points", merchant: "Winners Supermarket", amount: "500 AED", date: "01 Mar 2026", earned: "+1,500", earnedDate: "03 Mar 2026", type: "credit" },
  { narration: "Spend Points", merchant: "Courts Mammouth", amount: "1,200 AED", date: "01 Mar 2026", earned: "+3,600", earnedDate: "03 Mar 2026", type: "credit" },
  { narration: "Spend Points", merchant: "Intermart Curepipe", amount: "1,500 AED", date: "01 Mar 2026", earned: "+4,500", earnedDate: "03 Mar 2026", type: "credit" },
  { narration: "Spend Points", merchant: "Monoprix Grand Baie", amount: "1,656.123 AED", date: "01 Mar 2026", earned: "+4,968", earnedDate: "03 Mar 2026", type: "credit" },
  { narration: "Spend Points", merchant: "Total Energies Station", amount: "1,000 AED", date: "01 Mar 2026", earned: "+3,000", earnedDate: "03 Mar 2026", type: "credit" },
  { narration: "Spend Points", merchant: "Engen Service Station", amount: "250 AED", date: "28 Feb 2026", earned: "+750", earnedDate: "02 Mar 2026", type: "credit" },
  { narration: "Spend Points", merchant: "Air Mauritius", amount: "80 AED", date: "25 Feb 2026", earned: "+240", earnedDate: "27 Feb 2026", type: "credit" },
];

const bonusItems: Transaction[] = [
  { narration: "Card Activation Bonus", merchant: "--", amount: "--", date: "15 Jan 2026", earned: "+10,000", earnedDate: "15 Jan 2026", type: "credit" },
  { narration: "First Transaction Bonus", merchant: "--", amount: "--", date: "16 Jan 2026", earned: "+2,000", earnedDate: "16 Jan 2026", type: "credit" },
  { narration: "Salary Transfer Bonus", merchant: "--", amount: "--", date: "01 Feb 2026", earned: "+5,000", earnedDate: "01 Feb 2026", type: "credit" },
  { narration: "Monthly Spend Target Achieved", merchant: "--", amount: "--", date: "01 Mar 2026", earned: "+3,000", earnedDate: "01 Mar 2026", type: "credit" },
  { narration: "Birthday Bonus", merchant: "--", amount: "--", date: "10 Feb 2026", earned: "+5,000", earnedDate: "10 Feb 2026", type: "credit" },
  { narration: "Customer Referral Bonus", merchant: "--", amount: "--", date: "20 Feb 2026", earned: "+3,000", earnedDate: "20 Feb 2026", type: "credit" },
];

const redemptionItems: Transaction[] = [
  { narration: "Aldo Mauritius Gift Card", merchant: "Gift Cards", amount: "2,500 pts", date: "02 Apr 2026", earned: "−2,500", earnedDate: "02 Apr 2026", type: "debit" },
  { narration: "PlayStation Network", merchant: "Gift Cards", amount: "5,000 pts", date: "22 Mar 2026", earned: "−5,000", earnedDate: "22 Mar 2026", type: "debit" },
  { narration: "Hotel Booking", merchant: "Travel", amount: "8,000 pts", date: "10 Mar 2026", earned: "−8,000", earnedDate: "10 Mar 2026", type: "debit" },
];

const expiryItems: Transaction[] = [
  { narration: "Points Expiring", merchant: "--", amount: "3,200 pts", date: "30 Apr 2026", earned: "−3,200", earnedDate: "30 Apr 2026", type: "debit" },
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
    { key: "transactions", label: "Transactions" },
    { key: "bonus", label: "Bonus" },
    { key: "redemption", label: "Redemption" },
    { key: "expiry", label: "Expiry" },
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
          <h1 className="text-lg font-semibold text-foreground">Rewards Statement</h1>
          <p className="text-[10px] text-muted-foreground">View all the rewards details within your account.</p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="mx-4 mb-4 rounded-2xl bg-card border border-border p-4 shadow-sm">
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="text-center">
            <p className="text-[9px] text-muted-foreground mb-1">On Spend</p>
            <p className="text-sm font-bold text-card-foreground">17,268</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] text-muted-foreground mb-1">Bonus</p>
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
            <p className="text-[9px] text-primary/70 mb-1">Available</p>
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
                <p className="text-xs font-semibold text-card-foreground">Narration: {item.narration}</p>
                {item.merchant !== "--" && (
                  <p className="text-[10px] text-muted-foreground">Merchant Name: {item.merchant}</p>
                )}
                {item.amount !== "--" && (
                  <p className="text-[10px] text-muted-foreground">
                    {activeTab === "redemption" ? "Redeemed" : "Spend Amount"}: {item.amount}
                  </p>
                )}
                <p className="text-[10px] text-muted-foreground">Date: {item.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-xs font-semibold ${item.type === "credit" ? "text-green-600" : "text-destructive"}`}>
                  Earned: {item.earned} Rewards
                </p>
                <p className="text-[10px] text-muted-foreground">Earned on: {item.earnedDate}</p>
              </div>
            </button>
            {expandedIndex === i && (
              <div className="border-t border-border px-4 py-3 bg-muted/30">
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <p className="text-muted-foreground">Narration</p>
                    <p className="font-medium text-card-foreground">{item.narration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Merchant</p>
                    <p className="font-medium text-card-foreground">{item.merchant}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium text-card-foreground">{item.amount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rewards</p>
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
