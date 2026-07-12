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
    <div className="page-enter">
      <div className="section-header">
        <div><h3 style={{ fontWeight: 800 }}>Academic Performance</h3><p className="section-subtitle">Yearly Performance Matrix • Session 2024-25</p></div>
        <button 
          className="btn btn-outline btn-sm" 
          style={{ 
            borderRadius: 12, padding: '0 24px', fontWeight: 800, height: 48, 
            display: 'flex', gap: 10, alignItems: 'center',
            background: 'white', color: 'var(--primary)', border: '1px solid var(--border)' 
          }}
          onClick={handleDownload}
          disabled={downloading}
        >
           {downloading ? 'Processing...' : <><FiDownload /> Download Report Card</>}
        </button>
      </div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1D4ED8, #2563EB)',
          borderRadius: 'var(--radius-lg)',
          padding: 28,
          marginBottom: 24,
          color: 'white',
          display: 'flex',
          gap: 40,
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'Poppins' }}>{overallPct}%</div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Overall Score</p>
        </div>
        <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.2)' }} />
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Poppins' }}>A</div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Overall Grade</p>
        </div>
        <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.2)' }} />
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Poppins' }}>{totalMarks}/{maxMarks}</div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Total Marks</p>
        </div>
        <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.2)' }} />
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Poppins' }}>12</div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Class Rank</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
        <div className="card-header"><h5>Subject-wise Results</h5></div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Teacher</th>
                <th>UT-1 (50)</th>
                <th>UT-2 (50)</th>
                <th>Mid-Term (100)</th>
                <th>Final (100)</th>
                <th>Total (300)</th>
                <th>%</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => {
                const pct = Math.round(r.total / r.max * 100);
                return (
                  <motion.tr key={r.subject} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}>
                    <td style={{ fontWeight: 700 }}>{r.subject}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.teacher}</td>
                    <td>{r.ut1}</td>
                    <td>{r.ut2}</td>
                    <td>{r.midterm}</td>
                    <td>{r.final}</td>
                    <td style={{ fontWeight: 700 }}>{r.total}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 60 }}>
                          <div className={`progress-fill ${pct >= 80 ? 'green' : pct >= 60 ? 'blue' : 'amber'}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 13 }}>{pct}%</span>
                      </div>
                    </td>
                    <td><span className={`badge ${gradeColors[r.grade]}`}>{r.grade}</span></td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="card-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: 24, fontSize: 14 }}>
          <span>Total: <strong>{totalMarks}/{maxMarks}</strong></span>
          <span>Overall: <strong style={{ color: 'var(--primary)' }}>{overallPct}%</strong></span>
          <span>Grade: <strong style={{ color: 'var(--accent-success)' }}>A</strong></span>
        </div>
      </motion.div>
    </div>
  );
}

