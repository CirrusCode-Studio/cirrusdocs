'use client'
import { useState, useMemo } from "react";
import { ChatSession } from "../types";
import { MOCK_CHATS } from "../hooks/use-his-data";
import HisHeader from "../components/HisHeader";
import ControlsBar from "../components/ControlsBar";
import ChatHistory from "../components/ChatHistory";

const ChatHistoryPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState<ChatSession[]>(MOCK_CHATS);
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    // Filter logic
    const filteredChats = useMemo(() => {
        return chats.filter(chat => 
        chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery, chats]);

    const handleDelete = (id: string) => {
        setChats(prev => prev.filter(c => c.id !== id));
    };

    const handleTogglePin = (id: string) => {
        setChats(prev => prev.map(c => 
        c.id === id ? { ...c, isPinned: !c.isPinned } : c
        ));
    };
    return (
    <div className="max-h-screen text-white relative overflow-hidden flex flex-col items-center">
        
        <div className="w-full max-w-7xl z-10 flex flex-col gap-8 h-[calc(100vh-5rem)]">
            {/* Header Section */}
            <HisHeader />

            {/* Controls Bar */}
            <ControlsBar viewMode={viewMode} setViewMode={setViewMode} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <ChatHistory 
                    chats={filteredChats} 
                    isLoading={isLoading} 
                    onDelete={handleDelete}
                    onTogglePin={handleTogglePin}
                    viewMode={viewMode}
                />
            </div>
        </div>
    </div>
    );
}

export default ChatHistoryPage;