import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const apiKey = process.env.NEYNAR_API_KEY || 'NEYNAR_API_DOCS';

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
