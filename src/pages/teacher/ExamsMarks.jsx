import React, { useState } from 'react';
import { FiUpload, FiSave, FiDownload, FiCheckCircle, FiTrendingUp, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const EXAM_DATA = {
  'Unit Test 1 - 10A': [
    { rollNo: 'VS-001', name: 'Aarav Sharma', max: 100, scored: 92 },
    { rollNo: 'VS-002', name: 'Diya Patel', max: 100, scored: 88 },
    { rollNo: 'VS-003', name: 'Rohan Verma', max: 100, scored: 75 },
    { rollNo: 'VS-004', name: 'Ananya Reddy', max: 100, scored: 95 },
    { rollNo: 'VS-005', name: 'Vikram Singh', max: 100, scored: 62 },
  ],
  'Term 1 Exam - 11B': [
    { rollNo: 'VS-101', name: 'Kavya Iyer', max: 100, scored: 80 },
    { rollNo: 'VS-102', name: 'Arjun Nair', max: 100, scored: 67 },
    { rollNo: 'VS-103', name: 'Sonal Mehta', max: 100, scored: 91 },
  ],
};

function getGrade(score) {
  if (score >= 90) return { grade: 'A+', color: 'badge-success' };
  if (score >= 80) return { grade: 'A', color: 'badge-success' };
  if (score >= 70) return { grade: 'B+', color: 'badge-primary' };
  if (score >= 60) return { grade: 'B', color: 'badge-info' };
  if (score >= 50) return { grade: 'C', color: 'badge-warning' };
  return { grade: 'F', color: 'badge-error' };
}

export default function ExamsMarks() {
  const { addToast } = useApp();
  const [selectedExam, setSelectedExam] = useState(Object.keys(EXAM_DATA)[0]);
  const [marksData, setMarksData] = useState(EXAM_DATA);
  const [editingId, setEditingId] = useState(null);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [importing, setImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [finalizing, setFinalizing] = useState(false);

  const students = marksData[selectedExam] || [];

  const handleMarkChange = (rollNo, newVal) => {
    setMarksData(prev => {
      const copy = { ...prev };
      copy[selectedExam] = copy[selectedExam].map(s => 
        s.rollNo === rollNo ? { ...s, scored: parseInt(newVal) || 0 } : s
      );
      return copy;
    });
  };

  const handleMaxChange = (rollNo, newVal) => {
    setMarksData(prev => {
      const copy = { ...prev };
      copy[selectedExam] = copy[selectedExam].map(s => 
        s.rollNo === rollNo ? { ...s, max: parseInt(newVal) || 0 } : s
      );
      return copy;
    });
  };

  const handleDelete = (rollNo) => {
    setMarksData(prev => {
      const copy = { ...prev };
      copy[selectedExam] = copy[selectedExam].filter(s => s.rollNo !== rollNo);
      return copy;
    });
    addToast('success', 'Record Removed', 'Student mark record has been deleted locally.');
  };

  const handleFinalize = () => {
    setFinalizing(true);
    setTimeout(() => {
       addToast('success', 'Assessment Finalized', `All grades for ${selectedExam} have been securely locked and synced.`);
       setFinalizing(false);
    }, 1800);
  };

  const editStudent = students.find(s => s.rollNo === editingId);

  const classAvg = students.length ? Math.round(students.reduce((a, s) => a + s.scored, 0) / students.length) : 0;
  const highest = students.length ? Math.max(...students.map(s => s.scored)) : 0;

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Assessment Nexus</h3>
          <p className="text-[10px] md:text-xs font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">Institutional Grade Management • Session 2024-25</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <button 
            className="flex-1 items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition shadow-sm disabled:opacity-50 flex" 
            onClick={() => setShowBulkUpload(true)} 
            disabled={finalizing}
          >
            <FiUpload size={14} className="text-indigo-500" /> Bulk Integration
          </button>
          <button 
            className={`flex-1 flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 disabled:opacity-50 min-w-[160px] ${finalizing ? 'animate-pulse' : ''}`} 
            onClick={handleFinalize}
            disabled={finalizing}
          >
            {finalizing ? 'Synchronizing...' : <><FiCheckCircle size={14} /> Finalize Audit</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <div className="text-4xl font-black text-blue-600 tracking-tighter italic mb-1">{classAvg}%</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Mean</div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
               <FiTrendingUp size={20} />
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <div className="text-4xl font-black text-purple-600 tracking-tighter italic mb-1">{highest}%</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Apex Score</div>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
               <FiTrendingUp size={20} className="rotate-45" />
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <div className="text-4xl font-black text-emerald-600 tracking-tighter italic mb-1">{Math.round(students.filter(s => s.scored >= 40).length / (students.length || 1) * 100)}%</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Passing Density</div>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
               <FiCheckCircle size={20} />
            </div>
          </div>
      </div>

      <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] ring-1 ring-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-8">
           <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Active Assessment Vector:</label>
           <select 
             className="min-w-[280px] px-6 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none appearance-none cursor-pointer" 
             value={selectedExam} 
             onChange={e => setSelectedExam(e.target.value)}
           >
              {Object.keys(marksData).map(e => <option key={e}>{e}</option>)}
           </select>
        </div>
        <button 
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-700 uppercase tracking-widest hover:bg-slate-50 transition shadow-sm active:scale-95" 
          onClick={() => addToast('info', 'Sequence Generated', 'Audit report has been exported.')}
        >
          <FiDownload size={14} className="text-indigo-400" /> Export Ledger
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm ring-1 ring-slate-100">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Identifier</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Subject Prototype</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-center">Score Matrix</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-center">Performance</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-center">Audit Grade</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((s, i) => {
                const pct = Math.round(s.scored / s.max * 100);
                const { grade, color } = getGrade(pct);
                return (
                  <motion.tr 
                    key={s.rollNo} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: i * 0.05 }}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 shadow-sm">{s.rollNo}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-slate-800 uppercase italic tracking-tight">{s.name}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <div className="inline-flex flex-col items-center">
                          <span className="text-lg font-black text-indigo-600 italic tracking-tighter leading-none">{s.scored}</span>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1 opacity-50">OF {s.max}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                         <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                            <div className="h-full bg-indigo-500" style={{ width: `${pct}%` }} />
                         </div>
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border
                        ${pct >= 60 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : pct >= 40 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                        {grade}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                         className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 shadow-sm transition-all active:scale-90" 
                         onClick={() => setEditingId(s.rollNo)} 
                         title="Modify Entry"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button 
                         className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 shadow-sm transition-all active:scale-90" 
                         onClick={() => handleDelete(s.rollNo)} 
                         title="Purge Record"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
         {editingId && editStudent && (
           <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingId(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 30 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.95, y: 30 }} 
               className="relative bg-white rounded-[40px] w-full max-w-md p-8 md:p-12 shadow-3xl border border-white mx-auto overflow-hidden ring-1 ring-slate-200"
              >
                 <div className="mb-10 flex justify-between items-start">
                    <div>
                      <h4 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase italic">Modify Protocol</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Audit Stream for {editStudent.rollNo}</p>
                    </div>
                    <button onClick={() => setEditingId(null)} className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition shadow-inner">×</button>
                 </div>
                 <div className="space-y-6">
                    <p className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 w-fit uppercase tracking-widest leading-none">Subject: {editStudent.name}</p>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Acquired Score</label>
                       <input 
                         type="number" 
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none" 
                         value={editStudent.scored} 
                         onChange={e => handleMarkChange(editStudent.rollNo, e.target.value)}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Maximum Parameter</label>
                       <input 
                         type="number" 
                         className="w-full px-6 py-4 bg-slate-100 border border-slate-100 rounded-2xl text-sm font-bold opacity-70" 
                         value={editStudent.max} 
                         onChange={e => handleMaxChange(editStudent.rollNo, e.target.value)}
                       />
                    </div>
                 </div>
                 <div className="mt-10 flex flex-col md:flex-row gap-4">
                    <button className="flex-1 py-5 bg-white border border-slate-200 rounded-[20px] text-xs font-black text-slate-600 uppercase tracking-[0.2em] shadow-sm hover:bg-slate-50 transition active:scale-95" onClick={() => setEditingId(null)}>Discard</button>
                    <button className="flex-1 py-5 bg-indigo-600 text-white rounded-[20px] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95" onClick={() => { addToast('success', 'Synchronized', 'Protocol updated successfully.'); setEditingId(null); }}>Commit Changes</button>
                 </div>
              </motion.div>
           </div>
         )}

        {showBulkUpload && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowBulkUpload(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 30 }} 
              className="relative bg-white rounded-[40px] w-full max-w-lg p-8 md:p-12 shadow-3xl border border-white mx-auto overflow-hidden ring-1 ring-slate-200"
            >
                <div className="mb-10 flex justify-between items-start">
                   <div>
                     <h4 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase italic">Data Ingestion</h4>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Bulk Assessment Integration Protocol</p>
                   </div>
                   <button onClick={() => setShowBulkUpload(false)} className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition shadow-inner">×</button>
                </div>
                 <div className="text-center py-10 px-6 border-2 border-dashed border-slate-200 rounded-[32px] bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all group mb-8">
                    <div className="w-20 h-20 bg-white border border-slate-100 rounded-[24px] flex items-center justify-center mx-auto mb-6 text-slate-300 group-hover:scale-110 group-hover:text-indigo-400 transition-all shadow-sm">
                       <FiUpload size={32} />
                    </div>
                    <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] mb-2">{importing ? 'Processing Bitstream...' : 'Select Ingestion File'}</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
                      {selectedFile ? `Active: ${selectedFile.name}` : 'Verify schema alignment (ID, Name, Score) before commit.'}
                    </p>
                    {!importing && (
                      <label className="mt-6 inline-block">
                        <span className="px-8 py-3 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100 cursor-pointer hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                          {selectedFile ? 'Rotate File' : 'Initialize Matrix'}
                        </span>
                        <input 
                          type="file" 
                          accept=".csv" 
                          className="hidden" 
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                          disabled={importing}
                        />
                      </label>
                    )}
                 </div>
                 <div className="flex flex-col md:flex-row gap-4">
                    {!importing && <button className="flex-1 py-5 bg-white border border-slate-200 rounded-[20px] text-xs font-black text-slate-600 uppercase tracking-[0.2em] shadow-sm hover:bg-slate-50 transition active:scale-95" onClick={() => { setShowBulkUpload(false); setSelectedFile(null); }}>Discard</button>}
                    <button 
                      className="flex-1 py-5 bg-indigo-600 text-white rounded-[20px] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95 disabled:opacity-50" 
                      disabled={!selectedFile || importing}
                      onClick={() => {
                        setImporting(true);
                        setTimeout(() => {
                           addToast('success', 'Nexus Integrated', `Successfully analyzed ${selectedFile.name}`);
                           setImporting(false);
                           setSelectedFile(null);
                           setShowBulkUpload(false);
                        }, 2000);
                      }}
                    >
                      {importing ? 'Analyzing...' : 'Execute Ingestion'}
                    </button>
                 </div>
              </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
