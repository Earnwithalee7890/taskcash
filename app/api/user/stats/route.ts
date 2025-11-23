import { neynarClient } from '@/lib/neynar';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');

    if (!fid) {
        return NextResponse.json({ error: 'FID is required' }, { status: 400 });
    }

    try {
        // Fetch user details from Neynar
        const response = await neynarClient.fetchBulkUsers({ fids: [parseInt(fid)] });

        if (!response.users || response.users.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const user = response.users[0];

        // Calculate a "Neynar Score" based on available metrics (simulated for now as Neynar Score isn't a direct field)
        // In a real app, you might fetch this from a specific endpoint or calculate it
        const score = Math.min(100, (user.follower_count / 100) + (user.active_status === 'active' ? 50 : 0));

        return NextResponse.json({
            followers: user.follower_count,
            following: user.following_count,
            verifications: user.verifications,
            activeStatus: user.active_status,
            powerBadge: user.power_badge,
            score: Math.round(score),
            // Neynar user object doesn't always have total casts count directly in bulk fetch
            // We might need a separate call if strictly required, but for now we'll return what we have
        });
    } catch (error) {
        console.error('Error fetching user stats:', error);
        return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 });
    }
}
