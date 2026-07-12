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
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase">Financial Ledger</h1>
          <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Academic Session 2024-25 • Transaction Log</p>
        </div>
        <div className="bg-white border border-slate-200 px-6 py-3.5 rounded-2xl shadow-sm flex items-center gap-4 w-full xl:w-auto self-start">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
           <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Reconciliation Status</span>
              <span className="text-[10px] md:text-xs font-black text-slate-700 uppercase">Synchronized Today, 10:45 AM</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[
          { label: 'Settled Funds', value: `₹${totalPaid.toLocaleString()}`, icon: <FiCheckCircle />, color: 'emerald', badge: 'Verified' },
          { label: 'Outstanding', value: `₹${totalPending.toLocaleString()}`, icon: <FiAlertCircle />, color: 'amber', badge: 'Action Required' },
          { label: 'Institutional Total', value: '₹28,000', icon: <FiFileText />, color: 'indigo', badge: 'A.Y. 2024-25' },
        ].map((k, i) => (
          <motion.div 
            key={k.label} 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: i * 0.1 }} 
            className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm relative overflow-hidden group ring-1 ring-slate-100"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm border border-slate-50 transition-transform group-hover:scale-110 shrink-0
              ${k.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                k.color === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                'bg-indigo-50 text-indigo-600 border-indigo-100'}`}
            >
              {k.icon}
            </div>
            <div className="relative z-10">
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 opacity-80">{k.label}</div>
              <div className="text-3xl font-black text-slate-800 tracking-tighter leading-none">{k.value}</div>
              <div className={`mt-4 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-block border
                ${k.color === 'emerald' ? 'bg-emerald-50/50 text-emerald-600 border-emerald-100' : 
                  k.color === 'amber' ? 'bg-amber-50/50 text-amber-600 border-amber-100' : 
                  'bg-indigo-50/50 text-indigo-600 border-indigo-100'}`}
              >
                {k.badge}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col ring-1 ring-slate-100">
          <div className="p-6 md:p-8 border-b border-slate-100">
             <h5 className="font-black text-slate-800 uppercase tracking-tight text-sm">Session History</h5>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Historical transaction mapping</p>
          </div>
          <div className="divide-y divide-slate-50">
            {fees.map((f, i) => (
              <div key={f.id} className="p-6 md:p-8 hover:bg-slate-50/30 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{f.term}</label>
                    <h5 className="text-2xl font-black text-slate-800 tracking-tight">₹{f.amount.toLocaleString()}</h5>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shrink-0
                    ${f.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}
                  >
                    {f.status}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className={`text-[11px] font-bold uppercase tracking-tight ${f.date ? 'text-slate-400' : 'text-rose-500'}`}>
                       {f.date ? `Reconciled: ${f.date} • ${f.method}` : 'Action Required: Pending Institutional Dues'}
                    </p>
                    <div className="flex gap-3 w-full sm:w-auto">
                        {f.status === 'Paid' ? (
                          <button 
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition shadow-sm"
                            onClick={() => handleDownloadReceipt(f)}
                          >
                             <FiDownload size={14} /> Receipt
                          </button>
                        ) : (
                          <button 
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-primary border-none rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95"
                            onClick={() => setPaymentModal(f)}
                          >
                            Checkout Now
                          </button>
                        )}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col ring-1 ring-slate-100">
          <div className="p-6 md:p-8 border-b border-slate-100">
             <h5 className="font-black text-slate-800 uppercase tracking-tight text-sm">Operational Breakdown</h5>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Asset allocation per term</p>
          </div>
          <div className="p-6 md:p-8 space-y-2">
            {feeBreakdown.map((f, i) => (
              <div key={f.item} className="flex justify-between items-center py-4 border-b border-slate-50 last:border-none">
                <span className="text-[11px] md:text-xs font-black text-slate-500 uppercase tracking-widest shrink-0">{f.item}</span>
                <div className="flex gap-3 items-center">
                  {f.note && <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 rounded-md text-[8px] font-black text-emerald-600 uppercase tracking-widest">{f.note}</span>}
                  <span className="text-sm font-black text-slate-800 tracking-tight">{f.amount === 0 ? '—' : `₹${f.amount.toLocaleString()}`}</span>
                </div>
              </div>
            ))}
            <div className="mt-8 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 flex justify-between items-center ring-1 ring-white">
              <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Total Liability</span>
              <span className="text-2xl font-black text-indigo-800 tracking-tighter shrink-0">₹8,000</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {paymentModal && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPaymentModal(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
             <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 30 }}
               className="relative bg-white rounded-[40px] w-full max-w-lg p-6 md:p-10 shadow-3xl border border-white mx-auto overflow-hidden ring-1 ring-slate-200"
             >
                <div className="mb-8 flex justify-between items-start">
                  <div>
                    <h4 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight uppercase italic">Secure Checkout</h4>
                    <div className="flex items-center gap-2 mt-1">
                       <FiLock size={12} className="text-emerald-500" />
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">PCI-DSS Encrypted Session</span>
                    </div>
                  </div>
                  <button onClick={() => setPaymentModal(null)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors shadow-inner">
                    <FiX />
                  </button>
                </div>

                <div className="space-y-8">
                   <div className="p-6 bg-slate-50/80 rounded-3xl border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left ring-1 ring-white">
                      <div>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Selected Asset</p>
                         <p className="text-sm font-black text-slate-700 uppercase truncate max-w-[150px]">{paymentModal.term}</p>
                      </div>
                      <div className="sm:text-right shrink-0">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Final Amount</p>
                         <p className="text-2xl font-black text-slate-800 tracking-tighter leading-none">₹{paymentModal.amount.toLocaleString()}</p>
                      </div>
                   </div>

                   <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-4 block">Preferred Gateway</label>
                     <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'card', label: 'Card', icon: <FiCreditCard /> },
                          { id: 'upi', label: 'UPI', icon: <FiSmartphone /> },
                          { id: 'bank', label: 'Net Bank', icon: <FiHome /> },
                        ].map(m => (
                          <button 
                            key={m.id}
                            onClick={() => setPaymentMethod(m.id)}
                            className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border transition-all ring-1
                              ${paymentMethod === m.id ? 
                                'bg-indigo-50 border-indigo-400 ring-indigo-100 text-indigo-700' : 
                                'bg-white border-slate-100 ring-transparent text-slate-400 hover:bg-slate-50'}`}
                          >
                             <div className="text-xl shrink-0">{m.icon}</div>
                             <span className="text-[10px] font-black uppercase tracking-widest leading-none">{m.label}</span>
                          </button>
                        ))}
                     </div>
                   </div>

                   <AnimatePresence mode="wait">
                     {paymentMethod === 'card' && (
                       <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} key="card" className="space-y-4">
                          <div className="space-y-1.5">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Cardholder Entity</label>
                             <input className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-black focus:border-indigo-400 focus:bg-white outline-none transition-all shadow-inner" placeholder="e.g. Vikas Jain" defaultValue={user?.name} />
                          </div>
                          <div className="space-y-1.5">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Card Credentials</label>
                             <div className="relative">
                               <FiCreditCard className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                               <input className="w-full pl-14 pr-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-black focus:border-indigo-400 focus:bg-white outline-none transition-all shadow-inner" placeholder="XXXX XXXX XXXX XXXX" defaultValue="4242 4242 4242 4242" />
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Expiry</label>
                                <input className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-black focus:border-indigo-400 focus:bg-white outline-none transition-all shadow-inner" placeholder="MM/YY" defaultValue="12/28" />
                             </div>
                             <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Security Code</label>
                                <input className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-black focus:border-indigo-400 focus:bg-white outline-none transition-all shadow-inner" type="password" placeholder="***" defaultValue="123" />
                             </div>
                          </div>
                       </motion.div>
                     )}

                     {paymentMethod === 'upi' && (
                       <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} key="upi" className="text-center py-4 bg-slate-50/50 rounded-3xl border border-slate-100 shadow-inner">
                          <div className="w-20 h-20 bg-white shadow-xl shadow-slate-200/50 rounded-2xl mx-auto flex items-center justify-center mb-4 ring-1 ring-slate-100">
                             <FiSmartphone size={32} className="text-indigo-500" />
                          </div>
                          <p className="text-[11px] font-black text-slate-700 uppercase tracking-widest">Scan Institutional VPA</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-1">GPay, PhonePe, Paytm Enabled</p>
                          <div className="mt-6 px-6">
                             <div className="h-0.5 bg-slate-100 w-full mb-6 relative">
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 px-3 text-[8px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap">Sequential Entry</span>
                             </div>
                             <input className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm font-black focus:border-indigo-400 outline-none transition-all shadow-inner" placeholder="vhss@upi" />
                          </div>
                       </motion.div>
                     )}

                     {paymentMethod === 'bank' && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} key="bank" className="space-y-4">
                          <div className="space-y-1.5">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Select Institutional Partner</label>
                             <select className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-black focus:border-indigo-400 focus:bg-white outline-none transition-all shadow-inner cursor-pointer appearance-none">
                                <option>State Bank of India</option>
                                <option>HDFC Bank</option>
                                <option>ICICI Bank</option>
                                <option>Axis Bank</option>
                             </select>
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-tight leading-relaxed">
                             Transition to secondary authentication portal will occur upon authorization.
                          </p>
                        </motion.div>
                     )}
                   </AnimatePresence>

                   <div className="pt-4">
                     <button 
                       onClick={handlePayment} 
                       disabled={paying}
                       className="w-full py-5 rounded-[24px] bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-[0.98] disabled:opacity-50"
                      >
                        {paying ? (
                           <div className="flex items-center justify-center gap-3">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Authenticating...</span>
                           </div>
                        ) : `Authorize Recovery: ₹${paymentModal.amount.toLocaleString()}.00`}
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

