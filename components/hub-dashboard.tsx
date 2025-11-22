'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface DailyStats {
    earned: number;
    spent: number;
    tasksCompleted: number;
    tasksCreated: number;
}

export default function HubDashboard() {
    const [stats, setStats] = useState<DailyStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated data - in production, fetch from API
        setTimeout(() => {
            setStats({
                earned: 45.50,
                spent: 25.00,
                tasksCompleted: 8,
                tasksCreated: 3,
            });
            setLoading(false);
        }, 600);
    }, []);

    if (loading) {
        return (
            <div className="glass rounded-2xl p-6 animate-pulse">
                <div className="h-40 bg-white/10 rounded-lg"></div>
            </div>
        );
    }

    if (!stats) return null;

    const netChange = stats.earned - stats.spent;

    return (
        <div className="glass rounded-2xl p-6 border border-white/10 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <Activity className="w-6 h-6 text-primary-400" />
                    <span>Hub - Today's Activity</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Earned Today */}
                <div className="glass-dark rounded-xl p-5 border border-white/10 card-hover">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-400" />
                        </div>
                        <span className="text-xs font-medium text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                            +{stats.tasksCompleted}
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Earned Today</p>
                    <p className="text-3xl font-bold text-white">
                        {formatCurrency(stats.earned)}
                    </p>
                </div>

                {/* Spent Today */}
                <div className="glass-dark rounded-xl p-5 border border-white/10 card-hover">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                            <TrendingDown className="w-6 h-6 text-red-400" />
                        </div>
                        <span className="text-xs font-medium text-red-400 bg-red-500/20 px-2 py-1 rounded-full">
                            -{stats.tasksCreated}
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Spent Today</p>
                    <p className="text-3xl font-bold text-white">
                        {formatCurrency(stats.spent)}
                    </p>
                </div>

                {/* Net Change */}
                <div className="glass-dark rounded-xl p-5 border border-white/10 card-hover">
                    <div className="flex items-center justify-between mb-3">
                        <div className={`w-12 h-12 rounded-full ${netChange >= 0 ? 'bg-blue-500/20' : 'bg-orange-500/20'} flex items-center justify-center`}>
                            <DollarSign className={`w-6 h-6 ${netChange >= 0 ? 'text-blue-400' : 'text-orange-400'}`} />
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Net Change</p>
                    <p className={`text-3xl font-bold ${netChange >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
                        {netChange >= 0 ? '+' : ''}{formatCurrency(netChange)}
                    </p>
                </div>

                {/* Tasks Summary */}
                <div className="glass-dark rounded-xl p-5 border border-white/10 card-hover">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Activity className="w-6 h-6 text-purple-400" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Tasks Activity</p>
                    <div className="flex items-baseline space-x-2">
                        <p className="text-2xl font-bold text-white">
                            {stats.tasksCompleted + stats.tasksCreated}
                        </p>
                        <p className="text-sm text-gray-400">total</p>
                    </div>
                    <div className="flex items-center space-x-3 mt-2 text-xs">
                        <span className="text-green-400">{stats.tasksCompleted} done</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-blue-400">{stats.tasksCreated} created</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="mt-6 glass-dark rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Weekly Earnings</span>
                    <span className="text-white font-semibold">{formatCurrency(stats.earned * 5.2)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                        className="gradient-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: '65%' }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
