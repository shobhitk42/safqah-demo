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
import { appleProducts } from "@/data/appleProducts";
import { samsungProducts } from "@/data/samsungProducts";

const products = [
  { id: "chanel-no5", name: "Chanel No. 5 EDP", points: 4500, price: 45, image: perfumeImg },
  { id: "dior-sauvage", name: "Dior Sauvage EDT", points: 3800, price: 38, image: perfumeDiorImg },
  { id: "tom-ford-black", name: "Tom Ford Black Orchid", points: 5200, price: 52, image: perfumeTomfordImg },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", points: 45000, price: 450, image: iphoneImg },
  { id: "bose-headphones", name: "Bose QuietComfort Headphones", points: 12000, price: 120, image: headphonesImg },
  { id: "apple-watch-10", name: "Apple Watch Series 10", points: 18000, price: 180, image: smartwatchImg },
  { id: "samsung-tv", name: 'Samsung 50" UHD Smart TV', points: 25000, price: 250, image: televisionImg },
  { id: "acer-laptop", name: "Acer Aspire Laptop", points: 30000, price: 300, image: laptopImg },
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


const AVAILABLE_POINTS = 52400;

const Checkout = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { items: cartItems, totalPoints: cartPoints, totalPrice: cartPrice, clear: clearCart } = useCart();

  const isCart = productId === "cart";
  const singleProduct = products.find((p) => p.id === productId);

  const product = isCart
    ? cartItems.length > 0
      ? {
          id: "cart",
          name:
            cartItems.length === 1
              ? cartItems[0].name
              : `${cartItems.length} items in your cart`,
          points: cartPoints,
          price: cartPrice,
          image: cartItems[0].image,
        }
      : null
    : singleProduct;

  const [showSuccess, setShowSuccess] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background flex items-center justify-center">
        <p className="text-muted-foreground">
          {isCart ? "Your cart is empty" : "Product not found"}
        </p>
      </div>
    );
  }

  const pointsNeeded = product.points;
  const hasEnoughPoints = AVAILABLE_POINTS >= pointsNeeded;


  const handleConfirm = () => {
    setShowSuccess(true);
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
      <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-card p-3 border border-border">
        <img src={product.image} alt={product.name} className="h-14 w-14 rounded-lg object-cover" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-card-foreground truncate">{product.name}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs font-bold text-reward-gold">{product.points.toLocaleString()} pts</span>
          </div>
        </div>
      </div>

      {/* Points Balance */}
      <div className="mx-4 mb-5 rounded-xl safqah-banner p-4">
        <p className="text-xs text-primary-foreground/70">Your Available Points</p>
        <p className="text-2xl font-bold text-primary-foreground">{AVAILABLE_POINTS.toLocaleString()} pts</p>
      </div>

      {/* Order Summary */}
      <div className="mx-4 mb-6 rounded-2xl bg-card p-4 border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Order Summary</h3>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Points</span>
          <span className="font-semibold text-reward-gold">{pointsNeeded.toLocaleString()} pts</span>
        </div>
        {!hasEnoughPoints && (
          <p className="text-xs text-destructive font-medium">Insufficient points</p>
        )}
        <div className="border-t border-border pt-3 mt-2 flex justify-between">
          <span className="text-sm font-bold text-foreground">Total</span>
          <span className="text-sm font-bold text-reward-gold">{pointsNeeded.toLocaleString()} pts</span>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-[56px] left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border px-4 py-4 z-40">
        <button
          onClick={handleConfirm}
          disabled={!hasEnoughPoints}
          className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          Confirm Redemption
        </button>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-sm mx-auto rounded-2xl">
          <DialogHeader>
            <div className="flex justify-center mb-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <Check className="h-8 w-8 text-accent" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Redemption Successful!</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Your {product.name} has been ordered successfully.
            </p>
            <button
              onClick={() => { setShowSuccess(false); navigate("/orders"); }}
              className="w-full mt-4 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
            >
              View Orders
            </button>
            <button
              onClick={() => { setShowSuccess(false); navigate("/merchandise"); }}
              className="w-full rounded-xl border border-border py-3 text-sm font-medium text-foreground"
            >
              Continue Shopping
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
