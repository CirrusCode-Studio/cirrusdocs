'use client'
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import InputField from './ui/InputField';
import { useLogin } from '../hooks/use-auth';

const SignInForm = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const loginMutation = useLogin();
    const isSubmitting = loginMutation.isPending;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        loginMutation.mutate(
            { email, password },
            {
                onSuccess: () => {
                    window.location.href = '/app';
                }
            }
        )
    };

    return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <InputField 
            label="Email Address" 
            type="email" 
            placeholder="name@company.com" 
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
        />
        <div className="space-y-1">
            <InputField 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                icon={Lock} 
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <div className="flex justify-end">
            <button type="button" className="text-[10px] sm:text-[11px] text-blue-400/80 hover:text-blue-400 transition-colors p-1">
                Forgot password?
            </button>
            </div>
        </div>

        <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="relative w-full mt-2 group overflow-hidden touch-manipulation rounded-xl"
        >
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:opacity-90" />
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            
            <div className="relative flex items-center justify-center gap-2 py-3.5 sm:py-3 px-6 rounded-xl font-semibold text-white text-sm sm:text-base">
            {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                <span>Sign In</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
            )}
            </div>
        </motion.button>
    </form>
    );
};

export default SignInForm;
