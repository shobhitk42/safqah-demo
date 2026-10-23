import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
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
  { id: "chanel-no5", name: "Chanel No. 5 EDP", category: "Fragrances", points: "4,500", image: perfumeImg },
  { id: "dior-sauvage", name: "Dior Sauvage EDT", category: "Fragrances", points: "3,800", image: perfumeDiorImg },
  { id: "tom-ford-black", name: "Tom Ford Black Orchid", category: "Fragrances", points: "5,200", image: perfumeTomfordImg },
  { id: "creed-aventus", name: "Creed Aventus", category: "Fragrances", points: "9,800", image: perfumeImg },
  { id: "jo-malone-wood-sage", name: "Jo Malone Wood Sage & Sea Salt", category: "Fragrances", points: "6,400", image: perfumeDiorImg },
  { id: "byredo-gypsy-water", name: "Byredo Gypsy Water", category: "Fragrances", points: "7,900", image: perfumeTomfordImg },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", category: "Smartphones", points: "45,000", image: iphoneImg },
  { id: "bose-headphones", name: "Bose QuietComfort Headphones", category: "Audio", points: "12,000", image: headphonesImg },
  { id: "apple-watch-10", name: "Apple Watch Series 10", category: "Wearables", points: "18,000", image: smartwatchImg },
  { id: "samsung-tv", name: "Samsung 50\" UHD Smart TV", category: "Television", points: "25,000", image: televisionImg },
  { id: "acer-laptop", name: "Acer Aspire Laptop", category: "Laptop & Computer", points: "30,000", image: laptopImg },
  { id: "classic-timepiece", name: "Classic Timepiece", category: "Watches", points: "12,000", image: watchImg },
  { id: "leather-wallet", name: "Premium Leather Wallet", category: "Accessories", points: "3,500", image: walletImg },
  { id: "philips-coffee", name: "Philips Coffee Machine", category: "Kitchen Appliances", points: "8,500", image: kitchenImg },
];

const MerchandisePage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/loyalty")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Merchandise</h1>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search merchandise..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pb-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">All Products</h3>
        <div className="grid grid-cols-2 gap-3">
          {products.map((p) => (
            <div key={p.name} onClick={() => navigate(`/product/${p.id}`)} className="rounded-xl bg-card shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-105">
              <img src={p.image} alt={p.name} className="h-28 w-full object-cover" loading="lazy" width={512} height={512} />
              <div className="p-2.5">
                <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wide">{p.category}</span>
                <p className="text-xs font-semibold text-card-foreground leading-tight mt-0.5">{p.name}</p>
                <p className="text-xs font-bold text-reward-gold mt-1">{p.points} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchandisePage;
