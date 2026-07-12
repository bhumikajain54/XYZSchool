import React, { useState } from 'react';
import { FiPlus, FiCalendar, FiClock, FiMapPin, FiCheck, FiX, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const INIT_EXAMS = [
  { id: 1, subject: 'Mathematics Unit Test', class: '10-A', date: '2025-05-10', start: '09:00', end: '11:00', room: 'Hall A', status: 'Upcoming' },
  { id: 2, subject: 'Algebra Midterm', class: '11-B', date: '2025-05-12', start: '10:00', end: '13:00', room: 'R-205', status: 'Upcoming' },
  { id: 3, subject: 'Geometry Quiz', class: '09-A', date: '2025-05-05', start: '08:30', end: '09:30', room: 'Lab-1', status: 'Completed' },
];

export default function ExamScheduleCreator() {
  const { addToast } = useApp();
  const [exams, setExams] = useState(INIT_EXAMS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ subject: '', class: '10-A', date: '', start: '', end: '', room: '' });

  const handleCreate = () => {
    if (!form.subject || !form.date) {
      addToast('error', 'Error', 'Subject and Date are required');
      return;
    }
    setExams([...exams, { ...form, id: Date.now(), status: 'Upcoming' }]);
    addToast('success', 'Exam Scheduled', `${form.subject} for ${form.class} is now scheduled.`);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setExams(exams.filter(e => e.id !== id));
    addToast('success', 'Exam Deleted', 'Exam removed from schedule');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Assessment Architect</h3>
          <p className="text-[10px] md:text-xs font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">Pedagogical Evaluation Matrices • Session 2024-25</p>
        </div>
        <button 
          className="flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95" 
          onClick={() => { setForm({ subject: '', class: '10-A', date: '', start: '', end: '', room: '' }); setShowModal(true); }}
        >
          <FiPlus size={16} /> New Assessment
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <div className="text-4xl font-black text-blue-600 tracking-tighter italic mb-1">{exams.filter(e => e.status === 'Upcoming').length}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upcoming Units</div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
               <FiCalendar size={20} />
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <div className="text-4xl font-black text-emerald-600 tracking-tighter italic mb-1">{exams.filter(e => e.status === 'Completed').length}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Audit Completed</div>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
               <FiCheck size={20} />
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <div className="text-4xl font-black text-amber-600 tracking-tighter italic mb-1">12h</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Assessment Time</div>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
               <FiClock size={20} />
            </div>
          </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm ring-1 ring-slate-100">
        <div className="p-8 md:p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h5 className="font-black text-slate-800 uppercase italic tracking-tight italic">Global Assessment Ledger</h5>
          <div className="relative w-full md:max-w-xs">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
            <input 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all outline-none" 
              placeholder="Filter by subject..." 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Assessment Vector</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Matrix</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Chronology</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Spatial Coordinate</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Audit Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {exams.map((e, index) => (
                <motion.tr 
                  key={e.id} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-800 uppercase italic tracking-tight">{e.subject}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 shadow-sm">{e.class}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">{new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60 flex items-center gap-1.5 leading-none"><FiClock size={10} /> {e.start} - {e.end}</div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       <FiMapPin size={12} className="text-indigo-400" /> {e.room}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border
                      ${e.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-sm shadow-indigo-100'}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2">
                       <button className="w-9 h-9 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 shadow-sm transition-all active:scale-90" title="Modify Sequence" onClick={() => { setForm(e); setShowModal(true); }}><FiEdit2 size={13} /></button>
                       <button className="w-9 h-9 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 shadow-sm transition-all active:scale-90" title="Purge Assessment" onClick={() => handleDelete(e.id)}><FiTrash2 size={13} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 30 }} 
              className="relative bg-white rounded-[40px] w-full max-w-xl p-8 md:p-12 shadow-3xl border border-white mx-auto overflow-hidden ring-1 ring-slate-200"
            >
              <div className="mb-10 flex justify-between items-start">
                <div>
                  <h4 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase italic">{form.id ? 'Modify Parameters' : 'Assessment Setup'}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Pedagogical Configuration Interface</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors shadow-inner"
                >
                  <FiX />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Vector Specification</label>
                  <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="e.g. Midterm Evaluation" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Target Matrix</label>
                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none appearance-none" value={form.class} onChange={e => setForm({...form, class: e.target.value})}>
                        <option>10-A</option>
                        <option>11-B</option>
                        <option>12-A</option>
                        <option>09-B</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Chronological Node</label>
                    <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Start Phase</label>
                    <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none" type="time" value={form.start} onChange={e => setForm({...form, start: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">End Phase</label>
                    <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none" type="time" value={form.end} onChange={e => setForm({...form, end: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Spatial Identity (Room)</label>
                  <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none" value={form.room} onChange={e => setForm({...form, room: e.target.value})} placeholder="e.g. Assessment Hall" />
                </div>
              </div>

              <div className="mt-10 flex flex-col md:flex-row gap-4">
                <button className="flex-1 py-5 bg-white border border-slate-200 rounded-[20px] text-xs font-black text-slate-600 uppercase tracking-[0.2em] shadow-sm hover:bg-slate-50 transition active:scale-95" onClick={() => setShowModal(false)}>Discard</button>
                <button className="flex-1 py-5 bg-indigo-600 text-white rounded-[20px] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95" onClick={handleCreate}>Synchronize Test</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
