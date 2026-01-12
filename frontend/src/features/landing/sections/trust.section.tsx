'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, CheckCircle2, Database, LucideIcon } from 'lucide-react';

const TrustSection = () => {
  return (
    <section id="security" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="glass-effect rounded-[3rem] p-12 border-white/10 overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl -z-10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Technical Trust built in.</h2>
              <p className="text-slate-400 text-lg mb-10">
                Enterprises trust CirrusDocs because we don&apos;t compromise. Every layer of our architecture is designed for the highest security standards.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <TrustBadge icon={Lock} title="AES-256" subtitle="At-rest Encryption" />
                <TrustBadge icon={Shield} title="SOC2 Type II" subtitle="Certified Infrastructure" />
                <TrustBadge icon={Database} title="Isolated" subtitle="Tenant Database" />
                <TrustBadge icon={CheckCircle2} title="GDPR" subtitle="Compliant Pipeline" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-950/80 border border-white/10 p-8 rounded-3xl relative"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold">Security Engine v4.0</h4>
                  <p className="text-xs text-slate-500">Continuous Monitoring Active</p>
                </div>
              </div>

              <div className="space-y-4">
                <SecurityLog label="Endpoint Protection" status="Healthy" />
                <SecurityLog label="Vector Sanitization" status="Active" />
                <SecurityLog label="SSL Enforcement" status="Verified" />
                <SecurityLog label="IP Whitelisting" status="Enabled" />
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="text-sm font-bold text-blue-400">ZERO_TRUST_VERIFIED</div>
                <div className="text-[10px] text-slate-600 font-mono tracking-tighter">HASH: 4b29...f9a1</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TrustBadgeProps {
    icon: LucideIcon
    title: string
    subtitle: string
}

interface SecurityLogProps {
    label: string,
    status: string
}
const TrustBadge = ({ icon: Icon, title, subtitle }: TrustBadgeProps) => (
  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/40 border border-white/5">
    <Icon className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
    <div>
      <div className="font-bold text-sm">{title}</div>
      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{subtitle}</div>
    </div>
  </div>
);

const SecurityLog = ({ label, status }: SecurityLogProps) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-white/5 text-xs">
    <span className="text-slate-400">{label}</span>
    <span className="flex items-center gap-2 text-green-400 font-bold">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      {status}
    </span>
  </div>
);

export default TrustSection;
