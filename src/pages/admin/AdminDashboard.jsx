import React from 'react';
import { 
  FiUsers, FiBookOpen, FiDollarSign, FiTrendingUp, 
  FiUserCheck, FiBriefcase, FiCalendar, FiFileText, FiClock, FiActivity, FiTarget
} from 'react-icons/fi';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const kpiData = [
  { label: 'Total Students', value: '1,248', change: '+45', up: true, icon: <FiUsers />, color: 'blue' },
  { label: 'Teachers', value: '86', change: '+3', up: true, icon: <FiBookOpen />, color: 'purple' },
  { label: 'Staff Members', value: '42', change: '+2', up: true, icon: <FiBriefcase />, color: 'green' },
  { label: 'Revenue (₹)', value: '4.2L', change: '+12%', up: true, icon: <FiDollarSign />, color: 'amber' },
];

const attendanceData = [
  { month: 'Sep', present: 88, absent: 12 },
  { month: 'Oct', present: 92, absent: 8 },
  { month: 'Nov', present: 85, absent: 15 },
  { month: 'Dec', present: 79, absent: 21 },
  { month: 'Jan', present: 90, absent: 10 },
  { month: 'Feb', present: 94, absent: 6 },
  { month: 'Mar', present: 91, absent: 9 },
];

const feeData = [
  { month: 'Oct', collected: 3.2, pending: 0.8 },
  { month: 'Nov', collected: 4.0, pending: 0.6 },
  { month: 'Dec', collected: 2.8, pending: 1.2 },
  { month: 'Jan', collected: 4.5, pending: 0.5 },
  { month: 'Feb', collected: 3.9, pending: 0.7 },
  { month: 'Mar', collected: 4.2, pending: 0.4 },
];

const activities = [
  { color: '#2563EB', text: <><strong>Aryan Mehta</strong> was enrolled in Class 10-A</>, time: '2 min ago' },
  { color: '#22C55E', text: <><strong>Fee payment</strong> received from Priya Singh ₹5,200</>, time: '15 min ago' },
  { color: '#7C3AED', text: <><strong>New teacher</strong> Mrs. Kavitha joined Mathematics department</>, time: '1 hr ago' },
  { color: '#EF4444', text: <><strong>Exam results</strong> published for Class 12 Board Prep</>, time: '3 hrs ago' },
];

const UPCOMING_EVENTS = [
  { date: 'Apr 05', title: 'Parent-Teacher Meeting', time: '10:00 AM' },
  { date: 'Apr 12', title: 'Annual Cultural Fest', time: '09:00 AM' },
  { date: 'Apr 15', title: 'Final Exams Start', time: '08:30 AM' },
  { date: 'Apr 22', title: 'Summer Vacations Begin', time: '12:00 PM' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="page-enter space-y-8 sm:space-y-12">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((k, i) => (
          <motion.div 
            key={k.label} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }} 
            className={`kpi-card ${k.color}`}
          >
            <div className={`kpi-icon ${k.color}`}>{k.icon}</div>
            <div className="kpi-value text-2xl sm:text-3xl">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className={`kpi-change ${k.up ? 'up' : 'down'}`}>
              {k.up ? '↑' : '↓'} {k.change} this month
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Chart */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card">
          <div className="card-header px-4 py-5 font-bold">
            <div>
              <h5 className="text-lg">Attendance Trends</h5>
              <p className="text-xs text-slate-400 font-medium">Monthly participation rate</p>
            </div>
            <span className="badge badge-success">Live</span>
          </div>
          <div className="card-body">
            <div className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} /><stop offset="95%" stopColor="#2563EB" stopOpacity={0} /></linearGradient>
                    <linearGradient id="absentGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} /><stop offset="95%" stopColor="#EF4444" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow-lg)' }} />
                  <Legend iconType="circle" />
                  <Area type="monotone" dataKey="present" stroke="#2563EB" fill="url(#presentGrad)" strokeWidth={3} name="Present %" />
                  <Area type="monotone" dataKey="absent" stroke="#EF4444" fill="url(#absentGrad)" strokeWidth={3} name="Absent %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Fee Collection Bar Chart */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="card">
          <div className="card-header px-4 py-5 font-bold">
            <div>
              <h5 className="text-lg">Fee Collection (₹ Lakhs)</h5>
              <p className="text-xs text-slate-400 font-medium">Revenue vs Pending items</p>
            </div>
            <span className="badge badge-primary">FY 2024-25</span>
          </div>
          <div className="card-body">
            <div className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={feeData} barSize={24} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow-lg)' }} />
                  <Legend iconType="circle" />
                  <Bar dataKey="collected" fill="#22C55E" radius={[6,6,0,0]} name="Collected" />
                  <Bar dataKey="pending" fill="#F59E0B" radius={[6,6,0,0]} name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card flex flex-col h-full">
          <div className="card-header">
            <h5 className="font-bold">System Activity Log</h5>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
              <FiActivity className="text-slate-400" />
            </div>
          </div>
          <div className="card-body grow">
            <div className="space-y-1">
              {activities.map((a, i) => (
                <div key={i} className="activity-item py-4 border-b border-slate-50 last:border-0">
                  <div className="activity-dot mt-1.5" style={{ background: a.color }} />
                  <div className="flex-1">
                    <p className="activity-text text-sm leading-relaxed">{a.text}</p>
                    <p className="activity-time text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer px-6 py-4 bg-slate-50/50">
            <button className="btn btn-ghost !w-full text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">View Global Logs</button>
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="card flex flex-col h-full">
           <div className="card-header">
             <h5 className="font-bold">School Calendar</h5>
             <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
               <FiCalendar className="text-slate-400" />
             </div>
           </div>
           <div className="card-body grow p-0">
              <div className="px-6 py-2">
                {UPCOMING_EVENTS.map((e, idx) => (
                   <div key={idx} className="flex items-center gap-5 py-5 border-b border-slate-50 last:border-0 group cursor-pointer hover:bg-slate-50/50 -mx-6 px-6 transition-colors font-poppins">
                      <div className="text-center min-w-[56px] py-2 px-1 bg-blue-50/50 border border-blue-100 rounded-2xl group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                         <div className="text-blue-600 font-black text-[10px] uppercase tracking-wider group-hover:text-white transition-colors">{e.date.split(' ')[0]}</div>
                         <div className="font-black text-lg text-blue-900 group-hover:text-white transition-colors">{e.date.split(' ')[1]}</div>
                      </div>
                      <div className="flex-1">
                         <p className="font-black text-[14px] text-slate-800 leading-tight mb-1 group-hover:text-blue-600 transition-colors">{e.title}</p>
                         <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wide">
                           <FiClock size={12} className="text-blue-500" /> {e.time}
                         </p>
                      </div>
                      <button className="w-10 h-10 rounded-full border border-slate-100 bg-white shadow-sm flex items-center justify-center text-slate-300 hover:text-blue-600 hover:border-blue-200 transition-all">
                        <FiTarget size={14} />
                      </button>
                   </div>
                ))}
              </div>
           </div>
           <div className="card-footer px-6 py-4 bg-slate-50/50 border-t border-slate-100">
             <button 
               onClick={() => navigate('/admin/calendar')} 
               className="btn btn-primary !w-full !rounded-2xl !shadow-blue-500/20 text-xs font-black uppercase tracking-widest"
             >
               Manage School Calendar
             </button>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
