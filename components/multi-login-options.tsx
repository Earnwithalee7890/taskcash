'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { User, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';
import FarcasterLogin from './farcaster-login';
import { motion, AnimatePresence } from 'framer-motion';

type LoginMethod = 'username' | 'wallet';

export default function MultiLoginOptions() {
    const [loginMethod, setLoginMethod] = useState<LoginMethod>('username');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            if (loginMethod === 'username') {
                const res = await fetch(`/api/auth/login-username?username=${inputValue}`);
                const data = await res.json();

                if (data.error) {
                    setError(data.error);
                    setLoading(false);
                    return;
                }

                setSuccess(true);
                setTimeout(async () => {
                    await signIn('credentials', {
                        message: 'Login via username',
                        signature: 'username-auth',
                        fid: data.fid,
                        username: data.username,
                        displayName: data.displayName,
                        pfpUrl: data.pfpUrl,
                        bio: data.bio,
                        redirect: true,
                        callbackUrl: '/',
                    });
                }, 800);
            } else if (loginMethod === 'wallet') {
                if (typeof window !== 'undefined' && (window as any).ethereum) {
                    const accounts = await (window as any).ethereum.request({
                        method: 'eth_requestAccounts'
                    });
                    const address = accounts[0];

                    const res = await fetch(`/api/auth/login-wallet?address=${address}`);
                    const data = await res.json();

                    if (data.error) {
                        setError(data.error);
                        setLoading(false);
                        return;
                    }

                    setSuccess(true);
                    setTimeout(async () => {
                        await signIn('credentials', {
                            message: 'Login via wallet',
                            signature: 'wallet-auth',
                            fid: data.fid,
                            username: data.username,
                            displayName: data.displayName,
                            pfpUrl: data.pfpUrl,
                            bio: data.bio,
                            redirect: true,
                            callbackUrl: '/',
                        });
                    }, 800);
                } else {
                    setError('No wallet detected. Please install MetaMask or another Web3 wallet.');
                    setLoading(false);
                }
            }
        } catch (err: any) {
            setError(err.message || 'Login failed. Please try again.');
            setLoading(false);
        }
    };

    const loginMethods = [
        {
            id: 'username' as LoginMethod,
            label: 'Username',
            icon: User,
            description: '@username',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            id: 'wallet' as LoginMethod,
            label: 'Wallet',
            icon: Wallet,
            description: 'Connect Web3',
            gradient: 'from-orange-500 to-red-500'
        },
    ];

    const currentMethod = loginMethods.find(m => m.id === loginMethod);

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="grid grid-cols-2 gap-3 p-2 glass rounded-xl border border-white/10">
                {loginMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                        <motion.button
                            key={method.id}
                            onClick={() => {
                                setLoginMethod(method.id);
                                setError('');
                                setInputValue('');
                                setSuccess(false);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative p-4 rounded-lg transition-all duration-300 overflow-hidden ${loginMethod === method.id
                                ? 'glass-dark'
                                : 'hover:bg-white/5'
                                }`}
                        >
                            {loginMethod === method.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-20 blur-xl`}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <div className="relative flex flex-col items-center gap-2">
                                <div className={`p-2 rounded-lg transition-all duration-300 ${loginMethod === method.id
                                    ? `bg-gradient-to-br ${method.gradient}`
                                    : 'bg-white/5'
                                    }`}>
                                    <Icon className={`w-5 h-5 ${loginMethod === method.id ? 'text-white' : 'text-gray-400'
                                        }`} />
                                </div>
                                <span className={`text-xs font-medium transition-colors ${loginMethod === method.id ? 'text-white' : 'text-gray-400'
                                    }`}>
                                    {method.label}
                                </span>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Login Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={loginMethod}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative glass p-8 rounded-2xl border border-white/10 overflow-hidden"
                >
                    {/* Background gradient effect */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${currentMethod?.gradient}`} />

                    <div className="space-y-6">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${currentMethod?.gradient} mb-2`}>
                                {currentMethod && <currentMethod.icon className="w-6 h-6 text-white" />}
                            </div>
                            <h3 className="text-xl font-bold text-white">
                                Sign in with {currentMethod?.label}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {currentMethod?.description}
                            </p>
                        </div>


                        <form onSubmit={handleLogin} className="space-y-4">
                            {loginMethod !== 'wallet' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        {loginMethod === 'username' ? 'Enter your username' : ''}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder={
                                                'dwr'
                                            }
                                            className="w-full px-4 py-3 pl-12 rounded-xl glass-dark border-2 border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all duration-300"
                                            required
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                            {currentMethod && (
                                                <currentMethod.icon className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        {error}
                                    </motion.div>
                                )}

                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        Success! Redirecting...
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                type="submit"
                                disabled={loading || success || (loginMethod !== 'wallet' && !inputValue)}
                                whileHover={{ scale: loading || success ? 1 : 1.02 }}
                                whileTap={{ scale: loading || success ? 1 : 0.98 }}
                                className={`w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${loading || success || (loginMethod !== 'wallet' && !inputValue)
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : `bg-gradient-to-r ${currentMethod?.gradient} text-white hover:opacity-90 shadow-lg hover:shadow-xl`
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        <span>Authenticating...</span>
                                    </>
                                ) : success ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span>Success!</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{loginMethod === 'wallet' ? 'Connect Wallet' : 'Sign In'}</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>
                        </form>

                    </div>
                </motion.div>
            </AnimatePresence>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-gray-500 text-center"
            >
                By signing in, you agree to our Terms of Service and Privacy Policy
            </motion.p>
        </div>
    );
}
