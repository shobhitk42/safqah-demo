import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Truck, Store } from "lucide-react";
import { appleImages, formatPoints, toPoints } from "@/data/appleProducts";

const models = [
  { id: "pro", name: "iPhone 17 Pro", display: '15.9 cm (6.3") display', price: 4699 },
  { id: "pro-max", name: "iPhone 17 Pro Max", display: '17.4 cm (6.9") display', price: 5299 },
];

const finishes = [
  { id: "silver", name: "Silver", swatch: "hsl(0 0% 82%)", image: appleImages.iphone17White },
  { id: "orange", name: "Cosmic Orange", swatch: "hsl(24 90% 52%)", image: appleImages.iphone17Orange },
  { id: "black", name: "Black Titanium", swatch: "hsl(0 0% 18%)", image: appleImages.iphone16Black },
];

const storages = [
  { id: "256", label: "256GB", add: 0 },
  { id: "512", label: "512GB", add: 550 },
  { id: "1tb", label: "1TB", add: 1100 },
  { id: "2tb", label: "2TB", add: 2200 },
];

const AppleProduct = () => {
  const navigate = useNavigate();
  const [model, setModel] = useState(models[0].id);
  const [finish, setFinish] = useState(finishes[1].id);
  const [storage, setStorage] = useState(storages[0].id);

  const selectedModel = models.find((m) => m.id === model)!;
  const selectedStorage = storages.find((s) => s.id === storage)!;
  const total = selectedModel.price + selectedStorage.add;
  const totalPoints = toPoints(total);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-muted/40 pb-40">
      {/* Nav */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-muted/80 px-4 py-3 backdrop-blur">
        <button onClick={() => navigate("/apple-store")} className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <span className="text-sm font-semibold tracking-tight text-foreground"> Store</span>
        <button onClick={() => navigate("/cart")}>
          <ShoppingBag className="h-4 w-4 text-foreground" />
        </button>
      </div>

      {/* Title block */}
      <div className="px-6 pt-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Buy {selectedModel.name}</h1>
      </div>

      {/* Gallery */}
      <div className="mt-5 flex snap-x gap-4 overflow-x-auto px-6 pb-2 scrollbar-hide">
        {[appleImages.iphone17Orange, appleImages.iphone17Detail, appleImages.iphone17Design, appleImages.iphone17Box].map((src, i) => (
          <div key={i} className="flex min-w-[240px] snap-center items-center justify-center rounded-3xl bg-card p-4">
            <img src={src} alt={`iPhone 17 Pro view ${i + 1}`} className="max-h-64 w-full object-contain mix-blend-multiply" loading="lazy" width={1024} height={1024} />
          </div>
        ))}
      </div>

      <div className="px-6">
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Redeem for {totalPoints.toLocaleString()} Points.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Fully redeemable with your reward Points — no card needed.
        </p>
      </div>

      {/* Delivery strip */}
      <div className="mt-8 flex items-center justify-center gap-6 border-y border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-card-foreground">
          <Truck className="h-4 w-4" /> Free shipping
        </div>
        <span className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2 text-sm text-card-foreground">
          <Store className="h-4 w-4" /> Pick up in Dubai
        </div>
      </div>

      {/* Model */}
      <div className="px-6 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Model. <span className="text-muted-foreground">Which is best for you?</span>
        </h2>
        <div className="mt-5 flex w-full items-center justify-center rounded-3xl bg-card p-6">
          <img src={appleImages.iphone17Orange} alt="iPhone 17 Pro models" className="max-h-72 w-full object-contain mix-blend-multiply" loading="lazy" width={1024} height={768} />
        </div>
        <div className="mt-5 space-y-3">
          {models.map((m) => (
            <button
              key={m.id}
              onClick={() => setModel(m.id)}
              className={`flex w-full items-start justify-between gap-4 rounded-2xl border bg-card p-4 text-left ${
                model === m.id ? "border-primary ring-1 ring-primary" : "border-border"
              }`}
            >
              <div>
                <p className="text-base font-semibold text-card-foreground">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.display}</p>
              </div>
              <p className="text-right text-xs font-semibold text-reward-gold">
                From {formatPoints(m.price)}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Finish */}
      <div className="px-6 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Finish. <span className="text-muted-foreground">Pick your favourite.</span>
        </h2>
        <div className="mt-5 flex w-full items-center justify-center rounded-3xl bg-card p-6">
          <img
            src={finishes.find((f) => f.id === finish)?.image}
            alt="iPhone 17 Pro finish"
            className="max-h-80 w-full object-contain mix-blend-multiply"
            loading="lazy"
            width={1024}
            height={1024}
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          {finishes.map((f) => (
            <button
              key={f.id}
              onClick={() => setFinish(f.id)}
              aria-label={f.name}
              className={`h-7 w-7 rounded-full border-2 ${finish === f.id ? "border-primary" : "border-transparent"}`}
              style={{ backgroundColor: f.swatch }}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {finishes.find((f) => f.id === finish)?.name}
        </p>
      </div>

      {/* Storage */}
      <div className="px-6 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Storage. <span className="text-muted-foreground">How much space do you need?</span>
        </h2>
        <div className="mt-5 space-y-3">
          {storages.map((s) => {
            const price = selectedModel.price + s.add;
            return (
              <button
                key={s.id}
                onClick={() => setStorage(s.id)}
                className={`flex w-full items-center justify-between gap-4 rounded-2xl border bg-card p-5 text-left ${
                  storage === s.id ? "border-primary ring-1 ring-primary" : "border-border"
                }`}
              >
                <p className="text-lg font-semibold text-card-foreground">{s.label}</p>
                <p className="text-right text-xs font-semibold text-reward-gold">
                  {formatPoints(price)}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky summary */}
      <div className="fixed bottom-[56px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">
              {selectedModel.name} · {selectedStorage.label} · {finishes.find((f) => f.id === finish)?.name}
            </p>
            <p className="text-base font-bold text-reward-gold">
              {totalPoints.toLocaleString()} Points
            </p>
          </div>
          <button
            onClick={() => navigate("/checkout/iphone-17-pro")}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppleProduct;
