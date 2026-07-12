import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiX, FiDollarSign, FiCheckCircle, FiAlertCircle, FiPrinter, FiSave } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const INIT_STRUCTURE = [
  { id: 1, class: '8', term1: 8500, term2: 8500, term3: 7000, total: 24000 },
  { id: 2, class: '9', term1: 9000, term2: 9000, term3: 7500, total: 25500 },
  { id: 3, class: '10', term1: 10000, term2: 10000, term3: 8000, total: 28000 },
  { id: 4, class: '11', term1: 12000, term1_name: 'Science', term2: 12000, term3: 9000, total: 33000 },
  { id: 5, class: '12', term1: 13000, term1_name: 'Science', term2: 13000, term3: 10000, total: 36000 },
];

const INIT_PAYMENTS = [
  { id: 1, name: 'Aarav Sharma', rollNo: 'VS-001', class: '12-A', amount: 13000, term: 'Term 1', date: '2025-07-15', method: 'Online', status: 'Paid' },
  { id: 2, name: 'Diya Patel', rollNo: 'VS-002', class: '11-B', amount: 12000, term: 'Term 1', date: '2025-07-18', method: 'Cash', status: 'Paid' },
  { id: 3, name: 'Rohan Verma', rollNo: 'VS-003', class: '12-B', amount: 13000, term: 'Term 2', date: null, method: '-', status: 'Pending' },
  { id: 4, name: 'Ananya Reddy', rollNo: 'VS-004', class: '10-A', amount: 10000, term: 'Term 1', date: '2025-07-20', method: 'Cheque', status: 'Paid' },
  { id: 5, name: 'Vikram Singh', rollNo: 'VS-005', class: '9-C', amount: 9000, term: 'Term 2', date: null, method: '-', status: 'Overdue' },
  { id: 6, name: 'Priya Nair', rollNo: 'VS-006', class: '11-A', amount: 12000, term: 'Term 1', date: '2025-07-22', method: 'Online', status: 'Paid' },
];

export default function FeesManagement() {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('payments');
  const [payments, setPayments] = useState(INIT_PAYMENTS);
  const [structure, setStructure] = useState(INIT_STRUCTURE);

  // Collect Fee Modal
  const [collectModal, setCollectModal] = useState(false);
  const [collectForm, setCollectForm] = useState({ amount: '', method: 'Cash', term: 'Term 1', date: new Date().toISOString().split('T')[0] });
  const [collectTarget, setCollectTarget] = useState(null);
  const [collectLoading, setCollectLoading] = useState(false);

  // Receipt Modal
  const [receiptModal, setReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // New collection modal (top button)
  const [newCollectModal, setNewCollectModal] = useState(false);
  const [newForm, setNewForm] = useState({ name: '', rollNo: '', class: '', amount: '', term: 'Term 1', method: 'Cash', date: new Date().toISOString().split('T')[0] });

  // Structure Edit Modal
  const [structureModal, setStructureModal] = useState(false);
  const [targetStruct, setTargetStruct] = useState(null);
  const [structForm, setStructForm] = useState({ term1: '', term2: '', term3: '' });

  const totalCollected = payments.filter(p => p.status === 'Paid').reduce((a, b) => a + b.amount, 0);
  const totalPending = payments.filter(p => p.status !== 'Paid').reduce((a, b) => a + b.amount, 0);

  const openCollect = (p) => {
    setCollectTarget(p);
    setCollectForm({ amount: String(p.amount), method: 'Cash', term: p.term, date: new Date().toISOString().split('T')[0] });
    setCollectModal(true);
  };

  const handleCollect = async () => {
    if (!collectForm.amount) return;
    setCollectLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setPayments(prev => prev.map(p =>
      p.id === collectTarget.id ? { ...p, status: 'Paid', amount: Number(collectForm.amount), method: collectForm.method, date: collectForm.date } : p
    ));
    addToast('success', 'Payment Recorded', 'Successfully collected ₹' + Number(collectForm.amount).toLocaleString());
    setCollectLoading(false);
    setCollectModal(false);
  };

  const openReceipt = (p) => { setReceiptData(p); setReceiptModal(true); };

  const openStructureEdit = (s) => {
    setTargetStruct(s);
    setStructForm({ term1: s.term1, term2: s.term2, term3: s.term3 });
    setStructureModal(true);
  };

  const saveStructure = () => {
    const t1 = Number(structForm.term1);
    const t2 = Number(structForm.term2);
    const t3 = Number(structForm.term3);
    setStructure(prev => prev.map(s =>
      s.id === targetStruct.id ? { ...s, term1: t1, term2: t2, term3: t3, total: t1 + t2 + t3 } : s
    ));
    addToast('success', 'Updated', 'Fee structure for Class ' + targetStruct.class + ' updated');
    setStructureModal(false);
  };

  return (
    <div className="page-enter p-4">
      <div className="section-header flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="section-title">Fees Management</h3>
          <p className="section-subtitle">Track fee collections and structures</p>
        </div>
        <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setNewCollectModal(true)}>
          <FiPlus /> Collect Fee
        </button>
      </div>

      <div className="grid-3 gap-4 mb-4">
        <div className="kpi-card green p-4">
          <div className="kpi-icon green"><FiCheckCircle /></div>
          <div className="kpi-value">₹{(totalCollected / 1000).toFixed(0)}K</div>
          <div className="kpi-label">Total Collected</div>
        </div>
        <div className="kpi-card amber p-4">
          <div className="kpi-icon amber"><FiAlertCircle /></div>
          <div className="kpi-value">₹{(totalPending / 1000).toFixed(0)}K</div>
          <div className="kpi-label">Pending Amount</div>
        </div>
        <div className="kpi-card blue p-4">
          <div className="kpi-icon blue"><FiDollarSign /></div>
          <div className="kpi-value">{totalCollected + totalPending > 0 ? Math.round(totalCollected / (totalCollected + totalPending) * 100) : 0}%</div>
          <div className="kpi-label">Collection Rate</div>
        </div>
      </div>

      <div className="tabs flex gap-2 mb-4">
        <button className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}>Payment Records</button>
        <button className={`tab-btn ${activeTab === 'structure' ? 'active' : ''}`} onClick={() => setActiveTab('structure')}>Fee Structure</button>
      </div>

      {/* Payment / Structure Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {activeTab === 'payments' ? (
          payments.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all flex flex-col group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <FiDollarSign size={20} />
                  </div>
                  <div>
                    <h5 className="font-black text-slate-800 text-sm uppercase tracking-tight leading-tight">{p.name}</h5>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{p.rollNo} <span className="mx-1 opacity-30">|</span> {p.class}</p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                  p.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                  p.status === 'Overdue' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {p.status}
                </span>
              </div>

              <div className="space-y-3 grow text-[10px] font-black uppercase tracking-widest">
                <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                  <span className="text-slate-400">Installment Payload</span>
                  <span className="text-slate-700">{p.term}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                  <span className="text-slate-400">Transaction Value</span>
                  <span className="text-lg font-black text-slate-800">₹{p.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-slate-400">Timestamp</span>
                  <span className="text-slate-500 italic">{p.date || 'PENDING VERIFICATION'}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {p.status !== 'Paid' ? (
                  <button
                    onClick={() => openCollect(p)}
                    className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all transform hover:-translate-y-1"
                  >
                    Authorize Collection
                  </button>
                ) : (
                  <button
                    onClick={() => openReceipt(p)}
                    className="flex-1 py-4 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <FiPrinter size={14} /> Generate Receipt
                  </button>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          structure.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/20 transition-all flex flex-col group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-500">
                <FiDollarSign size={80} />
              </div>
              
              <div className="mb-8">
                <p className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em] mb-2">Grade Classification</p>
                <h4 className="text-3xl font-black text-slate-800 tracking-tight">CLASS {s.class}</h4>
              </div>

              <div className="space-y-4 grow text-[10px] font-black uppercase tracking-widest mb-8">
                <div className="flex justify-between items-center py-3 border-b border-slate-50">
                  <span className="text-slate-400">Terminal 1 Code</span>
                  <span className="text-slate-700 font-poppins">₹{s.term1.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-50">
                  <span className="text-slate-400">Terminal 2 Code</span>
                  <span className="text-slate-700 font-poppins">₹{s.term2.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-400">Terminal 3 Code</span>
                  <span className="text-slate-700 font-poppins">₹{s.term3.toLocaleString()}</span>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[11px]">Total Annual Quota</span>
                    <span className="text-2xl font-black text-indigo-600 font-poppins">₹{s.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openStructureEdit(s)}
                className="w-full py-4 bg-slate-50 text-slate-400 font-black rounded-2xl text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all flex items-center justify-center gap-3 group/btn"
              >
                <FiEdit2 size={12} className="group-hover/btn:scale-125 transition-transform" /> Reconfigure Matrix
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* Modals are kept as they are functionally sound */}
      <AnimatePresence>
        {collectModal && collectTarget && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} style={{ maxWidth: 460 }}>
              <div className="modal-header"><h4>Collect Payment</h4><button className="modal-close" onClick={() => setCollectModal(false)}><FiX /></button></div>
              <div className="modal-body p-4">
                <div className="form-group pb-2"><label className="form-label">Student</label><input className="form-input" value={collectTarget.name} readOnly disabled /></div>
                <div className="grid-2 gap-4">
                  <div className="form-group"><label className="form-label required">Amount</label><input className="form-input" type="number" value={collectForm.amount} onChange={e => setCollectForm({ ...collectForm, amount: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">Method</label><select className="form-select" value={collectForm.method} onChange={e => setCollectForm({ ...collectForm, method: e.target.value })}><option>Cash</option><option>Online</option><option>UPI</option></select></div>
                </div>
              </div>
              <div className="modal-footer p-4 pt-0">
                <button className="btn btn-ghost btn-sm" onClick={() => setCollectModal(false)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={handleCollect} disabled={collectLoading}>{collectLoading ? <span className="lp-spinner" /> : 'Confirm Payment'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {structureModal && targetStruct && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} style={{ maxWidth: 440 }}>
              <div className="modal-header"><h4>Edit Fee Structure: Class {targetStruct.class}</h4><button className="modal-close" onClick={() => setStructureModal(false)}><FiX /></button></div>
              <div className="modal-body p-4">
                <div className="form-group pb-2"><label className="form-label">Term 1 Amount (₹)</label><input className="form-input" type="number" value={structForm.term1} onChange={e => setStructForm({ ...structForm, term1: e.target.value })} /></div>
                <div className="form-group pb-2"><label className="form-label">Term 2 Amount (₹)</label><input className="form-input" type="number" value={structForm.term2} onChange={e => setStructForm({ ...structForm, term2: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Term 3 Amount (₹)</label><input className="form-input" type="number" value={structForm.term3} onChange={e => setStructForm({ ...structForm, term3: e.target.value })} /></div>
              </div>
              <div className="modal-footer p-4 pt-0">
                <button className="btn btn-ghost btn-sm" onClick={() => setStructureModal(false)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={saveStructure}><FiSave /> Save Changes</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {newCollectModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="modal">
              <div className="modal-header"><h4>Quick Collect</h4><button className="modal-close" onClick={() => setNewCollectModal(false)}><FiX /></button></div>
              <div className="modal-body p-4">
                <div className="grid-2 gap-4">
                  <div className="form-group"><label className="form-label required">Student Name</label><input className="form-input" value={newForm.name} onChange={e => setNewForm({ ...newForm, name: e.target.value })} placeholder="Full name" /></div>
                  <div className="form-group"><label className="form-label required">Roll No</label><input className="form-input" value={newForm.rollNo} onChange={e => setNewForm({ ...newForm, rollNo: e.target.value })} placeholder="VS-XXX" /></div>
                  <div className="form-group"><label className="form-label required">Amount</label><input className="form-input" type="number" value={newForm.amount} onChange={e => setNewForm({ ...newForm, amount: e.target.value })} placeholder="₹" /></div>
                  <div className="form-group"><label className="form-label">Term</label><select className="form-select" value={newForm.term} onChange={e => setNewForm({ ...newForm, term: e.target.value })}><option>Term 1</option><option>Term 2</option><option>Term 3</option></select></div>
                </div>
              </div>
              <div className="modal-footer p-4 pt-0">
                <button className="btn btn-ghost btn-sm" onClick={() => setNewCollectModal(false)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={() => {
                  if (!newForm.name || !newForm.amount) { addToast('error', 'Error', 'Fill required fields'); return; }
                  setPayments([{ ...newForm, id: Date.now(), status: 'Paid', amount: Number(newForm.amount) }, ...payments]);
                  addToast('success', 'Collected', 'Payment recorded');
                  setNewCollectModal(false);
                }}>Record Payment</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
