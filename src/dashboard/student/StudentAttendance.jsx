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
    <div className="page-enter">
      <div className="section-header" style={{ marginBottom: 32 }}>
        <div>
          <h3 style={{ fontWeight: 800 }}>Attendance Audit</h3>
          <p className="section-subtitle">Institutional Presence Tracking • Session 2024-25</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
           <button 
             className="btn btn-outline" 
             style={{ background: 'white', color: 'var(--primary)', border: '1px solid var(--border)', borderRadius: 16, height: 48, padding: '0 24px', fontWeight: 800, marginRight: 12, display: 'flex', alignItems: 'center', gap: 8 }}
             onClick={handleDownload}
           >
              <FiDownload /> Download Report
           </button>
           <div style={{ background: 'white', border: '1px solid var(--border)', padding: '12px 20px', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90 }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Present</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10B981' }}>{presentCount}</div>
           </div>
           <div style={{ background: 'white', border: '1px solid var(--border)', padding: '12px 20px', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90 }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Absent</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#EF4444' }}>{absentCount || 0}</div>
           </div>
           <div style={{ background: 'var(--primary)', padding: '12px 20px', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 100, color: 'white' }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Rate</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>{attendanceRate}%</div>
           </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Calendar */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card">
          <div className="card-header" style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5 style={{ fontWeight: 800 }}>Academic Snapshot</h5>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--primary-50)', padding: '6px 16px', borderRadius: 12, border: '1px solid var(--primary-100)' }}>
               <button onClick={() => changeMonth(-1)} style={{ color: 'var(--primary)', fontWeight: 900, fontSize: 18, border: 'none', background: 'none', cursor: 'pointer' }}>‹</button>
               <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 13, minWidth: 90, textAlign: 'center' }}>{monthName}</span>
               <button onClick={() => changeMonth(1)} style={{ color: 'var(--primary)', fontWeight: 900, fontSize: 18, border: 'none', background: 'none', cursor: 'pointer' }}>›</button>
            </div>
          </div>
          <div className="card-body" style={{ padding: '0 32px 32px' }}>
            <div className="calendar-grid">
              {DAYS.map(d => <div key={d} className="calendar-day-header" style={{ fontWeight: 800, fontSize: 11, color: 'var(--text-muted)' }}>{d}</div>)}
              {[...Array(firstDay)].map((_, i) => <div key={`e-${i}`} className="calendar-day empty" />)}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const status = dayStatuses[day] || '';
                return <div key={day} className={`calendar-day ${status}`} style={{ fontWeight: 700, fontSize: 13 }}>{day}</div>;
              })}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
              {[
                { bg: '#DCFCE7', color: '#15803D', label: 'Present' },
                { bg: '#FEE2E2', color: '#DC2626', label: 'Absent' },
                { bg: '#FEF3C7', color: '#D97706', label: 'Medical' },
                { bg: '#F1F5F9', color: '#64748B', label: 'Holiday' },
                { bg: 'var(--primary)', color: 'white', label: 'Today' }
              ].map(st => (
                <div key={st.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)' }}>
                  <div style={{ width: 12, height: 12, borderRadius: 4, background: st.bg }} />
                  {st.label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card">
          <div className="card-header" style={{ padding: '24px 32px' }}>
             <h5 style={{ fontWeight: 800 }}>Institutional Growth</h5>
          </div>
          <div className="card-body" style={{ padding: '0 32px 32px' }}>
            {monthlyData.map((m, i) => (
              <div key={m.month} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 800, fontSize: 13, color: 'var(--text-secondary)' }}>{m.month} Analysis</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: m.pct >= 85 ? '#10B981' : m.pct >= 75 ? '#D97706' : '#EF4444' }}>{m.pct}%</span>
                </div>
                <div className="progress-bar" style={{ height: 8, background: '#F1F5F9' }}>
                  <div className={`progress-fill ${m.pct >= 85 ? 'green' : m.pct >= 75 ? 'amber' : 'red'}`} style={{ width: `${m.pct}%`, borderRadius: 4 }} />
                </div>
              </div>
            ))}

            <div style={{ marginTop: 24, padding: 20, background: '#F8FAFC', borderRadius: 20, border: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                 <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                 <p style={{ fontWeight: 800, fontSize: 13 }}>Compliance Status</p>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                 Your current attendance rate is <strong>above the institutional threshold (75%)</strong>. Maintain this consistency for semester eligibility.
              </p>
              <div style={{ marginTop: 12, height: 6, background: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                 <div style={{ width: '87%', height: '100%', background: '#10B981' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Attendance Log */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ marginTop: 24, borderRadius: 32 }}>
        <div className="card-header" style={{ padding: '24px 32px' }}>
           <h5 style={{ fontWeight: 800 }}>Audit Transaction Log</h5>
           <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Detailed breakdown of last 10 academic sessions</p>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 32 }}>Session Date</th>
                <th>Academic Day</th>
                <th>Institutional Status</th>
                <th style={{ paddingRight: 32 }}>Marked Via</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const statusRaw = getStatusForDate(d);
                const status = statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1);
                const dow = d.getDay();
                return (
                  <tr key={i}>
                    <td style={{ paddingLeft: 32, fontWeight: 700 }}>{d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dow]}</td>
                    <td>
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                         status === 'Present' ? 'bg-emerald-50 text-emerald-700' : 
                         status === 'Absent' ? 'bg-rose-50 text-rose-700' : 
                         status === 'Medical' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'
                       }`}>
                          {status}
                       </span>
                    </td>
                    <td style={{ paddingRight: 32, color: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}>{status === 'Holiday' ? 'Non-Working Day' : 'Institutional Terminal'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

