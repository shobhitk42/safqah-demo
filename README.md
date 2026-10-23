# Rewards Marketplace

A premium loyalty rewards marketplace prototype built with React, Vite, and Tailwind CSS.

## Overview

This app lets members browse and redeem reward points for:

- Flights and hotels
- Gift cards
- Merchandise and electronics
- Experiences and concierge services
- Airport lounge access
- Sports and event tickets
- Mobile top-ups and cashback

## Key Features

- **Dual marketplace mode**: Toggle between a points-based rewards store and a cash e-commerce experience.
- **Personalized home screen**: "Picked for You" and trending sections tailored to user personas.
- **Gamification**: Badges, milestones, and a "Kick & Win" mini-game.
- **Mixed payment checkout**: Combine points and cash at redemption.
- **Profile & orders**: View loyalty tier, points balance, and redemption history.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev
```

## Customization Ideas

After remixing, common next steps include:

1. Replace the logo and wordmark in `src/components/UserHeader.tsx`.
2. Update brand colors in `src/index.css` and `tailwind.config.ts`.
3. Edit user personas in `src/contexts/UserContext.tsx`.
4. Swap out gift cards, hotels, and experiences in `src/data/`.
5. Add real backend data via Lovable Cloud.
