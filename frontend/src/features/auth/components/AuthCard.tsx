'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Github, Chrome } from 'lucide-react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import SocialButton from './ui/SocialButton';
import { usePathname, useRouter } from 'next/navigation';

const AuthCard= () => {
    const pathname = usePathname();
    const router = useRouter();

    const isLogin = pathname === '/sign-in' 

    const toggleAuthMode = () => {
        router.push(isLogin ? '/sign-up' : '/sign-in');
    };

    return (
    <div className="relative w-full">
        {/* Outer Glow Wrapper */}
        <div className="absolute -inset-1 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl sm:rounded-[2.5rem] blur-2xl opacity-50" />
        
        <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl sm:rounded-4xl p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
            {/* Brand Header */}
            <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
                <Cloud className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight text-center">CirrusDocs AI</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 text-center px-2">
                {isLogin ? 'Welcome back to the cloud' : 'Elevate your documentation flow'}
            </p>
            </div>

            {/* Social Authentication */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <SocialButton icon={<Chrome size={18} />} label="Google" />
            <SocialButton icon={<Github size={18} />} label="GitHub" />
            </div>

            {/* Divider */}
            <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] sm:text-xs uppercase">
                <span className="bg-slate-900/0 px-2 text-slate-500 backdrop-blur-md">Or email</span>
            </div>
            </div>

            {/* Form Container */}
            <div className="min-h-65 sm:min-h-70">
            <AnimatePresence mode="wait">
                {isLogin ? (
                <motion.div
                    key="login"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <SignInForm />
                </motion.div>
                ) : (
                <motion.div
                    key="signup"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <SignUpForm />
                </motion.div>
                )}
            </AnimatePresence>
            </div>

            {/* Auth Mode Toggle */}
            <div className="mt-6 sm:mt-8 text-center">
            <button
                onClick={toggleAuthMode}
                className="text-slate-400 text-xs sm:text-sm hover:text-white transition-colors duration-200"
            >
                {isLogin ? (
                <span>Don&apos;t have an account? <span className="text-blue-400 font-medium underline-offset-4 hover:underline">Sign up</span></span>
                ) : (
                <span>Already have an account? <span className="text-blue-400 font-medium underline-offset-4 hover:underline">Sign in</span></span>
                )}
            </button>
            </div>
        </div>
    </div>
    );
};

export default AuthCard;
