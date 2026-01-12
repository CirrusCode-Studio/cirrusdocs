
export enum DocStatus {
  INDEXED = 'Indexed',
  INDEXING = 'Indexing',
  FAILED = 'Failed'
}

export interface Document {
  id: string;
  name: string;
  size: string;
  format: string;
  status: DocStatus;
  timestamp: string;
  progress?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}
