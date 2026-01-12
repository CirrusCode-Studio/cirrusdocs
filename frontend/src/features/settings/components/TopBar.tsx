'use client'
import { TabType } from "../types";
import { motion } from 'framer-motion'
import { tabs } from "../types";
interface TopBarProps {
    activeTab: TabType
    setActiveTab: (id: TabType) => void
    avartar: string
}
const TopBar = ({ activeTab, setActiveTab, avartar}: TopBarProps) => {
    
    return (
    <nav className="w-full bg-black/40 backdrop-blur-3xl border-b border-white/5 z-50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <span className="font-bold text-white text-lg">C</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white/90 hidden md:block">CirrusDocs AI</h1>
            </div>

            {/* Centered Tabs */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
                {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 group ${
                    activeTab === tab.id 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <tab.icon className={`w-4 h-4 transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="text-sm font-semibold">{tab.label}</span>
                    {activeTab === tab.id && (
                    <motion.div 
                        layoutId="active-nav-pill" 
                        className="absolute inset-0 bg-blue-600/10 border border-blue-500/20 rounded-xl z-[-1] shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                    />
                    )}
                </button>
                ))}
            </div>

            {/* Right Action Section */}
            <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/20">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Pro Elite</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 p-0.5">
                <img src={avartar} alt="User" className="w-full h-full rounded-full object-cover" />
                </div>
            </div>
            </div>
        </div>
        
        {/* Mobile Sub-Navigation (Horizontal Scroll) */}
        <div className="md:hidden flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar border-t border-white/5">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/5 text-gray-400'
                }`}
            >
                <tab.icon className="w-4 h-4" />
                {tab.label}
            </button>
            ))}
        </div>
    </nav>
    )
}

export default TopBar;