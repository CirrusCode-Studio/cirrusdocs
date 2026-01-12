'use client'
import { useState, useMemo } from "react";
import DocHeader from "../components/DocHeader";
import DocTable from "../components/DocTable";
import { useDocData } from "../hooks/use-doc-data";
import { DocumentStatus, Document } from "../types";

const DocumentsPage = () => {
    const { documents: initialDocs = [] } = useDocData();
    const [docs, setDocs] = useState<Document[]>(initialDocs);

    const [searchQuery, setSearchQuery] = useState('');

    const filteredDocs = useMemo(() => {
        return docs.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [docs, searchQuery]);

    const handleDelete = (id: string) => {
        setDocs(prev => prev.filter(doc => doc.id !== id));
    };

    const handleChat = (id: string) => {
        console.log('Opening chat for doc:', id);
    };

    const handleUpload = () => {
        const newId = Math.random().toString(36).substr(2, 9);
        const newDoc: Document = {
            id: newId,
            name: `Manual_Upload_${Math.floor(Math.random() * 100)}.pdf`,
            type: 'pdf',
            uploadDate: new Date().toISOString().split('T')[0],
            status: DocumentStatus.PROCESSING,
            isNew: true
        };
        
        setDocs(prev => [newDoc, ...prev]);

        setTimeout(() => {
        setDocs(current => current.map(d => 
            d.id === newId ? { ...d, status: DocumentStatus.READY, isNew: true } : d
        ));
        }, 4000);
    };
    return (
    <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <DocHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onUpload={handleUpload}
        />

        {/* Main Content Area - Scrollable */}
        <DocTable
            filteredDocs={filteredDocs}
            handleUpload={handleUpload}
            handleDelete={handleDelete}
            handleChat={handleChat}
        />
    </div>
    )
}

export default DocumentsPage