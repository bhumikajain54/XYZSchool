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
    <div className="page-enter">
      <div className="section-header">
        <div><h3 style={{ fontWeight: 800 }}>My Timetable</h3><p className="section-subtitle">Weekly Schedule — Class 10-A</p></div>
        <button 
          className="btn btn-outline" 
          style={{ background: 'white', color: 'var(--primary)', border: '1px solid var(--border)', borderRadius: 16, height: 48, padding: '0 24px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}
          onClick={handleDownload}
        >
           <FiDownload /> Download PDF
        </button>
      </div>

      {/* Today's classes highlight */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ marginBottom: 24, background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
        <div className="card-body" style={{ padding: '16px 20px' }}>
          <p style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 12 }}>📅 Today's Classes ({today})</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {(timetableData[today] || []).map((s, i) => s !== '-' && (
              <div key={i} style={{ background: subjectColors[s], color: subjectTextColors[s], padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: 13, fontWeight: 600, border: `1px solid ${subjectTextColors[s]}30` }}>
                {PERIODS[i].split('-')[0]} {s}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Full timetable */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
        <div className="card-header"><h5>Weekly Schedule</h5></div>
        <div style={{ overflowX: 'auto' }}>
          <table className="timetable" style={{ minWidth: 700 }}>
            <thead>
              <tr>
                <th>Period</th>
                {DAYS_OF_WEEK.map(d => (
                  <th key={d} style={{ background: d === today ? 'var(--primary)' : undefined, color: d === today ? 'white' : undefined }}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERIODS.map((p, pi) => (
                <tr key={p}>
                  <td style={{ fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap', background: 'var(--secondary)' }}>{p}</td>
                  {DAYS_OF_WEEK.map(d => {
                    const subj = timetableData[d]?.[pi] || '-';
                    const isBreak = subj === '🍽 Lunch';
                    return (
                      <td key={d} style={{
                        background: subjectColors[subj] || 'transparent',
                        color: subjectTextColors[subj] || 'var(--text-muted)',
                        fontWeight: isBreak ? 700 : 600,
                        textAlign: 'center',
                        borderLeft: d === today ? '2px solid var(--primary)' : undefined,
                      }}>
                        <div style={{ fontSize: 13 }}>{subj}</div>
                        {teachers[subj] && <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{teachers[subj]}</div>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

