'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus } from 'lucide-react';

interface EmptyStateProps {
    onUpload?: () => void;
}

const EmptyState = ({ onUpload } : EmptyStateProps) => {
    return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-12 mt-12 border border-white/10 rounded-2xl bg-white/2 backdrop-blur-xl"
        >
        <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
            <FileText size={40} className="text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Your Knowledge Base is empty</h3>
        <p className="text-slate-400 text-center mb-8 max-w-sm">
            Upload your first document to start querying your data with CirrusDocs AI.
        </p>
        <button
            onClick={onUpload}
            className="group relative flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/20"
        >
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="shimmer absolute inset-0 opacity-20" />
            </div>
            <Plus size={20} />
            Upload First Document
        </button>
    </motion.div>
    );
};

export default EmptyState;
