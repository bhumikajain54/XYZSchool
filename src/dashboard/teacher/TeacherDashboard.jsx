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
    <div className="page-enter">
      {/* Immersive Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="welcome-banner"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
          padding: '48px 60px',
          borderRadius: 32,
          color: 'white',
          marginBottom: 40,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(99,102,241,0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, flex: 1 }}>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12 }}
          >
            Welcome back, {user?.name?.split(' ')[0] || 'Teacher'}! 🍎
          </motion.h2>
          <p style={{ opacity: 0.9, fontSize: '1.2rem', fontWeight: 500, maxWidth: '500px', lineHeight: 1.5 }}>
            You have <span style={{ fontWeight: 800, color: '#fbbf24' }}>4 classes</span> and <span style={{ fontWeight: 800, color: '#fbbf24' }}>2 exams</span> on your agenda for today.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
             <button 
               className="btn" 
               style={{ 
                 background: 'rgba(255,255,255,0.2)', 
                 backdropFilter: 'blur(10px)',
                 color: 'white', 
                 fontWeight: 700, 
                 padding: '12px 32px',
                 border: '1px solid rgba(255,255,255,0.3)',
                 borderRadius: 14,
                 boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
               }}
               onClick={() => navigate('/teacher/test-schedule')}
             >
               View Full Schedule
             </button>
             <button 
               className="btn" 
               style={{ 
                 background: 'white', 
                 color: '#1E40AF', 
                 fontWeight: 800, 
                 padding: '12px 32px',
                 borderRadius: 14,
                 boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
               }}
               onClick={() => navigate('/teacher/my-class')}
             >
               My Class
             </button>
          </div>
        </div>

        {/* Atmospheric Decor */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -50, left: '20%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />
      </motion.div>

      <div className="grid-2">
        {/* Today's High-Resolution Schedule */}
        <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card" style={{ background: 'white', borderRadius: 28, border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.06)' }}>
          <div className="card-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <h5 style={{ fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>Class Schedule</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>Track your teaching slots for today</p>
            </div>
            <span style={{ padding: '6px 14px', background: 'var(--bg-secondary)', borderRadius: 20, fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="card-body" style={{ padding: '12px 32px' }}>
            {classSchedule.map((s, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ x: 6 }}
                style={{ 
                  display: 'flex', gap: 20, padding: '20px 0', 
                  borderBottom: idx < classSchedule.length - 1 ? '1px solid #f1f5f9' : 'none',
                  alignItems: 'center'
                }}
              >
                <div style={{ padding: '10px', background: s.status === 'Active' ? '#EEF2FF' : '#F8FAFC', borderRadius: 12, textAlign: 'center', minWidth: 70 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: s.status === 'Active' ? 'var(--primary)' : 'var(--text-secondary)' }}>{s.time.split(' ')[0]}</p>
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: s.status === 'Active' ? 'var(--primary)' : 'var(--text-muted)' }}>{s.time.split(' ')[1]}</p>
                </div>
                <div style={{ flex: 1 }}>
                   <p style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>{s.subject}</p>
                   <p style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 8, alignItems: 'center' }}>
                     <FiUsers style={{ fontSize: 14 }} /> Class {s.class}
                     <span style={{ opacity: 0.3 }}>|</span>
                     <FiCalendar style={{ fontSize: 14 }} /> Room {s.room}
                   </p>
                </div>
                <div>
                   {s.status === 'Active' ? (
                     <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: '#DCFCE7', color: '#15803D', borderRadius: 20, fontWeight: 800, fontSize: 11 }}>
                       <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} /> Ongoing
                     </div>
                   ) : (
                     <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: 20 }}>{s.status}</span>
                   )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notices & Events */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card">
             <div className="card-header">
                <h5>School Announcements</h5>
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/teacher/announcements')}>View All</button>
             </div>
             <div className="card-body">
                <div className="activity-item">
                   <div className="activity-dot" style={{ background: '#EF4444' }} />
                   <div>
                      <p className="activity-text"><strong>Staff Meeting:</strong> Discussion on Annual Cultural Fest preparations at 4:30 PM in Hall B.</p>
                      <p className="activity-time">10 min ago</p>
                   </div>
                </div>
                <div className="activity-item">
                   <div className="activity-dot" style={{ background: '#22C55E' }} />
                   <div>
                      <p className="activity-text"><strong>New Leave Policy:</strong> Updated guidelines for casual leave applications now available.</p>
                      <p className="activity-time">2 hrs ago</p>
                   </div>
                </div>
             </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
             <div className="card-header"><h5>Upcoming School Events</h5></div>
             <div className="card-body" style={{ padding: '8px 24px' }}>
                {UPCOMING_EVENTS.map((e, idx) => (
                   <div key={idx} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: idx < UPCOMING_EVENTS.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                      <div style={{ textAlign: 'center', minWidth: 50, padding: 6, background: 'var(--secondary)', borderRadius: 10 }}>
                         <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 11 }}>{e.date.split(' ')[0]}</div>
                         <div style={{ fontWeight: 800, fontSize: 16 }}>{e.date.split(' ')[1]}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                         <p style={{ fontWeight: 700, fontSize: 13 }}>{e.title}</p>
                         <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{e.time}</p>
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
