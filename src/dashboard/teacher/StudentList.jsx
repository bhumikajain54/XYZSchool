import React, { useState } from 'react';
import { FiSearch, FiPhone, FiMail, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';

const INIT_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', roll: 'VS-001', class: '10-A', gender: 'Male', contact: '9829011223', email: 'aarav@gmail.com', attendance: '92%', performance: 'Exceeding' },
  { id: 2, name: 'Diya Patel', roll: 'VS-002', class: '10-A', gender: 'Female', contact: '9414011223', email: 'diya@gmail.com', attendance: '88%', performance: 'Meeting' },
  { id: 3, name: 'Rohan Verma', roll: 'VS-003', class: '10-A', gender: 'Male', contact: '9887011223', email: 'rohan@gmail.com', attendance: '75%', performance: 'Developing' },
  { id: 4, name: 'Ananya Reddy', roll: 'VS-004', class: '10-A', gender: 'Female', contact: '9001011223', email: 'ananya@gmail.com', attendance: '95%', performance: 'Exceeding' },
];

export default function StudentList() {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('10-A');

  const filtered = INIT_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.roll.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h3>My Student List</h3>
          <p className="section-subtitle">View and manage students in your assigned classes</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <select className="form-select" value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ width: 'auto' }}>
            <option>10-A</option>
            <option>11-B</option>
          </select>
          <button className="btn btn-outline btn-sm">Export PDF</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-body" style={{ padding: '16px 20px' }}>
          <div className="search-bar">
             <FiSearch className="search-icon" />
             <input 
               placeholder="Search student by name or roll number..." 
               value={search}
               onChange={e => setSearch(e.target.value)}
             />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Roll No</th>
                <th>Attendance</th>
                <th>Performance</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <td><strong>{s.name}</strong></td>
                  <td>{s.roll}</td>
                  <td>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                       <div className="progress-bar" style={{ flex: 1, width: 40 }}><div className="progress-fill green" style={{ width: s.attendance }} /></div>
                       <span style={{ fontSize: 13, fontWeight: 600 }}>{s.attendance}</span>
                     </div>
                  </td>
                  <td>
                    <span className={`badge ${s.performance === 'Exceeding' ? 'badge-success' : s.performance === 'Meeting' ? 'badge-info' : 'badge-warning'}`}>
                       {s.performance}
                    </span>
                  </td>
                  <td>{s.contact}</td>
                  <td>{s.email}</td>
                  <td><span className="badge badge-success">Active</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
