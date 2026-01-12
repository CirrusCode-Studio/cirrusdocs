'use client'
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { DocumentStatus } from '../../types';

interface StatusBadgeProps {
    status: DocumentStatus;
    errorMessage?: string;
}

const StatusBadge = ({ status, errorMessage }: StatusBadgeProps) => {
    switch (status) {
        case DocumentStatus.READY:
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle size={14} className="mr-1.5" />
                Ready
                </span>
            );
        case DocumentStatus.PROCESSING:
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-2 h-2 bg-amber-400 rounded-full mr-2"
                />
                Analyzing...
                </span>
            );
        case DocumentStatus.FAILED:
            return (
                <div className="group relative inline-block">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30 cursor-help">
                    <AlertCircle size={14} className="mr-1.5" />
                    Failed
                </span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max px-2 py-1 bg-gray-900 text-white text-[10px] rounded shadow-xl border border-white/10 z-50">
                    {errorMessage || 'Something went wrong'}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
                </div>
                </div>
            );
        case DocumentStatus.UPLOADING:
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Uploading
                </span>
            );
        default:
            return null;
    }
};

export default StatusBadge;
