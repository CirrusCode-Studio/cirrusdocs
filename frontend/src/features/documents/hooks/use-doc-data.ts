import { Document, DocumentStatus } from "../types";
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    name: 'Quarterly_Strategy_2024.pdf',
    type: 'pdf',
    uploadDate: '2024-03-15',
    status: DocumentStatus.READY
  },
  {
    id: '2',
    name: 'User_Feedback_Summary.csv',
    type: 'csv',
    uploadDate: '2024-03-20',
    status: DocumentStatus.PROCESSING,
  },
  {
    id: '3',
    name: 'API_Documentation_Draft.docx',
    type: 'docx',
    uploadDate: '2024-03-22',
    status: DocumentStatus.UPLOADING,
    uploadProgress: 65
  },
  {
    id: '4',
    name: 'Legacy_Archive_Data.zip',
    type: 'zip',
    uploadDate: '2024-03-18',
    status: DocumentStatus.FAILED,
    errorMessage: 'Unsupported format'
  }
];

export function useDocData () {
    return {
        documents: MOCK_DOCUMENTS
    }
}