import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Check, Send, Sparkles, UserRound } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BottomNav from "@/components/BottomNav";

const AVAILABLE_POINTS = 52400;

const CONTACTS = [
  { name: "Aisha Rahman", phone: "501234567", initials: "AR" },
  { name: "Omar Al Harbi", phone: "552345678", initials: "OH" },
  { name: "Layla Al Qahtani", phone: "563456789", initials: "LN" },
  { name: "Yusuf Khan", phone: "544567890", initials: "YK" },
];

const PeerTransfer = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"contacts" | "manual">("contacts");
  const [selected, setSelected] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(1000);
  const [done, setDone] = useState(false);

  const recipientPhone = tab === "contacts" ? selected ?? "" : phone;
  const recipientName =
    tab === "contacts" ? CONTACTS.find((c) => c.phone === selected)?.name ?? "" : `+966 ${phone}`;
  const valid = recipientPhone.length === 9 && amount > 0 && amount <= AVAILABLE_POINTS;

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-32">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Peer to Peer Transfer</h1>
      </div>

      <div className="mx-4 mb-5 rounded-2xl safqah-banner p-5">
        <div className="mb-1 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary-foreground/80" />
          <p className="text-xs text-primary-foreground/80">Available Points</p>
        </div>
        <p className="text-2xl font-bold text-primary-foreground">{AVAILABLE_POINTS.toLocaleString()} Points</p>
        <p className="mt-2 text-[11px] leading-snug text-primary-foreground/75">
          Share your Points, spread the joy and gift effortlessly. Transfers are instant and free.
        </p>
      </div>

      <div className="mx-4 mb-4 flex rounded-xl bg-secondary p-1">
        {(["contacts", "manual"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
              tab === t ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t === "contacts" ? "Family & Friends" : "Enter Manually"}
          </button>
        ))}
      </div>

      {tab === "contacts" ? (
        <div className="mx-4 mb-4 space-y-2">
          {CONTACTS.map((c) => (
            <button
              key={c.phone}
              onClick={() => setSelected(c.phone)}
              className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
 selected === c.phone ?"border-primary bg-primary/5":"border-transparent bg-[#F1EEEA]"
 }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground">
                {c.initials}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-card-foreground">{c.name}</span>
                <span className="block text-xs text-muted-foreground">+966 {c.phone}</span>
              </span>
              {selected === c.phone && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      ) : (
        <div className="mx-4 mb-4 border-b py-4">
          <p className="mb-2 text-sm font-semibold text-card-foreground">Member's Number*</p>
          <div className="flex items-center gap-2">
            <span className="rounded-xl border border-border px-3 py-2.5 text-sm font-semibold text-foreground">+971</span>
            <input
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
              placeholder="Enter mobile number"
              className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Must be exactly 9 digits</p>
        </div>
      )}

      <div className="mx-4 rounded-2xl bg-[#ECE8E3] p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-card-foreground">Points to transfer</p>
          <span className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground">
            {amount.toLocaleString()}
          </span>
        </div>
        <Slider value={[amount]} onValueChange={(v) => setAmount(v[0])} min={0} max={AVAILABLE_POINTS} step={100} />
        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
          <span>0</span>
          <span>{AVAILABLE_POINTS.toLocaleString()}</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="text-muted-foreground">Remaining balance</span>
          <span className="font-semibold text-foreground">{(AVAILABLE_POINTS - amount).toLocaleString()} Points</span>
        </div>
      </div>

      <div className="fixed bottom-[56px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-background px-5 pb-4 pt-3">
        <button
          onClick={() => setDone(true)}
          disabled={!valid}
          className="w-full items-center justify-center gap-2 flex items-center justify-center gap-2 h-[52px] rounded-xl bg-primary px-5 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          <Send className="h-4 w-4" /> Proceed to Transfer
        </button>
      </div>

      <Dialog open={done} onOpenChange={setDone}>
        <DialogContent className="mx-auto max-w-sm rounded-2xl">
          <DialogHeader>
            <div className="mb-3 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <UserRound className="h-8 w-8 text-accent" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Transfer Successful</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-center">
            <p className="text-sm text-muted-foreground">
              {amount.toLocaleString()} Points sent to {recipientName || `+966 ${recipientPhone}`}.
            </p>
            <button
              onClick={() => { setDone(false); navigate("/loyalty"); }}
              className="mt-4 w-full flex items-center justify-center gap-2 h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              Done
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default PeerTransfer;
