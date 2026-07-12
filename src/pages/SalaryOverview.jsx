import React, { useState } from 'react';
import { FiDollarSign, FiClock, FiDownload, FiCheckCircle, FiInfo, FiX, FiPrinter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const SALARY_HISTORY = [
  { id: 1, month: 'March 2024', status: 'Paid', date: '2024-04-02', gross: '65,000', net: '58,200', deductions: '6,800' },
  { id: 2, month: 'February 2024', status: 'Paid', date: '2024-03-02', gross: '65,000', net: '58,200', deductions: '6,800' },
  { id: 3, month: 'January 2024', status: 'Paid', date: '2024-02-03', gross: '65,000', net: '58,200', deductions: '6,800' },
  { id: 4, month: 'December 2023', status: 'Paid', date: '2024-01-02', gross: '65,000', net: '58,200', deductions: '6,800' },
];

export default function SalaryOverview() {
  const { addToast } = useApp();
  const [selectedMonth, setSelectedMonth] = useState('March 2024');
  const [showConfirm, setShowConfirm] = useState(null);
  const [viewDetail, setViewDetail] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadingModal, setDownloadingModal] = useState(false);

  const handleDownload = (data = null) => {
    const exportData = data ? [data] : SALARY_HISTORY;
    const csvContent = "Period,Gross,Deductions,Net,Date,Status\n" + 
       exportData.map(s => `"${s.month}","${s.gross}","${s.deductions}","${s.net}","${s.date}","${s.status}"`).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', data ? `payslip_${data.month.replace(' ', '_')}.csv` : 'salary_history_2024.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h3>Salary Overview</h3>
          <p className="section-subtitle">Track your monthly payroll and payment status</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
           <button className="btn btn-outline btn-sm" onClick={() => { addToast('info', 'Printing...', 'Preparing document for printing'); window.print(); }}><FiPrinter /> Print Records</button>
           <button className="btn btn-primary btn-sm" onClick={() => { addToast('success', 'Exporting...', 'Downloading all payroll records to CSV'); handleDownload(); }}><FiDownload /> Download All</button>
        </div>
      </div>

      <div className="grid-3 mb-24">
        <div className="kpi-card green">
          <div className="kpi-icon green"><FiCheckCircle /></div>
          <div className="kpi-value">₹58,200</div>
          <div className="kpi-label">Current Net Pay (Mar)</div>
          <div className="kpi-change up">Paid on Apr 02</div>
        </div>
        <div className="kpi-card blue">
          <div className="kpi-icon blue"><FiDollarSign /></div>
          <div className="kpi-value">₹65,000</div>
          <div className="kpi-label">Gross Salary</div>
        </div>
        <div className="kpi-card amber">
          <div className="kpi-icon amber"><FiInfo /></div>
          <div className="kpi-value">₹6,800</div>
          <div className="kpi-label">Total Deductions</div>
        </div>
      </div>

      <div className="card printable-section" id="payroll-history-card">
        <div className="card-header">
           <h5 className="print-only">Teacher Payroll Record - 2024</h5>
           <h5 className="no-print">Payroll History</h5>
           <select className="form-select no-print" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} style={{ width: 'auto' }}>
             {SALARY_HISTORY.map(s => <option key={s.month}>{s.month}</option>)}
           </select>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Gross Salary</th>
                <th>Deductions</th>
                <th>Net Paid</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {SALARY_HISTORY.map((s, i) => (
                 <tr key={s.id}>
                    <td><strong>{s.month}</strong></td>
                    <td>₹{s.gross}</td>
                    <td>₹{s.deductions}</td>
                    <td><strong className="text-primary-color">₹{s.net}</strong></td>
                    <td>{s.date || '--'}</td>
                    <td><span className="badge badge-success">{s.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        {/* Info Button - Blue Outline */}
                        <button 
                          className="btn btn-outline btn-sm" 
                          onClick={() => setViewDetail(s)} 
                          style={{ width: 34, height: 34, padding: 0, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', borderColor: 'var(--primary-200)' }}
                        >
                          <FiInfo size={16} />
                        </button>

                        {/* Download Icon - Simple */}
                        <button 
                          className={`btn btn-ghost btn-sm ${downloadingId === s.id ? 'btn-loading' : ''}`} 
                          onClick={() => {
                            setDownloadingId(s.id);
                            setTimeout(() => {
                              handleDownload(s);
                              addToast('success', 'Download Complete', `Payslip for ${s.month} has been saved.`);
                              setDownloadingId(null);
                            }, 1500);
                          }}
                          disabled={downloadingId === s.id}
                          style={{ padding: 4, minWidth: 'auto', color: downloadingId === s.id ? 'transparent' : 'var(--text-muted)' }}
                        >
                          <FiDownload size={16} />
                        </button>

                        {/* Correction Button - Red Solid */}
                        <button 
                          className="btn btn-primary btn-sm" 
                          onClick={() => setShowConfirm(s.id)}
                          style={{ width: 34, height: 34, padding: 0, borderRadius: 8, background: '#ef4444', borderColor: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(239,68,68,0.2)' }}
                        >
                          <FiX size={16} color="white" />
                        </button>
                      </div>
                    </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AnimatePresence>
        {viewDetail && (
           <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewDetail(null)}>
              <motion.div className="modal" style={{ maxWidth: 500 }} initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()}>
                 <div className="modal-header">
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                       <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-50)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiInfo /></div>
                       <div>
                          <h4 style={{ margin: 0 }}>Salary Breakdown</h4>
                          <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>{viewDetail.month} Payroll</p>
                       </div>
                    </div>
                    <button className="modal-close" onClick={() => setViewDetail(null)}><FiX /></button>
                 </div>
                 <div className="modal-body" style={{ padding: '0 40px 40px' }}>
                    <div style={{ background: 'var(--secondary)', padding: 20, borderRadius: 16, marginBottom: 24 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Gross Salary</span>
                          <span style={{ fontWeight: 700 }}>₹{viewDetail.gross}</span>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', color: '#DC2626', fontSize: 14 }}>
                          <span>Total Deductions</span>
                          <span style={{ fontWeight: 600 }}>-₹{viewDetail.deductions}</span>
                       </div>
                       <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontSize: '1.2rem' }}>
                          <span style={{ fontWeight: 800 }}>Net Paid</span>
                          <span style={{ fontWeight: 800 }}>₹{viewDetail.net}</span>
                       </div>
                    </div>

                    <h5 style={{ marginBottom: 16, fontWeight: 800 }}>Detailed Earnings</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Basic Salary</span>
                          <span>₹45,000</span>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                          <span style={{ color: 'var(--text-secondary)' }}>HRA Allowance</span>
                          <span>₹12,000</span>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Travel Allowance</span>
                          <span>₹8,000</span>
                       </div>
                    </div>

                    <h5 style={{ margin: '24px 0 16px', fontWeight: 800 }}>Mandatory Deductions</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#DC2626' }}>
                          <span>Provident Fund (PF)</span>
                          <span>₹4,800</span>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#DC2626' }}>
                          <span>Professional Tax</span>
                          <span>₹2,000</span>
                       </div>
                    </div>
                 </div>
                 <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
                    <button className="btn btn-ghost" onClick={() => { addToast('info', 'Preparing Print', 'Opening system print dialog...'); window.print(); }} disabled={downloadingModal} style={{ color: 'var(--text-muted)' }}><FiPrinter /> Print Statement</button>
                    <button 
                      className={`btn btn-primary ${downloadingModal ? 'btn-loading' : ''}`} 
                      onClick={() => {
                         setDownloadingModal(true);
                         setTimeout(() => {
                            handleDownload(viewDetail);
                            addToast('success', 'Ready to Save', `File generated for ${viewDetail.month}.`);
                            setDownloadingModal(false);
                            setViewDetail(null);
                         }, 2000);
                      }}
                      disabled={downloadingModal}
                      style={{ minWidth: 200 }}
                    >
                      {downloadingModal ? 'Generating File...' : <><FiDownload /> Download breakdown</>}
                    </button>
                 </div>
              </motion.div>
           </motion.div>
        )}

        {showConfirm && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <motion.div className="modal" style={{ maxWidth: 400 }} initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
                <div className="modal-header">
                   <h4>Confirm Request</h4>
                   <button className="modal-close" onClick={() => setShowConfirm(null)}><FiX /></button>
                </div>
                <div className="modal-body" style={{ textAlign: 'center', padding: '32px 24px' }}>
                   <div style={{ fontSize: 40, marginBottom: 16 }}>❓</div>
                   <p style={{ fontWeight: 600 }}>Request salary correction for {SALARY_HISTORY.find(s => s.id === showConfirm)?.month}?</p>
                   <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>Our accounts department will review this period and get back to you within 2-3 working days.</p>
                </div>
                <div className="modal-footer">
                   <button className="btn btn-ghost" onClick={() => setShowConfirm(null)}>Cancel</button>
                   <button className="btn btn-primary" onClick={() => { addToast('success', 'Request Sent', 'Your query has been logged.'); setShowConfirm(null); }}>Submit Request</button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
