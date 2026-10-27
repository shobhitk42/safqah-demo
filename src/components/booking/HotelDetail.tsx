import { Star, MapPin, Clock, ShieldCheck, Check } from "lucide-react";
import { priceText } from "@/lib/pricing";
import BottomAction from "./BottomAction";
import { AMENITIES, ROOMS, roomPrice, describeHotel, type HotelSummary } from "./hotelData";

interface HotelDetailProps {
  hotel: HotelSummary;
  gallery: string[];
  checkIn: string;
  checkOut: string;
  nights: number;
  room: string;
  onRoomChange: (id: string) => void;
  onContinue: () => void;
}

const HotelDetail = ({ hotel, gallery, checkIn, checkOut, nights, room, onRoomChange, onContinue }: HotelDetailProps) => {
  const selected = ROOMS.find((r) => r.id === room) ?? ROOMS[0];
  const total = roomPrice(hotel.price, selected.mult) * nights;

  return (
    <>
      <div className="pb-48">
        <div className="flex gap-2 overflow-x-auto px-5 scrollbar-hide">
          {gallery.map((src, i) => (
            <img key={i} src={src} alt={`${hotel.name} ${i + 1}`} className={`h-56 shrink-0 rounded-3xl object-cover ${gallery.length > 1 ? "w-[86%]" : "w-full"}`} loading="lazy" />
          ))}
        </div>

        <div className="space-y-8 px-5 pt-5">
          <section>
            <div className="flex flex-wrap gap-2">
              {hotel.tag && <span className="rounded-full bg-[#ECE8E3] px-3 py-1 text-[11px] font-semibold text-foreground">{hotel.tag}</span>}
              {hotel.rating > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-[#ECE8E3] px-3 py-1 text-[11px] font-semibold text-foreground">
                  <Star className="h-3 w-3 fill-[#FCEE21] text-[#B8A800]" /> {hotel.rating}
                </span>
              )}
            </div>
            <h2 className="mt-3 text-[22px] font-bold leading-tight text-foreground">{hotel.name}</h2>
            {hotel.area && (
              <p className="mt-1 flex items-center gap-1 text-[13px] text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {hotel.area}
              </p>
            )}
            <p className="mt-3 text-[14px] leading-relaxed text-foreground/75">{describeHotel(hotel)}</p>
          </section>

          {(!hotel.amenities || hotel.amenities.length > 0) && (
            <section>
              <h3 className="text-[15px] font-bold text-foreground">{hotel.amenities ? "Amenities" : "Popular amenities"}</h3>
              <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3">
                {hotel.amenities
                  ? hotel.amenities.map((label) => (
                      <div key={label} className="flex items-center gap-2.5 text-[13px] text-foreground/80">
                        <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
                        {label}
                      </div>
                    ))
                  : AMENITIES.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2.5 text-[13px] text-foreground/80">
                        <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
                        {label}
                      </div>
                    ))}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-[15px] font-bold text-foreground">Choose your room</h3>
            <p className="mt-1 text-[12px] text-muted-foreground">
              {checkIn} – {checkOut} · {nights} night{nights > 1 ? "s" : ""} · 2 guests, 1 room
            </p>
            <div className="mt-3 space-y-3">
              {ROOMS.map((r) => {
                const perNight = roomPrice(hotel.price, r.mult);
                const active = r.id === room;
                return (
                  <button
                    key={r.id}
                    onClick={() => onRoomChange(r.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-colors ${
                      active ? "border-primary bg-primary/5" : "border-transparent bg-[#F1EEEA] hover:bg-[#E9E5E0]"
                    }`}
                  >
                    <div>
                      <p className="text-[14px] font-bold text-foreground">{r.name}</p>
                      <p className="mt-0.5 text-[12px] text-muted-foreground">{r.detail}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[15px] font-bold tabular-nums text-primary">{priceText(perNight, hotel.rate)}</p>
                      <p className="text-[11px] text-muted-foreground">per night</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-3 border-t border-border pt-6">
            <h3 className="text-[15px] font-bold text-foreground">Policies</h3>
            <p className="flex items-start gap-2.5 text-[13px] text-foreground/75">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Check-in from 3:00 PM · Check-out by 12:00 PM
            </p>
            <p className="flex items-start gap-2.5 text-[13px] text-foreground/75">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Free cancellation up to 48 hours before check-in. After that, the first night is non-refundable.
            </p>
          </section>
        </div>
      </div>

      <BottomAction
        label="Continue to guest details"
        onClick={onContinue}
        hint={
          <>
            <span className="text-muted-foreground">
              {selected.name} · {nights} night{nights > 1 ? "s" : ""}
            </span>
            <span className="text-[16px] font-bold tabular-nums text-primary">{priceText(total, hotel.rate)}</span>
          </>
        }
      />
    </>
  );
};

export default HotelDetail;
