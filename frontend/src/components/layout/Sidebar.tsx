'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Home,
    Library,
    History,
    Settings,
    LogOut,
    Cloud,
    Bot,
} from 'lucide-react';

const navItems = [
    { href: '/app', label: 'Home', icon: <Home size={20} /> },
    { href: '/app/chat', label: 'Chat', icon: <Bot size={20} /> },
    { href: '/app/library', label: 'My Library', icon: <Library size={20} /> },
    { href: '/app/history', label: 'History', icon: <History size={20} /> },
    { href: '/app/settings', label: 'Settings', icon: <Settings size={20} /> },
];

export function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) =>
        pathname === href;
    return (
        <aside className="w-20 lg:w-64 h-screen fixed left-0 top-0 z-50 flex flex-col border-r border-white/5 bg-black/40 backdrop-blur-md">
        
        {/* Brand */}
        <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Cloud className="text-white" size={24} />
            </div>
            <span className="hidden lg:block font-bold text-xl tracking-tight text-white">
            CirrusDocs
            </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-3 space-y-2 relative">
            {navItems.map((item) => {
            const active = isActive(item.href);

            return (
                <Link
                key={item.href}
                href={item.href}
                className={`
                    relative w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                    ${
                    active
                        ? 'bg-white/10 text-white border border-white/10 shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                `}
                >
                <span className={active ? 'text-blue-400' : ''}>
                    {item.icon}
                </span>

                <span className="hidden lg:block font-medium">
                    {item.label}
                </span>

                {active && (
                    <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full"
                    />
                )}
                </Link>
            );
            })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
            <button
            onClick={() => {
                // TODO: call logout action
            }}
            className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all duration-200"
            >
            <LogOut size={20} />
            <span className="hidden lg:block font-medium">Logout</span>
            </button>
        </div>
        </aside>
    );
}
