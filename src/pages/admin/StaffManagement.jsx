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
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase">Staff Management</h1>
          <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest opacity-70">Support & Administration Personnel</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportToExcel} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition shadow-sm font-bold text-xs uppercase tracking-widest">
            <FiDownload /> Export
          </button>
          <button onClick={openAdd} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 font-bold text-xs uppercase tracking-widest">
            <FiPlus /> Add Staff
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, role or dept..." 
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-400 focus:bg-white transition-all font-bold text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 px-4 border border-slate-100 rounded-2xl bg-slate-50 h-[52px] text-slate-500 w-full lg:w-64">
          <FiFilter className="text-primary" />
          <select className="bg-transparent outline-none w-full text-xs font-black uppercase tracking-widest text-slate-700 cursor-pointer">
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
              className="group bg-white rounded-[32px] border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ring-1 ring-slate-100"
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                   onClick={() => openEdit(s)}
                   className="w-9 h-9 bg-white border border-slate-100 text-primary rounded-xl shadow-sm hover:bg-indigo-50 flex items-center justify-center transition"
                >
                  <FiEdit2 size={14} />
                </button>
                <button 
                   onClick={() => setDeleteId(s.id)}
                   className="w-9 h-9 bg-white border border-slate-100 text-rose-600 rounded-xl shadow-sm hover:bg-rose-50 flex items-center justify-center transition"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>

              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 ring-4 ring-slate-50 border border-slate-200 shadow-inner">
                  <img src={s.avatar || `https://ui-avatars.com/api/?name=${s.name}`} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 pr-12">
                  <h3 className="font-black text-slate-800 text-lg leading-tight truncate">{s.name}</h3>
                  <div className="mt-1">
                    <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded tracking-widest border border-blue-100/50">{s.role}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center gap-4 text-xs text-slate-500 bg-slate-50/80 p-3 rounded-2xl border border-slate-100/50">
                  <FiBriefcase className="text-blue-500 shrink-0" />
                  <span className="font-black uppercase tracking-tight text-[10px]">{s.dept} Dept</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-600 px-1">
                  <FiPhone className="text-slate-400 shrink-0" />
                  <span className="font-bold">{s.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-600 px-1">
                  <FiMail className="text-slate-400 shrink-0" />
                  <span className="truncate font-bold italic">{s.email}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-600 px-1">
                  <FiCalendar className="text-slate-400 shrink-0" />
                  <span className="font-bold">Joined: {s.joined}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  s.status === 'Active' ? 'bg-emerald-50 text-secondary border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                }`}>
                  {s.status}
                </span>
                <button onClick={() => openView(s)} className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-indigo-700 transition-colors">View Profile</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden border border-white mx-auto">
              <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight">
                    {viewOnly ? 'Staff Credentials' : (editId ? 'Modify Profile' : 'New Staff Account')}
                  </h4>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">HR Management System</p>
                </div>
                <button onClick={closeModal} className="w-10 h-10 rounded-2xl hover:bg-slate-200 flex items-center justify-center transition text-slate-400"><FiX size={20}/></button>
              </div>
              <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {['name', 'phone', 'email', 'joined'].map(f => (
                  <div key={f}>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest opacity-80">{f}</label>
                    {viewOnly ? (
                      <div className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-2xl text-slate-800 font-black text-sm">
                        {form[f] || 'N/A'}
                      </div>
                    ) : (
                      <input className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold transition text-sm" value={form[f] || ''} onChange={e => setForm({...form, [f]: e.target.value})} type={f === 'joined' ? 'date' : 'text'} />
                    )}
                  </div>
                ))}
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest opacity-80">Designation</label>
                   {viewOnly ? (
                     <div className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-2xl text-slate-800 font-black text-sm tracking-tight">{form.role}</div>
                   ) : (
                     <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 cursor-pointer font-bold text-sm" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                       {['Accountant', 'Librarian', 'Receptionist', 'Inventory Manager', 'Driver', 'Security'].map(r => <option key={r} value={r}>{r}</option>)}
                     </select>
                   )}
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest opacity-80">Current Status</label>
                   {viewOnly ? (
                     <div className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-2xl">
                       <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        form.status === 'Active' ? 'bg-emerald-50 text-secondary border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {form.status}
                      </span>
                     </div>
                   ) : (
                     <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 cursor-pointer font-bold text-sm" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                       <option>Active</option><option>On Leave</option><option>Inactive</option>
                     </select>
                   )}
                </div>
              </div>
              <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3">
                <button className="px-8 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600 transition order-2 sm:order-1" onClick={closeModal}>{viewOnly ? 'Close Directory' : 'Discard'}</button>
                {!viewOnly && (
                  <button className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition order-1 sm:order-2 active:scale-95" onClick={handleSave}>{editId ? 'Update Record' : 'Register Member'}</button>
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
