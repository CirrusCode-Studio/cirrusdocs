'use client'
import React from 'react';
import { motion } from 'framer-motion';

const LogoCloud = () => {
    const logos = ["Stripe", "Vercel", "Linear", "Airbnb", "Loom", "Discord"];
    
    return (
    <div className="py-12 border-y border-white/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-10">
            Powering intelligence for global innovators
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {logos.map((name, i) => (
                <motion.div 
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-black text-slate-400 select-none cursor-default hover:text-white transition-colors"
                >
                {name}
                </motion.div>
            ))}
            </div>
        </div>
    </div>
    );
};

export default LogoCloud;