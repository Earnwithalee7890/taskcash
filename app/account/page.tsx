'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Hash, Wallet, TrendingUp, Users, UserPlus, LogOut, DollarSign, Award, Activity } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';
import FarcasterLogin from '@/components/farcaster-login';

export default function AccountPage() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const user = session?.user as any;

    const [stats, setStats] = useState({
        followers: 0,
        following: 0,
        score: 0,
        loading: true
    });

    const [earnings, setEarnings] = useState({
        total: 0,
        pending: 0,
        paid: 0,
        loading: true
    });

    useEffect(() => {
        if (user?.fid) {
            // Fetch Farcaster stats
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

            // Fetch earnings
            fetch(`/api/earnings?fid=${user.fid}`)
                .then(res => res.json())
                .then(data => {
                    setEarnings({
                        total: data.total || 0,
                        pending: data.pending || 0,
                        paid: data.paid || 0,
                        loading: false
                    });
                })
                .catch(err => console.error('Failed to fetch earnings:', err));
        }
    }, [user?.fid]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="spinner w-8 h-8 text-primary-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center space-y-6 animate-fade-in">
                <div className="glass p-8 rounded-2xl border border-white/10">
                    <h1 className="text-3xl font-bold text-white mb-4">Welcome to TaskCash</h1>
                    <p className="text-gray-400 mb-8">
                        Connect your Farcaster account to access your profile.
                    </p>
                    <FarcasterLogin />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="glass rounded-2xl p-8 border border-white/10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Profile Picture */}
                    <div className="relative">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.username}
                                width={120}
                                height={120}
                                className="rounded-2xl border-4 border-primary-500/30"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-4xl font-bold text-white">
                                {user.username?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-white">{user.name || user.username}</h1>
                            {stats.score > 75 && (
                                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold">
                                    ⚡ Power User
                                </div>
                            )}
                        </div>
                        <p className="text-xl text-gray-400 mb-4">@{user.username}</p>
                        {user.bio && (
                            <p className="text-gray-300 mb-4 max-w-2xl">{user.bio}</p>
                        )}

                        {/* FID Badge */}
                        <div className="flex items-center gap-2 text-primary-400">
                            <Hash className="w-5 h-5" />
                            <span className="font-mono font-semibold">FID: {user.fid}</span>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Wallet Section */}
                <div className="glass rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <Wallet className="w-6 h-6 text-green-400" />
                        </div>
                        <h2 className="text-lg font-bold text-white">Wallet</h2>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Total Earnings</p>
                            <p className="text-2xl font-bold text-white">{formatCurrency(earnings.total)}</p>
                        </div>
                        <div className="pt-3 border-t border-white/10 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Pending</span>
                                <span className="text-yellow-400 font-semibold">{formatCurrency(earnings.pending)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Paid Out</span>
                                <span className="text-green-400 font-semibold">{formatCurrency(earnings.paid)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Farcaster Stats */}
                <div className="glass rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-lg font-bold text-white">Farcaster Stats</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Users className="w-4 h-4" />
                                <span className="text-sm">Followers</span>
                            </div>
                            <span className="text-xl font-bold text-white">{formatNumber(stats.followers)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-400">
                                <UserPlus className="w-4 h-4" />
                                <span className="text-sm">Following</span>
                            </div>
                            <span className="text-xl font-bold text-white">{formatNumber(stats.following)}</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Award className="w-4 h-4" />
                                <span className="text-sm">Neynar Score</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                                {stats.score}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Activity Stats */}
                <div className="glass rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <Activity className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-lg font-bold text-white">Activity</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="glass-dark rounded-lg p-3">
                            <p className="text-sm text-gray-400 mb-1">Tasks Completed</p>
                            <p className="text-2xl font-bold text-white">0</p>
                        </div>
                        <div className="glass-dark rounded-lg p-3">
                            <p className="text-sm text-gray-400 mb-1">Tasks Created</p>
                            <p className="text-2xl font-bold text-white">0</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connected Wallet (Placeholder) */}
            <div className="glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Connected Wallet</h3>
                        <p className="text-sm text-gray-400">
                            Connect your wallet to receive payments
                        </p>
                    </div>
                    <button className="px-6 py-3 rounded-lg gradient-primary text-white font-medium hover:opacity-90 transition-opacity">
                        Connect Wallet
                    </button>
                </div>
            </div>
        </div>
    );
}
