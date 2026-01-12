'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, MoreVertical, Trash2, Pin, ArrowRight, ExternalLink, FileText } from 'lucide-react';
import { ChatSession } from '../types';

interface HistoryItemProps {
    chat: ChatSession;
    index: number;
    onDelete: (id: string) => void;
    onTogglePin: (id: string) => void;
    viewMode: 'list' | 'grid';
}

export const HistoryItem = ({ chat, index, onDelete, onTogglePin, viewMode }: HistoryItemProps) => {
    const [showActions, setShowActions] = useState(false);

    const isGrid = viewMode === 'grid';

    return (
    <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ 
            delay: index * 0.01, 
            duration: 0.15,
            layout: { duration: 0.2 }
        }}
        whileHover={{ scale: 1.005, backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
        className={`group relative flex ${isGrid ? 'flex-col items-start p-6' : 'flex-row items-center p-4'} bg-white/2 border border-white/5 rounded-2xl hover:border-white/10 hover:backdrop-blur-md transition-all cursor-pointer min-w-0 h-full overflow-visible`}
        >
        {/* Pinned Indicator */}
        {chat.isPinned && (
            <div className={`absolute ${isGrid ? 'top-0 left-1/2 -translate-x-1/2 w-8 h-1' : '-left-1 top-1/2 -translate-y-1/2 w-1 h-8'} bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]`} />
        )}

        {/* Main Content Content */}
        <div className={`flex items-start gap-4 w-full min-w-0 ${isGrid ? 'flex-col' : 'flex-row'}`}>
            <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10">
                <MessageSquare size={18} className="text-white/60 group-hover:text-blue-400 transition-colors" />
            </div>
            <div className="absolute inset-0 bg-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            </div>

            <div className={`flex-1 min-w-0 flex flex-col gap-1.5 w-full`}>
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                <h3 className="text-sm font-semibold text-white/90 truncate group-hover:text-white transition-colors">
                    {chat.title}
                </h3>
                {chat.isPinned && <Pin size={10} className="text-blue-400 fill-blue-400 shrink-0" />}
                </div>
                {isGrid && (
                <span className="text-[10px] font-medium text-white/20 whitespace-nowrap uppercase tracking-wider shrink-0">
                    {chat.timestamp}
                </span>
                )}
            </div>
            
            <p className={`text-xs text-white/30 group-hover:text-white/50 transition-colors leading-relaxed ${isGrid ? 'line-clamp-3 h-[4.5em]' : 'truncate pr-4'}`}>
                {chat.snippet}
            </p>

            <div className={`flex flex-wrap gap-1.5 ${isGrid ? 'mt-4' : 'mt-1'}`}>
                {chat.tags.map((tag) => (
                <span 
                    key={tag} 
                    className="inline-flex items-center gap-1 text-[10px] font-medium text-white/40 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded-md hover:bg-white/10 transition-colors"
                >
                    <FileText size={10} />
                    {tag}
                </span>
                ))}
            </div>
            </div>
        </div>

        {/* Actions / Meta */}
        <div className={`flex items-center justify-between gap-4 shrink-0 ${isGrid ? 'w-full mt-6 pt-4 border-t border-white/5' : 'ml-4'}`}>
            {!isGrid && (
            <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[10px] font-medium text-white/20 group-hover:text-white/40 transition-colors whitespace-nowrap uppercase tracking-wider">
                {chat.timestamp}
                </span>
                <div className="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-400">
                    Resume <ArrowRight size={14} />
                </div>
                </div>
            </div>
            )}

            {isGrid && (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-400 opacity-80 hover:opacity-100 transition-opacity">
                Resume Chat <ArrowRight size={14} />
            </div>
            )}

            <div className="relative">
            <button 
                onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
                }}
                className="p-1.5 text-white/20 hover:text-white/60 hover:bg-white/5 rounded-lg transition-all"
            >
                <MoreVertical size={16} />
            </button>

            {showActions && (
                <div 
                className="absolute right-0 top-full mb-2 w-44 bg-[#121214] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden py-1 backdrop-blur-xl"
                onMouseLeave={() => setShowActions(false)}
                >
                <button 
                    onClick={(e) => { e.stopPropagation(); onTogglePin(chat.id); setShowActions(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all"
                >
                    <Pin size={14} className={chat.isPinned ? 'text-blue-400' : ''} />
                    {chat.isPinned ? 'Unpin Chat' : 'Pin to Top'}
                </button>
                <button 
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all"
                >
                    <ExternalLink size={14} />
                    Export PDF
                </button>
                <div className="h-px bg-white/5 my-1" />
                <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(chat.id); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-400/10 transition-all"
                >
                    <Trash2 size={14} />
                    Delete History
                </button>
                </div>
            )}
            </div>
        </div>
    </motion.div>
    );
};
