'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Menu } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mx-auto max-w-7xl"
        >
        <div className="glass-effect rounded-full px-6 py-2 w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
            <Cloud className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-extrabold tracking-tighter">CirrusDocs</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#process" className="hover:text-white transition-colors">How it works</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
            <Link href='/sign-in' className="hidden sm:block text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Log in
            </Link>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                Get Started
            </button>
            <Menu className="md:hidden w-6 h-6 text-slate-400" />
            </div>
        </div>
        </motion.nav>
    );
};

export default Navbar;
