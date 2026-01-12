import React, { useState } from 'react';
import { Trash2, AlertTriangle, ShieldCheck, Download, FileText, MessageSquare } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Modal from '@/components/shared/Modal';

const PrivacySection: React.FC = () => {
    const [modalType, setModalType] = useState<'chats' | 'docs' | null>(null);

    return (
    <div className="space-y-8">
        <GlassCard title="Security Preferences">
            <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-4">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <div>
                    <h4 className="font-semibold text-white/90">End-to-End Encryption</h4>
                    <p className="text-xs text-gray-400">All your stored documents are encrypted with AES-256.</p>
                </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Enabled</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Download className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                    <p className="font-medium text-sm">Export My Data</p>
                    <p className="text-[10px] text-gray-500 uppercase">Download .zip package</p>
                </div>
                </button>
                <button className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Download className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                    <p className="font-medium text-sm">Download Logs</p>
                    <p className="text-[10px] text-gray-500 uppercase">Access security audit</p>
                </div>
                </button>
            </div>
            </div>
        </GlassCard>

        <GlassCard title="Destructive Actions" className="border-rose-500/20">
            <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-rose-600/10 text-rose-500">
                    <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-rose-100">Clear Chat History</h4>
                    <p className="text-sm text-rose-400/70">Permanently delete all 152 conversations across all your devices.</p>
                </div>
                </div>
                <button 
                onClick={() => setModalType('chats')}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-600/20 flex items-center gap-2"
                >
                <Trash2 className="w-4 h-4" />
                Clear Chats
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-rose-600/10 text-rose-500">
                    <FileText className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-rose-100">Delete All Documents</h4>
                    <p className="text-sm text-rose-400/70">Remove all 24 uploaded PDF and text documents from cloud storage.</p>
                </div>
                </div>
                <button 
                onClick={() => setModalType('docs')}
                className="px-6 py-2.5 border border-rose-500/40 hover:bg-rose-500/10 text-rose-500 font-bold rounded-xl transition-all"
                >
                Delete Docs
                </button>
            </div>
            </div>
        </GlassCard>

        <Modal
            isOpen={!!modalType}
            onClose={() => setModalType(null)}
            title="Confirm Destruction"
            confirmText={modalType === 'chats' ? 'Clear History' : 'Wipe Documents'}
            onConfirm={() => setModalType(null)}
            isDestructive
        >
            <div className="flex flex-col items-center text-center p-6 gap-4">
            <div className="w-16 h-16 rounded-full bg-rose-600/10 flex items-center justify-center text-rose-500">
                <AlertTriangle className="w-8 h-8" />
            </div>
            <p className="text-gray-300 leading-relaxed">
                This action is <span className="text-rose-400 font-bold">irreversible</span>. Once confirmed, all associated {modalType === 'chats' ? 'chat data' : 'document storage'} will be purged from our servers immediately.
            </p>
            </div>
        </Modal>
    </div>
    );
};

export default PrivacySection;
