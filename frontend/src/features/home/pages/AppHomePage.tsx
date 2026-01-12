'use client'
import { useState } from "react";
import { useHomeData } from "../hooks/use-home-data"
import HeroHeader from "../components/HeroHeader";
import QuickActions from "../components/QuickActions";
import RecentDocuments from "../components/RecentDocuments";
import RecentActivity from "../components/RecentActivity";
import GettingStarted from "../components/GettingStarted";
import { DocStatus, Document } from "../types";
import { formatFileSize } from "@/utils/file";

const AppHomePage = () => {
    const { documents: initialDocs, chats, user } = useHomeData();
    const [documents, setDocuments] = useState(initialDocs);
    const [isUploading, setIsUploading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleFileUpload = (file: File) => {
        setIsUploading(true);

        const newDocId = Math.random().toString(36).substr(2, 9);
        const newDoc: Document = {
        id: newDocId,
        name: file.name,
        size: formatFileSize(file.size),
        format: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        status: DocStatus.INDEXING,
        timestamp: 'Just now',
        progress: 0
        };

        setDocuments(prev => [newDoc, ...prev]);

        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
        progress += Math.random() * 12;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setDocuments(prev =>
            prev.map(d => d.id === newDocId
                ? { ...d, status: DocStatus.INDEXED, progress: 100, timestamp: 'Moments ago' }
                : d
            )
            );

            setIsUploading(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }

        setDocuments(prev =>
            prev.map(d => d.id === newDocId ? { ...d, progress: Math.min(progress, 99) } : d)
        );
        }, 300);
    };
    
    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-5">
            <HeroHeader userName={user.name} />

            <QuickActions onUpload={handleFileUpload}/>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <RecentDocuments documents={documents} />
                <div className="space-y-4">
                <RecentActivity chats={chats} />
                <GettingStarted />
                </div>
            </div>
        </div>
    )
}

export default AppHomePage;