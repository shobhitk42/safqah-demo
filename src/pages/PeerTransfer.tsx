import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { FlowPage, FlowSuccess, FlowCard } from "@/components/FlowPage";

const recents = ["Fatima", "Omar", "Layla"];

const PeerTransfer = () => {
  const { user } = useUser();
  const [to, setTo] = useState("");
  const [points, setPoints] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const amt = Number(points) || 0;
  const canSend = to.trim().length >= 3 && amt > 0 && amt <= user.availablePoints;
  const reset = () => { setDone(false); setTo(""); setPoints(""); setNote(""); };

  if (done)
    return (
      <FlowPage title="Peer to Peer Transfer">
        <FlowSuccess title="Points sent" lines={[`${amt.toLocaleString()} points sent to ${to}`, `New balance: ${(user.availablePoints - amt).toLocaleString()} pts`]} onReset={reset} resetLabel="Send more" />
      </FlowPage>
    );

  return (
    <FlowPage title="Peer to Peer Transfer">
      <div className="space-y-5 px-4 pb-8">
        <FlowCard title="Send to">
          <Input placeholder="Name or mobile number" value={to} onChange={(e) => setTo(e.target.value)} />
          <div className="flex gap-2">
            {recents.map((r) => (
              <button key={r} onClick={() => setTo(r)} className="rounded-full border border-border px-3 py-1 text-xs hover:bg-muted">{r}</button>
            ))}
          </div>
        </FlowCard>
        <FlowCard title="Points to send">
          <Input type="number" inputMode="numeric" placeholder="0" value={points} onChange={(e) => setPoints(e.target.value)} />
          <p className="text-xs text-muted-foreground">Available: {user.availablePoints.toLocaleString()} pts</p>
          {amt > user.availablePoints && <p className="text-xs text-destructive">Amount exceeds your available points.</p>}
          <Input placeholder="Add a note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
          <Button className="w-full" size="lg" disabled={!canSend} onClick={() => { setDone(true); toast.success("Points sent"); }}>Send points</Button>
        </FlowCard>
      </div>
    </FlowPage>
  );
};

export default PeerTransfer;
