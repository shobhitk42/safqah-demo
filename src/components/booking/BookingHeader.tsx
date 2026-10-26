import { ChevronLeft, Check } from "lucide-react";

interface BookingHeaderProps {
  title: string;
  onBack: () => void;
  steps?: string[];
  current?: number;
}

/** Page header with a back chevron and, optionally, a numbered step indicator. */
const BookingHeader = ({ title, onBack, steps, current = 0 }: BookingHeaderProps) => (
  <div className="sticky top-0 z-30 bg-background/95 backdrop-blur">
    <div className="flex items-center gap-2 px-4 py-4">
      <button onClick={onBack} aria-label="Back" className="-ml-1 flex h-9 w-9 items-center justify-center">
        <ChevronLeft className="h-6 w-6 text-foreground" strokeWidth={1.5} />
      </button>
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
    </div>
    {steps && (
      <div className="flex items-center gap-2 border-b border-border px-5 pb-3">
        {steps.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={label} className="flex flex-1 items-center gap-2 last:flex-none">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  done || active ? "bg-primary text-primary-foreground" : "bg-[#E4E0DB] text-foreground/50"
                }`}
              >
                {done ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
              </span>
              <span className={`text-[11px] ${active ? "font-semibold text-foreground" : "text-foreground/50"}`}>{label}</span>
              {i < steps.length - 1 && <span className={`h-px flex-1 ${done ? "bg-primary" : "bg-border"}`} />}
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default BookingHeader;
