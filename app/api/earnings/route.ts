import { NextResponse } from 'next/server';

// In-memory earnings storage (replace with database in production)
const userEarnings: { [fid: string]: any } = {};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');

    if (!fid) {
        return NextResponse.json({ error: 'FID is required' }, { status: 400 });
    }

    // Get or initialize earnings for user
    const earnings = userEarnings[fid] || {
        total: 0,
        pending: 0,
        paid: 0,
        history: []
    };

    return NextResponse.json(earnings);
}

export async function POST(request: Request) {
    try {
        const { fid, taskId, amount } = await request.json();

        if (!fid || !taskId || !amount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Initialize if doesn't exist
        if (!userEarnings[fid]) {
            userEarnings[fid] = {
                total: 0,
                pending: 0,
                paid: 0,
                history: []
            };
        }

        // Add earning
        userEarnings[fid].total += amount;
        userEarnings[fid].pending += amount;
        userEarnings[fid].history.push({
            taskId,
            amount,
            date: new Date().toISOString(),
            status: 'pending'
        });

        return NextResponse.json(userEarnings[fid]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add earnings' }, { status: 500 });
    }
}
