import { Activity, ChevronRight } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";
import { ChatSession } from "../types";

const RecentActivity = ({chats}: {chats: ChatSession[]}) => {
    return (
        <>
            <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="text-indigo-400" size={20} />
              Recent Activity
            </h2>
          </div>

          <div className="space-y-3">
            {chats.map((chat) => (
              <GlassCard key={chat.id} className="p-4 group cursor-pointer" tilt={false}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white group-hover:text-indigo-400 transition-colors">{chat.title}</h4>
                    <span className="text-[10px] text-gray-500 uppercase">{chat.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 italic leading-relaxed">
                    &quot;{chat.lastMessage}&quot;
                  </p>
                  <div className="pt-2 flex justify-end">
                    <ChevronRight size={16} className="text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </>
    )
}

export default RecentActivity;