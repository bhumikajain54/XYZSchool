import React, { useState } from 'react';
import { FiX, FiBell, FiSearch, FiFilter } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const TEACHER_ANNOUNCEMENTS = [
  { id: 1, title: 'Staff Meeting', content: 'Discussion on Annual Cultural Fest preparations at 4:30 PM in Hall B. Attendance is mandatory for all department heads.', date: '2025-04-04', time: '10 min ago', priority: 'High', type: 'Administrative' },
  { id: 2, title: 'New Leave Policy', content: 'Updated guidelines for casual leave applications are now available in the staff handbook. Please review the changes starting today.', date: '2025-04-04', time: '2 hrs ago', priority: 'Medium', type: 'Policy' },
  { id: 3, title: 'Annual Cultural Fest', content: 'Preparations for the upcoming cultural fest are in full swing. Volunteers can register at the main office.', date: '2025-04-01', time: '3 days ago', priority: 'Medium', type: 'Event' },
  { id: 4, title: 'Semester Result Deadline', content: 'Final marks entry for Semester 1 must be completed by April 10th. Please ensure all internal assessments are uploaded.', date: '2025-03-30', time: '5 days ago', priority: 'High', type: 'Academic' },
  { id: 5, title: 'Tech Symposium 2025', content: 'XYZ School is hosting a regional Tech Symposium. Teachers interested in mentoring student projects should contact the coordinator.', date: '2025-03-25', time: '1 week ago', priority: 'Low', type: 'Event' },
];

const priorityStyles = {
  High: 'badge-error',
  Medium: 'badge-warning',
  Low: 'badge-success',
};

export default function TeacherAnnouncements() {
  const [announcements] = useState(TEACHER_ANNOUNCEMENTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedNotice, setSelectedNotice] = useState(null);

  const types = ['All', 'Administrative', 'Policy', 'Event', 'Academic', 'Exam'];

  const filtered = announcements.filter(a => 
    (filter === 'All' || a.type === filter) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h3>School Announcements</h3>
          <p className="section-subtitle">Stay updated with the latest notices and policy changes</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <div className="search-bar" style={{ minWidth: 320, background: 'var(--bg-card)' }}>
            <FiSearch className="search-icon" />
            <input 
              placeholder="Filter by title or keyword..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              style={{ background: 'transparent' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '4px 0' }}>
            {types.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: filter === t ? 'var(--primary)' : 'var(--border)',
                  background: filter === t ? 'var(--primary)' : 'var(--bg-card)',
                  color: filter === t ? 'white' : 'var(--text-secondary)',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-3 mb-24" style={{ gap: 20 }}>
         <motion.div whileHover={{ y: -4 }} className="kpi-card" style={{ borderLeft: '4px solid var(--accent-error)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="kpi-icon" style={{ background: '#FEE2E2', color: '#DC2626', margin: 0 }}><FiBell /></div>
            <div>
              <div className="kpi-value" style={{ fontSize: '1.4rem' }}>{announcements.filter(a => a.priority === 'High').length}</div>
              <div className="kpi-label" style={{ marginTop: 0 }}>High Priority Notifications</div>
            </div>
         </motion.div>
         <motion.div whileHover={{ y: -4 }} className="kpi-card" style={{ borderLeft: '4px solid var(--primary)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="kpi-icon" style={{ background: 'var(--primary-100)', color: 'var(--primary)', margin: 0 }}><FiFilter /></div>
            <div>
              <div className="kpi-value" style={{ fontSize: '1.4rem' }}>{announcements.length}</div>
              <div className="kpi-label" style={{ marginTop: 0 }}>Active School Notices</div>
            </div>
         </motion.div>
         <motion.div whileHover={{ y: -4 }} className="kpi-card" style={{ borderLeft: '4px solid #22C55E', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="kpi-icon" style={{ background: '#DCFCE7', color: '#15803D', margin: 0 }}><FiBell /></div>
            <div>
              <div className="kpi-value" style={{ fontSize: '1.4rem' }}>2</div>
              <div className="kpi-label" style={{ marginTop: 0 }}>New Announcements Today</div>
            </div>
         </motion.div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.length === 0 ? (
          <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
             <p style={{ color: 'var(--text-muted)' }}>No announcements found Matching your criteria.</p>
          </div>
        ) : (
          filtered.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 8 }}
              className="card"
              style={{ 
                borderLeft: `5px solid ${a.priority === 'High' ? '#DC2626' : a.priority === 'Medium' ? '#F59E0B' : '#22C55E'}`,
                padding: '20px 28px',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedNotice(a)}
            >
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                  <div style={{ flex: 1 }}>
                     <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                        <span style={{ 
                          fontSize: 10, fontWeight: 800, textTransform: 'uppercase', 
                          padding: '3px 10px', borderRadius: 6,
                          background: a.priority === 'High' ? '#FEE2E2' : '#F3F4F6',
                          color: a.priority === 'High' ? '#DC2626' : '#64748B'
                        }}>{a.priority} Priority</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)' }}>• {a.type}</span>
                     </div>
                     <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{a.title}</h4>
                     <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, maxWidth: '900px' }}>{a.content}</p>
                     
                     <div style={{ display: 'flex', gap: 16, marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                           <FiBell style={{ fontSize: 14 }} /> <span>Posted {a.time}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                           <span>{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                     </div>
                  </div>
                  <button 
                    className="btn btn-ghost btn-sm" 
                    style={{ border: '1px solid var(--border)' }}
                    onClick={(e) => { e.stopPropagation(); setSelectedNotice(a); }}
                  >
                    View Details
                  </button>
               </div>
            </motion.div>
          ))
        )}
      </div>
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="modal-overlay" onClick={() => setSelectedNotice(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal" 
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: 600 }}
            >
              <div className="modal-header">
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ 
                    width: 40, height: 40, borderRadius: 10, background: 'var(--primary-50)', 
                    color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <FiBell />
                  </div>
                  <div>
                    <h4 style={{ margin: 0 }}>Notice Details</h4>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>ID: #NOTIF-02{selectedNotice.id}</p>
                  </div>
                </div>
                <button className="modal-close" onClick={() => setSelectedNotice(null)}><FiX /></button>
              </div>
              
              <div className="modal-body">
                <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                  <span className={`badge ${selectedNotice.priority === 'High' ? 'badge-error' : 'badge-primary'}`}>
                    {selectedNotice.priority} Priority
                  </span>
                  <span className="badge badge-gray">{selectedNotice.type}</span>
                </div>
                
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 16 }}>{selectedNotice.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, background: 'var(--secondary)', padding: 20, borderRadius: 12 }}>
                  {selectedNotice.content}
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24, padding: '16px', border: '1px dashed var(--border)', borderRadius: 10 }}>
                   <div>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Publish Date</p>
                      <p style={{ fontWeight: 700, margin: 0, fontSize: 14 }}>{new Date(selectedNotice.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                   </div>
                   <div>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Time Relative</p>
                      <p style={{ fontWeight: 700, margin: 0, fontSize: 14 }}>{selectedNotice.time}</p>
                   </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button className="btn btn-primary btn-full" onClick={() => setSelectedNotice(null)}>Understand & Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

