import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, FiBook, FiDollarSign, FiClipboard, FiCheckSquare, FiFileText, 
  FiTruck, FiPackage, FiUser, FiAlertCircle, FiCalendar, FiMessageSquare, FiBell, FiChevronRight, FiArrowRight 
} from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export default function StaffDashboard() {
  const { user } = useApp();

  const overviewStats = [
    { label: 'Working Days', val: '24', icon: <FiCalendar />, color: 'blue', link: '/staff/attendance' },
    { label: 'Present Days', val: '21', icon: <FiCheckSquare />, color: 'green', link: '/staff/attendance' },
    { label: 'Absent Days', val: '02', icon: <FiXCircle />, color: 'red', link: '/staff/attendance' },
    { label: 'Pending Leave', val: '01', icon: <FiFileText />, color: 'purple', link: '/staff/leave' },
    { label: 'Next Payday', val: '25 Oct', icon: <FiDollarSign />, color: 'amber', link: '/staff/salary' },
    { label: 'Unread Msg', val: '06', icon: <FiMessageSquare />, color: 'teal', link: '/staff/messages' },
  ];

  const notices = [
    { title: 'New Biometric Policy', date: '2h ago', priority: 'High' },
    { title: 'Library Audit 2024', date: '5h ago', priority: 'Medium' },
    { title: 'Staff Meeting @ 4PM', date: 'Today', priority: 'High' },
  ];



  return (
    <div className="page-enter py-4 sm:py-6 space-y-8">
      {/* 👑 WELCOME HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Hello, {user?.name?.split(' ')[0] || 'Member'} 👋
          </h2>
          <p className="text-slate-400 font-bold text-xs sm:text-sm mt-1 uppercase tracking-widest">
             Staff Member • {new Date().toLocaleDateString(undefined, { dateStyle: 'long' })}
          </p>
        </div>
        <div className="bg-white border border-slate-100 px-6 py-3 flex items-center justify-center gap-3 rounded-2xl shadow-sm border-zinc-100">
           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
           <span className="text-[10px] sm:text-[11px] font-black text-slate-700 uppercase tracking-widest whitespace-nowrap">Presence: Marked (09:00 AM)</span>
        </div>
      </div>

      {/* 📊 PERSONAL TRACKER GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-8">
         {overviewStats.map((stat, i) => (
           <Link to={stat.link} key={stat.label} className="block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: i * 0.05 }}
              className={`card ${stat.color}-hover h-full flex flex-col items-center justify-center p-6 cursor-pointer border-slate-100 group transition-all`}
            >
               <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-sm border border-slate-50`} style={{ background: `var(--accent-${stat.color}-light)`, color: `var(--accent-${stat.color})` }}>
                 {stat.icon}
               </div>
               <div className="text-xl sm:text-2xl font-black text-slate-800 leading-none mb-1">{stat.val}</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{stat.label}</div>
            </motion.div>
           </Link>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* QUICK ACTIONS */}
         <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-indigo-600 text-white shadow-xl shadow-indigo-100 border-0 flex flex-col justify-between group overflow-hidden relative">
                   <div className="relative z-10">
                     <h6 className="text-white font-black text-lg mb-1">Apply For Leave</h6>
                     <p className="text-white/80 text-xs font-medium mb-6 leading-relaxed">Request personal or medical time-off easily.</p>
                     <Link to="/staff/leave" className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg">New Request</Link>
                   </div>
                   <FiUser className="absolute -bottom-4 -right-4 text-white/5" size={120} />
                </div>
                <div className="p-8 rounded-[2rem] bg-emerald-600 text-white shadow-xl shadow-emerald-100 border-0 flex flex-col justify-between group overflow-hidden relative">
                   <div className="relative z-10">
                     <h6 className="text-white font-black text-lg mb-1">Salary Payslip</h6>
                     <p className="text-white/80 text-xs font-medium mb-6 leading-relaxed">Download your latest salary records securely.</p>
                     <Link to="/staff/salary" className="inline-block px-8 py-3 bg-white text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg">View Slip</Link>
                   </div>
                   <FiDollarSign className="absolute -bottom-4 -right-4 text-white/5" size={120} />
                </div>
            </div>

            <div className="p-6 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-indigo-200 transition-colors flex flex-col items-center">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-slate-100 text-slate-400 group-hover:text-indigo-600"><FiBell /></div>
               <h6 className="font-black text-slate-800 mb-1 leading-tight">System Notifications</h6>
               <p className="text-xs font-medium text-slate-400">You have 3 unread system alerts regarding maintenance.</p>
            </div>
         </div>

         {/* NOTICES & ALERTS */}
         <div className="flex flex-col h-full">
            <div className="card !rounded-[2.5rem] p-8 h-full flex flex-col shadow-xl shadow-slate-200/50">
               <div className="flex items-center justify-between mb-8">
                 <h5 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em]">Latest Notices</h5>
                 <FiClipboard className="text-slate-200" size={24} />
               </div>
               <div className="space-y-4 grow">
                  {notices.map((n, i) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all group">
                       <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${n.priority === 'High' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]'}`} />
                          <div className="text-[13px] font-black text-slate-700 group-hover:text-indigo-600 transition-colors">{n.title}</div>
                       </div>
                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{n.date}</div>
                    </div>
                  ))}
               </div>
               <Link to="/staff/notices" className="mt-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-slate-50 transition-all shadow-sm">
                 Browse Announcements
               </Link>
            </div>
         </div>
      </div>

      <style>{`
        .blue-hover:hover { border-color: var(--accent-blue) !important; background: var(--accent-blue-light) !important; }
        .green-hover:hover { border-color: var(--accent-success) !important; background: var(--accent-success-light) !important; }
        .red-hover:hover { border-color: var(--accent-error) !important; background: var(--accent-error-light) !important; }
        .purple-hover:hover { border-color: var(--accent-purple) !important; background: var(--accent-purple-light) !important; }
        .amber-hover:hover { border-color: var(--accent-warning) !important; background: var(--accent-warning-light) !important; }
        .teal-hover:hover { border-color: var(--accent-teal) !important; background: var(--accent-teal-light) !important; }
      `}</style>
    </div>
  );
}

const FiXCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);
