'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { DollarSign, TrendingUp, CheckCircle, Gift, Calendar } from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';

interface Earning {
    taskId: string;
    amount: number;
    date: string;
    status: string;
}

export default function EarningsPage() {
    const { data: session } = useSession();
    const user = session?.user as any;
    const [earnings, setEarnings] = useState<Earning[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [pending, setPending] = useState(0);
    const [paid, setPaid] = useState(0);

    useEffect(() => {
        if (user?.fid) {
            fetch(`/api/earnings?fid=${user.fid}`)
                .then(res => res.json())
                .then(data => {
                    setEarnings(data.history || []);
                    setTotalEarnings(data.total || 0);
                    setPending(data.pending || 0);
                    setPaid(data.paid || 0);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch earnings:', err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [user?.fid]);

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
            <div className="glass rounded-2xl p-8 border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                        <p className="text-gray-400 mb-2">Total Earnings</p>
                        <p className="text-4xl font-bold text-white">
                            {formatCurrency(totalEarnings)}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400 mb-2">Pending</p>
                        <p className="text-4xl font-bold text-yellow-400">
                            {formatCurrency(pending)}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400 mb-2">Paid Out</p>
                        <p className="text-4xl font-bold text-green-400">
                            {formatCurrency(paid)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Earnings History */}
            <div className="glass rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary-400" />
                    <span>Earnings History</span>
                </h2>

                {earnings.length > 0 ? (
                    <div className="space-y-3">
                        {earnings.map((earning, index) => (
                            <div
                                key={index}
                                className="glass-dark rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3 flex-1">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-medium">Task #{earning.taskId}</p>
                                            <div className="flex items-center space-x-3 mt-1">
                                                <span className={`text-xs px-2 py-1 rounded-full ${earning.status === 'paid'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {earning.status}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {formatRelativeTime(earning.date)}
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
                ) : (
                    <div className="text-center py-12">
                        <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No Earnings Yet</h3>
                        <p className="text-gray-400">Complete tasks to start earning!</p>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass rounded-xl p-5 border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Total Tasks</p>
                    <p className="text-2xl font-bold text-white">
                        {earnings.length}
                    </p>
                </div>
                <div className="glass rounded-xl p-5 border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Average per Task</p>
                    <p className="text-2xl font-bold text-white">
                        {earnings.length > 0 ? formatCurrency(totalEarnings / earnings.length) : formatCurrency(0)}
                    </p>
                </div>
                <div className="glass rounded-xl p-5 border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Pending Payment</p>
                    <p className="text-2xl font-bold text-yellow-400">
                        {formatCurrency(pending)}
                    </p>
                </div>
            </div>
        </div>
    );
}
