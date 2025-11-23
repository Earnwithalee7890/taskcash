'use client';

import { SignInButton, StatusAPIResponse } from '@farcaster/auth-kit';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';

export default function FarcasterLogin() {
    const { data: session } = useSession();
    const [error, setError] = useState(false);

    const getNonce = useCallback(async () => {
        const nonce = await fetch('/api/auth/csrf').then((res) => res.json());
        return nonce.csrfToken;
    }, []);

    const handleSuccess = useCallback(
        async (res: StatusAPIResponse) => {
            if (res.state === 'completed') {
                await signIn('credentials', {
                    message: res.message,
                    signature: res.signature,
                    fid: res.fid,
                    username: res.username,
                    displayName: res.displayName,
                    pfpUrl: res.pfpUrl,
                    bio: res.bio,
                    redirect: true,
                    callbackUrl: '/account',
                });
            }
        },
        []
    );

    if (session) {
        return (
            <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            >
                Sign Out
            </button>
        );
    }

    return (
        <div className="farcaster-login-wrapper">
            <SignInButton
                onSuccess={handleSuccess}
                onError={() => setError(true)}
                onSignOut={() => signOut()}
            />
            {error && <p className="text-red-400 text-sm mt-2">Failed to sign in</p>}
        </div>
    );
}
