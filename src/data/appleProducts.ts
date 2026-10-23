import iphone17Orange from "@/assets/iphone-17-pro-2.png.asset.json";
import iphone17Detail from "@/assets/iphone-17-pro-3.png.asset.json";
import iphone17Design from "@/assets/iphone-17-pro-4.png.asset.json";
import iphone17Box from "@/assets/iphone-17-pro-5.png.asset.json";
import iphone17White from "@/assets/iphone-17-pro-white.jpg.asset.json";
import iphone16Black from "@/assets/iphone-16-pro-black.jpg.asset.json";
import iphone16Desert from "@/assets/iphone-16-pro-desert.jpg.asset.json";
import airpodsPro2 from "@/assets/airpods-pro-2.png.asset.json";
import airpods4 from "@/assets/airpods-4.webp.asset.json";
import airpods4Case from "@/assets/airpods-4-case.webp.asset.json";
import airpodsMax from "@/assets/airpods-max.webp.asset.json";
import ipadPro from "@/assets/ipad-pro.webp.asset.json";
import ipad10 from "@/assets/ipad-10th-gen.webp.asset.json";
import ipadPro13Silver from "@/assets/ipad-pro-13-silver.webp.asset.json";
import ipadPro11Black from "@/assets/ipad-pro-11-black.webp.asset.json";
import ipadAir from "@/assets/ipad-air.jpg.asset.json";
import ipadMini from "@/assets/ipad-mini.webp.asset.json";
import ipad10Yellow from "@/assets/ipad-10-yellow.webp.asset.json";
import imacBlue from "@/assets/imac-blue.webp.asset.json";
import macbookPro from "@/assets/macbook-pro.webp.asset.json";
import macStudio from "@/assets/mac-studio.webp.asset.json";
import macbookAir from "@/assets/macbook-air.webp.asset.json";
import macCatalog from "@/assets/apple-mac-catalog.jpg.asset.json";
import watchCatalog from "@/assets/apple-watch-catalog.jpg.asset.json";

export const appleImages = {
  iphone17Orange: iphone17Orange.url,
  iphone17Detail: iphone17Detail.url,
  iphone17Design: iphone17Design.url,
  iphone17Box: iphone17Box.url,
  iphone17White: iphone17White.url,
  iphone16Black: iphone16Black.url,
  iphone16Desert: iphone16Desert.url,
  airpodsPro2: airpodsPro2.url,
  airpods4: airpods4.url,
  airpods4Case: airpods4Case.url,
  airpodsMax: airpodsMax.url,
  ipadPro: ipadPro.url,
  ipad10: ipad10.url,
  ipadPro13Silver: ipadPro13Silver.url,
  ipadPro11Black: ipadPro11Black.url,
  ipadAir: ipadAir.url,
  ipadMini: ipadMini.url,
  ipad10Yellow: ipad10Yellow.url,
  imacBlue: imacBlue.url,
  macbookPro: macbookPro.url,
  macStudio: macStudio.url,
  macbookAir: macbookAir.url,
  mac: macCatalog.url,
  watch: watchCatalog.url,
};

export type AppleProductItem = {
  id: string;
  name: string;
  tagline: string;
  price: number; // AED
  image: string;
  category: "iPhone" | "Mac" | "iPad" | "AirPods";
};

export const appleProducts: AppleProductItem[] = [
  { id: "iphone-17-pro", name: "iPhone 17 Pro", tagline: "Cosmic Orange · 256GB", price: 4699, image: appleImages.iphone17Orange, category: "iPhone" },
  { id: "iphone-17-pro-white", name: "iPhone 17 Pro", tagline: "Silver · 256GB", price: 4699, image: appleImages.iphone17White, category: "iPhone" },
  { id: "iphone-16-pro-black", name: "iPhone 16 Pro", tagline: "Black Titanium · 128GB", price: 3999, image: appleImages.iphone16Black, category: "iPhone" },
  { id: "iphone-16-pro-desert", name: "iPhone 16 Pro", tagline: "Desert Titanium · 128GB", price: 3999, image: appleImages.iphone16Desert, category: "iPhone" },
  { id: "macbook-pro-14", name: "MacBook Pro 14\"", tagline: "M5 Pro · Space Black", price: 7999, image: appleImages.macbookPro, category: "Mac" },
  { id: "macbook-air-13", name: "MacBook Air 13\"", tagline: "M4 · Midnight", price: 4299, image: appleImages.macbookAir, category: "Mac" },
  { id: "imac-24", name: "iMac 24\"", tagline: "M4 · Blue", price: 5499, image: appleImages.imacBlue, category: "Mac" },
  { id: "mac-studio", name: "Mac Studio", tagline: "M4 Max · Silver", price: 8499, image: appleImages.macStudio, category: "Mac" },
  { id: "ipad-pro-13-silver", name: "iPad Pro 13\"", tagline: "M5 · Silver · Wi-Fi", price: 5199, image: appleImages.ipadPro13Silver, category: "iPad" },
  { id: "ipad-pro-11-black", name: "iPad Pro 11\"", tagline: "M5 · Space Black · Wi-Fi", price: 4199, image: appleImages.ipadPro11Black, category: "iPad" },
  { id: "ipad-air-11", name: "iPad Air 11\"", tagline: "M3 · Space Grey · Wi-Fi", price: 2599, image: appleImages.ipadAir, category: "iPad" },
  { id: "ipad-mini-7", name: "iPad mini", tagline: "8.3-inch · Space Grey · Wi-Fi", price: 2099, image: appleImages.ipadMini, category: "iPad" },
  { id: "ipad-10th-gen", name: "iPad (10th gen)", tagline: "10.9-inch · Yellow · Wi-Fi", price: 1599, image: appleImages.ipad10Yellow, category: "iPad" },
  { id: "airpods-pro-2", name: "AirPods Pro 2", tagline: "Active Noise Cancellation", price: 999, image: appleImages.airpodsPro2, category: "AirPods" },
  { id: "airpods-4", name: "AirPods 4", tagline: "Open-ear, all-day comfort", price: 549, image: appleImages.airpods4, category: "AirPods" },
  { id: "airpods-4-anc", name: "AirPods 4 with ANC", tagline: "Noise Cancellation case", price: 799, image: appleImages.airpods4Case, category: "AirPods" },
  { id: "airpods-max", name: "AirPods Max", tagline: "Sky Blue · USB-C", price: 2299, image: appleImages.airpodsMax, category: "AirPods" },
];

export const POINTS_PER_AED = 100;

export const toPoints = (aed: number) => Math.round(aed * POINTS_PER_AED);
export const formatPoints = (aed: number) => `${toPoints(aed).toLocaleString()} Points`;