import SectionTitle from "@/components/SectionTitle";
import { useUser } from "@/contexts/UserContext";
import { getExperience } from "@/data/experiences";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const pointsToOmr = (pts: string): string => {
  const num = parseInt(pts.replace(/,/g, ""), 10);
  if (isNaN(num)) return pts;
  return `${num.toLocaleString()} pts`;
};

const PickedForYou = () => {
  const { user, mode } = useUser();
  const navigate = useNavigate();

  return (
    <section className="px-5 pb-8">
      <SectionTitle title="Picked for You" subtitle="A quiet edit, shaped by what you favour." />

      <div className="flex gap-6 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
        {user.pickedForYou.map((item) => {
          const target =
            item.category === "Hotels" ? "/hotels"
            : item.category === "Lounge" ? "/lounge"
            : item.category === "Sports Events" || item.category === "Events" ? "/sports-events"
            : item.category === "Experiences" ? (getExperience(item.id) ? `/experience/${item.id}` : "/experiences")
            : `/product/${item.id}`;
          return (
            <article
              key={item.id}
              onClick={() => navigate(target, item.category === "Hotels" ? { state: { hotel: item.name } } : undefined)}
              className="group shrink-0 w-[268px] cursor-pointer bg-white rounded-[16px] overflow-hidden flex flex-col"
            >
              <div className="h-40 w-full overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  width={512}
                  height={512}
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#8A8A98]">
                  <span>{item.category}</span>
                  {item.tag && (
                    <>
                      <span aria-hidden>·</span>
                      <span style={{ color: "#02AD4C" }}>{item.tag}</span>
                    </>
                  )}
                </div>
                <h3
                  className="mt-5 text-[16px] leading-snug text-foreground line-clamp-2 min-h-[2.6em]"
                  style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 500, letterSpacing: "0.005em" }}
                >
                  {item.name}
                </h3>
                <p
                  className="mt-3 text-[13px] leading-relaxed text-foreground/60"
                  style={{ fontWeight: 300 }}
                >
                  {mode === "points"
                    ? item.points === "View options" ? item.points : `${item.points} pts`
                    : item.points === "View options" ? item.points : pointsToOmr(item.points)}
                </p>
                <button
                  className="mt-6 inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] self-start border-b border-transparent group-hover:border-[#02AD4C] transition-colors"
                  style={{ color: "#02AD4C" }}
                >
                  View
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default PickedForYou;
