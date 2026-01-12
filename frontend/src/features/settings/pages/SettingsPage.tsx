'use client'
import { useState } from "react";
import { TabType } from "../types";
import { UserSettings } from "../types";
import TopBar from "../components/TopBar";
import SettingTabs from "../components/SettingTabs";

const SettingPages = () => {
    const [activeTab, setActiveTab] = useState<TabType>(TabType.PROFILE);
    const [showAutoSave, setShowAutoSave] = useState(false);
    
    const [settings, setSettings] = useState<UserSettings>({
        name: 'Julian Sterling',
        email: 'julian@cirrusdocs.ai',
        avatar: 'https://picsum.photos/id/64/200/200',
        answerStyle: 'detailed',
        showSources: true,
        language: 'English (US)',
        storageUsed: 4.2,
        storageLimit: 10,
        queryCount: 750,
        queryLimit: 1000,
        isPro: true
    });

    const triggerAutoSave = () => {
        setShowAutoSave(true);
        setTimeout(() => setShowAutoSave(false), 2000);
    };

    const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        triggerAutoSave();
    };
   
    return (
    <div className="min-h-screen text-white flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <TopBar activeTab={activeTab} setActiveTab={setActiveTab} avartar={settings.avatar}/>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto relative custom-scrollbar">
            {/* Page Title & Status Banner */}
            <SettingTabs activeTab={activeTab} settings={settings} showAutoSave={showAutoSave} updateSetting={updateSetting}/>
        </div>
    </div>
    )
}

export default SettingPages