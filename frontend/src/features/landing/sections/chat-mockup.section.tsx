'use client'
import React from 'react';
import { motion } from 'framer-motion';
// Added Cloud to imports
import { FileText, Search, Send, Layout, Settings, MessageSquare, ExternalLink, Cloud } from 'lucide-react';

const ChatMockup: React.FC = () => {
    return (
        <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="max-w-5xl mx-auto glass-effect rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex h-150"
        >
        {/* Sidebar */}
        <div className="w-64 border-r border-white/10 bg-slate-900/40 hidden md:flex flex-col p-4">
            <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm">Library</span>
            </div>
            
            <div className="space-y-1 mb-auto">
            <div className="flex items-center gap-3 px-3 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium">
                <MessageSquare className="w-4 h-4" />
                Product Specs
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors rounded-lg text-sm">
                <Layout className="w-4 h-4" />
                Technical Audit
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors rounded-lg text-sm">
                <Settings className="w-4 h-4" />
                Config Guides
            </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
            <div className="text-[10px] uppercase text-slate-500 font-bold tracking-widest px-3 mb-3">Recent Sources</div>
            <div className="px-3 space-y-3">
                {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500/40" />
                    <div className="h-2 w-full bg-slate-800 rounded animate-pulse" />
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/20">
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <div className="ml-4 text-xs font-semibold text-slate-400">cirrus_ai_session_01</div>
            </div>
            <div className="flex items-center gap-4">
                <Search className="w-4 h-4 text-slate-500" />
                <Settings className="w-4 h-4 text-slate-500" />
            </div>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Chat Bubble - User */}
            <div className="flex justify-end">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-none text-sm max-w-md shadow-lg shadow-blue-500/10">
                Summarize the SOC2 compliance findings from the latest audit report.
                </div>
            </div>

            {/* Chat Bubble - AI */}
            <div className="flex justify-start items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                {/* Fix: Cloud icon now imported */}
                <Cloud className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-800/50 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none text-sm max-w-lg shadow-xl relative">
                <p className="text-slate-200 leading-relaxed mb-4">
                    Based on the <span className="text-blue-400 font-medium">Auditor_Report_2024.pdf</span>, the key findings include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                    <li>No critical vulnerabilities found in IAM systems.</li>
                    <li>Encryption protocols were updated to AES-256 in Q3.</li>
                    <li>Minor recommendation for continuous logging on ephemeral nodes.</li>
                </ul>

                {/* Source Citation Popover */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute -right-20 top-0 glass-effect p-3 rounded-xl border border-blue-500/30 shadow-2xl z-10 w-48 hidden lg:block"
                >
                    <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-blue-400">SOURCE #04</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                    </div>
                    <div className="text-[11px] text-slate-300 leading-tight">
                    Page 14, Paragraph 3: &ldquo;All data at rest is encrypted using...&ldquo;
                    </div>
                    <div className="mt-2 h-1 w-full bg-blue-500/20 rounded">
                    <div className="h-full w-2/3 bg-blue-500 rounded" />
                    </div>
                </motion.div>
                </div>
            </div>
            </div>

            {/* Input area */}
            <div className="p-4 bg-slate-900/40 border-t border-white/10">
            <div className="relative">
                <input 
                type="text" 
                placeholder="Ask anything about your documents..."
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors pr-12"
                />
                <div className="absolute right-2 top-1.5 p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 cursor-pointer">
                <Send className="w-4 h-4 text-white" />
                </div>
            </div>
            </div>
        </div>
        </motion.div>
    );
};

export default ChatMockup;
