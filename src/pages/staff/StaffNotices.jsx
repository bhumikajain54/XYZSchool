import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiCalendar, FiFilter, FiDownload, FiSearch, FiArrowRight, FiInfo, FiAlertCircle, FiClock, FiFileText } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

export default function StaffNotices() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [search, setSearch] = useState('');

  const notices = [
    { id: 1, type: 'Administrative', priority: 'High', title: 'New School Policy on Digital Attendance', date: 'Oct 15, 2024', desc: 'Starting next week, all staff must use the biometric scanner upon entry and exit.', author: 'Dr. Rajesh Kumar', attachment: true },
    { id: 2, type: 'Academic', priority: 'Medium', title: 'Half-Term Examination Schedule Released', date: 'Oct 12, 2024', desc: 'The exam schedule for Grades 8-12 is now available in the academic portal.', author: 'Academic Block', attachment: true },
    { id: 3, type: 'Event', priority: 'Low', title: 'Annual Cultural Fest - Volunteer Call', date: 'Oct 10, 2024', desc: 'Staff members interested in organizing the annual fest can register by Friday.', author: 'Cultural Committee', attachment: false },
    { id: 4, type: 'Emergency', priority: 'High', title: 'Campus Maintenance - Electricity Downtime', date: 'Oct 08, 2024', desc: 'Electricity will be cut off for 2 hours (12 PM to 2 PM) this Saturday for server room maintenance.', author: 'Maintenance Dept', attachment: false },
    { id: 5, type: 'Academic', priority: 'Low', title: 'New Reference Books added to Library', date: 'Oct 05, 2024', desc: 'The library has received a fresh batch of 50 biology textbooks for Grade 12.', author: 'Sonal Mehta', attachment: true },
  ];

  const filtered = notices.filter(n => (selectedFilter === 'All' || n.type === selectedFilter) && (n.title.toLowerCase().includes(search.toLowerCase()) || n.desc.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="page-enter py-4 sm:py-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight italic uppercase">Institutional Gazettes</h3>
          <p className="text-[10px] sm:text-xs font-black text-slate-400 mt-1 uppercase tracking-widest">Unified coordination and announcement registry</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 mb-12">
         <div className="relative flex-1 group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              placeholder="Search registries..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] outline-none focus:border-indigo-400 shadow-xl shadow-slate-200/30 transition-all text-sm font-black italic shadow-inner placeholder:text-slate-300 ring-1 ring-slate-100"
            />
         </div>
         <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar no-scrollbar">
            {['All', 'Administrative', 'Academic', 'Event', 'Emergency'].map(f => (
               <button 
                 key={f} 
                 onClick={() => setSelectedFilter(f)}
                 className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 shadow-sm
                   ${selectedFilter === f ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 italic' : 'bg-white text-slate-400 border border-slate-100 hover:text-indigo-600 hover:bg-slate-50'}`}
               >
                 {f}
               </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
         {filtered.map((n, i) => (
           <motion.div 
             key={n.id} 
             initial={{ opacity: 0, scale: 0.95 }} 
             animate={{ opacity: 1, scale: 1 }} 
             transition={{ delay: i * 0.05 }}
             className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden ring-1 ring-slate-100 flex flex-col group hover:shadow-2xl hover:shadow-indigo-100/50 transition-all"
           >
              <div className={`h-2 transition-all group-hover:h-3
                ${n.priority === 'High' ? 'bg-rose-500' : 
                  n.priority === 'Medium' ? 'bg-amber-500' : 'bg-indigo-500'}`} 
              />
              <div className="p-8 grow flex flex-col">
                 <div className="flex justify-between items-center mb-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm
                      ${n.type === 'Emergency' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                        n.type === 'Administrative' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                        n.type === 'Academic' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                      {n.type}
                    </span>
                    <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100/50">
                       <FiCalendar size={12} className="text-indigo-400" /> {n.date}
                    </div>
                 </div>
                 <h4 className="font-black text-slate-800 uppercase italic tracking-tighter text-lg mb-3 leading-tight group-hover:text-indigo-600 transition-colors">{n.title}</h4>
                 <p className="text-[11px] font-bold text-slate-500 leading-relaxed mb-8 line-clamp-3">{n.desc}</p>
                 
                 <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-black text-indigo-600 italic uppercase shadow-inner group-hover:scale-110 transition-transform">
                          {n.author.split(' ').map(s=>s[0]).join('')}
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-800 uppercase italic tracking-tight">{n.author}</p>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Verified Source</p>
                       </div>
                    </div>
                    {n.attachment && (
                      <button className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all shadow-sm active:scale-90" title="Download Official Document">
                        <FiDownload size={16} />
                      </button>
                    )}
                 </div>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
}
