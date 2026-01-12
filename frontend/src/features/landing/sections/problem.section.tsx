'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Zap, ShieldX } from 'lucide-react';

const ProblemSection = () => {
    return (
    <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Traditional knowledge management is <span className="text-red-500">broken.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                Data silos, outdated documentation, and endless CTRL+F. Your team spends 20% of their time just looking for information that already exists.
                </p>
                
                <div className="space-y-4">
                {[
                    { icon: ShieldX, text: "Privacy leaks from public LLM training", color: "text-red-400" },
                    { icon: Zap, text: "Hours wasted on manual indexing", color: "text-orange-400" },
                    { icon: AlertCircle, text: "Hallucinations causing business risk", color: "text-yellow-400" }
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-slate-800/50 border border-white/5 ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-slate-300 font-medium">{item.text}</span>
                    </div>
                ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
            >
                {/* Red-to-orange glow effect */}
                <div className="absolute -inset-1 bg-linear-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative glass-effect p-8 rounded-3xl border-red-500/20 bg-slate-900/60 overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12">
                    <ShieldX className="w-32 h-32 text-red-500" />
                </div>
                
                <div className="flex flex-col gap-6">
                    <div className="h-4 w-1/3 bg-red-500/20 rounded animate-pulse" />
                    <div className="space-y-3">
                    <div className="h-3 w-full bg-slate-800 rounded" />
                    <div className="h-3 w-5/6 bg-slate-800 rounded" />
                    <div className="h-3 w-4/6 bg-slate-800 rounded" />
                    </div>
                    <div className="h-20 w-full bg-red-500/5 border border-red-500/20 rounded-xl flex items-center justify-center text-red-400 font-mono text-xs">
                    CRITICAL_ERROR: DATA_SILO_DETECTED
                    </div>
                    <div className="space-y-3">
                    <div className="h-3 w-full bg-slate-800 rounded" />
                    <div className="h-3 w-3/4 bg-slate-800 rounded" />
                    </div>
                </div>
                </div>
            </motion.div>
            </div>
        </div>
    </section>
    );
};

export default ProblemSection;
