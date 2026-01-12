// src/app/(auth)/layout.tsx
'use client'
import Background from "@/components/layout/Background";
import { motion } from 'framer-motion';

const AuthLayout = ({children}: {
    children: React.ReactNode
}) => {
    return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-x-hidden">
        <Background />
        
        {/* Main Container with vertical padding for small mobile heights */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-md z-10 py-12 md:py-0"
        >
            {children}
        </motion.div>

        {/* Footer Branding - responsive positioning */}
        <footer className="mt-auto md:absolute md:bottom-8 left-0 right-0 text-center z-10 pb-4 md:pb-0">
            <p className="text-slate-500 text-xs sm:text-sm px-4">
            &copy; 2024 CirrusDocs AI. Securely processing your knowledge.
            </p>
        </footer>
    </div>
    )
}

export default AuthLayout;