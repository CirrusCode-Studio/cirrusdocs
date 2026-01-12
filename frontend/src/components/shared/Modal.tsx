'use client'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    confirmText?: string;
    onConfirm?: () => void;
    isDestructive?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    confirmText = 'Confirm', 
    onConfirm,
    isDestructive = false
}) => {
    return (
        <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-[#0f0f12] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                </button>
                </div>
                
                <div className="p-6">
                {children}
                </div>

                <div className="flex items-center gap-3 p-6 bg-white/5 border-t border-white/5">
                <button 
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 font-medium hover:bg-white/5 transition-all"
                >
                    Cancel
                </button>
                {onConfirm && (
                    <button 
                    onClick={onConfirm}
                    className={`flex-1 px-4 py-2.5 rounded-xl text-white font-bold transition-all shadow-lg ${
                        isDestructive 
                        ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/20' 
                        : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'
                    }`}
                    >
                    {confirmText}
                    </button>
                )}
                </div>
            </motion.div>
            </div>
        )}
        </AnimatePresence>
    );
};

export default Modal;
