'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import ChatMockup from './chat-mockup.section';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New: RAG v3.0 is now live
            <ChevronRight className="w-3 h-3" />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8">
            Turn your documents into <br />
            <span className="text-gradient">an AI you can talk to</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-10">
            Engineered for high-compliance industries. Connect your PDFs, Word docs, and spreadsheets to a secure neural engine in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="group relative bg-white text-black px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:pr-10 active:scale-95">
              <span className="relative z-10">Start Free Trial</span>
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              <ArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all w-5 h-5 -translate-x-2 group-hover:translate-x-0" />
            </button>
            <button className="glass-effect text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-all border border-white/10">
              Book a Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Decorative glow behind mockup */}
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-2xl opacity-20 animate-pulse" />
          <ChatMockup />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
