'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Cpu, BrainCircuit, LucideIcon } from 'lucide-react';

const RAGVisualization = () => {
    return (
    <section id="process" className="py-24 px-6 relative overflow-hidden bg-slate-950/40">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">The Next Generation of RAG</h2>
            <p className="text-slate-400 max-w-xl mx-auto">We don&apos;t just search your docs. We understand them using Retrieval Augmented Generation.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-linear-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 -translate-y-1/2 -z-10" />
            
            <ProcessStep 
                icon={FileSearch} 
                title="Semantic Ingestion" 
                desc="Our neural parser breaks down documents into multi-dimensional vectors."
                delay={0.2}
            />
            <ProcessStep 
                icon={Cpu} 
                title="Neural Indexing" 
                desc="Data is stored in isolated high-speed vector clusters for millisecond retrieval."
                delay={0.4}
                isActive
            />
            <ProcessStep 
                icon={BrainCircuit} 
                title="Reasoning Engine" 
                desc="Gemini-powered reasoning synthesized answers with zero hallucinations."
                delay={0.6}
            />
            </div>

            {/* Animated Particles */}
            <div className="mt-20 relative h-32 w-full max-w-2xl mx-auto bg-slate-900/40 rounded-2xl border border-white/5 flex items-center justify-between px-12">
            <FileSearch className="w-10 h-10 text-slate-500" />
            
            <div className="flex-1 relative mx-8 h-2">
                {[0, 1, 2, 3, 4].map(i => (
                <motion.div
                    key={i}
                    initial={{ left: "0%", opacity: 0 }}
                    animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                    transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.4,
                    ease: "linear"
                    }}
                    className="absolute top-0 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                />
                ))}
                <div className="w-full h-full bg-slate-800 rounded-full" />
            </div>

            <BrainCircuit className="w-10 h-10 text-blue-500 animate-pulse" />
            </div>
        </div>
    </section>
    );
};

interface ProcessStepProps {
    icon: LucideIcon
    title: string
    desc: string
    delay:number
    isActive?: boolean
};

const ProcessStep = ({ icon: Icon, title, desc, delay, isActive = false }: ProcessStepProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className={`p-8 rounded-3xl glass-effect text-center relative ${isActive ? 'border-blue-500/30' : ''}`}
    >
        {isActive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-blue-500/40">
            AI Core
        </div>
        )}
        <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${isActive ? 'bg-blue-600' : 'bg-slate-800/50'}`}>
        <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-slate-400'}`} />
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
);

export default RAGVisualization;
