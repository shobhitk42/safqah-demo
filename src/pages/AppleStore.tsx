import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ShoppingBag, CreditCard, Truck } from "lucide-react";
import AppleLogo from "@/components/AppleLogo";
import { appleProducts, appleImages, formatPoints } from "@/data/appleProducts";
import iphone17ProHero from "@/assets/Apple-iPhone-17-Pro.jpg.asset.json";

const shopRow = [
  { name: "iPhone", image: appleImages.iphone17Orange },
  { name: "Mac", image: appleImages.macbookPro },
  { name: "iPad", image: appleImages.ipadPro13Silver },
  { name: "AirPods", image: appleImages.airpodsPro2 },
];

const latest = [
  { id: "iphone-17-pro", eyebrow: "", title: "iPhone 17 Pro", sub: "All out Pro.", price: `From ${formatPoints(4699)}`, image: iphone17ProHero.url, dark: true },
  { id: "ipad-pro-13-silver", eyebrow: "NEW", title: "iPad Pro", sub: "Unbelievably thin. Incredibly powerful.", price: `From ${formatPoints(4199)}`, image: appleImages.ipadPro13Silver, dark: false },
  { id: "airpods-pro-2", eyebrow: "NEW", title: "AirPods Pro 2", sub: "Adaptive Audio. Now playing.", price: `From ${formatPoints(999)}`, image: appleImages.airpodsPro2, dark: false },
];

const difference = [
  { icon: CreditCard, title: "Pay entirely with Points.", body: "Redeem your reward Points for any Apple product in the store." },
  { icon: Truck, title: "Fast delivery across Dubai.", body: "Free next-day delivery to your address anywhere in Dubai and the UAE." },
];

const featuredProducts = appleProducts.slice(0, 6);

const AppleStore = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const visibleProducts = activeCategory
    ? appleProducts.filter((p) => p.category === activeCategory)
    : [];

  return (
    <div className="mx-auto min-h-screen max-w-md bg-muted/40 pb-24">
      {/* Apple-style nav */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-muted/80 px-4 py-3 backdrop-blur">
        <button onClick={() => navigate("/")} className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <span className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-foreground">
          <AppleLogo className="h-3.5 w-3.5 text-foreground" /> Store
        </span>
        <div className="flex items-center gap-3">
          <Search className="h-4 w-4 text-foreground" />
          <button onClick={() => navigate("/cart")}>
            <ShoppingBag className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="px-6 pt-12 pb-10">
        <h1 className="flex items-center gap-2 text-4xl font-bold tracking-tight text-foreground">
          <AppleLogo className="h-8 w-8 text-foreground" /> Store
        </h1>
        <p className="mt-2 text-xl font-semibold leading-snug text-foreground">
          The best way to buy the products you love.
        </p>
      </div>

      {/* Shop row */}
      <div className="flex gap-4 overflow-x-auto px-6 pb-10 scrollbar-hide">
        {shopRow.map((item) => {
          const isActive = activeCategory === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActiveCategory(isActive ? null : item.name)}
              className="group flex min-w-[92px] flex-col items-center gap-2"
            >
              <div
                className={`flex h-[86px] w-[86px] items-center justify-center overflow-hidden rounded-2xl bg-card p-2.5 transition-all duration-300 ${
                  isActive
                    ? "ring-2 ring-primary shadow-lg -translate-y-1"
                    : "shadow-sm hover:-translate-y-1 hover:shadow-md"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width={512}
                  height={512}
                />
              </div>
              <span className={`text-sm font-semibold transition-colors ${isActive ? "text-primary" : "text-foreground"}`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {activeCategory && (
      <div className="px-6">
        <h2 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
          Shop {activeCategory}.{" "}
          <span className="text-muted-foreground">Redeem entirely with your Points.</span>
        </h2>
        <button
          onClick={() => setActiveCategory(null)}
          className="mt-2 text-sm font-medium text-primary"
        >
          Back to store
        </button>
        <div className="mt-5 grid grid-cols-2 gap-4">
          {visibleProducts.map((p) => (
            <button
              key={p.id}
              onClick={() => navigate(
                p.id === "iphone-17-pro"
                  ? "/apple-store/iphone-17-pro"
                  : p.category === "Mac"
                    ? `/apple-store/mac/${p.id}`
                    : `/checkout/${p.id}`
              )}
              className="flex flex-col rounded-3xl bg-card p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-40 items-center justify-center rounded-2xl bg-card p-1">
                <img src={p.image} alt={`${p.name} — ${p.tagline}`} className="h-full w-full object-contain" loading="lazy" width={512} height={512} />
              </div>
              <p className="mt-3 text-sm font-semibold text-card-foreground">{p.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{p.tagline}</p>
              <p className="mt-2 text-sm font-semibold text-reward-gold">{formatPoints(p.price)}</p>
            </button>
          ))}
        </div>
      </div>
      )}

      {!activeCategory && (
      <>
      {/* The latest */}
      <div className="px-6">
        <h2 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
          The latest. <span className="text-muted-foreground">Take a look at what&apos;s new right now.</span>
        </h2>
      </div>
      <div className="mt-5 flex gap-4 overflow-x-auto px-6 pb-10 scrollbar-hide">
        {latest.map((item) => (
          <button
            key={item.title}
            onClick={() => navigate(item.id === "iphone-17-pro" ? "/apple-store/iphone-17-pro" : `/checkout/${item.id}`)}
            className={`min-w-[280px] overflow-hidden rounded-3xl text-left shadow-sm ${item.dark ? "bg-foreground" : "bg-card"}`}
          >
            <div className="px-6 pt-6">
              {item.eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-wide text-accent">{item.eyebrow}</p>}
              <p className={`text-2xl font-bold tracking-tight ${item.dark ? "text-background" : "text-card-foreground"}`}>{item.title}</p>
              <p className={`mt-1 text-sm font-medium ${item.dark ? "text-background/80" : "text-card-foreground"}`}>{item.sub}</p>
              <p className={`mt-1 text-sm ${item.dark ? "text-background/70" : "text-muted-foreground"}`}>{item.price}</p>
            </div>
            <div className={`mt-4 flex h-56 w-full items-center justify-center p-4 ${item.dark ? "" : "bg-card"}`}>
              <img src={item.image} alt={item.title} className="h-full w-full object-contain" loading="lazy" width={512} height={512} />
            </div>
          </button>
        ))}
      </div>

      {/* The Apple Store difference */}
      <div className="px-6">
        <h2 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
          The Apple Store difference. <span className="text-muted-foreground">Even more reasons to shop with us.</span>
        </h2>
      </div>
      <div className="mt-5 flex gap-4 overflow-x-auto px-6 pb-10 scrollbar-hide">
        {difference.map((d) => (
          <div key={d.title} className="min-w-[280px] rounded-3xl bg-card p-6 shadow-sm">
            <d.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <p className="mt-4 text-xl font-bold leading-snug tracking-tight text-card-foreground">{d.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{d.body}</p>
          </div>
        ))}
      </div>

      {/* Featured products */}
      <div className="px-6">
        <h2 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
          Featured products. <span className="text-muted-foreground">Hand-picked for you.</span>
        </h2>
      </div>
      <div className="mt-5 flex gap-4 overflow-x-auto px-6 pb-10 scrollbar-hide">
        {featuredProducts.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate(
              p.id === "iphone-17-pro"
                ? "/apple-store/iphone-17-pro"
                : p.category === "Mac"
                  ? `/apple-store/mac/${p.id}`
                  : `/checkout/${p.id}`
            )}
            className="min-w-[220px] overflow-hidden rounded-3xl bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-48 w-full items-center justify-center bg-card p-4">
              <img src={p.image} alt={p.name} className="h-full w-full object-contain" loading="lazy" width={512} height={512} />
            </div>
            <div className="p-5">
              <p className="text-base font-semibold text-card-foreground">{p.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{p.tagline}</p>
              <p className="mt-2 text-sm font-semibold text-reward-gold">{formatPoints(p.price)}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Accessories */}
      <div className="px-6">
        <h2 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
          Accessories. <span className="text-muted-foreground">Essentials that pair perfectly with your favourite devices.</span>
        </h2>
        <div className="mt-5 rounded-3xl bg-card p-6 shadow-sm">
          <p className="text-xl font-bold tracking-tight text-card-foreground">Here and wow.</p>
          <p className="mt-1 text-sm text-muted-foreground">The accessories you love, redeemable with Points.</p>
          <div className="mt-4 flex h-40 w-full items-center justify-center rounded-2xl bg-card">
            <img src={appleImages.airpodsMax} alt="AirPods Max accessories" className="max-h-full max-w-full object-contain mix-blend-multiply" loading="lazy" width={512} height={512} />
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default AppleStore;
