import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PTS_PER_AED = 334;

export const FlowPage = ({ title, children }: { title: string; children: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export const FlowSuccess = ({
  title,
  lines,
  onReset,
  resetLabel,
}: {
  title: string;
  lines: string[];
  onReset: () => void;
  resetLabel: string;
}) => (
  <div className="flex flex-col items-center justify-center px-6 pt-16 pb-8 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
      <CheckCircle2 className="h-8 w-8 text-primary" />
    </div>
    <h2 className="mb-2 text-lg font-bold text-foreground">{title}</h2>
    {lines.map((l) => (
      <p key={l} className="mb-1 text-sm text-muted-foreground">{l}</p>
    ))}
    <Button onClick={onReset} variant="outline" size="sm" className="mt-5">{resetLabel}</Button>
  </div>
);

export const FlowCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="space-y-3 rounded-xl border border-border bg-card p-4">
    <p className="text-sm font-semibold text-card-foreground">{title}</p>
    {children}
  </div>
);
