'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, ListTodo, DollarSign, TrendingUp, MessageSquare, User } from 'lucide-react';
import { useSession } from 'next-auth/react';

const navItems = [
    { href: '/', label: 'Hub', icon: Home },
    { href: '/tasks', label: 'Tasks', icon: ListTodo },
    { href: '/earnings', label: 'Earnings', icon: DollarSign },
    { href: '/boosts', label: 'Boosts', icon: TrendingUp },
    { href: '/mindshare', label: 'MindShare', icon: MessageSquare },
    { href: '/account', label: 'Account', icon: User },
];

export default function Navigation() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <nav className="sticky top-0 z-50 glass-dark border-b border-white/10">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <Image
                                src="/logo.png"
                                alt="TaskCash Logo"
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        </div>
                        <span className="text-xl font-bold text-white hidden sm:block">
                            TaskCash
                        </span>
                    </Link>

                    {/* Navigation Links - Only show if authenticated */}
                    {session && (
                        <div className="flex items-center space-x-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-white/20 text-white'
                                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="hidden md:block text-sm font-medium">
                                            {item.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
