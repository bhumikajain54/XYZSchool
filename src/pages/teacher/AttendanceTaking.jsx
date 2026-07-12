import React, { useState } from 'react';
import { FiCheck, FiX, FiCalendar, FiSearch, FiSave, FiAlertCircle } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';

const INIT_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', roll: 'VS-001', status: 'present' },
  { id: 2, name: 'Diya Patel', roll: 'VS-002', status: 'present' },
  { id: 3, name: 'Rohan Verma', roll: 'VS-003', status: 'present' },
  { id: 4, name: 'Ananya Reddy', roll: 'VS-004', status: 'present' },
  { id: 5, name: 'Vikram Singh', roll: 'VS-005', status: 'present' },
  { id: 6, name: 'Sonal Mehta', roll: 'VS-006', status: 'present' },
];

export default function AttendanceTaking() {
  const { addToast } = useApp();
  const [students, setStudents] = useState(INIT_STUDENTS);
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const toggleStatus = (id, status) => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  const handleSave = () => {
    addToast('success', 'Attendance Saved', `Attendance for Class ${selectedClass} on ${date} recorded.`);
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const leaveCount = students.filter(s => s.status === 'leave').length;

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Attendance Audit</h3>
          <p className="text-[10px] md:text-xs font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">Daily Institutional Compliance • Session 2024-25</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full xl:w-auto">
          <div className="relative">
            <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={14} />
            <input 
              className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none shadow-sm" 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
            />
          </div>
          <select 
            className="w-full px-6 py-3.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none shadow-sm appearance-none cursor-pointer" 
            value={selectedClass} 
            onChange={e => setSelectedClass(e.target.value)}
          >
            <option>10-A</option>
            <option>11-B</option>
          </select>
          <button 
            className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95" 
            onClick={handleSave}
          >
            <FiSave size={14} /> Synchronize
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
          <div className="relative z-10">
            <div className="text-4xl font-black text-emerald-600 tracking-tighter italic mb-1">{presentCount}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Present Units</div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
             <FiCheck size={20} />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-50/30 rounded-full blur-2xl" />
        </div>
        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
          <div className="relative z-10">
            <div className="text-4xl font-black text-rose-600 tracking-tighter italic mb-1">{absentCount}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Absent Units</div>
          </div>
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
             <FiX size={20} />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-rose-50/30 rounded-full blur-2xl" />
        </div>
        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
          <div className="relative z-10">
            <div className="text-4xl font-black text-amber-600 tracking-tighter italic mb-1">{leaveCount}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Excused Absence</div>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
             <FiAlertCircle size={20} />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-50/30 rounded-full blur-2xl" />
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm ring-1 ring-slate-100">
        <div className="p-8 md:p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h5 className="font-black text-slate-800 uppercase italic tracking-tight italic">Class {selectedClass} Manifest</h5>
          <div className="relative w-full md:max-w-xs">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
            <input 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all outline-none" 
              placeholder="Filter by identifier..." 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Identifier</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Subject Profile</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-center">Status Control</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Audit Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((s, i) => (
                <motion.tr 
                  key={s.id} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: i * 0.03 }}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 shadow-sm">{s.roll}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-800 uppercase italic tracking-tight truncate">{s.name}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 justify-center">
                      <button 
                        onClick={() => toggleStatus(s.id, 'present')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2
                          ${s.status === 'present' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'}`}
                      >
                        <FiCheck className={s.status === 'present' ? 'text-white' : 'text-emerald-500'} size={12} /> <span className="hidden lg:inline">Present</span>
                      </button>
                      <button 
                        onClick={() => toggleStatus(s.id, 'absent')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2
                          ${s.status === 'absent' ? 'bg-rose-600 text-white shadow-lg shadow-rose-100' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'}`}
                      >
                        <FiX className={s.status === 'absent' ? 'text-white' : 'text-rose-500'} size={12} /> <span className="hidden lg:inline">Absent</span>
                      </button>
                      <button 
                        onClick={() => toggleStatus(s.id, 'leave')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2
                          ${s.status === 'leave' ? 'bg-amber-500 text-white shadow-lg shadow-amber-100' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'}`}
                      >
                        <FiAlertCircle className={s.status === 'leave' ? 'text-white' : 'text-amber-500'} size={12} /> <span className="hidden lg:inline">Leave</span>
                      </button>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <input 
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[11px] font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all outline-none italic placeholder:text-slate-300" 
                      placeholder="Append audit log..." 
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
