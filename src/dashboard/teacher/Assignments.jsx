import React, { useState } from 'react';
import { FiPlus, FiUpload, FiEdit2, FiTrash2, FiX, FiPaperclip, FiClock } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const INIT_ASSIGNMENTS = [
  { id: 1, title: 'Trigonometry Worksheet', class: '10-A', subject: 'Mathematics', dueDate: '2025-04-05', submitted: 32, total: 42, status: 'Active', desc: 'Solve all problems from Chapter 8, Exercises 8.1 to 8.4.' },
  { id: 2, title: 'Calculus Monthly Test', class: '12-A', subject: 'Calculus', dueDate: '2025-04-08', submitted: 18, total: 38, status: 'Active', desc: 'Topics: Derivatives, Integration basics, Limits.' },
  { id: 3, title: 'Statistics Project', class: '11-B', subject: 'Statistics', dueDate: '2025-03-28', submitted: 40, total: 43, status: 'Completed', desc: 'Collect real-world data and create frequency distribution tables.' },
  { id: 4, title: 'Algebraic Expressions', class: '9-A', subject: 'Mathematics', dueDate: '2025-04-10', submitted: 5, total: 45, status: 'Active', desc: 'Simplify algebraic expressions using factorization methods.' },
];

const EMPTY_FORM = { title: '', class: '', subject: '', dueDate: '', desc: '' };
const CLASSES = ['9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];

export default function Assignments() {
  const { addToast } = useApp();
  const [assignments, setAssignments] = useState(INIT_ASSIGNMENTS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? assignments : assignments.filter(a => a.status === filter);

  const handleSave = () => {
    if (!form.title || !form.class || !form.dueDate) { addToast('error', 'Error', 'Title, Class and Due Date are required'); return; }
    const max = assignments.reduce((m, a) => Math.max(m, a.id), 0);
    setAssignments(a => [...a, { ...form, id: max + 1, submitted: 0, total: 40, status: 'Active' }]);
    addToast('success', 'Published!', `${form.title} assigned to ${form.class}`);
    setShowModal(false);
    setForm(EMPTY_FORM);
  };

  const handleDelete = (id) => {
    setAssignments(a => a.filter(x => x.id !== id));
    addToast('success', 'Deleted', 'Assignment removed');
  };

  return (
    <div className="page-enter">
      <div className="section-header">
        <div><h3>Assignments</h3><p className="section-subtitle">Create and manage class assignments</p></div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}><FiPlus /> New Assignment</button>
      </div>

      <div className="tabs" style={{ marginBottom: 20 }}>
        {['All', 'Active', 'Completed'].map(t => (
          <button key={t} className={`tab-btn ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="card">
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                    <h5>{a.title}</h5>
                    <span className={`badge ${a.status === 'Active' ? 'badge-primary' : 'badge-gray'}`}>{a.status}</span>
                    <span className="badge badge-info">Class {a.class}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{a.desc}</p>
                  <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiClock size={12} /> Due: {a.dueDate}</span>
                    <span>📚 {a.subject}</span>
                    <span>📝 {a.submitted}/{a.total} submitted</span>
                  </div>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ textAlign: 'right', marginBottom: 12 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Poppins', color: 'var(--primary)' }}>
                      {Math.round(a.submitted / a.total * 100)}%
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Submission Rate</p>
                  </div>
                  <div className="progress-bar" style={{ width: 120 }}>
                    <div className="progress-fill blue" style={{ width: `${Math.round(a.submitted / a.total * 100)}%` }} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                <button className="btn btn-outline btn-sm" onClick={() => { setForm(a); setShowModal(true); }}><FiEdit2 size={13} /> Edit</button>
                <button className="btn btn-ghost btn-sm" onClick={() => document.getElementById('material-upload-input').click()}><FiUpload size={13} /> Upload Materials</button>
                <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDelete(a.id)}><FiTrash2 size={14} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} className="modal">
              <div className="modal-header">
                <h4>New Assignment</h4>
                <button className="modal-close" onClick={() => setShowModal(false)}><FiX /></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label required">Assignment Title</label>
                  <input className="form-input" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Assignment title" />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label required">Class</label>
                    <select className="form-select" value={form.class} onChange={e => setForm(p => ({ ...p, class: e.target.value }))}>
                      <option value="">Select Class</option>
                      {CLASSES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input className="form-input" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="Subject" />
                  </div>
                  <div className="form-group">
                    <label className="form-label required">Due Date</label>
                    <input className="form-input" type="date" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Instructions</label>
                  <textarea className="form-input" rows={4} value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} placeholder="Detailed instructions for students..." style={{ resize: 'vertical' }} />
                </div>
                <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius)', padding: 24, textAlign: 'center', cursor: 'pointer' }}>
                  <FiPaperclip style={{ fontSize: 24, color: 'var(--text-muted)', marginBottom: 8 }} />
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Drag & drop files or <span style={{ color: 'var(--primary)', fontWeight: 600 }}>browse</span></p>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Publish Assignment</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <input 
        id="material-upload-input" 
        type="file" 
        style={{ display: 'none' }} 
        onChange={(e) => {
          if (e.target.files.length) {
            addToast('success', 'Upload Success', 'Materials uploaded: ' + e.target.files[0].name);
          }
        }}
      />
    </div>
  );
}
