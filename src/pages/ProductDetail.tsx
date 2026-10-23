import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Shield, Truck, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/sonner";
import perfumeImg from "@/assets/perfume.jpg";
import perfumeDiorImg from "@/assets/perfume-dior.jpg";
import perfumeTomfordImg from "@/assets/perfume-tomford.jpg";
import iphoneImg from "@/assets/iphone.jpg";
import headphonesImg from "@/assets/headphones.jpg";
import smartwatchImg from "@/assets/smartwatch.jpg";
import televisionImg from "@/assets/television.jpg";
import laptopImg from "@/assets/laptop.jpg";
import kitchenImg from "@/assets/kitchen-appliances.jpg";
import watchImg from "@/assets/boost-watch.jpg";
import walletImg from "@/assets/boost-wallet.jpg";

const products = [
  { id: "chanel-no5", name: "Chanel No. 5 EDP", category: "Fragrances", points: 4500, price: 45, image: perfumeImg, rating: 4.8, reviews: 124, description: "An iconic fragrance with a complex floral-aldehyde composition. A timeless symbol of femininity and elegance." },
  { id: "dior-sauvage", name: "Dior Sauvage EDT", category: "Fragrances", points: 3800, price: 38, image: perfumeDiorImg, rating: 4.7, reviews: 98, description: "A fresh and raw masculine fragrance inspired by wide-open spaces under a hot, blue sky." },
  { id: "tom-ford-black", name: "Tom Ford Black Orchid", category: "Fragrances", points: 5200, price: 52, image: perfumeTomfordImg, rating: 4.9, reviews: 87, description: "A luxurious and sensual fragrance of rich, dark accords and an alluring potion of black orchids." },
  { id: "creed-aventus", name: "Creed Aventus", category: "Fragrances", points: 9800, price: 98, image: perfumeImg, rating: 4.9, reviews: 212, description: "A sophisticated composition of blackcurrant, bergamot, pineapple and birch — the signature scent of visionaries." },
  { id: "jo-malone-wood-sage", name: "Jo Malone Wood Sage & Sea Salt", category: "Fragrances", points: 6400, price: 64, image: perfumeDiorImg, rating: 4.7, reviews: 156, description: "Escape the everyday along the windswept shore. Waves breaking, the air fresh with the tang of salt and spray." },
  { id: "byredo-gypsy-water", name: "Byredo Gypsy Water", category: "Fragrances", points: 7900, price: 79, image: perfumeTomfordImg, rating: 4.8, reviews: 143, description: "An idealisation of the Romani way of life — bergamot, lemon, pepper and juniper berries over a warm base of amber, vanilla and pine needles." },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", category: "Smartphones", points: 45000, price: 450, image: iphoneImg, rating: 4.9, reviews: 342, description: "The most advanced iPhone ever with A18 Pro chip, 48MP camera system, and titanium design." },
  { id: "bose-headphones", name: "Bose QuietComfort Headphones", category: "Audio", points: 12000, price: 120, image: headphonesImg, rating: 4.6, reviews: 215, description: "World-class noise cancellation with legendary comfort and signature Bose sound quality." },
  { id: "apple-watch-10", name: "Apple Watch Series 10", category: "Wearables", points: 18000, price: 180, image: smartwatchImg, rating: 4.8, reviews: 178, description: "The thinnest Apple Watch yet with advanced health features and a stunning always-on display." },
  { id: "samsung-tv", name: 'Samsung 50" UHD Smart TV', category: "Television", points: 25000, price: 250, image: televisionImg, rating: 4.5, reviews: 156, description: "Crystal UHD 4K resolution with smart TV features and a sleek, borderless design." },
  { id: "acer-laptop", name: "Acer Aspire Laptop", category: "Laptop & Computer", points: 30000, price: 300, image: laptopImg, rating: 4.4, reviews: 92, description: "Powerful performance for work and play with the latest Intel processor and long battery life." },
  { id: "classic-timepiece", name: "Classic Timepiece", category: "Watches", points: 12000, price: 1200, image: watchImg, rating: 4.7, reviews: 86, description: "A precision-engineered stainless steel timepiece with sapphire crystal and Swiss automatic movement." },
  { id: "leather-wallet", name: "Premium Leather Wallet", category: "Accessories", points: 3500, price: 350, image: walletImg, rating: 4.9, reviews: 212, description: "Full-grain leather bifold wallet with RFID protection and hand-stitched detailing." },
  { id: "philips-coffee", name: "Philips Coffee Machine", category: "Kitchen Appliances", points: 8500, price: 85, image: kitchenImg, rating: 4.7, reviews: 134, description: "Brew barista-quality coffee at home with one-touch operation and built-in grinder." },
];

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);
  const { addItem, count, items } = useCart();
  const inCart = !!product && items.some((i) => i.id === product.id);

  if (!product) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={() => navigate("/merchandise")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <button onClick={() => navigate("/cart")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border relative">
          <ShoppingCart className="h-4 w-4 text-foreground" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#02AD4C] px-1 text-[10px] font-semibold text-[#302F2D]">
              {count}
            </span>
          )}
        </button>
      </div>

      {/* Product Image with luxury frame */}
      <div className="px-4 mb-5">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-secondary via-card to-secondary shadow-lg">
          <img src={product.image} alt={product.name} className="w-full h-72 object-cover" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-card/95 text-primary shadow-sm">In Stock</span>
            <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-reward-gold/95 text-primary-foreground shadow-sm">Exclusive</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 mb-4">
        <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">{product.category}</span>
        <h1 className="text-2xl font-bold text-foreground mt-1 leading-tight">{product.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i <= Math.round(product.rating) ? "fill-reward-gold text-reward-gold" : "text-muted"}`} />
            ))}
            <span className="text-sm font-semibold text-foreground ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
        </div>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{product.description}</p>
      </div>

      {/* Premium Price Card */}
      <div className="mx-4 mb-4 rounded-2xl safqah-banner p-5 shadow-lg">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-[10px] text-primary-foreground/80 uppercase tracking-widest">Redeem with points</p>
            <p className="text-3xl font-bold text-primary-foreground mt-0.5">{product.points.toLocaleString()}</p>
            <p className="text-[10px] text-primary-foreground/80">reward points</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-primary-foreground/20 flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-reward-gold" />
          <p className="text-[11px] text-primary-foreground/95">Earn bonus points with Safqah Platinum</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="mx-4 mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-card p-3 border border-border text-center">
          <Truck className="h-4 w-4 text-primary mx-auto mb-1" />
          <p className="text-[10px] text-muted-foreground">Free Delivery</p>
        </div>
        <div className="rounded-xl bg-card p-3 border border-border text-center">
          <Shield className="h-4 w-4 text-primary mx-auto mb-1" />
          <p className="text-[10px] text-muted-foreground">2-Yr Warranty</p>
        </div>
        <div className="rounded-xl bg-card p-3 border border-border text-center">
          <Sparkles className="h-4 w-4 text-reward-gold mx-auto mb-1" />
          <p className="text-[10px] text-muted-foreground">Earn Points</p>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-[56px] left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border px-4 py-3 z-40 flex gap-2">
        <button
          onClick={() => {
            if (!product) return;
            if (inCart) {
              navigate("/cart");
              return;
            }
            addItem({
              id: product.id,
              name: product.name,
              image: product.image,
              points: product.points,
              price: product.price,
            });
            toast.success("Added to cart", { description: product.name, duration: 1800 });
          }}
          className="flex-1 h-12 rounded-[10px] border border-[#CFCBD0] bg-transparent px-5 text-[15px] font-semibold text-primary transition-colors hover:bg-primary/5"
        >
          {inCart ? "Go to Cart" : "Add to Cart"}
        </button>
        <button
          onClick={() => navigate(`/checkout/${product.id}`)}
          className="flex-1 h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
