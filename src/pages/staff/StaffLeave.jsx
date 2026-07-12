import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiFileText, FiChevronRight, FiUpload, FiX } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

export default function StaffLeave() {
  const { addToast } = useApp();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [leaveBalance, setLeaveBalance] = useState([
    { label: 'Casual Leave', total: 12, consumed: 4, color: 'blue' },
    { label: 'Sick Leave', total: 8, consumed: 2, color: 'green' },
    { label: 'Paid Leave', total: 10, consumed: 0, color: 'purple' },
    { label: 'Emergency Leave', total: 3, consumed: 1, color: 'red' },
  ]);

  const leaveHistory = [
    { id: 1, type: 'Casual Leave', start: '2024-03-24', end: '2024-03-25', status: 'Approved', reason: 'Personal work at home', applied: '2 days ago' },
    { id: 2, type: 'Sick Leave', start: '2024-03-10', end: '2024-03-12', status: 'Approved', reason: 'Fever and viral infection', applied: '2 weeks ago' },
    { id: 3, type: 'Emergency Leave', start: '2024-02-15', end: '2024-02-15', status: 'Rejected', reason: 'Family gathering', applied: '1 month ago' },
    { id: 4, type: 'Casual Leave', start: '2024-04-10', end: '2024-04-11', status: 'Pending', reason: 'Hospital appointment', applied: 'Just now' },
  ];

  const handleApply = (e) => {
    e.preventDefault();
    setShowApplyModal(false);
    addToast('success', 'Leave Applied', 'Your leave request has been submitted for approval.');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Leave Management</h3>
          <p className="text-[10px] md:text-xs font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">Institutional Absence Tracking & Requests</p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95 flex items-center justify-center gap-3" onClick={() => setShowApplyModal(true)}>
          <FiPlus size={14} /> New Leave Application
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {leaveBalance.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm ring-1 ring-slate-100 flex items-center gap-6 group hover:shadow-xl hover:shadow-indigo-100/30 transition-all overflow-hidden"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform shadow-sm border border-slate-50
              ${b.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                b.color === 'green' ? 'bg-emerald-50 text-emerald-600' :
                  b.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                    'bg-rose-50 text-rose-600'}`}
            >
              <FiCalendar />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800 tracking-tighter leading-none mb-1.5">{b.total - b.consumed}</div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{b.label} Balance</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col ring-1 ring-slate-100">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h5 className="font-black text-slate-800 uppercase tracking-tight text-sm">Application History</h5>
          <FiFileText className="text-slate-200" size={24} />
        </div>
        <div className="divide-y divide-slate-50">
          {leaveHistory.map(l => (
            <div key={l.id} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 border border-slate-100 italic">
                  {l.type.substring(0, 1)}L
                </div>
                <div className="min-w-0">
                  <h6 className="font-black text-slate-800 uppercase italic tracking-tight truncate">{l.type}</h6>
                  <p className="text-[11px] font-bold text-slate-500 line-clamp-1">{l.reason}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between sm:justify-start gap-4 md:gap-12 w-full md:w-auto mt-2 md:mt-0">
                <div>
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Interval</div>
                  <div className="text-[11px] font-black text-slate-700">{l.start} — {l.end}</div>
                </div>
                <div className="hidden xl:block">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Maturity</div>
                  <div className="text-[11px] font-black text-slate-700">{l.applied}</div>
                </div>
                <div>
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 text-right">Status Audit</div>
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border block shadow-sm
                      ${l.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      l.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                    {l.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowApplyModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative bg-white rounded-[40px] w-full max-w-xl p-6 md:p-10 shadow-3xl border border-white mx-auto overflow-hidden ring-1 ring-slate-200"
            >
              <div className="mb-8 flex justify-between items-start">
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight uppercase italic">Apply for Leave</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Personnel Absence Log Request</p>
                </div>
                <button onClick={() => setShowApplyModal(false)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors shadow-inner">
                  <FiX />
                </button>
              </div>
              <form onSubmit={handleApply} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Classification</label>
                    <select className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-black focus:border-indigo-400 focus:bg-white outline-none transition-all shadow-inner cursor-pointer appearance-none">
                      <option>Casual Leave</option>
                      <option>Sick Leave</option>
                      <option>Paid Leave</option>
                      <option>Emergency Leave</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Initiation</label>
                    <input type="date" className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-black focus:border-indigo-400 focus:bg-white outline-none transition-all shadow-inner" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Termination</label>
                    <input type="date" className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-black focus:border-indigo-400 focus:bg-white outline-none transition-all shadow-inner" required />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Justification</label>
                    <textarea className="w-full h-32 px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-black focus:border-indigo-400 focus:bg-white outline-none transition-all shadow-inner resize-none" placeholder="Provide operational context..." required />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Supporting Evidence</label>
                    <div className="border-2 border-dashed border-slate-100 rounded-3xl p-8 text-center bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all cursor-pointer group shadow-inner">
                      <FiUpload className="mx-auto text-slate-300 group-hover:text-indigo-500 mb-2 transition-colors" size={24} />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Upload Digital Asset</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button type="button" className="flex-1 py-5 rounded-[24px] border border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-50 transition-all order-2 sm:order-1" onClick={() => setShowApplyModal(false)}>Discard</button>
                  <button type="submit" className="flex-2 py-5 rounded-[24px] bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95 px-8 order-1 sm:order-2">Authorize Submittal</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>

  );
}
