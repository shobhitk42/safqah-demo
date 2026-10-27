import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppleLogo, { isApple } from "@/components/AppleLogo";
import { SAMPLE_RATE, STOREFRONT_RATE, priceText } from "@/lib/pricing";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { live, LIVE_PREFIX } from "@/data/live";
import perfumeImg from "@/assets/perfume.jpg";
import perfumeDiorImg from "@/assets/perfume-dior.jpg";
import perfumeTomfordImg from "@/assets/perfume-tomford.jpg";
import iphoneImg from "@/assets/iphone.jpg";
import headphonesImg from "@/assets/headphones.jpg";
import smartwatchImg from "@/assets/smartwatch.jpg";
import televisionImg from "@/assets/television.jpg";
import laptopImg from "@/assets/laptop.jpg";
import kitchenImg from "@/assets/kitchen-appliances.jpg";
import watchImg from "@/assets/boost-watch.jpg";
import walletImg from "@/assets/boost-wallet.jpg";

const products = [
  { id: "chanel-no5", name: "Chanel No. 5 EDP", category: "Fragrances", points: "4,500", image: perfumeImg },
  { id: "dior-sauvage", name: "Dior Sauvage EDT", category: "Fragrances", points: "3,800", image: perfumeDiorImg },
  { id: "tom-ford-black", name: "Tom Ford Black Orchid", category: "Fragrances", points: "5,200", image: perfumeTomfordImg },
  { id: "creed-aventus", name: "Creed Aventus", category: "Fragrances", points: "9,800", image: perfumeImg },
  { id: "jo-malone-wood-sage", name: "Jo Malone Wood Sage & Sea Salt", category: "Fragrances", points: "6,400", image: perfumeDiorImg },
  { id: "byredo-gypsy-water", name: "Byredo Gypsy Water", category: "Fragrances", points: "7,900", image: perfumeTomfordImg },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", category: "Smartphones", points: "45,000", image: iphoneImg },
  { id: "bose-headphones", name: "Bose QuietComfort Headphones", category: "Audio", points: "12,000", image: headphonesImg },
  { id: "apple-watch-10", name: "Apple Watch Series 10", category: "Wearables", points: "18,000", image: smartwatchImg },
  { id: "samsung-tv", name: "Samsung 50\" UHD Smart TV", category: "Television", points: "25,000", image: televisionImg },
  { id: "acer-laptop", name: "Acer Aspire Laptop", category: "Laptop & Computer", points: "30,000", image: laptopImg },
  { id: "classic-timepiece", name: "Classic Timepiece", category: "Watches", points: "12,000", image: watchImg },
  { id: "leather-wallet", name: "Premium Leather Wallet", category: "Accessories", points: "3,500", image: walletImg },
  { id: "philips-coffee", name: "Philips Coffee Machine", category: "Kitchen Appliances", points: "8,500", image: kitchenImg },
];

const liveProducts = live.merchandise.map((p) => ({
  id: `${LIVE_PREFIX}${p.id}`,
  name: p.name,
  category: p.category || "Merchandise",
  points: p.points.toLocaleString(),
  image: p.image,
}));
const catalogue = liveProducts.length ? liveProducts : products;

const MerchandisePage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const categories = [...new Set(catalogue.map((p) => p.category))];
  const shown = catalogue.filter(
    (p) => (!category || p.category === category) && p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const rateOf = (id: string) => (id.startsWith(LIVE_PREFIX) ? STOREFRONT_RATE : SAMPLE_RATE);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 bg-card px-4 py-4">
        <button onClick={() => navigate("/loyalty")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">{category ?? "All Merchandise"}</h1>
      </div>

      {/* Search */}
      <div className="bg-card px-4 py-3">
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search merchandise..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <Filter className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto bg-card px-4 py-3 scrollbar-hide">
        {[null, ...categories].map((c) => (
          <button
            key={c ?? "all"}
            onClick={() => setCategory(c)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${category === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
          >
            {c ?? "All"}
          </button>
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <p className="text-[11px] text-muted-foreground">Home / Merchandise{category ? ` / ${category}` : ""}</p>
        <p className="text-[11px] text-muted-foreground">{shown.length} items</p>
      </div>

      {/* Grid */}
      <div className="px-3 pb-8">
        {!category && !query && (
          <div className="mb-6 px-1">
            <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">Curated for you</p>
            <p className="mt-1 text-[11px] text-foreground/45">Tap any product to view details and redeem with points.</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2.5">
          {shown.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#E8E8EE] bg-card transition-all active:scale-[0.98]"
            >
              <div className="flex aspect-[4/3] w-full items-center justify-center border-b border-[#F6F3EF] bg-white p-4">
                <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
              </div>
              <div className="p-2.5">
                <span className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                  {isApple(p.name) && <AppleLogo className="h-2.5 w-2.5" />}
                  {p.category}
                </span>
                <p className="mt-0.5 line-clamp-2 text-[12px] font-semibold leading-tight text-card-foreground">{p.name}</p>
                <p className="mt-1 text-[11px] font-bold text-reward-gold">{priceText(Number(p.points.replace(/,/g, "")), rateOf(p.id))}</p>
              </div>
            </div>
          ))}
        </div>
        {shown.length === 0 && <p className="py-16 text-center text-sm text-muted-foreground">No products found</p>}
      </div>
    </div>
  );
};

export default MerchandisePage;
