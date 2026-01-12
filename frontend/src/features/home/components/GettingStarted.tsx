import { GlassCard } from "./ui/GlassCard"

const GettingStarted = () => {
    return (
    <GlassCard className="p-6 bg-linear-to-br from-indigo-600/10 to-blue-600/10 border-indigo-500/20">
        <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">Getting Started</h4>
        <div className="space-y-4">
            <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold border border-white/10 shrink-0">1</div>
            <div>
                <p className="text-sm font-medium text-white">Upload Documents</p>
                <p className="text-xs text-gray-400 mt-0.5">Bring your knowledge base to life.</p>
            </div>
            </div>
            <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold border border-white/10 shrink-0">2</div>
            <div>
                <p className="text-sm font-medium text-white">AI Indexing</p>
                <p className="text-xs text-gray-400 mt-0.5">We process and map every detail.</p>
            </div>
            </div>
            <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold border border-white/10 shrink-0">3</div>
            <div>
                <p className="text-sm font-medium text-white">Smart Retrieval</p>
                <p className="text-xs text-gray-400 mt-0.5">Chat with your data seamlessly.</p>
            </div>
            </div>
        </div>
    </GlassCard>
    )
}

export default GettingStarted