'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Link as LinkIcon, DollarSign, FileText } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export default function CreateTaskPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link: '',
        reward: '',
    });
    const [loading, setLoading] = useState(false);

    const userBalance = 100.00; // In production, fetch from API

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const reward = parseFloat(formData.reward);

        if (reward > userBalance) {
            alert('Insufficient balance!');
            return;
        }

        if (reward < 0.5) {
            alert('Minimum reward is $0.50');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            alert(`Task created successfully! ${formatCurrency(reward)} deducted from your balance.`);
            router.push('/tasks');
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const rewardAmount = parseFloat(formData.reward) || 0;
    const isValid = formData.title && formData.link && rewardAmount >= 0.5 && rewardAmount <= userBalance;

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <Link
                    href="/tasks"
                    className="w-10 h-10 rounded-lg glass-dark border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </Link>
                <h1 className="text-3xl font-bold text-white">Create New Task</h1>
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
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Task Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Follow on Warpcast"
                        className="w-full px-4 py-3 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description (Optional)
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Provide details about what users need to do..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    />
                </div>

                {/* Link */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Task Link *
                    </label>
                    <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            className="w-full pl-12 pr-4 py-3 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                            required
                        />
                    </div>
                </div>

                {/* Reward */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Reward Amount (USDC) *
                    </label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="number"
                            name="reward"
                            value={formData.reward}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0.5"
                            max={userBalance}
                            className="w-full pl-12 pr-4 py-3 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                            required
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        Minimum: $0.50 • Maximum: {formatCurrency(userBalance)}
                    </p>
                </div>

                {/* Preview */}
                {rewardAmount > 0 && (
                    <div className="glass-dark rounded-lg p-4 border border-white/10">
                        <h3 className="text-sm font-medium text-gray-300 mb-3">Preview</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Task Reward:</span>
                                <span className="text-white font-semibold">{formatCurrency(rewardAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">New Balance:</span>
                                <span className="text-white font-semibold">
                                    {formatCurrency(userBalance - rewardAmount)}
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
                            <span>Creating Task...</span>
                        </span>
                    ) : (
                        'Create Task'
                    )}
                </button>
            </form>
        </div>
    );
}
