'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

interface Task {
    id: string;
    title: string;
    description: string;
    link: string;
    reward: number;
    creator: string;
    createdAt: string;
    status: string;
}

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated data - in production, fetch from API
        setTimeout(() => {
            setTasks([
                {
                    id: '1',
                    title: 'Follow on Warpcast',
                    description: 'Follow @earnwithalee on Warpcast and like the latest cast',
                    link: 'https://warpcast.com/earnwithalee',
                    reward: 2.50,
                    creator: 'earnwithalee',
                    createdAt: new Date(Date.now() - 3600000).toISOString(),
                    status: 'active',
                },
                {
                    id: '2',
                    title: 'Read Article & Comment',
                    description: 'Read the latest blog post and leave a thoughtful comment',
                    link: 'https://example.com/blog/latest',
                    reward: 5.00,
                    creator: 'contentcreator',
                    createdAt: new Date(Date.now() - 7200000).toISOString(),
                    status: 'active',
                },
                {
                    id: '3',
                    title: 'Join Discord Community',
                    description: 'Join our Discord server and introduce yourself in #introductions',
                    link: 'https://discord.gg/example',
                    reward: 3.75,
                    creator: 'communitymod',
                    createdAt: new Date(Date.now() - 10800000).toISOString(),
                    status: 'active',
                },
                {
                    id: '4',
                    title: 'Share on Twitter',
                    description: 'Share our latest announcement on Twitter with the hashtag #SocialRewards',
                    link: 'https://twitter.com/intent/tweet?text=Check%20out%20Social%20Rewards',
                    reward: 4.25,
                    creator: 'marketing',
                    createdAt: new Date(Date.now() - 14400000).toISOString(),
                    status: 'active',
                },
            ]);
            setLoading(false);
        }, 700);
    }, []);

    const handleCompleteTask = async (taskId: string, link: string) => {
        // Open the link
        window.open(link, '_blank');

        // Simulate task completion after a delay
        setTimeout(() => {
            alert('Task completed! Reward added to your balance.');
            // In production, call API to mark task as completed
        }, 2000);
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="glass rounded-xl p-6 animate-pulse">
                        <div className="h-24 bg-white/10 rounded-lg"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="glass rounded-xl p-12 text-center border border-white/10">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Tasks Available</h3>
                <p className="text-gray-400">Check back later for new earning opportunities!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="glass rounded-xl p-6 border border-white/10 card-hover animate-slide-up"
                >
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-1">{task.title}</h3>
                            <p className="text-sm text-gray-400">by @{task.creator}</p>
                        </div>
                        <div className="glass-dark rounded-lg px-3 py-2 border border-green-500/30">
                            <p className="text-lg font-bold text-green-400">
                                {formatCurrency(task.reward)}
                            </p>
                        </div>
                    </div>

                    {/* Task Description */}
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                        {task.description}
                    </p>

                    {/* Task Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{formatRelativeTime(task.createdAt)}</span>
                        </div>

                        <button
                            onClick={() => handleCompleteTask(task.id, task.link)}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>Start Task</span>
                        </button>
                    </div>
                </div>
            ))}

            {/* Create Task Card */}
            <Link
                href="/tasks/create"
                className="glass rounded-xl p-6 border-2 border-dashed border-white/20 hover:border-primary-500/50 transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] group"
            >
                <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <DollarSign className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Create a Task</h3>
                <p className="text-sm text-gray-400 text-center">
                    Post your own task and reward others
                </p>
            </Link>
        </div>
    );
}
