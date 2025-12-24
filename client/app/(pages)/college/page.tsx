'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { Search, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';

interface College {
    _id: string,
    collegeName: string;
}

export default function College() {
    const [name, setName] = useState<College[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        const getCollege = async () => {
            const res = await fetch('http://localhost:8000/college/get', { method: "GET", credentials: "include" });
            const data = await res.json();
            setName(data)
        }

        getCollege();
    }, [])

    const handleClick = (id: string) => {
        router.push(`/college/${id}`);
    }

    const filteredColleges = name.filter(college =>
        college.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            {/* Header */}
            <nav className="relative z-10 flex items-center justify-center px-8 py-6 border-b border-yellow-500 border-opacity-20">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-8 h-8 text-yellow-500" />
                    <span className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                        Campus Confess
                    </span>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-8 py-12">
                {/* Title */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Select Your <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">College</span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Find your college and start sharing your stories
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for your college..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 rounded-2xl text-lg bg-gray-800 text-white border-2 border-yellow-500 border-opacity-30 focus:outline-none focus:border-yellow-500 transition placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* College List */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 shadow-2xl border border-yellow-500 border-opacity-30">
                    {filteredColleges.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredColleges.map((college) => (
                                <button
                                    key={college._id}
                                    onClick={() => handleClick(college._id)}
                                    className="group bg-gray-800 hover:bg-gray-700 rounded-2xl p-6 text-left transition transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 border border-yellow-500 border-opacity-20 hover:border-opacity-50"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center text-black font-bold text-2xl flex-shrink-0">
                                                {college.collegeName.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition truncate">
                                                    {college.collegeName}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                                                    <span className="flex items-center gap-1">
                                                        <MessageCircle className="w-4 h-4" />
                                                        {Math.floor(Math.random() * 500) + 100}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <TrendingUp className="w-4 h-4" />
                                                        Active
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-6 h-6 text-yellow-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-white mb-2">No colleges found</h3>
                            <p className="text-gray-400">Try searching with a different term</p>
                        </div>
                    )}
                </div>

                {/* Stats */}
                {filteredColleges.length > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Showing <span className="text-yellow-500 font-semibold">{filteredColleges.length}</span> of <span className="text-yellow-500 font-semibold">{name.length}</span> colleges
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}