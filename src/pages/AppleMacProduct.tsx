import { useState } from "react";
import AppleLogo from "@/components/AppleLogo";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Truck, Store } from "lucide-react";
import { appleImages, formatPoints, toPoints } from "@/data/appleProducts";

type MacConfig = {
  id: string;
  family: string;
  gallery: string[];
  models: { id: string; name: string; display: string; price: number }[];
  finishes: { id: string; name: string; swatch: string; image: string }[];
  storages: { id: string; label: string; add: number }[];
};

const macConfigs: Record<string, MacConfig> = {
  "macbook-pro-14": {
    id: "macbook-pro-14",
    family: "MacBook Pro",
    gallery: [appleImages.macbookPro, appleImages.macbookAir],
    models: [
      { id: "14", name: 'MacBook Pro 14"', display: "M5 Pro · 14-inch Liquid Retina XDR", price: 84999 },
      { id: "16", name: 'MacBook Pro 16"', display: "M5 Pro · 16-inch Liquid Retina XDR", price: 9999 },
    ],
    finishes: [
      { id: "space-black", name: "Space Black", swatch: "hsl(0 0% 16%)", image: appleImages.macbookPro },
      { id: "silver", name: "Silver", swatch: "hsl(0 0% 82%)", image: appleImages.macbookPro },
    ],
    storages: [
      { id: "512", label: "512GB SSD", add: 0 },
      { id: "1tb", label: "1TB SSD", add: 800 },
      { id: "2tb", label: "2TB SSD", add: 2000 },
    ],
  },
  "macbook-air-13": {
    id: "macbook-air-13",
    family: "MacBook Air",
    gallery: [appleImages.macbookAir, appleImages.macbookPro],
    models: [
      { id: "13", name: 'MacBook Air 13"', display: "M4 · 13.6-inch Liquid Retina", price: 4299 },
      { id: "15", name: 'MacBook Air 15"', display: "M4 · 15.3-inch Liquid Retina", price: 5299 },
    ],
    finishes: [
      { id: "midnight", name: "Midnight", swatch: "hsl(220 30% 18%)", image: appleImages.macbookAir },
      { id: "silver", name: "Silver", swatch: "hsl(0 0% 82%)", image: appleImages.macbookAir },
    ],
    storages: [
      { id: "256", label: "256GB SSD", add: 0 },
      { id: "512", label: "512GB SSD", add: 550 },
      { id: "1tb", label: "1TB SSD", add: 1100 },
    ],
  },
  "imac-24": {
    id: "imac-24",
    family: "iMac",
    gallery: [appleImages.imacBlue],
    models: [
      { id: "8core", name: 'iMac 24" · 8-core GPU', display: "M4 chip · 16GB unified memory", price: 5499 },
      { id: "10core", name: 'iMac 24" · 10-core GPU', display: "M4 chip · 24GB unified memory", price: 6499 },
    ],
    finishes: [
      { id: "blue", name: "Blue", swatch: "hsl(210 70% 60%)", image: appleImages.imacBlue },
      { id: "silver", name: "Silver", swatch: "hsl(0 0% 82%)", image: appleImages.imacBlue },
    ],
    storages: [
      { id: "256", label: "256GB SSD", add: 0 },
      { id: "512", label: "512GB SSD", add: 550 },
      { id: "1tb", label: "1TB SSD", add: 1100 },
    ],
  },
  "mac-studio": {
    id: "mac-studio",
    family: "Mac Studio",
    gallery: [appleImages.macStudio],
    models: [
      { id: "max", name: "Mac Studio · M4 Max", display: "14-core CPU · 32GB memory", price: 8499 },
      { id: "ultra", name: "Mac Studio · M4 Ultra", display: "28-core CPU · 64GB memory", price: 13999 },
    ],
    finishes: [{ id: "silver", name: "Silver", swatch: "hsl(0 0% 82%)", image: appleImages.macStudio }],
    storages: [
      { id: "512", label: "512GB SSD", add: 0 },
      { id: "1tb", label: "1TB SSD", add: 800 },
      { id: "2tb", label: "2TB SSD", add: 2000 },
    ],
  },
};

const AppleMacProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const config = macConfigs[id ?? ""];

  const [model, setModel] = useState(config?.models[0].id ?? "");
  const [finish, setFinish] = useState(config?.finishes[0].id ?? "");
  const [storage, setStorage] = useState(config?.storages[0].id ?? "");

  if (!config) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6 text-center">
        <div>
          <p className="text-lg font-semibold text-foreground">Product not found</p>
          <button onClick={() => navigate("/apple-store")} className="mt-3 text-sm font-medium text-primary">
            Back to store
          </button>
        </div>
      </div>
    );
  }

  const selectedModel = config.models.find((m) => m.id === model) ?? config.models[0];
  const selectedStorage = config.storages.find((s) => s.id === storage) ?? config.storages[0];
  const selectedFinish = config.finishes.find((f) => f.id === finish) ?? config.finishes[0];
  const totalPoints = toPoints(selectedModel.price + selectedStorage.add);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-muted/40 pb-40">
      <div className="sticky top-0 z-40 flex items-center justify-between bg-muted/80 px-4 py-3 backdrop-blur">
        <button onClick={() => navigate("/apple-store")} className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <span className="text-sm font-semibold tracking-tight text-foreground"> Store</span>
        <button onClick={() => navigate("/cart")}>
          <ShoppingBag className="h-4 w-4 text-foreground" />
        </button>
      </div>

      <div className="px-6 pt-8">
        <AppleLogo className="mb-2 h-6 w-6 text-foreground" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Buy {config.family}</h1>
      </div>

      <div className="mt-5 flex snap-x gap-4 overflow-x-auto px-6 pb-2 scrollbar-hide">
        {config.gallery.map((src, i) => (
          <div key={i} className="flex min-w-[240px] snap-center items-center justify-center rounded-3xl bg-card p-4">
            <img src={src} alt={`${config.family} view ${i + 1}`} className="max-h-64 w-full object-contain" loading="lazy" width={1024} height={1024} />
          </div>
        ))}
      </div>

      <div className="px-6">
        <p className="mt-3 text-base leading-relaxed text-foreground">Redeem for {totalPoints.toLocaleString()} Points.</p>
        <p className="mt-3 text-sm text-muted-foreground">Fully redeemable with your reward Points — no card needed.</p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 border-y border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-card-foreground">
          <Truck className="h-4 w-4" /> Free shipping
        </div>
        <span className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2 text-sm text-card-foreground">
          <Store className="h-4 w-4" /> Pick up in Riyadh
        </div>
      </div>

      <div className="px-6 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Model. <span className="text-muted-foreground">Which is best for you?</span>
        </h2>
        <div className="mt-5 flex w-full items-center justify-center rounded-3xl bg-card p-6">
          <img src={config.gallery[0]} alt={`${config.family} models`} className="max-h-72 w-full object-contain" loading="lazy" width={1024} height={768} />
        </div>
        <div className="mt-5 space-y-3">
          {config.models.map((m) => (
            <button
              key={m.id}
              onClick={() => setModel(m.id)}
              className={`flex w-full items-start justify-between gap-4 rounded-2xl border bg-[#F1EEEA] p-4 text-left ${
 selectedModel.id === m.id ?"border-primary ring-1 ring-primary":"border-transparent"
 }`}
            >
              <div>
                <p className="text-base font-semibold text-card-foreground">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.display}</p>
              </div>
              <p className="text-right text-xs font-semibold text-reward-gold">From {formatPoints(m.price)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Finish. <span className="text-muted-foreground">Pick your favourite.</span>
        </h2>
        <div className="mt-5 flex w-full items-center justify-center rounded-3xl bg-card p-6">
          <img src={selectedFinish.image} alt={`${config.family} finish`} className="max-h-80 w-full object-contain" loading="lazy" width={1024} height={1024} />
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          {config.finishes.map((f) => (
            <button
              key={f.id}
              onClick={() => setFinish(f.id)}
              aria-label={f.name}
              className={`h-7 w-7 rounded-full border-2 ${selectedFinish.id === f.id ? "border-primary" : "border-transparent"}`}
              style={{ backgroundColor: f.swatch }}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-sm text-muted-foreground">{selectedFinish.name}</p>
      </div>

      <div className="px-6 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Storage. <span className="text-muted-foreground">How much space do you need?</span>
        </h2>
        <div className="mt-5 space-y-3">
          {config.storages.map((s) => (
            <button
              key={s.id}
              onClick={() => setStorage(s.id)}
              className={`flex w-full items-center justify-between gap-4 rounded-2xl border bg-[#F1EEEA] p-5 text-left ${
 selectedStorage.id === s.id ?"border-primary ring-1 ring-primary":"border-transparent"
 }`}
            >
              <p className="text-lg font-semibold text-card-foreground">{s.label}</p>
              <p className="text-right text-xs font-semibold text-reward-gold">{formatPoints(selectedModel.price + s.add)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-[56px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">
              {selectedModel.name} · {selectedStorage.label} · {selectedFinish.name}
            </p>
            <p className="text-base font-bold text-reward-gold">{totalPoints.toLocaleString()} Points</p>
          </div>
          <button
            onClick={() => navigate(`/checkout/${config.id}`)}
            className="h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppleMacProduct;
