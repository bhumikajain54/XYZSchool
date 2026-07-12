import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiDownload, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

export default function StaffAttendance() {
  const { addToast } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 2, 1)); // Default to March 2024

  const attendanceStats = [
    { label: 'Total Working', val: '24', icon: <FiCalendar />, color: 'blue' },
    { label: 'Days Present', val: '21', icon: <FiCheckCircle />, color: 'green' },
    { label: 'Days Absent', val: '02', icon: <FiXCircle />, color: 'red' },
    { label: 'Late Entries', val: '01', icon: <FiClock />, color: 'amber' },
  ];

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getStartDay = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth);
  const startDay = getStartDay(currentMonth);

  const today = new Date();
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
    const isFuture = date > today;

    return {
      day: i + 1,
      status: isFuture ? 'Upcoming' : ((i + startDay) % 7 === 0 || (i + startDay) % 7 === 6 ? 'Weekend' : (i === 5 || i === 18 ? 'Absent' : i === 12 ? 'Late' : 'Present')),
      time: isFuture || (i + startDay) % 7 === 0 || (i + startDay) % 7 === 6 ? '-' : (i === 12 ? '09:45 AM' : '09:00 AM')
    };
  });

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h3>Attendance Record</h3>
          <p className="section-subtitle">Track your daily presence and working hours</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-outline btn-sm"><FiDownload /> Download Report</button>
          <div className="search-bar" style={{ maxWidth: 200, padding: '4px 12px' }}>
            <FiFilter style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginLeft: 8 }}>
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 32 }}>
        {attendanceStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`kpi-card ${stat.color}`}
          >
            <div className="kpi-icon-small">{stat.icon}</div>
            <div className="kpi-value-small">{stat.val}</div>
            <div className="kpi-label-small">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <div className="card-header">
            <h5 style={{ flex: 1 }}>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h5>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="icon-btn" onClick={() => changeMonth(-1)}><FiChevronLeft /></button>
              <button className="icon-btn" onClick={() => changeMonth(1)}><FiChevronRight /></button>
            </div>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, textAlign: 'center', marginBottom: 12 }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{d}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
              {[...Array(startDay)].map((_, i) => (
                <div key={`empty-${i}`} style={{ aspectRatio: '1/1' }} />
              ))}
              {days.map(d => (
                <div
                  key={d.day}
                  style={{
                    aspectRatio: '1/1', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    background: d.status === 'Present' ? 'var(--accent-success-light)' :
                      d.status === 'Absent' ? 'var(--accent-error-light)' :
                        d.status === 'Late' ? 'var(--accent-warning-light)' :
                          d.status === 'Upcoming' ? 'var(--bg)' : 'var(--secondary)',
                    color: d.status === 'Present' ? 'var(--accent-success)' :
                      d.status === 'Absent' ? 'var(--accent-error)' :
                        d.status === 'Late' ? 'var(--accent-warning)' :
                          d.status === 'Upcoming' ? 'var(--text-muted)' : 'var(--text-muted)',
                    opacity: d.status === 'Upcoming' ? 0.3 : 1,
                    border: '1px solid transparent',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = 'currentColor'}
                  onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}
                >
                  {d.day}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>Daily Logs</h5>
          </div>
          <div className="table-wrapper" style={{ maxHeight: 400, overflowY: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Entry Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {days.slice().reverse().filter(d => d.status !== 'Upcoming').map(d => (
                  <tr key={d.day}>
                    <td style={{ fontWeight: 700 }}>
                      {currentMonth.toLocaleString('default', { month: 'short' })} {d.day}, {currentMonth.getFullYear()}
                    </td>
                    <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{d.time}</td>
                    <td>
                      <span className={`badge ${d.status === 'Present' ? 'badge-success' :
                          d.status === 'Absent' ? 'badge-error' :
                            d.status === 'Late' ? 'badge-warning' :
                              d.status === 'Upcoming' ? 'badge-gray' : 'badge-gray'
                        }`} style={{ opacity: d.status === 'Upcoming' ? 0.5 : 1 }}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
