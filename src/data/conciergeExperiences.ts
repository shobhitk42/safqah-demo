import talabat from "@/assets/offer-talabat.jpg";
import vox from "@/assets/offer-vox.jpg";
import carrefour from "@/assets/offer-carrefour.jpg";
import sharaf from "@/assets/offer-sharaf.jpg";
import lulu from "@/assets/offer-lulu.jpg";
import cleartrip from "@/assets/offer-cleartrip.jpg";

export interface ConciergeExperience {
  slug: string;
  title: string;
  location: string;
  duration: string;
  rating: string;
  reviews: string;
  note: string;
  price: string; // e.g. "AED 100"
  about: string;
  included: string[];
  image: string;
  ctaLabel?: string;
}

export const conciergeExperiences: Record<string, ConciergeExperience> = {
  "talabat-dining": {
    slug: "talabat-dining",
    title: "Talabat Dining Credit",
    location: "UAE",
    duration: "Delivery & dine-in",
    rating: "4.8",
    reviews: "12,430",
    note: "AED 100 Talabat credit for food delivery or dine-in across thousands of UAE restaurants.",
    price: "AED 100",
    about:
      "Order from your favourite restaurants with AED 100 credit on Talabat. Works for delivery, pickup, or Talabat dine-in across the UAE. From shawarma to sushi — your next meal is on your points.",
    included: [
      "AED 100 Talabat credit",
      "Delivery, pickup or dine-in",
      "Thousands of UAE restaurants",
      "Instant voucher code",
    ],
    image: talabat,
    ctaLabel: "Redeem with points",
  },
  "vox-cinemas": {
    slug: "vox-cinemas",
    title: "VOX Cinemas Experience",
    location: "UAE",
    duration: "GOLD class",
    rating: "4.9",
    reviews: "3,812",
    note: "Two GOLD cinema tickets at any VOX Cinemas location. Includes premium seating and F&B voucher.",
    price: "AED 120",
    about:
      "Enjoy a premium movie night with 2 GOLD class tickets at VOX Cinemas, valid at any location across the UAE. Includes access to the GOLD lounge and an AED 30 F&B voucher per ticket. Perfect for date night or a weekend treat.",
    included: [
      "2 × GOLD class tickets",
      "GOLD lounge access",
      "AED 30 F&B voucher per ticket",
      "Any VOX Cinemas in the UAE",
    ],
    image: vox,
    ctaLabel: "Redeem with points",
  },
  "carrefour-grocery": {
    slug: "carrefour-grocery",
    title: "Carrefour Grocery Voucher",
    location: "UAE",
    duration: "In-store & online",
    rating: "4.7",
    reviews: "9,214",
    note: "AED 200 Carrefour voucher for groceries, electronics, and household items across UAE.",
    price: "AED 200",
    about:
      "Stock up on essentials with an AED 200 Carrefour voucher, redeemable at any Carrefour Hypermarket, Market, or Express store in the UAE. Also valid for online orders via the MAF Carrefour app.",
    included: [
      "AED 200 Carrefour voucher",
      "Hypermarket, Market & Express",
      "MAF Carrefour app compatible",
      "12-month validity",
    ],
    image: carrefour,
    ctaLabel: "Redeem with points",
  },
  "sharaf-dg": {
    slug: "sharaf-dg",
    title: "Sharaf DG Electronics Voucher",
    location: "UAE",
    duration: "In-store & online",
    rating: "4.8",
    reviews: "5,127",
    note: "Get an AED 200 Sharaf DG gift card — perfect for gadgets, accessories, or home electronics.",
    price: "AED 200",
    about:
      "Treat yourself or send a gift to family back home. This AED 200 Sharaf DG voucher is redeemable at any Sharaf DG outlet across the UAE or online at sharafdg.com. Valid for 12 months from activation.",
    included: [
      "AED 200 Sharaf DG credit",
      "All UAE outlets",
      "sharafdg.com online",
      "12-month validity",
    ],
    image: sharaf,
    ctaLabel: "Redeem with points",
  },
  "lulu-hypermarket": {
    slug: "lulu-hypermarket",
    title: "Lulu Hypermarket Gift Card",
    location: "UAE",
    duration: "In-store & online",
    rating: "4.7",
    reviews: "7,340",
    note: "Shop groceries, household essentials, and more with an AED 150 Lulu gift card.",
    price: "AED 150",
    about:
      "From fresh groceries to electronics, Lulu Hypermarket has it all. This AED 150 gift card works at any Lulu Hypermarket, Lulu Express, or Lulu online store in the UAE.",
    included: [
      "AED 150 Lulu gift card",
      "Hypermarket & Express stores",
      "Online orders",
      "12-month validity",
    ],
    image: lulu,
    ctaLabel: "Redeem with points",
  },
  "cleartrip-flight": {
    slug: "cleartrip-flight",
    title: "Cleartrip Flight Voucher",
    location: "From UAE",
    duration: "Flights",
    rating: "4.6",
    reviews: "2,918",
    note: "AED 500 off your next flight booking on Cleartrip. Fly home or explore new destinations.",
    price: "AED 500",
    about:
      "Book your next flight with AED 500 off on Cleartrip. Whether you're heading home to see family or planning your next getaway, this voucher applies to any flight booked through Cleartrip for travel from the UAE. Valid for 6 months.",
    included: [
      "AED 500 flight voucher",
      "Any Cleartrip flight booking",
      "Travel departing from the UAE",
      "6-month validity",
    ],
    image: cleartrip,
    ctaLabel: "Redeem with points",
  },
};

export const conciergeSlugByTitle: Record<string, string> = Object.fromEntries(
  Object.values(conciergeExperiences).map((e) => [e.title, e.slug]),
);
