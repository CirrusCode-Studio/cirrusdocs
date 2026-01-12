'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, FileQuestion, Terminal } from 'lucide-react';
import Background from '@/components/layout/Background';

const NotFoundPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isSimulating, setIsSimulating] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchValue.trim()) return;
        setIsSimulating(true);
        setTimeout(() => setIsSimulating(false), 2000);
    };

    return (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <Background />

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 1.2, bounce: 0.4 }}
            className="max-w-2xl w-full"
        >
            {/* Floating 404 Graphics */}
            <div className="relative mb-8">
            <motion.h1
                animate={{ 
                y: [0, -10, 0],
                filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-[12rem] md:text-[16rem] font-bold leading-none select-none mesh-gradient-text opacity-90 tracking-tighter"
            >
                404
            </motion.h1>
            
            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <motion.div 
                animate={{ opacity: [0.1, 0.3, 0.1], rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 border border-blue-500/10 rounded-full" 
                />
                <motion.div 
                animate={{ opacity: [0.1, 0.2, 0.1], rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 border border-blue-400/5 rounded-full" 
                />
            </div>
            </div>

            {/* Copy */}
            <div className="space-y-4 mb-12">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2 text-blue-400 font-mono text-sm tracking-widest uppercase mb-2"
            >
                <Terminal size={14} />
                <span>System Alert</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Context Not Found.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
                It seems the page you are looking for hasn&apos;t been indexed in our system. 
                It might have been moved or outside the current knowledge window.
            </p>
            </div>

            {/* Mock Search Bar */}
            <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            onSubmit={handleSearch}
            className="relative group max-w-md mx-auto mb-12"
            >
            <div className="absolute inset-0 bg-blue-500/10 blur-xl group-focus-within:bg-blue-500/20 transition-all duration-500 rounded-2xl" />
            <div className="relative bg-[#121212]/80 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl flex items-center transition-all duration-300 group-focus-within:border-blue-500/50">
                <div className="pl-4 text-gray-500">
                <Search size={20} />
                </div>
                <input 
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Try searching for a valid page..."
                className="w-full bg-transparent px-4 py-3 outline-none text-white placeholder-gray-500"
                />
                <button 
                type="submit"
                disabled={isSimulating}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 overflow-hidden min-w-25 justify-center"
                >
                <AnimatePresence mode="wait">
                    {isSimulating ? (
                    <motion.div
                        key="sim"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        exit={{ y: -20 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-xs">Querying</span>
                    </motion.div>
                    ) : (
                    <motion.span
                        key="search"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        exit={{ y: -20 }}
                    >
                        Search
                    </motion.span>
                    )}
                </AnimatePresence>
                </button>
            </div>
            </motion.form>

            {/* Actions */}
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
            >
            <a 
                href="#/"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
            >
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Return to Dashboard
            </a>

            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 group">
                <FileQuestion className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span className="border-b border-transparent group-hover:border-gray-400">Report a missing file</span>
            </button>
            </motion.div>

            {/* Context Footer */}
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.5 }}
            className="mt-20 text-[10px] uppercase tracking-[0.3em] font-mono text-gray-500"
            >
            Session ID: {Math.random().toString(36).substring(7).toUpperCase()} 
            </motion.div>
        </motion.div>
        </div>
    );
};

export default NotFoundPage;
