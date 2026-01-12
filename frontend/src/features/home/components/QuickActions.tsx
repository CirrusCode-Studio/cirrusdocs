'use client'
import {motion} from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import { Upload, MessageSquarePlus, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface QuickActionsProps {
    onChat?: () => void;
    onUpload?: (file: File) => void;
}
const QuickActions = ({onChat, onUpload}: QuickActionsProps) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => fileInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        onUpload?.(e.target.files[0]);
        e.target.value = '';
    };
    return (
    <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <GlassCard onClick={handleUploadClick} className="p-8 group cursor-pointer border-dashed border-2 hover:border-blue-500/40 transition-all">
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-blue-500/20">
                    <Upload className="text-blue-400 group-hover:animate-bounce" size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white">Upload Document</h3>
                    <p className="text-gray-400 mt-1">Drag & drop or click to upload PDF, DOCX, TXT</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-500 uppercase tracking-widest font-bold border border-white/5">Max 50MB</span>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-500 uppercase tracking-widest font-bold border border-white/5">AI Indexing</span>
                </div>
            </div>
        </GlassCard>

        <GlassCard onClick={onChat} className="p-8 group cursor-pointer hover:border-indigo-500/40 transition-all">
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
                <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse"></div>
                <div className="relative w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-indigo-500/20">
                    <MessageSquarePlus className="text-indigo-400" size={32} />
                </div>
                </div>
                <div>
                <h3 className="text-xl font-semibold text-white">Start a New Chat</h3>
                <p className="text-gray-400 mt-1">Query your documents with natural language</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-indigo-600/20 group/btn">
                Chat Now
                <ChevronRight className="group-hover/btn:translate-x-1 transition-transform" size={18} />
                </button>
            </div>
        </GlassCard>
    </motion.div>
    );
};

export default QuickActions;