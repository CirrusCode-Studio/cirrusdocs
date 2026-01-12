'use client'
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChatSession, TimelineGroup } from '../types';
import { HistoryItem } from './HistoryItem';
import EmptyState from './ui/EmptyState';

interface ChatHistoryProps {
    chats: ChatSession[];
    isLoading: boolean;
    onDelete: (id: string) => void;
    onTogglePin: (id: string) => void;
    viewMode: 'list' | 'grid';
}

const ChatHistory = ({ chats, isLoading, onDelete, onTogglePin, viewMode }: ChatHistoryProps) => {
    const grouped = chats.reduce((acc, chat) => {
        const diff = Date.now() - chat.date.getTime();
        const dayDiff = diff / (1000 * 60 * 60 * 24);

        let group: TimelineGroup;
        if (dayDiff < 1) group = 'Today';
        else if (dayDiff < 2) group = 'Yesterday';
        else group = 'Earlier this month';

        if (!acc[group]) acc[group] = [];
        acc[group].push(chat);
        return acc;
    }, {} as Record<TimelineGroup, ChatSession[]>);

    const groups: TimelineGroup[] = ['Today', 'Yesterday', 'Earlier this month'];

    if (chats.length === 0 && !isLoading) {
        return <EmptyState />;
    }

    return (
    <div className="space-y-10 pb-10">
        {groups.map((group) => {
            const items = grouped[group];
            if (!items || items.length === 0) return null;

            return (
            <div key={group} className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 px-1">
                {group}
                </h2>
                <div className={viewMode === 'list' ? 'flex flex-col gap-2' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}>
                <AnimatePresence mode="popLayout" initial={false}>
                    {items.sort((a, b) => {
                    if (a.isPinned && !b.isPinned) return -1;
                    if (!a.isPinned && b.isPinned) return 1;
                    return b.date.getTime() - a.date.getTime();
                    }).map((chat, index) => (
                    <HistoryItem 
                        key={chat.id} 
                        chat={chat} 
                        index={index} 
                        onDelete={onDelete}
                        onTogglePin={onTogglePin}
                        viewMode={viewMode}
                    />
                    ))}
                </AnimatePresence>
                </div>
            </div>
            );
        })}
    </div>
    );
};

export default ChatHistory;