'use client';

import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, CheckCircle, Gift, Calendar } from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';

interface Earning {
    id: string;
    source: string;
    amount: number;
    description: string;
    createdAt: string;
}

export default function EarningsPage() {
    const [earnings, setEarnings] = useState<Earning[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalEarnings, setTotalEarnings] = useState(0);

    useEffect(() => {
        // Simulated data - in production, fetch from API
        setTimeout(() => {
            const earningsData = [
                {
                    id: '1',
                    source: 'task_completion',
                    amount: 5.00,
                    description: 'Completed: Read Article & Comment',
                    createdAt: new Date(Date.now() - 3600000).toISOString(),
                },
                {
                    id: '2',
                    source: 'task_completion',
                    amount: 2.50,
                    description: 'Completed: Follow on Warpcast',
                    createdAt: new Date(Date.now() - 7200000).toISOString(),
                },
                {
                    id: '3',
                    source: 'task_completion',
                    amount: 3.75,
                    description: 'Completed: Join Discord Community',
                    createdAt: new Date(Date.now() - 10800000).toISOString(),
                },
                {
                    id: '4',
                    source: 'bonus',
                    amount: 10.00,
                    description: 'Welcome Bonus',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                },
                {
                    id: '5',
                    source: 'task_completion',
                    amount: 4.25,
                    description: 'Completed: Share on Twitter',
                    createdAt: new Date(Date.now() - 14400000).toISOString(),
                },
            ];

            setEarnings(earningsData);
            setTotalEarnings(earningsData.reduce((sum, e) => sum + e.amount, 0));
            setLoading(false);
        }, 600);
    }, []);

    const getSourceIcon = (source: string) => {
        switch (source) {
            case 'task_completion':
                return <CheckCircle className="w-5 h-5 text-green-400" />;
            case 'referral':
                return <TrendingUp className="w-5 h-5 text-blue-400" />;
            case 'bonus':
                return <Gift className="w-5 h-5 text-purple-400" />;
            default:
                return <DollarSign className="w-5 h-5 text-gray-400" />;
        }
    };

    const getSourceLabel = (source: string) => {
        switch (source) {
            case 'task_completion':
                return 'Task Completed';
            case 'referral':
                return 'Referral';
            case 'bonus':
                return 'Bonus';
            default:
                return 'Other';
        }
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
                    <DollarSign className="w-8 h-8 text-green-400" />
                    <span>My Earnings</span>
                </h1>
            </div>

            {/* Total Earnings Card */}
            <div className="glass rounded-2xl p-8 border border-white/10 text-center">
                <p className="text-gray-400 mb-2">Total Earnings</p>
                <p className="text-5xl font-bold text-white mb-4">
                    {formatCurrency(totalEarnings)}
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">
                            {earnings.filter(e => e.source === 'task_completion').length} Tasks
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Gift className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300">
                            {earnings.filter(e => e.source === 'bonus').length} Bonuses
                        </span>
                    </div>
                </div>
            </div>

            {/* Earnings Breakdown */}
            <div className="glass rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary-400" />
                    <span>Earnings History</span>
                </h2>

                <div className="space-y-3">
                    {earnings.map((earning) => (
                        <div
                            key={earning.id}
                            className="glass-dark rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-1">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        {getSourceIcon(earning.source)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-medium">{earning.description}</p>
                                        <div className="flex items-center space-x-3 mt-1">
                                            <span className="text-xs text-gray-400">
                                                {getSourceLabel(earning.source)}
                                            </span>
                                            <span className="text-xs text-gray-600">•</span>
                                            <span className="text-xs text-gray-400">
                                                {formatRelativeTime(earning.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-green-400">
                                        +{formatCurrency(earning.amount)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass rounded-xl p-5 border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Average per Task</p>
                    <p className="text-2xl font-bold text-white">
                        {formatCurrency(
                            earnings.filter(e => e.source === 'task_completion').reduce((sum, e) => sum + e.amount, 0) /
                            earnings.filter(e => e.source === 'task_completion').length || 0
                        )}
                    </p>
                </div>
                <div className="glass rounded-xl p-5 border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">This Week</p>
                    <p className="text-2xl font-bold text-white">
                        {formatCurrency(totalEarnings * 0.7)}
                    </p>
                </div>
                <div className="glass rounded-xl p-5 border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">This Month</p>
                    <p className="text-2xl font-bold text-white">
                        {formatCurrency(totalEarnings)}
                    </p>
                </div>
            </div>
        </div>
    );
}
