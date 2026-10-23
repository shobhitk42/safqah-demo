import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { offers } from "@/data/offers";

import { ArrowUpDown, SlidersHorizontal, ChevronRight } from "lucide-react";


const CATEGORIES = [
  "All",
  "Dining",
  "Shopping",
  "Travel",
  "Entertainment",
  "Groceries",
  "Health",
  "Electronics",
];

const Offers = () => {
  const [selected, setSelected] = useState("All");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto w-full max-w-md">
        {/* Header */}
        <header className="flex items-center justify-between px-4 pt-5 pb-3">
          <h1 className="text-[20px] font-bold text-foreground">Offers</h1>
          <div className="flex items-center gap-2">
            <button
              aria-label="Sort"
              className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-[#E8E8EE] bg-card"
            >
              <ArrowUpDown className="h-4 w-4 text-[#302F2D]" strokeWidth={1.5} />
            </button>
            <button
              aria-label="Filter"
              className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-[#E8E8EE] bg-card"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#302F2D]" strokeWidth={1.5} />
            </button>
          </div>
        </header>

        {/* Banner */}
        <div className="px-4">
          <div
            className="relative overflow-hidden rounded-xl h-[140px] flex items-center"
            style={{
              background: "linear-gradient(90deg, #E6F6EC 0%, #FFFFFF 100%)",
            }}
          >
            <div className="flex-1 px-5 py-4">
              <h2 className="text-[15px] font-semibold text-[#302F2D] leading-snug">
                Exclusive perks for Safqah Capital members
              </h2>
              <p className="mt-1.5 text-[11px] text-[#302F2D]/70 leading-relaxed pr-2">
                Activate deals from top UAE brands — all free with your membership.
              </p>
              <button
                type="button"
                className="mt-3 inline-flex items-center rounded-full border border-[#02AD4C] px-4 py-1.5 text-[11px] font-medium text-[#02AD4C] bg-transparent hover:bg-[#02AD4C]/5 transition-colors"
              >
                Explore
              </button>
            </div>
            <div className="w-[110px] h-full flex items-center justify-center pr-3">
              <div
                className="relative h-[100px] w-[60px] rounded-[14px] border-2 border-[#02AD4C]/40 bg-white shadow-md flex flex-col items-center justify-center gap-1.5"
              >
                <div className="h-1 w-6 rounded-full bg-[#02AD4C]/20" />
                <div className="h-8 w-8 rounded-full bg-[#02AD4C] flex items-center justify-center text-white text-[11px] font-bold">
                  %
                </div>
                <div className="h-1 w-4 rounded-full bg-[#02AD4C]/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="mt-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-1">
            {CATEGORIES.map((cat) => {
              const active = selected === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className="shrink-0 rounded-full px-4 py-1.5 text-[12px] font-medium transition-colors border"
                  style={{
                    backgroundColor: active ? "#02AD4C" : "#FFFFFF",
                    color: active ? "#FFFFFF" : "#302F2D",
                    borderColor: active ? "#02AD4C" : "#E8E8EE",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results row */}
        <div className="flex items-center justify-between px-4 mt-4 mb-3">
          <span className="text-[12px] text-[#9CA3AF]">{offers.length} offers</span>
          <span className="text-[12px] text-[#9CA3AF]">Sort by: Relevance ▾</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 px-4">
          {offers.map((offer) => (
            <button
              key={offer.slug}
              onClick={() => navigate(`/offers/${offer.slug}`)}
              className="group flex flex-col overflow-hidden rounded-xl bg-white border border-[#E8E8EE] text-left transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="aspect-square w-full overflow-hidden bg-[#F6F3EF]">
                <img
                  src={offer.image}
                  alt={offer.brand}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1 p-3">
                <span className="text-[12px] text-[#9CA3AF] leading-tight">
                  {offer.brand}
                </span>
                <p
                  className="text-[14px] font-bold text-[#302F2D] leading-snug overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {offer.headline}
                </p>
                <span className="text-[12px] font-bold text-[#02AD4C] tracking-wide mt-0.5">
                  FREE
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1.5 mt-8 px-4 text-[12px] text-[#9CA3AF]">
          <span>Page 1 of 3</span>
          <span className="inline-flex items-center gap-0.5 text-[#02AD4C] font-medium">
            Next <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        </div>
      </div>

    </div>
  );
};

export default Offers;
