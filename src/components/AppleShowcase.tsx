import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import AppleLogo from "@/components/AppleLogo";
import { appleProducts, formatPoints } from "@/data/appleProducts";

const featured = [
  "iphone-17-pro",
  "macbook-air-13",
  "ipad-pro-13-silver",
  "airpods-pro-2",
];

const AppleShowcase = () => {
  const items = featured
    .map((id) => appleProducts.find((p) => p.id === id))
    .filter(Boolean) as typeof appleProducts;

  return (
    <div className="px-4 mb-6">
      <div className="flex items-center gap-2 mb-1">
        <AppleLogo className="h-3.5 w-3.5 text-primary" />
        <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
          Apple Store
        </p>
      </div>
      <div className="flex items-center justify-between mt-1 mb-3">
        <h3 className="text-base font-semibold text-foreground">Redeem Apple products</h3>
        <Link
          to="/apple-store"
          className="flex items-center gap-0.5 text-xs font-medium text-primary transition-transform hover:translate-x-0.5"
        >
          View all <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((p, i) => (
          <Link
            key={p.id}
            to={
              p.id === "iphone-17-pro"
                ? "/apple-store/iphone-17-pro"
                : p.category === "Mac"
                  ? `/apple-store/mac/${p.id}`
                  : `/checkout/${p.id}`
            }
            style={{ animationDelay: `${i * 70}ms` }}
            className="group animate-slide-up rounded-2xl border border-border bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-2 flex h-24 items-center justify-center overflow-hidden rounded-xl bg-white">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-xs font-semibold text-foreground leading-tight">{p.name}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-1">{p.tagline}</p>
            <p className="mt-1.5 text-xs font-bold text-primary">{formatPoints(p.price)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppleShowcase;
