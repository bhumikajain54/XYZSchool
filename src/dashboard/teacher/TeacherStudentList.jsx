import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMail, FiPhone, FiInfo, FiChevronRight, FiFilter, FiUserCheck, FiMessageSquare, FiAward, FiX, FiEdit2 } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const MY_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', roll: 'VS-001', gender: 'Male', attendance: '92%', grade: 'A+', status: 'Active', parent: 'Mr. Sharma' },
  { id: 2, name: 'Aryan Mehta', roll: 'VS-012', gender: 'Male', attendance: '88%', grade: 'B', status: 'Active', parent: 'Mr. Mehta' },
  { id: 3, name: 'Diya Patel', roll: 'VS-002', gender: 'Female', attendance: '95%', grade: 'A', status: 'Active', parent: 'Mrs. Patel' },
  { id: 4, name: 'Priya Singh', roll: 'VS-045', gender: 'Female', attendance: '72%', grade: 'C+', status: 'Warning', parent: 'Mr. Singh' },
  { id: 5, name: 'Rohan Verma', roll: 'VS-003', gender: 'Male', attendance: '85%', grade: 'B+', status: 'Active', parent: 'Mr. Verma' },
];

export default function TeacherStudentList() {
  const { addToast } = useApp();
  const navigate = useNavigate();
  const [students, setStudents] = useState(MY_STUDENTS);
  const [search, setSearch] = useState('');
  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterGender, setFilterGender] = useState('All');
  const [filterGrade, setFilterGrade] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search);
    const matchesGender = filterGender === 'All' || s.gender === filterGender;
    const matchesGrade = filterGrade === 'All' || s.grade === filterGrade;
    const matchesStatus = filterStatus === 'All' || s.status === filterStatus;

    return matchesSearch && matchesGender && matchesGrade && matchesStatus;
  });

  const viewStudent = students.find(s => s.id === viewId);
  const editStudent = students.find(s => s.id === editId);

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h3>My Class</h3>
          <p className="section-subtitle">Class 10-A • 45 Students Enrolled</p>
        </div>
        <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
          <div className="search-bar" style={{ flex: 1, minWidth: 260 }}>
            <FiSearch className="search-icon" />
            <input placeholder="Search student name or roll..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div style={{ position: 'relative' }}>
            <button
              className={`btn btn-outline btn-sm ${filterGender !== 'All' || filterGrade !== 'All' || filterStatus !== 'All' ? 'btn-primary' : ''} ${showFilters ? 'btn-primary' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filters
            </button>

            <AnimatePresence>
              {showFilters && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                    onClick={() => setShowFilters(false)}
                  />
                  <motion.div
                    className="dropdown-terminal"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      right: 0,
                      width: 320,
                      background: 'white',
                      borderRadius: 28,
                      boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                      padding: '24px',
                      zIndex: 100,
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    <div style={{ marginBottom: 20 }}>
                      <label className="form-label" style={{ fontWeight: 700, fontSize: 11, color: 'var(--text-muted)' }}>GENDER</label>
                      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                        {['All', 'Male', 'Female'].map(g => (
                          <button
                            key={g}
                            className={`btn btn-sm ${filterGender === g ? 'btn-primary' : 'btn-outline'}`}
                            onClick={(e) => { e.stopPropagation(); setFilterGender(g); }}
                            style={{ borderRadius: 12, flex: 1, fontSize: 11, padding: '6px 0' }}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <label className="form-label" style={{ fontWeight: 700, fontSize: 11, color: 'var(--text-muted)' }}>GRADE</label>
                      <select
                        className="form-select"
                        value={filterGrade}
                        onChange={e => setFilterGrade(e.target.value)}
                        style={{ marginTop: 8, borderRadius: 12, height: 44, fontSize: 13 }}
                      >
                        {['All', 'A+', 'A', 'B+', 'B', 'C+'].map(gr => <option key={gr}>{gr}</option>)}
                      </select>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label className="form-label" style={{ fontWeight: 700, fontSize: 11, color: 'var(--text-muted)' }}>STATUS</label>
                      <select
                        className="form-select"
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        style={{ marginTop: 8, borderRadius: 12, height: 44, fontSize: 13 }}
                      >
                        {['All', 'Active', 'Warning', 'Inactive'].map(st => <option key={st}>{st}</option>)}
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ flex: 1, fontSize: 12 }}
                        onClick={() => {
                          setFilterGender('All');
                          setFilterGrade('All');
                          setFilterStatus('All');
                        }}
                      >
                        Reset
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, borderRadius: 12, fontSize: 12 }}
                        onClick={() => setShowFilters(false)}
                      >
                        Apply
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="kpi-card blue">
          <div className="kpi-icon blue"><FiUserCheck /></div>
          <div className="kpi-value">91%</div>
          <div className="kpi-label">Average Attendance</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-icon green"><FiAward /></div>
          <div className="kpi-value">A</div>
          <div className="kpi-label">Class Performance Index</div>
        </div>
        <div className="kpi-card amber">
          <div className="kpi-icon amber"><FiInfo /></div>
          <div className="kpi-value">4</div>
          <div className="kpi-label">Students Needing Attention</div>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Attendance</th>
                <th>Current Grade</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, idx) => (
                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="avatar avatar-sm" style={{ background: 'var(--primary-50)', color: 'var(--primary)' }}>{s.name.charAt(0)}</div>
                      <div><strong>{s.name}</strong><br /><span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.parent}</span></div>
                    </div>
                  </td>
                  <td><span className="badge badge-gray">{s.roll}</span></td>
                  <td style={{ fontWeight: 700, color: parseInt(s.attendance) < 75 ? 'var(--accent-error)' : 'inherit' }}>{s.attendance}</td>
                  <td><span className={`badge ${s.grade.startsWith('A') ? 'badge-success' : 'badge-warning'}`}>{s.grade}</span></td>
                  <td>
                    <span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-error'}`}>{s.status}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="btn btn-outline btn-sm btn-icon"
                        style={{ width: 38, height: 38, borderRadius: 10, border: '1.5px solid var(--primary)', color: 'var(--primary)' }}
                        onClick={() => setViewId(s.id)}
                        title="View Info"
                      >
                        <FiInfo size={16} />
                      </button>
                      <button
                        className="btn btn-outline btn-sm btn-icon"
                        style={{ width: 38, height: 38, borderRadius: 10, border: '1.5px solid var(--primary)', color: 'var(--primary)' }}
                        onClick={() => setEditId(s.id)}
                        title="Edit Student"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        className="btn btn-primary btn-sm btn-icon"
                        style={{ width: 38, height: 38, borderRadius: 10, boxShadow: '0 4px 12px rgba(37,99,235,0.2)' }}
                        onClick={() => navigate('/teacher/messages')}
                        title="Message Student"
                      >
                        <FiMessageSquare size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {/* Info Modal */}
        {viewId && viewStudent && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewId(null)}>
            <motion.div className="modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
              <div className="modal-header">
                <h4 style={{ fontWeight: 800 }}>Student Profile Detail</h4>
                <button className="modal-close" onClick={() => setViewId(null)}><FiX /></button>
              </div>
              <div className="modal-body" style={{ padding: '0 32px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, padding: '24px', background: 'aliceblue', borderRadius: 24, border: '1px solid rgba(37,99,235,0.1)' }}>
                  <div className="avatar avatar-lg" style={{ fontSize: 32, background: 'var(--primary)', color: 'white', fontWeight: 800 }}>{viewStudent.name.charAt(0)}</div>
                  <div>
                    <h4 style={{ margin: 0, fontWeight: 800, color: 'var(--primary)' }}>{viewStudent.name}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>Roll No: {viewStudent.roll} • {viewStudent.gender}</p>
                  </div>
                </div>

                <div className="grid-2" style={{ gap: 20 }}>
                  <div style={{ padding: 20, background: '#f8fafc', borderRadius: 20, border: '1px solid #f1f5f9' }}>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Parent Details</p>
                    <p style={{ margin: '8px 0 0', fontWeight: 800, fontSize: 15 }}>{viewStudent.parent}</p>
                    <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                      <button className="btn btn-outline btn-sm btn-icon" style={{ borderRadius: 12 }}><FiPhone size={14} /></button>
                      <button className="btn btn-outline btn-sm btn-icon" style={{ borderRadius: 12 }}><FiMail size={14} /></button>
                    </div>
                  </div>
                  <div style={{ padding: 20, background: '#f8fafc', borderRadius: 20, border: '1px solid #f1f5f9' }}>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Performance</p>
                    <p style={{ margin: '8px 0 0', fontWeight: 800, fontSize: 15, color: '#10b981' }}>{viewStudent.grade} Grade</p>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{viewStudent.attendance} Attendance</p>
                  </div>
                </div>

                <div style={{ marginTop: 24 }}>
                  <label className="form-label" style={{ fontWeight: 700, fontSize: 12, color: 'var(--text-muted)' }}>TEACHER NOTES</label>
                  <textarea
                    className="form-input"
                    rows="3"
                    placeholder="Add private observations..."
                    style={{ borderRadius: 16, padding: 16, border: '1px solid #e2e8f0', background: '#fff' }}
                  />
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid #f1f5f9', padding: 24 }}>
                <button className="btn btn-ghost" onClick={() => setViewId(null)} style={{ fontWeight: 700 }}>Close</button>
                <button className="btn btn-primary" style={{ fontWeight: 800, padding: '10px 24px', borderRadius: 12 }} onClick={() => { addToast('success', 'Updated', 'Student notes saved successfully.'); setViewId(null); }}>Save Changes</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Quick Edit Modal */}
        {editId && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditId(null)}>
            <motion.div className="modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ maxWidth: 450 }}>
              <div className="modal-header">
                <h4 style={{ fontWeight: 800 }}>Quick Edit Student</h4>
                <button className="modal-close" onClick={() => setEditId(null)}><FiX /></button>
              </div>
              <div className="modal-body" style={{ padding: '0 32px 32px' }}>
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label" style={{ fontWeight: 700 }}>Grade/Performance</label>
                  <select className="form-input" style={{ borderRadius: 12 }} defaultValue={editStudent?.grade}>
                    <option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option>
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label" style={{ fontWeight: 700 }}>Attendance Percentage</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      className="form-input"
                      defaultValue={editStudent?.attendance?.replace('%', '')}
                      placeholder="e.g. 95"
                      style={{ borderRadius: 12, paddingRight: 40 }}
                    />
                    <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--text-muted)' }}>%</span>
                  </div>
                </div>
                <div>
                  <label className="form-label" style={{ fontWeight: 700 }}>Status</label>
                  <select className="form-input" style={{ borderRadius: 12 }} defaultValue={editStudent?.status}>
                    <option>Active</option><option>Warning</option><option>On Leave</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid #f1f5f9', padding: 24 }}>
                <button className="btn btn-ghost" onClick={() => setEditId(null)}>Cancel</button>
                <button className="btn btn-primary" style={{ fontWeight: 800, padding: '10px 24px', borderRadius: 12 }} onClick={() => { addToast('success', 'Saved', 'Student records updated.'); setEditId(null); }}>Update Record</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
