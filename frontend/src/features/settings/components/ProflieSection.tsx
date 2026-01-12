
import React, { useState } from 'react';
import { Camera, Mail, User, Lock } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { UpdateSettingFn, UserSettings } from '../types';
import Modal from '@/components/shared/Modal';

interface ProfileSectionProps {
  settings: UserSettings;
  onUpdate: UpdateSettingFn;
}

const ProfileSection = ({ settings, onUpdate }: ProfileSectionProps) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <GlassCard title="Public Profile" description="Update your personal details and avatar.">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500/20 group-hover:border-blue-500/50 transition-all duration-300">
                <img src={settings.avatar} alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition-opacity duration-300">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">
              Upload New
            </button>
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    value={settings.name}
                    onChange={(e) => onUpdate('name', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="email" 
                    readOnly
                    value={settings.email}
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard title="Security" description="Manage your authentication and account safety.">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-white/90">Password Protection</h4>
              <p className="text-sm text-gray-400">Your password was last changed 3 months ago.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsPasswordModalOpen(true)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-600/20"
          >
            Change Password
          </button>
        </div>
      </GlassCard>

      <Modal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Password"
        confirmText="Update Password"
        onConfirm={() => setIsPasswordModalOpen(false)}
      >
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500/50" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500/50" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileSection;