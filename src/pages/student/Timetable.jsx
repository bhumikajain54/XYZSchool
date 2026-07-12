import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const PERIODS = ['8:00-9:00', '9:10-10:10', '10:20-11:20', '11:30-12:30', '1:30-2:30', '2:40-3:40'];
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timetableData = {
  Monday:   ['Mathematics', 'Physics', 'PT', 'Chemistry', 'English', 'Mathematics'],
  Tuesday:  ['Physics', 'Chemistry', 'Mathematics', 'History', 'PT', 'English'],
  Wednesday:['English', 'Mathematics', 'Chemistry', 'Physics', '🍽 Lunch', 'History'],
  Thursday: ['History', 'English', 'Physics', 'Mathematics', 'Chemistry', 'PT'],
  Friday:   ['Chemistry', 'History', 'English', 'PT', 'Mathematics', 'Physics'],
  Saturday: ['Mathematics', 'PT', 'History', '🍽 Lunch', '-', '-'],
};

const subjectColors = {
  Mathematics: '#EFF6FF',
  Physics: '#F0FDF4',
  Chemistry: '#FEF9C3',
  English: '#FFF7ED',
  History: '#FDF4FF',
  PT: '#F0FFF4',
  '🍽 Lunch': '#FEF3C7',
  '-': 'transparent',
};

const subjectTextColors = {
  Mathematics: '#1D4ED8',
  Physics: '#15803D',
  Chemistry: '#854D0E',
  English: '#9A3412',
  History: '#7E22CE',
  PT: '#166534',
  '🍽 Lunch': '#D97706',
  '-': 'var(--text-muted)',
};

const teachers = {
  Mathematics: 'Mrs. Priya S.',
  Physics: 'Mr. Ramesh K.',
  Chemistry: 'Mr. Arjun N.',
  English: 'Mrs. Sunita V.',
  History: 'Mr. Deepak M.',
  PT: 'Mr. Suresh P.',
};

const today = DAYS_OF_WEEK[new Date().getDay() - 1] || 'Monday';

export default function Timetable() {
  const handleDownload = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(22);
    doc.text('XYZ Higher Secondary School', 148, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text('OFFICIAL WEEKLY TIMETABLE - CLASS 10-A', 148, 30, { align: 'center' });
    doc.line(20, 35, 277, 35);

    const head = [['Period', ...DAYS_OF_WEEK]];
    const body = PERIODS.map((p, pi) => [
      p,
      ...DAYS_OF_WEEK.map(d => timetableData[d][pi] || '-')
    ]);

    autoTable(doc, {
      head,
      body,
      startY: 45,
      theme: 'grid',
      headStyles: { fillStyle: '#1D4ED8', halign: 'center' },
      styles: { fontSize: 10, cellPadding: 5, halign: 'center' }
    });

    doc.save('Weekly_Timetable_10A.pdf');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-full space-y-6 md:space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase">Academic Schedule</h1>
          <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Weekly Institutional Calendar — Class 10-A</p>
        </div>
        <button 
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition shadow-sm active:scale-95"
        >
           <FiDownload size={16} /> Export Schedule
        </button>
      </div>

      {/* Today's classes highlight */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-50/50 border border-indigo-100 rounded-[32px] p-6 md:p-8 ring-1 ring-white">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
           <p className="font-black text-xs text-indigo-700 uppercase tracking-widest">Today's Sessions ({today})</p>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {(timetableData[today] || []).map((s, i) => s !== '-' && (
            <div 
              key={i} 
              style={{ background: subjectColors[s], color: subjectTextColors[s], border: `1px solid ${subjectTextColors[s]}20` }}
              className="px-5 py-3 rounded-2xl shrink-0 flex flex-col min-w-[140px] shadow-sm bg-white"
            >
              <span className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1">{PERIODS[i].split('-')[0]} Point</span>
              <span className="text-[11px] font-black tracking-tight truncate">{s}</span>
              {teachers[s] && <span className="text-[8px] font-bold opacity-70 mt-1 truncate">{teachers[s]}</span>}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Full timetable */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden ring-1 ring-slate-100">
        <div className="p-6 md:p-8 border-b border-slate-100">
           <h5 className="font-black text-slate-800 uppercase tracking-tight text-sm">Institutional Master Plan</h5>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Comprehensive Weekly Distribution</p>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-b border-r border-slate-50">Interval</th>
                  {DAYS_OF_WEEK.map(d => (
                    <th key={d} className={`px-4 py-5 text-[10px] font-black uppercase tracking-widest text-center border-b border-slate-50 transition-colors ${d === today ? 'bg-primary text-white' : 'text-slate-400'}`}>
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {PERIODS.map((p, pi) => (
                  <tr key={p} className="hover:bg-slate-50/20 transition-colors">
                    <td className="px-6 py-6 text-center border-r border-slate-50 bg-slate-50/10">
                       <span className="font-black text-slate-700 text-[10px] tracking-tighter whitespace-nowrap bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-sm">{p}</span>
                    </td>
                    {DAYS_OF_WEEK.map(d => {
                      const subj = timetableData[d]?.[pi] || '-';
                      const isBreak = subj === '🍽 Lunch';
                      const isToday = d === today;
                      
                      return (
                        <td key={d} className={`p-1 border-slate-50 ${isToday ? 'bg-indigo-50/10 border-x border-indigo-100/30' : ''}`}>
                          <div 
                            style={{ 
                              background: subj !== '-' ? subjectColors[subj] : 'transparent',
                              color: subjectTextColors[subj],
                              opacity: subj === '-' ? 0.3 : 1
                            }}
                            className={`h-full min-h-[70px] flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${subj !== '-' ? 'border-indigo-100/20 shadow-sm' : 'border-transparent'}`}
                          >
                            <span className={`text-[10px] uppercase font-black tracking-tight text-center ${isBreak ? 'scale-110' : ''}`}>{subj}</span>
                            {teachers[subj] && <span className="text-[8px] font-bold opacity-60 mt-1.5 text-center leading-none tracking-tight">{teachers[subj]}</span>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-6 bg-slate-50/30 border-t border-slate-50 text-center">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">XYZ Higher Secondary School • Class 10-A Regulatory Schedule</p>
        </div>
      </motion.div>
    </div>
  );
}

