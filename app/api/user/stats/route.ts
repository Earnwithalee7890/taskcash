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

        const user: any = response.users[0];

        // Use real Neynar Score if available, otherwise fallback to experimental or calculation
        // The API response shows 'score' and 'experimental.neynar_user_score'
        const score = user.score || (user.experimental?.neynar_user_score ? user.experimental.neynar_user_score * 100 : 0);

        return NextResponse.json({
            followers: user.follower_count,
            following: user.following_count,
            verifications: user.verifications,
            activeStatus: user.active_status || 'inactive', // active_status might not be directly on user object in all responses
            powerBadge: user.power_badge || false,
            score: Math.round(score),
        });
    } catch (error) {
        console.error('Error fetching user stats:', error);
        return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 });
    }
}
