'use client';

import { useEffect, useState } from 'react';
import { User, Wallet, Settings, LogOut, Edit } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface UserAccount {
    username: string;
    displayName: string;
    bio: string;
    followers: number;
    following: number;
    contentQuality: number;
    replyQuality: number;
    engagementQuality: number;
    balance: number;
    tasksCompleted: number;
    tasksCreated: number;
    totalEarned: number;
    totalSpent: number;
}

export default function AccountPage() {
    const [account, setAccount] = useState<UserAccount | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated data - in production, fetch from API
        setTimeout(() => {
            setAccount({
                username: 'earnwithalee',
                displayName: 'Earn With Alee',
                bio: 'Building the future of social rewards. Helping people earn while engaging with quality content.',
                followers: 1250,
                following: 340,
                contentQuality: 85.5,
                replyQuality: 78.3,
                engagementQuality: 92.1,
                balance: 100.00,
                tasksCompleted: 23,
                tasksCreated: 8,
                totalEarned: 125.50,
                totalSpent: 45.00,
            });
            setLoading(false);
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="glass rounded-2xl p-6 animate-pulse">
                    <div className="h-64 bg-white/10 rounded-lg"></div>
                </div>
            </div>
        );
    }

    if (!account) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
                    <User className="w-8 h-8 text-primary-400" />
                    <span>Account</span>
                </h1>
            </div>

            {/* Profile Section */}
            <div className="glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-3xl font-bold text-white">
                            {account.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">@{account.username}</h2>
                            <p className="text-gray-400">{account.displayName}</p>
                        </div>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg glass-dark border border-white/10 text-white hover:bg-white/10 transition-colors">
                        <Edit className="w-4 h-4" />
                        <span>Edit Profile</span>
                    </button>
                </div>

                <p className="text-gray-300 mb-6">{account.bio}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">{formatNumber(account.followers)}</p>
                        <p className="text-sm text-gray-400">Followers</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">{formatNumber(account.following)}</p>
                        <p className="text-sm text-gray-400">Following</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">{account.tasksCompleted}</p>
                        <p className="text-sm text-gray-400">Tasks Done</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">{account.tasksCreated}</p>
                        <p className="text-sm text-gray-400">Tasks Created</p>
                    </div>
                </div>
            </div>

            {/* Quality Metrics */}
            <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Quality Metrics</h3>

                <div className="space-y-4">
                    {/* Content Quality */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-300">Content Quality</span>
                            <span className="text-white font-semibold">{account.contentQuality.toFixed(1)}/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${account.contentQuality}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Reply Quality */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-300">Reply Quality</span>
                            <span className="text-white font-semibold">{account.replyQuality.toFixed(1)}/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${account.replyQuality}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Engagement Quality */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-300">Engagement Quality</span>
                            <span className="text-white font-semibold">{account.engagementQuality.toFixed(1)}/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-purple-400 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${account.engagementQuality}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Overview */}
            <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-green-400" />
                    <span>Financial Overview</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-dark rounded-lg p-4 border border-white/10">
                        <p className="text-sm text-gray-400 mb-1">Current Balance</p>
                        <p className="text-3xl font-bold text-white">{formatCurrency(account.balance)}</p>
                    </div>
                    <div className="glass-dark rounded-lg p-4 border border-white/10">
                        <p className="text-sm text-gray-400 mb-1">Total Earned</p>
                        <p className="text-3xl font-bold text-green-400">{formatCurrency(account.totalEarned)}</p>
                    </div>
                    <div className="glass-dark rounded-lg p-4 border border-white/10">
                        <p className="text-sm text-gray-400 mb-1">Total Spent</p>
                        <p className="text-3xl font-bold text-red-400">{formatCurrency(account.totalSpent)}</p>
                    </div>
                    <div className="glass-dark rounded-lg p-4 border border-white/10">
                        <p className="text-sm text-gray-400 mb-1">Net Profit</p>
                        <p className="text-3xl font-bold text-blue-400">
                            {formatCurrency(account.totalEarned - account.totalSpent)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Settings */}
            <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span>Settings</span>
                </h3>

                <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 rounded-lg glass-dark border border-white/10 text-white hover:bg-white/10 transition-colors">
                        Notification Preferences
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-lg glass-dark border border-white/10 text-white hover:bg-white/10 transition-colors">
                        Privacy Settings
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-lg glass-dark border border-white/10 text-white hover:bg-white/10 transition-colors">
                        Connected Accounts
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg glass-dark border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
                        <span>Sign Out</span>
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
