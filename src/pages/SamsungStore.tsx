import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ShoppingBag, Sparkles, Truck, ShieldCheck } from "lucide-react";
import { samsungProducts, samsungImages, formatPoints, type SamsungCategory } from "@/data/samsungProducts";

const categories: { name: SamsungCategory; image: string }[] = [
  { name: "Galaxy S", image: samsungImages.s26Ultra },
  { name: "Foldables", image: samsungImages.zFlip },
  { name: "Tablets", image: samsungImages.tab },
  { name: "Watches", image: samsungImages.watch },
  { name: "Audio", image: samsungImages.buds },
  { name: "TV & Laptops", image: samsungImages.tv },
  { name: "Home Appliances", image: samsungImages.washer },
];

const highlights = [
  { id: "galaxy-z-fold8", eyebrow: "THE ALL-NEW", title: "Galaxy Z Fold8", sub: "Unfold your world.", image: samsungImages.zFold, dark: true },
  { id: "galaxy-s26-ultra", eyebrow: "GALAXY AI", title: "Galaxy S26 Ultra", sub: "AI in every moment.", image: samsungImages.s26Ultra, dark: false },
  { id: "galaxy-watch-ultra2", eyebrow: "NEW", title: "Galaxy Watch Ultra2", sub: "Built to go further.", image: samsungImages.watch, dark: false },
];

const perks = [
  { icon: Sparkles, title: "Redeem fully with Points.", body: "Every Galaxy device is available for your reward Points — no card needed." },
  { icon: Truck, title: "Free next-day delivery.", body: "Delivered anywhere in Dubai and across the UAE at no extra cost." },
  { icon: ShieldCheck, title: "2-year Galaxy warranty.", body: "Official regional warranty and support included with every device." },
];

const SamsungStore = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<SamsungCategory | null>(null);
  const visible = activeCategory ? samsungProducts.filter((p) => p.category === activeCategory) : [];

  return (
    <div className="mx-auto min-h-screen max-w-md bg-muted/40 pb-24">
      <div className="sticky top-0 z-40 flex items-center justify-between bg-muted/80 px-4 py-3 backdrop-blur">
        <button onClick={() => navigate("/")} className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <span className="text-sm font-bold uppercase tracking-[0.25em] text-foreground">Samsung</span>
        <div className="flex items-center gap-3">
          <Search className="h-4 w-4 text-foreground" />
          <button onClick={() => navigate("/cart")} aria-label="Cart">
            <ShoppingBag className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>

      <div className="px-6 pt-10 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Samsung Store</h1>
        <p className="mt-2 text-xl font-semibold leading-snug text-foreground">
          The Galaxy line-up, redeemable with your Points.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto px-6 pb-10 scrollbar-hide">
        {categories.map((c) => {
          const isActive = activeCategory === c.name;
          return (
            <button
              key={c.name}
              onClick={() => setActiveCategory(isActive ? null : c.name)}
              className="group flex min-w-[92px] flex-col items-center gap-2"
            >
              <div
                className={`flex h-[86px] w-[86px] items-center justify-center overflow-hidden rounded-2xl bg-card p-2.5 transition-all duration-300 ${
                  isActive ? "-translate-y-1 shadow-lg ring-2 ring-primary" : "shadow-sm hover:-translate-y-1 hover:shadow-md"
                }`}
              >
                <img src={c.image} alt={c.name} className="h-full w-full object-contain mix-blend-multiply" loading="lazy" width={512} height={512} />
              </div>
              <span className={`whitespace-nowrap text-sm font-semibold ${isActive ? "text-primary" : "text-foreground"}`}>{c.name}</span>
            </button>
          );
        })}
      </div>

      {activeCategory ? (
        <div className="px-6">
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
            Shop {activeCategory}. <span className="text-muted-foreground">Redeem entirely with your Points.</span>
          </h2>
          <button onClick={() => setActiveCategory(null)} className="mt-2 text-sm font-medium text-primary">
            Back to store
          </button>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {visible.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/samsung-store/${p.id}`)}
                className="flex flex-col rounded-3xl bg-card p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-40 items-center justify-center rounded-2xl bg-card p-1">
                  <img src={p.image} alt={`${p.name} — ${p.tagline}`} className="h-full w-full object-contain mix-blend-multiply" loading="lazy" width={512} height={512} />
                </div>
                <p className="mt-3 text-sm font-semibold text-card-foreground">{p.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.tagline}</p>
                <p className="mt-2 text-sm font-semibold text-reward-gold">{formatPoints(p.price)}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="px-6">
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
              The latest. <span className="text-muted-foreground">Everything new in the Galaxy world.</span>
            </h2>
          </div>
          <div className="mt-5 flex gap-4 overflow-x-auto px-6 pb-10 scrollbar-hide">
            {highlights.map((h) => (
              <button
                key={h.id}
                onClick={() => navigate(`/samsung-store/${h.id}`)}
                className={`min-w-[280px] overflow-hidden rounded-3xl text-left shadow-sm ${h.dark ? "bg-foreground" : "bg-card"}`}
              >
                <div className="px-6 pt-6">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-accent">{h.eyebrow}</p>
                  <p className={`text-2xl font-bold tracking-tight ${h.dark ? "text-background" : "text-card-foreground"}`}>{h.title}</p>
                  <p className={`mt-1 text-sm font-medium ${h.dark ? "text-background/80" : "text-muted-foreground"}`}>{h.sub}</p>
                </div>
                <div className="mt-4 flex h-56 w-full items-center justify-center p-4">
                  <img src={h.image} alt={h.title} className={`h-full w-full object-contain ${h.dark ? "" : "mix-blend-multiply"}`} loading="lazy" width={512} height={512} />
                </div>
              </button>
            ))}
          </div>

          <div className="px-6">
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
              Shop the line-up. <span className="text-muted-foreground">Popular Galaxy picks right now.</span>
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {samsungProducts.slice(0, 6).map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/samsung-store/${p.id}`)}
                  className="flex flex-col rounded-3xl bg-card p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-36 items-center justify-center rounded-2xl bg-card p-1">
                    <img src={p.image} alt={`${p.name} — ${p.tagline}`} className="h-full w-full object-contain mix-blend-multiply" loading="lazy" width={512} height={512} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-card-foreground">{p.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{p.tagline}</p>
                  <p className="mt-2 text-sm font-semibold text-reward-gold">{formatPoints(p.price)}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 pt-10">
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
              Why shop here. <span className="text-muted-foreground">More reasons to redeem with us.</span>
            </h2>
          </div>
          <div className="mt-5 flex gap-4 overflow-x-auto px-6 pb-10 scrollbar-hide">
            {perks.map((p) => (
              <div key={p.title} className="min-w-[280px] rounded-3xl bg-card p-6 shadow-sm">
                <p.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                <p className="mt-4 text-xl font-bold leading-snug tracking-tight text-card-foreground">{p.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SamsungStore;
