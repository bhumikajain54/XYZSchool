import React from 'react';
import { motion } from 'framer-motion';

import { FiDownload, FiCheckCircle, FiFileText } from 'react-icons/fi';
import { jsPDF } from 'jspdf';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function StudentAttendance() {
  const [curDate, setCurDate] = React.useState(new Date(2026, 3, 1)); // Default to April 2026
  const today = new Date();
  
  const year = curDate.getFullYear();
  const month = curDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = curDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const dayStatuses = React.useMemo(() => {
    const statuses = {};
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dow = date.getDay();
      
      if (dow === 0) statuses[d] = 'holiday';
      else if (month === 3) { // April 2026
        if (d === 3) statuses[d] = 'absent';
        else if (d === 1) statuses[d] = 'medical';
        else if (date <= today) statuses[d] = 'present';
      }
      else if (date < today) {
        // Mock data for previous months
        statuses[d] = Math.random() > 0.1 ? 'present' : 'absent';
      }
    }
    return statuses;
  }, [year, month, daysInMonth]);

  const changeMonth = (val) => {
    setCurDate(new Date(year, month + val, 1));
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('XYZ Higher Secondary School', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`ATTENDANCE REPORT - ${monthName}`, 105, 30, { align: 'center' });
    doc.line(20, 35, 190, 35);

    doc.setFontSize(12);
    doc.text(`Present: ${presentCount}`, 20, 50);
    doc.text(`Absent: ${absentCount}`, 80, 50);
    doc.text(`Medical: ${leaveCount}`, 140, 50);
    doc.text(`Attendance Rate: ${attendanceRate}%`, 20, 60);

    doc.save(`Attendance_${monthName}.pdf`);
  };

  // Count strictly for April
  const presentCount = Object.values(dayStatuses).filter(s => s === 'present').length;
  const absentCount = Object.values(dayStatuses).filter(s => s === 'absent').length;
  const leaveCount = Object.values(dayStatuses).filter(s => s === 'medical').length;
  const attendanceRate = Math.round(presentCount / ((presentCount + absentCount) || 1) * 100);

  // Pre-calculate previous month statuses for the log if needed, or just use a fixed map for the log
  const getStatusForDate = (date) => {
    const m = date.getMonth();
    const d = date.getDate();
    const dow = date.getDay();
    if (dow === 0) return 'holiday';
    if (m === month) return dayStatuses[d] || 'present';
    // Fallback for March
    if (d === 29) return 'holiday';
    if (d === 25) return 'absent';
    return 'present';
  };

  const monthlyData = [
    { month: 'Nov', pct: 92 }, { month: 'Dec', pct: 78 }, { month: 'Jan', pct: 88 },
    { month: 'Feb', pct: 95 }, { month: 'Mar', pct: 87 },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase">Attendance Audit</h1>
          <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Institutional Presence Tracking • Session 2024-25</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
           <button 
             onClick={handleDownload}
             className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition shadow-sm active:scale-95"
           >
              <FiDownload size={16} /> Download Report
           </button>
           <div className="grid grid-cols-3 gap-3 w-full sm:w-auto">
             <div className="bg-white border border-slate-200 p-3 rounded-2xl flex flex-col items-center justify-center min-w-[80px] md:min-w-[100px] shadow-sm">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Present</span>
                <span className="text-lg md:text-xl font-black text-emerald-600 leading-none mt-1">{presentCount}</span>
             </div>
             <div className="bg-white border border-slate-200 p-3 rounded-2xl flex flex-col items-center justify-center min-w-[80px] md:min-w-[100px] shadow-sm">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Absent</span>
                <span className="text-lg md:text-xl font-black text-rose-500 leading-none mt-1">{absentCount || 0}</span>
             </div>
             <div className="bg-primary p-3 rounded-2xl flex flex-col items-center justify-center min-w-[80px] md:min-w-[100px] shadow-lg shadow-indigo-100 text-white">
                <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Rate</span>
                <span className="text-lg md:text-xl font-black leading-none mt-1">{attendanceRate}%</span>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Calendar */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h5 className="font-black text-slate-800 uppercase tracking-tight text-sm">Academic Snapshot</h5>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Monthly Attendance Grid</p>
            </div>
            <div className="flex items-center gap-3 bg-indigo-50/50 p-2 rounded-2xl border border-indigo-100/50 w-full sm:w-auto">
               <button onClick={() => changeMonth(-1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm border border-indigo-100/50 text-primary hover:bg-indigo-50 transition cursor-pointer font-black">‹</button>
               <span className="font-black text-primary text-[10px] uppercase tracking-widest min-w-[100px] text-center">{monthName}</span>
               <button onClick={() => changeMonth(1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm border border-indigo-100/50 text-primary hover:bg-indigo-50 transition cursor-pointer font-black">›</button>
            </div>
          </div>
          <div className="p-4 md:p-8 pt-0">
            <div className="grid grid-cols-7 gap-1 md:gap-2 text-center">
              {DAYS.map(d => <div key={d} className="py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">{d}</div>)}
              {[...Array(firstDay)].map((_, i) => <div key={`e-${i}`} className="aspect-square bg-slate-50/30 rounded-xl" />)}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const status = dayStatuses[day] || '';
                return (
                  <div 
                    key={day} 
                    className={`aspect-square sm:aspect-auto sm:h-12 md:h-14 flex items-center justify-center rounded-xl text-xs md:text-sm font-black transition-all border
                      ${status === 'present' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-50' : 
                        status === 'absent' ? 'bg-rose-50 text-rose-500 border-rose-100' : 
                        status === 'medical' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        status === 'holiday' ? 'bg-slate-50 text-slate-400 border-slate-100 border-dashed' : 
                        'bg-white text-slate-800 border-slate-200'}
                      ${new Date(year, month, day).toDateString() === new Date().toDateString() ? 'ring-2 ring-primary ring-offset-2' : ''}
                    `}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8 pt-6 border-t border-slate-50">
              {[
                { dot: 'bg-emerald-500', label: 'Present' },
                { dot: 'bg-rose-500', label: 'Absent' },
                { dot: 'bg-amber-500', label: 'Medical' },
                { dot: 'bg-slate-300', label: 'Holiday' },
                { dot: 'ring-2 ring-primary', label: 'Current' }
              ].map(st => (
                <div key={st.label} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${st.dot}`} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{st.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 md:p-8 border-b border-slate-100">
             <h5 className="font-black text-slate-800 uppercase tracking-tight text-sm">Institutional Growth</h5>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Historical presence analysis</p>
          </div>
          <div className="p-6 md:p-8 space-y-6 flex-1">
            {monthlyData.map((m, i) => (
              <div key={m.month}>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-black text-[10px] text-slate-500 uppercase tracking-widest">{m.month} Summary</span>
                  <span className={`text-[11px] font-black ${m.pct >= 85 ? 'text-emerald-500' : m.pct >= 75 ? 'text-amber-500' : 'text-rose-500'}`}>{m.pct}% Readiness</span>
                </div>
                <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${m.pct >= 85 ? 'bg-emerald-500' : m.pct >= 75 ? 'bg-amber-400' : 'bg-rose-500'}`} 
                    style={{ width: `${m.pct}%` }} 
                  />
                </div>
              </div>
            ))}

            <div className="mt-8 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 ring-1 ring-slate-50">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="font-black text-xs text-slate-700 uppercase tracking-tight">Compliance Status</p>
              </div>
              <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                 Current attendance of <span className="text-emerald-600 font-black">{attendanceRate}%</span> is <span className="text-slate-800 underline decoration-emerald-200 underline-offset-2">above the 75% threshold</span>. Maintain this consistency for semester eligibility.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Rank</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-700 tracking-tighter">#Top 15%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Attendance Log */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100">
           <h5 className="font-black text-slate-800 uppercase tracking-tight text-sm">Audit Transaction Log</h5>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Detailed breakdown of recent academic sessions</p>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30 border-b border-slate-50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Session Date</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Week</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Institutional Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Marked Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[...Array(10)].map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() - i);
                  const statusRaw = getStatusForDate(d);
                  const status = statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1);
                  const dow = d.getDay();
                  return (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <span className="font-black text-slate-800 text-sm tracking-tight">{d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dow]}</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                         <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                           status === 'Present' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                           status === 'Absent' ? 'bg-rose-50 text-rose-500 border-rose-100' : 
                           status === 'Medical' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                         }`}>
                            {status}
                         </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">
                          {status === 'Holiday' ? 'Non-Working' : 'Terminal Entry'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-6 bg-slate-50/50 border-t border-slate-50 text-center">
          <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:text-indigo-800 transition shadow-sm bg-white px-8 py-3 rounded-xl border border-slate-200">Load Archive Audit</button>
        </div>
      </motion.div>
    </div>
  );
}

