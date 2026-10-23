import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import UserHeader from "@/components/UserHeader";
// import CategoryNav from "@/components/CategoryNav"; // replaced by CategoryGrid
import CategoryGrid from "@/components/CategoryGrid";
import HeroBanner from "@/components/HeroBanner";
import TierBanner from "@/components/TierBanner";
import ShopByCategory from "@/components/ShopByCategory";
import TrendingSection from "@/components/TrendingSection";
// import UserSwitcher from "@/components/UserSwitcher"; // hidden
import PickedForYou from "@/components/PickedForYou";


import GamificationSection from "@/components/GamificationSection";
import PlayAndWinSection from "@/components/PlayAndWinSection";
import PromoBanners from "@/components/PromoBanners";

import { useUser } from "@/contexts/UserContext";



const Index = () => {
  const { mode } = useUser();
  const navigate = useNavigate();

  return (
    <div className="mx-auto min-h-screen max-w-md bg-transparent pb-24">
      <div className="px-5 pt-5">
        <button onClick={() => navigate("/")} aria-label="Back to Deals" className="-ml-1 flex items-center gap-1 text-[14px] font-medium text-foreground">
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          Deals
        </button>
      </div>
      <UserHeader />
      {mode === "points" && <TierBanner />}
      {/* <UserSwitcher /> */}
      {/* <CategoryNav /> */}
      <CategoryGrid />
      <HeroBanner />
      
      
      <PickedForYou />
      <PromoBanners />
      {mode === "points" && <GamificationSection />}
      <PlayAndWinSection />
      <ShopByCategory />
      <TrendingSection />
      
    </div>
  );
};

export default Index;

