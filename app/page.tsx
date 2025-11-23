'use client';

import HubDashboard from "@/components/hub-dashboard";
import UserProfile from "@/components/user-profile";
import TaskList from "@/components/task-list";
import LandingPage from "@/components/landing-page";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="spinner w-8 h-8 text-primary-500"></div>
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

            {/* Available Tasks */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Available Tasks</h2>
                <TaskList />
            </div>
        </div>
    );
}
