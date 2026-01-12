'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Source } from '../../types';

interface SourceBadgeProps {
    source: Source;
    index: number;
}

export const SourceBadge = ({ source, index }: SourceBadgeProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative inline-block">
        <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/40 transition-all duration-300 group cursor-default"
        >
            <FileText size={12} className="text-blue-400 group-hover:text-blue-300" />
            <span className="text-xs font-medium text-slate-300 group-hover:text-white">
            [{index + 1}] {source.title}
            </span>
        </motion.button>

        <AnimatePresence>
            {isHovered && (
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute bottom-full left-0 mb-3 w-64 p-3 glass rounded-xl z-50 pointer-events-none"
            >
                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Source Snippet</div>
                <div className="text-xs text-slate-200 leading-relaxed italic">
                &quot;{source.snippet}&quot;
                </div>
                <div className="absolute -bottom-1.5 left-6 w-3 h-3 glass rotate-45 border-t-0 border-l-0"></div>
            </motion.div>
            )}
        </AnimatePresence>
    </div>
    );
};
