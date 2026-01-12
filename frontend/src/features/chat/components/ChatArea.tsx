'use client'
import { AnimatePresence, motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { AppStatus, Message } from "../types";
import ThinkingIndicator from "./ui/ThinkingIndicator";

const SUGGESTED_QUESTIONS = [
    "Summarize my recent library additions",
    "Identify key deadlines in Q4 reports",
    "Find compliance audits from 2024",
];

interface ChatAreaProps {
  messages: Message[];
  status: AppStatus;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  handleSend: (text?: string) => void;
}


const ChatArea = ({ messages, status, chatEndRef, handleSend } : ChatAreaProps) => {
    return (
    <div className="flex-1 overflow-y-auto relative pt-4 pb-32">
        <div className="max-w-4xl mx-auto w-full">
            <AnimatePresence>
                {messages.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
                >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                    <FileText size={32} className="text-blue-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-white">How can I help you with your documents today?</h1>
                    <p className="text-slate-400 mb-12 max-w-md">I&apos;m your dedicated Library Oracle. Every answer is grounded in your uploaded knowledge base.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                        <button
                        key={i}
                        onClick={() => handleSend(q)}
                        className="p-4 glass rounded-xl text-sm text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-white/5 transition-all text-left flex items-center justify-between group"
                        >
                        {q}
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                        </button>
                    ))}
                    </div>
                </motion.div>
                ) : (
                messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} />
                ))
                )}
            </AnimatePresence>

            {status === AppStatus.THINKING && <ThinkingIndicator key="thinking"/> }
            <div ref={chatEndRef} />
        </div>
    </div>
    )
}

export default ChatArea;