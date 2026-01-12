
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, MessageSquare } from 'lucide-react';
import { Document, DocumentStatus } from '../types';
import StatusBadge from './ui/StatusBadge';
import { getFileIcon } from './ui/FileIco';

interface DocRowProps {
    doc: Document;
    onDelete?: (id: string) => void;
    onChat?: (id: string) => void;
}

const DocRow = ({ doc, onDelete, onChat }: DocRowProps) => {
    const [isNew, setIsNew] = useState(doc.isNew);

    useEffect(() => {
        if (isNew) {
        const timer = setTimeout(() => setIsNew(false), 2000);
        return () => clearTimeout(timer);
        }
    }, [isNew]);

    return (
    <motion.tr
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
            opacity: 1, 
            x: 0,
            backgroundColor: isNew ? 'rgba(16, 185, 129, 0.1)' : 'transparent'
        }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
        className={`group border-b border-white/5 hover:bg-white/3 transition-all duration-200 cursor-default`}
        >
        <td className="py-4 pl-4 pr-3 text-sm transition-transform duration-200 group-hover:translate-x-1 max-w-50 md:max-w-md">
            <div className="flex flex-col">
            <div className="flex items-center gap-3">
                <div className="shrink-0">{getFileIcon(doc.type)}</div>
                <span className="font-medium text-slate-200 truncate">{doc.name}</span>
            </div>
            {/* Mobile only date/status summary if needed could go here, but we'll use columns wisely */}
            {doc.status === DocumentStatus.UPLOADING && (
                <div className="mt-2 w-full max-w-30 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${doc.uploadProgress || 0}%` }}
                    className="h-full bg-blue-500"
                />
                </div>
            )}
            </div>
        </td>
        <td className="py-4 px-3 text-sm text-slate-400 hidden sm:table-cell whitespace-nowrap">
            {doc.uploadDate}
        </td>
        <td className="py-4 px-3">
            <StatusBadge status={doc.status} errorMessage={doc.errorMessage} />
        </td>
        <td className="py-4 pl-3 pr-4 text-right">
            <div className="flex items-center justify-end gap-1 md:gap-2">
            <button
                onClick={() => onChat?.(doc.id)}
                disabled={doc.status !== DocumentStatus.READY}
                className={`p-2 rounded-lg transition-colors ${
                doc.status === DocumentStatus.READY
                    ? 'text-blue-400 hover:bg-blue-500/10 active:scale-95'
                    : 'text-gray-600 cursor-not-allowed'
                }`}
                title="Chat with document"
            >
                <MessageSquare size={18} />
            </button>
            <button
                onClick={() => onDelete?.(doc.id)}
                className="p-2 text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all active:scale-95"
                title="Delete document"
            >
                <Trash2 size={18} />
            </button>
            </div>
        </td>
    </motion.tr>
    );
};

export default DocRow;
