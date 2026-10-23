import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, ChevronRight, CreditCard, Crown, ShoppingBag, Sun, Moon, Wallet, Store } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeContext";

interface WalletCardProps {
  title: string;
  icon: React.ReactNode;
  redeemable: number;
  pending: number;
  pendingLabel: string;
  footnote: string;
}

const WalletCard = ({ title, icon, redeemable, pending, pendingLabel, footnote }: WalletCardProps) => {
  const total = redeemable + pending;
  const redeemablePct = total > 0 ? (redeemable / total) * 100 : 0;
  return (
    <div className="rounded-2xl bg-white border border-[#E8E8EE] shadow-[0_8px_24px_-12px_rgba(26,26,46,0.10)] overflow-hidden">
      {/* Ratio bar */}
      <div className="flex h-1.5 w-full">
        <div style={{ width: `${redeemablePct}%`, backgroundColor: "#02AD4C" }} />
        <div style={{ width: `${100 - redeemablePct}%`, backgroundColor: "#E8C77A" }} />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#02AD4C]/10 text-[#02AD4C]">
            {icon}
          </span>
          <h4 className="text-[14px] font-bold text-[#302F2D]">{title}</h4>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] text-[#6B6B7A]">Redeemable Points</span>
          <span className="tabular-nums text-[22px] font-bold" style={{ color: "#02AD4C" }}>
            {redeemable.toLocaleString()} <span className="text-[11px] font-semibold">pts</span>
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <span className="text-[11px] text-[#9CA3AF]">{pendingLabel}</span>
          <span className="tabular-nums text-[13px] font-medium" style={{ color: "#B8863F" }}>
            {pending.toLocaleString()} <span className="text-[10px]">pts</span>
          </span>
        </div>
        <p className="mt-3 text-[11px] text-[#9CA3AF]">{footnote}</p>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, role } = useUser();
  const { theme, setTheme } = useTheme();
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-20">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="mx-4 rounded-2xl bg-white border border-[#02AD4C]/40 shadow-[0_8px_28px_rgba(2, 173, 76,0.15)] dark:bg-[#1F242D] dark:border-[#02AD4C]/30 dark:shadow-[0_8px_32px_rgba(2, 173, 76,0.12)] p-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#02AD4C]/15 text-[#302F2D] dark:text-[#FFFFFF] text-xl font-bold">
            {initials}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#302F2D] dark:text-[#FFFFFF]">{user.name}</h2>
          </div>
        </div>
      </div>

      {/* My Wallets */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">My Wallet</h3>
        <div className="space-y-3">
          {role === "consumer" ? (
            <WalletCard
              title="Consumer Points"
              icon={<Wallet className="h-3.5 w-3.5" strokeWidth={1.75} />}
              redeemable={user.wallets.consumer.redeemable}
              pending={user.wallets.consumer.pending}
              pendingLabel="Pending Approval"
              footnote="Pending points are reviewed within 48 hours"
            />
          ) : (
            <WalletCard
              title="Merchant Points"
              icon={<Store className="h-3.5 w-3.5" strokeWidth={1.75} />}
              redeemable={user.wallets.merchant.redeemable}
              pending={user.wallets.merchant.pending}
              pendingLabel="Pending Points"
              footnote="Pending points clear after transaction settlement"
            />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Personal Information</h3>
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          {[
            { icon: Mail, label: "Email", value: "ahmed.balushi@email.com" },
            { icon: Phone, label: "Phone", value: "+971 50 123 4567" },
            { icon: MapPin, label: "Location", value: "Dubai, UAE" },
            { icon: CreditCard, label: "Card", value: "•••• •••• •••• 4521" },
          ].map((item, i) => (
            <div key={item.label} className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-border" : ""}`}>
              <item.icon className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
                <p className="text-sm text-card-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tier Section */}
      <div className="px-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Loyalty Tier</h3>
        <button
          onClick={() => navigate("/rewards")}
          className="w-full rounded-xl bg-card border border-border overflow-hidden p-4 text-left transition-colors hover:bg-muted/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: "hsl(38, 85%, 52%, 0.15)", color: "hsl(38, 85%, 52%)" }}>
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-card-foreground">{user.tier} Member</p>
                <p className="text-[10px] text-muted-foreground">View tier benefits</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </button>
      </div>

      {/* My Orders */}
      <div className="px-4 mt-4">
        <button
          onClick={() => navigate("/orders")}
          className="w-full flex items-center gap-3 rounded-xl bg-card border border-border p-4 transition-colors hover:bg-muted/50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ShoppingBag className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-card-foreground">My Orders</p>
            <p className="text-[10px] text-muted-foreground">View your redemption history</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Appearance */}
      <div className="px-4 mt-6">
        <h3 className="text-[10px] tracking-[0.28em] uppercase mb-3" style={{ color: "#02AD4C", fontWeight: 600 }}>
          Appearance
        </h3>
        <div className="rounded-xl border overflow-hidden bg-white border-[#E8E8EE] dark:bg-[#1F242D] dark:border-[#02AD4C]/30 dark:shadow-[0_8px_32px_rgba(2, 173, 76,0.12)]">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(2, 173, 76,0.12)" }}>
              {theme === "dark" ? (
                <Moon className="h-4 w-4" style={{ color: "#02AD4C" }} strokeWidth={1.5} />
              ) : (
                <Sun className="h-4 w-4" style={{ color: "#02AD4C" }} strokeWidth={1.5} />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#302F2D] dark:text-[#FFFFFF]">Theme</p>
              <p className="text-[11px] text-[#6B6B7A] dark:text-[#FFFFFF]/60">
                {theme === "dark" ? "After-hours — dark ivory on charcoal" : "Daylight — warm ivory"}
              </p>
            </div>
            <div
              className="flex rounded-full p-0.5 border bg-[rgba(26, 26, 46,0.06)] border-[#E8E8EE] dark:bg-[rgba(2, 173, 76,0.08)] dark:border-[#02AD4C]/30"
            >
              <button
                onClick={() => setTheme("light")}
                className="px-3 py-1 text-[10px] tracking-[0.22em] uppercase rounded-full transition-all"
                style={{
                  backgroundColor: theme === "light" ? "#302F2D" : "transparent",
                  color: theme === "light" ? "#02AD4C" : "#6B6B7A",
                  fontWeight: 500,
                }}
              >
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className="px-3 py-1 text-[10px] tracking-[0.22em] uppercase rounded-full transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#02AD4C" : "transparent",
                  color: theme === "dark" ? "#302F2D" : "#6B6B7A",
                  fontWeight: 500,
                }}
              >
                Dark
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
