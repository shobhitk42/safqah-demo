import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { FlowPage, FlowSuccess, FlowCard, PTS_PER_AED } from "@/components/FlowPage";

const causes = [
  { id: "water", name: "Clean Water", blurb: "Wells for rural communities" },
  { id: "edu", name: "Education", blurb: "School supplies and scholarships" },
  { id: "food", name: "Food Relief", blurb: "Meals for families in need" },
  { id: "health", name: "Healthcare", blurb: "Mobile clinics and medicine" },
];
const amounts = [5, 10, 25, 50];

const Donations = () => {
  const { user } = useUser();
  const [cause, setCause] = useState<string | null>(null);
  const [aed, setAed] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const pts = (aed ?? 0) * PTS_PER_AED;
  const c = causes.find((x) => x.id === cause);
  const reset = () => { setDone(false); setCause(null); setAed(null); };

  if (done)
    return (
      <FlowPage title="Donations">
        <FlowSuccess title="Thank you!" lines={[`AED ${aed} donated to ${c?.name}`, `${pts.toLocaleString()} points donated`]} onReset={reset} resetLabel="Donate again" />
      </FlowPage>
    );

  return (
    <FlowPage title="Donations">
      <div className="space-y-5 px-4 pb-8">
        <FlowCard title="Choose a cause">
          <div className="space-y-2">
            {causes.map((x) => (
              <button key={x.id} onClick={() => setCause(x.id)} className={`w-full rounded-xl border p-3 text-left ${cause === x.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}>
                <p className="text-sm font-semibold text-card-foreground">{x.name}</p>
                <p className="text-xs text-muted-foreground">{x.blurb}</p>
              </button>
            ))}
          </div>
        </FlowCard>
        {cause && (
          <FlowCard title="Donation amount">
            <div className="grid grid-cols-4 gap-2">
              {amounts.map((a) => (
                <button key={a} disabled={a * PTS_PER_AED > user.availablePoints} onClick={() => setAed(a)} className={`rounded-xl border p-3 text-sm font-bold disabled:opacity-40 ${aed === a ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}>{a}</button>
              ))}
            </div>
            {aed && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Points donated</span><span className="font-semibold text-primary">{pts.toLocaleString()}</span></div>}
            <Button className="w-full" size="lg" disabled={!aed} onClick={() => { setDone(true); toast.success("Donation sent"); }}>Donate</Button>
          </FlowCard>
        )}
      </div>
    </FlowPage>
  );
};

export default Donations;
