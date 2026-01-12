import { User, Brain, CreditCard, Shield } from "lucide-react";

export enum TabType {
  PROFILE = 'profile',
  AI_BEHAVIOR = 'ai_behavior',
  USAGE = 'usage',
  PRIVACY = 'privacy'
}

export type AnswerStyle = 'concise' | 'detailed' | 'creative';

export type UpdateSettingFn = <K extends keyof UserSettings>(
  key: K,
  value: UserSettings[K]
) => void;

export interface UserSettings {
  name: string;
  email: string;
  avatar: string;
  answerStyle: AnswerStyle;
  showSources: boolean;
  language: string;
  storageUsed: number;
  storageLimit: number;
  queryCount: number;
  queryLimit: number;
  isPro: boolean;
}

export const tabs = [
    { id: TabType.PROFILE, label: 'Profile', icon: User },
    { id: TabType.AI_BEHAVIOR, label: 'AI Behavior', icon: Brain },
    { id: TabType.USAGE, label: 'Usage', icon: CreditCard },
    { id: TabType.PRIVACY, label: 'Privacy', icon: Shield },
];