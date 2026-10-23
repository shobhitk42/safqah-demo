import SectionTitle from "@/components/SectionTitle";
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
      { name: "Fine Dining", image: fashion2Img, price: "Start From 500 pts" },
      { name: "Maldives Diving", image: hotelBeach, price: "Start From 2,500 pts" },
      { name: "Desert Safari", image: hotelDesert, price: "Start From 800 pts" },
      { name: "City Tour", image: hotelModern, price: "Start From 300 pts" },
    ],
  },
  {
    label: "Gift cards",
    title: "Must-have gift cards this season",
    subtext: "A refined selection of the season's favourites.",
    link: "/gift-cards?filter=fashion",
    items: [
      { name: "Aldo KSA", image: fashionImg, price: "Start From 100 pts" },
      { name: "Charles & Keith", image: shoesBagsImg, price: "Start From 100 pts" },
      { name: "Marks & Spencer", image: fashion2Img, price: "Start From 100 pts" },
      { name: "H&M KSA", image: gamingImg, price: "Start From 100 pts" },
    ],
  },
  {
    label: "Trending merchandise",
    title: "The latest, quietly considered",
    subtext: "Objects worth returning to.",
    link: "/merchandise",
    items: [
      { name: "Designer Perfumes", image: perfumeImg, price: "4,500 pts" },
      { name: "iPhone 16 Pro", image: iphoneImg, price: "59,900 pts" },
      { name: "Bose Headphones", image: headphonesImg, price: "14,900 pts" },
      { name: "Apple Watch S10", image: smartwatchImg, price: "19,900 pts" },
    ],
  },
  {
    label: "Trending in hotels",
    title: "Addresses of the moment",
    subtext: "Where the well-travelled are staying.",
    link: "/hotels",
    items: [
      { name: "The Ritz-Carlton, Riyadh", image: hotelModern, price: "View options" },
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
        <section key={section.label} className="px-5 pb-8">
          <SectionTitle title={section.title} subtitle={section.subtext} />

          <div className="flex gap-6 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
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
                    style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 500, letterSpacing: "0.005em" }}
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
                    className="mt-6 inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] self-start border-b border-transparent group-hover:border-[#02AD4C] transition-colors"
                    style={{ color: "#02AD4C" }}
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
