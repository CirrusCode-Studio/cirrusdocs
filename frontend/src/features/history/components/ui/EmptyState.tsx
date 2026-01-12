'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { History, Plus } from 'lucide-react';

const EmptyState = () => {
    return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-6"
    >
        <div className="w-20 h-20 rounded-full bg-white/3 border border-white/5 flex items-center justify-center relative overflow-hidden group">
            <History size={32} className="text-white/20 group-hover:text-blue-400/50 transition-colors" />
            <div className="absolute inset-0 bg-blue-500/5 blur-xl group-hover:opacity-100 opacity-0 transition-opacity" />
        </div>
        
        <div className="space-y-2 max-w-xs">
            <h3 className="text-lg font-semibold text-white/80">No conversations yet</h3>
            <p className="text-sm text-white/30 leading-relaxed">
            Your history will appear here once you start chatting. Our AI remembers your context across sessions.
            </p>
        </div>

        <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/10 hover:border-white/20 transition-all active:scale-95">
            <Plus size={18} />
            Start New Chat
        </button>
    </motion.div>
  );
};

export default EmptyState;
