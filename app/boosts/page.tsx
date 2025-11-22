'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Eye, Heart, MessageCircle, Plus, Clock } from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

interface Boost {
    id: string;
    castUrl: string;
    castContent: string;
    amount: number;
    duration: number;
    startTime: string;
    endTime: string;
    views: number;
    engagement: number;
    status: string;
}

export default function BoostsPage() {
    const [boosts, setBoosts] = useState<Boost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated data - in production, fetch from API
        setTimeout(() => {
            setBoosts([
                {
                    id: '1',
                    castUrl: 'https://warpcast.com/earnwithalee/0x123',
                    castContent: 'Just launched our new Social Rewards platform! 🚀 Earn USDC by completing simple tasks.',
                    amount: 10.00,
                    duration: 24,
                    startTime: new Date(Date.now() - 7200000).toISOString(),
                    endTime: new Date(Date.now() + 79200000).toISOString(),
                    views: 1250,
                    engagement: 85,
                    status: 'active',
                },
                {
                    id: '2',
                    castUrl: 'https://warpcast.com/earnwithalee/0x456',
                    castContent: 'Check out this amazing opportunity to earn while engaging with quality content!',
                    amount: 5.00,
                    duration: 12,
                    startTime: new Date(Date.now() - 3600000).toISOString(),
                    endTime: new Date(Date.now() + 39600000).toISOString(),
                    views: 680,
                    engagement: 42,
                    status: 'active',
                },
            ]);
            setLoading(false);
        }, 600);
    }, []);

    const getTimeRemaining = (endTime: string) => {
        const end = new Date(endTime);
        const now = new Date();
        const diff = end.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        return hours > 0 ? `${hours}h remaining` : 'Ending soon';
    };

    if (loading) {
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="glass rounded-2xl p-6 animate-pulse">
                    <div className="h-32 bg-white/10 rounded-lg"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
                    <TrendingUp className="w-8 h-8 text-primary-400" />
                    <span>My Boosts</span>
                </h1>
                <Link
                    href="/boosts/create"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
                >
                    <Plus className="w-5 h-5" />
                    <span>Create Boost</span>
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass rounded-xl p-5 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-primary-400" />
                        <p className="text-sm text-gray-400">Active Boosts</p>
                    </div>
                    <p className="text-3xl font-bold text-white">{boosts.length}</p>
                </div>
                <div className="glass rounded-xl p-5 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                        <Eye className="w-5 h-5 text-blue-400" />
                        <p className="text-sm text-gray-400">Total Views</p>
                    </div>
                    <p className="text-3xl font-bold text-white">
                        {boosts.reduce((sum, b) => sum + b.views, 0).toLocaleString()}
                    </p>
                </div>
                <div className="glass rounded-xl p-5 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                        <Heart className="w-5 h-5 text-red-400" />
                        <p className="text-sm text-gray-400">Total Engagement</p>
                    </div>
                    <p className="text-3xl font-bold text-white">
                        {boosts.reduce((sum, b) => sum + b.engagement, 0)}
                    </p>
                </div>
            </div>

            {/* Active Boosts */}
            <div className="glass rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Active Boosts</h2>

                {boosts.length === 0 ? (
                    <div className="text-center py-12">
                        <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No Active Boosts</h3>
                        <p className="text-gray-400 mb-6">Boost your content to reach more people!</p>
                        <Link
                            href="/boosts/create"
                            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create Your First Boost</span>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {boosts.map((boost) => (
                            <div
                                key={boost.id}
                                className="glass-dark rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all"
                            >
                                {/* Boost Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <p className="text-white font-medium mb-2 line-clamp-2">
                                            {boost.castContent}
                                        </p>
                                        <div className="flex items-center space-x-3 text-xs text-gray-400">
                                            <span className="flex items-center space-x-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{getTimeRemaining(boost.endTime)}</span>
                                            </span>
                                            <span>•</span>
                                            <span>Boosted {formatRelativeTime(boost.startTime)}</span>
                                        </div>
                                    </div>
                                    <div className="glass rounded-lg px-3 py-2 border border-primary-500/30 ml-4">
                                        <p className="text-sm font-bold text-primary-400">
                                            {formatCurrency(boost.amount)}
                                        </p>
                                    </div>
                                </div>

                                {/* Boost Stats */}
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <Eye className="w-4 h-4 text-blue-400" />
                                            <p className="text-xs text-gray-400">Views</p>
                                        </div>
                                        <p className="text-lg font-bold text-white">
                                            {boost.views.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <Heart className="w-4 h-4 text-red-400" />
                                            <p className="text-xs text-gray-400">Engagement</p>
                                        </div>
                                        <p className="text-lg font-bold text-white">{boost.engagement}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <TrendingUp className="w-4 h-4 text-green-400" />
                                            <p className="text-xs text-gray-400">Rate</p>
                                        </div>
                                        <p className="text-lg font-bold text-white">
                                            {((boost.engagement / boost.views) * 100).toFixed(1)}%
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="gradient-primary h-2 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${((new Date().getTime() - new Date(boost.startTime).getTime()) /
                                                        (new Date(boost.endTime).getTime() - new Date(boost.startTime).getTime())) *
                                                    100
                                                    }%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
