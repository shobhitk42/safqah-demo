import React, { createContext, useContext, useState, ReactNode } from "react";
import ritzDubai from "@/assets/exp-ritz-dubai.jpg";
import maldivesImg from "@/assets/exp-maldives.jpg";
import loungeImg from "@/assets/exp-lounge.jpg";
import esportsImg from "@/assets/exp-esports.jpg";
import vrImg from "@/assets/exp-vr.jpg";
import concertImg from "@/assets/exp-concert.jpg";
import diningImg from "@/assets/exp-dining.jpg";

export interface UserBadge {
  id: string;
  name: string;
  icon: string;
  earned: boolean;
  description: string;
}

export interface Milestone {
  id: string;
  label: string;
  target: number;
  current: number;
  reward: string;
  role: "consumer" | "merchant";
  /** Optional unit shown after the progress numbers, e.g. "SAR" for investment goals. */
  unit?: string;
}

export interface RecommendedProduct {
  id: string;
  name: string;
  category: string;
  points: string;
  image: string;
  tag?: string;
}

export interface Wallet {
  redeemable: number;
  pending: number;
}

export interface UserProfile {
  name: string;
  tier: "Silver" | "Classic" | "Platinum" | "Diamond";
  totalPoints: number;
  availablePoints: number;
  interests: string[];
  badges: UserBadge[];
  milestones: Milestone[];
  pickedForYou: RecommendedProduct[];
  wallets: {
    consumer: Wallet;
    merchant: Wallet;
  };
}

const ahmedProfile: UserProfile = {
  name: "Ahmed Al Rashid",
  tier: "Platinum",
  totalPoints: 22400,
  availablePoints: 61415,
  interests: ["tech", "gaming", "gadgets"],
  wallets: {
    consumer: { redeemable: 61415, pending: 2150 },
    merchant: { redeemable: 5600, pending: 3400 },
  },
  badges: [
    { id: "tech-savvy", name: "Pioneer", icon: "📱", earned: true, description: "Redeemed 3 gadgets" },
    { id: "early-bird", name: "First Light", icon: "🐦", earned: true, description: "First purchase within 7 days" },
    { id: "streak", name: "Constant", icon: "🔥", earned: true, description: "7-day login streak" },
    { id: "big-spender", name: "Connoisseur", icon: "💎", earned: false, description: "Redeem 50,000+ pts" },
    { id: "connector", name: "Connector", icon: "🌐", earned: false, description: "Send remittances to 3 different countries" },
    { id: "anchor", name: "Anchor", icon: "⚓", earned: false, description: "Pay 6 consecutive monthly bills on time" },
  ],
  milestones: [
    { id: "m1", label: "Verify your account on Absher", target: 3, current: 1, reward: "🎁 5,000 Bonus Points", role: "consumer" },
    { id: "m2", label: "Complete your investment account information", target: 4, current: 1, reward: "✈️ Complimentary Airport Lounge Pass", role: "consumer" },
    { id: "m5", label: "Make your first investment of SAR 5,000", target: 5000, current: 0, unit: "SAR", reward: "🎁 10,000 Bonus Points", role: "consumer" },
    { id: "m6", label: "Verify your email address", target: 1, current: 0, reward: "🎁 2,000 Bonus Points", role: "consumer" },
    { id: "m7", label: "Invest SAR 25,000 in total", target: 25000, current: 0, unit: "SAR", reward: "🎁 30,000 Bonus Points", role: "consumer" },
    { id: "m8", label: "Invest in 3 different deals", target: 3, current: 0, reward: "💎 Fast-track towards Diamond tier", role: "consumer" },
    { id: "m3", label: "Process 2,000,000 pts in sales through Safqah Capital", target: 20000, current: 14500, reward: "🎁 8,000 Bonus Points", role: "merchant" },
    { id: "m4", label: "Onboard 10 customers via Safqah Capital", target: 10, current: 6, reward: "🏷️ Merchant Fee Waiver", role: "merchant" },
  ],
  pickedForYou: [
    { id: "esports-arena", name: "F1 Esports Arena Night", category: "Experiences", points: "View options", image: esportsImg, tag: "For you" },
    { id: "vr-experience", name: "VR Adventure Zone", category: "Experiences", points: "3,500", image: vrImg, tag: "New" },
    { id: "concert-live", name: "Live Concert Experience", category: "Events", points: "View options", image: concertImg, tag: "Trending" },
    { id: "ritz-dubai", name: "The Ritz-Carlton, Riyadh", category: "Hotels", points: "View options", image: ritzDubai, tag: "Popular" },
  ],
};

type MarketplaceMode = "points" | "ecommerce";
export type Role = "consumer" | "merchant";

interface UserContextType {
  user: UserProfile;
  role: Role;
  setRole: (r: Role) => void;
  /** @deprecated compatibility alias for role */
  activeUser: Role;
  /** @deprecated compatibility alias for setRole */
  switchUser: (r: Role) => void;
  mode: MarketplaceMode;
  setMode: (mode: MarketplaceMode) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("consumer");
  const [mode, setMode] = useState<MarketplaceMode>("points");

  const user: UserProfile = {
    ...ahmedProfile,
    availablePoints: ahmedProfile.wallets[role].redeemable,
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        setRole,
        activeUser: role,
        switchUser: setRole,
        mode,
        setMode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
