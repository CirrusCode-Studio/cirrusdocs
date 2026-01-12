
export interface Source {
  id: string;
  title: string;
  snippet: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  timestamp: number;
}

export enum AppStatus {
  IDLE = 'idle',
  THINKING = 'thinking',
  READY = 'ready'
}

export interface KnowledgeBase {
  documentCount: number;
  status: 'active' | 'empty';
}