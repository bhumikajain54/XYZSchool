import React, { useState } from 'react';
import { FiX, FiBell, FiSearch, FiFilter } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const TEACHER_ANNOUNCEMENTS = [
  { id: 1, title: 'Staff Meeting', content: 'Discussion on Annual Cultural Fest preparations at 4:30 PM in Hall B. Attendance is mandatory for all department heads.', date: '2025-04-04', time: '10 min ago', priority: 'High', type: 'Administrative' },
  { id: 2, title: 'New Leave Policy', content: 'Updated guidelines for casual leave applications are now available in the staff handbook. Please review the changes starting today.', date: '2025-04-04', time: '2 hrs ago', priority: 'Medium', type: 'Policy' },
  { id: 3, title: 'Annual Cultural Fest', content: 'Preparations for the upcoming cultural fest are in full swing. Volunteers can register at the main office.', date: '2025-04-01', time: '3 days ago', priority: 'Medium', type: 'Event' },
  { id: 4, title: 'Semester Result Deadline', content: 'Final marks entry for Semester 1 must be completed by April 10th. Please ensure all internal assessments are uploaded.', date: '2025-03-30', time: '5 days ago', priority: 'High', type: 'Academic' },
  { id: 5, title: 'Tech Symposium 2025', content: 'XYZ School is hosting a regional Tech Symposium. Teachers interested in mentoring student projects should contact the coordinator.', date: '2025-03-25', time: '1 week ago', priority: 'Low', type: 'Event' },
];

const priorityStyles = {
  High: 'badge-error',
  Medium: 'badge-warning',
  Low: 'badge-success',
};

export default function TeacherAnnouncements() {
  const [announcements] = useState(TEACHER_ANNOUNCEMENTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedNotice, setSelectedNotice] = useState(null);

  const types = ['All', 'Administrative', 'Policy', 'Event', 'Academic', 'Exam'];

  const filtered = announcements.filter(a => 
    (filter === 'All' || a.type === filter) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Staff Bulletins</h3>
          <p className="text-[10px] md:text-xs font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">Institutional Synchronization • Session 2024-25</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="relative group/search flex-1 xl:min-w-[320px]">
             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
             <input 
               placeholder="Filter by title or keyword stream..." 
               value={search} 
               onChange={e => setSearch(e.target.value)} 
               className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-50 transition-all outline-none shadow-sm"
             />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${filter === t ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
         <motion.div whileHover={{ y: -4 }} className="bg-white border-l-4 border-rose-500 p-6 md:p-8 rounded-[32px] shadow-sm ring-1 ring-slate-100 flex items-center gap-6 group">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-inner group-hover:scale-110 transition-transform"><FiBell size={24} /></div>
            <div>
              <div className="text-3xl font-black text-slate-800 tracking-tighter italic">{announcements.filter(a => a.priority === 'High').length}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority Nodes</div>
            </div>
         </motion.div>
         <motion.div whileHover={{ y: -4 }} className="bg-white border-l-4 border-indigo-600 p-6 md:p-8 rounded-[32px] shadow-sm ring-1 ring-slate-100 flex items-center gap-6 group">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-110 transition-transform"><FiFilter size={24} /></div>
            <div>
              <div className="text-3xl font-black text-slate-800 tracking-tighter italic">{announcements.length}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Stream</div>
            </div>
         </motion.div>
         <motion.div whileHover={{ y: -4 }} className="bg-white border-l-4 border-emerald-500 p-6 md:p-8 rounded-[32px] shadow-sm ring-1 ring-slate-100 flex items-center gap-6 group">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shadow-inner group-hover:scale-110 transition-transform"><FiBell size={24} /></div>
            <div>
              <div className="text-3xl font-black text-slate-800 tracking-tighter italic">2</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Today</div>
            </div>
         </motion.div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[40px] border border-slate-200 border-dashed p-20 text-center shadow-sm">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Zero Data Points Match the Current Vector.</p>
          </div>
        ) : (
          filtered.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 8 }}
              onClick={() => setSelectedNotice(a)}
              className={`bg-white rounded-[32px] border-l-8 p-6 md:p-8 shadow-sm cursor-pointer ring-1 ring-slate-100 group transition-all
                ${a.priority === 'High' ? 'border-rose-500' : a.priority === 'Medium' ? 'border-amber-500' : 'border-emerald-500'}`}
            >
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1 space-y-4">
                     <div className="flex items-center gap-3">
                        <span className={`px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest
                          ${a.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-400'}`}>{a.priority} LOAD</span>
                        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest leading-none">• {a.type} Nexus</span>
                     </div>
                     <h4 className="text-xl md:text-2xl font-black text-slate-800 uppercase italic tracking-tight group-hover:text-indigo-600 transition-colors">{a.title}</h4>
                     <p className="text-sm font-bold text-slate-500 leading-relaxed tracking-tight max-w-4xl line-clamp-2 md:line-clamp-none">{a.content}</p>
                     
                     <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <FiBell size={12} className="text-indigo-300" /> <span>Synchronized {a.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <span className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                     </div>
                  </div>
                  <button className="hidden md:flex items-center justify-center px-8 py-4 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition shadow-sm active:scale-95 group-hover:border-indigo-100 group-hover:bg-indigo-50/50 group-hover:text-indigo-600">
                    Interact details
                  </button>
               </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedNotice(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 30 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.95, y: 30 }} 
               className="relative bg-white rounded-[40px] w-full max-w-xl p-8 md:p-12 shadow-3xl border border-white mx-auto overflow-hidden ring-1 ring-slate-200"
              >
                <div className="mb-10 flex justify-between items-start">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
                        <FiBell size={24} />
                      </div>
                      <div>
                        <h4 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase italic leading-none">Bulletin Intel</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 leading-none">Trace ID: #NOTIF-02{selectedNotice.id}</p>
                      </div>
                   </div>
                   <button onClick={() => setSelectedNotice(null)} className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition shadow-inner">×</button>
                </div>
                
                <div className="space-y-8">
                  <div className="flex gap-2">
                    <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border
                      ${selectedNotice.priority === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                      {selectedNotice.priority} LOAD
                    </span>
                    <span className="px-5 py-2 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest">{selectedNotice.type} Sector</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-slate-800 uppercase italic tracking-tight leading-tight">{selectedNotice.title}</h3>
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] shadow-sm italic leading-relaxed text-slate-600 text-base font-bold">
                    {selectedNotice.content}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-6 bg-white border border-slate-100 rounded-[24px] shadow-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Publish Matrix</p>
                        <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest italic">{new Date(selectedNotice.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
                     </div>
                     <div className="p-6 bg-white border border-slate-100 rounded-[24px] shadow-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Temporal Offset</p>
                        <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest italic">{selectedNotice.time}</p>
                     </div>
                  </div>
                </div>
                
                <button className="mt-10 w-full py-5 bg-indigo-600 text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95" onClick={() => setSelectedNotice(null)}>Understand & Synchronize</button>
              </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

