import React, { useState } from 'react';
import { FiLock, FiBell, FiShield, FiUser, FiSmartphone, FiGlobe, FiSave } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function UserSettings() {
  const { user, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('security');
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      notices: true,
      messages: true
    },
    privacy: {
      showOnDirectory: true,
      allowDirectMessages: true,
      shareStatus: true
    },
    preferences: {
      language: 'English',
      theme: 'System',
      timezone: '(GMT+05:30) India Standard Time'
    }
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    addToast('success', 'Preferences Updated', 'Your personal account settings have been synchronized.');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] tracking-tighter italic uppercase">Account Settings</h1>
          <p className="text-[10px] md:text-xs font-black text-[var(--text-muted)] mt-1.5 uppercase tracking-[0.2em] leading-none">Manage your personal preferences and security</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition shadow-xl shadow-indigo-100/20 active:scale-95 flex items-center justify-center gap-3"
        >
          {loading ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <FiSave size={14} />}
          {loading ? 'Synchronizing...' : 'Save Preferences'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-[var(--bg-card)] rounded-[2.5rem] border border-[var(--border)] p-4 shadow-sm space-y-2 ring-1 ring-white/5">
            {[
              { id: 'security', label: 'Security & Access', icon: <FiLock /> },
              { id: 'notifications', label: 'Notification Feed', icon: <FiBell /> },
              { id: 'privacy', label: 'Privacy Protocols', icon: <FiShield /> },
              { id: 'preferences', label: 'Sync Preferences', icon: <FiGlobe /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 w-full px-5 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-indigo-50 text-indigo-600 shadow-sm dark:bg-indigo-900/20 dark:text-indigo-400' 
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : ''}`}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-[var(--bg-card)] rounded-[3rem] border border-[var(--border)] p-8 md:p-12 shadow-sm min-h-[500px] ring-1 ring-white/5">
          <AnimatePresence mode="wait">
            {activeTab === 'security' && (
              <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                <div className="border-b border-[var(--border)] pb-6">
                  <h3 className="text-xl font-black text-[var(--text-primary)] italic uppercase">Security Baseline</h3>
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-1">Manage institutional access credentials</p>
                </div>
                
                <div className="space-y-6 max-w-md">
                   <div>
                      <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-3 px-1">Institutional Password</label>
                      <button className="w-full py-4 bg-[var(--bg)] border border-[var(--border)] rounded-2xl font-black text-[10px] uppercase tracking-widest text-indigo-500 hover:bg-indigo-500/10 transition shadow-inner">Update Credentials</button>
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-3 px-1">Two-Factor Authentication</label>
                      <div className="flex items-center justify-between p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                         <div className="flex items-center gap-4">
                            <FiSmartphone className="text-emerald-500" size={20} />
                            <div>
                               <p className="text-[11px] font-black text-emerald-500 uppercase tracking-tight">Status: Active</p>
                               <p className="text-[9px] font-black text-emerald-500/50 uppercase">High Integrity Protocol</p>
                            </div>
                         </div>
                         <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">Manage</button>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                <div className="border-b border-[var(--border)] pb-6">
                  <h3 className="text-xl font-black text-[var(--text-primary)] italic uppercase">Broadcast Hub</h3>
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-1">Configure real-time telemetry alerts</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {[
                     { label: 'Institutional Notices', desc: 'Alerts for official school announcements', value: settings.notifications.notices },
                     { label: 'Direct Messaging', desc: 'Notifications for peer-to-peer communication', value: settings.notifications.messages },
                     { label: 'Email Summaries', desc: 'Weekly digest of academic performance', value: settings.notifications.email },
                     { label: 'System Telemetry', desc: 'Security and login attempts', value: settings.notifications.push },
                   ].map(item => (
                     <div key={item.label} className="flex items-center justify-between p-6 bg-[var(--bg)] border border-[var(--border)] rounded-3xl hover:bg-[var(--bg-card)] hover:shadow-xl hover:shadow-indigo-500/10 transition-all group">
                       <div className="pr-4">
                         <div className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-tight group-hover:text-indigo-500 transition-colors">{item.label}</div>
                         <div className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-tight mt-1">{item.desc}</div>
                       </div>
                       <div className="w-12 h-6 bg-[var(--border)] rounded-full relative cursor-pointer group-hover:bg-indigo-500/20 transition-colors">
                          <div className={`absolute top-1 bottom-1 w-4 rounded-full transition-all ${item.value ? 'right-1 bg-indigo-500 shadow-md' : 'left-1 bg-[var(--bg-card)] shadow-sm'}`} />
                       </div>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'privacy' && (
              <motion.div key="privacy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                <div className="border-b border-[var(--border)] pb-6">
                  <h3 className="text-xl font-black text-[var(--text-primary)] italic uppercase">Privacy Protocols</h3>
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-1">Manage institutional data visibility and access</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {[
                     { label: 'Directory Presence', desc: 'Display your contact details in the institutional directory', key: 'showOnDirectory' },
                     { label: 'Peer Communication', desc: 'Allow direct messaging from verified peer roles', key: 'allowDirectMessages' },
                     { label: 'Activity Status', desc: 'Share your real-time availability with instructors', key: 'shareStatus' },
                     { label: 'Asset Disclosure', desc: 'Make your library wishlist visible to classmates', key: 'assetDisclosure' },
                   ].map(item => (
                     <div key={item.label} className="p-6 bg-[var(--bg)] border border-[var(--border)] rounded-3xl hover:bg-[var(--bg-card)] hover:shadow-xl hover:shadow-indigo-500/10 transition-all group">
                       <div className="flex justify-between items-start mb-4">
                          <div className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-tight group-hover:text-indigo-500 transition-colors">{item.label}</div>
                          <div className="w-10 h-5 bg-[var(--border)] rounded-full relative cursor-pointer group-hover:bg-indigo-500/20 transition-colors">
                             <div className={`absolute top-0.5 bottom-0.5 w-4 rounded-full transition-all ${settings.privacy[item.key] ? 'right-0.5 bg-indigo-500' : 'left-0.5 bg-[var(--bg-card)]'}`} />
                          </div>
                       </div>
                       <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-tight leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                </div>

                <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-[2rem] flex flex-col md:flex-row items-center gap-6">
                   <div className="w-12 h-12 bg-[var(--bg-card)] rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-indigo-500">
                      <FiShield size={24} />
                   </div>
                   <div className="text-center md:text-left">
                      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-tight">System Managed Encryption</p>
                      <p className="text-[9px] font-black text-indigo-500/50 uppercase mt-0.5">End-to-end encryption is enforced by Central Administration for all institutional data transfers.</p>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div key="preferences" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                <div className="border-b border-[var(--border)] pb-6">
                  <h3 className="text-xl font-black text-[var(--text-primary)] italic uppercase">Localization & UX</h3>
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-1">Synchronize your personal interface parameters</p>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest block px-1">Institutional Language</label>
                      <div className="relative">
                        <select 
                          className="w-full h-14 px-5 bg-[var(--bg)] border border-[var(--border)] rounded-2xl outline-none focus:border-indigo-500 font-black text-[11px] uppercase tracking-widest cursor-pointer shadow-inner appearance-none transition-all pr-12 text-[var(--text-primary)]"
                          value={settings.preferences.language}
                          onChange={(e) => setSettings({...settings, preferences: {...settings.preferences, language: e.target.value}})}
                        >
                          <option className="bg-[var(--bg-card)]">English (Global)</option>
                          <option className="bg-[var(--bg-card)]">Hindi (Regional)</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
                           <FiGlobe size={16} />
                        </div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest block px-1">Interface Protocol (Theme)</label>
                      <div className="relative">
                        <select 
                          className="w-full h-14 px-5 bg-[var(--bg)] border border-[var(--border)] rounded-2xl outline-none focus:border-indigo-500 font-black text-[11px] uppercase tracking-widest cursor-pointer shadow-inner appearance-none transition-all pr-12 text-[var(--text-primary)]"
                          value={settings.preferences.theme}
                          onChange={(e) => setSettings({...settings, preferences: {...settings.preferences, theme: e.target.value}})}
                        >
                          <option className="bg-[var(--bg-card)]">System Default</option>
                          <option className="bg-[var(--bg-card)]">Light Mode</option>
                          <option className="bg-[var(--bg-card)]">Dark Mode (Institutional)</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
                           <FiSmartphone size={16} />
                        </div>
                      </div>
                   </div>
                   <div className="col-span-full space-y-4">
                      <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest block px-1">Institutional Timezone</label>
                      <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl flex items-center justify-between group">
                         <div className="flex items-center gap-4">
                            <FiGlobe className="text-indigo-500" size={20} />
                            <span className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-tight italic">Asia/Kolkata (GMT +05:30)</span>
                         </div>
                         <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Verified by GPS</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
