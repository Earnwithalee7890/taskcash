'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Heart, MessageCircle, Repeat2, Activity, TrendingUp, Users, Zap } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface Cast {
    id: string;
    username: string;
    content: string;
    likes: number;
    comments: number;
    shares: number;
    recast?: boolean;
    createdAt: string;
    // If a cast has a parent_hash, it's a reply. Absence means it's a top‑level post.
    parent_hash?: string;
}

export default function HubDashboard() {
    const { data: session } = useSession();
    const user = session?.user as any;
    const [casts, setCasts] = useState<Cast[]>([]);
    const [stats, setStats] = useState({
        totalCasts: 0,
        totalEngagement: 0,
        avgEngagement: 0,
        loading: true,
    });

    useEffect(() => {
        if (!user?.fid) {
            setStats(prev => ({ ...prev, loading: false }));
            return;
        }
        // Fetch all casts for the user
        fetch(`/api/mindshare/posts?fid=${user.fid}&includeRecasts=true`)
            .then(res => res.json())
            .then(data => {
                if (!data.posts) {
                    setStats(prev => ({ ...prev, loading: false }));
                    return;
                }
                // Keep only top‑level posts (no parent_hash)
                const posts = data.posts.filter((c: Cast) => !c.parent_hash);
                // Recent 5 posts for display
                setCasts(posts.slice(0, 5));

                const totalCasts = posts.length;
                const totalEngagement = posts.reduce((sum: number, c: Cast) =>
                    sum + c.likes + c.comments + c.shares,
                    0
                );
                const avgEngagement = totalCasts > 0 ? Math.round(totalEngagement / totalCasts) : 0;

                setStats({
                    totalCasts,
                    totalEngagement,
                    avgEngagement,
                    loading: false,
                });
            })
            .catch(err => {
                console.error('Failed to fetch casts:', err);
                setStats(prev => ({ ...prev, loading: false }));
            });
    }, [user?.fid]);

    if (stats.loading) {
        return (
            <div className="glass rounded-2xl p-6 animate-pulse">
                <div className="h-40 bg-white/10 rounded-lg"></div>
            </div>
        );
    }

    return (
        <div className="glass rounded-2xl p-6 border border-white/10 animate-slide-up space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <Activity className="w-6 h-6 text-primary-400" />
                    <span>Your Farcaster Activity</span>
                </h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Posts */}
                <div className="glass-dark rounded-xl p-5 border border-white/10 card-hover">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Total Posts</p>
                    <p className="text-3xl font-bold text-white">{stats.totalCasts}</p>
                </div>

                {/* Total Engagement */}
                <div className="glass-dark rounded-xl p-5 border border-white/10 card-hover">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-400" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Total Engagement</p>
                    <p className="text-3xl font-bold text-white">{stats.totalEngagement}</p>
                </div>

                {/* Avg Engagement */}
                <div className="glass-dark rounded-xl p-5 border border-white/10 card-hover">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-purple-400" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Avg per Post</p>
                    <p className="text-3xl font-bold text-white">{stats.avgEngagement}</p>
                </div>
            </div>

            {/* Recent Posts */}
            {casts.length > 0 ? (
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Posts</h3>
                    <div className="space-y-3">
                        {casts.map((cast) => (
                            <div key={cast.id} className="glass-dark rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors">
                                <p className="text-white mb-3 line-clamp-2">{cast.content}</p>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-4 text-gray-400">
                                        <span className="flex items-center space-x-1">
                                            <Heart className="w-4 h-4" />
                                            <span>{cast.likes}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <MessageCircle className="w-4 h-4" />
                                            <span>{cast.comments}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <Repeat2 className="w-4 h-4" />
                                            <span>{cast.shares}</span>
                                        </span>
                                    </div>
                                    <span className="text-gray-500 text-xs">
                                        {formatRelativeTime(cast.createdAt)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="glass-dark rounded-lg p-8 border border-white/10 text-center">
                    <Users className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No posts yet. Start sharing on Farcaster!</p>
                </div>
            )}
        </div>
    );
}
