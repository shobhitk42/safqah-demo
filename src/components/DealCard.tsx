import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface DealCardProps {
  image: string;
  title: string;
  topChips?: ReactNode[];
  badge?: ReactNode;
  rows: { label: string; value: string }[];
  fit?: "cover" | "contain";
  onClick?: () => void;
}

const chipClass =
  "inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-sm";

const DealCard = ({ image, title, topChips = [], badge, rows, fit = "cover", onClick }: DealCardProps) => (
  <button onClick={onClick} className="block w-full text-left active:scale-[0.99] transition-transform">
    <div className="relative h-56 overflow-hidden rounded-3xl bg-muted">
      <img src={image} alt={title} loading="lazy" className={`h-full w-full ${fit === "contain" ? "object-contain p-8" : "object-cover"}`} />
      {topChips.length > 0 && (
        <div className="absolute inset-x-3 top-3 flex flex-wrap gap-2">
          {topChips.map((c, i) => (
            <span key={i} className={chipClass}>{c}</span>
          ))}
        </div>
      )}
      {badge && <span className={`${chipClass} absolute bottom-3 right-3 border border-foreground/70`}>{badge}</span>}
    </div>
    <div className="flex items-center justify-between gap-3 px-1 pt-3">
      <div className="min-w-0">
        <h3 className="truncate text-base font-bold text-foreground">{title}</h3>
        <div className="mt-2 space-y-0.5 text-[13px]">
          {rows.map((r) => (
            <p key={r.label} className="text-muted-foreground">
              {r.label}: <span className="ml-1 font-semibold text-foreground">{r.value}</span>
            </p>
          ))}
        </div>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
    </div>
  </button>
);

export default DealCard;
