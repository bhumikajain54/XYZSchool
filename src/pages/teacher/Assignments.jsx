import React, { useState } from 'react';
import { FiPlus, FiUpload, FiEdit2, FiTrash2, FiX, FiPaperclip, FiClock } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const INIT_ASSIGNMENTS = [
  { id: 1, title: 'Trigonometry Worksheet', class: '10-A', subject: 'Mathematics', dueDate: '2025-04-05', submitted: 32, total: 42, status: 'Active', desc: 'Solve all problems from Chapter 8, Exercises 8.1 to 8.4.' },
  { id: 2, title: 'Calculus Monthly Test', class: '12-A', subject: 'Calculus', dueDate: '2025-04-08', submitted: 18, total: 38, status: 'Active', desc: 'Topics: Derivatives, Integration basics, Limits.' },
  { id: 3, title: 'Statistics Project', class: '11-B', subject: 'Statistics', dueDate: '2025-03-28', submitted: 40, total: 43, status: 'Completed', desc: 'Collect real-world data and create frequency distribution tables.' },
  { id: 4, title: 'Algebraic Expressions', class: '9-A', subject: 'Mathematics', dueDate: '2025-04-10', submitted: 5, total: 45, status: 'Active', desc: 'Simplify algebraic expressions using factorization methods.' },
];

const EMPTY_FORM = { title: '', class: '', subject: '', dueDate: '', desc: '' };
const CLASSES = ['9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];

export default function Assignments() {
  const { addToast } = useApp();
  const [assignments, setAssignments] = useState(INIT_ASSIGNMENTS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? assignments : assignments.filter(a => a.status === filter);

  const handleSave = () => {
    if (!form.title || !form.class || !form.dueDate) { addToast('error', 'Error', 'Title, Class and Due Date are required'); return; }
    const max = assignments.reduce((m, a) => Math.max(m, a.id), 0);
    setAssignments(a => [...a, { ...form, id: max + 1, submitted: 0, total: 40, status: 'Active' }]);
    addToast('success', 'Published!', `${form.title} assigned to ${form.class}`);
    setShowModal(false);
    setForm(EMPTY_FORM);
  };

  const handleDelete = (id) => {
    setAssignments(a => a.filter(x => x.id !== id));
    addToast('success', 'Deleted', 'Assignment removed');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Assignments</h3>
          <p className="text-[10px] md:text-xs font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">Pedagogical Resource Management • Session 2024-25</p>
        </div>
        <button 
          className="flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95" 
          onClick={() => setShowModal(true)}
        >
          <FiPlus size={16} /> New Objective
        </button>
      </div>

      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/50 rounded-2xl w-fit">
        {['All', 'Active', 'Completed'].map(t => (
          <button 
            key={t} 
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
              ${filter === t ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`} 
            onClick={() => setFilter(t)}
          >
            {t === 'All' ? 'Matrix View' : t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {filtered.map((a, i) => (
          <motion.div 
            key={a.id} 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.05 }} 
            className="group bg-white rounded-[32px] md:rounded-[40px] border border-slate-200 p-6 md:p-10 hover:shadow-2xl hover:shadow-slate-200/50 transition-all ring-1 ring-slate-100"
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
              <div className="flex-1 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h5 className="text-lg md:text-xl font-black text-slate-800 uppercase tracking-tight italic">{a.title}</h5>
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border
                    ${a.status === 'Active' ? 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-sm shadow-indigo-100/30' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                    {a.status}
                  </span>
                  <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest shadow-sm">
                    Class {a.class}
                  </span>
                </div>
                
                <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-3xl">
                  {a.desc}
                </p>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-2">
                      <FiClock className="text-indigo-400" size={14} />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due: {new Date(a.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest uppercase">{a.subject}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{a.submitted}/{a.total} Audited</span>
                   </div>
                </div>
              </div>

              <div className="lg:w-48 xl:w-56 shrink-0 bg-slate-50/50 rounded-[32px] p-6 border border-slate-100 flex lg:flex-col items-center justify-between lg:justify-center gap-4 text-center">
                 <div className="space-y-1">
                    <div className="text-3xl font-black text-indigo-600 tracking-tighter italic leading-none">
                      {Math.round(a.submitted / a.total * 100)}%
                    </div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Efficiency Rating</p>
                 </div>
                 <div className="w-32 lg:w-full h-3 bg-white rounded-full overflow-hidden border border-slate-200 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-700 shadow-[0_0_12px_rgba(99,102,241,0.3)]" 
                      style={{ width: `${Math.round(a.submitted / a.total * 100)}%` }} 
                    />
                 </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-10 pt-8 border-t border-slate-50">
              <button 
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-700 uppercase tracking-widest hover:bg-slate-50 transition shadow-sm active:scale-95 group-hover:border-indigo-200" 
                onClick={() => { setForm(a); setShowModal(true); }}
              >
                <FiEdit2 size={13} className="text-blue-500" /> Modify
              </button>
              <button 
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-700 uppercase tracking-widest hover:bg-slate-50 transition shadow-sm active:scale-95 group-hover:border-indigo-200" 
                onClick={() => document.getElementById('material-upload-input').click()}
              >
                <FiUpload size={13} className="text-emerald-500" /> Dispatch Materials
              </button>
              <button 
                className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all active:scale-95 shadow-sm ml-auto" 
                onClick={() => handleDelete(a.id)}
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 30 }} 
              className="relative bg-white rounded-[40px] w-full max-w-2xl p-8 md:p-12 shadow-3xl border border-white mx-auto overflow-hidden ring-1 ring-slate-200"
            >
              <div className="mb-10 flex justify-between items-start">
                <div>
                  <h4 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase italic">Objective Creator</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Pedagogical Parameter Configuration</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors shadow-inner"
                >
                  <FiX />
                </button>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar pr-1 -mr-1">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Title Specification</label>
                  <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Enter assignment title..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Target Matrix</label>
                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none appearance-none" value={form.class} onChange={e => setForm(p => ({ ...p, class: e.target.value }))}>
                      <option value="">Select Class</option>
                      {CLASSES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Academic Discipline</label>
                    <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="Enter subject..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Deadline Sequence</label>
                  <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none" type="date" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))} />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Pedagogical Instructions</label>
                  <textarea className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none min-h-[120px] resize-none" value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} placeholder="Specify detailed instructions for student execution..." />
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-[32px] p-8 text-center cursor-pointer hover:bg-slate-50 hover:border-indigo-200 transition-all group shadow-inner">
                  <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4 group-hover:text-indigo-400 group-hover:scale-110 transition-all shadow-sm">
                    <FiPaperclip size={24} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aggregate secondary resources or <span className="text-indigo-600 underline underline-offset-4 decoration-2">Audit System</span></p>
                </div>
              </div>

              <div className="mt-10 flex flex-col md:flex-row gap-4">
                <button className="flex-1 py-5 bg-white border border-slate-200 rounded-[20px] text-xs font-black text-slate-600 uppercase tracking-[0.2em] shadow-sm hover:bg-slate-50 transition active:scale-95" onClick={() => setShowModal(false)}>Discard</button>
                <button className="flex-1 py-5 bg-indigo-600 text-white rounded-[20px] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95" onClick={handleSave}>Publish Matrix</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <input 
        id="material-upload-input" 
        type="file" 
        style={{ display: 'none' }} 
        onChange={(e) => {
          if (e.target.files.length) {
            addToast('success', 'Upload Success', 'Materials uploaded: ' + e.target.files[0].name);
          }
        }}
      />
    </div>
  );
}
