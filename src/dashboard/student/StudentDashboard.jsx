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
    <div className="page-enter">
      {/* Welcome Message */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Welcome Back, {user?.name?.split(' ')[0] || 'Learner'}! 🌟</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Check your progress and upcoming classes for the day.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
           <button 
             className="btn btn-outline btn-sm" 
             style={{ 
               height: 40, borderRadius: 10, padding: '0 20px', 
               display: 'flex', gap: 8, alignItems: 'center', fontWeight: 700,
               background: 'white', color: 'var(--primary)', border: '1px solid var(--border)' 
             }}
             onClick={handleDownloadReport}
             disabled={downloading}
           >
              {downloading ? 'Processing...' : <><FiDownload /> Report Card</>}
           </button>
           <div style={{ background: 'white', border: '1px solid var(--border)', padding: '8px 20px', borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Points Earned</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#D97706' }}>✨ 2,450</div>
           </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid-2" style={{ marginBottom: 32 }}>
        {/* Attendance Overview */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="card" style={{ minHeight: 280 }}>
          <div className="card-header"><h5>Attendance Analysis</h5><FiActivity style={{ color: 'var(--text-muted)' }} /></div>
          <div className="card-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
             <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <h4 style={{ margin: 0, fontWeight: 800, color: 'var(--primary)', fontSize: 24 }}>88%</h4>
                <p style={{ margin: 0, fontSize: 9, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Present</p>
             </div>
          </div>
          <div style={{ padding: '0 24px 20px', display: 'flex', justifyContent: 'center', gap: 16 }}>
             {attendanceData.map(d => (
               <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
                  {d.name.substring(0,1)}
               </div>
             ))}
          </div>
        </motion.div>

        {/* Academic Grades */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="card" style={{ minHeight: 280 }}>
           <div className="card-header"><h5>Performance Analytics</h5><FiAward style={{ color: '#D97706' }} /></div>
           <div className="card-body" style={{ padding: '10px 32px' }}>
               <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                  <ResponsiveContainer width="100%" height={160}>
                     <BarChart data={gradeData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }} barCategoryGap="10%">
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.5} />
                        <XAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                        <YAxis domain={[0, 100]} hide />
                        <Tooltip 
                          cursor={{ fill: 'rgba(37,99,235,0.05)' }} 
                          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '6px 12px' }} 
                          labelStyle={{ fontSize: 13, fontWeight: 800, marginBottom: 2, color: 'var(--text-main)' }}
                          itemStyle={{ fontSize: 12, fontWeight: 700, padding: 0, color: 'var(--primary)' }}
                        />
                        <Bar dataKey="score" fill="var(--primary)" radius={[6,6,0,0]} barSize={40} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
           </div>
           <div className="card-footer" style={{ borderTop: 'none', padding: '0 32px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
                 <span>Class Range: 65% - 98%</span>
                 <span style={{ color: '#10B981' }}>Top 5% of Class</span>
              </div>
           </div>
        </motion.div>
      </div>

      <div className="grid-2">
         {/* Daily TimeTable */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
             <div className="card-header">
                <div>
                   <h5 style={{ marginBottom: 2 }}>Daily Academic Routine</h5>
                   <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, margin: 0 }}>
                     {today} • 8:00 AM - 3:40 PM
                   </p>
                </div>
                <FiClock style={{ color: 'var(--text-muted)' }} />
             </div>
            <div className="card-body" style={{ padding: '8px 24px' }}>
                {todayClasses.map((s, idx) => s !== '-' && (
                  <div key={idx} style={{ 
                    display: 'flex', gap: 20, padding: '16px 0', 
                    borderBottom: idx < todayClasses.length - 1 ? '1px solid var(--border)' : 'none',
                    alignItems: 'center'
                  }}>
                     <div style={{ textAlign: 'center', minWidth: 70 }}>
                        <div style={{ color: 'var(--primary)', fontWeight: 900, fontSize: 13, marginBottom: 2 }}>P{idx + 1}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 800 }}>{PERIODS[idx]}</div>
                     </div>
                     <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>{s}</p>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
                          {teachers[s] ? teachers[s] : 'Building B • Room 204'}
                        </p>
                     </div>
                     <div style={{ 
                       width: 40, height: 40, borderRadius: 12, 
                       background: subjectColors[s] || 'var(--primary-50)', 
                       display: 'flex', alignItems: 'center', justifyContent: 'center', 
                       color: subjectTextColors[s] || 'var(--primary)',
                       border: `1px solid ${subjectTextColors[s] || 'var(--primary)'}20`
                     }}>
                        <FiBook size={18} />
                     </div>
                  </div>
               ))}
               {todayClasses.filter(s => s !== '-').length === 0 && (
                  <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>No classes scheduled for today.</div>
               )}
            </div>
         </motion.div>

         {/* Notice Board */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card h-full">
               <div className="card-header"><h5>Institutional Notices</h5><FiBell style={{ color: 'var(--text-muted)' }} /></div>
               <div className="card-body" style={{ padding: '8px 24px' }}>
                  {EVENTS.slice(0, 3).map((e, idx) => (
                     <div key={idx} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: idx < 2 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center', minWidth: 50, padding: '8px 4px', background: 'aliceblue', color: 'var(--primary)', borderRadius: 12, border: '1px solid rgba(37,99,235,0.1)' }}>
                           <div style={{ fontWeight: 800, fontSize: 10 }}>{e.date.split(' ')[0]}</div>
                           <div style={{ fontWeight: 900, fontSize: 14 }}>{e.date.split(' ')[1]}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                           <p style={{ fontWeight: 800, fontSize: 14 }}>{e.title}</p>
                           <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{e.type}</p>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="card-footer">
                 <button className="btn btn-ghost btn-sm btn-full" style={{ fontWeight: 800, color: 'var(--primary)' }} onClick={() => setShowNotif(true)}>
                    Check All Notifications
                 </button>
               </div>
            </motion.div>
         </div>
      </div>

      {/* Notifications Modal */}
      <AnimatePresence>
        {showNotif && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowNotif(false)}>
             <motion.div className="modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ maxWidth: 500, borderRadius: 28 }}>
                <div className="modal-header" style={{ padding: '24px 32px' }}>
                   <h4 style={{ fontWeight: 800 }}>Diagnostic Inbox</h4>
                   <button className="modal-close" onClick={() => setShowNotif(false)}><FiX /></button>
                </div>
                <div className="modal-body" style={{ padding: '0 32px 32px' }}>
                   <div className="space-y-4">
                      {EVENTS.map(e => (
                        <div key={e.id} style={{ padding: 16, borderRadius: 16, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                              <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 12 }}>{e.type}</span>
                              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>{e.date}</span>
                           </div>
                           <p style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{e.title}</p>
                           <p style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>{e.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="modal-footer" style={{ borderTop: 'none', padding: '0 32px 32px' }}>
                   <button className="btn btn-primary btn-full" style={{ borderRadius: 12, height: 48, fontWeight: 800 }} onClick={() => { addToast('success', 'Cleared', 'All notifications marked as read.'); setShowNotif(false); }}>
                      Mark All as Read
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

