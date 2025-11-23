import { NextResponse } from 'next/server';

// In-memory storage for MVP (replace with database in production)
let tasks: any[] = [];

export async function GET() {
    return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
    try {
        const task = await request.json();

        const newTask = {
            ...task,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: 'open',
            completedBy: []
        };

        tasks.push(newTask);

        return NextResponse.json({ task: newTask });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}
