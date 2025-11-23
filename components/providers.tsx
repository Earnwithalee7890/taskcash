'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useMemo } from 'react';
import { AuthKitProvider } from '@farcaster/auth-kit';
import '@farcaster/auth-kit/styles.css';

export function Providers({ children }: { children: ReactNode }) {
    const config = useMemo(() => ({
        rpcUrl: 'https://mainnet.optimism.io',
        domain: typeof window !== 'undefined' ? window.location.hostname : 'localhost',
        siweUri: typeof window !== 'undefined' ? `${window.location.origin}/login` : 'http://localhost:3000/login',
    }), []);

    return (
        <AuthKitProvider config={config}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </AuthKitProvider>
    );
}
