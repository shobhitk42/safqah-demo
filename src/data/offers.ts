import offerNoon from "@/assets/offer-noon.jpg";
import offerCosta from "@/assets/offer-costa.jpg";
import offerHungerStation from "@/assets/offer-deliveroo.jpg";
import offerCarrefour from "@/assets/offer-carrefour.jpg";
import offerBooking from "@/assets/offer-booking.jpg";
import offerReel from "@/assets/offer-vox.jpg";
import offerNamshi from "@/assets/offer-namshi.jpg";
import offerAster from "@/assets/offer-aster.jpg";
import offerSharaf from "@/assets/offer-sharaf.jpg";
import offerTalabat from "@/assets/offer-talabat.jpg";
import offerEmirates from "@/assets/offer-emirates.jpg";
import offerLulu from "@/assets/offer-lulu.jpg";

import offerFnp from "@/assets/offer-fnp.jpg";
import offerBloomingdales from "@/assets/offer-bloomingdales.jpg";
import offerDrNutrition from "@/assets/offer-drnutrition.jpg";
import offerMumzworld from "@/assets/offer-mumzworld.jpg";
import offerReef from "@/assets/offer-reef.jpg";
import offerAlDaham from "@/assets/offer-aldaham.jpg";
import offerMagrabi from "@/assets/offer-magrabi.jpg";
import offerEyewa from "@/assets/offer-eyewa.jpg";
import offerHm from "@/assets/offer-hm.jpg";
import offerMothercare from "@/assets/offer-mothercare.jpg";
import offerNamshi2 from "@/assets/offer-namshi2.jpg";
import offerBodyShop from "@/assets/offer-bodyshop.jpg";
import offerAiralo from "@/assets/offer-airalo.jpg";
import offerDabdoob from "@/assets/offer-dabdoob.jpg";
import offerVogaCloset from "@/assets/offer-vogacloset.jpg";
import offer6thStreet from "@/assets/offer-6thstreet.jpg";
import offerAdidas from "@/assets/offer-adidas.jpg";
import offerNoonKsa from "@/assets/offer-noonksa.jpg";
import offerMamasPapas from "@/assets/offer-mamaspapas.jpg";
import offerSunSands from "@/assets/offer-sunsands.jpg";

import liveOfferData from "./live/offers.json";

export type Offer = {
  slug: string;
  cost: number;
  brand: string;
  headline: string;
  value: string;
  image: string;
  description: string;
  terms?: string[];
  howTo?: string[];
  validUntil?: string;
};

// Original sample offers, kept as a fallback
const mockOffers: Offer[] = [
  {
    slug: "noon-cashback",
    cost: 1200,
    brand: "noon.com",
    headline: "10% points back on next order",
    value: "10% points back up to 5,000 pts",
    image: offerNoon,
    description:
      "Shop on noon.com and earn 10% back in points (up to 5,000 pts) on your next purchase. Minimum spend 10,000 pts. Points credited to your Safqah Capital balance within 48 hours.",
  },
  {
    slug: "costa-bogo",
    cost: 1800,
    brand: "Costa Coffee KSA",
    headline: "BOGO on handcrafted drinks",
    value: "Buy 1, get 1 free",
    image: offerCosta,
    description:
      "Enjoy a buy-one-get-one-free handcrafted beverage at any Costa Coffee outlet across Saudi Arabia. Show your Safqah Capital app QR code at the counter. One redemption per customer per day.",
  },
  {
    slug: "deliveroo-75",
    cost: 2500,
    brand: "HungerStation KSA",
    headline: "7,500 pts off orders above 15,000 pts",
    value: "7,500 pts off",
    image: offerHungerStation,
    description:
      "Get 7,500 pts off your HungerStation order when you spend 15,000 pts or more. Apply the promo code from your Safqah Capital app at checkout. Valid for one use per customer.",
  },
  {
    slug: "carrefour-triple",
    cost: 3000,
    brand: "Carrefour KSA",
    headline: "Triple points on Fri–Sat spend",
    value: "3x points weekends",
    image: offerCarrefour,
    description:
      "Earn 3x Safqah Capital points on every purchase at Carrefour when you pay with your Safqah card on Fridays and Saturdays throughout August. No minimum spend.",
  },
  {
    slug: "booking-100",
    cost: 1500,
    brand: "Booking.com",
    headline: "10,000 pts off stays above 50,000 pts",
    value: "10,000 pts off stays",
    image: offerBooking,
    description:
      "Save 10,000 pts on your next hotel booking of 50,000 pts or more on Booking.com. Exclusive for Safqah Capital cardholders. Use the unique link from your Offers screen.",
  },
  {
    slug: "reel-cinemas-20",
    cost: 2200,
    brand: "VOX Cinemas",
    headline: "20% off any ticket type",
    value: "20% off tickets",
    image: offerReel,
    description:
      "Get 20% off movie tickets at any VOX Cinemas location in Saudi Arabia. Applies to Standard, Premium, and Platinum screens. Show your Safqah Capital QR code at the box office.",
  },
  {
    slug: "namshi-25",
    cost: 2800,
    brand: "Namshi",
    headline: "Flat 25% off fashion & footwear",
    value: "Flat 25% off",
    image: offerNamshi,
    description:
      "Get a flat 25% discount on fashion, footwear, and accessories on Namshi. Apply the exclusive Safqah Capital promo code at checkout. Valid on full-price items. Minimum order 20,000 pts.",
  },
  {
    slug: "aster-15",
    cost: 1600,
    brand: "Nahdi Pharmacy",
    headline: "15% off health & wellness",
    value: "15% off wellness",
    image: offerAster,
    description:
      "Save 15% on vitamins, supplements, skincare, and personal care products at any Nahdi Pharmacy outlet in Saudi Arabia. Show your Safqah Capital app at checkout.",
  },
  {
    slug: "sharaf-50",
    cost: 2000,
    brand: "eXtra",
    headline: "5,000 pts off purchases above 30,000 pts",
    value: "5,000 pts off",
    image: offerSharaf,
    description:
      "Get 5,000 pts off your next purchase of 30,000 pts or more at eXtra, in-store or online. Covers electronics, accessories, appliances, and more.",
  },
  {
    slug: "talabat-free-delivery",
    cost: 900,
    brand: "Talabat",
    headline: "Free delivery all week",
    value: "Free delivery x 7 days",
    image: offerTalabat,
    description:
      "Enjoy free delivery on all Talabat orders for an entire week after activation. No minimum order value. Activate from your Safqah Capital Offers screen.",
  },
  {
    slug: "saudia-10",
    cost: 4500,
    brand: "Saudia",
    headline: "Up to 10% off Economy & Business",
    value: "Up to 10% off fares",
    image: offerEmirates,
    description:
      "Book flights on saudia.com and get up to 10% off Economy and Business class fares. Exclusive for Safqah Capital Platinum and Infinite cardholders.",
  },
  {
    slug: "lulu-b2g1",
    cost: 1400,
    brand: "Lulu Hypermarket",
    headline: "Buy 2 Get 1 free on select items",
    value: "Buy 2 Get 1 Free",
    image: offerLulu,
    description:
      "Buy any 2 items and get 1 free across select product categories at Lulu Hypermarket. Valid on personal care, snacks, and household items. Show your Safqah Capital QR at checkout.",
  },
  {
    slug: "fnp-20",
    cost: 2600,
    brand: "FNP",
    headline: "20% off all products",
    value: "20% off sitewide",
    image: offerFnp,
    description:
      "Enjoy 20% off across the entire FNP catalogue — flowers, cakes, gifts and personalised hampers. Apply the Safqah Capital code at checkout. Valid for one use per customer.",
  },
  {
    slug: "bloomingdales-15",
    cost: 3800,
    brand: "Bloomingdale's",
    headline: "Up to 15% off luxury shopping",
    value: "Up to 15% off",
    image: offerBloomingdales,
    description:
      "Save up to 15% at Bloomingdale's on fashion, beauty and lifestyle. Redeem via the Safqah Capital Offers screen in-store or online.",
  },
  {
    slug: "drnutrition-5",
    cost: 1100,
    brand: "Dr Nutrition",
    headline: "Up to 5% off supplements",
    value: "Up to 5% off",
    image: offerDrNutrition,
    description:
      "Get up to 5% off protein, vitamins and wellness essentials at Dr Nutrition. Show your Safqah Capital app at any Saudi store or use the code online.",
  },
  {
    slug: "mumzworld-100",
    cost: 2400,
    brand: "Mumzworld",
    headline: "Up to 10,000 pts off baby essentials",
    value: "Up to 10,000 pts off",
    image: offerMumzworld,
    description:
      "Save up to 10,000 pts on Mumzworld across baby, toddler and mum essentials. Minimum spend applies. Apply the Safqah Capital promo at checkout.",
  },
  {
    slug: "reef-15",
    cost: 1300,
    brand: "Reef Perfumes",
    headline: "Up to 1,500 pts off fragrances",
    value: "Up to 1,500 pts off",
    image: offerReef,
    description:
      "Get up to 1,500 pts off signature oud and premium fragrances at Reef Perfumes. Show your Safqah Capital QR at any Reef store.",
  },
  {
    slug: "aldaham-20",
    cost: 1900,
    brand: "Al Daham",
    headline: "Up to 20% off gourmet dates",
    value: "Up to 20% off",
    image: offerAlDaham,
    description:
      "Save up to 20% on premium dates, sweets and Ramadan hampers at Al Daham. Redeem in-store or online with the Safqah Capital code.",
  },
  {
    slug: "magrabi-10",
    cost: 2100,
    brand: "Magrabi",
    headline: "Up to 10% off eyewear",
    value: "Up to 10% off",
    image: offerMagrabi,
    description:
      "Get up to 10% off designer frames, lenses and sunglasses at Magrabi. Show your Safqah Capital app at any store across the region.",
  },
  {
    slug: "eyewa-10",
    cost: 1700,
    brand: "Eyewa",
    headline: "Up to 10% off sunglasses & lenses",
    value: "Up to 10% off",
    image: offerEyewa,
    description:
      "Save up to 10% on prescription glasses, sunglasses and contact lenses on Eyewa. Apply the Safqah Capital code at online checkout.",
  },
  {
    slug: "hm-5",
    cost: 2300,
    brand: "H&M",
    headline: "Up to 5% off fashion",
    value: "Up to 5% off",
    image: offerHm,
    description:
      "Get up to 5% off womenswear, menswear and kids' collections at H&M. Show your Safqah Capital QR at checkout in-store or use the code online.",
  },
  {
    slug: "mothercare-5",
    cost: 1000,
    brand: "Mothercare",
    headline: "Up to 5% off baby & kids",
    value: "Up to 5% off",
    image: offerMothercare,
    description:
      "Save up to 5% at Mothercare on clothing, feeding, nursery and toys. Redeem the Safqah Capital offer in-app before checkout.",
  },
  {
    slug: "namshi-cashback",
    cost: 3200,
    brand: "Namshi",
    headline: "Up to 20% points back",
    value: "Up to 20% points back",
    image: offerNamshi2,
    description:
      "New Namshi customers earn 20% points back and existing customers earn 5% points back, capped at 5,000 pts. Points credited as Safqah Capital points within 48 hours.",
  },
  {
    slug: "bodyshop-10",
    cost: 1500,
    brand: "The Body Shop",
    headline: "Up to 10% off beauty & wellness",
    value: "Up to 10% off",
    image: offerBodyShop,
    description:
      "Save up to 10% on skincare, haircare and bath essentials at The Body Shop. Show your Safqah Capital QR at the till or use the code online.",
  },
  {
    slug: "airalo-10",
    cost: 1250,
    brand: "Airalo",
    headline: "Up to 10% off eSIM data plans",
    value: "Up to 10% off",
    image: offerAiralo,
    description:
      "Stay connected while travelling with up to 10% off Airalo eSIM data plans in 190+ countries. Apply the Safqah Capital code at checkout.",
  },
  {
    slug: "dabdoob-25",
    cost: 2750,
    brand: "Dabdoob",
    headline: "Up to 25% off toys & games",
    value: "Up to 25% off",
    image: offerDabdoob,
    description:
      "Get up to 25% off toys, games and hobby kits at Dabdoob. Apply the Safqah Capital promo code at online checkout.",
  },
  {
    slug: "vogacloset-30",
    cost: 3500,
    brand: "VogaCloset",
    headline: "Up to 30% off (70,000 pts/800+) · 4% in Egypt",
    value: "Up to 30% off",
    image: offerVogaCloset,
    description:
      "Up to 30% off on VogaCloset orders above 70,000 pts and 80,000 pts. In Egypt, get up to 4% off on your order. Apply the Safqah Capital code at checkout.",
  },
  {
    slug: "6thstreet-20",
    cost: 2900,
    brand: "6th Street",
    headline: "Up to 20% off fashion & footwear",
    value: "Up to 20% off",
    image: offer6thStreet,
    description:
      "Get up to 20% off across brands on 6th Street — sneakers, apparel and accessories. Apply the Safqah Capital promo at online checkout.",
  },
  {
    slug: "adidas-15",
    cost: 2000,
    brand: "Adidas",
    headline: "Up to 15% off sportswear",
    value: "Up to 15% off",
    image: offerAdidas,
    description:
      "Save up to 15% on Adidas footwear, apparel and accessories. Apply the exclusive Safqah Capital code at checkout on adidas.com.",
  },
  {
    slug: "noonksa-50",
    cost: 4000,
    brand: "Noon KSA",
    headline: "Up to 5,000 pts points back",
    value: "Up to 5,000 pts points back",
    image: offerNoonKsa,
    description:
      "Shop on Noon KSA and earn up to 5,000 pts points back. Points credited as Safqah Capital points within 48 hours of order confirmation.",
  },
  {
    slug: "mamaspapas-15",
    cost: 2600,
    brand: "Mamas & Papas",
    headline: "Up to 15% off baby & nursery",
    value: "Up to 15% off",
    image: offerMamasPapas,
    description:
      "Get up to 15% off strollers, nursery furniture and baby essentials at Mamas & Papas. Apply the Safqah Capital code at checkout.",
  },
  {
    slug: "sunsands-region",
    cost: 3400,
    brand: "Sun & Sand Sports",
    headline: "Up to 10,000 pts / 100,000 pts off",
    value: "Regional discount",
    image: offerSunSands,
    description:
      "Saudi Arabia & Kuwait: up to 10,000 pts off. KSA: up to 100,000 pts off across Sun & Sand Sports. Apply the Safqah Capital code at online checkout.",
  },
];

// Real storefront offers (src/data/live/offers.json); cost 0 means free to activate
const liveOffers = liveOfferData as Offer[];
export const offers: Offer[] = liveOffers.length ? liveOffers : mockOffers;

export const getOffer = (slug: string) => offers.find((o) => o.slug === slug);
