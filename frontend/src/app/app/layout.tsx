'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { AnimatePresence } from 'framer-motion';

export default function AppLayout({ children }: { children: React.ReactNode }) {

    return (
    <div className=" text-gray-100 selection:bg-blue-500/30">
        <Sidebar />

        <main className="flex-1 ml-20 lg:ml-64 min-h-screen relative">
            {/* Background */}
            <AnimatePresence mode="wait">
            {children}
            </AnimatePresence>
        </main>
    </div>
    );
}
