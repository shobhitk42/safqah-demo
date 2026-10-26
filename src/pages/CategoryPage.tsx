import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const titles: Record<string, string> = {
  "mobile-topup": "Mobile Top-up",
  "cashback": "Cashback",
  "charity": "Charity",
  "sports": "Sports",
  "play-win": "Play & Win",
  "car-rental": "Car Rental",
  "experiences": "Experiences",
  "lounge": "Airport Lounge",
};

const descriptions: Record<string, string> = {
  "mobile-topup": "Recharge your mobile using reward points. Select your operator and top-up amount.",
  "cashback": "Convert your reward points to cashback directly to your bank account.",
  "charity": "Donate your reward points to charitable organizations across Saudi Arabia.",
  "sports": "Redeem points for sports events, gym memberships, and fitness gear.",
  "play-win": "Try your luck! Use points to enter exciting contests and win prizes.",
  "car-rental": "Book rental cars across Saudi Arabia using your reward points.",
  "experiences": "Discover unique experiences — desert safaris, diving, spa retreats and more.",
  "lounge": "Access premium airport lounges worldwide with your reward points.",
};

const CategoryPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const title = titles[slug || ""] || "Category";
  const description = descriptions[slug || ""] || "Coming soon.";

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/loyalty")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>

      <div className="px-4 py-8">
        <div className="rounded-2xl bg-[#ECE8E3] p-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <h2 className="text-lg font-semibold text-card-foreground mb-2">{title}</h2>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <span className="inline-block rounded-full bg-reward-gold/20 px-3 py-1 text-xs font-medium text-reward-gold-foreground">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
