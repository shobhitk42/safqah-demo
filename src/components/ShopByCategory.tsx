import SectionTitle from "@/components/SectionTitle";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import fashionImg from "@/assets/fashion.jpg";
import gamingImg from "@/assets/gaming.jpg";
import foodImg from "@/assets/food.jpg";
import jewelleryImg from "@/assets/jewellery.jpg";

const categories = [
  { name: "Gold & Jewellery", image: jewelleryImg, type: "In Merchandise", filter: "jewellery" },
  { name: "Fashion", image: fashionImg, type: "In Gift Cards", filter: "fashion" },
  { name: "Food", image: foodImg, type: "In Gift Cards", filter: "food" },
  { name: "Gaming", image: gamingImg, type: "In Gift Cards", filter: "gaming" },
];

const ShopByCategory = () => {
  const navigate = useNavigate();

  return (
    <section className="px-5 pb-8">
      <SectionTitle title="Categories of the season" subtitle="A considered selection across the house." />

      <div className="flex gap-6 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
        {categories.map((cat) => (
          <article
            key={cat.name}
            onClick={() => navigate(`/gift-cards?filter=${cat.filter}`)}
            className="group shrink-0 w-[268px] cursor-pointer bg-white rounded-md overflow-hidden flex flex-col"
          >
            <div className="h-40 w-full overflow-hidden bg-muted">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                width={512}
                height={512}
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#8A8A98]">
                {cat.type}
              </div>
              <h3
                className="mt-5 text-[16px] leading-snug text-foreground"
                style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 500, letterSpacing: "0.005em" }}
              >
                {cat.name}
              </h3>
              <button
                className="mt-6 inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] self-start border-b border-transparent group-hover:border-[#02AD4C] transition-colors"
                style={{ color: "#02AD4C" }}
              >
                Explore
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
