import React, { useState } from 'react';
import { FiPlus, FiGrid, FiBookOpen, FiUser, FiSettings, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const INIT_CLASSES = [
  { id: 1, name: '10-A', section: 'Science', strength: 45, room: 'Room 101', teacher: 'Mrs. S. Sharma' },
  { id: 2, name: '10-B', section: 'Commerce', strength: 42, room: 'Room 102', teacher: 'Mr. R. Verma' },
  { id: 3, name: '11-B', section: 'Arts', strength: 38, room: 'Room 205', teacher: 'Ms. K. Singh' },
];

const INIT_SUBJECTS = [
  { id: 1, name: 'Mathematics', code: 'MATH-101', dept: 'Science', type: 'Main' },
  { id: 2, name: 'Physics', code: 'PHYS-102', dept: 'Science', type: 'Main' },
  { id: 3, name: 'History of India', code: 'HIST-202', dept: 'Arts', type: 'Elective' },
  { id: 4, name: 'Accounting', code: 'ACC-301', dept: 'Commerce', type: 'Core' },
];

const EMPTY_CLASS = { name: '', section: 'Science', strength: 30, room: '', teacher: 'Mrs. S. Sharma' };
const EMPTY_SUBJECT = { name: '', code: '', dept: 'Science', type: 'Main' };

export default function AcademicSettings() {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('classes');
  const [classes, setClasses] = useState(INIT_CLASSES);
  const [subjects, setSubjects] = useState(INIT_SUBJECTS);
  
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  const openAdd = () => {
    setForm(activeTab === 'classes' ? { ...EMPTY_CLASS } : { ...EMPTY_SUBJECT });
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setForm({ ...item });
    setEditId(item.id);
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditId(null); };

  const handleSave = () => {
    if (!form.name) {
      addToast('error', 'Error', 'Title/Name is required');
      return;
    }

    if (activeTab === 'classes') {
      if (editId) {
        setClasses(list => list.map(c => c.id === editId ? { ...form, id: editId } : c));
        addToast('success', 'Updated', 'Class configuration updated');
      } else {
        const newId = Math.max(...classes.map(c => c.id), 0) + 1;
        setClasses(list => [...list, { ...form, id: newId }]);
        addToast('success', 'Created', 'New class registered');
      }
    } else {
      if (editId) {
        setSubjects(list => list.map(s => s.id === editId ? { ...form, id: editId } : s));
        addToast('success', 'Updated', 'Subject curriculum updated');
      } else {
        const newId = Math.max(...subjects.map(s => s.id), 0) + 1;
        setSubjects(list => [...list, { ...form, id: newId }]);
        addToast('success', 'Created', 'New subject added');
      }
    }
    closeModal();
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter(c => c.id !== id));
    addToast('success', 'Deleted', 'Class configuration removed');
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
    addToast('success', 'Deleted', 'Subject Master removed');
  };

  return (
    <div className="page-enter">
      <div className="section-header" style={{ flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3>Academic Settings</h3>
          <p className="section-subtitle">Manage school classes, sections, and subject curriculum</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={openAdd}>
           <FiPlus /> {activeTab === 'classes' ? 'Add New Class' : 'Add New Subject'}
        </button>
      </div>

      <div className="grid-3 mb-24">
          <div className="kpi-card blue">
             <div className="kpi-icon blue"><FiGrid /></div>
             <div className="kpi-value">{classes.length}</div>
             <div className="kpi-label">Active Classes</div>
          </div>
          <div className="kpi-card purple">
             <div className="kpi-icon purple"><FiBookOpen /></div>
             <div className="kpi-value">{subjects.length}</div>
             <div className="kpi-label">Total Subjects</div>
          </div>
          <div className="kpi-card amber">
             <div className="kpi-icon amber"><FiSettings /></div>
             <div className="kpi-value">2024-25</div>
             <div className="kpi-label">Current Academic Session</div>
          </div>
      </div>

      <div className="tabs mb-24">
          <button className={`tab-btn ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => setActiveTab('classes')}>Class Management</button>
          <button className={`tab-btn ${activeTab === 'subjects' ? 'active' : ''}`} onClick={() => setActiveTab('subjects')}>Subject Master</button>
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {activeTab === 'classes' ? (
          <div className="card">
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Class Name</th>
                    <th>Section / Stream</th>
                    <th>Strength</th>
                    <th>Room Venue</th>
                    <th>Class Teacher</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((c, i) => (
                    <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                      <td><strong>{c.name}</strong></td>
                      <td><span className="badge badge-gray">{c.section}</span></td>
                      <td>{c.strength} Students</td>
                      <td>{c.room}</td>
                      <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div className="avatar avatar-sm" style={{ background: 'var(--primary-50)', color: 'var(--primary)' }}>{c.teacher.split(' ').pop().charAt(0)}</div>{c.teacher}</div></td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                           <button className="btn btn-outline btn-sm btn-icon" onClick={() => openEdit(c)} title="Edit"><FiEdit2 size={13} /></button>
                           <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDeleteClass(c.id)} title="Delete"><FiTrash2 size={13} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card">
             <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Subject Name</th>
                    <th>Sub. Code</th>
                    <th>Department</th>
                    <th>Credit Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((s, i) => (
                    <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                      <td><strong>{s.name}</strong></td>
                      <td><code>{s.code}</code></td>
                      <td>{s.dept}</td>
                      <td><span className={`badge ${s.type === 'Main' ? 'badge-primary' : 'badge-info'}`}>{s.type}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                           <button className="btn btn-outline btn-sm btn-icon" onClick={() => openEdit(s)} title="Edit"><FiEdit2 size={13} /></button>
                           <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDeleteSubject(s.id)} title="Delete"><FiTrash2 size={13} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <motion.div className="modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
                <div className="modal-header">
                   <h4>{editId ? (activeTab === 'classes' ? 'Edit Class' : 'Edit Subject') : (activeTab === 'classes' ? 'New Class' : 'New Subject')}</h4>
                   <button className="modal-close" onClick={closeModal}><FiX /></button>
                </div>
                <div className="modal-body">
                   <div className="form-group">
                      <label className="form-label required">{activeTab === 'classes' ? 'Class Name' : 'Subject Title'}</label>
                      <input className="form-input" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={activeTab === 'classes' ? 'e.g. 10-C' : 'e.g. Political Science'} />
                   </div>
                   <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">{activeTab === 'classes' ? 'Section/Stream' : 'Department'}</label>
                        <select className="form-select" value={activeTab === 'classes' ? form.section : form.dept} onChange={e => setForm({ ...form, [activeTab === 'classes' ? 'section' : 'dept']: e.target.value })}>
                          <option>Science</option>
                          <option>Commerce</option>
                          <option>Arts</option>
                          <option>Humanities</option>
                          <option>English</option>
                          <option>Mathematics</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">{activeTab === 'classes' ? 'Assigned Room' : 'Subject Code'}</label>
                        <input className="form-input" value={activeTab === 'classes' ? form.room : form.code} onChange={e => setForm({ ...form, [activeTab === 'classes' ? 'room' : 'code']: e.target.value })} placeholder={activeTab === 'classes' ? 'e.g. Room 305' : 'e.g. SUB-102'} />
                      </div>
                   </div>
                   {activeTab === 'classes' ? (
                     <div className="grid-2">
                        <div className="form-group">
                           <label className="form-label">Min. Strength</label>
                           <input className="form-input" type="number" value={form.strength || 30} onChange={e => setForm({ ...form, strength: parseInt(e.target.value) })} />
                        </div>
                        <div className="form-group">
                           <label className="form-label">Class Teacher</label>
                           <select className="form-select" value={form.teacher} onChange={e => setForm({ ...form, teacher: e.target.value })}>
                              <option>Mrs. S. Sharma</option>
                              <option>Mr. R. Verma</option>
                              <option>Ms. K. Singh</option>
                              <option>Dr. A. Gupta</option>
                           </select>
                        </div>
                     </div>
                   ) : (
                     <div className="form-group">
                        <label className="form-label">Subject Type</label>
                        <select className="form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                           <option>Main</option>
                           <option>Elective</option>
                           <option>Core</option>
                           <option>Lab</option>
                        </select>
                     </div>
                   )}
                </div>
                <div className="modal-footer">
                   <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                   <button className="btn btn-primary" onClick={handleSave}>
                      <FiSave /> {editId ? 'Save Changes' : 'Create Entry'}
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
