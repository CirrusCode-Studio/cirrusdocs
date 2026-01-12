export interface ChatSession {
  id: string;
  title: string;
  snippet: string;
  timestamp: string;
  date: Date;
  tags: string[];
  isPinned?: boolean;
}

export type TimelineGroup = 'Today' | 'Yesterday' | 'Earlier this month';
