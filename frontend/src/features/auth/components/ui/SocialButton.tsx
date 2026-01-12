'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
}

const SocialButton = ({ icon, label }: SocialButtonProps) => {
    return (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/5 rounded-xl py-3 sm:py-2.5 px-4 text-slate-300 font-medium text-xs sm:text-sm hover:bg-white/10 hover:border-white/10 hover:text-white transition-all duration-200"
        >
        <span className="text-slate-100">{icon}</span>
        <span className="truncate">{label}</span>
    </motion.button>
    );
};

export default SocialButton;
