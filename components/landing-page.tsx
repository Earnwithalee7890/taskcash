'use client';

import FarcasterLogin from '@/components/farcaster-login';
import { Wallet, TrendingUp, CheckCircle } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 animate-fade-in">
            <div className="space-y-6 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 animate-gradient-x pb-2">
                    Earn While You Engage
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                    TaskCash is the premier platform for Farcaster users to earn rewards, boost their reach, and grow their audience.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                <div className="glass p-6 rounded-2xl border border-white/10 hover:border-primary-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4 text-primary-400">
                        <Wallet className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Earn Crypto</h3>
                    <p className="text-gray-400 text-sm">Complete simple tasks and get paid directly to your wallet.</p>
                </div>

                <div className="glass p-6 rounded-2xl border border-white/10 hover:border-accent-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-4 text-accent-400">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Boost Reach</h3>
                    <p className="text-gray-400 text-sm">Amplify your casts and grow your Farcaster following.</p>
                </div>

                <div className="glass p-6 rounded-2xl border border-white/10 hover:border-green-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 text-green-400">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Verify Impact</h3>
                    <p className="text-gray-400 text-sm">Track your performance with real-time analytics.</p>
                </div>
            </div>

            <div className="glass p-8 rounded-3xl border border-white/10 w-full max-w-md">
                <p className="text-white font-medium mb-6">Connect your Farcaster account to get started</p>
                <div className="flex justify-center">
                    <FarcasterLogin />
                </div>
            </div>
        </div>
    );
}
