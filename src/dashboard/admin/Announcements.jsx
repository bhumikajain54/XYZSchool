import React, { useState } from 'react';
import { FiPlus, FiX, FiEdit2, FiSend, FiSearch, FiFilter } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const INIT_ANNOUNCEMENTS = [
  { id: 1, title: 'Annual Sports Day', content: 'Annual Sports Day will be held on April 15, 2025. All students must participate in at least one event.', audience: 'All', date: '2025-03-28', priority: 'High', author: 'Admin' },
  { id: 2, title: 'Parent-Teacher Meeting', content: 'PTM scheduled for April 5, 2025. Parents of classes 10-12 are requested to attend between 10 AM - 1 PM.', audience: 'Parents', date: '2025-03-26', priority: 'High', author: 'Admin' },
  { id: 3, title: 'Library Book Return Reminder', content: 'All students are requested to return borrowed library books by March 31, 2025.', audience: 'Students', date: '2025-03-25', priority: 'Medium', author: 'Librarian' },
  { id: 4, title: 'Holiday Notice - Ram Navami', content: 'School will remain closed on April 6, 2025 on account of Ram Navami. Regular classes resume April 7.', audience: 'All', date: '2025-03-24', priority: 'Low', author: 'Admin' },
  { id: 5, title: 'Board Exam Hall Tickets', content: 'Class 10 and 12 students can collect their board exam hall tickets from the office between 9 AM - 12 PM.', audience: 'Students', date: '2025-03-22', priority: 'High', author: 'Exam Cell' },
];

const EMPTY_FORM = { title: '', content: '', audience: 'All', priority: 'Medium' };

const audienceStyles = {
  All: 'bg-indigo-50 text-primary border-indigo-100',
  Students: 'bg-purple-50 text-purple-600 border-purple-100',
  Parents: 'bg-emerald-50 text-secondary border-emerald-100',
  Teachers: 'bg-amber-50 text-amber-600 border-amber-100',
};

export default function Announcements() {
  const { addToast } = useApp();
  const [announcements, setAnnouncements] = useState(INIT_ANNOUNCEMENTS);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); };
  const openEdit = (a) => { setForm({ ...a }); setEditId(a.id); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditId(null); };

  const handleSave = () => {
    if (!form.title || !form.content) {
      addToast('error', 'Error', 'Title and content are required');
      return;
    }
    if (editId) {
      setAnnouncements(list => list.map(a => a.id === editId ? { ...a, ...form } : a));
      addToast('success', 'Updated!', 'Announcement updated successfully');
    } else {
      const now = new Date().toISOString().split('T')[0];
      const newId = Date.now();
      setAnnouncements(a => [{ ...form, id: newId, date: now, author: 'Admin' }, ...a]);
      addToast('success', 'Published!', 'Announcement sent to ' + form.audience);
    }
    closeModal();
  };

  const handleDelete = () => {
    setAnnouncements(a => a.filter(x => x.id !== deleteId));
    addToast('success', 'Deleted', 'Announcement removed');
    setDeleteId(null);
  };

  const filteredAnnouncements = announcements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         a.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || a.audience === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Campus Announcements</h1>
          <p className="text-slate-500 font-medium tracking-wide">Digital notice board for the school community</p>
        </div>
        <button 
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-indigo-700 transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-indigo-100"
        >
          <FiPlus size={20} /> New Announcement
        </button>
      </div>

      {/* Modern Filter & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center gap-6">
        <div className="flex items-center p-1 bg-slate-50 rounded-2xl border border-slate-100 w-full lg:w-max overflow-x-auto">
          {['All', 'Students', 'Teachers', 'Parents'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === filter 
                ? 'bg-white text-primary shadow-md border border-slate-200' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search announcements..."
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium outline-none focus:border-indigo-500 focus:bg-white transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredAnnouncements.map((a, i) => (
            <motion.div
              layout
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all relative overflow-hidden flex flex-col h-full"
            >
              {/* Priority Bar */}
              <div className={`absolute top-0 left-0 w-full h-1.5 ${
                a.priority === 'High' ? 'bg-rose-500' : 
                a.priority === 'Medium' ? 'bg-accent' : 'bg-emerald-500'
              }`} />

              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  a.priority === 'High' ? 'bg-rose-50 text-rose-600' : 
                  a.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-secondary'
                }`}>
                  {a.priority} Priority
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <button onClick={() => openEdit(a)} className="p-2 text-slate-400 hover:text-primary hover:bg-indigo-50 rounded-xl transition">
                    <FiEdit2 size={16} />
                  </button>
                  <button onClick={() => setDeleteId(a.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition">
                    <FiX size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors leading-tight">
                {a.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                {a.content}
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-xs font-black text-primary uppercase border border-indigo-100">
                    {a.author.substring(0, 2)}
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800">{a.author}</div>
                    <div className="text-[10px] font-bold text-slate-400">{a.date}</div>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-wider border ${audienceStyles[a.audience]}`}>
                   {a.audience.toUpperCase()}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredAnnouncements.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-32 flex flex-col items-center justify-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200"
        >
          <div className="text-6xl mb-6">📢</div>
          <h3 className="text-2xl font-black text-slate-800 mb-2">No matching notices</h3>
          <p className="text-slate-500 font-medium">Try broadening your search criteria</p>
        </motion.div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }} className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-xl overflow-hidden">
              <div className="p-8 bg-primary text-white flex justify-between items-center">
                <div>
                   <h2 className="text-2xl font-black">{editId ? 'Modify Notice' : 'Draft New Notice'}</h2>
                   <p className="text-indigo-100 text-sm font-medium">Coordinate school-wide communications</p>
                </div>
                <button className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white" onClick={closeModal}><FiX size={20} /></button>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Announcement Subject</label>
                  <input className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-slate-800" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Annual Trip 2026" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Notice Body</label>
                  <textarea className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium text-slate-600 min-h-[140px]" rows={5} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Provide clear instructions or details..." />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Audience</label>
                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold" value={form.audience} onChange={e => setForm(p => ({ ...p, audience: e.target.value }))}>
                      <option>All</option><option>Students</option><option>Parents</option><option>Teachers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Notice Urgency</label>
                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
                      <option>High</option><option>Medium</option><option>Low</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button className="flex-1 py-4 border-2 border-slate-100 text-slate-400 rounded-2xl font-bold hover:bg-slate-50 transition" onClick={closeModal}>Discard</button>
                  <button className="flex-2 py-4 bg-primary text-white rounded-2xl font-black hover:bg-indigo-700 transition shadow-xl shadow-indigo-200 flex items-center justify-center gap-2" onClick={handleSave}><FiSend /> {editId ? 'Save Changes' : 'Broadcast Notice'}</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteId(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-white rounded-[32px] p-8 w-full max-w-sm text-center">
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🗑️</div>
              <h3 className="text-2xl font-black text-slate-800 mb-4">Remove Notice?</h3>
              <p className="text-slate-500 font-medium mb-8 leading-relaxed">This action will permanently hide this announcement from all users.</p>
              <div className="flex gap-4">
                <button className="flex-1 py-4 border-2 border-slate-100 text-slate-400 rounded-2xl font-bold hover:bg-slate-50 transition" onClick={() => setDeleteId(null)}>Wait, back</button>
                <button className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black hover:bg-rose-700 transition shadow-lg shadow-rose-200" onClick={handleDelete}>Yes, Remove</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
