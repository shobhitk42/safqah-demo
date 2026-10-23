import s26Ultra from "@/assets/sam-9.png.asset.json";
import s26Plus from "@/assets/samsung-s26-plus.jpg.asset.json";
import zFoldHero from "@/assets/samsung-zfold-hero.png";
import zFlip from "@/assets/samsung-zflip.jpg.asset.json";
import watch from "@/assets/sam-13.png.asset.json";
import buds from "@/assets/sam-14.png.asset.json";
import tv from "@/assets/sam-10.png.asset.json";
import tvFrame from "@/assets/sam-16.png.asset.json";
import book from "@/assets/sam-12.png.asset.json";
import washer from "@/assets/sam-11.png.asset.json";
import tab from "@/assets/samsung-tab.jpg.asset.json";

export const samsungImages = {
  s26Ultra: s26Ultra.url,
  s26Plus: s26Plus.url,
  zFold: zFoldHero,
  zFlip: zFlip.url,
  watch: watch.url,
  buds: buds.url,
  tv: tv.url,
  tvFrame: tvFrame.url,
  book: book.url,
  tab: tab.url,
  washer: washer.url,
};

export type SamsungCategory = "Galaxy S" | "Foldables" | "Tablets" | "Watches" | "Audio" | "TV & Laptops" | "Home Appliances";

export type SamsungProductItem = {
  id: string;
  name: string;
  tagline: string;
  price: number; // SAR
  image: string;
  category: SamsungCategory;
};

export const samsungProducts: SamsungProductItem[] = [
  { id: "galaxy-s26-ultra", name: "Galaxy S26 Ultra", tagline: "Titanium Violet · 256GB", price: 5399, image: samsungImages.s26Ultra, category: "Galaxy S" },
  { id: "galaxy-s26-plus", name: "Galaxy S26+", tagline: "Silver Shadow · 256GB", price: 4299, image: samsungImages.s26Plus, category: "Galaxy S" },
  { id: "galaxy-s26", name: "Galaxy S26", tagline: "Silver Shadow · 128GB", price: 3399, image: samsungImages.s26Plus, category: "Galaxy S" },
  { id: "galaxy-z-fold8", name: "Galaxy Z Fold8", tagline: "Deep Purple · 512GB", price: 7499, image: samsungImages.zFold, category: "Foldables" },
  { id: "galaxy-z-fold8-ultra", name: "Galaxy Z Fold8 Ultra", tagline: "Deep Purple · 1TB", price: 8999, image: samsungImages.zFold, category: "Foldables" },
  { id: "galaxy-z-flip8", name: "Galaxy Z Flip8", tagline: "Mint · 256GB", price: 4199, image: samsungImages.zFlip, category: "Foldables" },
  { id: "galaxy-tab-s11-ultra", name: "Galaxy Tab S11 Ultra", tagline: "Graphite · Wi-Fi · S Pen", price: 5299, image: samsungImages.tab, category: "Tablets" },
  { id: "galaxy-tab-s11", name: "Galaxy Tab S11", tagline: "Graphite · Wi-Fi · 256GB", price: 3399, image: samsungImages.tab, category: "Tablets" },
  { id: "galaxy-watch-ultra2", name: "Galaxy Watch Ultra2", tagline: "Titanium · 47mm", price: 2599, image: samsungImages.watch, category: "Watches" },
  { id: "galaxy-watch8", name: "Galaxy Watch8", tagline: "Graphite · 44mm", price: 1299, image: samsungImages.watch, category: "Watches" },
  { id: "galaxy-buds4-pro", name: "Galaxy Buds4 Pro", tagline: "Adaptive ANC · White", price: 899, image: samsungImages.buds, category: "Audio" },
  { id: "galaxy-buds4", name: "Galaxy Buds4", tagline: "All-day comfort · White", price: 549, image: samsungImages.buds, category: "Audio" },
  { id: "neo-qled-65", name: "Neo QLED 4K 65\"", tagline: "Vision AI · 2026", price: 6499, image: samsungImages.tv, category: "TV & Laptops" },
  { id: "the-frame-55", name: "The Frame 55\"", tagline: "Art Mode · Matte Display", price: 4999, image: samsungImages.tvFrame, category: "TV & Laptops" },
  { id: "galaxy-book6-pro", name: "Galaxy Book6 Pro", tagline: "14\" · Silver · 512GB", price: 5999, image: samsungImages.book, category: "TV & Laptops" },
  { id: "bespoke-ai-washer", name: "Bespoke AI Washer 9kg", tagline: "EcoBubble · Black Caviar", price: 2999, image: samsungImages.washer, category: "Home Appliances" },
  { id: "bespoke-ai-washer-dryer", name: "Bespoke AI Washer Dryer", tagline: "9/6kg · Black Caviar", price: 4299, image: samsungImages.washer, category: "Home Appliances" },
];

export const POINTS_PER_AED = 100;
export const toPoints = (aed: number) => Math.round(aed * POINTS_PER_AED);
export const formatPoints = (aed: number) => `${toPoints(aed).toLocaleString()} Points`;
