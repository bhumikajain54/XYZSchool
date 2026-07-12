import React, { useState } from 'react';
import { FiSearch, FiPlus, FiFilter, FiDownload, FiEdit2, FiTrash2, FiX, FiMail, FiPhone, FiCalendar, FiBriefcase } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const INIT_STAFF = [
  { id: 1, name: 'Sunita Sharma', role: 'Accountant', dept: 'Finance', phone: '9876543220', email: 'sunita.s@example.com', status: 'Active', joined: '2022-03-15', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Rakesh Verma', role: 'Librarian', dept: 'Library', phone: '9876543221', email: 'rakesh.v@example.com', status: 'Active', joined: '2021-08-20', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Priya Reddy', role: 'Receptionist', dept: 'Admin', phone: '9876543222', email: 'priya.r@example.com', status: 'On Leave', joined: '2023-01-10', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Anil Kumar', role: 'Inventory Manager', dept: 'Stores', phone: '9876543223', email: 'anil.k@example.com', status: 'Active', joined: '2020-05-05', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Sanjay Singh', role: 'Driver', dept: 'Transport', phone: '9876543224', email: 'sanjay.s@example.com', status: 'Active', joined: '2019-11-22', avatar: 'https://i.pravatar.cc/150?u=5' },
];

const EMPTY_FORM = { name: '', role: 'Accountant', dept: 'Finance', phone: '', email: '', status: 'Active', joined: new Date().toISOString().split('T')[0] };

export default function StaffManagement() {
  const { addToast } = useApp();
  const [staff, setStaff] = useState(INIT_STAFF);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);

  const filtered = staff.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.role.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm({ ...EMPTY_FORM }); setEditId(null); setViewOnly(false); setShowModal(true); };
  const openEdit = (s) => { setForm({ ...s }); setEditId(s.id); setViewOnly(false); setShowModal(true); };
  const openView = (s) => { setForm({ ...s }); setEditId(s.id); setViewOnly(true); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditId(null); setViewOnly(false); };

  const handleSave = () => {
    if (!form.name || !form.role) { addToast('error', 'Error', 'Missing required fields'); return; }
    if (editId) {
      setStaff(list => list.map(s => s.id === editId ? { ...form, id: editId } : s));
      addToast('success', 'Updated', 'Staff member profile updated');
    } else {
      setStaff(list => [{ ...form, id: Date.now(), avatar: `https://i.pravatar.cc/150?u=${Date.now()}` }, ...list]);
      addToast('success', 'Added', 'New staff member registered');
    }
    closeModal();
  };

  const handleDelete = () => {
    setStaff(list => list.filter(s => s.id !== deleteId));
    addToast('success', 'Deleted', 'Staff record removed');
    setDeleteId(null);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(staff);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Staff');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer]), 'Staff_Records.xlsx');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Staff Management</h1>
          <p className="text-slate-500">View and manage administrative and support personnel</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button onClick={exportToExcel} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition shadow-sm">
            <FiDownload /> Export
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
            <FiPlus /> Add Staff Member
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, role or department..." 
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all font-inter text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 px-4 border border-slate-200 rounded-xl bg-slate-50 h-[46px] text-slate-500 min-w-[160px]">
          <FiFilter />
          <select className="bg-transparent outline-none w-full text-sm font-semibold text-slate-700 cursor-pointer">
            <option>All Staff</option>
            <option>Active</option>
            <option>On Leave</option>
          </select>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((s) => (
            <motion.div 
              key={s.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button 
                   onClick={() => openEdit(s)}
                   className="p-2 bg-white border border-slate-100 text-primary rounded-lg shadow-sm hover:bg-indigo-50 transition"
                >
                  <FiEdit2 size={14} />
                </button>
                <button 
                   onClick={() => setDeleteId(s.id)}
                   className="p-2 bg-white border border-slate-100 text-rose-600 rounded-lg shadow-sm hover:bg-rose-50 transition"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 ring-4 ring-slate-50 border border-slate-200">
                  <img src={s.avatar || `https://ui-avatars.com/api/?name=${s.name}`} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">{s.name}</h3>
                  <span className="text-[10px] font-black uppercase text-primary bg-indigo-50 px-2 py-0.5 rounded tracking-widest">{s.role}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-slate-500 bg-slate-50 p-2 rounded-xl">
                  <FiBriefcase className="text-slate-400" />
                  <span className="font-medium">{s.dept} Department</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <FiPhone className="text-slate-400 shrink-0" />
                  <span>{s.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <FiMail className="text-slate-400 shrink-0" />
                  <span className="truncate">{s.email}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <FiCalendar className="text-slate-400 shrink-0" />
                  <span>Joined: {s.joined}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  s.status === 'Active' ? 'bg-emerald-50 text-secondary' : 'bg-amber-50 text-amber-600'
                }`}>
                  {s.status}
                </span>
                <button onClick={() => openView(s)} className="text-xs font-bold text-primary hover:underline">View Profile</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modals are kept similar but with updated styling */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
              <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h4 className="text-xl font-bold text-slate-800">
                  {viewOnly ? 'Staff Member Profile' : (editId ? 'Edit Staff Profile' : 'Register New Staff')}
                </h4>
                <button onClick={closeModal} className="p-2 hover:bg-slate-200 rounded-full transition"><FiX /></button>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {['name', 'phone', 'email', 'joined'].map(f => (
                  <div key={f}>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">{f}</label>
                    {viewOnly ? (
                      <div className="w-full px-4 py-4 bg-slate-50 border border-transparent rounded-xl text-slate-800 font-bold">
                        {form[f] || 'N/A'}
                      </div>
                    ) : (
                      <input className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition" value={form[f] || ''} onChange={e => setForm({...form, [f]: e.target.value})} type={f === 'joined' ? 'date' : 'text'} />
                    )}
                  </div>
                ))}
                <div>
                   <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Role</label>
                   {viewOnly ? (
                     <div className="w-full px-4 py-4 bg-slate-50 border border-transparent rounded-xl text-slate-800 font-bold">{form.role}</div>
                   ) : (
                     <select className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 cursor-pointer" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                       {['Accountant', 'Librarian', 'Receptionist', 'Inventory Manager', 'Driver', 'Security'].map(r => <option key={r} value={r}>{r}</option>)}
                     </select>
                   )}
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Status</label>
                   {viewOnly ? (
                     <div className="w-full px-4 py-4 bg-slate-50 border border-transparent rounded-xl">
                       <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        form.status === 'Active' ? 'bg-emerald-50 text-secondary' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {form.status}
                      </span>
                     </div>
                   ) : (
                     <select className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 cursor-pointer" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                       <option>Active</option><option>On Leave</option><option>Inactive</option>
                     </select>
                   )}
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-4">
                <button className="px-6 py-2.5 font-bold text-slate-500 hover:text-slate-700 transition" onClick={closeModal}>{viewOnly ? 'Close Profile' : 'Cancel'}</button>
                {!viewOnly && (
                  <button className="px-8 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition" onClick={handleSave}>{editId ? 'Update Record' : 'Create Staff Profile'}</button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteId(null)} className="absolute inset-0 bg-slate-900/30" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl">
               <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <FiTrash2 size={24} />
               </div>
               <h4 className="text-xl font-bold text-slate-800">Confirm Deletion</h4>
               <p className="text-slate-500 text-sm mt-2 mb-8">Are you sure you want to permanently remove this staff record? This action cannot be undone.</p>
               <div className="flex gap-4">
                 <button onClick={() => setDeleteId(null)} className="flex-1 py-4 text-slate-600 font-bold border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
                 <button onClick={handleDelete} className="flex-1 py-4 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-100">Delete</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
