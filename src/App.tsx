import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Flights from "./pages/Flights.tsx";
import Hotels from "./pages/Hotels.tsx";
import GiftCards from "./pages/GiftCards.tsx";
import GiftCardDetail from "./pages/GiftCardDetail.tsx";
import Merchandise from "./pages/Merchandise.tsx";
import PointsExchange from "./pages/PointsExchange.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import CarRental from "./pages/CarRental.tsx";
import Experiences from "./pages/Experiences.tsx";
import Lounge from "./pages/Lounge.tsx";
import Profile from "./pages/Profile.tsx";
import Cart from "./pages/Cart.tsx";
import Orders from "./pages/Orders.tsx";
import Rewards from "./pages/Rewards.tsx";
import SportsEvents from "./pages/SportsEvents.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import ExperienceDetail from "./pages/ExperienceDetail.tsx";
import ConciergeExperience from "./pages/ConciergeExperience.tsx";
import CheckoutPage from "./pages/Checkout.tsx";
import PlayAndWin from "./pages/PlayAndWin.tsx";
import Cashback from "./pages/Cashback.tsx";
import MobileTopup from "./pages/MobileTopup.tsx";
import Offers from "./pages/Offers.tsx";
import OfferDetail from "./pages/OfferDetail.tsx";

const queryClient = new QueryClient();

import { UserProvider } from "@/contexts/UserContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { BookingsProvider } from "@/contexts/BookingsContext";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <UserProvider>
    <CartProvider>
    <BookingsProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/gift-card/:slug" element={<GiftCardDetail />} />
          <Route path="/merchandise" element={<Merchandise />} />
          <Route path="/points-exchange" element={<PointsExchange />} />
          <Route path="/car-rental" element={<CarRental />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/lounge" element={<Lounge />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/achievements" element={<Rewards />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/offers/:slug" element={<OfferDetail />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sports-events" element={<SportsEvents />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
          <Route path="/concierge/:slug" element={<ConciergeExperience />} />
          <Route path="/checkout/:productId" element={<CheckoutPage />} />
          <Route path="/play-win" element={<PlayAndWin />} />
          <Route path="/cashback" element={<Cashback />} />
          <Route path="/mobile-topup" element={<MobileTopup />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
    </BookingsProvider>
    </CartProvider>
    </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
