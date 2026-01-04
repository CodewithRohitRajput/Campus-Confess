'use client'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle, Send, ArrowLeft, Sparkles } from "lucide-react";

interface Confession{
    _id : string,
    title : string,
    description : string,
    type : string,
    upvotes : number,
    reports : number,
}

export default function Post(){
    const[name , setName] = useState<string>('')
    const router = useRouter();
    const[confession , setConfession]= useState<Confession>({
        _id : "",
        title : "",
        description : "",
        type : "confession",
        upvotes : 0,
        reports: 0
    });
    const params = useParams();
    const collegeId = params.collegeId;

    useEffect(()=>{
        const getCollegeName = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/college/getname/${collegeId}`);
            const data = await res.json();
            setName(data.name);
        }
        getCollegeName();
    },[])

    const handleSubmit = async() =>{
        if (!confession.title.trim() || !confession.description.trim()) {
            alert("Please fill in both title and description");
            return;
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/confession/${collegeId}/post` , {method : "POST" , credentials : "include", 
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(confession)
        })
        if(res.ok){
            router.push(`/college/${collegeId}`);
        }
    } 

    return(
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            {/* Header */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-yellow-500 border-opacity-20">
                <button 
                    onClick={() => router.push(`/college/${collegeId}`)}
                    className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to {name}</span>
                </button>
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-8 h-8 text-yellow-500" />
                    <span className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                        Campus Confess
                    </span>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-8 py-12">
                {/* Title */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4 px-4 py-2 bg-yellow-500 bg-opacity-10 backdrop-blur-md rounded-full border border-yellow-500 border-opacity-30">
                        <span className="text-white font-semibold flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Anonymous Post
                        </span>
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Share Your <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">Story</span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Your voice matters. Post anonymously to {name}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-2xl border border-yellow-500 border-opacity-30">
                    <div className="space-y-6">
                        {/* Title Input */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-3 text-lg">
                                Title
                            </label>
                            <input 
                                type="text" 
                                value={confession.title} 
                                placeholder="Give your confession a catchy title..." 
                                onChange={(e)=>{setConfession({...confession , title : e.target.value})}}
                                className="w-full px-6 py-4 rounded-2xl text-lg bg-gray-800 text-white border-2 border-yellow-500 border-opacity-30 focus:outline-none focus:border-yellow-500 transition placeholder-gray-500"
                                maxLength={100}
                            />
                            <p className="text-gray-500 text-sm mt-2">{confession.title.length}/100 characters</p>
                        </div>

                        {/* Description Textarea */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-3 text-lg">
                                Description
                            </label>
                            <textarea 
                                placeholder="Share your thoughts, experiences, or confessions..."
                                value={confession.description}
                                onChange={(e) => setConfession({...confession, description: e.target.value})}
                                rows={10}
                                className="w-full px-6 py-4 rounded-2xl text-lg bg-gray-800 text-white border-2 border-yellow-500 border-opacity-30 focus:outline-none focus:border-yellow-500 transition placeholder-gray-500 resize-none"
                                maxLength={2000}
                            />
                            <p className="text-gray-500 text-sm mt-2">{confession.description.length}/2000 characters</p>
                        </div>

                        {/* Submit Button */}
                        <button 
                            onClick={handleSubmit}
                            className="w-full px-8 py-5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold text-xl rounded-2xl hover:shadow-2xl hover:shadow-yellow-500/50 transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Send className="w-6 h-6" />
                            Post Confession
                        </button>

                        {/* Privacy Note */}
                        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-yellow-500 border-opacity-20">
                            <p className="text-gray-400 text-sm text-center">
                                🔒 Your identity is completely anonymous. No personal information is stored or shared.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}