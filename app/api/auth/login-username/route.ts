import { neynarClient } from '@/lib/neynar';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    let username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // Remove @ if present
    username = username.replace('@', '');

    try {
        const response = await (neynarClient as any).lookupUserByUsername({ username });

        if (!response.result || !response.result.user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const user: any = response.result.user;

        return NextResponse.json({
            fid: user.fid.toString(),
            username: user.username,
            displayName: user.display_name || user.username,
            pfpUrl: user.pfp_url || '',
            bio: user.profile?.bio?.text || '',
        });
    } catch (error) {
        console.error('Error fetching user by username:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}
