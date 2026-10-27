import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { offers } from "@/data/offers";

const CATEGORIES = ["All", "Dining", "Shopping", "Travel", "Entertainment", "Groceries", "Health", "Electronics"];

const Offers = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("All");
  const [query, setQuery] = useState("");

  const shown = offers.filter((o) => `${o.brand} ${o.headline}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 bg-card px-4 py-4">
        <button onClick={() => navigate("/loyalty")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">All Offers</h1>
      </div>

      {/* Search */}
      <div className="bg-card px-4 py-3">
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for offers..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <Filter className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto bg-card px-4 py-3 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${selected === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <p className="text-[11px] text-muted-foreground">Home / Offers</p>
        <p className="text-[11px] text-muted-foreground">{shown.length} items</p>
      </div>

      {/* Grid */}
      <div className="px-3 pb-8">
        <div className="mb-6 px-1">
          <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">Curated for you</p>
          <p className="mt-1 text-[11px] text-foreground/45">Tap any offer to view details and activate it.</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {shown.map((offer) => (
            <div
              key={offer.slug}
              onClick={() => navigate(`/offers/${offer.slug}`)}
              className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#E8E8EE] bg-card transition-all active:scale-[0.98]"
            >
              <div className="flex aspect-[4/3] w-full items-center justify-center border-b border-[#F6F3EF] bg-white p-4">
                <img src={offer.image} alt={offer.brand} loading="lazy" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="p-2.5">
                <p className="truncate text-[12px] font-semibold leading-tight text-card-foreground">{offer.brand}</p>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">{offer.headline}</p>
                <p className="mt-1 text-[11px] font-bold text-primary">{offer.cost === 0 ? "Free" : `${offer.cost.toLocaleString()} pts`}</p>
              </div>
            </div>
          ))}
        </div>
        {shown.length === 0 && <p className="py-16 text-center text-sm text-muted-foreground">No offers found</p>}
      </div>
    </div>
  );
};

export default Offers;
