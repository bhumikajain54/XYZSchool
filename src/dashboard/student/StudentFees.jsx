import React, { useState } from 'react';
import { 
  FiCheckCircle, FiAlertCircle, FiDownload, FiCreditCard, 
  FiX, FiLock, FiCheck, FiSmartphone, FiHome, FiFileText 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import jsPDF from 'jspdf';

const INITIAL_FEES = [
  { id: 1, term: 'Term 1 (Apr–Jun)', amount: 10000, paid: 10000, date: '2024-04-15', receipt: 'RCP-2024-001', status: 'Paid', method: 'Online' },
  { id: 2, term: 'Term 2 (Jul–Sep)', amount: 10000, paid: 10000, date: '2024-07-18', receipt: 'RCP-2024-057', status: 'Paid', method: 'Cheque' },
  { id: 3, term: 'Term 3 (Oct–Dec)', amount: 8000, paid: 0, date: null, receipt: null, status: 'Pending', method: '-' },
];

const feeBreakdown = [
  { item: 'Tuition Fee', amount: 7000 },
  { item: 'Exam Fee', amount: 500 },
  { item: 'Lab Fee', amount: 300 },
  { item: 'Sports Fee', amount: 200 },
  { item: 'Library Fee', amount: 0, note: 'Waived' },
];

export default function StudentFees() {
  const { addToast, user } = useApp();
  const [fees, setFees] = useState(INITIAL_FEES);
  const [paymentModal, setPaymentModal] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paying, setPaying] = useState(false);

  const totalPaid = fees.filter(f => f.status === 'Paid').reduce((a, b) => a + b.paid, 0);
  const totalPending = fees.filter(f => f.status === 'Pending').reduce((a, b) => a + b.amount, 0);

  const handleDownloadReceipt = (fee) => {
     addToast('info', 'Generating Receipt', 'Finalizing institutional receipt PDF...');
     const doc = new jsPDF();
     
     // Institutional Heading
     doc.setFontSize(20);
     doc.setTextColor(30, 41, 59);
     doc.text('XYZ Higher Secondary School', 105, 20, { align: 'center' });
     
     doc.setFontSize(10);
     doc.setTextColor(100, 116, 139);
     doc.text('Official Fee Receipt • Academic Year 2024-25', 105, 28, { align: 'center' });
     doc.line(20, 35, 190, 35);
     
     // Transaction Details
     doc.setFontSize(12);
     doc.setTextColor(30, 41, 59);
     doc.text(`Receipt No: ${fee.receipt || 'PENDING'}`, 20, 45);
     doc.text(`Date: ${fee.date || 'N/A'}`, 140, 45);
     
     doc.setFontSize(11);
     doc.text('Student Information:', 20, 60);
     doc.setFontSize(10);
     doc.text(`Name: ${user?.name || 'Vikas Jain'}`, 20, 68);
     doc.text(`Class: 10th-A`, 20, 74);
     doc.text(`Student ID: VHSS-2024-1024`, 20, 80);
     
     doc.line(20, 88, 190, 88);
     
     // Fee Table
     doc.setFontSize(11);
     doc.text('Description', 20, 98);
     doc.text('Amount (INR)', 160, 98);
     doc.line(20, 102, 190, 102);
     
     doc.setFontSize(10);
     doc.text(fee.term, 20, 112);
     doc.text(`Rs. ${fee.amount.toLocaleString()}.00`, 160, 112);
     
     doc.line(20, 120, 190, 120);
     doc.setFontSize(12);
     doc.text('TOTAL PAID', 20, 130);
     doc.text(`Rs. ${fee.paid.toLocaleString()}.00`, 160, 130);
     
     // Footer
     doc.setFontSize(9);
     doc.setTextColor(150, 150, 150);
     doc.text('This is a computer-generated receipt and does not require a physical signature.', 105, 280, { align: 'center' });
     
     doc.save(`Receipt_${fee.receipt || 'fee'}.pdf`);
     addToast('success', 'Download Complete', 'Your receipt has been saved.');
  };

  const handlePayment = async () => {
    setPaying(true);
    await new Promise(r => setTimeout(r, 2000));
    const newReceipt = 'RCP-2024-' + Math.floor(Math.random()*999);
    setFees(fees.map(f => f.id === paymentModal.id ? { 
      ...f, 
      status: 'Paid', 
      paid: f.amount,
      date: new Date().toISOString().split('T')[0], 
      receipt: newReceipt, 
      method: paymentMethod.toUpperCase() 
    } : f));
    setPaying(false);
    setPaymentModal(null);
    addToast('success', 'Payment Successful', `Fee for ${paymentModal.term} has been processed via ${paymentMethod.toUpperCase()}.`);
  };

  return (
    <div className="page-enter">
      <div className="section-header">
        <div><h3 style={{ fontWeight: 800 }}>Financial Ledger</h3><p className="section-subtitle">Academic Year 2024-25 • Session Log</p></div>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Paid', value: `₹${totalPaid.toLocaleString()}`, icon: <FiCheckCircle />, color: 'green', badge: 'Settled' },
          { label: 'Outstanding', value: `₹${totalPending.toLocaleString()}`, icon: <FiAlertCircle />, color: 'amber', badge: 'Due' },
          { label: 'Annual Total', value: '₹28,000', icon: <FiFileText />, color: 'blue', badge: 'Institutional' },
        ].map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`kpi-card ${k.color}`} style={{ borderRadius: 24 }}>
            <div className={`kpi-icon ${k.color}`}>{k.icon}</div>
            <div className="kpi-value" style={{ fontWeight: 900 }}>{k.value}</div>
            <div className="kpi-label" style={{ fontWeight: 700, fontSize: 12 }}>{k.label}</div>
            <span className={`badge ${k.color === 'green' ? 'badge-success' : k.color === 'amber' ? 'badge-warning' : 'badge-primary'}`} style={{ marginTop: 12, width: 'fit-content', borderRadius: 8, padding: '4px 12px' }}>{k.badge}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card">
          <div className="card-header"><h5>Transaction History</h5></div>
          <div className="card-body" style={{ padding: 0 }}>
            {fees.map((f, i) => (
              <div key={f.id} style={{ padding: '24px', borderBottom: i < fees.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <label style={{ fontWeight: 800, fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{f.term}</label>
                    <h5 style={{ marginTop: 4, fontSize: '1.4rem', fontWeight: 900 }}>₹{f.amount.toLocaleString()}</h5>
                  </div>
                  <span className={`badge ${f.status === 'Paid' ? 'badge-success' : 'badge-warning'}`} style={{ borderRadius: 8, padding: '6px 14px', fontWeight: 800 }}>{f.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {f.date ? <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Cleared on {f.date} via {f.method}</p> : <p style={{ fontSize: 12, color: 'var(--accent-error)', fontWeight: 700 }}>⚠️ PAYMENT REQUIRED</p>}
                    <div style={{ display: 'flex', gap: 8 }}>
                        {f.status === 'Paid' ? (
                          <button 
                            className="btn btn-outline btn-sm" 
                            style={{ 
                              fontWeight: 800, color: 'var(--primary)', background: 'white', 
                              border: '1px solid var(--border)', borderRadius: 10, height: 36, display: 'flex', gap: 6, alignItems: 'center' 
                            }} 
                            onClick={() => handleDownloadReceipt(f)}
                          >
                             <FiDownload size={14} /> Receipt
                          </button>
                        ) : (
                          <button 
                            className="btn btn-outline btn-sm" 
                            style={{ 
                              borderRadius: 10, fontWeight: 800, height: 38, 
                              background: 'white', color: 'var(--primary)', border: '1px solid var(--border)',
                              padding: '0 20px'
                            }} 
                            onClick={() => setPaymentModal(f)}
                          >
                            Secure Checkout
                          </button>
                        )}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card">
          <div className="card-header"><h5>Fee Breakdown (Per Term)</h5></div>
          <div className="card-body" style={{ padding: '24px 32px' }}>
            {feeBreakdown.map((f, i) => (
              <div key={f.item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < feeBreakdown.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-secondary)' }}>{f.item}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {f.note && <span className="badge badge-success" style={{ fontSize: 10, fontWeight: 800 }}>{f.note}</span>}
                  <span style={{ fontWeight: 900, fontSize: 15 }}>{f.amount === 0 ? '—' : `₹${f.amount.toLocaleString()}`}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 20, padding: '20px 24px', background: 'var(--primary-50)', borderRadius: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--primary-100)' }}>
              <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 14 }}>Term Outstanding</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 950, color: 'var(--primary)' }}>₹8,000</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {paymentModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <motion.div className="modal" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} style={{ maxWidth: 480, borderRadius: 32 }}>
                <div className="modal-header" style={{ padding: '28px 32px' }}>
                   <h4 style={{ fontWeight: 800 }}>Secure Gateway</h4>
                   <button className="modal-close" onClick={() => setPaymentModal(null)}><FiX /></button>
                </div>
                <div className="modal-body" style={{ padding: '0 32px 32px' }}>
                   <div style={{ padding: '20px', background: 'var(--primary-50)', borderRadius: 20, marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--primary-100)' }}>
                      <div>
                         <p style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>Payee Account</p>
                         <p style={{ fontWeight: 800, fontSize: 15 }}>{paymentModal.term}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                         <p style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>INR Amount</p>
                         <p style={{ fontWeight: 950, fontSize: 20 }}>₹{paymentModal.amount.toLocaleString()}</p>
                      </div>
                   </div>

                   <label className="form-label" style={{ fontWeight: 800, marginBottom: 12 }}>Select Payment Method</label>
                   <div className="grid-3" style={{ gap: 12, marginBottom: 24 }}>
                      {[
                        { id: 'card', label: 'Card', icon: <FiCreditCard /> },
                        { id: 'upi', label: 'UPI', icon: <FiSmartphone /> },
                        { id: 'bank', label: 'Net Bank', icon: <FiHome /> },
                      ].map(m => (
                        <button 
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id)}
                          style={{ 
                            padding: '16px 12px', 
                            borderRadius: 16, 
                            border: '1px solid',
                            borderColor: paymentMethod === m.id ? 'var(--primary)' : 'var(--border)',
                            background: paymentMethod === m.id ? 'var(--primary-50)' : 'white',
                            color: paymentMethod === m.id ? 'var(--primary)' : 'var(--text-muted)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 8,
                            fontWeight: 800,
                            fontSize: 12,
                            transition: 'all 0.2s'
                          }}
                        >
                           {m.icon}
                           {m.label}
                        </button>
                      ))}
                   </div>

                   {paymentMethod === 'card' && (
                     <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="form-group">
                           <label className="form-label">Cardholder Name</label>
                           <input className="form-input" placeholder="e.g. Vikas Jain" defaultValue={user?.name} style={{ borderRadius: 12 }} />
                        </div>
                        <div className="form-group">
                           <label className="form-label">Card Number</label>
                           <div style={{ position: 'relative' }}>
                             <FiCreditCard style={{ position: 'absolute', left: 16, top: 14, color: 'var(--text-muted)' }} />
                             <input className="form-input" style={{ paddingLeft: 44, borderRadius: 12 }} placeholder="XXXX XXXX XXXX XXXX" defaultValue="4242 4242 4242 4242" />
                           </div>
                        </div>
                        <div className="grid-2">
                           <div className="form-group">
                              <label className="form-label">Expiry</label>
                              <input className="form-input" placeholder="MM/YY" defaultValue="12/28" style={{ borderRadius: 12 }} />
                           </div>
                           <div className="form-group">
                              <label className="form-label">CVV</label>
                              <input className="form-input" type="password" placeholder="***" defaultValue="123" style={{ borderRadius: 12 }} />
                           </div>
                        </div>
                     </motion.div>
                   )}

                   {paymentMethod === 'upi' && (
                     <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ width: 120, height: 120, background: '#f1f5f9', borderRadius: 20, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border)' }}>
                           <FiSmartphone size={40} color="var(--text-muted)" />
                        </div>
                        <p style={{ fontWeight: 800, fontSize: 14 }}>Scan with your UPI App</p>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>GPay, PhonePe, Paytm supported</p>
                        <div className="form-group" style={{ marginTop: 20, textAlign: 'left' }}>
                           <label className="form-label">OR Enter UPI ID</label>
                           <input className="form-input" placeholder="example@upi" style={{ borderRadius: 12 }} />
                        </div>
                     </motion.div>
                   )}

                   {paymentMethod === 'bank' && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="form-group">
                           <label className="form-label">Select Bank</label>
                           <select className="form-input" style={{ borderRadius: 12, fontWeight: 700 }}>
                              <option>State Bank of India</option>
                              <option>HDFC Bank</option>
                              <option>ICICI Bank</option>
                              <option>Axis Bank</option>
                           </select>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: '10px 0' }}>
                           You will be redirected to your bank's secure login page.
                        </p>
                      </motion.div>
                   )}

                   <div style={{ padding: '16px', background: '#ecfdf5', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                         <FiLock size={12} />
                      </div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: '#065f46' }}>PCI-DSS Level 1 Compliant Transaction Suite</p>
                   </div>
                </div>
                <div className="modal-footer" style={{ borderTop: 'none', padding: '0 32px 40px' }}>
                   <button 
                     className="btn btn-outline btn-full shadow-lg shadow-blue-50" 
                     style={{ 
                       height: 54, borderRadius: 16, fontWeight: 900, fontSize: 15,
                       background: 'white', color: 'var(--primary)', border: '1px solid var(--border)' 
                     }}
                     onClick={handlePayment} 
                     disabled={paying}
                    >
                      {paying ? (
                         <span style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ width: 18, height: 18, border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                            AUThENTICATING...
                         </span>
                      ) : `AUTHORIZE ₹${paymentModal.amount.toLocaleString()}.00`}
                    </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

