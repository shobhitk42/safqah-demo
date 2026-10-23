import { useUser } from "@/contexts/UserContext";
import { Sparkles } from "lucide-react";
import Banner from "@/components/Banner";

const HeroBanner = () => {
  const { mode } = useUser();
  const scrollToConcierge = () => {
    document.getElementById("concierge-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const points = mode === "points";
  const headline = points ? "Rewards, quietly considered." : "Benefits, quietly considered.";
  const body = points
    ? "A private collection of experiences, redeemable from 1,000 points."
    : "Zero-interest instalments across Platinum card partners.";
  const cta = points ? "Explore rewards" : "View benefits";

  return (
    <section className="mx-5 mb-8">
      <Banner title={headline} subtitle={body} cta={cta} onClick={scrollToConcierge} icon={Sparkles} className="py-7" />
    </section>
  );
};

export default HeroBanner;
