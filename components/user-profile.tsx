'use client';

import { useEffect, useState } from 'react';
import { Wallet, Users, UserPlus, TrendingUp } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface UserData {
    username: string;
    displayName: string;
    pfpUrl: string;
    followers: number;
    following: number;
    contentQuality: number;
    replyQuality: number;
    engagementQuality: number;
    balance: number;
}

export default function UserProfile() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated user data - in production, fetch from API
        setTimeout(() => {
            setUserData({
                username: 'earnwithalee',
                displayName: 'Earn With Alee',
                pfpUrl: 'https://i.imgur.com/placeholder.jpg',
                followers: 1250,
                following: 340,
                contentQuality: 85.5,
                replyQuality: 78.3,
                engagementQuality: 92.1,
                balance: 100.00,
            });
            setLoading(false);
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className="glass rounded-2xl p-6 animate-pulse">
                <div className="h-20 bg-white/10 rounded-lg"></div>
            </div>
        );
    }

    if (!userData) return null;

    return (
        <div className="glass rounded-2xl p-6 border border-white/10 animate-slide-up">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* User Info */}
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-white">
                        {userData.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            @{userData.username}
                        </h1>
                        <p className="text-gray-400">{userData.displayName}</p>
                    </div>
                </div>

                {/* Balance Display */}
                <div className="glass-dark rounded-xl p-4 border border-white/20">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Wallet className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Balance</p>
                            <p className="text-2xl font-bold text-white balance-pulse">
                                {formatCurrency(userData.balance)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                {/* Followers */}
                <div className="glass-dark rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-primary-400" />
                        <p className="text-xs text-gray-400">Followers</p>
                    </div>
                    <p className="text-xl font-bold text-white">
                        {formatNumber(userData.followers)}
                    </p>
                </div>

                {/* Following */}
                <div className="glass-dark rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                        <UserPlus className="w-4 h-4 text-accent-400" />
                        <p className="text-xs text-gray-400">Following</p>
                    </div>
                    <p className="text-xl font-bold text-white">
                        {formatNumber(userData.following)}
                    </p>
                </div>

                {/* Content Quality */}
                <div className="glass-dark rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <p className="text-xs text-gray-400">Content</p>
                    </div>
                    <p className="text-xl font-bold text-white">
                        {userData.contentQuality.toFixed(1)}
                    </p>
                </div>

                {/* Reply Quality */}
                <div className="glass-dark rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <p className="text-xs text-gray-400">Replies</p>
                    </div>
                    <p className="text-xl font-bold text-white">
                        {userData.replyQuality.toFixed(1)}
                    </p>
                </div>

                {/* Engagement Quality */}
                <div className="glass-dark rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <p className="text-xs text-gray-400">Engagement</p>
                    </div>
                    <p className="text-xl font-bold text-white">
                        {userData.engagementQuality.toFixed(1)}
                    </p>
                </div>
            </div>
        </div>
    );
}
