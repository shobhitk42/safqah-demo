import { useUser } from "@/contexts/UserContext";
import { ArrowRight } from "lucide-react";

const HeroBanner = () => {
  const { mode } = useUser();
  const scrollToConcierge = () => {
    document.getElementById("concierge-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const points = mode === "points";
  const eyebrow = points ? "Curated for you" : "Featured";
  const headline = points ? "Rewards, quietly considered." : "Benefits, quietly considered.";
  const body = points
    ? "A private collection of experiences, redeemable from 1,000 points."
    : "Zero-interest instalments across Platinum card partners.";
  const cta = points ? "Explore rewards" : "View benefits";

  return (
    <section className="mx-5 mb-8">
      <div
        className="relative overflow-hidden rounded-2xl px-6 py-7"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E8E8EE",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
          style={{ backgroundColor: "rgba(2, 173, 76, 0.08)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-14 -bottom-14 h-36 w-36 rounded-full"
          style={{ backgroundColor: "rgba(2, 173, 76, 0.04)" }}
        />

        <p
          className="relative text-[10px] uppercase"
          style={{ color: "#02AD4C", fontWeight: 600, letterSpacing: "0.28em" }}
        >
          {eyebrow}
        </p>
        <h2
          className="relative mt-4 text-[24px] leading-[1.2]"
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#302F2D",
            fontWeight: 600,
            letterSpacing: "-0.015em",
          }}
        >
          {headline}
        </h2>
        <p
          className="relative mt-3 max-w-[280px] text-[13px] leading-relaxed"
          style={{ color: "#6B6B7A", fontWeight: 400 }}
        >
          {body}
        </p>
        <button
          onClick={scrollToConcierge}
          className="relative mt-6 inline-flex items-center gap-2 text-[11px] uppercase"
          style={{
            color: "#02AD4C",
            fontWeight: 700,
            letterSpacing: "0.16em",
          }}
        >
          {cta}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
