import React, { useState } from 'react';
import { FiCheck, FiX, FiCalendar, FiSearch, FiSave, FiAlertCircle } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';

const INIT_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', roll: 'VS-001', status: 'present' },
  { id: 2, name: 'Diya Patel', roll: 'VS-002', status: 'present' },
  { id: 3, name: 'Rohan Verma', roll: 'VS-003', status: 'present' },
  { id: 4, name: 'Ananya Reddy', roll: 'VS-004', status: 'present' },
  { id: 5, name: 'Vikram Singh', roll: 'VS-005', status: 'present' },
  { id: 6, name: 'Sonal Mehta', roll: 'VS-006', status: 'present' },
];

export default function AttendanceTaking() {
  const { addToast } = useApp();
  const [students, setStudents] = useState(INIT_STUDENTS);
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const toggleStatus = (id, status) => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  const handleSave = () => {
    addToast('success', 'Attendance Saved', `Attendance for Class ${selectedClass} on ${date} recorded.`);
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const leaveCount = students.filter(s => s.status === 'leave').length;

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h3>Take Attendance</h3>
          <p className="section-subtitle">Mark daily attendance for your assigned class</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="input-wrapper" style={{ minWidth: 160 }}>
            <span className="input-icon"><FiCalendar size={14} /></span>
            <input 
              className="form-input has-icon" 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
            />
          </div>
          <select className="form-select" value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ width: 'auto' }}>
            <option>10-A</option>
            <option>11-B</option>
          </select>
          <button className="btn btn-primary btn-sm" onClick={handleSave}><FiSave /> Save Attendance</button>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="kpi-card green">
          <div className="kpi-value">{presentCount}</div>
          <div className="kpi-label">Present</div>
        </div>
        <div className="kpi-card red">
          <div className="kpi-value">{absentCount}</div>
          <div className="kpi-label">Absent</div>
        </div>
        <div className="kpi-card amber">
          <div className="kpi-value">{leaveCount}</div>
          <div className="kpi-label">On Leave</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Class {selectedClass} Attendance List</h5>
          <div className="search-bar" style={{ flex: 1, maxWidth: 300 }}>
             <FiSearch className="search-icon" />
             <input placeholder="Search student name..." />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th style={{ textAlign: 'center' }}>Mark Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                  <td style={{ fontWeight: 600 }}>{s.roll}</td>
                  <td><strong>{s.name}</strong></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <button 
                        onClick={() => toggleStatus(s.id, 'present')}
                        className={`btn btn-sm ${s.status === 'present' ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ padding: '6px 12px', fontSize: 11 }}
                      >
                        <FiCheck style={{ marginRight: 4 }} /> Present
                      </button>
                      <button 
                        onClick={() => toggleStatus(s.id, 'absent')}
                        className={`btn btn-sm ${s.status === 'absent' ? 'btn-danger' : 'btn-ghost'}`}
                        style={{ padding: '6px 12px', fontSize: 11 }}
                      >
                        <FiX style={{ marginRight: 4 }} /> Absent
                      </button>
                      <button 
                        onClick={() => toggleStatus(s.id, 'leave')}
                        className={`btn btn-sm ${s.status === 'leave' ? 'btn-warning' : 'btn-ghost'}`}
                        style={{ padding: '6px 12px', fontSize: 11 }}
                      >
                        <FiAlertCircle style={{ marginRight: 4 }} /> Leave
                      </button>
                    </div>
                  </td>
                  <td>
                    <input className="form-input" placeholder="Optional remark..." style={{ padding: '6px 10px', fontSize: 12 }} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
