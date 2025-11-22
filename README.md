# TaskCash

A comprehensive Farcaster mini-app built with Next.js and Neynar SDK that enables users to create and complete tasks for USDC rewards.

## Features

### 🎯 Core Features
- **User Profiles**: Display username, balance, followers, following, and engagement quality metrics
- **Task System**: Create tasks with rewards and complete tasks to earn USDC
- **Simulated Wallet**: Track USDC balance and transaction history
- **Hub Dashboard**: View daily earnings, spending, and activity analytics
- **Post Boosting**: Boost Farcaster casts to increase visibility
- **MindShare**: Social feed for community engagement
- **Earnings Tracking**: Comprehensive earnings history and breakdown

### 💎 Premium Design
- Modern glassmorphism UI
- Smooth animations and transitions
- Dark mode optimized
- Fully responsive design
- Vibrant color gradients

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma with SQLite (development)
- **Authentication**: NextAuth.js
- **SDK**: Neynar Node.js SDK
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd "f:\Neynar mini app"
```

2. Install dependencies (already done):
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Neynar API key from [dev.neynar.com](https://dev.neynar.com)

4. Initialize the database:
```bash
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── account/           # Account page
│   ├── boosts/            # Boosts pages
│   ├── earnings/          # Earnings page
│   ├── mindshare/         # MindShare page
│   ├── tasks/             # Tasks pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── hub-dashboard.tsx
│   ├── navigation.tsx
│   ├── providers.tsx
│   ├── task-list.tsx
│   └── user-profile.tsx
├── lib/                   # Utility functions
│   ├── neynar.ts         # Neynar client
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema
│   └── schema.prisma
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Prisma Studio

## Features Overview

### User Profile
- Username and display name
- USDC balance (prominent display)
- Followers and following counts
- Quality metrics (Content, Reply, Engagement)

### Hub Dashboard
- Daily earnings and spending
- Net change calculation
- Task activity summary
- Weekly earnings progress

### Task System
- Browse available tasks
- Create new tasks with rewards
- Complete tasks to earn USDC
- Real-time balance updates

### Boost System
- Boost Farcaster casts
- Track boost performance
- View engagement metrics
- Monitor active boosts

### MindShare
- Create posts
- Engage with community
- Like, comment, and share

### Earnings
- Total earnings display
- Earnings history
- Breakdown by source
- Statistics and analytics

## Simulated Features

The following features are simulated for this version:
- USDC wallet (no real blockchain integration)
- Task verification (automated/simulated)
- Payment processing (tracked in-app only)

## Future Enhancements

- Real blockchain integration for USDC
- Advanced verification mechanisms
- Social sharing and referral system
- Leaderboards and gamification
- Advanced analytics and reporting
- Mobile app version

## Environment Variables

```env
NEYNAR_API_KEY=your_neynar_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
```

## Contributing

This is a demo project. For production use, please implement:
- Real authentication with Farcaster
- Actual blockchain integration
- Proper security measures
- Rate limiting and validation
- Error handling and logging

## License

MIT

## Support

For questions or issues, please refer to the [Neynar Documentation](https://docs.neynar.com).
