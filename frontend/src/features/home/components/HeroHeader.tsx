'use client'
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const HeroHeader = ({userName}: {userName: string}) => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-6 lg:py-8"
        >
            <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Good morning, <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">{userName}</span>
            </h1>
            <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>AI Engine: Online & Ready</span>
            </div>
            </div>

            <div className="flex items-center gap-3">
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                type="text" 
                placeholder="Search documents or chats..."
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-sm"
                />
            </div>
            </div>
        </motion.div>
    )
}

export default HeroHeader;