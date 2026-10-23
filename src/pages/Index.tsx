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

  return (
    <div className="mx-auto min-h-screen max-w-md bg-transparent pb-24">
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

