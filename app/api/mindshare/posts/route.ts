import { neynarClient } from '@/lib/neynar';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');

    if (!fid) {
        return NextResponse.json({ error: 'FID is required' }, { status: 400 });
    }

    try {
        // Fetch user's recent casts from Neynar using the correct SDK method
        const response = await neynarClient.fetchCastsForUser({ fid: parseInt(fid), limit: 10 });

        const posts = response.casts.map((cast: any) => ({
            id: cast.hash,
            username: cast.author.username,
            content: cast.text,
            likes: cast.reactions.likes_count,
            comments: cast.replies.count,
            shares: cast.reactions.recasts_count,
            createdAt: cast.timestamp,
        }));

        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return NextResponse.json({ error: 'Failed to fetch user posts' }, { status: 500 });
    }
}
