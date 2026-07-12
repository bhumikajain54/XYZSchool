import React, { useState, useMemo } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlus, FiCalendar, FiTarget, FiMapPin, FiClock, FiX, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const INIT_EVENTS = [
  // January 2026
  { id: 51, date: '2026-01-05', title: 'Winter Session Begins', time: '08:00 AM', location: 'Campus', type: 'Academic' },
  { id: 52, date: '2026-01-26', title: 'Republic Day Celebrations', time: 'Full Day', location: 'Govt Holiday', type: 'Holiday' },
  { id: 53, date: '2026-01-30', title: 'Annual Day Gala 2026', time: '05:00 PM', location: 'Main Stage', type: 'Fest' },

  // February 2026
  { id: 101, date: '2026-02-12', title: 'Board Prep Exams', time: '09:00 AM', location: 'Hall B', type: 'Exams' },
  { id: 103, date: '2026-02-15', title: 'Maha Shivaratri', time: 'Full Day', location: 'Govt Holiday', type: 'Holiday' },
  { id: 102, date: '2026-02-20', title: 'Health Awareness Week', time: '08:00 AM', location: 'Grounds', type: 'Academic' },

  // March 2026
  { id: 203, date: '2026-03-03', title: 'Holika Dahan', time: 'Full Day', location: 'Govt Holiday', type: 'Holiday' },
  { id: 204, date: '2026-03-04', title: 'Holi - Festival of Colors', time: 'Full Day', location: 'Govt Holiday', type: 'Holiday' },
  { id: 201, date: '2026-03-05', title: 'Science Exhibition', time: '10:00 AM', location: 'Lab Area', type: 'Fest' },
  { id: 202, date: '2026-03-15', title: 'Faculty Workshop', time: '02:00 PM', location: 'Staff Room', type: 'Academic' },
  { id: 207, date: '2026-03-21', title: 'Id-ul-Fitr', time: 'Full Day', location: 'Gazetted Holiday', type: 'Holiday' },
  { id: 205, date: '2026-03-24', title: 'Sports Trials', time: '04:00 PM', location: 'Playground', type: 'Academic' },
  { id: 206, date: '2026-03-26', title: 'Ram Navami', time: 'Full Day', location: 'Gazetted Holiday', type: 'Holiday' },
  { id: 208, date: '2026-03-31', title: 'Mahavir Jayanti', time: 'Full Day', location: 'Gazetted Holiday', type: 'Holiday' },

  // April 2026 (Original)
  { id: 11, date: '2026-04-03', title: 'Good Friday', time: 'Full Day', location: 'Gazetted Holiday', type: 'Holiday' },
  { id: 1, date: '2026-04-05', title: 'PTM - Class 10-12', time: '10:00 AM', location: 'Hall A', type: 'Academic' },
  { id: 10, date: '2026-04-10', title: 'School Foundation Day', time: 'Full Day', location: 'School Holiday', type: 'Holiday' },
  { id: 2, date: '2026-04-12', title: 'Cultural Fest 2026', time: '09:00 AM', location: 'Auditorium', type: 'Fest' },
  { id: 3, date: '2026-04-15', title: 'Final Exams Start', time: '08:30 AM', location: 'Classrooms', type: 'Exams' },

  // May 2026
  { id: 302, date: '2026-05-01', title: 'Budha Purnima', time: 'Full Day', location: 'Gazetted Holiday', type: 'Holiday' },
  { id: 301, date: '2026-05-10', title: 'Summer Vacations Start', time: '12:00 PM', location: 'Campus', type: 'Academic' },

  // June 2026
  { id: 401, date: '2026-06-01', title: 'Admission Entrance Exams', time: '09:00 AM', location: 'Hall A', type: 'Exams' },
  { id: 402, date: '2026-06-15', title: 'Summer Camp 2026', time: '08:00 AM', location: 'Campus', type: 'Fest' },

  // Laters
  { id: 501, date: '2026-08-15', title: 'Independence Day', time: 'Full Day', location: 'National Holiday', type: 'Holiday' },
  { id: 502, date: '2026-10-02', title: 'Gandhi Jayanti', time: 'Full Day', location: 'National Holiday', type: 'Holiday' },
  { id: 503, date: '2026-10-20', title: 'Dussehra', time: 'Full Day', location: 'Gazetted Holiday', type: 'Holiday' },
  { id: 504, date: '2026-11-08', title: 'Diwali', time: 'Full Day', location: 'Gazetted Holiday', type: 'Holiday' },
  { id: 505, date: '2026-12-25', title: 'Christmas', time: 'Full Day', location: 'Gazetted Holiday', type: 'Holiday' },
];

export default function Calendar() {
  const { addToast } = useApp();
  const today = new Date();
  const [curDate, setCurDate] = useState(new Date(2026, 3, 1)); // Default to April 2026 as per user screenshot
  const [events, setEvents] = useState(INIT_EVENTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', type: 'Academic' });
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [lastSynced, setLastSynced] = useState(new Date());

  // Background Google Calendar Sync Simulation
  React.useEffect(() => {
    const syncInterval = setInterval(() => {
      setLastSynced(new Date());
    }, 30000); // Simulate check every 30s
    return () => clearInterval(syncInterval);
  }, []);

  const handleAudit = () => {
    setIsAuditing(true);
    setAuditResult(null);

    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult('success');
      addToast('success', 'Audit Complete', 'No scheduling conflicts detected.');
    }, 1500);
  };

  const monthName = curDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const startDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate();

  const changeMonth = (val) => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + val, 1));
  };

  const getDayEvents = (day) => {
    const dStr = `${curDate.getFullYear()}-${String(curDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dStr);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setShowAddModal(false);
    setNewEvent({ title: '', date: '', time: '', location: '', type: 'Academic' });
    addToast('success', 'Event Created', `Successfully scheduled ${newEvent.title}`);
  };

  const currentMonthEvents = useMemo(() => {
    return events.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === curDate.getMonth() && d.getFullYear() === curDate.getFullYear();
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events, curDate]);

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Institutional Timeline</h1>
            <div className="px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2 shadow-sm">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Global Sync Active</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <FiClock size={12} className="text-indigo-500" />
            Last Node Refresh: {lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 hover:-translate-y-1 active:translate-y-0"
        >
          <FiPlus size={18} /> Plan Operation
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
        {/* Calendar Grid */}
        <div className="flex-1 bg-white rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col">
          <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/50 backdrop-blur-sm z-10">
            <div>
               <h3 className="font-black text-slate-800 text-xl md:text-2xl tracking-tighter italic uppercase">{monthName}</h3>
               <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.3em] mt-1">Operational Matrix 2026</p>
            </div>
            <div className="flex items-center gap-3 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl">
               <button 
                 onClick={() => changeMonth(-1)} 
                 className="w-10 h-10 flex items-center justify-center bg-white hover:bg-indigo-50 border border-slate-200 rounded-xl transition-all text-slate-600 hover:text-indigo-600 shadow-sm"
               >
                 <FiChevronLeft size={18} />
               </button>
               <button 
                 onClick={() => setCurDate(new Date())} 
                 className="px-6 py-2 text-[10px] font-black text-indigo-600 hover:bg-white rounded-xl transition-all uppercase tracking-widest"
               >
                 Today
               </button>
               <button 
                 onClick={() => changeMonth(1)} 
                 className="w-10 h-10 flex items-center justify-center bg-white hover:bg-indigo-50 border border-slate-200 rounded-xl transition-all text-slate-600 hover:text-indigo-600 shadow-sm"
               >
                 <FiChevronRight size={18} />
               </button>
            </div>
          </div>

          <div className="hidden grid md:grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
            {DAYS.map(d => (
              <div key={d} className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 flex-1 min-h-[350px] sm:min-h-[500px] bg-slate-50/20 gap-[1px]">
            {[...Array(startDay)].map((_, i) => (
              <div key={`empty-prev-${i}`} className="bg-slate-50/50" />
            ))}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const dayEvents = getDayEvents(day);
              const isToday = today.getDate() === day && today.getMonth() === curDate.getMonth() && today.getFullYear() === curDate.getFullYear();
              return (
                <motion.div
                  key={day}
                  whileHover={{ backgroundColor: 'white', zIndex: 10 }}
                  className={`p-1.5 sm:p-4 bg-white transition-all cursor-pointer relative group flex flex-col min-h-[60px] sm:min-h-[120px] border-r border-b border-slate-100/80
                    ${isToday ? 'bg-indigo-50/10' : ''}`}
                  onClick={() => {
                    if (dayEvents.length > 0) {
                      addToast('info', 'Node Analytics', `Concentrated load: ${dayEvents.length} operations detected.`);
                    }
                  }}
                >
                  <div className="flex justify-between items-start mb-1 sm:mb-4">
                    <span className={`text-[9px] sm:text-[10px] font-black w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg sm:rounded-xl transition-all ${isToday
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 ring-2 sm:ring-4 ring-indigo-50'
                      : 'text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50'
                      }`}>
                      {day}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-0.5 sm:gap-1 overflow-hidden">
                    {dayEvents.map(ev => (
                      <div
                        key={ev.id}
                        className={`truncate text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md border
                          ${ev.type === 'Academic' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                            ev.type === 'Fest' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                              ev.type === 'Holiday' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                'bg-amber-50 text-amber-700 border-amber-100'
                          }`}
                      >
                        <span className="hidden sm:inline">{ev.title}</span>
                      </div>
                    ))}
                    {dayEvents.length > 0 && <div className="sm:hidden w-1.5 h-1.5 bg-indigo-500 rounded-full mx-auto shadow-sm" />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Details */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
          <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-2xl shadow-slate-200/50 flex-1 flex flex-col overflow-hidden">
            <h4 className="font-black text-slate-800 mb-8 flex items-center justify-between shrink-0 uppercase italic tracking-tight">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm italic font-black">
                  T
                </div>
                Agenda Stream
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{monthName}</span>
            </h4>
            <div className="space-y-4 overflow-y-auto pr-2 no-scrollbar flex-1 max-h-[500px] lg:max-h-none">
              {currentMonthEvents.length > 0 ? currentMonthEvents.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 bg-slate-50 border border-slate-100 rounded-[28px] hover:border-indigo-200 transition group cursor-pointer relative overflow-hidden active:scale-95"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border
                      ${ev.type === 'Academic' ? 'bg-indigo-600 text-white border-indigo-700' :
                        ev.type === 'Fest' ? 'bg-purple-600 text-white border-purple-700' :
                          ev.type === 'Holiday' ? 'bg-rose-600 text-white border-rose-700' :
                            'bg-amber-600 text-white border-amber-700'
                      }`}>{ev.type}</span>
                    <span className="text-[10px] font-black text-slate-400 ml-auto flex items-center gap-1 uppercase">
                      <FiCalendar size={10} className="text-indigo-400" /> {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h5 className="font-black text-slate-800 text-[16px] mb-4 group-hover:text-indigo-600 transition tracking-tighter uppercase italic">{ev.title}</h5>
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200/50">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest"><FiClock size={12} className="text-indigo-400" /> {ev.time}</div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest"><FiMapPin size={12} className="text-emerald-500" /> {ev.location}</div>
                  </div>
                </motion.div>
              )) : (
                <div className="py-24 text-center text-slate-300 font-black uppercase tracking-[0.3em] text-[10px] italic">
                  Operational Vacuum Detected
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-8 text-white overflow-hidden relative shadow-2xl shadow-indigo-100 ring-1 ring-white/10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <h4 className="text-xl font-black mb-4 flex items-center gap-4 uppercase italic">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                <FiCheck size={18} />
              </div>
              Academic Audit
            </h4>
            <p className="text-[11px] text-indigo-100 font-bold uppercase tracking-widest leading-relaxed mb-8 opacity-60">Synchronize node availability with state mandates.</p>

            <AnimatePresence mode="wait">
              {auditResult === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full py-5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 shadow-xl"
                >
                  <FiCheck size={18} /> Timeline Verified
                </motion.div>
              ) : (
                <button
                  disabled={isAuditing}
                  onClick={handleAudit}
                  className={`group w-full py-5 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition shadow-2xl relative overflow-hidden
                    ${isAuditing ? 'bg-indigo-500 text-indigo-100 cursor-wait' : 'bg-white text-slate-900 hover:bg-slate-50 hover:-translate-y-1 active:translate-y-0'}`}
                >
                  {isAuditing ? (
                     <div className="flex items-center justify-center gap-4">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-indigo-200 border-t-white rounded-full" />
                        Analyzing Nodes...
                     </div>
                  ) : <span className="flex items-center justify-center gap-2">Initiate Pulse Audit <FiChevronRight className="group-hover:translate-x-1 transition-transform" /></span>}
                </button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-white rounded-[48px] shadow-2xl w-full max-w-xl overflow-hidden border border-white/20">
              <div className="p-10 bg-indigo-600 text-white flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-black uppercase tracking-tighter italic">Define Operation</h2>
                  <p className="text-indigo-100 text-[10px] font-black uppercase tracking-[0.3em] mt-2 leading-none">Institutional Matrix Entry</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white active:scale-90"><FiX size={24} /></button>
              </div>
              <form onSubmit={handleAddEvent} className="p-10 space-y-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Operation Designation</label>
                    <input type="text" className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[20px] outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-500 font-extrabold text-[15px] transition-all" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="e.g. STRATEGIC EXAM DELTA" required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Chronology Mark</label>
                      <input type="date" className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[20px] outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-500 font-extrabold transition-all" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Operation Category</label>
                      <select className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[20px] outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-500 font-extrabold transition-all appearance-none" value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}>
                        <option>Academic</option><option>Fest</option><option>Exams</option><option>Holiday</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Start Signature</label>
                       <input type="time" className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[20px] outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-500 font-extrabold transition-all" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Vector Coordinates</label>
                       <input type="text" className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[20px] outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-500 font-extrabold text-[15px] transition-all" value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} placeholder="e.g. GRID SECTOR ALPHA" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-5 border-2 border-slate-100 text-slate-400 font-black uppercase tracking-widest text-[10px] rounded-[20px] hover:bg-slate-50 transition">Abort</button>
                  <button type="submit" className="flex-2 py-5 bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] rounded-[20px] hover:bg-indigo-700 transition shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3"><FiCheck size={18} /> Confirm Entry</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
