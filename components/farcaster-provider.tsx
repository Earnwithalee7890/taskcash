'use client';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import { signIn, useSession } from 'next-auth/react';

export default function FarcasterProvider({ children }: { children: React.ReactNode }) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        const initializeAndAuthenticate = async () => {
            if (isSDKLoaded || isAuthenticating) return;

            try {
                setIsAuthenticating(true);

                // Initialize the Frame SDK
                await sdk.actions.ready();
                console.log('Frame SDK initialized');

                // Get the context to check if we're in a frame
                const context = await sdk.context;
                console.log('Frame context:', context);

                // If we're in a frame and have user data and not already authenticated
                if (context?.user && !session && status !== 'loading') {
                    console.log('Auto-authenticating user from frame:', context.user.username);

                    // Fetch user details from Neynar
                    const userResponse = await fetch(`/api/auth/login-fid?fid=${context.user.fid}`);
                    const userData = await userResponse.json();

                    if (!userData.error) {
                        // Auto-login with the user data
                        await signIn('credentials', {
                            message: 'Auto-login from Farcaster Frame',
                            signature: 'frame-auth',
                            fid: userData.fid,
                            username: userData.username,
                            displayName: userData.displayName,
                            pfpUrl: userData.pfpUrl,
                            bio: userData.bio,
                            redirect: false,
                        });
                        console.log('Auto-login successful for:', userData.username);
                    }
                }

                setIsSDKLoaded(true);
            } catch (error) {
                console.log('Frame SDK not available or authentication failed, running in browser mode:', error);
                setIsSDKLoaded(true);
            } finally {
                setIsAuthenticating(false);
            }
        };

        // Only run if not authenticated and not already loading
        if (!session && status !== 'loading' && !isSDKLoaded && !isAuthenticating) {
            initializeAndAuthenticate();
        }
    }, [session, status, isSDKLoaded, isAuthenticating]);

    return <>{children}</>;
}
