'use client'
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const ThinkingIndicator = () => (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 px-4 py-4 justify-start"
    >
        <div className="flex max-w-[85%] md:max-w-[75%] gap-3 flex-row">
            {/* Animated Avatar with Pulsing Ring */}
            <div className="relative shrink-0 w-8 h-8 mt-1">
                <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-lg bg-blue-500/30 blur-sm"
                />
                <div className="relative w-8 h-8 rounded-lg ai-bubble bg-blue-600/20 flex items-center justify-center border border-blue-500/40">
                <Bot size={16} className="text-blue-400" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {/* Shimmering Thinking Bubble */}
                <div className="ai-bubble rounded-2xl rounded-tl-none p-4 w-24 h-12 flex items-center justify-center relative overflow-hidden">
                {/* Shimmer Effect */}
                <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-blue-400/10 to-transparent w-1/2 -skew-x-12"
                />
                
                {/* Typing Dots */}
                <div className="flex gap-1.5 items-center">
                    {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ 
                        duration: 0.6, 
                        repeat: Infinity, 
                        delay: i * 0.15,
                        ease: "easeInOut" 
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-blue-400/60"
                    />
                    ))}
                </div>
                </div>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide italic px-1">
                Consulting Oracle...
                </span>
            </div>
        </div>
    </motion.div>
);

export default ThinkingIndicator;