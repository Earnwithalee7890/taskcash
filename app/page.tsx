'use client';

import HubDashboard from "@/components/hub-dashboard";
import UserProfile from "@/components/user-profile";
import LandingPage from "@/components/landing-page";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-accent-500/20 border-b-accent-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                </div>
                <div className="text-center space-y-2">
                    <p className="text-white font-medium">Connecting to Farcaster...</p>
                    <p className="text-sm text-gray-400">Auto-authenticating your account</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return <LandingPage />;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* User Profile Header */}
            <UserProfile />

            {/* Hub Dashboard */}
            <HubDashboard />
        </div>
    );
}
