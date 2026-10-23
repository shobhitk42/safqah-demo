import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Clock, Heart } from "lucide-react";
import { experiences } from "@/data/experiences";

const excludedIds = ["real-madrid-tickets", "concert-live"];
const categories = ["All", "Paris Tours", "Adventure", "Luxury Hotels", "Wellness", "Culinary", "Nature", "Experiences", "Lounge"];

const ExperiencesPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const items = useMemo(() => {
    return experiences
      .filter((e) => !excludedIds.includes(e.id))
      .filter((e) => (activeCat === "All" ? true : e.category === activeCat))
      .filter((e) =>
        query.trim()
          ? (e.name + e.location + e.category).toLowerCase().includes(query.toLowerCase())
          : true,
      );
  }, [query, activeCat]);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <button
            onClick={() => navigate("/")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
          <h1 className="text-base font-semibold text-foreground">Experiences & Tours</h1>
        </div>
        {/* Search */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search experiences, cities, activities..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>
        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-3">
          {categories.map((cat) => {
            const active = activeCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold border transition ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{items.length}</span> experiences available
        </p>
      </div>

      {/* Listing */}
      <div className="px-4 grid grid-cols-1 gap-4">
        {items.map((exp) => (
          <button
            key={exp.id}
            onClick={() => navigate(`/experience/${exp.id}`)}
            className="text-left rounded-2xl overflow-hidden bg-card border border-border shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative">
              <img
                src={exp.image}
                alt={exp.name}
                className="h-44 w-full object-cover"
                loading="lazy"
                width={800}
                height={512}
              />
              <span className="absolute top-3 left-3 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-semibold px-2.5 py-1 uppercase tracking-wider">
                {exp.category}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 backdrop-blur"
                aria-label="Save"
              >
                <Heart className="h-4 w-4 text-foreground" />
              </button>
            </div>
            <div className="p-3.5">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{exp.location}</p>
              <h3 className="text-sm font-bold text-foreground leading-snug mt-0.5 line-clamp-2 min-h-[2.4em]">
                {exp.name}
              </h3>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {exp.duration}
                </span>
                <span>·</span>
                <span>{exp.difficulty}</span>
              </div>
              <div className="mt-3 flex items-end justify-between border-t border-border pt-3">
                <div>
                  <p className="text-[10px] text-muted-foreground">From</p>
                  <p className="text-sm font-bold text-primary">
                    {exp.points.toLocaleString()} pts
                    <span className="text-[11px] text-muted-foreground font-normal"> · AED {exp.cashPrice}</span>
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 text-primary text-[11px] font-semibold px-3 py-1.5">
                  View
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExperiencesPage;
