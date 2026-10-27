// Real Xoxoday catalogue, written by `npm run fetch:catalog`.
// Each file is [] until the script succeeds; pages fall back to their mock data when empty.
import giftcards from "./giftcards.json";
import merchandise from "./merchandise.json";
import charity from "./charity.json";
import topup from "./topup.json";
import lounge from "./lounge.json";
import milesData from "./miles.json";

export type LiveProduct = {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  country: string;
  currency: string;
  valueType: "fixed_denomination" | "open_value";
  denominations: number[];
  min: number;
  max: number;
  points: number;
  pointsMax?: number;
  pointsOptions: number[];
  delivery: string;
  deliveryDays: string;
  terms: string;
  redemption: string;
  parentProductId: number | null;
  termsList?: string[];
  // lounge extras
  city?: string;
  airport?: string;
  terminal?: string;
  travelType?: string;
  hours?: string;
  facilities?: string[];
};

export const live = {
  giftcards: giftcards as unknown as LiveProduct[],
  merchandise: merchandise as unknown as LiveProduct[],
  charity: charity as unknown as LiveProduct[],
  topup: topup as unknown as LiveProduct[],
  lounge: lounge as unknown as LiveProduct[],
};

export const LIVE_PREFIX = "live-";
export const findLive = (key: keyof typeof live, id: string) =>
  live[key].find((p) => `${LIVE_PREFIX}${p.id}` === id);

// Storefront category ids (inferred from the products they contain) → app filter key + label
export const GIFT_CATEGORY: Record<string, { key: string; label: string }> = {
  "697": { key: "fashion", label: "Fashion & Lifestyle" },
  "701": { key: "jewellery", label: "Gold & Jewellery" },
  "700": { key: "home", label: "Home & Furniture" },
  "699": { key: "home", label: "Home & Appliances" },
  "702": { key: "travel", label: "Travel" },
  "711": { key: "travel", label: "Telecom & Travel" },
  "703": { key: "food", label: "Food & Dining" },
  "706": { key: "food", label: "Grocery" },
  "707": { key: "wellness", label: "Wellness & Services" },
  "990": { key: "wellness", label: "Auto & Services" },
  "708": { key: "kids", label: "Baby & Kids" },
  "1292": { key: "entertainment", label: "Entertainment" },
  "1234": { key: "entertainment", label: "Learning" },
};
const firstCategory = (ids: string) => GIFT_CATEGORY[ids.split(",")[0].trim()];
export const giftFilterKey = (ids: string) => firstCategory(ids)?.key ?? "fashion";
export const giftCategoryLabel = (ids: string) => firstCategory(ids)?.label ?? "Gift card";

// Miles Exchange: loyalty programs you can transfer points to. Each option is points → miles/points received.
export type MilesProgram = {
  id: number;
  name: string;
  program: string;
  category: "Airline" | "Retail" | "Hotel";
  image: string;
  unit: string;
  memberField: string;
  options: { points: number; miles: number }[];
  terms: string[];
};
export const liveMiles = milesData as MilesProgram[];
