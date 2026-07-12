import React, { useState } from 'react';
import { FiCheckCircle, FiXCircle, FiClock, FiPlus, FiFilter, FiDownload, FiUser, FiBook, FiBriefcase, FiCheck, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ATTENDANCE_DATA = {
  students: [
    { id: 1, name: 'Rahul Sharma', class: '10-A', status: 'Present', time: '08:15 AM' },
    { id: 2, name: 'Ananya Iyer', class: '10-A', status: 'Absent', time: '-' },
    { id: 3, name: 'Vikram Singh', class: '10-A', status: 'Present', time: '08:20 AM' },
    { id: 4, name: 'Sanya Gupta', class: '10-A', status: 'Late', time: '08:45 AM' },
  ],
  teachers: [
    { id: 101, name: 'Dr. Ramesh Kumar', subject: 'Mathematics', status: 'Present', time: '07:55 AM' },
    { id: 102, name: 'Ms. Priya Verma', subject: 'English', status: 'Present', time: '08:05 AM' },
    { id: 103, name: 'Mr. Amit Shah', subject: 'Physics', status: 'On Leave', time: '-' },
  ],
  staff: [
    { id: 201, name: 'Suresh Raina', role: 'Security', status: 'Present', time: '06:00 AM' },
    { id: 202, name: 'Meena Devi', role: 'Cleaning', status: 'Present', time: '07:30 AM' },
  ]
};

const LEAVE_REQUESTS = [
  { id: 1, name: 'Ms. Priya Verma', role: 'Teacher', date: '2026-04-10', reason: 'Medical Checkup', status: 'Pending' },
  { id: 2, name: 'Suresh Raina', role: 'Staff', date: '2026-04-12', reason: 'Family Function', status: 'Pending' },
  { id: 3, name: 'Rahul Sharma', role: 'Student', date: '2026-04-08', reason: 'Fever', status: 'Approved' },
];

export default function AttendanceOverview() {
  const [activeTab, setActiveTab] = useState('students');
  
  console.log('--- ATTENDANCE TAB SWITCHED: ---', activeTab);
  
  const [leaves, setLeaves] = useState(LEAVE_REQUESTS);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [newLeave, setNewLeave] = useState({ name: '', date: '', reason: '' });

  const exportData = () => {
    const attendance = ATTENDANCE_DATA[activeTab];
    const roleMap = { students: 'Student', teachers: 'Teacher', staff: 'Staff' };
    const filteredLeaves = leaves.filter(l => l.role === roleMap[activeTab]);

    const workbook = XLSX.utils.book_new();
    
    // Sheet 1: Attendance
    const wsAttendance = XLSX.utils.json_to_sheet(attendance);
    XLSX.utils.book_append_sheet(workbook, wsAttendance, 'Attendance');
    
    // Sheet 2: Leaves
    const wsLeaves = XLSX.utils.json_to_sheet(filteredLeaves);
    XLSX.utils.book_append_sheet(workbook, wsLeaves, 'Leave Requests');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}_Records.xlsx`);
  };

  const handleLeaveAction = (id, status) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status } : l));
  };

  const submitLeave = (e) => {
    e.preventDefault();
    const roleMap = { students: 'Student', teachers: 'Teacher', staff: 'Staff' };
    const leaf = { 
      id: Date.now(), 
      name: newLeave.name, 
      role: roleMap[activeTab], 
      date: newLeave.date, 
      reason: newLeave.reason, 
      status: 'Pending' 
    };
    setLeaves([leaf, ...leaves]);
    setShowLeaveForm(false);
    setNewLeave({ name: '', date: '', reason: '' });
  };

  const TABS = [
    { id: 'students', label: 'Student Attendance', icon: <FiUser /> },
    { id: 'teachers', label: 'Teacher Attendance', icon: <FiBook /> },
    { id: 'staff', label: 'Staff Attendance', icon: <FiBriefcase /> },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Attendance & Leave Management</h1>
          <p className="text-slate-500">Role-based tracking and automated leave approval workflow</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowLeaveForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition shadow-md shadow-indigo-100"
          >
            <FiPlus /> Apply Leave
          </button>
          <button 
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition"
          >
            <FiDownload /> Export {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${
              activeTab === tab.id ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.icon} {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" key={`table-${activeTab}`}>
        <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-700 uppercase text-[10px] tracking-widest">Live {activeTab.slice(0, -1)} Feed</h3>
          <span className="text-[10px] font-bold text-primary bg-indigo-50 px-2 py-0.5 rounded uppercase">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/30">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase whitespace-nowrap">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase whitespace-nowrap">
                  {activeTab === 'students' ? 'Class' : activeTab === 'teachers' ? 'Subject' : 'Role'}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase whitespace-nowrap">Check-in Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="wait">
                {ATTENDANCE_DATA[activeTab].length > 0 ? (
                  ATTENDANCE_DATA[activeTab].map((row) => (
                    <motion.tr 
                      key={`${activeTab}-${row.id}`} 
                      initial={{ opacity: 0, x: -4 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 4 }}
                      className="hover:bg-slate-50/50 transition whitespace-nowrap"
                    >
                      <td className="px-6 py-4 font-inter font-semibold text-slate-700">{row.name}</td>
                      <td className="px-6 py-4 font-inter text-slate-500">
                        {activeTab === 'students' ? row.class : activeTab === 'teachers' ? row.subject : row.role}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight ${
                          row.status === 'Present' ? 'bg-emerald-50 text-secondary' : 
                          row.status === 'Absent' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-inter text-xs flex items-center gap-2">
                         <FiClock size={12} /> {row.time}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-slate-400 text-sm">No attendance records found for this category.</td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Management Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {activeTab === 'students' ? 'Student' : activeTab === 'teachers' ? 'Teacher' : 'Staff'} Leave Requests
            </h2>
            <p className="text-sm text-slate-500">Review and moderate leave applications for this category</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[100px]">
          <AnimatePresence mode="wait">
            {leaves.filter(l => {
              const roleMap = { students: 'Student', teachers: 'Teacher', staff: 'Staff' };
              return l.role === roleMap[activeTab];
            }).length > 0 ? (
              leaves
                .filter(l => {
                  const roleMap = { students: 'Student', teachers: 'Teacher', staff: 'Staff' };
                  return l.role === roleMap[activeTab];
                })
                .map(req => (
                  <motion.div 
                    key={req.id} 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition relative overflow-hidden ${req.status === 'Approved' ? 'border-l-4 border-l-emerald-500' : req.status === 'Rejected' ? 'border-l-4 border-l-rose-500' : 'border-l-4 border-l-amber-500'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-slate-800">{req.name}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{req.role} • {req.date}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                        req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                        req.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-5 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                      " {req.reason} "
                    </p>
                    {req.status === 'Pending' && (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleLeaveAction(req.id, 'Approved')}
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition"
                        >
                          <FiCheck /> Approve
                        </button>
                        <button 
                          onClick={() => handleLeaveAction(req.id, 'Rejected')}
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-rose-200 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-50 transition"
                        >
                          <FiX /> Reject
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-10 flex flex-col items-center justify-center bg-slate-50 rounded-3xl border border-slate-100"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                   <FiCheckCircle className="text-slate-300" size={24} />
                </div>
                <p className="text-sm font-bold text-slate-400">No leave requests available for {activeTab.slice(0, -1)} category</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Leave Apply Modal */}
      <AnimatePresence>
        {showLeaveForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowLeaveForm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 bg-primary text-white">
                 <h2 className="text-xl font-bold">Apply for Leave</h2>
                 <p className="text-indigo-100 text-xs">Complete the details to submit for approval</p>
              </div>
              <form onSubmit={submitLeave} className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
                  <input type="text" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500" value={newLeave.name} onChange={e => setNewLeave({...newLeave, name: e.target.value})} required placeholder="Enter your registered name" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Date</label>
                  <input type="date" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500" value={newLeave.date} onChange={e => setNewLeave({...newLeave, date: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Reason</label>
                  <textarea rows="3" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500" value={newLeave.reason} onChange={e => setNewLeave({...newLeave, reason: e.target.value})} required placeholder="Brief explanation for leave request..." />
                </div>
                <div className="flex gap-4 pt-4">
                   <button type="button" onClick={() => setShowLeaveForm(false)} className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition">Cancel</button>
                   <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">Submit Request</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
