import { Wifi, Waves, Utensils, Dumbbell, Sparkles, Car, Coffee, Plane } from "lucide-react";

export type HotelSummary = {
  name: string;
  image: string;
  price: number;
  rating: number;
  area?: string;
  tag?: string;
  // Real hotels (src/data/live/hotels.json) carry their own star class and amenities
  stars?: number;
  amenities?: string[];
  /** SAR per point; storefront hotels are 1, sample hotels use the default. */
  rate?: number;
};

export const AMENITIES = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Waves, label: "Swimming pool" },
  { icon: Utensils, label: "Restaurants" },
  { icon: Coffee, label: "Breakfast included" },
  { icon: Dumbbell, label: "Fitness centre" },
  { icon: Sparkles, label: "Spa & wellness" },
  { icon: Car, label: "Valet parking" },
  { icon: Plane, label: "Airport transfer" },
];

export const ROOMS = [
  { id: "deluxe", name: "Deluxe King Room", detail: "1 king bed · 38 m² · City view", mult: 1 },
  { id: "executive", name: "Executive Suite", detail: "1 king bed · 62 m² · Lounge access", mult: 1.45 },
  { id: "royal", name: "Royal Suite", detail: "2 bedrooms · 110 m² · Private butler", mult: 2.4 },
];

export const roomPrice = (base: number, mult: number) => Math.round((base * mult) / 100) * 100;

export const describeHotel = (h: HotelSummary) =>
  h.amenities
    ? `${h.name}${h.area ? ` is located in ${h.area}` : ""}${h.stars ? ` and is a ${h.stars}-star property` : ""}. Final room options and rates are confirmed when you book.`
    : `${h.name} offers a refined stay${h.area ? ` in ${h.area}` : ""}, with elegant rooms, award-winning dining and attentive service. Unwind by the pool, recharge at the spa or explore the surroundings with the concierge team on hand to help.`;

/** Parses dd/mm/yyyy into a Date. */
export const parseDMY = (v: string) => {
  const [d, m, y] = v.split("/").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
};

export const nightsBetween = (inV: string, outV: string) =>
  Math.max(1, Math.round((parseDMY(outV).getTime() - parseDMY(inV).getTime()) / 86400000));

export const makeReference = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
