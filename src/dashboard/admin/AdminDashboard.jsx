import React from 'react';
import { 
  FiUsers, FiBookOpen, FiDollarSign, FiTrendingUp, 
  FiUserCheck, FiBriefcase, FiCalendar, FiFileText, FiClock, FiActivity
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
    <div className="page-enter">
      {/* KPI Cards */}
      <div className="grid-4 mb-24">
        {kpiData.map((k, i) => (
          <motion.div 
            key={k.label} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }} 
            className={`kpi-card ${k.color}`}
          >
            <div className={`kpi-icon ${k.color}`}>{k.icon}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className={`kpi-change ${k.up ? 'up' : 'down'}`}>
              {k.up ? '↑' : '↓'} {k.change} this month
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid-2 mb-24">
        {/* Attendance Chart */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card">
          <div className="card-header"><h5>Attendance Trends</h5><span className="badge badge-success">Live</span></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} /><stop offset="95%" stopColor="#2563EB" stopOpacity={0} /></linearGradient>
                  <linearGradient id="absentGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} /><stop offset="95%" stopColor="#EF4444" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8 }} />
                <Legend />
                <Area type="monotone" dataKey="present" stroke="#2563EB" fill="url(#presentGrad)" strokeWidth={2} name="Present %" />
                <Area type="monotone" dataKey="absent" stroke="#EF4444" fill="url(#absentGrad)" strokeWidth={2} name="Absent %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Fee Collection Bar Chart */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="card">
          <div className="card-header"><h5>Fee Collection (₹ Lakhs)</h5><span className="badge badge-primary">FY 2024-25</span></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={feeData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8 }} />
                <Legend />
                <Bar dataKey="collected" fill="#22C55E" radius={[4,4,0,0]} name="Collected" />
                <Bar dataKey="pending" fill="#F59E0B" radius={[4,4,0,0]} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid-2">
        {/* Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card">
            <div className="card-header"><h5>System Activity Log</h5><FiActivity style={{ color: 'var(--text-muted)' }} /></div>
            <div className="card-body">
              {activities.map((a, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot" style={{ background: a.color }} />
                  <div>
                    <p className="activity-text">{a.text}</p>
                    <p className="activity-time">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer" style={{ borderTop: 'none' }}><button className="btn btn-ghost btn-sm btn-full">View Global Logs</button></div>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="card">
             <div className="card-header"><h5>School Calendar</h5><FiCalendar style={{ color: 'var(--text-muted)' }} /></div>
             <div className="card-body" style={{ padding: '8px 24px' }}>
                {UPCOMING_EVENTS.map((e, idx) => (
                   <div key={idx} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: idx < UPCOMING_EVENTS.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                      <div style={{ textAlign: 'center', minWidth: 60, padding: 8, background: 'var(--secondary)', borderRadius: 12 }}>
                         <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 13, textTransform: 'uppercase' }}>{e.date.split(' ')[0]}</div>
                         <div style={{ fontWeight: 800, fontSize: 18 }}>{e.date.split(' ')[1]}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                         <p style={{ fontWeight: 700, fontSize: 14 }}>{e.title}</p>
                         <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}><FiClock size={10} /> {e.time}</p>
                      </div>
                      <button className="btn btn-ghost btn-sm btn-icon">📌</button>
                   </div>
                ))}
             </div>
             <div className="card-footer px-4 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-center">
               <button onClick={() => navigate('/admin/calendar')} className="text-xs font-bold text-primary hover:text-indigo-800 transition uppercase tracking-wider">
                 Manage School Calendar
               </button>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
