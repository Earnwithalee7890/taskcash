'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Link as LinkIcon, DollarSign, Clock } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export default function CreateBoostPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        castUrl: '',
        amount: '',
        duration: '24',
    });
    const [loading, setLoading] = useState(false);

    const userBalance = 100.00; // In production, fetch from API

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const amount = parseFloat(formData.amount);

        if (amount > userBalance) {
            alert('Insufficient balance!');
            return;
        }

        if (amount < 1.0) {
            alert('Minimum boost amount is $1.00');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            alert(`Boost created successfully! ${formatCurrency(amount)} deducted from your balance.`);
            router.push('/boosts');
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const boostAmount = parseFloat(formData.amount) || 0;
    const isValid = formData.castUrl && boostAmount >= 1.0 && boostAmount <= userBalance;

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <Link
                    href="/boosts"
                    className="w-10 h-10 rounded-lg glass-dark border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </Link>
                <h1 className="text-3xl font-bold text-white">Create Boost</h1>
            </div>

            {/* Balance Display */}
            <div className="glass rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400">Available Balance</span>
                    <span className="text-2xl font-bold text-white">{formatCurrency(userBalance)}</span>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 border border-white/10 space-y-6">
                {/* Cast URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cast URL *
                    </label>
                    <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="url"
                            name="castUrl"
                            value={formData.castUrl}
                            onChange={handleChange}
                            placeholder="https://warpcast.com/username/0x..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                            required
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        Enter the URL of the cast you want to boost
                    </p>
                </div>

                {/* Boost Amount */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Boost Amount (USDC) *
                    </label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="1.0"
                            max={userBalance}
                            className="w-full pl-12 pr-4 py-3 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                            required
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        Minimum: $1.00 • Maximum: {formatCurrency(userBalance)}
                    </p>
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Boost Duration *
                    </label>
                    <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <select
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-lg glass-dark border border-white/10 text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none"
                        >
                            <option value="12">12 hours</option>
                            <option value="24">24 hours</option>
                            <option value="48">48 hours</option>
                            <option value="72">72 hours</option>
                        </select>
                    </div>
                </div>

                {/* Preview */}
                {boostAmount > 0 && (
                    <div className="glass-dark rounded-lg p-4 border border-white/10">
                        <h3 className="text-sm font-medium text-gray-300 mb-3">Boost Preview</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Boost Amount:</span>
                                <span className="text-white font-semibold">{formatCurrency(boostAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Duration:</span>
                                <span className="text-white font-semibold">{formData.duration} hours</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Estimated Reach:</span>
                                <span className="text-white font-semibold">
                                    {(boostAmount * 100).toLocaleString()} views
                                </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-white/10">
                                <span className="text-gray-400">New Balance:</span>
                                <span className="text-white font-semibold">
                                    {formatCurrency(userBalance - boostAmount)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!isValid || loading}
                    className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${isValid && !loading
                            ? 'gradient-primary hover:opacity-90'
                            : 'bg-gray-700 cursor-not-allowed opacity-50'
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center space-x-2">
                            <div className="spinner w-5 h-5"></div>
                            <span>Creating Boost...</span>
                        </span>
                    ) : (
                        'Create Boost'
                    )}
                </button>
            </form>
        </div>
    );
}
