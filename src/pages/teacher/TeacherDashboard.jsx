import React from 'react';
import { 
  FiUsers, FiBookOpen, FiCalendar, FiClock, 
  FiFileText, FiAward, FiCheckSquare, FiMoreVertical 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const classSchedule = [
  { time: '09:00 AM', subject: 'Mathematics', class: '10-A', room: 'Hall A', status: 'Active' },
  { time: '11:00 AM', subject: 'Algebra', class: '11-B', room: 'R-205', status: 'Next' },
  { time: '01:30 PM', subject: 'Geometry', class: '09-C', room: 'Lab-1', status: 'Upcoming' },
  { time: '03:00 PM', subject: 'Unit Test Prep', class: '10-A', room: 'Hall A', status: 'Upcoming' },
];

const UPCOMING_EVENTS = [
  { date: 'Apr 05', title: 'Parent-Teacher Meeting', time: '10:00 AM' },
  { date: 'Apr 12', title: 'Annual Cultural Fest', time: '09:00 AM' },
];

export default function TeacherDashboard() {
  const { user } = useApp();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-10 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Immersive Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="relative overflow-hidden p-8 md:p-14 lg:p-20 rounded-[40px] text-white shadow-2xl shadow-indigo-200/50 group"
        style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
        }}
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="flex-1 text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 italic uppercase"
            >
              Hi, {user?.name?.split(' ')[0] || 'Teacher'}! 🍎
            </motion.h2>
            <p className="text-white/80 text-base md:text-xl font-bold max-w-xl leading-relaxed uppercase tracking-wide">
              You have <span className="font-black text-amber-300">4 Classes</span> and <span className="font-black text-amber-300">2 Events</span> scheduled for your review today.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
               <button 
                 className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/20 transition-all shadow-xl active:scale-95"
                 onClick={() => navigate('/teacher/timetable')}
               >
                 Full Schedule
               </button>
               <button 
                 className="w-full sm:w-auto px-10 py-5 bg-white text-indigo-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-xl shadow-indigo-900/10 active:scale-95"
                 onClick={() => navigate('/teacher/attendance')}
               >
                 Academic Log
               </button>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center justify-center shrink-0">
            <div className="w-64 h-64 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-3xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-700">
               <FiBookOpen size={96} className="text-white/10" />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[120px]" />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Today's High-Resolution Schedule */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm ring-1 ring-slate-100 flex flex-col">
          <div className="p-8 md:p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
            <div>
              <h5 className="font-black text-lg text-slate-800 uppercase tracking-tight">Institutional Load</h5>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Teaching matrices today</p>
            </div>
            <div className="bg-white px-5 py-2.5 rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 shadow-sm">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>
          <div className="p-4 md:p-8 divide-y divide-slate-50">
            {classSchedule.map((s, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-center gap-6 p-6 group transition-all rounded-[32px] hover:bg-slate-50/50 cursor-default"
              >
                <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 transition-all border shadow-sm
                  ${s.status === 'Active' ? 'bg-indigo-600 text-white border-indigo-700 shadow-indigo-100' : 'bg-white text-slate-400 border-slate-100 group-hover:bg-slate-50'}`}>
                  <p className="text-lg font-black leading-none mb-1 tracking-tighter italic">{s.time.split(' ')[0]}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-80">{s.time.split(' ')[1]}</p>
                </div>
                <div className="flex-1 min-w-0">
                   <p className="font-black text-base md:text-lg text-slate-800 mb-1.5 truncate group-hover:text-indigo-600 transition-colors uppercase italic tracking-tight">{s.subject}</p>
                   <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <FiUsers className="text-indigo-300" size={12} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.class}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-indigo-300" size={12} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.room}</span>
                      </div>
                   </div>
                </div>
                <div className="hidden sm:flex shrink-0">
                   {s.status === 'Active' ? (
                     <div className="flex items-center gap-2.5 px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-emerald-100 shadow-sm animate-pulse">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        Live Session
                     </div>
                   ) : (
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 bg-white px-5 py-2.5 rounded-full border border-slate-100/50 group-hover:border-slate-200 transition-colors">{s.status}</span>
                   )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notices & Events */}
        <div className="space-y-8 flex flex-col h-full">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-slate-900 rounded-[40px] border-0 text-white shadow-2xl shadow-slate-900/10 flex flex-col overflow-hidden group">
             <div className="p-8 md:p-10 border-b border-white/5 flex items-center justify-between">
                <div>
                   <h5 className="font-black text-white uppercase italic tracking-tight text-sm">Critical Bulletins</h5>
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Staff Alerts</p>
                </div>
                <button className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue-400 hover:bg-white/10 hover:text-white transition-all shadow-inner" onClick={() => navigate('/teacher/announcements')}>
                   <FiMoreVertical />
                </button>
             </div>
             <div className="p-6 md:p-10 grow space-y-2">
                <div className="flex gap-6 p-6 rounded-[32px] hover:bg-white/[0.02] transition-colors border border-transparent">
                   <div className="w-2.5 h-2.5 rounded-full mt-1.5 shadow-[0_0_15px_rgba(239,68,68,0.5)] bg-rose-500 shrink-0" />
                   <div>
                      <p className="text-white/90 text-sm font-bold leading-relaxed tracking-tight underline decoration-rose-500/30 underline-offset-4 decoration-2">Emergency Staff Audit Discussion</p>
                      <p className="text-[11px] text-white/50 font-black uppercase tracking-widest mt-4 flex items-center gap-2.5 group-hover:text-blue-400 transition-colors"><FiClock size={12} /> Synchronized 10m ago</p>
                   </div>
                </div>
                <div className="flex gap-6 p-6 rounded-[32px] hover:bg-white/[0.02] transition-colors border border-transparent">
                   <div className="w-2.5 h-2.5 rounded-full mt-1.5 shadow-[0_0_15px_rgba(34,200,94,0.5)] bg-emerald-500 shrink-0" />
                   <div>
                      <p className="text-white/90 text-sm font-bold leading-relaxed tracking-tight underline decoration-emerald-500/30 underline-offset-4 decoration-2">Institutional Leave Policy Revision</p>
                      <p className="text-[11px] text-white/50 font-black uppercase tracking-widest mt-4 flex items-center gap-2.5 group-hover:text-blue-400 transition-colors"><FiClock size={12} /> Synchronized 2h ago</p>
                   </div>
                </div>
             </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm ring-1 ring-slate-100 flex flex-col">
             <div className="p-8 md:p-10 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h5 className="font-black text-slate-800 uppercase italic tracking-tight text-sm">Upcoming Agenda</h5>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Calendar Milestones</p>
                </div>
                <FiCalendar className="text-slate-200" size={24} />
             </div>
             <div className="p-4 md:p-8 space-y-2">
                  {UPCOMING_EVENTS.map((e, idx) => (
                    <div key={idx} className="flex items-center gap-6 p-6 rounded-[32px] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 cursor-pointer shadow-none hover:shadow-sm">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl border border-blue-100/50 flex flex-col items-center justify-center shrink-0">
                          <div className="text-blue-600 font-black text-[9px] uppercase tracking-widest opacity-60 leading-none mb-1">{e.date.split(' ')[0]}</div>
                          <div className="font-black text-2xl text-blue-900 tracking-tighter leading-none">{e.date.split(' ')[1]}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-base text-slate-800 mb-1.5 uppercase italic tracking-tight truncate">{e.title}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 leading-none"><FiClock size={12} className="text-blue-400 shrink-0" /> {e.time}</p>
                        </div>
                    </div>
                  ))}
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
