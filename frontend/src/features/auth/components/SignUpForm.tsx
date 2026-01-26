'use client'
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import InputField from './ui/InputField';

const SignUpForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulation
        setTimeout(() => setIsSubmitting(false), 2000);
    };

    return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <InputField 
            label="Full Name" 
            type="text" 
            placeholder="John Doe" 
            icon={User} 
        />
        <InputField 
            label="Email Address" 
            type="email" 
            placeholder="name@company.com" 
            icon={Mail} 
        />
        <InputField 
            label="Create Password" 
            type="password" 
            placeholder="••••••••" 
            icon={Lock} 
        />

        <p className="text-[10px] text-slate-500 text-center px-4 leading-relaxed">
            By signing up, you agree to our <span className="underline cursor-pointer hover:text-slate-400">Terms</span> and <span className="underline cursor-pointer hover:text-slate-400">Privacy Policy</span>.
        </p>

        <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="relative w-full mt-2 group overflow-hidden touch-manipulation rounded-xl"
        >
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:opacity-90" />
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            
            <div className="relative flex items-center justify-center gap-2 py-3.5 sm:py-3 px-6 rounded-xl font-semibold text-white text-sm sm:text-base">
            {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                <span>Get Started</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
            )}
            </div>
        </motion.button>
    </form>
    );
};

export default SignUpForm;
