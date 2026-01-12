import { ChatSession, Document, DocStatus } from "../types";
const MOCK_CHATS: ChatSession[] = [
  { id: 'c1', title: 'Financial Analysis Q4', lastMessage: 'The revenue growth was projected at...', timestamp: '1 hour ago' },
  { id: 'c2', title: 'Tech Stack Query', lastMessage: 'Which vector database are we using?', timestamp: '5 hours ago' },
];

const MOCK_DOCS: Document[] = [
  { id: '1', name: 'Q4 Financial Report.pdf', size: '2.4 MB', format: 'PDF', status: DocStatus.INDEXED, timestamp: '2 hours ago' },
  { id: '2', name: 'API_Documentation_v2.docx', size: '1.1 MB', format: 'DOCX', status: DocStatus.INDEXING, timestamp: 'Just now', progress: 65 },
  { id: '3', name: 'Product_Roadmap_2025.pdf', size: '4.8 MB', format: 'PDF', status: DocStatus.INDEXED, timestamp: '1 day ago' },
];
const useHomeData = () => {
    return {
        user: { name: 'Alexander' },
        documents: MOCK_DOCS,
        chats: MOCK_CHATS,
    };
}

export { useHomeData }