import React, { useState } from 'react';
import { FiUsers, FiPlus, FiSearch, FiFilter, FiPhoneCall, FiMessageSquare, FiClock, FiMapPin, FiCheckCircle, FiMinusCircle, FiUserCheck, FiLogOut, FiActivity, FiUserPlus, FiShield } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

// -------------------------------------------------------
// REUSABLE COMPONENTS
// -------------------------------------------------------

const StatusBadge = ({ status }) => {
  const isActive = status.toLowerCase() === 'active';
  return (
    <span className={`px-4 py-1.5 text-[9px] font-black uppercase rounded-full tracking-widest shadow-sm border ${
      isActive ? 'bg-emerald-50 text-secondary border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
    }`}>
      {status}
    </span>
  );
};

const PurposeBadge = ({ purpose }) => (
  <span className="px-4 py-1 bg-slate-50 text-slate-500 border border-slate-100 rounded-lg font-black text-[8px] uppercase tracking-widest shadow-inner">
     {purpose}
  </span>
);

const ReceptionStatCard = ({ label, value, icon: Icon, color, groupHover }) => (
  <div className={`bg-white -8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-${groupHover}-200 transition-all`}>
     <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${color}`}>
       <Icon size={28} />
     </div>
     <div>
       <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1.5 leading-none">{label}</p>
       <h4 className="text-3xl font-black text-slate-800 leading-none">{value}</h4>
     </div>
  </div>
);

// -------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------

const INIT_VISITORS = [
  { id: 1, name: 'Ashok Kumar', purpose: 'Parent Teacher Meeting', contact: '9876543201', checkIn: '09:00 AM', checkOut: '09:45 AM', status: 'Checked Out' },
  { id: 2, name: 'Suresh Raina', purpose: 'General Enquiry', contact: '9876543202', checkIn: '10:15 AM', checkOut: null, status: 'Active' },
  { id: 3, name: 'Megha Singh', purpose: 'New Admission', contact: '9876543203', checkIn: '11:00 AM', checkOut: null, status: 'Active' },
  { id: 4, name: 'Vinay Bajpai', purpose: 'Vendor Visit', contact: '9876543204', checkIn: '08:30 AM', checkOut: '09:20 AM', status: 'Checked Out' },
];

export default function Reception() {
  const { addToast } = useApp();
  const [visitors, setVisitors] = useState(INIT_VISITORS);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVisitor, setNewVisitor] = useState({ name: '', purpose: '', contact: '', checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'Active' });

  const filtered = visitors.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.purpose.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: visitors.length,
    active: visitors.filter(v => v.status === 'Active').length,
    checkedOut: visitors.filter(v => v.status === 'Checked Out').length,
    inflow: Math.round((visitors.filter(v => v.status === 'Active').length / visitors.length) * 100) || 0
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setVisitors([{ ...newVisitor, id: Date.now(), checkOut: null }, ...visitors]);
    setShowAddModal(false);
    setNewVisitor({ name: '', purpose: '', contact: '', checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'Active' });
    addToast('success', 'Visitor Recorded', 'Institutional entry has been securely logged.');
  };

  const checkoutVisitor = (id) => {
    setVisitors(prev => prev.map(v => 
      v.id === id ? { ...v, status: 'Checked Out', checkOut: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : v
    ));
    addToast('info', 'Check-out Logged', 'Visitor departure timestamp updated.');
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="w-2 h-12 bg-primary rounded-full shadow-lg shadow-indigo-100" />
           <div>
             <h1 className="text-4xl font-black text-slate-800 tracking-tight">Institutional Reception</h1>
             <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.2em] mt-0.5">Front-desk Operations & Visitor Audit</p>
           </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button className="px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition shadow-sm flex items-center gap-2">
            <FiPhoneCall /> Call Log
          </button>
          <button className="px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition shadow-sm flex items-center gap-2">
            <FiMessageSquare /> Enquirires
          </button>
          <button onClick={() => setShowAddModal(true)} className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition shadow-2xl shadow-indigo-100 flex items-center gap-4 active:scale-95">
            <FiPlus size={18} /> New Entry
          </button>
        </div>
      </div>

      {/* KPI SUMMARY: Front-Desk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReceptionStatCard label="Session Visitors" value={`${stats.total} Total`} icon={FiUsers} color="bg-indigo-50 text-primary" groupHover="indigo" />
        <ReceptionStatCard label="On Campus" value={`${stats.active} Active`} icon={FiUserCheck} color="bg-emerald-50 text-secondary" groupHover="emerald" />
        <ReceptionStatCard label="Daily Exits" value={`${stats.checkedOut} Out`} icon={FiLogOut} color="bg-slate-100 text-slate-400" groupHover="slate" />
        <ReceptionStatCard label="Security Load" value={`${stats.inflow}%`} icon={FiShield} color="bg-rose-50 text-rose-600" groupHover="rose" />
      </div>

      {/* VISITOR LOG TERMINAL */}
      <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-slate-50/30">
            <div className="relative w-full md:w-[450px] group">
              <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                className="w-full pl-16 pr-6 py-4 bg-white border border-slate-200 rounded-[28px] outline-none focus:border-indigo-500 font-bold transition-all shadow-sm focus:shadow-indigo-100/40"
                placeholder="Search logs by visitor or purpose..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-4 bg-white border border-slate-100 text-slate-500 rounded-2xl flex items-center gap-4 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition shadow-sm">
                 <FiFilter className="text-primary" /> All Purposes
              </button>
            </div>
        </div>

      {/* VISITOR LOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-24 text-center bg-white rounded-[3rem] border border-slate-100 shadow-inner">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 border border-slate-100">
                  <FiUsers size={40} />
               </div>
               <h5 className="text-xl font-black text-slate-300 tracking-tight">Archive Empty</h5>
               <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mt-2">No front-desk logs found for this search vector</p>
            </motion.div>
          ) : (
            filtered.map((v, i) => (
              <motion.div 
                key={v.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/30 transition-all flex flex-col relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-400 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 border border-indigo-100 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {v.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{v.name}</h4>
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">ID: {v.id.toString().slice(-4)}</p>
                    </div>
                  </div>
                  <StatusBadge status={v.status} />
                </div>

                <div className="space-y-3 grow text-[10px] font-black uppercase tracking-widest">
                  <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                    <span className="text-slate-400">Institutional Purpose</span>
                    <PurposeBadge purpose={v.purpose} />
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                    <span className="text-slate-400">Entry Vector</span>
                    <div className="flex items-center gap-2 text-slate-700">
                      <FiClock size={12} className="text-primary" /> {v.checkIn}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2.5">
                    <span className="text-slate-400">Exit Signature</span>
                    {v.checkOut ? (
                      <div className="flex items-center gap-2 text-slate-400 italic">
                        <FiLogOut size={12} /> {v.checkOut}
                      </div>
                    ) : (
                      <span className="text-amber-500 border border-amber-100 bg-amber-50 px-3 py-1 rounded-lg">LIVE SESSION</span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  {v.status === 'Active' ? (
                    <button 
                      onClick={() => checkoutVisitor(v.id)}
                      className="w-full py-4 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-100 hover:bg-rose-600 transition-all transform hover:-translate-y-1 active:translate-y-0"
                    >
                      Authorize Post-Session Exit
                    </button>
                  ) : (
                    <div className="w-full py-4 flex items-center justify-center gap-3 text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-50 rounded-2xl border border-emerald-100">
                       <FiCheckCircle size={14} /> Log Archived
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      </div>

      {/* VISITOR ENTRY MODAL: Institutional Safety Terminal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="relative bg-white rounded-[56px] shadow-2xl w-full max-w-xl overflow-hidden border border-white/20">
              <div className="p-10 bg-primary text-white flex justify-between items-start">
                 <div>
                   <h2 className="text-3xl font-black tracking-tight tracking-tight">Vishwa Registry</h2>
                   <p className="text-indigo-100 text-[11px] font-black uppercase tracking-[0.2em] mt-2">Institutional Visitor Safety Protocol</p>
                 </div>
                 <button onClick={() => setShowAddModal(false)} className="w-14 h-14 rounded-3xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white active:scale-90">✕</button>
              </div>
              <form onSubmit={handleAdd} className="p-10 space-y-8">
                <div className="space-y-6">
                   <div>
                     <label className="block text-[10px] font-black text-slate-400 border-l-4 border-indigo-500 pl-3 uppercase tracking-widest mb-4">Visitor Legal Name</label>
                     <input type="text" className="w-full px-6 py-6 bg-slate-50 border border-slate-100 rounded-[24px] outline-none focus:border-indigo-500 focus:bg-white font-bold transition-all shadow-inner" value={newVisitor.name} onChange={e => setNewVisitor({...newVisitor, name: e.target.value})} placeholder="e.g. Anand Sharma" required />
                   </div>
                   <div>
                     <label className="block text-[10px] font-black text-slate-400 border-l-4 border-indigo-500 pl-3 uppercase tracking-widest mb-4">Institutional Purpose</label>
                     <input type="text" className="w-full px-6 py-6 bg-slate-50 border border-slate-100 rounded-[24px] outline-none focus:border-indigo-500 focus:bg-white font-bold transition-all shadow-inner" value={newVisitor.purpose} onChange={e => setNewVisitor({...newVisitor, purpose: e.target.value})} placeholder="e.g. Admission Inquiry" required />
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                     <div>
                       <label className="block text-[10px] font-black text-slate-400 border-l-4 border-indigo-500 pl-3 uppercase tracking-widest mb-4">Contact Payload</label>
                       <input type="text" className="w-full px-6 py-6 bg-slate-50 border border-slate-100 rounded-[24px] outline-none focus:border-indigo-500 focus:bg-white font-black transition-all shadow-inner" value={newVisitor.contact} onChange={e => setNewVisitor({...newVisitor, contact: e.target.value})} placeholder="10 Digits" required />
                     </div>
                     <div>
                       <label className="block text-[10px] font-black text-slate-400 border-l-4 border-indigo-500 pl-3 uppercase tracking-widest mb-4">Entry Timestamp</label>
                       <input type="text" className="w-full px-6 py-6 bg-slate-50 border border-slate-100 rounded-[24px] outline-none focus:border-indigo-500 focus:bg-white font-bold transition-all shadow-inner" value={newVisitor.checkIn} onChange={e => setNewVisitor({...newVisitor, checkIn: e.target.value})} />
                     </div>
                   </div>
                </div>
                <div className="pt-6 flex gap-6">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-6 border-2 border-slate-100 text-slate-400 font-black rounded-[24px] hover:bg-slate-50 transition uppercase tracking-widest text-[10px]">Abandon Log</button>
                  <button type="submit" className="flex-1 py-6 bg-primary text-white font-black rounded-[24px] hover:bg-indigo-700 transition shadow-2xl shadow-indigo-100 uppercase tracking-widest text-[10px]">Authorize Entry</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
