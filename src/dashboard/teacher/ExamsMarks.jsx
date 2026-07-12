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
    <div className="page-enter">
      <div className="section-header">
        <div>
           <h3>Assessment Center</h3>
           <p className="section-subtitle">Manage student grades and exam performance</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline btn-sm" onClick={() => setShowBulkUpload(true)} disabled={finalizing}><FiUpload size={13} /> Bulk Upload (CSV)</button>
          <button 
            className={`btn btn-primary btn-sm ${finalizing ? 'btn-loading' : ''}`} 
            onClick={handleFinalize}
            disabled={finalizing}
            style={{ minWidth: 120 }}
          >
            {finalizing ? 'Syncing...' : <><FiCheckCircle size={13} /> Finalize All</>}
          </button>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
          <div className="kpi-card blue">
              <div className="kpi-value">{classAvg}%</div>
              <div className="kpi-label">Class Average Score</div>
          </div>
          <div className="kpi-card purple">
              <div className="kpi-value">{highest}%</div>
              <div className="kpi-label">Class Top Performer</div>
          </div>
          <div className="kpi-card green">
              <div className="kpi-value">{Math.round(students.filter(s => s.scored >= 40).length / (students.length || 1) * 100)}%</div>
              <div className="kpi-label">Passing Consistency</div>
          </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
             <label style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>ACTIVE EXAM:</label>
             <select className="form-select" value={selectedExam} onChange={e => setSelectedExam(e.target.value)} style={{ minWidth: 280 }}>
                {Object.keys(marksData).map(e => <option key={e}>{e}</option>)}
             </select>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => addToast('info', 'Report Generated', 'Report has been downloaded.')}><FiDownload /> Download Report</button>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Max Marks</th>
                <th>Scored</th>
                <th>Performance (%)</th>
                <th>Final Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => {
                const pct = Math.round(s.scored / s.max * 100);
                const { grade, color } = getGrade(pct);
                return (
                  <motion.tr key={s.rollNo} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                    <td><strong style={{ color: 'var(--primary)' }}>{s.rollNo}</strong></td>
                    <td>{s.name}</td>
                    <td>{s.max}</td>
                    <td>
                       <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: 8, display: 'inline-block', minWidth: 60, textAlign: 'center', border: '1px solid #e2e8f0', fontWeight: 700 }}>
                         {s.scored}
                       </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 13 }}>{pct}%</span>
                    </td>
                    <td><span className={`badge ${color}`}>{grade}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button 
                           className="btn btn-outline btn-sm btn-icon" 
                           onClick={() => setEditingId(s.rollNo)} 
                           style={{ width: 34, height: 34, borderRadius: 8, border: '1.5px solid var(--primary)', color: 'var(--primary)' }}
                           title="Detailed Edit"
                          >
                            <FiEdit2 size={13} />
                          </button>
                        <button 
                           className="btn btn-primary btn-sm btn-icon" 
                           onClick={() => handleDelete(s.rollNo)} 
                           style={{ width: 34, height: 34, borderRadius: 8, background: '#ef4444', borderColor: '#ef4444', boxShadow: '0 4px 10px rgba(239,68,68,0.2)' }}
                           title="Delete Record"
                          >
                            <FiTrash2 size={13} color="white" />
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
           <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingId(null)}>
              <motion.div className="modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
                 <div className="modal-header">
                    <h4 style={{ fontWeight: 800 }}>Edit Marks: {editStudent.rollNo}</h4>
                    <button className="modal-close" onClick={() => setEditingId(null)}>×</button>
                 </div>
                 <div className="modal-body" style={{ padding: '0 32px 32px' }}>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Updating scores for <strong>{editStudent.name}</strong></p>
                    <div style={{ marginBottom: 20 }}>
                       <label className="form-label" style={{ fontWeight: 700 }}>Scored Marks</label>
                       <input 
                         type="number" 
                         className="form-input" 
                         value={editStudent.scored} 
                         onChange={e => handleMarkChange(editStudent.rollNo, e.target.value)}
                         style={{ borderRadius: 12 }} 
                       />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                       <label className="form-label" style={{ fontWeight: 700 }}>Max Marks (Out of)</label>
                       <input 
                         type="number" 
                         className="form-input" 
                         value={editStudent.max} 
                         onChange={e => handleMaxChange(editStudent.rollNo, e.target.value)}
                         style={{ borderRadius: 12, background: '#f8fafc' }} 
                       />
                    </div>
                 </div>
                 <div className="modal-footer" style={{ borderTop: '1px solid #f1f5f9', padding: 24 }}>
                    <button className="btn btn-ghost" onClick={() => setEditingId(null)}>Done</button>
                    <button className="btn btn-primary" style={{ fontWeight: 800, padding: '10px 24px', borderRadius: 12 }} onClick={() => { addToast('success', 'Saved', 'Student score updated successfully.'); setEditingId(null); }}>Save Changes</button>
                 </div>
              </motion.div>
           </motion.div>
         )}

        {showBulkUpload && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <motion.div className="modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} style={{ maxWidth: 450 }}>
                <div className="modal-header">
                   <h4>Bulk Marks Import</h4>
                   <button className="modal-close" onClick={() => setShowBulkUpload(false)}>×</button>
                </div>
                 <div className="modal-body" style={{ textAlign: 'center', padding: '40px 24px' }}>
                    <div style={{ fontSize: 56, marginBottom: 24, color: 'var(--primary)', opacity: importing ? 0.5 : 1 }}>📄</div>
                    <h5 style={{ marginBottom: 12 }}>{importing ? 'Processing Data...' : 'Drag & Drop CSV File'}</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
                      {selectedFile ? `Selected: ${selectedFile.name}` : 'Make sure your file matches the template (Roll No, Name, Marks). Max file size: 5MB.'}
                    </p>
                    <div 
                      style={{ border: '2px dashed var(--primary)', borderRadius: 16, padding: '32px', background: 'var(--primary-50)', opacity: importing ? 0.3 : 1, transition: 'all 0.3s ease' }}
                    >
                       <label style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>
                          {selectedFile ? 'Change File' : 'Browse Files'}
                          <input 
                            type="file" 
                            accept=".csv" 
                            style={{ display: 'none' }} 
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            disabled={importing}
                          />
                       </label>
                    </div>
                 </div>
                 <div className="modal-footer" style={{ borderTop: 'none', padding: '0 24px 32px', gap: 12 }}>
                    {!importing && <button className="btn btn-ghost btn-full" onClick={() => { setShowBulkUpload(false); setSelectedFile(null); }}>Cancel</button>}
                    <button 
                      className={`btn btn-primary btn-full ${importing ? 'btn-loading' : ''}`} 
                      disabled={!selectedFile || importing}
                      onClick={() => {
                        setImporting(true);
                        setTimeout(() => {
                           addToast('success', 'Import Successful', `Successfully processed ${selectedFile.name}`);
                           setImporting(false);
                           setSelectedFile(null);
                           setShowBulkUpload(false);
                        }, 2000);
                      }}
                    >
                      {importing ? 'Importing...' : 'Start Import'}
                    </button>
                 </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
