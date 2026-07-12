import React, { useState, useMemo } from 'react';
import { FiDollarSign, FiClock, FiDownload, FiPlus, FiSearch, FiFilter, FiPrinter, FiCheckCircle, FiAlertCircle, FiUser, FiBriefcase, FiPackage, FiTool, FiArrowRight, FiActivity, FiCalendar, FiPieChart, FiBarChart2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// -------------------------------------------------------
// REUSABLE COMPONENTS
// -------------------------------------------------------

const StatusBadge = ({ status }) => {
  const isPaid = status.toLowerCase() === 'paid' || status.toLowerCase() === 'completed';
  return (
    <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-full tracking-wider shadow-sm ${
      isPaid ? 'bg-emerald-50 text-secondary border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
    }`}>
      {status}
    </span>
  );
};

const CompactActionButton = ({ label, icon: Icon, onClick, color = "bg-primary" }) => (
  <button 
    onClick={onClick}
    className={`${color} text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md`}
  >
    {Icon && <Icon size={14} />} {label}
  </button>
);

const DetailCard = ({ title, icon: Icon, amount, color, children, actions }) => (
  <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col space-y-4">
    <div className="flex justify-between items-start">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${color}`}>
        <Icon size={24} />
      </div>
      <div className="flex gap-2">
        {actions?.map((act, id) => (
          <button key={id} onClick={act.onClick} className="bg-primary text-white px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-indigo-700 transition">
             {act.label}
          </button>
        ))}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{title}</p>
      <h4 className="text-2xl font-black text-slate-800">₹{amount.toLocaleString()}</h4>
    </div>
    <div className="pt-2 flex-1 space-y-1">
      {children}
    </div>
  </div>
);

const StatPill = ({ label, value, color = "text-slate-800" }) => (
  <div className="flex flex-col px-4 border-r border-slate-100 last:border-0">
     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</span>
     <span className={`text-sm font-black ${color}`}>{value}</span>
  </div>
);

// -------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------

const INIT_PAYMENTS = [
  { id: 1, studentName: 'Aarav Sharma', class: '10-A', feeType: 'Tuition Fee', amount: 15000, status: 'Paid', date: '2026-03-20' },
  { id: 2, studentName: 'Priya Verma', class: '12-B', feeType: 'Exam Fee', amount: 2500, status: 'Pending', date: '2026-04-01' },
  { id: 3, studentName: 'Rohan Gupta', class: '9-C', feeType: 'Tuition Fee', amount: 15000, status: 'Paid', date: '2026-03-15' },
  { id: 4, studentName: 'Sanya Malhotra', class: '8-A', feeType: 'Transport Fee', amount: 3500, status: 'Pending', date: '2026-04-05' },
  { id: 5, studentName: 'Ishaan Reddy', class: '11-A', feeType: 'Tuition Fee', amount: 18000, status: 'Paid', date: '2026-03-25' },
];

const TEACHER_SALARIES = [
  { name: 'Dr. RS Pathak', subject: 'Mathematics', amount: 45000, status: 'Paid' },
  { name: 'Prof. Verma', subject: 'Physics', amount: 42000, status: 'Pending' },
  { name: 'Ms. Sunita', subject: 'English', amount: 38000, status: 'Paid' },
];

const STAFF_SALARIES = [
  { name: 'Raj Kumar', role: 'Clerk', amount: 25000, status: 'Paid' },
  { name: 'Anita Devi', role: 'Cleaner', amount: 12000, status: 'Pending' },
  { name: 'Suresh Singh', role: 'Security', amount: 18000, status: 'Paid' },
];

const INVENTORY_EXPENSES = [
  { item: 'A4 Paper', qty: '20 Units', cost: 4500, date: '2026-04-02' },
  { item: 'CCTV Units', qty: '4 Units', cost: 22000, date: '2026-03-28' },
  { item: 'Lab Kits', qty: '10 Units', cost: 15000, date: '2026-03-25' },
];

const MAINTENANCE_EXPENSES = [
  { work: 'AC Repair', desc: 'Staff Room', cost: 3500, date: '2026-04-01' },
  { work: 'Power Bill', desc: 'March 2026', cost: 45000, date: '2026-03-31' },
  { work: 'Water Tank', desc: 'Main Supply', cost: 2500, date: '2026-03-20' },
];

export default function Finance() {
  const { addToast } = useApp();
  const [payments, setPayments] = useState(INIT_PAYMENTS);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [newFee, setNewFee] = useState({ studentName: '', class: '', feeType: 'Tuition Fee', amount: '', status: 'Paid', date: new Date().toISOString().split('T')[0] });

  // Comprehensive Data Sync
  const stats = useMemo(() => {
    const revenue = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
    const pending = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
    
    const teacherSalary = TEACHER_SALARIES.reduce((sum, s) => sum + s.amount, 0);
    const staffSalary = STAFF_SALARIES.reduce((sum, s) => sum + s.amount, 0);
    const inventory = INVENTORY_EXPENSES.reduce((sum, e) => sum + e.cost, 0);
    const maintenance = MAINTENANCE_EXPENSES.reduce((sum, m) => sum + m.cost, 0);
    const totalExp = teacherSalary + staffSalary + inventory + maintenance;

    return { 
      revenue, 
      pending, 
      count: payments.length,
      totalExp,
      salaryPaid: TEACHER_SALARIES.filter(s => s.status === 'Paid').reduce((sum, s) => sum + s.amount, 0) + 
                  STAFF_SALARIES.filter(s => s.status === 'Paid').reduce((sum, s) => sum + s.amount, 0),
      salaryPending: TEACHER_SALARIES.filter(s => s.status === 'Pending').reduce((sum, s) => sum + s.amount, 0) + 
                     STAFF_SALARIES.filter(s => s.status === 'Pending').reduce((sum, s) => sum + s.amount, 0)
    };
  }, [payments]);

  const handleCollect = (e) => {
    e.preventDefault();
    setPayments([{ ...newFee, id: Date.now(), amount: Number(newFee.amount) }, ...payments]);
    setShowCollectModal(false);
    setNewFee({ studentName: '', class: '', feeType: 'Tuition Fee', amount: '', status: 'Paid', date: new Date().toISOString().split('T')[0] });
    addToast('success', 'Fee Collected', 'Ledger updated.');
  };

  return (
    <div className="p-6 max-w-[1500px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Finance Command</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-0.5">Vishwa Vidhyalaya Master Audit Ledger</p>
        </div>
        <div className="flex items-center gap-4">
          <CompactActionButton label="Export" icon={FiDownload} onClick={() => alert('Exporting...')} color="bg-white border border-slate-200 !text-slate-600" />
          <CompactActionButton label="Collection" icon={FiPlus} onClick={() => setShowCollectModal(true)} />
        </div>
      </div>

      {/* TOP KPI STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
           { label: "Total Month View", value: `₹${stats.revenue.toLocaleString()}`, color: "bg-emerald-50 text-secondary", icon: FiCalendar },
           { label: "Total Annual View", value: `₹${(stats.revenue * 12).toLocaleString()}`, color: "bg-indigo-50 text-primary", icon: FiPieChart },
           { label: "Pending Dues", value: `₹${stats.pending.toLocaleString()}`, color: "bg-rose-50 text-rose-600", icon: FiAlertCircle },
           { label: "Collection Rate", value: `${Math.round((stats.revenue / (stats.revenue + stats.pending)) * 100 || 0)}%`, color: "bg-primary text-white", icon: FiBarChart2, isDark: true }
        ].map((kpi, idx) => (
           <div key={idx} className={`p-6 rounded-[32px] border ${kpi.isDark ? 'bg-primary text-white shadow-xl shadow-indigo-100' : 'bg-white border-slate-100'} flex items-center gap-6 group transition-all`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${kpi.isDark ? 'bg-white/20' : kpi.color}`}>
                 <kpi.icon size={24} />
              </div>
              <div>
                 <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${kpi.isDark ? 'text-indigo-100' : 'text-slate-400'}`}>{kpi.label}</p>
                 <h4 className="text-2xl font-black tracking-tight">{kpi.value}</h4>
              </div>
           </div>
        ))}
      </div>

      {/* REVENUE: COMPACT AGGREGATE TERMINAL */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col xl:flex-row items-center gap-8 group hover:border-indigo-100 transition-all overflow-hidden"
      >
         <div className="flex items-center gap-4 border-r border-slate-100 pr-4">
            <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
               <FiActivity size={28} />
            </div>
            <div>
               <h3 className="text-xl font-black text-slate-800 leading-tight tracking-tight">Cumulative Collection</h3>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Global Audit</p>
            </div>
         </div>

         <div className="flex items-center gap-4 flex-1">
            <StatPill label="Revenue" value={`₹${(stats.revenue + stats.pending).toLocaleString()}`} />
            <StatPill label="Records" value={`${stats.count} Total`} />
            <StatPill label="Audit" value="Verified" color="text-secondary" />
            
            <div className="flex-1 flex gap-4 ml-4">
               {['Tuition', 'Exam', 'Transport'].map(t => {
                  const type = t + ' Fee';
                  const paid = payments.filter(p => p.feeType === type && p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
                  const perc = (paid / (stats.revenue + stats.pending)) * 100 || 0;
                  return (
                     <div key={t} className="flex-1 space-y-1">
                        <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest">
                           <span>{t}</span>
                           <span>₹{paid.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${perc}%` }} className="h-full bg-indigo-500" />
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>

         <div className="flex gap-2">
            <CompactActionButton label="Export" icon={FiDownload} onClick={() => alert('Exporting...')} color="bg-slate-900" />
            <CompactActionButton label="Print" icon={FiPrinter} onClick={() => alert('Printing...')} color="bg-white border border-slate-200 !text-slate-600" />
         </div>
      </motion.div>

      {/* EXPENDITURE SECTION */}
      <div className="pt-4 space-y-6">
         <div className="flex items-center gap-4">
            <div className="w-1.5 h-7 bg-accent rounded-full" />
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Expenditure Audit</h2>
         </div>

         {/* EXPENDITURE KPI STRIP */}
         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
               { label: "Salary Paid", value: stats.salaryPaid, color: "text-secondary", icon: FiCheckCircle },
               { label: "Expenses", value: stats.totalExp, color: "text-primary", icon: FiActivity },
               { label: "Pending", value: stats.salaryPending, color: "text-rose-600", icon: FiAlertCircle },
               { label: "Month View", value: stats.totalExp, color: "text-amber-600", icon: FiCalendar },
               { label: "Annual View", value: stats.totalExp * 12, color: "text-slate-800", icon: FiPieChart }
            ].map((kpi, idx) => (
               <div key={idx} className="bg-white p-6 rounded-[24px] border border-slate-100 flex flex-col gap-2 shadow-sm hover:border-indigo-100 transition-all">
                  <div className="flex justify-between items-center">
                     <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{kpi.label}</p>
                     <kpi.icon className={kpi.color} size={14} />
                  </div>
                  <h4 className={`text-lg font-black ${kpi.color}`}>₹{kpi.value.toLocaleString()}</h4>
               </div>
            ))}
         </div>

         {/* EXPENDITURE MODULES: 4 Compact Summary Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
            {[
               { title: "Teacher Salaries", icon: FiUser, amount: 125000, color: "bg-indigo-50 text-primary", action: "Process" },
               { title: "Admin Staff", icon: FiBriefcase, amount: 55000, color: "bg-amber-50 text-amber-600", action: "Audit" },
               { title: "Inventory OpEx", icon: FiPackage, amount: 41500, color: "bg-emerald-50 text-secondary", action: "Ledger" },
               { title: "Structural O&M", icon: FiTool, amount: 51000, color: "bg-rose-50 text-rose-600", action: "Record" }
            ].map((module, idx) => (
               <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 group">
                  <div className="flex justify-between items-start">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${module.color} group-hover:scale-110 transition-transform`}>
                        <module.icon size={24} />
                     </div>
                     <button onClick={() => addToast('info', 'Command Processed', `${module.action} initiated.`)} className="bg-slate-100 text-slate-500 hover:bg-primary hover:text-white px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
                        {module.action}
                     </button>
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{module.title}</p>
                     <h4 className="text-2xl font-black text-slate-800 tracking-tight">₹{module.amount.toLocaleString()}</h4>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* FEE MODAL */}
      <AnimatePresence>
        {showCollectModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCollectModal(false)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-white rounded-[32px] w-full max-w-lg overflow-hidden flex flex-col">
              <div className="p-8 bg-primary text-white flex justify-between items-center">
                 <h2 className="text-xl font-black uppercase tracking-widest">Fee Collection</h2>
                 <button onClick={() => setShowCollectModal(false)}>✕</button>
              </div>
              <form onSubmit={handleCollect} className="p-8 space-y-6">
                <input type="text" className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold border-none outline-none" placeholder="Student Name" required onChange={e => setNewFee({...newFee, studentName: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                   <input type="text" className="px-6 py-4 bg-slate-50 rounded-2xl font-bold" placeholder="Class" required onChange={e => setNewFee({...newFee, class: e.target.value})} />
                   <select className="px-6 py-4 bg-slate-50 rounded-2xl font-bold" onChange={e => setNewFee({...newFee, feeType: e.target.value})}>
                      <option>Tuition Fee</option><option>Exam Fee</option><option>Transport Fee</option>
                   </select>
                </div>
                <input type="number" className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" placeholder="Amount (₹)" required onChange={e => setNewFee({...newFee, amount: e.target.value})} />
                <button type="submit" className="w-full py-6 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Commit Payment</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
