
import React from 'react';
import { Database, Zap, ArrowUpRight, Crown } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { UserSettings } from '../types';

interface UsageSectionProps {
    settings: UserSettings;
}

const UsageSection: React.FC<UsageSectionProps> = ({ settings }) => {
    const storagePercentage = (settings.storageUsed / settings.storageLimit) * 100;
    const queryPercentage = (settings.queryCount / settings.queryLimit) * 100;

    return (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Database className="w-5 h-5" />
                </div>
                <span className="font-semibold text-white/90">Storage Used</span>
                </div>
                <span className="text-sm text-gray-400">{settings.storageUsed} / {settings.storageLimit} GB</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                className="h-full bg-linear-to-r from-blue-500 to-indigo-600 rounded-full" 
                style={{ width: `${storagePercentage}%` }}
                />
            </div>
            <p className="mt-4 text-xs text-gray-500">Resetting on Oct 24, 2023</p>
            </GlassCard>

            <GlassCard>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Zap className="w-5 h-5" />
                </div>
                <span className="font-semibold text-white/90">Query Limit</span>
                </div>
                <span className="text-sm text-gray-400">{settings.queryCount} / {settings.queryLimit}</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full" 
                style={{ width: `${queryPercentage}%` }}
                />
            </div>
            <p className="mt-4 text-xs text-gray-500">80% of your daily limit used</p>
            </GlassCard>
        </div>

        <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Crown className="w-24 h-24 text-blue-500" />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div>
                <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold">Manage Subscription</h3>
                <span className="px-2 py-0.5 rounded-lg bg-blue-600 text-[10px] font-bold uppercase">Active</span>
                </div>
                <p className="text-gray-400 max-w-md">
                You are currently on the <span className="text-white font-medium">Pro Elite</span> monthly plan. Your next billing date is November 1, 2023 for $29.00.
                </p>
            </div>
            <div className="flex flex-wrap gap-3">
                <button className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-medium transition-all">
                Cancel Plan
                </button>
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium shadow-lg shadow-blue-600/20 flex items-center gap-2">
                Upgrade
                <ArrowUpRight className="w-4 h-4" />
                </button>
            </div>
            </div>
        </GlassCard>

        <div className="p-8 rounded-3xl bg-[#111113] border border-white/5 text-center">
            <p className="text-gray-500 text-sm italic font-medium">Need custom API limits? <button className="text-blue-400 hover:underline">Contact Enterprise Support</button></p>
        </div>
    </div>
    );
};

export default UsageSection;