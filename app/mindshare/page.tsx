'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { MessageSquare, Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import FarcasterLogin from '@/components/farcaster-login';

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
    const { data: session } = useSession();
    const [posts, setPosts] = useState<MindSharePost[]>([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user?.fid) {
            fetch(`/api/mindshare/posts?fid=${session.user.fid}`)
                .then(res => res.json())
                .then(data => {
                    if (data.posts) {
                        setPosts(data.posts);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch posts:', err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [session?.user?.fid]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.trim()) return;
        // In a real app, this would POST to an API to create a cast via Neynar
        alert('Posting to Farcaster is not yet implemented in this demo.');
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

    if (!session) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center space-y-6 animate-fade-in">
                <div className="glass p-8 rounded-2xl border border-white/10">
                    <h1 className="text-3xl font-bold text-white mb-4">MindShare</h1>
                    <p className="text-gray-400 mb-8">
                        Connect your Farcaster account to view your recent activity and engagement.
                    </p>
                    <div className="flex justify-center">
                        <FarcasterLogin />
                    </div>
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
                {posts.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                        No recent posts found.
                    </div>
                ) : (
                    posts.map((post) => (
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
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <Heart className="w-5 h-5" />
                                    <span className="text-sm">{post.likes}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="text-sm">{post.comments}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <Share2 className="w-5 h-5" />
                                    <span className="text-sm">{post.shares}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
