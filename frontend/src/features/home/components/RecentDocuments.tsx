'use client'
import { FileText, ArrowRight, MoreVertical } from "lucide-react"
import { GlassCard } from "./ui/GlassCard"
import { DocStatus, Document } from "../types";
import { motion } from 'framer-motion'

const RecentDocuments = ({documents}: {documents: Document[]}) => {
    return (
    <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="text-blue-400" size={20} />
            Recent Documents
        </h2>
        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 group">
            View All <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
        </div>

        <div className="space-y-3">
        {documents.map((doc) => (
            <GlassCard key={doc.id} className="p-4" tilt={false}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${doc.status === DocStatus.INDEXING ? 'bg-amber-500/10 border-amber-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                <FileText className={doc.status === DocStatus.INDEXING ? 'text-amber-400' : 'text-blue-400'} size={24} />
                </div>
                <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white truncate">{doc.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{doc.size}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{doc.format}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{doc.timestamp}</span>
                </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                {doc.status === DocStatus.INDEXING ? (
                    <div className="flex flex-col items-end gap-1 w-24">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-tighter animate-pulse">Processing...</span>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${doc.progress}%` }}
                        className="h-full bg-amber-500"
                        />
                    </div>
                    </div>
                ) : (
                    <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase">
                    {doc.status}
                    </span>
                )}
                </div>
                <button className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                <MoreVertical size={18} />
                </button>
            </div>
            </GlassCard>
        ))}
        </div>
    </div>
    )
}

export default RecentDocuments;