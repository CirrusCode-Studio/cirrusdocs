import { Bot, MessageSquare } from "lucide-react"
import { KnowledgeBase } from "../../types"

const TopBar = ({documentCount}: KnowledgeBase) => {

    return (
    <div className="h-16 flex items-center justify-between px-6 glass border-b border-white/5 z-20 sticky top-0">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Bot size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
                CirrusDocs <span className="text-blue-400">AI</span>
            </span>
        </div>

        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                <div className={`w-2 h-2 rounded-full ${documentCount > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-xs font-semibold text-blue-200">
                Context: {documentCount} Documents Ready
                </span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <button className="text-slate-400 hover:text-white transition-colors">
                <MessageSquare size={18} />
            </button>
        </div>
    </div>
    )
}

export default TopBar