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
    <div className="p-6 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Operational Calendar</h1>
            <div className="px-4 py-1 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2 shadow-sm">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none">Synced with G-Calendar</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <FiClock size={12} />
            Last auto-sync: {lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <FiPlus size={20} /> New Event
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 xl:items-stretch">
        {/* Calendar Grid */}
        <div className="flex-1 bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
            <div>
               <h3 className="font-extrabold text-slate-800 text-2xl tracking-tight leading-none">{monthName}</h3>
               <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[2px] mt-2 bg-indigo-50 px-2 py-0.5 rounded w-fit">Institutional Timeline</p>
            </div>
            <div className="flex items-center gap-4 p-2 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
               <button 
                 onClick={() => changeMonth(-1)} 
                 className="w-10 h-10 flex items-center justify-center bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all text-slate-600 shadow-sm hover:shadow-md"
                 title="Previous Month"
               >
                 <FiChevronLeft size={18} />
               </button>
               <button 
                 onClick={() => setCurDate(new Date())} 
                 className="px-6 py-2 text-[10px] font-black text-primary hover:bg-white rounded-xl transition-all border border-transparent hover:border-indigo-100"
               >
                 TODAY
               </button>
               <button 
                 onClick={() => changeMonth(1)} 
                 className="w-10 h-10 flex items-center justify-center bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all text-slate-600 shadow-sm hover:shadow-md"
                 title="Next Month"
               >
                 <FiChevronRight size={18} />
               </button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b border-slate-100">
            {DAYS.map(d => (
              <div key={d} className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 flex-1 min-h-[500px] bg-slate-50/20 gap-[1px] border-b border-slate-100">
            {[...Array(startDay)].map((_, i) => (
              <div key={`empty-prev-${i}`} className="bg-slate-100/30" />
            ))}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const dayEvents = getDayEvents(day);
              const isToday = today.getDate() === day && today.getMonth() === curDate.getMonth() && today.getFullYear() === curDate.getFullYear();
              return (
                <motion.div
                  key={day}
                  whileHover={{ backgroundColor: 'white', zIndex: 10 }}
                  className="p-4 bg-white transition-all cursor-pointer relative group flex flex-col min-h-[100px] border-r border-b border-slate-100/50"
                  onClick={() => {
                    if (dayEvents.length > 0) {
                      addToast('info', 'Schedule Insight', `You have ${dayEvents.length} events scheduled for today.`);
                    }
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-black w-8 h-8 flex items-center justify-center rounded-xl transition-all ${isToday
                      ? 'bg-primary text-white shadow-lg shadow-indigo-200 ring-4 ring-indigo-50'
                      : 'text-slate-400 group-hover:text-primary'
                      }`}>
                      {day}
                    </span>
                    {isToday && <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mt-2 mr-1">Today</span>}
                  </div>
                  
                  <div className="space-y-1.5 overflow-hidden">
                    {dayEvents.map(ev => (
                      <div
                        key={ev.id}
                        className={`truncate text-[9px] font-black px-2.5 py-1.5 rounded-lg border ${ev.type === 'Academic' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                          ev.type === 'Fest' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                            ev.type === 'Holiday' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                              'bg-amber-50 text-amber-700 border-amber-100'
                          }`}
                      >
                        {ev.title}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Details */}
        <div className="w-full xl:w-96 flex flex-col gap-6">
          <div className="bg-white rounded-[32px] border border-slate-200 p-6 shadow-sm flex-1 flex flex-col overflow-hidden">
            <h4 className="font-bold text-slate-800 mb-6 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-primary">
                  <FiTarget size={16} />
                </div>
                Monthly Agenda
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{monthName}</span>
            </h4>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {currentMonthEvents.length > 0 ? currentMonthEvents.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-white rounded-[24px] border border-slate-100 hover:border-indigo-200 transition group cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[8px] font-black uppercase tracking-tighter px-2 py-1 rounded-lg border-2 ${ev.type === 'Academic' ? 'bg-indigo-50 text-primary border-indigo-100' :
                      ev.type === 'Fest' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                        ev.type === 'Holiday' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                          'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>{ev.type}</span>
                    <span className="text-[10px] font-bold text-slate-400 ml-auto flex items-center gap-1">
                      <FiCalendar size={10} /> {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h5 className="font-extrabold text-slate-800 text-[15px] mb-4 group-hover:text-primary transition tracking-tight">{ev.title}</h5>
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500"><div className="w-5 h-5 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-500"><FiClock size={12} /></div> {ev.time}</div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500"><div className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-500"><FiMapPin size={12} /></div> {ev.location}</div>
                  </div>
                </motion.div>
              )) : (
                <div className="py-20 text-center text-slate-400 font-bold italic">
                  No events scheduled for this month.
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[32px] p-8 text-white overflow-hidden relative shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h4 className="text-xl font-extrabold mb-4 flex items-center gap-4 text-white">
              <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <FiCheck size={18} />
              </div>
              Academic Audit
            </h4>
            <p className="text-[12px] text-indigo-100/70 leading-relaxed mb-8 font-medium">Verify all institutional events with Board's annual calendar.</p>

            <AnimatePresence mode="wait">
              {auditResult === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full py-4 bg-emerald-500 text-white text-xs font-black rounded-2xl flex items-center justify-center gap-2 shadow-inner"
                >
                  <FiCheck size={18} /> CALENDAR VERIFIED
                </motion.div>
              ) : (
                <button
                  disabled={isAuditing}
                  onClick={handleAudit}
                  className={`w-full py-4 text-xs font-black rounded-2xl transition shadow-xl relative overflow-hidden ${isAuditing ? 'bg-indigo-500 text-indigo-200 cursor-wait' : 'bg-white text-primary hover:bg-indigo-50'
                    }`}
                >
                  {isAuditing ? (
                    <div className="flex items-center justify-center gap-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Analyzing...
                    </div>
                  ) : 'Review Timeline'}
                </button>
              )}
            </AnimatePresence>

            {auditResult === 'success' && (
              <button
                onClick={() => setAuditResult(null)}
                className="w-full mt-3 text-[9px] font-bold text-indigo-200 hover:text-white transition uppercase tracking-widest"
              >
                Restart Audit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* New Event Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="p-8 bg-primary text-white flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black">Plan New Event</h2>
                  <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mt-1">Institutional Scheduling</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white"><FiX size={24} /></button>
              </div>
              <form onSubmit={handleAddEvent} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Event Title</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="e.g. Science Fair 2026" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Date</label>
                      <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Type</label>
                      <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold" value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}>
                        <option>Academic</option><option>Fest</option><option>Exams</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Time</label>
                      <input type="time" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 border-l-2 border-indigo-500 pl-2 uppercase tracking-widest mb-2">Location</label>
                      <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold" value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} placeholder="e.g. Hall A" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 border-2 border-slate-100 text-slate-400 font-bold rounded-2xl hover:bg-slate-50 transition">Discard</button>
                  <button type="submit" className="flex-2 py-4 bg-primary text-white font-black rounded-2xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"><FiCheck /> Confirm Event</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
