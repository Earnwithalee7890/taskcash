import { neynarClient } from '@/lib/neynar';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');

    if (!fid) {
        return NextResponse.json({ error: 'FID is required' }, { status: 400 });
    }

    try {
        const response = await neynarClient.fetchBulkUsers({ fids: [parseInt(fid)] });

        if (!response.users || response.users.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const user: any = response.users[0];

        return NextResponse.json({
            fid: user.fid.toString(),
            username: user.username,
            displayName: user.display_name || user.username,
            pfpUrl: user.pfp_url || '',
            bio: user.profile?.bio?.text || '',
        });
    } catch (error) {
        console.error('Error fetching user by FID:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}
