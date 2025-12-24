'use client'
import { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, Lock, Users, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface College {
  _id: string;
  collegeName: string;
}

export default function CampusConfess() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [showColleges, setShowColleges] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  

  const handleCollegeClick = () => {
    // router.push(`/college/${id}`);
     router.push(`/college`);
  };

  const filteredColleges = colleges.filter(college =>
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
      <nav className="relative z-10 flex items-center justify-center px-8 py-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-8 h-8 text-yellow-500" />
          <span className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
            Campus Confess
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-16 pb-12 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-yellow-500 bg-opacity-10 backdrop-blur-md rounded-full border border-yellow-500 border-opacity-30">
          <span className="text-white font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Anonymous & Safe
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
          Your Campus.<br />
          <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">Your Stories.</span><br />
          Your Voice.
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Share your thoughts, confessions, and experiences anonymously with your college community. 
          Connect, relate, and discover you're not alone.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-1">100+</div>
            <div className="text-gray-400">Colleges</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-1">10K+</div>
            <div className="text-gray-400">Confessions</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-1">50K+</div>
            <div className="text-gray-400">Students</div>
          </div>
        </div>

        {/* Call to Action Button */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-2xl border border-yellow-500 border-opacity-30">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Share Your Story?</h2>
            <button 
              onClick={handleCollegeClick}
              className="px-12 py-5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold text-xl rounded-full hover:shadow-2xl hover:shadow-yellow-500/50 transition transform hover:scale-105 active:scale-95"
            >
              Find Your College
            </button>
          </div>
          </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur-xl rounded-3xl p-8 border border-yellow-500 border-opacity-30 text-center transform hover:scale-105 transition">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">100% Anonymous</h3>
            <p className="text-gray-400">
              Your identity is protected. Share freely without fear.
            </p>
          </div>

          <div className="bg-gray-900 bg-opacity-50 backdrop-blur-xl rounded-3xl p-8 border border-yellow-500 border-opacity-30 text-center transform hover:scale-105 transition">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Campus Community</h3>
            <p className="text-gray-400">
              Connect with students from your college only.
            </p>
          </div>

          <div className="bg-gray-900 bg-opacity-50 backdrop-blur-xl rounded-3xl p-8 border border-yellow-500 border-opacity-30 text-center transform hover:scale-105 transition">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Safe Space</h3>
            <p className="text-gray-400">
              Moderated community with respect and kindness.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 text-gray-500">
        <p>&copy; 2024 Campus Confess. Made with 💛 for students.</p>
      </footer>
    </div>
  );
}