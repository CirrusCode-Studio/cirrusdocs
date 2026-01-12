'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';
import { SourceBadge } from './ui/SourceBadge';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
    const isAI = message.role === 'assistant';

    return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex w-full gap-4 px-4 py-4 ${isAI ? 'justify-start' : 'justify-end'}`}
        >
        <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Avatar */}
            <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-1 ${
            isAI ? 'ai-bubble bg-blue-600/20' : 'bg-white/5 border border-white/10'
            }`}>
            {isAI ? (
                <Bot size={20} className="text-blue-400" />
            ) : (
                <User size={20} className="text-slate-400" />
            )}
            </div>

            {/* Content Container */}
            <div className={`flex flex-col gap-3 ${isAI ? 'items-start' : 'items-end'}`}>
            {/* The Bubble */}
            <div className={`
                ${isAI 
                ? 'ai-bubble rounded-2xl rounded-tl-none' 
                : 'bg-white/5 border border-white/10 rounded-2xl rounded-tr-none'
                } 
                w-fit shadow-lg px-3 py-2
            `}>
                <div className={`prose prose-invert prose-sm max-w-none leading-relaxed ${isAI ? 'text-slate-200' : 'text-slate-100'}`}>
                {message.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 last:mb-0 wrap-break-word">{line}</p>
                ))}
                </div>
            </div>

            {/* Sources / Citations */}
            {isAI && message.sources && message.sources.length > 0 && (
                <div className="flex flex-col gap-2 mt-1 w-full max-w-sm">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-1">
                    Verified Sources
                </div>
                <div className="flex flex-wrap gap-2">
                    {message.sources.map((source, idx) => (
                    <SourceBadge key={source.id} source={source} index={idx} />
                    ))}
                </div>
                </div>
            )}
            
            {/* Timestamp (Optional/Subtle) */}
            <span className="text-[10px] text-slate-600 px-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            </div>
        </div>
    </motion.div>
    );
};
