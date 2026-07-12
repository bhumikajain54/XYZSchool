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
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Library Archive</h1>
          <p className="text-[10px] md:text-xs font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">Digital Centralized Repository & Asset Registry</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95 flex items-center justify-center gap-3"
        >
          <FiPlus size={14} /> Register New Vol.
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6 ring-1 ring-slate-100 group hover:shadow-xl hover:shadow-indigo-100/30 transition-all">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <FiBook size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800 tracking-tighter leading-none mb-1.5">{stats.total}</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Collection</div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6 ring-1 ring-slate-100 group hover:shadow-xl hover:shadow-emerald-100/30 transition-all">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <FiCheckCircle size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800 tracking-tighter leading-none mb-1.5">{stats.available}</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">On Institutional Shelf</div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6 ring-1 ring-slate-100 group hover:shadow-xl hover:shadow-amber-100/30 transition-all sm:col-span-2 lg:col-span-1">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <FiArrowRight size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800 tracking-tighter leading-none mb-1.5">{stats.issued}</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">External Circulation</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col ring-1 ring-slate-100">
        <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/20">
          <div className="relative w-full lg:w-96 group">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-black transition-all text-[11px] uppercase tracking-widest shadow-inner placeholder:text-slate-300"
              placeholder="Search Institutional database..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
            {['Fiction', 'Science', 'Arts', 'IT'].map(cat => (
              <button key={cat} className="whitespace-nowrap px-6 py-3 bg-white border border-slate-100 rounded-xl text-slate-400 font-black text-[9px] uppercase tracking-[0.2em] shadow-sm hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all active:scale-95">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full py-24 text-center bg-white rounded-[2.5rem] border border-slate-100 italic text-slate-400 font-bold">
              The library archive seems empty for this search protocol.
            </div>
          ) : (
            filtered.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-[2.5rem] p-6 border border-slate-100 hover:shadow-xl hover:shadow-indigo-100/30 transition-all flex flex-col relative"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-500 border border-indigo-50 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      <FiBook size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{b.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{b.author}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border shrink-0 ${b.availability === 'Available'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                    {b.availability}
                  </span>
                </div>

                <div className="space-y-3 grow text-[10px] font-black uppercase tracking-widest">
                  <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                    <span className="text-slate-400">Classification</span>
                    <span className="text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">{b.category}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5">
                    <span className="text-slate-400">Current Anchor</span>
                    <span className="text-slate-700 truncate max-w-[120px]">{b.issuedTo || '--'}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => toggleStatus(b.id)}
                    className={`flex-1 py-4 font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0 ${b.availability === 'Available'
                        ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700'
                        : 'bg-slate-800 text-white shadow-slate-200 hover:bg-slate-900'
                      }`}
                  >
                    {b.availability === 'Available' ? 'Check Out / Issue' : 'Inventory Return'}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Add Book Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-white rounded-[32px] md:rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden border border-white mx-auto">
              <div className="p-6 md:p-8 bg-primary text-white flex justify-between items-center">
                <div>
                  <h2 className="text-xl md:text-2xl font-black">Archive New Book</h2>
                  <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">Digital Catalog Entry</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white">✕</button>
              </div>
              <form onSubmit={handleAdd} className="p-6 md:p-8 space-y-5 md:space-y-6">
                <div className="space-y-4 text-slate-800">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Book Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold transition-all text-sm" value={newBook.name} onChange={e => setNewBook({ ...newBook, name: e.target.value })} placeholder="e.g. The Hobbit" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Author</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold transition-all text-sm" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} placeholder="e.g. J.R.R. Tolkien" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Category</label>
                      <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold cursor-pointer text-sm" value={newBook.category} onChange={e => setNewBook({ ...newBook, category: e.target.value })}>
                        <option>Fiction</option><option>Science</option><option>Arts</option><option>History</option><option>IT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Availability</label>
                      <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none border focus:border-indigo-500 font-bold cursor-pointer transition-all text-sm" value={newBook.availability} onChange={e => setNewBook({ ...newBook, availability: e.target.value })}>
                        <option>Available</option><option>Issued</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 border-2 border-slate-100 text-slate-400 font-bold rounded-2xl hover:bg-slate-50 transition order-2 sm:order-1">Discard</button>
                  <button type="submit" className="flex-1 py-4 bg-primary text-white font-black rounded-2xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 order-1 sm:order-2">Add to Archive</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
