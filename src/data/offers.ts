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

export type Offer = {
  slug: string;
  brand: string;
  headline: string;
  value: string;
  image: string;
  description: string;
};

export const offers: Offer[] = [
  {
    slug: "noon-cashback",
    brand: "noon.com",
    headline: "10% points back on next order",
    value: "10% points back up to 5,000 pts",
    image: offerNoon,
    description:
      "Shop on noon.com and earn 10% back in points (up to 5,000 pts) on your next purchase. Minimum spend 10,000 pts. Points credited to your Safqah Capital balance within 48 hours.",
  },
  {
    slug: "costa-bogo",
    brand: "Costa Coffee KSA",
    headline: "BOGO on handcrafted drinks",
    value: "Buy 1, get 1 free",
    image: offerCosta,
    description:
      "Enjoy a buy-one-get-one-free handcrafted beverage at any Costa Coffee outlet across Saudi Arabia. Show your Safqah Capital app QR code at the counter. One redemption per customer per day.",
  },
  {
    slug: "deliveroo-75",
    brand: "HungerStation KSA",
    headline: "7,500 pts off orders above 15,000 pts",
    value: "7,500 pts off",
    image: offerHungerStation,
    description:
      "Get 7,500 pts off your HungerStation order when you spend 15,000 pts or more. Apply the promo code from your Safqah Capital app at checkout. Valid for one use per customer.",
  },
  {
    slug: "carrefour-triple",
    brand: "Carrefour KSA",
    headline: "Triple points on Fri–Sat spend",
    value: "3x points weekends",
    image: offerCarrefour,
    description:
      "Earn 3x Safqah Capital points on every purchase at Carrefour when you pay with your Comera Visa card on Fridays and Saturdays throughout August. No minimum spend.",
  },
  {
    slug: "booking-100",
    brand: "Booking.com",
    headline: "10,000 pts off stays above 50,000 pts",
    value: "10,000 pts off stays",
    image: offerBooking,
    description:
      "Save 10,000 pts on your next hotel booking of 50,000 pts or more on Booking.com. Exclusive for Safqah Capital cardholders. Use the unique link from your Offers screen.",
  },
  {
    slug: "reel-cinemas-20",
    brand: "VOX Cinemas",
    headline: "20% off any ticket type",
    value: "20% off tickets",
    image: offerReel,
    description:
      "Get 20% off movie tickets at any VOX Cinemas location in Saudi Arabia. Applies to Standard, Premium, and Platinum screens. Show your Safqah Capital QR code at the box office.",
  },
  {
    slug: "namshi-25",
    brand: "Namshi",
    headline: "Flat 25% off fashion & footwear",
    value: "Flat 25% off",
    image: offerNamshi,
    description:
      "Get a flat 25% discount on fashion, footwear, and accessories on Namshi. Apply the exclusive Safqah Capital promo code at checkout. Valid on full-price items. Minimum order 20,000 pts.",
  },
  {
    slug: "aster-15",
    brand: "Nahdi Pharmacy",
    headline: "15% off health & wellness",
    value: "15% off wellness",
    image: offerAster,
    description:
      "Save 15% on vitamins, supplements, skincare, and personal care products at any Nahdi Pharmacy outlet in Saudi Arabia. Show your Safqah Capital app at checkout.",
  },
  {
    slug: "sharaf-50",
    brand: "eXtra",
    headline: "5,000 pts off purchases above 30,000 pts",
    value: "5,000 pts off",
    image: offerSharaf,
    description:
      "Get 5,000 pts off your next purchase of 30,000 pts or more at eXtra, in-store or online. Covers electronics, accessories, appliances, and more.",
  },
  {
    slug: "talabat-free-delivery",
    brand: "Talabat",
    headline: "Free delivery all week",
    value: "Free delivery x 7 days",
    image: offerTalabat,
    description:
      "Enjoy free delivery on all Talabat orders for an entire week after activation. No minimum order value. Activate from your Safqah Capital Offers screen.",
  },
  {
    slug: "saudia-10",
    brand: "Saudia",
    headline: "Up to 10% off Economy & Business",
    value: "Up to 10% off fares",
    image: offerEmirates,
    description:
      "Book flights on saudia.com and get up to 10% off Economy and Business class fares. Exclusive for Safqah Capital Platinum and Infinite cardholders.",
  },
  {
    slug: "lulu-b2g1",
    brand: "Lulu Hypermarket",
    headline: "Buy 2 Get 1 free on select items",
    value: "Buy 2 Get 1 Free",
    image: offerLulu,
    description:
      "Buy any 2 items and get 1 free across select product categories at Lulu Hypermarket. Valid on personal care, snacks, and household items. Show your Safqah Capital QR at checkout.",
  },
];

export const getOffer = (slug: string) => offers.find((o) => o.slug === slug);
