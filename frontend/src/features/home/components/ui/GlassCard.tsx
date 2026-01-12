'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  onClick?: () => void;
}

export const GlassCard = ({ children, className = '', tilt = true, onClick }: GlassCardProps) => {
    return (
    <motion.div
        onClick={onClick}
        whileHover={tilt ? { 
            rotateX: 2, 
            rotateY: -2, 
            translateZ: 20,
            transition: { duration: 0.3 }
        } : {}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
            relative overflow-hidden
            bg-white/3 backdrop-blur-xl 
            border border-white/10 rounded-2xl
            shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
            hover:border-white/20 hover:bg-white/5
            transition-all duration-300
            ${className}
        `}
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
        {children}
    </motion.div>
    );
};
