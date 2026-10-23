import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import fashionImg from "@/assets/fashion.jpg";
import fashion2Img from "@/assets/fashion2.jpg";
import gamingImg from "@/assets/gaming.jpg";
import shoesBagsImg from "@/assets/shoes-bags.jpg";
import hotelBeach from "@/assets/hotel-beach.jpg";
import hotelClassic from "@/assets/hotel-classic.jpg";
import hotelModern from "@/assets/hotel-modern.jpg";
import hotelDesert from "@/assets/hotel-desert.jpg";
import iphoneImg from "@/assets/iphone.jpg";
import headphonesImg from "@/assets/headphones.jpg";
import smartwatchImg from "@/assets/smartwatch.jpg";
import perfumeImg from "@/assets/perfume.jpg";

const sections = [
  {
    label: "Experiences",
    title: "Discover must-try activities",
    subtext: "Curated moments, wherever you find yourself.",
    link: "/experiences",
    items: [
      { name: "Fine Dining", image: fashion2Img, price: "Start From AED 5" },
      { name: "Maldives Diving", image: hotelBeach, price: "Start From AED 25" },
      { name: "Desert Safari", image: hotelDesert, price: "Start From AED 8" },
      { name: "City Tour", image: hotelModern, price: "Start From AED 3" },
    ],
  },
  {
    label: "Gift cards",
    title: "Must-have gift cards this season",
    subtext: "A refined selection of the season's favourites.",
    link: "/gift-cards?filter=fashion",
    items: [
      { name: "Aldo Mauritius", image: fashionImg, price: "Start From AED 1" },
      { name: "Charles & Keith", image: shoesBagsImg, price: "Start From AED 1" },
      { name: "Marks & Spencer", image: fashion2Img, price: "Start From AED 1" },
      { name: "H&M Mauritius", image: gamingImg, price: "Start From AED 1" },
    ],
  },
  {
    label: "Trending merchandise",
    title: "The latest, quietly considered",
    subtext: "Objects worth returning to.",
    link: "/merchandise",
    items: [
      { name: "Designer Perfumes", image: perfumeImg, price: "AED 45" },
      { name: "iPhone 16 Pro", image: iphoneImg, price: "AED 599" },
      { name: "Bose Headphones", image: headphonesImg, price: "AED 149" },
      { name: "Apple Watch S10", image: smartwatchImg, price: "AED 199" },
    ],
  },
  {
    label: "Trending in hotels",
    title: "Addresses of the moment",
    subtext: "Where the well-travelled are staying.",
    link: "/hotels",
    items: [
      { name: "The Ritz-Carlton, Dubai", image: hotelModern, price: "View options" },
      { name: "Four Seasons Istanbul", image: hotelClassic, price: "View options" },
      { name: "Raffles London", image: hotelDesert, price: "View options" },
      { name: "Mandarin Oriental", image: hotelBeach, price: "View options" },
    ],
  },
];

const TrendingSection = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-8">
      {sections.map((section) => (
        <section key={section.label} className="px-5 pt-8 pb-6">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#8A8A98]">{section.label}</p>
          <h2
            className="mt-2 text-[26px] leading-[1.15] text-foreground"
            style={{ fontWeight: 300, letterSpacing: "0.005em" }}
          >
            {section.title}
          </h2>
          <p className="mt-2 text-sm text-foreground/60">{section.subtext}</p>

          <div className="mt-8 flex gap-6 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
            {section.items.map((item) => (
              <article
                key={item.name}
                onClick={() => navigate(section.link)}
                className="group shrink-0 w-[268px] cursor-pointer bg-white border border-[#E8E8EE] rounded-md overflow-hidden flex flex-col"
              >
                <div className="h-40 w-full overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    width={512}
                    height={512}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#8A8A98]">
                    {section.label}
                  </div>
                  <h3
                    className="mt-5 text-[16px] leading-snug text-foreground"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, letterSpacing: "0.005em" }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="mt-3 text-[13px] leading-relaxed text-foreground/60"
                    style={{ fontWeight: 300 }}
                  >
                    {item.price}
                  </p>
                  <button
                    className="mt-6 inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] self-start border-b border-transparent group-hover:border-[#2B8CA8] transition-colors"
                    style={{ color: "#2B8CA8" }}
                  >
                    View
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default TrendingSection;
