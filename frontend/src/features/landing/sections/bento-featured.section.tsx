'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Zap, Globe, FileCheck, Layers } from 'lucide-react';

const BentoFeatures: React.FC = () => {
    return (
    <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
                <h2 className="text-4xl font-bold mb-4">Built for scale.</h2>
                <p className="text-slate-400">Everything you need to ship a production-grade AI documentation system in hours, not months.</p>
            </div>
            <button className="text-blue-400 font-semibold flex items-center gap-2 group hover:text-blue-300 transition-colors">
                View API Docs <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 h-full">
            {/* Card 1: Source Citations (Large) */}
            <div className="md:col-span-2 lg:col-span-3 h-75 glass-effect p-8 rounded-3xl overflow-hidden group relative">
                <div className="absolute bottom-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Search className="w-48 h-48 text-blue-500" />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-6">
                    <FileCheck className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Traceable Intelligence</h3>
                <p className="text-slate-400 max-w-xs">Every answer includes clickable source citations. Verify every claim directly from your original documents with millimetre precision.</p>
                </div>
            </div>

            {/* Card 2: Security (Small) */}
            <div className="md:col-span-2 lg:col-span-3 h-75 glass-effect p-8 rounded-3xl border-indigo-500/20 bg-indigo-500/5 group">
                <div className="p-3 bg-indigo-500/10 rounded-xl w-fit mb-6">
                    <Shield className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Air-Gapped Privacy</h3>
                <p className="text-slate-400">Your data never leaves your environment. Zero training on user data, fully compliant with SOC2 and GDPR standards.</p>
            </div>

            {/* Card 3: Speed (Medium) */}
            <div className="md:col-span-2 lg:col-span-2 h-87.5 glass-effect p-8 rounded-3xl flex flex-col justify-between">
                <div>
                <div className="p-3 bg-cyan-500/10 rounded-xl w-fit mb-6">
                    <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Indexing</h3>
                <p className="text-slate-400 text-sm">Upload 100,000 pages in under 5 minutes. Our distributed parser handles the heavy lifting.</p>
                </div>
                <div className="flex gap-2">
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-cyan-500" 
                    />
                </div>
                </div>
            </div>

            {/* Card 4: Multi-format (Medium) */}
            <div className="md:col-span-2 lg:col-span-2 h-87.5 glass-effect p-8 rounded-3xl relative overflow-hidden">
                <div className="p-3 bg-purple-500/10 rounded-xl w-fit mb-6">
                    <Layers className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Omni-Channel Support</h3>
                <p className="text-slate-400 text-sm">PDF, DOCX, XLSX, HTML, Notion, Slack, and even Video Transcripts. One brain for all your formats.</p>
                
                <div className="mt-8 flex flex-wrap gap-2">
                    {['.pdf', '.docx', '.csv', '.json', '.txt', '.mp4'].map(ext => (
                    <span key={ext} className="px-2 py-1 rounded bg-slate-800 text-[10px] font-mono border border-white/5">{ext}</span>
                    ))}
                </div>
            </div>

            {/* Card 5: Global (Medium) */}
            <div className="md:col-span-2 lg:col-span-2 h-87.5 glass-effect p-8 rounded-3xl bg-blue-600/5 border-blue-600/20">
                <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-6">
                <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Global Edge Deployment</h3>
                <p className="text-slate-400 text-sm">Serve your document AI to users worldwide with sub-100ms latency via our global vector edge network.</p>
            </div>
            </div>
        </div>
    </section>
    );
};

export default BentoFeatures;