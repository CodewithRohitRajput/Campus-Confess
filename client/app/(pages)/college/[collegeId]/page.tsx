'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, ThumbsUp, Flag, PenSquare, TrendingUp, Heart, MessageSquare } from 'lucide-react';

interface Confession {
    _id: string,
    collegeId: string,
    title: string,
    description: string,
    type: string,
    upvotes: number,
    reports: number,
}

export default function CollegeId() {
    const [confession, setConfession] = useState<Confession[]>([]);
    const [collegeName, setCollegeName] = useState<string>("")
    const params = useParams();
    const collegeId = params.collegeId as string;
    const router = useRouter();

    useEffect(() => {
        const getConfessions = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/confession/${collegeId}/get`, { method: "GET", credentials: "include" });
            const data = await res.json();
            setConfession(data.allConfessions);
        }

        const getCollegeName = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/college/getname/${collegeId}`, { method: "GET" })
            const data = await res.json();
            setCollegeName(data.name);
        }
        getCollegeName();
        getConfessions();

    }, []);

    const handleClick = async () => {
        router.push(`/college/${collegeId}/post`)
    }

    const getTypeColor = (type: string) => {
        const types: { [key: string]: string } = {
            'crush': 'bg-pink-500',
            'confession': 'bg-purple-500',
            'rant': 'bg-red-500',
            'advice': 'bg-blue-500',
            'appreciation': 'bg-green-500',
            'question': 'bg-orange-500',
        };
        return types[type.toLowerCase()] || 'bg-gray-500';
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            {/* Header */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-yellow-500 border-opacity-20">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-8 h-8 text-yellow-500" />
                    <span className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                        Campus Confess
                    </span>
                </div>
                <button
                    onClick={handleClick}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-full hover:shadow-2xl hover:shadow-yellow-500/50 transition transform hover:scale-105 active:scale-95"
                >
                    <PenSquare className="w-5 h-5" />
                    Post Confession
                </button>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-8 py-12">
                {/* College Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4 px-6 py-2 bg-yellow-500 bg-opacity-10 backdrop-blur-md rounded-full border border-yellow-500 border-opacity-30">
                        <span className="text-white font-semibold flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            {confession.length} Confessions
                        </span>
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4">
                        {collegeName}
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Share your thoughts anonymously with your campus community
                    </p>
                </div>

                {/* Confessions List */}
                <div className="space-y-6">
                    {confession.length > 0 ? (
                        confession.slice().reverse().map((c, i) => (
                            <div
                                key={c._id}
                                className="group bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 shadow-2xl border border-yellow-500 border-opacity-20 hover:border-opacity-50 transition transform hover:scale-[1.02]"
                            >
                                {/* Confession Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                                            #{i + 1}
                                        </div>
                                        <span className={`px-3 py-1 ${getTypeColor(c.type)} bg-opacity-20 text-${c.type === 'crush' ? 'pink' : c.type === 'confession' ? 'purple' : c.type === 'rant' ? 'red' : c.type === 'advice' ? 'blue' : c.type === 'appreciation' ? 'green' : 'orange'}-400 rounded-full text-sm font-semibold border border-current border-opacity-30`}>
                                            {c.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Confession Content */}
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-500 transition">
                                        {c.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {c.description}
                                    </p>
                                </div>

                                {/* Confession Stats */}
                                <div className="flex items-center gap-6 pt-4 border-t border-gray-800">
                                    <button className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition group/btn">
                                        <ThumbsUp className="w-5 h-5 group-hover/btn:scale-110 transition" />
                                        <span className="font-semibold">{c.upvotes}</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition group/btn">
                                        <MessageSquare className="w-5 h-5 group-hover/btn:scale-110 transition" />
                                        <span className="font-semibold">Comment</span>
                                    </button>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Flag className="w-5 h-5" />
                                        <span className="text-sm">{c.reports} reports</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                                <MessageCircle className="w-12 h-12 text-black" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-3">No Confessions Yet</h3>
                            <p className="text-gray-400 text-lg mb-6">Be the first to share your story!</p>
                            <button
                                onClick={handleClick}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-full hover:shadow-2xl hover:shadow-yellow-500/50 transition transform hover:scale-105"
                            >
                                <PenSquare className="w-5 h-5" />
                                Post First Confession
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}