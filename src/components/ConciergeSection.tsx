import { ArrowRight, Star, Building2, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { conciergeSlugByTitle } from "@/data/conciergeExperiences";
import { useUser } from "@/contexts/UserContext";

type PersonaKey = "citySpender" | "growthPartner";

interface Offer {
  title: string;
  price: string;
  description: string;
}

const personas: Record<
  PersonaKey,
  { label: string; heading: string; subtext: string; offers: Offer[] }
> = {
  citySpender: {
    label: "The City Spender",
    heading: "Because you're a City Spender",
    subtext: "Everyday rewards for the way you live in the city",
    offers: [
      {
        title: "Talabat Dining Credit",
        price: "AED 100",
        description:
          "AED 100 Talabat credit for food delivery or dine-in across thousands of UAE restaurants.",
      },
      {
        title: "VOX Cinemas Experience",
        price: "AED 120",
        description:
          "Two GOLD cinema tickets at any VOX Cinemas location. Includes premium seating and F&B voucher.",
      },
      {
        title: "Carrefour Grocery Voucher",
        price: "AED 200",
        description:
          "AED 200 Carrefour voucher for groceries, electronics, and household items across UAE.",
      },
    ],
  },
  growthPartner: {
    label: "The Growth Partner",
    heading: "Because you're a Growth Partner",
    subtext:
      "Your store processed 1,240 transactions this month — you've earned bonus merchant points.",
    offers: [
      {
        title: "Business Analytics Dashboard Pro",
        price: "AED 300",
        description:
          "Unlock advanced sales insights, customer trends, and inventory analytics for your storefront.",
      },
      {
        title: "Premium POS Display Stand",
        price: "AED 180",
        description:
          "Sleek countertop POS display stand designed to elevate your customer checkout experience.",
      },
      {
        title: "Staff Training Voucher — Alison",
        price: "AED 250",
        description:
          "Certified training voucher for staff development across retail, hospitality, and service skills.",
      },
    ],
  },
};

const ConciergeSection = () => {
  const { role } = useUser();
  const active: PersonaKey = role === "merchant" ? "growthPartner" : "citySpender";
  const persona = personas[active];
  const navigate = useNavigate();
  const PersonaIcon = active === "citySpender" ? Building2 : Send;

  return (
    <section id="concierge-section" className="px-5 pt-8 pb-6 stagger-item stagger-5">
      {/* Heading */}
      <div className="flex items-center gap-2.5">
        <PersonaIcon className="h-4 w-4" strokeWidth={1.5} style={{ color: "#02AD4C" }} />
        <span
          className="text-[10px] uppercase"
          style={{ color: "#02AD4C", fontWeight: 600, letterSpacing: "0.05em" }}
        >
          Curated for you
        </span>
      </div>
      <h2
        className="mt-3 text-[26px] leading-[1.15] text-foreground"
        style={{ fontWeight: 300, letterSpacing: "0.005em" }}
      >
        {persona.heading}
      </h2>
      <p className="mt-2 text-sm text-foreground/60">{persona.subtext}</p>


      {/* Offer cards */}
      <div className="mt-8 flex gap-6 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
        {persona.offers.map((offer) => (
          <article
            key={offer.title}
            className="group shrink-0 w-[268px] bg-white border border-[#E8E8EE] rounded-[16px] p-6 flex flex-col"
          >
            {/* Price pill */}
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#8A8A98]">
              <span>Voucher</span>
              <span aria-hidden>·</span>
              <span style={{ color: "#02AD4C", fontWeight: 600 }}>{offer.price}</span>
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-1.5 text-[12px]">
              <Star
                className="h-3.5 w-3.5"
                strokeWidth={1.25}
                style={{ color: "#02AD4C", fill: "#02AD4C" }}
              />
              <span style={{ color: "#02AD4C", fontWeight: 500 }}>Popular</span>
              <span className="text-[#8A8A98]">reward</span>
            </div>

            {/* Title */}
            <h3
              className="mt-5 text-[16px] leading-snug text-foreground"
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.005em",
              }}
            >
              {offer.title}
            </h3>

            {/* Description */}
            <p
              className="mt-3 text-[13px] leading-relaxed text-foreground/60"
              style={{ fontWeight: 300 }}
            >
              {offer.description}
            </p>

            <button
              onClick={() => {
                const slug = conciergeSlugByTitle[offer.title];
                if (slug) navigate(`/concierge/${slug}`);
              }}
              className="mt-6 inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] self-start border-b border-transparent group-hover:border-[#02AD4C] transition-colors"
              style={{ color: "#02AD4C" }}
            >
              View reward
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ConciergeSection;
