import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import perfumeImg from "@/assets/perfume.jpg";
import perfumeDiorImg from "@/assets/perfume-dior.jpg";
import perfumeTomfordImg from "@/assets/perfume-tomford.jpg";
import iphoneImg from "@/assets/iphone.jpg";
import headphonesImg from "@/assets/headphones.jpg";
import smartwatchImg from "@/assets/smartwatch.jpg";
import televisionImg from "@/assets/television.jpg";
import laptopImg from "@/assets/laptop.jpg";
import kitchenImg from "@/assets/kitchen-appliances.jpg";
import washingImg from "@/assets/washing-machine.jpg";
import watchImg from "@/assets/boost-watch.jpg";
import walletImg from "@/assets/boost-wallet.jpg";
import { appleProducts } from "@/data/appleProducts";
import { samsungProducts } from "@/data/samsungProducts";
import { findLive, LIVE_PREFIX } from "@/data/live";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import { makeReference } from "@/components/booking/hotelData";
import { useBookings } from "@/contexts/BookingsContext";
import { useUser } from "@/contexts/UserContext";
import PaymentStep from "@/components/booking/PaymentStep";
import { SAMPLE_RATE, STOREFRONT_RATE, cashOf, paidText, priceText, type PaymentResult } from "@/lib/pricing";

const products = [
  { id: "chanel-no5", name: "Chanel No. 5 EDP", points: 4500, price: 45, image: perfumeImg },
  { id: "dior-sauvage", name: "Dior Sauvage EDT", points: 3800, price: 38, image: perfumeDiorImg },
  { id: "tom-ford-black", name: "Tom Ford Black Orchid", points: 5200, price: 52, image: perfumeTomfordImg },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", points: 45000, price: 450, image: iphoneImg },
  { id: "bose-headphones", name: "Bose QuietComfort Headphones", points: 12000, price: 120, image: headphonesImg },
  { id: "apple-watch-10", name: "Apple Watch Series 10", points: 18000, price: 180, image: smartwatchImg },
  { id: "samsung-tv", name: 'Samsung 50" UHD Smart TV', points: 25000, price: 250, image: televisionImg },
  { id: "acer-laptop", name: "Acer Aspire Laptop", points: 30000, price: 300, image: laptopImg },
  { id: "creed-aventus", name: "Creed Aventus", points: 9800, price: 98, image: perfumeImg },
  { id: "jo-malone-wood-sage", name: "Jo Malone Wood Sage & Sea Salt", points: 6400, price: 64, image: perfumeDiorImg },
  { id: "byredo-gypsy-water", name: "Byredo Gypsy Water", points: 7900, price: 79, image: perfumeTomfordImg },
  { id: "classic-timepiece", name: "Classic Timepiece", points: 12000, price: 1200, image: watchImg },
  { id: "leather-wallet", name: "Premium Leather Wallet", points: 3500, price: 350, image: walletImg },
  { id: "philips-coffee", name: "Philips Coffee Machine", points: 8500, price: 85, image: kitchenImg },
  { id: "lg-washing", name: "LG Front Load Washing Machine", points: 15000, price: 150, image: washingImg },
  ...[...appleProducts, ...samsungProducts].map((p) => ({
    id: p.id,
    name: `${p.name} · ${p.tagline}`,
    points: p.price * 100,
    price: p.price,
    image: p.image,
  })),
];


const Checkout = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { items: cartItems, totalPoints: cartPoints, clear: clearCart } = useCart();

  const isCart = productId === "cart";
  const liveItem = findLive("merchandise", productId ?? "");
  const singleProduct =
    products.find((p) => p.id === productId) ??
    (liveItem && { id: productId ?? "", name: liveItem.name, points: liveItem.points, price: liveItem.points, image: liveItem.image });

  const product = isCart
    ? cartItems.length > 0
      ? {
          id: "cart",
          name:
            cartItems.length === 1
              ? cartItems[0].name
              : `${cartItems.length} items in your cart`,
          points: cartPoints,
          image: cartItems[0].image,
        }
      : null
    : singleProduct;

  const { addBooking } = useBookings();
  const { user } = useUser();
  const [reference, setReference] = useState("");
  const [placed, setPlaced] = useState<{ name: string; value: string } | null>(null);
  const [payment, setPayment] = useState<PaymentResult>({ mode: "points", pointsUsed: 0, cashPaid: 0 });

  if (reference && placed) {
    return (
      <BookingConfirmation
        noun="Order"
        heading="Order confirmed"
        reference={reference}
        payment={payment}
        balanceAfter={user.availablePoints - payment.pointsUsed}
        rows={[
          { label: "Item", value: placed.name },
          { label: "Order value", value: placed.value },
          { label: "Delivery", value: "Estimated 3–5 working days" },
        ]}
      />
    );
  }

  if (!product) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background flex items-center justify-center">
        <p className="text-muted-foreground">
          {isCart ? "Your cart is empty" : "Product not found"}
        </p>
      </div>
    );
  }

  const rate = isCart ? SAMPLE_RATE : liveItem && !products.some((p) => p.id === productId) ? STOREFRONT_RATE : SAMPLE_RATE;
  const totalCash = isCart
    ? cartItems.reduce((sum, i) => sum + cashOf(i.points * i.qty, i.id.startsWith(LIVE_PREFIX) ? STOREFRONT_RATE : SAMPLE_RATE), 0)
    : cashOf(product.points, rate);

  const handleConfirm = (result: PaymentResult) => {
    const ref = makeReference("ORD");
    addBooking({
      item: product.name,
      category: "Merchandise",
      points: result.pointsUsed,
      cashPaid: result.cashPaid,
      date: new Date().toLocaleDateString("en-GB"),
      status: "Processing",
      meta: ref,
    });
    setPayment(result);
    setReference(ref);
    setPlaced({ name: product.name, value: priceText(product.points, isCart ? totalCash / (product.points || 1) : rate) });
    if (isCart) clearCart();
  };

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-28">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Checkout</h1>
      </div>

      {/* Product Summary */}
      <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-[#ECE8E3] p-3">
        <img src={product.image} alt={product.name} className="h-14 w-14 rounded-lg object-cover" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-card-foreground truncate">{product.name}</p>
          <p className="mt-1 text-xs font-bold text-reward-gold">{priceText(product.points, isCart ? totalCash / (product.points || 1) : rate)}</p>
        </div>
      </div>

      <PaymentStep
        noun="order"
        totalPoints={product.points}
        totalCash={totalCash}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Checkout;
