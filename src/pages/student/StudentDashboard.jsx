import React, { useState } from 'react';
import { 
  FiHome, FiBook, FiCalendar, FiClock, 
  FiAward, FiActivity, FiMapPin, FiStar, FiX, FiBell, FiDownload, FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Clinical constants for day auditing
const PERIODS = ['8:00 - 9:00', '9:10 - 10:10', '10:20 - 11:20', '11:30 - 12:30', '1:30 - 2:30', '2:40 - 3:40'];
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timetableData = {
  Monday:   ['Mathematics', 'Physics', 'PT', 'Chemistry', 'English', 'Mathematics'],
  Tuesday:  ['Physics', 'Chemistry', 'Mathematics', 'History', 'PT', 'English'],
  Wednesday:['English', 'Mathematics', 'Chemistry', 'Physics', '🍽 Lunch', 'History'],
  Thursday: ['History', 'English', 'Physics', 'Mathematics', 'Chemistry', 'PT'],
  Friday:   ['Chemistry', 'History', 'English', 'PT', 'Mathematics', 'Physics'],
  Saturday: ['Mathematics', 'PT', 'History', '🍽 Lunch', '-', '-'],
};

const teachers = {
  Mathematics: 'Mrs. Priya S.',
  Physics: 'Mr. Ramesh K.',
  Chemistry: 'Mr. Arjun N.',
  English: 'Mrs. Sunita V.',
  History: 'Mr. Deepak M.',
  PT: 'Mr. Suresh P.',
  '🍽 Lunch': 'Cafeteria',
};

const subjectColors = {
  Mathematics: '#EFF6FF',
  Physics: '#F0FDF4',
  Chemistry: '#FEF9C3',
  English: '#FFF7ED',
  History: '#FDF4FF',
  PT: '#F0FFF4',
  '🍽 Lunch': '#FEF3C7',
};

const subjectTextColors = {
  Mathematics: '#2563EB',
  Physics: '#22C55E',
  Chemistry: '#A16207',
  English: '#C2410C',
  History: '#9333EA',
  PT: '#15803D',
  '🍽 Lunch': '#D97706',
};

const attendanceData = [
  { name: 'Present', value: 88, color: '#10B981' },
  { name: 'Absent', value: 7, color: '#EF4444' },
  { name: 'Leave', value: 5, color: '#F59E0B' },
];

const gradeData = [
  { subject: 'Math', score: 92 },
  { subject: 'Sci', score: 85 },
  { subject: 'Eng', score: 88 },
  { subject: 'Hist', score: 79 },
  { subject: 'Geo', score: 94 },
];

const EVENTS = [
  { id: 1, date: 'Apr 05', title: 'Parent-Teacher Meeting', type: 'High Priority', desc: 'Discuss term 1 results and performance.' },
  { id: 2, date: 'Apr 12', title: 'Science Exhibition', type: 'School Event', desc: 'Mandatory participation for grade 10.' },
  { id: 3, date: 'Apr 20', title: 'Mid-term Exams', type: 'Academic', desc: 'Full syllabus covered in class.' },
];

export default function StudentDashboard() {
  const { user, addToast } = useApp();
  const [showNotif, setShowNotif] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const today = DAYS_OF_WEEK[new Date().getDay() - 1] || 'Monday';
  const todayClasses = timetableData[today] || [];

  const handleDownloadReport = async () => {
     setDownloading(true);
     addToast('info', 'Generating PDF', 'Preparing your institutional report card...');
     await new Promise(r => setTimeout(r, 1500));
     
     // Dummy PDF generation logic
     const doc = new jsPDF();
     doc.setFontSize(22);
     doc.text('XYZ Higher Secondary School', 105, 20, { align: 'center' });
     doc.setFontSize(16);
     doc.text('Student Report Card - 2024', 105, 30, { align: 'center' });
     doc.line(20, 35, 190, 35);
     
     doc.setFontSize(12);
     doc.text(`Student Name: ${user?.name || 'Vikas Jain'}`, 20, 50);
     doc.text(`Roll Number: 1024-A`, 20, 60);
     doc.text(`Class: 10th Section A`, 20, 70);
     
     let y = 90;
     doc.text('Subject', 20, y);
     doc.text('Score', 100, y);
     doc.text('Grade', 160, y);
     doc.line(20, y+2, 190, y+2);
     
     gradeData.forEach(g => {
        y += 12;
        doc.text(g.subject, 20, y);
        doc.text(g.score.toString(), 100, y);
        doc.text(g.score > 90 ? 'A+' : 'A', 160, y);
     });

     doc.save('Student_Report_2024.pdf');
     setDownloading(false);
     addToast('success', 'Download Complete', 'Report card saved successfully.');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Welcome Message */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div className="text-left">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Hi, {user?.name?.split(' ')[0] || 'Learner'}! 🌟</h2>
          <p className="text-[10px] md:text-xs font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">Command Center • Session Audit A.Y. 2024-25</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
           <button 
             className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition shadow-sm active:scale-95"
             onClick={handleDownloadReport}
             disabled={downloading}
           >
              {downloading ? (
                <div className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
              ) : <FiDownload size={14} className="text-blue-600" />}
              {downloading ? 'Processing' : 'Report card'}
           </button>
           <div className="flex-1 md:flex-none bg-amber-50 border border-amber-100/50 px-6 py-2.5 rounded-2xl shadow-sm flex flex-col justify-center min-w-[120px]">
              <div className="text-[8px] font-black text-amber-600/60 uppercase tracking-widest mb-0.5 leading-none text-center">Academic Assets</div>
              <div className="text-lg font-black text-amber-600 tracking-tighter text-center leading-none">✨ 2,450</div>
           </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
        {/* Attendance Overview */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-[40px] border border-slate-200 p-6 md:p-10 shadow-sm flex flex-col items-center ring-1 ring-slate-100 relative overflow-hidden group">
          <div className="w-full flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h5 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Attendance Telemetry</h5>
             </div>
             <FiActivity className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
          </div>
          <div className="w-full flex flex-col items-center justify-center py-4 relative">
             <div className="relative w-full max-w-[280px] h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={attendanceData}
                       cx="50%"
                       cy="50%"
                       innerRadius={75}
                       outerRadius={95}
                       paddingAngle={8}
                       dataKey="value"
                       stroke="none"
                     >
                       {attendanceData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} className="outline-none" />
                       ))}
                     </Pie>
                   </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                   <h4 className="font-black text-4xl text-slate-800 leading-none tracking-tighter">88%</h4>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Global Load</p>
                </div>
             </div>
             <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-8 mt-10">
                {attendanceData.map(d => (
                  <div key={d.name} className="flex items-center gap-2.5">
                     <div className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ background: d.color }} />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{d.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </motion.div>

        {/* Academic Grades */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-white rounded-[40px] border border-slate-200 p-6 md:p-10 shadow-sm flex flex-col ring-1 ring-slate-100 group">
           <div className="flex items-center justify-between mb-12">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <h5 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Performance Heatmap</h5>
             </div>
             <FiAward className="text-amber-500 group-hover:scale-125 transition-transform" />
           </div>
           <div className="grow w-full">
               <div className="h-[200px] md:h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={gradeData} barCategoryGap="15%">
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="subject" tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <YAxis domain={[0, 100]} hide />
                        <Tooltip 
                          cursor={{ fill: '#f8fafc', radius: 12 }} 
                          contentStyle={{ borderRadius: 24, border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '16px 20px', background: '#fff' }} 
                          labelStyle={{ fontSize: 11, fontWeight: 900, marginBottom: 6, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                          itemStyle={{ fontSize: 13, fontWeight: 900, padding: 0, color: '#4f46e5' }}
                        />
                        <Bar dataKey="score" fill="#6366f1" radius={[12,12,0,0]} barSize={42} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
           </div>
           <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Institutional Avg: 82% • High: 98%</span>
              <span className="text-emerald-600 bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100 text-[9px] font-black uppercase tracking-widest shadow-sm">Top 5% Student Baseline</span>
           </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
         {/* Daily TimeTable */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm ring-1 ring-slate-100 flex flex-col">
             <div className="px-6 md:px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 shrink-0">
                      <FiClock size={24} />
                   </div>
                   <div>
                      <h5 className="font-black text-slate-800 text-lg md:text-xl tracking-tight uppercase">Daily Agenda</h5>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
                        {today} • Institutional Matrix
                      </p>
                   </div>
                </div>
             </div>
            <div className="p-4 md:p-8 space-y-3">
                {todayClasses.map((s, idx) => s !== '-' && (
                  <div key={idx} className="flex items-center gap-4 md:gap-8 p-6 rounded-[32px] group hover:bg-slate-50/50 transition-all border border-transparent hover:border-slate-100 cursor-pointer ring-1 ring-transparent hover:ring-white">
                     <div className="text-center min-w-[70px] md:min-w-[90px] shrink-0">
                        <div className="text-indigo-400 font-black text-[9px] uppercase tracking-widest mb-1.5 opacity-60">Phase {idx + 1}</div>
                        <div className="font-black text-[10px] text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm whitespace-nowrap">{PERIODS[idx]}</div>
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="font-black text-base md:text-lg text-slate-800 truncate mb-1.5 tracking-tight group-hover:text-indigo-600 transition-colors uppercase italic">{s}</p>
                        <div className="flex items-center gap-2 overflow-hidden">
                           <FiMapPin className="text-indigo-300 shrink-0" size={12} />
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate leading-none pt-0.5">
                             {teachers[s] ? teachers[s] : 'Complex B • Room 204'}
                           </p>
                        </div>
                     </div>
                     <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all shrink-0 group-hover:shadow-lg group-hover:shadow-indigo-100 group-hover:scale-110"
                        style={{ 
                          background: subjectColors[s] || '#f8fafc', 
                          color: subjectTextColors[s] || '#6366f1',
                          borderColor: `${subjectTextColors[s] || '#6366f1'}20`
                        }}
                     >
                        <FiBook size={20} />
                     </div>
                  </div>
                ))}
            </div>
          </motion.div>

         {/* Notice Board */}
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm h-full flex flex-col ring-1 ring-slate-100">
            <div className="px-6 md:px-10 py-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                 <h5 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em] italic">Bulletins</h5>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Official Communications</p>
              </div>
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 border border-slate-100 pointer-events-none">
                 <FiBell size={20} />
              </div>
            </div>
            <div className="p-6 md:p-10 grow space-y-2">
               {EVENTS.slice(0, 3).map((e, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-4 rounded-3xl hover:bg-slate-50 transition-all group cursor-pointer border border-transparent hover:border-slate-100">
                     <div className="text-center min-w-[60px] py-3.5 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-indigo-600 transition-all shadow-inner group-hover:shadow-none shrink-0 group-hover:border-indigo-500">
                        <div className="text-slate-400 font-black text-[9px] uppercase tracking-widest group-hover:text-white/60 transition-colors">{e.date.split(' ')[0]}</div>
                        <div className="font-black text-2xl text-slate-700 group-hover:text-white transition-colors leading-none mt-1 tracking-tighter">{e.date.split(' ')[1]}</div>
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="font-black text-sm md:text-base text-slate-800 mb-1.5 group-hover:text-indigo-600 transition-colors uppercase tracking-tight truncate italic">{e.title}</p>
                        <span className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest shadow-sm">{e.type}</span>
                     </div>
                  </div>
               ))}
            </div>
            <div className="p-6 md:p-10 pt-0">
              <button className="w-full py-5 bg-indigo-600 text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95" onClick={() => setShowNotif(true)}>
                 Expand Bulletins
              </button>
            </div>
         </motion.div>
      </div>

      {/* Notifications Modal */}
      <AnimatePresence>
        {showNotif && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowNotif(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
             <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 30 }}
               className="relative bg-white rounded-[40px] w-full max-w-lg p-6 md:p-10 shadow-3xl border border-white mx-auto overflow-hidden ring-1 ring-slate-200"
             >
                <div className="mb-8 flex justify-between items-start">
                  <div>
                    <h4 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight uppercase italic">Institutional Inbox</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Audit Trail • Priority Messages</p>
                  </div>
                  <button onClick={() => setShowNotif(false)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors shadow-inner">
                    <FiX />
                  </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto no-scrollbar pr-1 -mr-1 space-y-4">
                  {EVENTS.map(e => (
                    <div key={e.id} className="p-6 rounded-[32px] bg-slate-50/50 border border-slate-100 ring-1 ring-white shadow-sm flex flex-col gap-3">
                       <div className="flex justify-between items-start">
                          <span className="px-3 py-1 bg-white border border-indigo-100 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest shadow-sm">{e.type}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{e.date}</span>
                       </div>
                       <div>
                          <p className="font-black text-base text-slate-800 uppercase italic tracking-tight leading-none mb-2">{e.title}</p>
                          <p className="text-xs font-bold text-slate-500 leading-relaxed">{e.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                   <button className="w-full py-5 bg-white border border-slate-200 rounded-[24px] text-xs font-black text-slate-700 uppercase tracking-[0.2em] shadow-sm hover:bg-slate-50 transition active:scale-95" onClick={() => { addToast('success', 'Cleared', 'Verification success.'); setShowNotif(false); }}>
                      Clear Audit Log
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

