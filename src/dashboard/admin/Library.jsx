import React, { useState } from 'react';
import { FiBook, FiPlus, FiSearch, FiFilter, FiHash, FiUser, FiArrowRight, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const INIT_BOOKS = [
  { id: 1, name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', availability: 'Available', issuedTo: null },
  { id: 2, name: 'Calculus Vol 1', author: 'G.B. Thomas', category: 'Science', availability: 'Issued', issuedTo: 'Rohan Sharma (12-A)' },
  { id: 3, name: 'Brief History of Time', author: 'Stephen Hawking', category: 'Science', availability: 'Available', issuedTo: null },
  { id: 4, name: 'World Geography', author: 'Oxford Press', category: 'Arts', availability: 'Issued', issuedTo: 'Diya Patel (10-B)' },
  { id: 5, name: 'Data Structures', author: 'S. Lipschutz', category: 'IT', availability: 'Available', issuedTo: null },
];

export default function Library() {
  const { addToast } = useApp();
  const [books, setBooks] = useState(INIT_BOOKS);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBook, setNewBook] = useState({ name: '', author: '', category: 'Fiction', availability: 'Available', issuedTo: null });

  const filtered = books.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: books.length,
    available: books.filter(b => b.availability === 'Available').length,
    issued: books.filter(b => b.availability === 'Issued').length,
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setBooks([{ ...newBook, id: Date.now() }, ...books]);
    setShowAddModal(false);
    setNewBook({ name: '', author: '', category: 'Fiction', availability: 'Available', issuedTo: null });
    addToast('success', 'Book Registered', 'Library database has been updated with the new book.');
  };

  const toggleStatus = (id) => {
    setBooks(prev => prev.map(b => {
      if (b.id === id) {
        const isAvail = b.availability === 'Available';
        return { ...b, availability: isAvail ? 'Issued' : 'Available', issuedTo: isAvail ? 'Quick Issue Mode' : null };
      }
      return b;
    }));
    addToast('success', 'Status Switched', 'Book availability updated.');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Library Archive</h1>
          <p className="text-slate-500 font-medium">Digital repository for books, periodicals, and resources</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
          >
            <FiPlus /> Register Book
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-center gap-6 ring-1 ring-slate-100">
          <div className="w-14 h-14 bg-indigo-50 text-primary rounded-2xl flex items-center justify-center">
            <FiBook size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Total Collection</p>
            <h4 className="text-2xl font-black text-slate-800">{stats.total} Vol.</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-center gap-6 ring-1 ring-slate-100">
          <div className="w-14 h-14 bg-emerald-50 text-secondary rounded-2xl flex items-center justify-center">
            <FiCheckCircle size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">On Shelf</p>
            <h4 className="text-2xl font-black text-slate-800">{stats.available} Available</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-center gap-6 ring-1 ring-slate-100 text-slate-800">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <FiArrowRight size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Circulating</p>
            <h4 className="text-2xl font-black">{stats.issued} Issued</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold transition-all"
              placeholder="Search by book name or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-2 text-slate-500 font-bold text-xs">
              <FiFilter className="text-primary" /> Filter: Science
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Book Information</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Issued To</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((b, i) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0 border border-slate-200 shadow-inner">
                          <FiBook size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{b.name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{b.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-4 py-1 bg-indigo-50 text-primary rounded-lg font-bold text-[10px] uppercase">
                        {b.category}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${b.availability === 'Available' ? 'bg-emerald-50 text-secondary' : 'bg-amber-50 text-amber-600'
                        }`}>
                        {b.availability}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-sm font-bold text-slate-500">
                      {b.issuedTo || '--'}
                    </td>
                    <td className="px-6 py-6 text-center">
                      <button
                        onClick={() => toggleStatus(b.id)}
                        className={`px-4 py-2 font-black rounded-xl text-[10px] uppercase tracking-widest shadow-sm transition transform hover:-translate-y-0.5 active:translate-y-0 ${b.availability === 'Available' ? 'bg-accent text-white shadow-amber-100' : 'bg-primary text-white shadow-indigo-100'
                          }`}
                      >
                        {b.availability === 'Available' ? 'Issue' : 'Return'}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 text-center text-slate-400 font-bold italic">The library shelves seem empty for this search.</div>
          )}
        </div>
      </div>

      {/* Add Book Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden border border-white">
              <div className="p-8 bg-primary text-white flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black">Archive New Book</h2>
                  <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mt-1">Digital Catalog Entry</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white">✕</button>
              </div>
              <form onSubmit={handleAdd} className="p-8 space-y-6">
                <div className="space-y-4 text-slate-800">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Book Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold transition-all" value={newBook.name} onChange={e => setNewBook({ ...newBook, name: e.target.value })} placeholder="e.g. The Hobbit" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Author</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold transition-all" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} placeholder="e.g. J.R.R. Tolkien" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Category</label>
                      <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold cursor-pointer" value={newBook.category} onChange={e => setNewBook({ ...newBook, category: e.target.value })}>
                        <option>Fiction</option><option>Science</option><option>Arts</option><option>History</option><option>IT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Availability</label>
                      <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none border focus:border-indigo-500 font-bold cursor-pointer transition-all" value={newBook.availability} onChange={e => setNewBook({ ...newBook, availability: e.target.value })}>
                        <option>Available</option><option>Issued</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 border-2 border-slate-100 text-slate-400 font-bold rounded-2xl hover:bg-slate-50 transition">Discard</button>
                  <button type="submit" className="flex-1 py-4 bg-primary text-white font-black rounded-2xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-100">Add to Archive</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
