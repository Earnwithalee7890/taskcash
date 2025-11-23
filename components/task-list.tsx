'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ExternalLink, Clock, DollarSign, Plus } from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

interface Task {
    id: string;
    title: string;
    description: string;
    link: string;
    reward: number;
    creator: {
        fid: number;
        username: string;
    };
    createdAt: string;
    status: string;
    completedBy: number[];
}

export default function TaskList() {
    const { data: session } = useSession();
    const user = session?.user as any;
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch tasks from API
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                if (data.tasks) {
                    setTasks(data.tasks);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch tasks:', err);
                setLoading(false);
            });
    }, []);

    const handleCompleteTask = async (task: Task) => {
        if (!user?.fid) {
            alert('Please login to complete tasks');
            return;
        }

        // Check if already completed
        if (task.completedBy.includes(user.fid)) {
            alert('You already completed this task!');
            return;
        }

        // Open the task link
        window.open(task.link, '_blank');

        // Mark as completed (in production, verify completion)
        setTimeout(() => {
            alert(`Task completed! ${formatCurrency(task.reward)} will be added to your earnings.`);
            // TODO: Call API to mark task complete and add earnings
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Create Task Card - Always First */}
            <Link
                href="/tasks/create"
                className="glass rounded-xl p-6 border-2 border-dashed border-primary-500/30 hover:border-primary-500/60 transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] group"
            >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Create a Task</h3>
                <p className="text-sm text-gray-400 text-center">
                    Post your own task and reward others
                </p>
            </Link>

            {/* User-Created Tasks */}
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <div
                        key={task.id}
                        className="glass rounded-xl p-6 border border-white/10 card-hover animate-slide-up"
                    >
                        {/* Task Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-1">{task.title}</h3>
                                <p className="text-sm text-gray-400">by @{task.creator.username}</p>
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
                                onClick={() => handleCompleteTask(task)}
                                disabled={task.completedBy.includes(user?.fid)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-opacity ${task.completedBy.includes(user?.fid)
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'gradient-primary text-white hover:opacity-90'
                                    }`}
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>{task.completedBy.includes(user?.fid) ? 'Completed' : 'Start Task'}</span>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="glass rounded-xl p-12 text-center border border-white/10 col-span-full">
                    <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Tasks Yet</h3>
                    <p className="text-gray-400 mb-4">Be the first to create a task and reward the community!</p>
                    <Link
                        href="/tasks/create"
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Create First Task</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
