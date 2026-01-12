import { Plus } from "lucide-react"

const HisHeader = () => {
    return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-6 py-6 lg:py-8">
        <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-white/90">Chat History</h1>
            <p className="text-white/40 text-sm font-medium">Review and resume your conversations with CirrusDocs AI.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/90 transition-all active:scale-95 shadow-lg shadow-white/5">
            <Plus size={18} />
            Start New Chat
        </button>
    </div>
    )
}

export default HisHeader;