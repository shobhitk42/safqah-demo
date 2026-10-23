import offerNoon from "@/assets/offer-noon.jpg";
import offerCosta from "@/assets/offer-costa.jpg";
import offerDeliveroo from "@/assets/offer-deliveroo.jpg";
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
    headline: "10% Cashback on next order",
    value: "10% cashback up to AED 50",
    image: offerNoon,
    description:
      "Shop on noon.com and earn 10% cashback (up to AED 50) on your next purchase. Minimum spend AED 100. Cashback credited as Safqah Capital points within 48 hours.",
  },
  {
    slug: "costa-bogo",
    brand: "Costa Coffee UAE",
    headline: "BOGO on handcrafted drinks",
    value: "Buy 1, get 1 free",
    image: offerCosta,
    description:
      "Enjoy a buy-one-get-one-free handcrafted beverage at any Costa Coffee outlet across the UAE. Show your Safqah Capital app QR code at the counter. One redemption per customer per day.",
  },
  {
    slug: "deliveroo-75",
    brand: "Deliveroo UAE",
    headline: "AED 75 off orders above AED 150",
    value: "AED 75 off",
    image: offerDeliveroo,
    description:
      "Get AED 75 off your Deliveroo order when you spend AED 150 or more. Apply the promo code from your Safqah Capital app at checkout. Valid for one use per customer.",
  },
  {
    slug: "carrefour-triple",
    brand: "Carrefour UAE",
    headline: "Triple points on Fri–Sat spend",
    value: "3x points weekends",
    image: offerCarrefour,
    description:
      "Earn 3x Safqah Capital points on every purchase at Carrefour when you pay with your Comera Visa card on Fridays and Saturdays throughout August. No minimum spend.",
  },
  {
    slug: "booking-100",
    brand: "Booking.com",
    headline: "AED 100 off stays above AED 500",
    value: "AED 100 off stays",
    image: offerBooking,
    description:
      "Save AED 100 on your next hotel booking of AED 500 or more on Booking.com. Exclusive for Safqah Capital cardholders. Use the unique link from your Offers screen.",
  },
  {
    slug: "reel-cinemas-20",
    brand: "Reel Cinemas",
    headline: "20% off any ticket type",
    value: "20% off tickets",
    image: offerReel,
    description:
      "Get 20% off movie tickets at any Reel Cinemas location in the UAE. Applies to Standard, Premium, and Platinum screens. Show your Safqah Capital QR code at the box office.",
  },
  {
    slug: "namshi-25",
    brand: "Namshi",
    headline: "Flat 25% off fashion & footwear",
    value: "Flat 25% off",
    image: offerNamshi,
    description:
      "Get a flat 25% discount on fashion, footwear, and accessories on Namshi. Apply the exclusive Safqah Capital promo code at checkout. Valid on full-price items. Minimum order AED 200.",
  },
  {
    slug: "aster-15",
    brand: "Aster Pharmacy",
    headline: "15% off health & wellness",
    value: "15% off wellness",
    image: offerAster,
    description:
      "Save 15% on vitamins, supplements, skincare, and personal care products at any Aster Pharmacy outlet in the UAE. Show your Safqah Capital app at checkout.",
  },
  {
    slug: "sharaf-50",
    brand: "Sharaf DG",
    headline: "AED 50 off purchases above AED 300",
    value: "AED 50 off",
    image: offerSharaf,
    description:
      "Get AED 50 off your next purchase of AED 300 or more at Sharaf DG, in-store or online. Covers electronics, accessories, appliances, and more.",
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
    slug: "emirates-10",
    brand: "Emirates",
    headline: "Up to 10% off Economy & Business",
    value: "Up to 10% off fares",
    image: offerEmirates,
    description:
      "Book flights on emirates.com and get up to 10% off Economy and Business class fares. Exclusive for Safqah Capital Platinum and Infinite cardholders.",
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
