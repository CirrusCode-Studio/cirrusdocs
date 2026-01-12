'use client'
import { motion } from 'framer-motion'
import { Search, Plus } from 'lucide-react'

interface DocHeaderProps {
  onUpload?: (file: File) => void
  searchQuery?: string
  setSearchQuery?: (query: string) => void
}

const DocHeader = ({ onUpload, searchQuery = '', setSearchQuery }: DocHeaderProps) => {

  const handleUploadClick = () => {
    // Trigger file input
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf,.docx,.txt'
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      onUpload?.(file)  // gọi callback từ cha
    }
    input.click()
  }

  return (
    <div className="relative z-10 shrink-0 border-b border-white/5 bg-black/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-6 lg:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg shrink-0">C</div>
              Documents
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-slate-400 mt-1 hidden sm:block"
            >
              Private knowledge base management for CirrusDocs AI.
            </motion.p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery?.(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none transition-all focus:border-blue-500/50 glow-focus text-sm"
              />
            </div>
            
            <button
              onClick={handleUploadClick}
              className="group relative flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all active:scale-95 shadow-lg shadow-blue-900/20 whitespace-nowrap text-sm"
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="shimmer absolute inset-0 opacity-30" />
              </div>
              <Plus size={18} />
              <span>Upload</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocHeader
