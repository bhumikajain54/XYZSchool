import React, { useState } from 'react';
import { FiSearch, FiPhone, FiMail, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';

const INIT_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', roll: 'VS-001', class: '10-A', gender: 'Male', contact: '9829011223', email: 'aarav@gmail.com', attendance: '92%', performance: 'Exceeding' },
  { id: 2, name: 'Diya Patel', roll: 'VS-002', class: '10-A', gender: 'Female', contact: '9414011223', email: 'diya@gmail.com', attendance: '88%', performance: 'Meeting' },
  { id: 3, name: 'Rohan Verma', roll: 'VS-003', class: '10-A', gender: 'Male', contact: '9887011223', email: 'rohan@gmail.com', attendance: '75%', performance: 'Developing' },
  { id: 4, name: 'Ananya Reddy', roll: 'VS-004', class: '10-A', gender: 'Female', contact: '9001011223', email: 'ananya@gmail.com', attendance: '95%', performance: 'Exceeding' },
];

export default function StudentList() {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('10-A');

  const filtered = INIT_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.roll.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Student Oracle</h3>
          <p className="text-[10px] md:text-xs font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">Institutional Cohort Management • Session 2024-25</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            className="px-6 py-3.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none appearance-none cursor-pointer shadow-sm" 
            value={selectedClass} 
            onChange={e => setSelectedClass(e.target.value)}
          >
            <option>10-A</option>
            <option>11-B</option>
          </select>
          <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95">
            Export Manifest
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm">
        <div className="relative">
           <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
           <input 
             className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all outline-none placeholder:text-slate-300" 
             placeholder="Search student identity or identifier sequence..." 
             value={search}
             onChange={e => setSearch(e.target.value)}
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((s, i) => (
          <motion.div 
            key={s.id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.05 }}
            className="group bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/30 transition-all flex flex-col relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-black text-xl border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 italic shadow-inner">
                  {s.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight leading-tight transition-colors group-hover:text-indigo-600">{s.name}</h4>
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">Ref: {s.roll}</p>
                </div>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm
                ${s.performance === 'Exceeding' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : s.performance === 'Meeting' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                {s.performance}
              </span>
            </div>

            <div className="space-y-4 grow text-[10px] font-black uppercase tracking-widest">
              <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                <span className="text-slate-400">Attendance Telemetry</span>
                <div className="flex flex-col items-end gap-1.5 w-1/2">
                   <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <div className={`h-full ${parseInt(s.attendance) > 85 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: s.attendance }} />
                   </div>
                   <span className="text-slate-700">{s.attendance} Audit</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-slate-400">Node Status</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">ACTIVE AUDIT</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="flex gap-3">
                 <a href={`tel:${s.contact}`} className="w-11 h-11 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all shadow-sm active:scale-90"><FiPhone size={14} /></a>
                 <a href={`mailto:${s.email}`} className="w-11 h-11 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all shadow-sm active:scale-90"><FiMail size={14} /></a>
              </div>
              <button className="px-6 py-3 bg-slate-50 text-slate-400 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] border border-slate-100 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-inner active:scale-95 flex items-center gap-2">
                <FiInfo size={12} /> View Matrix
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
