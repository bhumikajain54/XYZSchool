import React, { useState } from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiUser, FiX, FiCheck } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const INIT_CLASSES = [
  { id: 1, name: '10-A', room: 'R-101', students: 42, teacher: 'Priya Sharma', dept: 'Mathematics', status: 'Full', assignedStudents: [] },
  { id: 2, name: '11-B', room: 'R-205', students: 38, teacher: 'Ramesh Kumar', dept: 'Physics', status: 'Active', assignedStudents: [] },
  { id: 3, name: '12-A', room: 'R-301', students: 35, teacher: 'Arjun Nair', dept: 'Chemistry', status: 'Active', assignedStudents: [] },
  { id: 4, name: '9-B', room: 'R-105', students: 45, teacher: 'Sunita Verma', dept: 'Languages', status: 'Active', assignedStudents: [] },
  { id: 5, name: '8-C', room: 'R-002', students: 30, teacher: 'Deepak Mehra', dept: 'Social Studies', status: 'New', assignedStudents: [] },
];

const ALL_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', rollNo: 'VS-001' },
  { id: 2, name: 'Diya Patel', rollNo: 'VS-002' },
  { id: 3, name: 'Rohan Verma', rollNo: 'VS-003' },
  { id: 4, name: 'Ananya Reddy', rollNo: 'VS-004' },
  { id: 5, name: 'Vikram Singh', rollNo: 'VS-005' },
  { id: 6, name: 'Priya Nair', rollNo: 'VS-006' },
  { id: 7, name: 'Arjun Mehta', rollNo: 'VS-007' },
  { id: 8, name: 'Sneha Gupta', rollNo: 'VS-008' },
];

const TEACHERS = ['Priya Sharma', 'Ramesh Kumar', 'Sunita Verma', 'Arjun Nair', 'Kavitha Reddy', 'Deepak Mehra'];
const EMPTY_FORM = { name: '', room: '', teacher: TEACHERS[0] };

export default function ClassSection() {
  const { addToast } = useApp();
  const [classList, setClassList] = useState(INIT_CLASSES);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);
  const [assignModal, setAssignModal] = useState(false);
  const [assignTarget, setAssignTarget] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState('');

  const filtered = classList.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.teacher.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); };
  const openEdit = (c) => { setForm({ name: c.name, room: c.room, teacher: c.teacher }); setEditId(c.id); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditId(null); };

  const handleSave = () => {
    if (!form.name || !form.room) { addToast('error', 'Error', 'Class name and Room No. are required'); return; }
    if (editId) {
      setClassList(list => list.map(c => c.id === editId ? { ...c, ...form } : c));
      addToast('success', 'Updated', `Class ${form.name} updated`);
    } else {
      const newId = Math.max(...classList.map(c => c.id)) + 1;
      setClassList(list => [...list, { ...form, id: newId, students: 0, dept: 'Unassigned', status: 'New', assignedStudents: [] }]);
      addToast('success', 'Class Created', `Class ${form.name} created`);
    }
    closeModal();
  };

  const handleDelete = () => {
    const c = classList.find(x => x.id === deleteId);
    setClassList(list => list.filter(c => c.id !== deleteId));
    addToast('success', 'Removed', `Class ${c?.name} removed`);
    setDeleteId(null);
  };

  const openAssign = (c) => {
    setAssignTarget(c);
    setSelectedStudents([...c.assignedStudents]);
    setStudentSearch('');
    setAssignModal(true);
  };

  const toggleStudent = (id) =>
    setSelectedStudents(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleAssign = () => {
    setClassList(list => list.map(c =>
      c.id === assignTarget.id ? { ...c, assignedStudents: selectedStudents } : c
    ));
    addToast('success', 'Students Assigned', `${selectedStudents.length} student(s) assigned to ${assignTarget.name}`);
    setAssignModal(false);
  };

  const filteredStudents = ALL_STUDENTS.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="page-enter">
      <div className="section-header" style={{ flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3>Class &amp; Section</h3>
          <p className="section-subtitle">Manage class schedules and teacher assignments</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="search-bar" style={{ minWidth: 220 }}>
            <FiSearch className="search-icon" />
            <input placeholder="Search by class or teacher..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-primary btn-sm" onClick={openAdd}><FiPlus /> Create Class</button>
        </div>
      </div>

      <div className="grid-3">
        {filtered.map((c, i) => (
          <motion.div key={c.id} className="card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="card-header" style={{ paddingBottom: 0, borderBottom: 'none' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, background: 'var(--primary-50)', color: 'var(--primary)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800 }}>{c.name}</div>
                <div>
                  <h5 style={{ marginBottom: 2 }}>Room {c.room}</h5>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Status: <span className="badge badge-info">{c.status}</span></p>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="info-list">
                <div className="info-list-item"><span className="info-label">Class Teacher</span><span className="info-value">{c.teacher}</span></div>
                <div className="info-list-item"><span className="info-label">Total Students</span><span className="info-value">{c.students}</span></div>
                <div className="info-list-item"><span className="info-label">Department</span><span className="info-value">{c.dept}</span></div>
                {c.assignedStudents.length > 0 && (
                  <div className="info-list-item"><span className="info-label">Assigned</span><span className="info-value" style={{ color: 'var(--accent-success)', fontWeight: 700 }}>{c.assignedStudents.length} student(s)</span></div>
                )}
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => openAssign(c)}><FiUser size={13} /> Assign Students</button>
                <button className="btn btn-outline btn-sm btn-icon" onClick={() => openEdit(c)} title="Edit"><FiEdit2 size={13} /></button>
                <button className="btn btn-danger btn-sm btn-icon" onClick={() => setDeleteId(c.id)} title="Delete"><FiTrash2 size={14} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="modal-header">
                <h4>{editId ? 'Edit Class' : 'Create New Class'}</h4>
                <button className="modal-close" onClick={closeModal}><FiX /></button>
              </div>
              <div className="modal-body">
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label required">Class Name</label>
                    <input className="form-input" placeholder="e.g., 10-A" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label required">Room Number</label>
                    <input className="form-input" placeholder="e.g., R-105" value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Assign Class Teacher</label>
                  <select className="form-select" value={form.teacher} onChange={e => setForm({ ...form, teacher: e.target.value })}>
                    {TEACHERS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>{editId ? 'Save Changes' : 'Create & Assign'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assign Students Modal */}
      <AnimatePresence>
        {assignModal && assignTarget && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} style={{ maxWidth: 480 }}>
              <div className="modal-header">
                <h4>Assign Students — Class {assignTarget.name}</h4>
                <button className="modal-close" onClick={() => setAssignModal(false)}><FiX /></button>
              </div>
              <div className="modal-body">
                <div className="search-bar" style={{ marginBottom: 14 }}>
                  <FiSearch className="search-icon" />
                  <input placeholder="Search students..." value={studentSearch} onChange={e => setStudentSearch(e.target.value)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 280, overflowY: 'auto' }}>
                  {filteredStudents.map(s => (
                    <div
                      key={s.id}
                      onClick={() => toggleStudent(s.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 14px', borderRadius: 8, cursor: 'pointer',
                        border: `1.5px solid ${selectedStudents.includes(s.id) ? 'var(--primary)' : 'var(--border)'}`,
                        background: selectedStudents.includes(s.id) ? 'var(--primary-50)' : 'white',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{
                        width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                        border: `2px solid ${selectedStudents.includes(s.id) ? 'var(--primary)' : 'var(--border)'}`,
                        background: selectedStudents.includes(s.id) ? 'var(--primary)' : 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {selectedStudents.includes(s.id) && <FiCheck size={12} color="white" />}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</p>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.rollNo}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10 }}>{selectedStudents.length} student(s) selected</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-ghost" onClick={() => setAssignModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAssign}>Assign {selectedStudents.length > 0 ? `(${selectedStudents.length})` : ''} Students</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} style={{ maxWidth: 400 }}>
              <div className="modal-header">
                <h4>Remove Class</h4>
                <button className="modal-close" onClick={() => setDeleteId(null)}><FiX /></button>
              </div>
              <div className="modal-body">
                <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
                  <p style={{ color: 'var(--text-secondary)' }}>Remove class <strong>{classList.find(c => c.id === deleteId)?.name}</strong>? This cannot be undone.</p>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-ghost" onClick={() => setDeleteId(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Remove Class</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
