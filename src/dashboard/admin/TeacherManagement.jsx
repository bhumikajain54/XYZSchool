import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX, FiDownload } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const INIT_TEACHERS = [
  { id: 1, name: 'Priya Sharma', empId: 'TCH-001', subject: 'Mathematics', class: '10-A, 11-B', phone: '9876501001', email: 'priya.s@xyzschool.edu', qualification: 'M.Sc Math', experience: '8 yrs', status: 'Active', salary: '₹55,000' },
  { id: 2, name: 'Ramesh Kumar', empId: 'TCH-002', subject: 'Physics', class: '11-A, 12-B', phone: '9876501002', email: 'ramesh.k@xyzschool.edu', qualification: 'M.Sc Physics', experience: '12 yrs', status: 'Active', salary: '₹65,000' },
  { id: 3, name: 'Sunita Verma', empId: 'TCH-003', subject: 'English', class: '9-B, 10-B', phone: '9876501003', email: 'sunita.v@xyzschool.edu', qualification: 'MA English', experience: '6 yrs', status: 'Active', salary: '₹48,000' },
  { id: 4, name: 'Arjun Nair', empId: 'TCH-004', subject: 'Chemistry', class: '11-B, 12-A', phone: '9876501004', email: 'arjun.n@xyzschool.edu', qualification: 'M.Sc Chem', experience: '9 yrs', status: 'Active', salary: '₹58,000' },
  { id: 5, name: 'Kavitha Reddy', empId: 'TCH-005', subject: 'Biology', class: '11-A, 12-B', phone: '9876501005', email: 'kavitha.r@xyzschool.edu', qualification: 'M.Sc Biology', experience: '5 yrs', status: 'On Leave', salary: '₹50,000' },
  { id: 6, name: 'Deepak Mehra', empId: 'TCH-006', subject: 'History', class: '9-A, 10-A', phone: '9876501006', email: 'deepak.m@xyzschool.edu', qualification: 'MA History', experience: '15 yrs', status: 'Active', salary: '₹70,000' },
];

const EMPTY_FORM = { name: '', empId: '', subject: '', class: '', phone: '', email: '', qualification: '', experience: '', status: 'Active', salary: '' };

const avatarColors = ['#2563EB', '#7C3AED', '#059669', '#D97706', '#DC2626', '#0891B2'];

export default function TeacherManagement() {
  const { addToast } = useApp();
  const [teachers, setTeachers] = useState(INIT_TEACHERS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase()) ||
    t.empId.includes(search)
  );

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); };
  const openEdit = (t) => { setForm({ ...t }); setEditId(t.id); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditId(null); };

  const handleSave = () => {
    if (!form.name || !form.empId) { addToast('error', 'Validation Error', 'Name and Employee ID are required'); return; }
    if (editId) {
      setTeachers(t => t.map(x => x.id === editId ? { ...form, id: editId } : x));
      addToast('success', 'Updated!', `${form.name}'s record updated`);
    } else {
      setTeachers(t => [...t, { ...form, id: Math.max(...t.map(x => x.id)) + 1 }]);
      addToast('success', 'Added!', `${form.name} added to faculty`);
    }
    closeModal();
  };

  const handleDelete = () => {
    const t = teachers.find(x => x.id === deleteId);
    setTeachers(x => x.filter(t => t.id !== deleteId));
    addToast('success', 'Removed', `${t?.name} removed`);
    setDeleteId(null);
  };

  return (
    <div className="page-enter p-3 md:p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex-1">
          <h3 className="section-title !mb-1">Teacher Management</h3>
          <p className="section-subtitle !mb-0">{teachers.length} faculty members active in current session</p>
          
          <div className="search-bar mt-6 max-w-md">
            <FiSearch className="search-icon" />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search by name, subject, or ID..." 
              className="form-input w-full !rounded-xl !border-slate-200" 
            />
          </div>
        </div>

        {/* COMPACT CONTROL CLUSTER (Consistent with Student Management) */}
        <div className="flex flex-col items-stretch sm:items-end gap-3 w-full sm:w-auto">
          {/* Top Dropdown */}
          <div className="w-full sm:w-64">
            <select className="form-select w-full !border-[#5C67ED] !border-2 !rounded-xl !h-[52px] !font-semibold text-slate-700 !bg-white">
              <option value="">All Departments</option>
              <option>Science</option>
              <option>Commerce</option>
              <option>Humanities</option>
            </select>
          </div>

          {/* Middle Row: Status + Export */}
          <div className="flex gap-3 w-full sm:w-[320px]">
            <select className="form-select flex-1 !border-2 !border-slate-100 !rounded-xl !h-[52px] !font-semibold text-slate-700 !bg-white">
              <option value="">Status</option>
              <option>Active</option>
              <option>On Leave</option>
            </select>
            
            <button className="flex-1 btn btn-outline !border-2 !border-[#1E3A8A] !text-[#1E3A8A] !rounded-xl !h-[52px] !font-bold hover:!bg-blue-50 transition-all">
              <FiDownload strokeWidth={2.5} /> Export
            </button>
          </div>

          {/* Bottom Button: Add Teacher */}
          <button 
            className="w-full sm:w-[260px] btn btn-primary !bg-[#1E3A8A] !border-none !rounded-xl !h-[56px] !font-bold !text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            onClick={openAdd}
          >
            <FiPlus size={22} strokeWidth={3} /> Add Teacher
          </button>
        </div>
      </div>


      {/* Teacher Cards */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card"
            style={{ transition: 'all 0.3s ease' }}
          >
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div className="avatar avatar-lg" style={{ background: avatarColors[i % 6] }}>{t.name.charAt(0)}</div>
                  <div>
                    <h5 style={{ marginBottom: 2 }}>{t.name}</h5>
                    <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>{t.empId}</p>
                  </div>
                </div>
                <span className={`badge ${t.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{t.status}</span>
              </div>

              <div className="info-list" style={{ gap: 10 }}>
                <div className="info-list-item"><span className="info-label">Subject</span><span className="info-value">{t.subject}</span></div>
                <div className="info-list-item"><span className="info-label">Classes</span><span className="info-value">{t.class}</span></div>
                <div className="info-list-item"><span className="info-label">Qualification</span><span className="info-value">{t.qualification}</span></div>
                <div className="info-list-item"><span className="info-label">Experience</span><span className="info-value">{t.experience}</span></div>
                <div className="info-list-item"><span className="info-label">Salary</span><span className="info-value" style={{ color: 'var(--accent-success)', fontWeight: 700 }}>{t.salary}</span></div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => openEdit(t)}><FiEdit2 size={13} /> Edit</button>
                <button className="btn btn-danger btn-sm btn-icon" onClick={() => setDeleteId(t.id)}><FiTrash2 size={14} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} className="modal">
              <div className="modal-header">
                <h4>{editId ? 'Edit Teacher' : 'Add New Teacher'}</h4>
                <button className="modal-close" onClick={closeModal}><FiX /></button>
              </div>
              <div className="modal-body">
                <div className="grid-2 gap-x-6 gap-y-4">
                  {[
                    { label: 'Full Name', key: 'name', placeholder: 'Enter full name', required: true },
                    { label: 'Employee ID', key: 'empId', placeholder: 'TCH-XXX', required: true },
                    { label: 'Subject', key: 'subject', placeholder: 'Subject taught' },
                    { label: 'Classes Assigned', key: 'class', placeholder: '10-A, 12-B' },
                    { label: 'Phone', key: 'phone', placeholder: '10-digit number' },
                    { label: 'Email', key: 'email', placeholder: 'teacher@xyzschool.edu' },
                    { label: 'Qualification', key: 'qualification', placeholder: 'Highest qualification' },
                    { label: 'Experience', key: 'experience', placeholder: 'e.g. 12 yrs' },
                    { label: 'Salary', key: 'salary', placeholder: '₹65,000' },
                  ].map(f => (
                    <div key={f.key} className="form-group mb-0">
                      <label className={`form-label ${f.required ? 'required' : ''}`}>{f.label}</label>
                      <input className="form-input" value={form[f.key] || ''} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} />
                    </div>
                  ))}
                  <div className="form-group mb-0">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                      <option>Active</option>
                      <option>On Leave</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
                <button className="btn btn-ghost" style={{ padding: '0 24px' }} onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" style={{ padding: '0 32px' }} onClick={handleSave}>{editId ? 'Save Changes' : 'Add Teacher'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="modal" style={{ maxWidth: 400 }}>
              <div className="modal-header">
                <h4>Confirm Removal</h4>
                <button className="modal-close" onClick={() => setDeleteId(null)}><FiX /></button>
              </div>
              <div className="modal-body">
                <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Remove <strong>{teachers.find(t => t.id === deleteId)?.name}</strong> from the faculty?
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-ghost" onClick={() => setDeleteId(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Remove Teacher</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

