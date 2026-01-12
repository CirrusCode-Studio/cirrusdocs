'use client'
import { ArrowUpDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import DocRow from "../components/DocRow";
import EmptyState from "../components/ui/EmptyState";
import { Document } from "../types";

interface DocTableProps {
    filteredDocs: Document[]; 
    handleUpload?: () => void;
    handleDelete?: (docId: string) => void;
    handleChat?: (docId: string) => void;
    pagination?: {
        page: number;
        totalPages: number;
        onNext: () => void;
        onPrev: () => void;
    };
}

const DocTable = ({
  filteredDocs = [],
  handleUpload,
  handleDelete,
  handleChat,
  pagination,
}: DocTableProps) => {
  return (
    <div className="relative z-10 flex-1 overflow-hidden flex flex-col max-w-7xl mx-auto w-full px-6 py-6">
      {filteredDocs.length > 0 ? (
        <div className="flex-1 flex flex-col overflow-hidden border border-white/10 rounded-2xl bg-white/2 backdrop-blur-xl shadow-2xl">
          {/* Scrollable Container */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-125">
              <thead className="sticky top-0 z-20 bg-[#161619]">
                <tr className="border-b border-white/10">
                  <th className="py-4 pl-4 pr-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <div className="flex items-center gap-2">
                      File Name
                      <ArrowUpDown size={10} className="text-slate-600" />
                    </div>
                  </th>
                  <th className="py-4 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 hidden sm:table-cell">
                    Date
                  </th>
                  <th className="py-4 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="py-4 pl-3 pr-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredDocs.map((doc) => (
                    <DocRow
                      key={doc.id}
                      doc={doc}
                      onDelete={handleDelete}
                      onChat={handleChat}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Table Footer - Sticky at bottom */}
          <div className="shrink-0 p-4 bg-white/3 border-t border-white/10 flex items-center justify-between">
            <p className="text-[11px] text-slate-500 font-medium">
              Showing {filteredDocs.length} documents
            </p>
            <div className="flex gap-2">
              <button
                onClick={pagination?.onPrev}
                disabled={pagination?.page === 1}
                className="px-3 py-1 text-[11px] rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={pagination?.onNext}
                disabled={pagination && pagination.page >= pagination.totalPages}
                className="px-3 py-1 text-[11px] rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center">
          <EmptyState onUpload={handleUpload} />
        </div>
      )}
    </div>
  );
};

export default DocTable;
