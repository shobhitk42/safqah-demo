import { useEffect, useState } from "react";
import { UserRound, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSavedProfiles, SavedProfile } from "@/lib/savedProfiles";

interface Props {
  selectedId?: string | null;
  onSelect: (profile: SavedProfile) => void;
  title?: string;
  hint?: string;
  className?: string;
}

const SavedProfilePicker = ({ selectedId, onSelect, title = "Use a saved profile", hint = "Tap to auto-fill the details below", className }: Props) => {
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);

  useEffect(() => { setProfiles(getSavedProfiles()); }, []);

  if (!profiles.length) return null;

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-3.5", className)}>
      <div className="mb-1 flex items-center gap-1.5">
        <UserRound className="h-3.5 w-3.5 text-primary" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</h3>
      </div>
      <p className="mb-2.5 text-[11px] text-muted-foreground">{hint}</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {profiles.map((p) => {
          const active = selectedId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p)}
              className={cn(
                "relative min-w-[135px] shrink-0 rounded-xl border p-2.5 text-left transition-all active:scale-[0.98]",
                active ? "border-primary bg-primary/10" : "border-border bg-background"
              )}
            >
              {active && (
                <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-primary">
                  <Check className="h-2.5 w-2.5 text-primary-foreground" />
                </span>
              )}
              <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">{p.label}</p>
              <p className="mt-0.5 truncate text-xs font-semibold text-foreground">{p.title} {p.firstName} {p.lastName}</p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">Passport {p.passport}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SavedProfilePicker;
