'use client';

import { useEffect, useState } from 'react';
import { Wallet, Users, UserPlus, TrendingUp } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { useSession } from 'next-auth/react';

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
    const { data: session } = useSession();
    const user = session?.user as any;
    const [stats, setStats] = useState({
        followers: 0,
        following: 0,
        score: 0,
        loading: true
    });

    useEffect(() => {
        if (user?.fid) {
            fetch(`/api/user/stats?fid=${user.fid}`)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setStats({
                            followers: data.followers,
                            following: data.following,
                            score: data.score,
                            loading: false
                        });
                    }
                })
                .catch(err => console.error('Failed to fetch stats:', err));
        }
    }, [user?.fid]);

    if (!user) return null;

    const userData: UserData = {
        username: user.username || 'user',
        displayName: user.name || 'User',
        pfpUrl: user.image || '',
        followers: stats.followers,
        following: stats.following,
        contentQuality: stats.score, // Using Neynar score as proxy for now
        replyQuality: 0, // Placeholder
        engagementQuality: 0, // Placeholder
        balance: 0, // Placeholder
    };

    if (stats.loading) {
        return (
            <div className="glass rounded-2xl p-6 animate-pulse">
                <div className="h-20 bg-white/10 rounded-lg"></div>
            </div>
        );
    }

    return (
        <div className="glass rounded-2xl p-6 border border-white/10 animate-slide-up">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* User Info */}
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-white overflow-hidden">
                        {userData.pfpUrl ? (
                            <img src={userData.pfpUrl} alt={userData.username} className="w-full h-full object-cover" />
                        ) : (
                            userData.username.charAt(0).toUpperCase()
                        )}
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
                        <p className="text-xs text-gray-400">Neynar Score</p>
                    </div>
                    <p className="text-xl font-bold text-white">
                        {userData.contentQuality}
                    </p>
                </div>

                {/* Reply Quality */}
                <div className="glass-dark rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <p className="text-xs text-gray-400">Replies</p>
                    </div>
                    <p className="text-xl font-bold text-white">
                        -
                    </p>
                </div>

                {/* Engagement Quality */}
                <div className="glass-dark rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <p className="text-xs text-gray-400">Engagement</p>
                    </div>
                    <p className="text-xl font-bold text-white">
                        -
                    </p>
                </div>
            </div>
        </div>
    );
}
