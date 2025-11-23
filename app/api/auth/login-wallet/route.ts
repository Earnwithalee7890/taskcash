import { neynarClient } from '@/lib/neynar';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
        return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    try {
        // Search for user by verified address
        const response: any = await (neynarClient as any).fetchBulkUsersByEthOrSolAddress([address]);

        if (!response || Object.keys(response).length === 0) {
            return NextResponse.json({
                error: 'No Farcaster account found for this wallet. Please verify your wallet on Farcaster first.'
            }, { status: 404 });
        }

        // Get the first user associated with this address
        const user: any = Object.values(response)[0][0];

        if (!user) {
            return NextResponse.json({
                error: 'No Farcaster account found for this wallet.'
            }, { status: 404 });
        }

        return NextResponse.json({
            fid: user.fid.toString(),
            username: user.username,
            displayName: user.display_name || user.username,
            pfpUrl: user.pfp_url || '',
            bio: user.profile?.bio?.text || '',
        });
    } catch (error) {
        console.error('Error fetching user by wallet:', error);
        return NextResponse.json({
            error: 'Failed to fetch user. Make sure your wallet is verified on Farcaster.'
        }, { status: 500 });
    }
}
