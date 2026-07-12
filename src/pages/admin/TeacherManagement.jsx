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
    <div className="page-enter py-4 sm:py-6 space-y-6">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Teacher Management</h3>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">{teachers.length} faculty members</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <div className="relative group flex-1 sm:min-w-[280px]">
             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
             <input 
               value={search} 
               onChange={e => setSearch(e.target.value)} 
               placeholder="Search by name, subject, or ID..." 
               className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all outline-none"
             />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex-1 sm:flex-initial px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2">
              <FiDownload size={14} className="text-blue-600" /> Export
            </button>
            <button className="flex-[2] sm:flex-initial px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2" onClick={openAdd}>
              <FiPlus size={14} /> Add Teacher
            </button>
          </div>
        </div>
      </div>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className="card !rounded-[2.5rem] p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all border-slate-100 flex flex-col group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <div className="avatar avatar-lg shadow-sm" style={{ background: avatarColors[i % 6] }}>{t.name.charAt(0)}</div>
                <div>
                  <h5 className="font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{t.name}</h5>
                  <p className="text-[11px] text-blue-600 font-extrabold uppercase tracking-widest mt-0.5">{t.empId}</p>
                </div>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${t.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>{t.status}</span>
            </div>

            <div className="space-y-3 grow">
              <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Subject</span>
                <span className="text-slate-700">{t.subject}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Classes</span>
                <span className="text-slate-700">{t.class}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Experience</span>
                <span className="text-slate-700">{t.experience}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Salary</span>
                <span className="text-lg font-black text-emerald-600">{t.salary}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2" 
                onClick={() => openEdit(t)}
              >
                <FiEdit2 size={12} /> Edit
              </button>
              <button 
                className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-600 border border-red-100 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm" 
                onClick={() => setDeleteId(t.id)}
              >
                <FiTrash2 size={16} />
              </button>
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

