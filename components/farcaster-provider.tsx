'use client';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';

export default function FarcasterProvider({ children }: { children: React.ReactNode }) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false);

    useEffect(() => {
        const load = async () => {
            sdk.actions.ready();
        };
        if (sdk && !isSDKLoaded) {
            setIsSDKLoaded(true);
            load();
        }
    }, [isSDKLoaded]);

    return <>{children}</>;
}
