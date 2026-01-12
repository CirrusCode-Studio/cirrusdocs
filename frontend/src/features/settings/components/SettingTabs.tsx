'use client'
import {tabs, TabType, UserSettings } from "../types";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import ProfileSection from "./ProflieSection";
import AIBehaviorSection from "./AIBehaviorSection";
import UsageSection from "./UsageSection";
import PrivacySection from "./PrivacySection";

interface SettingTabsProps {
    activeTab: string
    settings: UserSettings
    showAutoSave: boolean
    updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void
}

const SettingTabs = ({activeTab, settings, showAutoSave, updateSetting}: SettingTabsProps) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <span className="text-blue-500 text-sm font-bold uppercase tracking-widest">Account Settings</span>
              </div>
              <h2 className="text-4xl font-black tracking-tight mb-2">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="text-gray-400 text-lg">Configure your workspace and AI preferences</p>
            </div>
            
            {/* Auto-save Indicator */}
            <AnimatePresence>
              {showAutoSave && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Cloud synced
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tab Content with Framer Motion */}
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {activeTab === TabType.PROFILE && (
                  <ProfileSection settings={settings} onUpdate={updateSetting} />
                )}
                {activeTab === TabType.AI_BEHAVIOR && (
                  <AIBehaviorSection settings={settings} onUpdate={updateSetting} />
                )}
                {activeTab === TabType.USAGE && (
                  <UsageSection settings={settings} />
                )}
                {activeTab === TabType.PRIVACY && (
                  <PrivacySection />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
    )
}

export default SettingTabs;