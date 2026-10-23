import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Crown, ShoppingBag, Sun, Moon, Wallet, Store } from "lucide-react";
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

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-1 text-[13px] font-bold text-foreground">{children}</h3>
);

const InfoRow = ({ label, value, badge }: { label: string; value: string; badge?: string }) => (
  <div className="flex items-center justify-between gap-3 border-b border-border py-4">
    <div className="min-w-0">
      <p className="text-[14px] font-bold text-foreground">{label}</p>
      <p className="mt-1.5 break-all text-[15px] text-muted-foreground">{value}</p>
    </div>
    <div className="flex shrink-0 items-center gap-3">
      {badge && (
        <span className="rounded-md bg-[#E58A12] px-2.5 py-1 text-[11px] font-medium text-white">{badge}</span>
      )}
      <button className="text-[13px] text-muted-foreground">Edit</button>
    </div>
  </div>
);

const LinkRow = ({ icon: Icon, title, subtitle, onClick }: { icon: typeof Crown; title: string; subtitle: string; onClick: () => void }) => (
  <button onClick={onClick} className="flex w-full items-center gap-3 border-b border-border py-4 text-left">
    <Icon className="h-5 w-5 text-[#02AD4C]" strokeWidth={1.75} />
    <div className="flex-1">
      <p className="text-[14px] font-bold text-foreground">{title}</p>
      <p className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</p>
    </div>
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
  </button>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, role } = useUser();
  const { theme, setTheme } = useTheme();
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <div className="px-5 pt-5">
        <button onClick={() => navigate("/loyalty")} aria-label="Back" className="-ml-1 flex h-9 w-9 items-center justify-center">
          <ChevronLeft className="h-6 w-6 text-foreground" strokeWidth={1.5} />
        </button>
        <h1 className="mt-5 text-[22px] font-bold text-foreground">Profile</h1>
      </div>

      <div className="mt-4 border-t border-border px-5">
        <div className="flex items-center gap-4 border-b border-border py-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#02AD4C]/15 text-lg font-bold text-foreground">
            {initials}
          </div>
          <div>
            <p className="text-[18px] font-bold text-foreground">{user.name}</p>
            <p className="text-[13px] text-muted-foreground">{user.tier} Member</p>
          </div>
        </div>

        <div className="mt-6">
          <SectionTitle>My Wallet</SectionTitle>
          <div className="mt-3">
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

        <div className="mt-8">
          <SectionTitle>Account Information</SectionTitle>
          <InfoRow label="Phone number" value="+966 50 123 4567" />
          <InfoRow label="Email address" value="ahmed.alrashid@email.com" badge="Pending verification" />
          <InfoRow label="Location" value="Riyadh, Saudi Arabia" />
          <InfoRow label="Card" value="•••• •••• •••• 4521" />
        </div>

        <div className="mt-8">
          <SectionTitle>Membership</SectionTitle>
          <LinkRow icon={Crown} title={`${user.tier} Member`} subtitle="View tier benefits" onClick={() => navigate("/rewards")} />
          <LinkRow icon={ShoppingBag} title="My Orders" subtitle="View your redemption history" onClick={() => navigate("/orders")} />
        </div>

        <div className="mt-8">
          <SectionTitle>Appearance</SectionTitle>
          <div className="flex items-center justify-between gap-3 border-b border-border py-4">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="h-5 w-5 text-[#02AD4C]" strokeWidth={1.75} />
              ) : (
                <Sun className="h-5 w-5 text-[#02AD4C]" strokeWidth={1.75} />
              )}
              <div>
                <p className="text-[14px] font-bold text-foreground">Theme</p>
                <p className="mt-0.5 text-[13px] text-muted-foreground">{theme === "dark" ? "Dark" : "Light"}</p>
              </div>
            </div>
            <div className="flex rounded-full border border-border p-0.5">
              {(["light", "dark"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className="rounded-full px-3 py-1 text-[11px] font-medium capitalize transition-all"
                  style={{
                    backgroundColor: theme === t ? "#02AD4C" : "transparent",
                    color: theme === t ? "#FFFFFF" : "#6B6B7A",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
