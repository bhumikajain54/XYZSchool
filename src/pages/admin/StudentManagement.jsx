import React, { useState } from 'react';
import {
  FiSearch, FiPlus, FiEdit2, FiTrash2, FiFilter,
  FiDownload, FiX, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const INIT_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', rollNo: 'VS-001', class: '12-A', gender: 'Male', dob: '2008-03-14', phone: '9876543210', email: 'aarav@email.com', status: 'Active', fees: 'Paid' },
  { id: 2, name: 'Diya Patel', rollNo: 'VS-002', class: '11-B', gender: 'Female', dob: '2009-07-22', phone: '9876543211', email: 'diya@email.com', status: 'Active', fees: 'Paid' },
  { id: 3, name: 'Rohan Verma', rollNo: 'VS-003', class: '12-B', gender: 'Male', dob: '2008-11-05', phone: '9876543212', email: 'rohan@email.com', status: 'Active', fees: 'Pending' },
  { id: 4, name: 'Ananya Reddy', rollNo: 'VS-004', class: '10-A', gender: 'Female', dob: '2010-02-18', phone: '9876543213', email: 'ananya@email.com', status: 'Active', fees: 'Paid' },
  { id: 5, name: 'Vikram Singh', rollNo: 'VS-005', class: '9-C', gender: 'Male', dob: '2011-08-30', phone: '9876543214', email: 'vikram@email.com', status: 'Inactive', fees: 'Pending' },
  { id: 6, name: 'Priya Nair', rollNo: 'VS-006', class: '11-A', gender: 'Female', dob: '2009-05-12', phone: '9876543215', email: 'priya@email.com', status: 'Active', fees: 'Paid' },
  { id: 7, name: 'Arjun Mehta', rollNo: 'VS-007', class: '10-B', gender: 'Male', dob: '2010-09-27', phone: '9876543216', email: 'arjun@email.com', status: 'Active', fees: 'Paid' },
  { id: 8, name: 'Sneha Gupta', rollNo: 'VS-008', class: '8-A', gender: 'Female', dob: '2012-01-15', phone: '9876543217', email: 'sneha@email.com', status: 'Active', fees: 'Pending' },
  { id: 9, name: 'Vikash Kushwaha', rollNo: 'VS-009', class: '12-A', gender: 'Male', dob: '2008-05-15', phone: '9876543218', email: 'vikash@email.com', status: 'Active', fees: 'Paid' },
  { id: 10, name: 'Karan Patil', rollNo: 'VS-010', class: '11-C', gender: 'Male', dob: '2009-02-22', phone: '9876543219', email: 'karan@email.com', status: 'Active', fees: 'Paid' },
  { id: 11, name: 'Ishita Jain', rollNo: 'VS-011', class: '10-B', gender: 'Female', dob: '2010-06-12', phone: '9876543220', email: 'ishita@email.com', status: 'Active', fees: 'Paid' },
  { id: 12, name: 'Kabir Khan', rollNo: 'VS-012', class: '9-A', gender: 'Male', dob: '2011-10-30', phone: '9876543221', email: 'kabir@email.com', status: 'Active', fees: 'Pending' },
];

const EMPTY_FORM = { name: '', rollNo: '', class: '', gender: 'Male', dob: '', phone: '', email: '', status: 'Active', fees: 'Paid' };
const CLASSES = ['8-A', '8-B', '9-A', '9-B', '9-C', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];

export default function StudentManagement() {
  const { addToast } = useApp();
  const [students, setStudents] = useState(INIT_STUDENTS);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.includes(search);
    const matchClass = !filterClass || s.class === filterClass;
    const matchStatus = !filterStatus || s.status === filterStatus;
    return matchSearch && matchClass && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); };
  const openEdit = (s) => { setForm({ ...s }); setEditId(s.id); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditId(null); };

  const handleSave = () => {
    if (!form.name || !form.rollNo || !form.class) {
      addToast('error', 'Validation Error', 'Name, Roll No and Class are required');
      return;
    }
    if (editId) {
      setStudents(s => s.map(x => x.id === editId ? { ...form, id: editId } : x));
      addToast('success', 'Updated!', `${form.name} updated successfully`);
    } else {
      const newId = Math.max(...students.map(s => s.id)) + 1;
      setStudents(s => [...s, { ...form, id: newId }]);
      addToast('success', 'Added!', `${form.name} added successfully`);
    }
    closeModal();
  };

  const handleDelete = () => {
    const s = students.find(x => x.id === deleteId);
    setStudents(x => x.filter(s => s.id !== deleteId));
    addToast('success', 'Deleted', `${s?.name} removed`);
    setDeleteId(null);
  };

  const avatarColors = ['#2563EB', '#7C3AED', '#059669', '#D97706', '#DC2626', '#0891B2', '#DB2777', '#EA580C'];

  return (
    <div className="page-enter py-4 sm:py-6 space-y-6">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-slate-800">Student Management</h3>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">{students.length} enrolled students</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <div className="relative group flex-1 sm:min-w-[280px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name or roll no..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-xs outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all cursor-pointer"
              value={filterClass}
              onChange={e => { setFilterClass(e.target.value); setPage(1); }}
            >
              <option value="">All Classes</option>
              {CLASSES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-xs outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all cursor-pointer"
              value={filterStatus}
              onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            >
              <option value="">Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <button className="flex-1 sm:flex-initial px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2">
              <FiDownload size={14} className="text-blue-600" /> Export
            </button>
            <button className="flex-[2] sm:flex-initial px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2" onClick={openAdd}>
              <FiPlus size={14} /> New Student
            </button>
          </div>
        </div>
      </div>

      <div className="table-wrapper overflow-x-auto rounded-lg shadow">
        <table className="data-table min-w-full border border-gray-200 border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
            <tr>
              <th className="px-4 py-2 text-left">Student Info</th>
              <th className="px-4 py-2 text-left">Roll Number</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Fees</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paged.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No matches found</td></tr>
            ) : paged.map((s, i) => (
              <motion.tr
                key={s.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b hover:bg-gray-100"
              >
                <td className="px-4 py-2">
                  <div className="flex items-center gap-4">
                    <div className="avatar avatar-sm" style={{ background: avatarColors[s.id % 8] }}>{s.name.charAt(0)}</div>
                    <div><p style={{ fontWeight: 600, fontSize: 13, margin: 0 }}>{s.name}</p><p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>{s.email}</p></div>
                  </div>
                </td>
                <td className="px-4 py-2"><span style={{ fontWeight: 600, color: 'var(--primary)' }}>{s.rollNo}</span></td>
                <td className="px-4 py-2">{s.class}</td>
                <td className="px-4 py-2">{s.phone}</td>
                <td className="px-4 py-2"><span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-gray'}`}>{s.status}</span></td>
                <td className="px-4 py-2"><span className={`badge ${s.fees === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{s.fees}</span></td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <button className="btn btn-outline btn-sm btn-icon text-xs px-2 py-1" onClick={() => openEdit(s)} title="Edit"><FiEdit2 size={13} /></button>
                    <button className="btn btn-danger btn-sm btn-icon text-xs px-2 py-1" onClick={() => setDeleteId(s.id)} title="Delete"><FiTrash2 size={13} /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="card-footer bg-white border-t flex flex-wrap justify-between items-center px-4 py-4 gap-4">
            <p className="text-xs text-muted font-medium">Showing {(page - 1) * PER_PAGE + 1} to {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} entries</p>
            <div className="flex items-center gap-1">
              <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setPage(page - 1)} disabled={page === 1}><FiChevronLeft /></button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} className={`btn btn-sm px-4 ${page === i + 1 ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setPage(page + 1)} disabled={page === totalPages}><FiChevronRight /></button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} className="modal" style={{ maxWidth: 580 }}>
              <div className="modal-header">
                <h4>{editId ? 'Edit Student' : 'Enroll New Student'}</h4>
                <button className="modal-close" onClick={closeModal}><FiX /></button>
              </div>
              <div className="modal-body p-4">
                <div className="grid-2 gap-4">
                  <div className="form-group"><label className="form-label required">Full Name</label><input className="form-input" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Aryan Mehta" /></div>
                  <div className="form-group"><label className="form-label required">Roll No</label><input className="form-input" value={form.rollNo || ''} onChange={e => setForm({ ...form, rollNo: e.target.value })} placeholder="VS-XXX" /></div>
                  <div className="form-group">
                    <label className="form-label required">Class</label>
                    <select className="form-select" value={form.class} onChange={e => setForm({ ...form, class: e.target.value })}>
                      <option value="">Select Class</option>
                      {CLASSES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                  <div className="form-group" style={{ gridColumn: '1/-1' }}><label className="form-label">Email</label><input className="form-input" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">Status</label><select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option>Active</option><option>Inactive</option></select></div>
                  <div className="form-group"><label className="form-label">Fee Status</label><select className="form-select" value={form.fees} onChange={e => setForm({ ...form, fees: e.target.value })}><option>Paid</option><option>Pending</option></select></div>
                </div>
              </div>
              <div className="modal-footer p-4 pt-0">
                <button className="btn btn-ghost btn-sm" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={handleSave}>{editId ? 'Save Profile' : 'Enroll Student'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="modal" style={{ maxWidth: 380 }}>
              <div className="modal-header"><h4>Confirm Deletion</h4></div>
              <div className="modal-body p-4 text-center"><p className="text-sm">Permanently remove student record?</p></div>
              <div className="modal-footer p-4 pt-0">
                <button className="btn btn-ghost btn-sm" onClick={() => setDeleteId(null)}>Cancel</button>
                <button className="btn btn-danger btn-sm" onClick={handleDelete}>Confirm Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
