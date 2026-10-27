import { Plane, Luggage, Briefcase, Utensils, RefreshCw, Armchair } from "lucide-react";
import { priceText } from "@/lib/pricing";
import BottomAction from "./BottomAction";

export type FlightSummary = {
  id: number;
  airline: string;
  code: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: string;
  points: number;
  logo: string;
};

interface FlightDetailProps {
  flight: FlightSummary;
  from: { code: string; name: string; country: string };
  to: { code: string; name: string; country: string };
  dateLabel: string;
  onContinue: () => void;
}

const FlightDetail = ({ flight, from, to, dateLabel, onContinue }: FlightDetailProps) => (
  <>
    <div className="space-y-8 px-5 pb-48 pt-5">
      <section>
        <div className="flex items-center gap-2">
          <span className="text-lg">{flight.logo}</span>
          <span className="text-[15px] font-bold text-foreground">{flight.airline}</span>
          <span className="ml-auto text-[12px] text-muted-foreground">{flight.code}</span>
        </div>
        <p className="mt-1 text-[12px] text-muted-foreground">{dateLabel} · Economy</p>

        <div className="mt-4 rounded-2xl bg-[#ECE8E3] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[22px] font-bold tabular-nums text-foreground">{flight.depart}</p>
              <p className="text-[13px] font-semibold text-foreground">{from.code}</p>
              <p className="text-[11px] text-muted-foreground">{from.name}</p>
            </div>
            <div className="mx-3 flex flex-1 flex-col items-center">
              <span className="text-[11px] text-muted-foreground">{flight.duration}</span>
              <div className="relative my-1 h-px w-full bg-foreground/25">
                <Plane className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-0 bg-[#ECE8E3] px-0.5 text-primary" />
              </div>
              <span className="text-[11px] font-medium text-primary">{flight.stops}</span>
            </div>
            <div className="text-right">
              <p className="text-[22px] font-bold tabular-nums text-foreground">{flight.arrive}</p>
              <p className="text-[13px] font-semibold text-foreground">{to.code}</p>
              <p className="text-[11px] text-muted-foreground">{to.name}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-[15px] font-bold text-foreground">Baggage & inclusions</h3>
        <div className="mt-3 divide-y divide-border border-y border-border">
          {[
            { icon: Briefcase, label: "Cabin baggage", value: "1 piece · 7 kg" },
            { icon: Luggage, label: "Check-in baggage", value: "1 piece · 23 kg" },
            { icon: Utensils, label: "Meal", value: "Complimentary on board" },
            { icon: Armchair, label: "Seat", value: "Standard seat · select at check-in" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 py-3 text-[14px]">
              <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
              <span className="text-muted-foreground">{label}</span>
              <span className="ml-auto text-right font-medium text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-[15px] font-bold text-foreground">Fare rules</h3>
        <p className="flex items-start gap-2.5 text-[13px] text-foreground/75">
          <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          Date changes allowed up to 24 hours before departure, subject to fare difference in points.
        </p>
        <p className="flex items-start gap-2.5 text-[13px] text-foreground/75">
          <Plane className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          Cancellations are refunded as points, less a 10% processing fee, up to 24 hours before departure.
        </p>
      </section>
    </div>
    <BottomAction
      label="Continue to traveller details"
      onClick={onContinue}
      hint={
        <>
          <span className="text-muted-foreground">1 traveller · Economy</span>
          <span className="text-[16px] font-bold tabular-nums text-primary">{priceText(flight.points)}</span>
        </>
      }
    />
  </>
);

export default FlightDetail;
