import React, { useState } from 'react';
import { FiPlus, FiCalendar, FiClock, FiMapPin, FiCheck, FiX, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const INIT_EXAMS = [
  { id: 1, subject: 'Mathematics Unit Test', class: '10-A', date: '2025-05-10', start: '09:00', end: '11:00', room: 'Hall A', status: 'Upcoming' },
  { id: 2, subject: 'Algebra Midterm', class: '11-B', date: '2025-05-12', start: '10:00', end: '13:00', room: 'R-205', status: 'Upcoming' },
  { id: 3, subject: 'Geometry Quiz', class: '09-A', date: '2025-05-05', start: '08:30', end: '09:30', room: 'Lab-1', status: 'Completed' },
];

export default function ExamScheduleCreator() {
  const { addToast } = useApp();
  const [exams, setExams] = useState(INIT_EXAMS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ subject: '', class: '10-A', date: '', start: '', end: '', room: '' });

  const handleCreate = () => {
    if (!form.subject || !form.date) {
      addToast('error', 'Error', 'Subject and Date are required');
      return;
    }
    setExams([...exams, { ...form, id: Date.now(), status: 'Upcoming' }]);
    addToast('success', 'Exam Scheduled', `${form.subject} for ${form.class} is now scheduled.`);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setExams(exams.filter(e => e.id !== id));
    addToast('success', 'Exam Deleted', 'Exam removed from schedule');
  };

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h3>Test Scheduling</h3>
          <p className="section-subtitle">Create and manage upcoming tests for your students</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => { setForm({ subject: '', class: '10-A', date: '', start: '', end: '', room: '' }); setShowModal(true); }}>
          <FiPlus /> Create New Test
        </button>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
          <div className="kpi-card blue">
              <div className="kpi-icon blue"><FiCalendar /></div>
              <div className="kpi-value">{exams.filter(e => e.status === 'Upcoming').length}</div>
              <div className="kpi-label">Upcoming Tests</div>
          </div>
          <div className="kpi-card green">
              <div className="kpi-icon green"><FiCheck /></div>
              <div className="kpi-value">{exams.filter(e => e.status === 'Completed').length}</div>
              <div className="kpi-label">Completed This Term</div>
          </div>
          <div className="kpi-card amber">
              <div className="kpi-icon amber"><FiClock /></div>
              <div className="kpi-value">12h</div>
              <div className="kpi-label">Total Test Hours</div>
          </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>My Test Schedule</h5>
          <div className="search-bar" style={{ maxWidth: 300 }}>
             <FiSearch className="search-icon" />
             <input placeholder="Filter by subject or class..." />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Class</th>
                <th>Date</th>
                <th>Time (Start-End)</th>
                <th>Room / Venue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((e, index) => (
                <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}>
                  <td><strong>{e.subject}</strong></td>
                  <td><span className="badge badge-info">{e.class}</span></td>
                  <td>{e.date}</td>
                  <td>{e.start} – {e.end}</td>
                  <td>{e.room}</td>
                  <td>
                    <span className={`badge ${e.status === 'Completed' ? 'badge-success' : 'badge-primary'}`}>
                      {e.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-outline btn-sm btn-icon" title="Edit Test" onClick={() => { setForm(e); setShowModal(true); }}><FiEdit2 size={13} /></button>
                      <button className="btn btn-danger btn-sm btn-icon" title="Delete Test" onClick={() => handleDelete(e.id)}><FiTrash2 size={13} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <motion.div className="modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
                <div className="modal-header">
                   <h4>{form.id ? 'Edit Test Schedule' : 'Schedule New Test'}</h4>
                   <button className="modal-close" onClick={() => setShowModal(false)}><FiX /></button>
                </div>
                <div className="modal-body">
                   <div className="form-group">
                      <label className="form-label required">Subject / Test Title</label>
                      <input className="form-input" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="e.g. Unit Test - Calculus" />
                   </div>
                   <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Class</label>
                        <select className="form-select" value={form.class} onChange={e => setForm({...form, class: e.target.value})}>
                           <option>10-A</option>
                           <option>11-B</option>
                           <option>12-A</option>
                           <option>09-B</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label required">Test Date</label>
                        <input className="form-input" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                      </div>
                   </div>
                   <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Start Time</label>
                        <input className="form-input" type="time" value={form.start} onChange={e => setForm({...form, start: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">End Time</label>
                        <input className="form-input" type="time" value={form.end} onChange={e => setForm({...form, end: e.target.value})} />
                      </div>
                   </div>
                   <div className="form-group">
                      <label className="form-label">Venue / Room No.</label>
                      <input className="form-input" value={form.room} onChange={e => setForm({...form, room: e.target.value})} placeholder="e.g. Hall B" />
                   </div>
                </div>
                <div className="modal-footer">
                   <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                   <button className="btn btn-primary" onClick={handleCreate}>{form.id ? 'Update Test' : 'Create Test'}</button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
