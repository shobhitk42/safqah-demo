import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, Filter } from "lucide-react";
import plazaImg from "@/assets/giftcards/plaza.jpeg.asset.json";
import swypeImg from "@/assets/giftcards/swype.jpeg.asset.json";
import binanceImg from "@/assets/giftcards/binance.jpeg.asset.json";
import togasImg from "@/assets/giftcards/togas.jpeg.asset.json";
import homecentreImg from "@/assets/giftcards/homecentre.jpeg.asset.json";
import betterlifeImg from "@/assets/giftcards/betterlife.jpeg.asset.json";
import mumzworldImg from "@/assets/giftcards/mumzworld.jpeg.asset.json";
import babyshopImg from "@/assets/giftcards/babyshop.jpeg.asset.json";
import nbarImg from "@/assets/giftcards/nbar.jpeg.asset.json";

type GiftCard = {
  name: string;
  tags: string[];
  category: string;
  gradient: string;
  slug?: string;
  logoDomain?: string;
  image?: string;
};

const allGiftCards: GiftCard[] = [
  // Airport Lounges (Delayed)
  { name: "Plaza Premium Lounge Access 3", tags: ["Recommended", "Delayed"], category: "travel", gradient: "from-neutral-800 to-neutral-950", image: plazaImg.url },
  { name: "Plaza Premium Global Pass 1 Access", tags: ["Recommended", "Delayed"], category: "travel", gradient: "from-neutral-800 to-neutral-950", image: plazaImg.url },
  { name: "Plaza Premium Global Lounge 6 Access", tags: ["Recommended", "Delayed"], category: "travel", gradient: "from-neutral-800 to-neutral-950", image: plazaImg.url },

  // Prepaid & Vouchers
  { name: "Swype Global (USD) Virtual MasterCard", tags: ["Recommended", "Instant"], category: "general", gradient: "from-neutral-900 to-black", slug: "swype-visa", image: swypeImg.url },
  { name: "Swype Global Virtual Mastercard-3 years", tags: ["Recommended", "Instant"], category: "general", gradient: "from-neutral-900 to-black", image: swypeImg.url },
  { name: "Swype Global Virtual Mastercard®", tags: ["Recommended", "Instant"], category: "general", gradient: "from-neutral-900 to-black", image: swypeImg.url },
  { name: "Binance Gift Card (USDT)", tags: ["Recommended", "Delayed"], category: "general", gradient: "from-amber-700 to-yellow-900", image: binanceImg.url },
  { name: "Noon eVoucher for KSA", tags: ["Recommended", "Instant"], category: "general", gradient: "from-amber-600 to-yellow-800", logoDomain: "noon.com" },
  { name: "MS Office 365 Business Premium", tags: ["Recommended", "Instant"], category: "general", gradient: "from-orange-700 to-red-900", logoDomain: "office.com" },

  // Fashion & Lifestyle
  { name: "Undiz KSA", tags: ["Recommended", "Instant"], category: "fashion", gradient: "from-neutral-800 to-neutral-950", logoDomain: "undiz.com" },
  { name: "1847 KSA", tags: ["Recommended", "Instant"], category: "fashion", gradient: "from-neutral-800 to-neutral-950", logoDomain: "1847.com" },

  // Home & Kitchen
  { name: "Marmarland KSA", tags: ["Recommended", "Instant"], category: "home", gradient: "from-amber-500 to-yellow-600", logoDomain: "marmarland.com" },
  { name: "Togas KSA", tags: ["Recommended", "Instant"], category: "home", gradient: "from-zinc-800 to-zinc-950", image: togasImg.url },
  { name: "Home Centre", tags: ["Recommended", "Instant"], category: "home", gradient: "from-lime-700 to-emerald-900", slug: "urban-home", image: homecentreImg.url },
  { name: "Better Life KSA", tags: ["Recommended", "Instant"], category: "home", gradient: "from-stone-700 to-stone-900", image: betterlifeImg.url },

  // Travel & Entertainment
  { name: "Boulevard Riyadh City KSA", tags: ["Recommended", "Instant"], category: "travel", gradient: "from-red-800 to-red-950", logoDomain: "dubaiautodrome.com" },
  { name: "Airalo KSA", tags: ["Recommended", "Instant"], category: "travel", gradient: "from-stone-700 to-stone-900", logoDomain: "airalo.com" },
  { name: "Vox Cinema KSA", tags: ["Recommended", "Instant"], category: "travel", gradient: "from-neutral-900 to-black", logoDomain: "voxcinemas.com" },
  { name: "Riyadh Season KSA", tags: ["Recommended", "Instant"], category: "travel", gradient: "from-sky-800 to-blue-950", logoDomain: "skidxb.com" },

  // Food & Dining
  { name: "Gazebo KSA", tags: ["Recommended", "Instant"], category: "food", gradient: "from-neutral-800 to-neutral-950", slug: "le-connoisseur", logoDomain: "gazeborestaurant.com" },
  { name: "Give a Ghaf", tags: ["Recommended", "Instant"], category: "food", gradient: "from-emerald-700 to-teal-900", logoDomain: "giveaghaf.org" },

  // Baby & Kids
  { name: "Mumzworld.com KSA", tags: ["Recommended", "Instant"], category: "general", gradient: "from-rose-600 to-pink-800", image: mumzworldImg.url },
  { name: "Babyshop KSA", tags: ["Recommended", "Instant"], category: "general", gradient: "from-orange-700 to-amber-900", image: babyshopImg.url },

  // Beauty & Personal Care
  { name: "N.BAR KSA", tags: ["Recommended", "Instant"], category: "beauty", gradient: "from-rose-600 to-pink-800", image: nbarImg.url },
  { name: "Tips and Toes", tags: ["Recommended", "Instant"], category: "beauty", gradient: "from-rose-700 to-pink-900", logoDomain: "tipsandtoes.com" },
];

const filterLabels: Record<string, string> = {
  fashion: "Fashion & Lifestyle",
  home: "Home & Kitchen",
  beauty: "Beauty & Personal Care",
  food: "Food & Restaurant",
  travel: "Travel & Entertainment",
  general: "Prepaid & Vouchers",
};

const getInitials = (name: string) => {
  const words = name.replace(/[^a-zA-Z\s]/g, "").trim().split(/\s+/);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
};

const GiftCardsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeFilter = searchParams.get("filter");

  const filteredCards = activeFilter
    ? allGiftCards.filter((c) => c.category === activeFilter)
    : allGiftCards;

  const title = activeFilter && filterLabels[activeFilter] ? filterLabels[activeFilter] : "All Gift Cards";

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-card">
        <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">{title}</h1>
      </div>

      {/* Search */}
      <div className="px-4 py-3 bg-card">
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search for gift cards..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
          <Filter className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide bg-card">
        <button
          onClick={() => navigate("/gift-cards")}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${!activeFilter ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
        >
          All
        </button>
        {Object.entries(filterLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => navigate(`/gift-cards?filter=${key}`)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap ${activeFilter === key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <p className="text-[11px] text-muted-foreground">Home / Gift Cards{activeFilter ? ` / ${filterLabels[activeFilter]}` : ""}</p>
        <p className="text-[11px] text-muted-foreground">{filteredCards.length} items</p>
      </div>

      {/* Grid — mobile-optimised, 2 cols */}
      <div className="px-3 pb-8">
        {!activeFilter && (
          <div className="mb-6 px-1">
            <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">Curated for you</p>
            <p className="mt-1 text-[11px] text-foreground/45">Tap any card marked with a gold rule to redeem instantly.</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2.5">
          {filteredCards.map((card) => (
            <div
              key={card.name}
              onClick={() => card.slug && navigate(`/gift-card/${card.slug}`)}
              className={`group flex flex-col overflow-hidden rounded-xl bg-card border shadow-sm transition-all active:scale-[0.98] ${
                card.slug
                  ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
                  : "cursor-default opacity-95"
              }`}
              style={{
                borderColor: card.slug ? "#02AD4C" : "#E8E8EE",
                boxShadow: card.slug ? "0 2px 12px rgba(2, 173, 76,0.08)" : undefined,
              }}
            >
              <div className="aspect-[4/3] w-full bg-white flex items-center justify-center p-4 border-b border-[#F6F3EF]">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : card.logoDomain ? (
                  <img
                    src={`https://logo.clearbit.com/${card.logoDomain}?size=200`}
                    alt={card.name}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`hidden h-full w-full items-center justify-center rounded-md bg-gradient-to-br ${card.gradient} p-3`}
                  style={{ display: card.image || card.logoDomain ? "none" : "flex" }}
                >
                  <span className="text-primary-foreground font-bold text-center text-[13px] leading-tight tracking-wide drop-shadow">
                    {card.name.length > 22 ? getInitials(card.name) : card.name}
                  </span>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-[12px] font-semibold text-card-foreground leading-tight truncate">{card.name}</p>
                {card.slug ? (
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em]" style={{ color: "#02AD4C" }}>
                    Redeem →
                  </p>
                ) : (
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                    {card.tags[0]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftCardsPage;
