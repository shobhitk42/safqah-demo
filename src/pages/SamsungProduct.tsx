import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, Cpu, Camera, BatteryCharging } from "lucide-react";
import { samsungProducts, formatPoints, toPoints } from "@/data/samsungProducts";

type Variant = { id: string; label: string; add: number };

const storageByCategory: Record<string, Variant[]> = {
  "Galaxy S": [
    { id: "256", label: "256 GB | 12 GB", add: 0 },
    { id: "512", label: "512 GB | 12 GB", add: 700 },
    { id: "1tb", label: "1 TB | 16 GB", add: 14000 },
  ],
  Foldables: [
    { id: "512", label: "512 GB | 12 GB", add: 0 },
    { id: "1tb", label: "1 TB | 16 GB", add: 1400 },
  ],
  Tablets: [
    { id: "256", label: "256 GB | Wi-Fi", add: 0 },
    { id: "512", label: "512 GB | Wi-Fi", add: 800 },
    { id: "512-5g", label: "512 GB | 5G", add: 13000 },
  ],
  Watches: [
    { id: "bt", label: "Bluetooth", add: 0 },
    { id: "lte", label: "Bluetooth + LTE", add: 400 },
  ],
  Audio: [{ id: "std", label: "Standard edition", add: 0 }],
  "TV & Laptops": [
    { id: "base", label: "Standard configuration", add: 0 },
    { id: "plus", label: "Upgraded configuration", add: 1300 },
  ],
  "Home Appliances": [
    { id: "9kg", label: "9 kg capacity", add: 0 },
    { id: "11kg", label: "11 kg capacity", add: 1000 },
  ],
};

const coloursByCategory: Record<string, { id: string; name: string; swatch: string }[]> = {
  "Galaxy S": [
    { id: "violet", name: "Titanium Violet", swatch: "hsl(275 45% 55%)" },
    { id: "silver", name: "Silver Shadow", swatch: "hsl(0 0% 78%)" },
    { id: "black", name: "Titanium Black", swatch: "hsl(0 0% 18%)" },
  ],
  Foldables: [
    { id: "purple", name: "Deep Purple", swatch: "hsl(280 45% 35%)" },
    { id: "mint", name: "Mint", swatch: "hsl(150 40% 70%)" },
  ],
  Tablets: [
    { id: "graphite", name: "Graphite", swatch: "hsl(220 8% 30%)" },
    { id: "beige", name: "Beige", swatch: "hsl(35 30% 78%)" },
  ],
  Watches: [
    { id: "titanium", name: "Titanium Grey", swatch: "hsl(220 6% 55%)" },
    { id: "black", name: "Graphite", swatch: "hsl(0 0% 22%)" },
  ],
  Audio: [
    { id: "white", name: "White", swatch: "hsl(0 0% 96%)" },
    { id: "black", name: "Black", swatch: "hsl(0 0% 15%)" },
  ],
  "TV & Laptops": [{ id: "silver", name: "Silver", swatch: "hsl(0 0% 80%)" }],
  "Home Appliances": [
    { id: "black", name: "Black Caviar", swatch: "hsl(0 0% 15%)" },
    { id: "white", name: "White", swatch: "hsl(0 0% 95%)" },
  ],
};

const featureIcons = [
  { icon: Cpu, label: "Galaxy AI" },
  { icon: Camera, label: "Pro camera" },
  { icon: BatteryCharging, label: "Fast charge" },
];

const SamsungProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = samsungProducts.find((p) => p.id === id);

  const storages = storageByCategory[product?.category ?? ""] ?? [{ id: "std", label: "Standard", add: 0 }];
  const colours = coloursByCategory[product?.category ?? ""] ?? [{ id: "black", name: "Black", swatch: "hsl(0 0% 15%)" }];

  const family = product ? samsungProducts.filter((p) => p.category === product.category) : [];
  const [device, setDevice] = useState(product?.id ?? "");
  const [storage, setStorage] = useState(storages[0].id);
  const [colour, setColour] = useState(colours[0].id);

  if (!product) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6 text-center">
        <div>
          <p className="text-lg font-semibold text-foreground">Product not found</p>
          <button onClick={() => navigate("/samsung-store")} className="mt-3 text-sm font-medium text-primary">
            Back to store
          </button>
        </div>
      </div>
    );
  }

  const selectedDevice = family.find((d) => d.id === device) ?? product;
  const selectedStorage = storages.find((s) => s.id === storage) ?? storages[0];
  const selectedColour = colours.find((c) => c.id === colour) ?? colours[0];
  const total = toPoints(selectedDevice.price + selectedStorage.add);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-muted/40 pb-40">
      <div className="sticky top-0 z-40 flex items-center justify-between bg-muted/80 px-4 py-3 backdrop-blur">
        <button onClick={() => navigate("/samsung-store")} className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <span className="text-sm font-bold uppercase tracking-[0.25em] text-foreground">Samsung</span>
        <button onClick={() => navigate("/cart")} aria-label="Cart">
          <ShoppingBag className="h-4 w-4 text-foreground" />
        </button>
      </div>

      <div className="px-6 pt-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Buy {product.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
      </div>

      <div className="mt-5 flex w-full items-center justify-center rounded-3xl bg-card p-6">
        <img src={selectedDevice.image} alt={selectedDevice.name} className="max-h-72 w-full object-contain mix-blend-multiply" width={1024} height={1024} />
      </div>

      <div className="mt-4 flex items-center justify-around rounded-3xl bg-card px-4 py-4">
        {featureIcons.map((f) => (
          <div key={f.label} className="flex flex-col items-center gap-1.5">
            <f.icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
            <span className="text-[11px] font-medium text-muted-foreground">{f.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 border-y border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-card-foreground">
          <Truck className="h-4 w-4" /> Free delivery
        </div>
        <span className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2 text-sm text-card-foreground">
          <ShieldCheck className="h-4 w-4" /> 2-year warranty
        </div>
      </div>

      <div className="px-6 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Device</h2>
        <p className="mt-1 text-sm text-muted-foreground">What&apos;s the best fit for you?</p>
        <div className="mt-4 space-y-3">
          {family.map((d) => (
            <button
              key={d.id}
              onClick={() => setDevice(d.id)}
              className={`flex w-full items-start justify-between gap-4 rounded-2xl border bg-card p-4 text-left ${
                selectedDevice.id === d.id ? "border-primary ring-1 ring-primary" : "border-border"
              }`}
            >
              <div>
                <p className="text-base font-semibold text-card-foreground">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.tagline}</p>
              </div>
              <p className="text-right text-xs font-semibold text-reward-gold">From {formatPoints(d.price)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Storage</h2>
        <p className="mt-1 text-sm text-muted-foreground">How much storage do you need?</p>
        <div className="mt-4 space-y-3">
          {storages.map((s) => (
            <button
              key={s.id}
              onClick={() => setStorage(s.id)}
              className={`flex w-full items-center justify-between gap-4 rounded-2xl border bg-card p-5 text-left ${
                selectedStorage.id === s.id ? "border-primary ring-1 ring-primary" : "border-border"
              }`}
            >
              <p className="text-lg font-semibold text-card-foreground">{s.label}</p>
              <p className="text-right text-xs font-semibold text-reward-gold">{formatPoints(selectedDevice.price + s.add)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Colour</h2>
        <p className="mt-1 text-sm text-muted-foreground">Pick the one you love.</p>
        <div className="mt-4 flex items-center gap-4">
          {colours.map((c) => (
            <button
              key={c.id}
              onClick={() => setColour(c.id)}
              aria-label={c.name}
              className={`h-8 w-8 rounded-full border-2 ${selectedColour.id === c.id ? "border-primary" : "border-transparent"}`}
              style={{ backgroundColor: c.swatch }}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{selectedColour.name}</p>
      </div>

      <div className="fixed bottom-[56px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">
              {selectedDevice.name} · {selectedStorage.label} · {selectedColour.name}
            </p>
            <p className="text-base font-bold text-reward-gold">{total.toLocaleString()} Points</p>
          </div>
          <button
            onClick={() => navigate(`/checkout/${selectedDevice.id}`)}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SamsungProduct;
