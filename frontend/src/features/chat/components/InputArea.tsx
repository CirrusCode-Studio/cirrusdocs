'use client'
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Plus, Paperclip, Loader2, Send } from "lucide-react";
import { AppStatus } from "../types";

interface InputAreaProps {
  inputValue: string;
  setInputValue: (val: string) => void;
  handleSend: () => void;
  status: AppStatus;
  isBlocked: boolean;
}

const InputArea = ({
    inputValue,
    setInputValue,
    handleSend,
    status,
    isBlocked
}: InputAreaProps) => {
    return (
    <div className="fixed bottom-0 right-0 left-0 ml-20 lg:ml-64 p-6 pointer-events-none">
        <div className="max-w-3xl mx-auto w-full relative pointer-events-auto">

            {/* Input Blocked Overlay */}
            <AnimatePresence>
            {isBlocked && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 rounded-2xl backdrop-blur-sm bg-black/40 flex items-center justify-center"
                >
                <div className="flex items-center gap-2 text-red-400 font-semibold bg-red-500/10 px-4 py-2 rounded-lg">
                    <Lock size={16} />
                    <span>Upload documents to enable chat</span>
                </div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* Main Input Area */}
            <div className="glass bg-black/40 rounded-2xl shadow-2xl p-2 flex items-end gap-2 border border-transparent focus-within:border-blue-500/50 transition-colors">
            <button className="p-3 text-slate-500 hover:text-blue-400 transition-colors">
                <Plus size={22} />
            </button>

            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
                }}
                placeholder="Ask anything about your documents..."
                className="flex-1 bg-transparent border-none focus:outline-0 focus:ring-0 text-white placeholder-slate-500 py-3 resize-none max-h-32 min-h-11"
                rows={1}
            />

            <div className="flex items-center gap-1 p-1">
                <button className="p-2 text-slate-500 hover:text-slate-300 transition-colors">
                <Paperclip size={18} />
                </button>
                <button
                onClick={handleSend}
                disabled={!inputValue.trim() || status === AppStatus.THINKING || isBlocked}
                className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${
                    inputValue.trim() && status !== AppStatus.THINKING && !isBlocked
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                    : 'bg-white/5 text-slate-600 cursor-not-allowed'
                }`}
                >
                {status === AppStatus.THINKING ? (
                    <Loader2 size={20} className="animate-spin" />
                ) : (
                    <Send size={20} className={inputValue.trim() ? 'animate-in fade-in zoom-in' : ''} />
                )}
                </button>
            </div>
            </div>

            {/* Footer */}
            <div className="mt-3 text-center">
            <p className="text-[10px] text-slate-600 font-medium tracking-widest uppercase">
                Powered by CirrusDocs RAG Engine • Encrypted • Grounded
            </p>
            </div>
        </div>
    </div>
    );
}

export default InputArea;
