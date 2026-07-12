import React, { useState, useRef } from 'react';
import { 
  FiSave, FiSettings, FiBriefcase, FiLock, FiInfo, FiUpload, 
  FiGlobe, FiDatabase, FiDownload, FiRefreshCcw, FiSliders, FiImage, FiFileText
} from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSettings() {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const logoInputRef = useRef(null);

  const [form, setForm] = useState({
    schoolName: 'XYZ Higher Secondary School',
    website: 'https://xyzschool.edu.in',
    email: 'contact@xyzschool.edu.in',
    phone: '+91 98765 43210',
    address: '123 Educational Hub, Jaipur, Rajasthan',
    session: '2024-2025',
    gradingSystem: 'CGPA',
    primaryColor: '#6366F1',
    schoolLogo: null,
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    addToast('success', 'Configuration Saved', 'System settings have been updated successfully.');
  };

  const handleDatabaseBackup = async () => {
    addToast('info', 'Backup Started', 'Compressing database tables and generating SQL dump...');
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    
    // Simulate File Download
    const data = "-- XYZ School Management System Backup\n-- Generated on: " + new Date().toLocaleString() + "\n\nCREATE DATABASE IF NOT EXISTS vikram_db;\nUSE vikram_db;\n...";
    const blob = new Blob([data], { type: 'text/sql' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vikram_Backup_${new Date().toISOString().split('T')[0]}.sql`;
    a.click();
    
    addToast('success', 'Backup Complete', 'Database .sql file has been downloaded.');
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm(prev => ({ ...prev, schoolLogo: ev.target.result }));
        addToast('success', 'Logo Uploaded', 'School brand logo has been updated.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Administration & Settings</h1>
          <p className="text-slate-500">Configure global parameters, security, and white-labeling</p>
        </div>
        {activeTab !== 'database' && (
          <button 
            onClick={handleSave} 
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <FiSave />}
            {loading ? 'Saving Changes...' : 'Save Configuration'}
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1">
            {[
              { id: 'general', label: 'School Profile', icon: <FiGlobe /> },
              { id: 'appearance', label: 'White Marking', icon: <FiSliders /> },
              { id: 'database', label: 'Backup & Restore', icon: <FiDatabase /> },
              { id: 'users', label: 'Security & Access', icon: <FiLock /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 w-full px-4 py-4 text-sm font-bold rounded-xl transition ${
                  activeTab === tab.id ? 'bg-indigo-50 text-primary' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Setting Panels */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'general' && (
              <motion.div key="general" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 underline decoration-indigo-200 underline-offset-8">School Operational Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-full">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Institutional Name</label>
                    <input className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-medium" value={form.schoolName} onChange={e => setForm({...form, schoolName: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Official Website</label>
                    <input className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500" value={form.website} onChange={e => setForm({...form, website: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Institutional Email</label>
                    <input className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Academic Session</label>
                    <select className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 cursor-pointer" value={form.session} onChange={e => setForm({...form, session: e.target.value})}>
                      <option>2024-2025</option><option>2025-2026</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Grading Model</label>
                    <select className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 cursor-pointer" value={form.gradingSystem} onChange={e => setForm({...form, gradingSystem: e.target.value})}>
                      <option>CGPA (10 Pt)</option><option>Percentage (%)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div key="appearance" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 underline decoration-indigo-200 underline-offset-8">White Labeling Content</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Institutional Brand Logo</label>
                    <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                      <div className="w-24 h-24 bg-white rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
                        {form.schoolLogo ? <img src={form.schoolLogo} className="w-full h-full object-contain p-2" alt="Logo" /> : <FiImage size={32} className="text-slate-200" />}
                      </div>
                      <div className="space--4">
                        <input type="file" ref={logoInputRef} className="hidden" onChange={handleLogoUpload} accept="image/*" />
                        <button onClick={() => logoInputRef.current.click()} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition">
                          <FiUpload /> Upload New Logo
                        </button>
                        <p className="text-[10px] text-slate-400">Max size 2MB. SVG, PNG or JPG supported.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Primary Theme Color</label>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                       <p className="text-xs text-slate-500 mb-4 font-medium">Select a color that reflects your institution's professional branding.</p>
                       <div className="flex flex-wrap gap-4">
                          {['#6366F1', '#2563EB', '#7C3AED', '#059669', '#DC2626', '#EA580C'].map(color => (
                            <button 
                              key={color} 
                              onClick={() => setForm({...form, primaryColor: color})}
                              className={`w-10 h-10 rounded-full border-4 shadow-sm transition active:scale-95 ${form.primaryColor === color ? 'border-white ring-4 ring-indigo-100' : 'border-transparent'}`}
                              style={{ background: color }}
                            />
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'database' && (
              <motion.div key="database" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center justify-center p-12 text-center">
                 <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-amber-100">
                    <FiDatabase size={36} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-800 mb-2">Institutional Database Backup</h3>
                 <p className="text-slate-500 max-w-sm mb-10 text-sm leading-relaxed">Securely export your entire school dataset into a point-in-time SQL dump for offline storage or disaster recovery.</p>
                 
                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 w-full max-w-md mb-8 grid grid-cols-2 gap-4">
                    <div className="text-left space-y-1">
                       <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Database Size</span>
                       <p className="font-bold text-slate-700">14.2 MB</p>
                    </div>
                    <div className="text-left space-y-1">
                       <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Last Offline Backup</span>
                       <p className="font-bold text-slate-700">2 Hours Ago</p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button 
                      onClick={handleDatabaseBackup}
                      disabled={loading}
                      className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95"
                    >
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiDownload />}
                      {loading ? 'Processing...' : 'Backup Database Now (SQL)'}
                    </button>
                    <button className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition">
                      <FiRefreshCcw /> Restore Point
                    </button>
                 </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div key="users" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 underline decoration-indigo-200 underline-offset-8">Access Control Policies</h3>
                <div className="overflow-hidden border border-slate-200 rounded-2xl">
                   <table className="w-full text-left">
                      <thead className="bg-slate-50 font-bold text-[10px] uppercase text-slate-400 tracking-widest border-b border-slate-200">
                         <tr><th className="px-6 py-4">Role Designation</th><th className="px-6 py-4">Attendance</th><th className="px-6 py-4">Academics</th><th className="px-6 py-4">Financials</th><th className="px-6 py-4">Management</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 italic">
                         {['SuperAdmin', 'Teacher', 'Accountant', 'Librarian'].map(role => (
                           <tr key={role}>
                              <td className="px-6 py-4 font-bold text-slate-700 not-italic">{role}</td>
                              <td className="px-6 py-4"><div className="w-4 h-4 rounded bg-emerald-500 border border-emerald-600" /></td>
                              <td className="px-6 py-4"><div className={`w-4 h-4 rounded ${role !== 'Accountant' ? 'bg-emerald-500' : 'bg-slate-200'}`} /></td>
                              <td className="px-6 py-4"><div className={`w-4 h-4 rounded ${role === 'SuperAdmin' || role === 'Accountant' ? 'bg-emerald-500' : 'bg-slate-200'}`} /></td>
                              <td className="px-6 py-4"><div className={`w-4 h-4 rounded ${role === 'SuperAdmin' ? 'bg-emerald-500' : 'bg-slate-200'}`} /></td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

