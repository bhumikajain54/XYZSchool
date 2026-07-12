import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMail, FiPhone, FiInfo, FiChevronRight, FiFilter, FiUserCheck, FiMessageSquare, FiAward, FiX, FiEdit2 } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const MY_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', roll: 'VS-001', gender: 'Male', attendance: '92%', grade: 'A+', status: 'Active', parent: 'Mr. Sharma' },
  { id: 2, name: 'Aryan Mehta', roll: 'VS-012', gender: 'Male', attendance: '88%', grade: 'B', status: 'Active', parent: 'Mr. Mehta' },
  { id: 3, name: 'Diya Patel', roll: 'VS-002', gender: 'Female', attendance: '95%', grade: 'A', status: 'Active', parent: 'Mrs. Patel' },
  { id: 4, name: 'Priya Singh', roll: 'VS-045', gender: 'Female', attendance: '72%', grade: 'C+', status: 'Warning', parent: 'Mr. Singh' },
  { id: 5, name: 'Rohan Verma', roll: 'VS-003', gender: 'Male', attendance: '85%', grade: 'B+', status: 'Active', parent: 'Mr. Verma' },
];

export default function TeacherStudentList() {
  const { addToast } = useApp();
  const navigate = useNavigate();
  const [students, setStudents] = useState(MY_STUDENTS);
  const [search, setSearch] = useState('');
  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterGender, setFilterGender] = useState('All');
  const [filterGrade, setFilterGrade] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search);
    const matchesGender = filterGender === 'All' || s.gender === filterGender;
    const matchesGrade = filterGrade === 'All' || s.grade === filterGrade;
    const matchesStatus = filterStatus === 'All' || s.status === filterStatus;

    return matchesSearch && matchesGender && matchesGrade && matchesStatus;
  });

  const viewStudent = students.find(s => s.id === viewId);
  const editStudent = students.find(s => s.id === editId);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Institutional Cohort</h3>
          <p className="text-[10px] md:text-xs font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">Class 10-A • 45 Registered Subjects</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="relative flex-1 sm:min-w-[320px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
            <input 
              placeholder="Search Subject ID or Sequence..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-50 transition-all outline-none shadow-sm"
            />
          </div>

          <div className="relative group/filter">
            <button
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${filterGender !== 'All' || filterGrade !== 'All' || filterStatus !== 'All' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-600'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter size={14} /> Matrix Filters
            </button>

            <AnimatePresence>
              {showFilters && (
                <>
                  <div className="fixed inset-0 z-[100]" onClick={() => setShowFilters(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-[320px] bg-white rounded-[32px] shadow-3xl border border-slate-100 p-8 z-[110] ring-1 ring-slate-200"
                  >
                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Gender Demographics</label>
                        <div className="flex gap-2">
                          {['All', 'Male', 'Female'].map(g => (
                            <button
                              key={g}
                              className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filterGender === g ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                              onClick={(e) => { e.stopPropagation(); setFilterGender(g); }}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Academic Tier</label>
                        <select
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500"
                          value={filterGrade}
                          onChange={e => setFilterGrade(e.target.value)}
                        >
                          {['All', 'A+', 'A', 'B+', 'B', 'C+'].map(gr => <option key={gr}>{gr}</option>)}
                        </select>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button
                          className="flex-1 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition"
                          onClick={() => { setFilterGender('All'); setFilterGrade('All'); setFilterStatus('All'); }}
                        >
                          Reset
                        </button>
                        <button
                          className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100"
                          onClick={() => setShowFilters(false)}
                        >
                          Apply Matrix
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex items-center gap-6 group">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner group-hover:scale-110 transition-transform">
             <FiUserCheck size={24} />
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 tracking-tighter italic">91%</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Attendance</div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex items-center gap-6 group">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shadow-inner group-hover:scale-110 transition-transform">
             <FiAward size={24} />
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 tracking-tighter italic">A</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Class Index</div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex items-center gap-6 group">
          <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-inner group-hover:scale-110 transition-transform">
             <FiInfo size={24} />
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 tracking-tighter italic">4</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">At-Risk Nodes</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm ring-1 ring-slate-100">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Subject Prototype</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-center">Identifier</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-center">Audit Load</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-center">Grade Marker</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((s, idx) => (
                <motion.tr 
                  key={s.id} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-300 text-sm italic shadow-inner border border-slate-100 group-hover:bg-white transition-colors">
                          {s.name.charAt(0)}
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-800 uppercase italic tracking-tight">{s.name}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">G: {s.parent}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-[10px] font-black text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm">{s.roll}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`text-[11px] font-black italic tracking-tighter ${parseInt(s.attendance) < 75 ? 'text-rose-500' : 'text-slate-600'}`}>{s.attendance}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm
                      ${s.grade.startsWith('A') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                      {s.grade}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border
                      ${s.status === 'Active' ? 'bg-white text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-50' : 'bg-white text-rose-500 border-rose-100 shadow-sm shadow-rose-50'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-all active:scale-90 shadow-sm"
                        onClick={() => setViewId(s.id)}
                        title="Telemetric Details"
                      >
                        <FiInfo size={14} />
                      </button>
                      <button
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-all active:scale-90 shadow-sm"
                        onClick={() => setEditId(s.id)}
                        title="Modify Profile"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all active:scale-90 shadow-lg shadow-indigo-100"
                        onClick={() => navigate('/teacher/messages')}
                        title="Establish Bridge"
                      >
                        <FiMessageSquare size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {viewId && viewStudent && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewId(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 30 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.95, y: 30 }} 
               className="relative bg-white rounded-[40px] w-full max-w-lg p-8 md:p-12 shadow-3xl border border-white mx-auto overflow-hidden ring-1 ring-slate-200"
              >
                <div className="mb-10 flex justify-between items-start">
                   <div>
                     <h4 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase italic">Subject Dossier</h4>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Comprehensive Telemetry</p>
                   </div>
                   <button onClick={() => setViewId(null)} className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition shadow-inner">×</button>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[32px] border border-slate-100 shadow-inner">
                    <div className="w-20 h-20 bg-indigo-600 text-white rounded-[24px] flex items-center justify-center text-3xl font-black italic shadow-xl shadow-indigo-100">
                      {viewStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-800 uppercase italic tracking-tight">{viewStudent.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">Identifier: {viewStudent.roll} • {viewStudent.gender}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white border border-slate-100 rounded-[24px] shadow-sm">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Guardian Anchor</p>
                      <p className="text-sm font-black text-slate-800 mb-6 italic">{viewStudent.parent}</p>
                      <div className="flex gap-2">
                        <button className="flex-1 py-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 flex items-center justify-center hover:bg-slate-100 transition"><FiPhone size={14} /></button>
                        <button className="flex-1 py-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 flex items-center justify-center hover:bg-slate-100 transition"><FiMail size={14} /></button>
                      </div>
                    </div>
                    <div className="p-6 bg-white border border-slate-100 rounded-[24px] shadow-sm">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Metric Analysis</p>
                      <p className="text-lg font-black text-emerald-600 mb-1 italic leading-none">{viewStudent.grade} Grade</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{viewStudent.attendance} Consistency</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Observation Log</label>
                    <textarea
                      placeholder="Append telemetric observations..."
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all outline-none min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button className="flex-1 py-5 bg-white border border-slate-200 rounded-[20px] text-xs font-black text-slate-600 uppercase tracking-[0.2em] shadow-sm hover:bg-slate-50 transition active:scale-95" onClick={() => setViewId(null)}>Discard</button>
                  <button className="flex-1 py-5 bg-indigo-600 text-white rounded-[20px] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95" onClick={() => { addToast('success', 'Logged', 'Telemetry synchronized.'); setViewId(null); }}>Sync Profile</button>
                </div>
              </motion.div>
          </div>
        )}

        {editId && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditId(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 30 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.95, y: 30 }} 
               className="relative bg-white rounded-[40px] w-full max-w-md p-8 md:p-12 shadow-3xl border border-white mx-auto overflow-hidden ring-1 ring-slate-200"
              >
              <div className="mb-10 flex justify-between items-start">
                 <div>
                   <h4 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase italic">Modify Protocol</h4>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time Load Modification</p>
                 </div>
                 <button onClick={() => setEditId(null)} className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition shadow-inner">×</button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Academic Tiering</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold appearance-none outline-none focus:ring-4 focus:ring-indigo-50" defaultValue={editStudent?.grade}>
                    <option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Attendance Saturation</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-50"
                      defaultValue={editStudent?.attendance?.replace('%', '')}
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-300">%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Operational Status</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold appearance-none outline-none focus:ring-4 focus:ring-indigo-50" defaultValue={editStudent?.status}>
                    <option>Active</option><option>Warning</option><option>On Leave</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 flex flex-col md:flex-row gap-4">
                <button className="flex-1 py-5 bg-white border border-slate-200 rounded-[20px] text-xs font-black text-slate-600 uppercase tracking-[0.2em] shadow-sm hover:bg-slate-50 transition active:scale-95" onClick={() => setEditId(null)}>Discard</button>
                <button className="flex-1 py-5 bg-indigo-600 text-white rounded-[20px] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95" onClick={() => { addToast('success', 'Synchronized', 'Load records modified.'); setEditId(null); }}>Commit Protocol</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
