'use client'
import { useState, useMemo } from "react";
import DocHeader from "../components/DocHeader";
import DocTable from "../components/DocTable";
import { useDocumentData } from "../hooks/use-doc-data";
import { useDeleteDoc } from "../hooks/use-delete-doc";
import { useUploadDocument } from "../hooks/use-upload-doc";

const DocumentsPage = () => {
    const { data: documents = [], isLoading } = useDocumentData();
    const uploadDoc = useUploadDocument();    
    const deleteDoc = useDeleteDoc();

    const [searchQuery, setSearchQuery] = useState('');

    const filteredDocs = useMemo(() => {
        return documents.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [documents, searchQuery]);

    const handleChat = (id: string) => {
        console.log('Opening chat for doc:', id);
    };

    if (isLoading) {
        return <div>Loading documents...</div>;
    }

    return (
    <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <DocHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onUpload={(file) => uploadDoc.mutate(file)}
        />

        {/* Main Content Area - Scrollable */}
        <DocTable
            filteredDocs={filteredDocs}
            handleUpload={() => {}}
            handleDelete={(id: string) => deleteDoc.mutate(id)}
            handleChat={handleChat}
        />
    </div>
    )
}

export default DocumentsPage