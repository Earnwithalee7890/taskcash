import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const apiKey = process.env.NEYNAR_API_KEY;

        // During build time or if API key is missing, return a mock nonce to prevent build failure
        if (!apiKey || apiKey === 'NEYNAR_API_DOCS') {
            console.warn('NEYNAR_API_KEY missing, returning mock nonce for build');
            return NextResponse.json({ nonce: 'mock-nonce-for-build' });
        }

        const response = await fetch('https://api.neynar.com/v2/farcaster/login/nonce/', {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch nonce');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching nonce:', error);
        return NextResponse.json({ error: 'Failed to fetch nonce' }, { status: 500 });
    }
}
