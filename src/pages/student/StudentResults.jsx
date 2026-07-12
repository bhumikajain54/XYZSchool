import React from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import { useApp } from '../../context/AppContext';
import { FiDownload, FiCheck, FiX, FiAward, FiBookOpen } from 'react-icons/fi';

const results = [
  { subject: 'Mathematics', ut1: 45, ut2: 48, midterm: 88, final: 92, total: 273, max: 300, grade: 'A+', teacher: 'Mrs. Priya Sharma' },
  { subject: 'Physics', ut1: 38, ut2: 42, midterm: 80, final: 85, total: 245, max: 300, grade: 'A', teacher: 'Mr. Ramesh Kumar' },
  { subject: 'Chemistry', ut1: 35, ut2: 38, midterm: 72, final: 78, total: 223, max: 300, grade: 'B+', teacher: 'Mr. Arjun Nair' },
  { subject: 'English', ut1: 43, ut2: 45, midterm: 82, final: 88, total: 258, max: 300, grade: 'A', teacher: 'Mrs. Sunita Verma' },
  { subject: 'History', ut1: 32, ut2: 35, midterm: 65, final: 70, total: 202, max: 300, grade: 'B', teacher: 'Mr. Deepak Mehra' },
];

const gradeColors = { 'A+': 'badge-success', 'A': 'badge-success', 'B+': 'badge-primary', 'B': 'badge-info', 'C': 'badge-warning', 'F': 'badge-error' };

export default function StudentResults() {
  const { addToast, user } = useApp();
  const [downloading, setDownloading] = React.useState(false);

  const totalMarks = results.reduce((a, b) => a + b.total, 0);
  const maxMarks = results.reduce((a, b) => a + b.max, 0);
  const overallPct = Math.round(totalMarks / maxMarks * 100);

  const handleDownload = async () => {
    setDownloading(true);
    addToast('info', 'Generating PDF', 'Preparing your institutional report card...');
    await new Promise(r => setTimeout(r, 1500));
    
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('XYZ Higher Secondary School', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text('Academic Performance Report Card', 105, 30, { align: 'center' });
    doc.line(20, 35, 190, 35);
    
    doc.setFontSize(11);
    doc.text(`Student: ${user?.name || 'Vikas Jain'}`, 20, 45);
    doc.text(`Roll No: VHSS-1024`, 20, 52);
    doc.text(`Class: 10th-A`, 140, 45);
    doc.text(`Year: 2024-25`, 140, 52);
    
    let y = 70;
    doc.setFontSize(11);
    doc.text('Subject', 20, y);
    doc.text('Internal', 70, y);
    doc.text('Mid-Term', 100, y);
    doc.text('Final', 130, y);
    doc.text('Total', 160, y);
    doc.text('Grade', 185, y, { align: 'right' });
    doc.line(20, y+2, 190, y+2);
    
    results.forEach(r => {
       y += 12;
       doc.text(r.subject, 20, y);
       doc.text((r.ut1 + r.ut2).toString(), 70, y);
       doc.text(r.midterm.toString(), 100, y);
       doc.text(r.final.toString(), 130, y);
       doc.text(r.total.toString(), 160, y);
       doc.text(r.grade, 185, y, { align: 'right' });
    });
    
    doc.line(20, y+5, 190, y+5);
    y += 15;
    doc.setFontSize(12);
    doc.text(`GRAND TOTAL: ${totalMarks}/${maxMarks}`, 20, y);
    doc.text(`PERCENTAGE: ${overallPct}%`, 100, y);
    doc.text(`RESULT: PASSED`, 190, y, { align: 'right' });
    
    doc.save('Report_Card_2024_25.pdf');
    setDownloading(false);
    addToast('success', 'Download Complete', 'Your report card has been generated.');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase">Academic Performance</h1>
          <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Session 2024-25 • Detailed Grade Matrix</p>
        </div>
        <button 
          onClick={handleDownload}
          disabled={downloading}
          className="w-full sm:w-auto px-6 py-3.5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 ring-4 ring-white/50 active:scale-95 transition-all disabled:opacity-50"
        >
           {downloading ? 'Processing Bureau...' : <><FiDownload size={18} /> Download Transcript</>}
        </button>
      </div>

      {/* Overall Score Board */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-indigo-700 via-primary to-indigo-900 rounded-[32px] md:rounded-[40px] p-8 md:p-12 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full -ml-24 -mb-24 blur-2xl pointer-events-none" />
        
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-6xl font-black tracking-tighter">{overallPct}</span>
              <span className="text-xl md:text-2xl font-black opacity-40">%</span>
            </div>
            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-indigo-100/60 mt-2">Aggregate Score</p>
          </div>
          <div className="text-center md:text-left flex flex-col items-center md:items-start pl-0 lg:pl-12">
            <span className="text-4xl md:text-6xl font-black tracking-tighter">A<span className="text-2xl md:text-3xl opacity-40 ml-1">+</span></span>
            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-indigo-100/60 mt-2">Proficiency Grade</p>
          </div>
          <div className="text-center md:text-left flex flex-col items-center md:items-start pl-0 lg:pl-12">
            <span className="text-2xl md:text-4xl font-black tracking-tighter leading-tight">{totalMarks}<span className="text-base md:text-xl opacity-40 ml-1">/{maxMarks}</span></span>
            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-indigo-100/60 mt-3 md:mt-5">Cumulative Marks</p>
          </div>
          <div className="text-center md:text-left flex flex-col items-center md:items-start pl-0 lg:pl-12">
            <div className="flex items-center gap-2">
              <span className="text-4xl md:text-6xl font-black tracking-tighter leading-none">12</span>
              <div className="px-2 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest">th</div>
            </div>
            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-indigo-100/60 mt-2">Institutional Rank</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }} 
        className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="px-6 md:px-8 py-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 text-primary rounded-xl flex items-center justify-center shrink-0">
            <FiAward size={20} />
          </div>
          <div>
            <h5 className="font-black text-slate-800 uppercase tracking-tight text-sm">Course Performance Matrix</h5>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-80">Subject-wise evaluation breakdown</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject Discipline</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Supervisor</th>
                  <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">UT (50)</th>
                  <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Mid (100)</th>
                  <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Final (100)</th>
                  <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Total</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mastery</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {results.map((r, i) => {
                  const pct = Math.round(r.total / r.max * 100);
                  return (
                    <motion.tr 
                      key={r.subject} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-primary flex items-center justify-center border border-indigo-100/50">
                            <FiBookOpen size={14} />
                          </div>
                          <span className="font-bold text-slate-800">{r.subject}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{r.teacher}</span>
                      </td>
                      <td className="px-4 py-5 text-center text-sm font-black text-slate-600">{r.ut1 + r.ut2}</td>
                      <td className="px-4 py-5 text-center text-sm font-black text-slate-600">{r.midterm}</td>
                      <td className="px-4 py-5 text-center text-sm font-black text-slate-600">{r.final}</td>
                      <td className="px-4 py-5 text-center">
                        <span className="px-3 py-1 bg-slate-100 rounded-lg font-black text-slate-800 text-sm border border-slate-200 shadow-inner">
                          {r.total}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
                            <div 
                              className={`h-full rounded-full shadow-lg ${
                                pct >= 80 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 
                                pct >= 60 ? 'bg-gradient-to-r from-indigo-400 to-indigo-600' : 
                                'bg-gradient-to-r from-amber-400 to-amber-600'
                              }`} 
                              style={{ width: `${pct}%` }} 
                            />
                          </div>
                          <span className="font-black text-slate-800 text-xs w-8 tracking-tighter">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          gradeColors[r.grade] === 'badge-success' ? 'bg-emerald-50 text-secondary border-emerald-100' :
                          gradeColors[r.grade] === 'badge-primary' ? 'bg-indigo-50 text-primary border-indigo-100' :
                          'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {r.grade}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="p-6 md:p-8 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row justify-end items-center gap-6 md:gap-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Valuation:</span>
            <span className="text-lg font-black text-slate-800 leading-none">{totalMarks}<span className="text-xs opacity-40 ml-1">/{maxMarks}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Proficiency:</span>
            <span className="text-lg font-black text-primary leading-none">{overallPct}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institutional Grade:</span>
            <span className="text-lg font-black text-emerald-600 leading-none">A+</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

