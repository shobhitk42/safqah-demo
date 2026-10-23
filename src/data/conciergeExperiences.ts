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
  price: string; // e.g. "10,000 pts"
  about: string;
  included: string[];
  image: string;
  ctaLabel?: string;
}

export const conciergeExperiences: Record<string, ConciergeExperience> = {
  "talabat-dining": {
    slug: "talabat-dining",
    title: "Talabat Dining Credit",
    location: "Saudi Arabia",
    duration: "Delivery & dine-in",
    rating: "4.8",
    reviews: "12,430",
    note: "10,000 pts Talabat credit for food delivery or dine-in across thousands of Saudi restaurants.",
    price: "10,000 pts",
    about:
      "Order from your favourite restaurants with 10,000 pts credit on Talabat. Works for delivery, pickup, or Talabat dine-in across Saudi Arabia. From shawarma to sushi — your next meal is on your points.",
    included: [
      "10,000 pts Talabat credit",
      "Delivery, pickup or dine-in",
      "Thousands of Saudi restaurants",
      "Instant voucher code",
    ],
    image: talabat,
    ctaLabel: "Redeem with points",
  },
  "vox-cinemas": {
    slug: "vox-cinemas",
    title: "VOX Cinemas Experience",
    location: "Saudi Arabia",
    duration: "GOLD class",
    rating: "4.9",
    reviews: "3,812",
    note: "Two GOLD cinema tickets at any VOX Cinemas location. Includes premium seating and F&B voucher.",
    price: "12,000 pts",
    about:
      "Enjoy a premium movie night with 2 GOLD class tickets at VOX Cinemas, valid at any location across Saudi Arabia. Includes access to the GOLD lounge and an 3,000 pts F&B voucher per ticket. Perfect for date night or a weekend treat.",
    included: [
      "2 × GOLD class tickets",
      "GOLD lounge access",
      "3,000 pts F&B voucher per ticket",
      "Any VOX Cinemas in Saudi Arabia",
    ],
    image: vox,
    ctaLabel: "Redeem with points",
  },
  "carrefour-grocery": {
    slug: "carrefour-grocery",
    title: "Carrefour Grocery Voucher",
    location: "Saudi Arabia",
    duration: "In-store & online",
    rating: "4.7",
    reviews: "9,214",
    note: "20,000 pts Carrefour voucher for groceries, electronics, and household items across Saudi Arabia.",
    price: "20,000 pts",
    about:
      "Stock up on essentials with an 20,000 pts Carrefour voucher, redeemable at any Carrefour Hypermarket, Market, or Express store in Saudi Arabia. Also valid for online orders via the MAF Carrefour app.",
    included: [
      "20,000 pts Carrefour voucher",
      "Hypermarket, Market & Express",
      "MAF Carrefour app compatible",
      "12-month validity",
    ],
    image: carrefour,
    ctaLabel: "Redeem with points",
  },
  "sharaf-dg": {
    slug: "sharaf-dg",
    title: "eXtra Electronics Voucher",
    location: "Saudi Arabia",
    duration: "In-store & online",
    rating: "4.8",
    reviews: "5,127",
    note: "Get an 20,000 pts eXtra gift card — perfect for gadgets, accessories, or home electronics.",
    price: "20,000 pts",
    about:
      "Treat yourself or send a gift to family back home. This 20,000 pts eXtra voucher is redeemable at any eXtra outlet across Saudi Arabia or online at sharafdg.com. Valid for 12 months from activation.",
    included: [
      "20,000 pts eXtra credit",
      "All Saudi outlets",
      "sharafdg.com online",
      "12-month validity",
    ],
    image: sharaf,
    ctaLabel: "Redeem with points",
  },
  "lulu-hypermarket": {
    slug: "lulu-hypermarket",
    title: "Lulu Hypermarket Gift Card",
    location: "Saudi Arabia",
    duration: "In-store & online",
    rating: "4.7",
    reviews: "7,340",
    note: "Shop groceries, household essentials, and more with an 15,000 pts Lulu gift card.",
    price: "15,000 pts",
    about:
      "From fresh groceries to electronics, Lulu Hypermarket has it all. This 15,000 pts gift card works at any Lulu Hypermarket, Lulu Express, or Lulu online store in Saudi Arabia.",
    included: [
      "15,000 pts Lulu gift card",
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
    location: "From Saudi Arabia",
    duration: "Flights",
    rating: "4.6",
    reviews: "2,918",
    note: "50,000 pts off your next flight booking on Cleartrip. Fly home or explore new destinations.",
    price: "50,000 pts",
    about:
      "Book your next flight with 50,000 pts off on Cleartrip. Whether you're heading home to see family or planning your next getaway, this voucher applies to any flight booked through Cleartrip for travel from Saudi Arabia. Valid for 6 months.",
    included: [
      "50,000 pts flight voucher",
      "Any Cleartrip flight booking",
      "Travel departing from Saudi Arabia",
      "6-month validity",
    ],
    image: cleartrip,
    ctaLabel: "Redeem with points",
  },
};

export const conciergeSlugByTitle: Record<string, string> = Object.fromEntries(
  Object.values(conciergeExperiences).map((e) => [e.title, e.slug]),
);
