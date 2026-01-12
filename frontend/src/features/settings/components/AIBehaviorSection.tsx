
import React from 'react';
import { Zap, AlignLeft, Sparkles, Globe, LucideIcon } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Toggle from './ui/Toggle';
import { UserSettings, AnswerStyle, UpdateSettingFn } from '../types';

interface AIBehaviorSectionProps {
  settings: UserSettings;
  onUpdate: UpdateSettingFn
}

const AIBehaviorSection = ({ settings, onUpdate }: AIBehaviorSectionProps) => {
    const styles: { id: AnswerStyle; label: string; desc: string; icon: LucideIcon }[] = [
        { id: 'concise', label: 'Concise', desc: 'Direct, bite-sized answers.', icon: Zap },
        { id: 'detailed', label: 'Detailed', desc: 'Deep-dives and context.', icon: AlignLeft },
        { id: 'creative', label: 'Creative', desc: 'Brainstorming and flair.', icon: Sparkles },
    ];

    const languages = ['English (US)', 'Spanish', 'French', 'German', 'Japanese', 'Mandarin'];

    return (
        <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {styles.map((style) => (
            <button
                key={style.id}
                onClick={() => onUpdate('answerStyle', style.id)}
                className={`flex flex-col items-start p-5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${
                settings.answerStyle === style.id
                    ? 'bg-blue-600/10 border-blue-500/40 ring-1 ring-blue-500/40'
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
            >
                <div className={`p-2.5 rounded-xl mb-4 transition-colors ${
                settings.answerStyle === style.id ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-400'
                }`}>
                <style.icon className="w-5 h-5" />
                </div>
                <h4 className={`font-semibold mb-1 ${settings.answerStyle === style.id ? 'text-white' : 'text-gray-300'}`}>
                {style.label}
                </h4>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                {style.desc}
                </p>
                {settings.answerStyle === style.id && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                )}
            </button>
            ))}
        </div>

        <GlassCard title="Capabilities & Logic">
            <div className="space-y-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-6">
                <Toggle 
                label="Always show citations and sources" 
                checked={settings.showSources} 
                onChange={(val) => onUpdate('showSources', val)} 
                />
                <div className="pt-6 border-t border-white/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                        <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-gray-300 font-medium">Primary Language</span>
                    </div>
                    <select 
                    value={settings.language}
                    onChange={(e) => onUpdate('language', e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500/50"
                    >
                    {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                    </select>
                </div>
                </div>
            </div>
            </div>
        </GlassCard>

        <GlassCard className="bg-linear-to-r from-blue-600/10 to-indigo-600/10 border-blue-500/20">
            <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-white/10 border border-white/10 text-white">
                <Sparkles className="w-6 h-6" />
            </div>
            <div>
                <h4 className="text-lg font-bold text-white mb-1">Advanced Reasoning Beta</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                Enable the experimental logic engine for solving complex mathematical and coding queries. This model uses 2x tokens per request.
                </p>
                <button className="mt-4 px-4 py-1.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors">
                Apply for Beta
                </button>
            </div>
            </div>
        </GlassCard>
        </div>
    );
};

export default AIBehaviorSection;
