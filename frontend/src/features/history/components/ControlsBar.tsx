import { Search, Filter, List, LayoutGrid } from "lucide-react"

interface ControlsBarProps {
    viewMode: string
    setViewMode: (viewMode: 'list' | 'grid') => void
    searchQuery: string
    setSearchQuery: (searchQuery: string) => void

}
const ControlsBar = ({viewMode, setViewMode, searchQuery, setSearchQuery}: ControlsBarProps) => {
    return (
    <section className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white/60 transition-colors" size={18} />
        <input 
            type="text"
            placeholder="Search history, snippets, or files..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="w-full bg-white/3 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-white/6 transition-all placeholder:text-white/20"
        />
        </div>
        <div className="flex gap-2">
        <button className="p-2.5 bg-white/3 border border-white/10 rounded-xl hover:bg-white/6 transition-all text-white/60">
            <Filter size={18} />
        </button>
        <div className="flex bg-white/3 border border-white/10 rounded-xl p-1 gap-1">
            <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-white/30 hover:text-white/60'}`}
            >
            <List size={18} />
            </button>
            <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-sm' : 'text-white/30 hover:text-white/60'}`}
            >
            <LayoutGrid size={18} />
            </button>
        </div>
        </div>
    </section>
    )
}

export default ControlsBar