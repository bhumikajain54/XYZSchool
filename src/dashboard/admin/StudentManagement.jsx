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
    <div className="page-enter p-3 md:p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex-1">
          <h3 className="section-title !mb-1">Student Management</h3>
          <p className="section-subtitle !mb-0">{students.length} enrolled students in current session</p>
          
          <div className="search-bar mt-6 max-w-md">
            <FiSearch className="search-icon" />
            <input 
              value={search} 
              onChange={e => { setSearch(e.target.value); setPage(1); }} 
              placeholder="Search by name, roll no or email..." 
              className="form-input w-full !rounded-xl !border-slate-200" 
            />
          </div>
        </div>

        {/* COMPACT CONTROL CLUSTER (Matching User Image) */}
        <div className="flex flex-col items-stretch sm:items-end gap-3 w-full sm:w-auto">
          {/* Top Dropdown */}
          <div className="w-full sm:w-64">
            <div className="relative">
              <select 
                className="form-select w-full !border-[#5C67ED] !border-2 !rounded-xl !h-[52px] !font-semibold text-slate-700 !bg-white" 
                value={filterClass} 
                onChange={e => { setFilterClass(e.target.value); setPage(1); }}
              >
                <option value="">All Classes</option>
                {CLASSES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Middle Row: Status + Export */}
          <div className="flex gap-3 w-full sm:w-[320px]">
            <select 
              className="form-select flex-1 !border-2 !border-slate-100 !rounded-xl !h-[52px] !font-semibold text-slate-700 !bg-white" 
              value={filterStatus} 
              onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            >
              <option value="">Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            
            <button className="flex-1 btn btn-outline !border-2 !border-[#1E3A8A] !text-[#1E3A8A] !rounded-xl !h-[52px] !font-bold hover:!bg-blue-50 transition-all">
              <FiDownload strokeWidth={2.5} /> Export
            </button>
          </div>

          {/* Bottom Button: New Student */}
          <button 
            className="w-full sm:w-[260px] btn btn-primary !bg-[#1E3A8A] !border-none !rounded-xl !h-[56px] !font-bold !text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            onClick={openAdd}
          >
            <FiPlus size={22} strokeWidth={3} /> New Student
          </button>
        </div>
      </div>


      {/* Desktop Table */}
      <div className="hidden md:block table-wrapper overflow-x-auto rounded-xl shadow-sm border border-slate-200">
        <table className="data-table min-w-full">
          <thead>
            <tr>
              <th>Student Info</th>
              <th>Roll Number</th>
              <th>Class</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Fees</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-20 text-slate-400">No students found matching your criteria</td></tr>
            ) : paged.map((s, i) => (
              <motion.tr
                key={s.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-slate-50 transition-colors"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar avatar-sm" style={{ background: avatarColors[s.id % 8] }}>{s.name.charAt(0)}</div>
                    <div>
                      <p className="font-bold text-sm text-slate-800">{s.name}</p>
                      <p className="text-[11px] text-slate-400">{s.email}</p>
                    </div>
                  </div>
                </td>
                <td><span className="font-bold text-primary">{s.rollNo}</span></td>
                <td>{s.class}</td>
                <td>{s.phone}</td>
                <td><span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-gray'}`}>{s.status}</span></td>
                <td><span className={`badge ${s.fees === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{s.fees}</span></td>
                <td>
                  <div className="flex gap-2 justify-center">
                    <button className="icon-btn !w-8 !h-8 !text-sm" onClick={() => openEdit(s)}><FiEdit2 /></button>
                    <button className="icon-btn !w-8 !h-8 !text-sm !text-red-500 !bg-red-50 !border-red-100" onClick={() => setDeleteId(s.id)}><FiTrash2 /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {paged.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center text-slate-400 border border-slate-100">No matches found</div>
        ) : paged.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="flex items-start justify-between gap-4 mb-4">
               <div className="flex items-center gap-3">
                  <div className="avatar avatar-md shrink-0" style={{ background: avatarColors[s.id % 8] }}>{s.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-black text-slate-900 leading-tight">{s.name}</h4>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{s.rollNo} • {s.class}</p>
                  </div>
               </div>
               <div className="flex gap-1">
                  <button className="w-9 h-9 flex items-center justify-center bg-slate-50 rounded-xl text-slate-600" onClick={() => openEdit(s)}><FiEdit2 size={14} /></button>
                  <button className="w-9 h-9 flex items-center justify-center bg-red-50 rounded-xl text-red-500" onClick={() => setDeleteId(s.id)}><FiTrash2 size={14} /></button>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-gray'}`}>{s.status}</span>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fee Status</p>
                  <span className={`badge ${s.fees === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{s.fees}</span>
               </div>
               <div className="col-span-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact</p>
                  <p className="text-sm font-bold text-slate-600">{s.phone} • {s.email}</p>
               </div>
            </div>
          </div>
        ))}
      </div>

        {totalPages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Showing paged results</p>
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1">
              <button className="icon-btn !w-8 !h-8 shrink-0" onClick={() => setPage(page - 1)} disabled={page === 1}><FiChevronLeft /></button>
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === i + 1 ? 'bg-primary text-white' : 'hover:bg-slate-100 text-slate-600'}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
                ))}
              </div>
              <button className="icon-btn !w-8 !h-8 shrink-0" onClick={() => setPage(page + 1)} disabled={page === totalPages}><FiChevronRight /></button>
            </div>
          </div>
        )}

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
