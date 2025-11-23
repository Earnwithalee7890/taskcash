'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Settings, Bell, Shield, ExternalLink, LogOut, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
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

    // STRICT: Only use session data. NO FALLBACKS.
    const userData = user ? {
        username: user.username,
        displayName: user.name,
        pfp: user.image,
        bio: user.bio,
        fid: user.fid,
        // Real data from API (or 0 if loading)
        balance: 0, // Still simulated for now
        followers: stats.followers,
        following: stats.following,
        tasksCompleted: 0,
        tasksCreated: 0,
        score: stats.score,
    } : null;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="spinner w-8 h-8 text-primary-500"></div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center space-y-6 animate-fade-in">
                <div className="glass p-8 rounded-2xl border border-white/10">
                    <h1 className="text-3xl font-bold text-white mb-4">Welcome to TaskCash</h1>
                    <p className="text-gray-400 mb-8">
                        Connect your Farcaster account to start earning rewards and boosting your content.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <FarcasterLogin />
                        {/* Debug: Force clear any stale session */}
                        <button
                            onClick={() => signOut({ callbackUrl: '/account' })}
                            className="text-xs text-gray-500 hover:text-white underline"
                        >
                            Clear Session (Debug)
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Profile Header */}
            <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-3xl"></div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full p-1 gradient-primary">
                            <div className="w-full h-full rounded-full overflow-hidden bg-black">
                                <Image
                                    src={user.pfp || 'https://github.com/shadcn.png'}
                                    alt={user.username || 'User'}
                                    width={96}
                                    height={96}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-white">
                            FID: {user.fid}
                        </div>
                    </div>

                    <div className="flex-1 space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-white">{user.displayName}</h1>
                                <p className="text-primary-400">@{user.username}</p>
                            </div>
                            <button className="px-4 py-2 rounded-lg glass-dark border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                                Edit Profile
                            </button>
                        </div>
                        <p className="text-gray-300 max-w-2xl">
                            {user.bio}
                        </p>

                        <div className="flex items-center gap-6 pt-2">
                            <div className="text-center md:text-left">
                                <div className="text-lg font-bold text-white">
                                    {stats.loading ? '...' : user.followers}
                                </div>
                                <div className="text-xs text-gray-400">Followers</div>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-lg font-bold text-white">
                                    {stats.loading ? '...' : user.following}
                                </div>
                                <div className="text-xs text-gray-400">Following</div>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-lg font-bold text-white">
                                    {stats.loading ? '...' : user.score}
                                </div>
                                <div className="text-xs text-gray-400">Neynar Score</div>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-lg font-bold text-white">{user.tasksCompleted}</div>
                                <div className="text-xs text-gray-400">Tasks Done</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass rounded-xl p-6 border border-white/10">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Current Balance</h3>
                    <div className="text-3xl font-bold text-white">{formatCurrency(user.balance)}</div>
                    <div className="mt-4 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 w-[70%]"></div>
                    </div>
                </div>

                <div className="glass rounded-xl p-6 border border-white/10">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Total Earned</h3>
                    <div className="text-3xl font-bold text-green-400">{formatCurrency(0)}</div>
                    <div className="mt-2 text-xs text-green-400/80 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +0% this week
                    </div>
                </div>

                <div className="glass rounded-xl p-6 border border-white/10">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Net Profit</h3>
                    <div className="text-3xl font-bold text-blue-400">{formatCurrency(0)}</div>
                    <div className="mt-2 text-xs text-blue-400/80">
                        After spending {formatCurrency(0)}
                    </div>
                </div>
            </div>

            {/* Settings Sections */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white px-1">Settings</h2>

                <div className="glass rounded-xl border border-white/10 divide-y divide-white/5">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <Bell className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-medium text-white">Notifications</div>
                                <div className="text-sm text-gray-400">Manage your alert preferences</div>
                            </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-500" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-medium text-white">Privacy & Security</div>
                                <div className="text-sm text-gray-400">Control your data and visibility</div>
                            </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-500" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                                <Settings className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-medium text-white">Connected Accounts</div>
                                <div className="text-sm text-gray-400">Manage linked wallets and socials</div>
                            </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="glass rounded-xl border border-white/10 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                                <LogOut className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-medium text-white">Sign Out</div>
                                <div className="text-sm text-gray-400">Disconnect your account</div>
                            </div>
                        </div>
                        <FarcasterLogin />
                    </div>
                </div>
            </div>
        </div>
    );
}
