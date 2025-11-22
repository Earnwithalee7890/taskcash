'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface MindSharePost {
    id: string;
    username: string;
    content: string;
    likes: number;
    comments: number;
    shares: number;
    createdAt: string;
}

export default function MindSharePage() {
    const [posts, setPosts] = useState<MindSharePost[]>([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated data - in production, fetch from API
        setTimeout(() => {
            setPosts([
                {
                    id: '1',
                    username: 'earnwithalee',
                    content: 'Just earned my first $50 on Social Rewards! This platform is amazing 🚀',
                    likes: 24,
                    comments: 5,
                    shares: 3,
                    createdAt: new Date(Date.now() - 3600000).toISOString(),
                },
                {
                    id: '2',
                    username: 'cryptoenthusiast',
                    content: 'Love how easy it is to create tasks and reward the community. Great work!',
                    likes: 18,
                    comments: 2,
                    shares: 1,
                    createdAt: new Date(Date.now() - 7200000).toISOString(),
                },
                {
                    id: '3',
                    username: 'contentcreator',
                    content: 'The engagement quality metrics are really helpful for understanding my audience better.',
                    likes: 31,
                    comments: 8,
                    shares: 5,
                    createdAt: new Date(Date.now() - 10800000).toISOString(),
                },
            ]);
            setLoading(false);
        }, 600);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        const post: MindSharePost = {
            id: Date.now().toString(),
            username: 'earnwithalee',
            content: newPost,
            likes: 0,
            comments: 0,
            shares: 0,
            createdAt: new Date().toISOString(),
        };

        setPosts([post, ...posts]);
        setNewPost('');
    };

    if (loading) {
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="glass rounded-2xl p-6 animate-pulse">
                    <div className="h-32 bg-white/10 rounded-lg"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
                    <MessageSquare className="w-8 h-8 text-accent-400" />
                    <span>MindShare</span>
                </h1>
            </div>

            {/* Create Post */}
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 border border-white/10">
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thoughts with the community..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent-500 transition-colors resize-none mb-4"
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!newPost.trim()}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${newPost.trim()
                                ? 'gradient-accent text-white hover:opacity-90'
                                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <Send className="w-5 h-5" />
                        <span>Share</span>
                    </button>
                </div>
            </form>

            {/* Posts Feed */}
            <div className="space-y-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all animate-slide-up"
                    >
                        {/* Post Header */}
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-white font-bold">
                                {post.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-white font-semibold">@{post.username}</p>
                                <p className="text-xs text-gray-400">
                                    {formatRelativeTime(post.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* Post Content */}
                        <p className="text-gray-200 mb-4 leading-relaxed">{post.content}</p>

                        {/* Post Actions */}
                        <div className="flex items-center space-x-6 pt-4 border-t border-white/10">
                            <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
                                <Heart className="w-5 h-5" />
                                <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                                <MessageCircle className="w-5 h-5" />
                                <span className="text-sm">{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                                <Share2 className="w-5 h-5" />
                                <span className="text-sm">{post.shares}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
