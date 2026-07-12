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

      <div className="table-wrapper overflow-x-auto rounded-lg shadow">
        <table className="data-table min-w-full border border-gray-200 border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
            {activeTab === 'payments' ? (
              <tr><th>Student</th><th>Class</th><th>Term</th><th>Amount</th><th>Date</th><th>Status</th><th className="text-center">Action</th></tr>
            ) : (
              <tr><th>Class</th><th>Term 1 (₹)</th><th>Term 2 (₹)</th><th>Term 3 (₹)</th><th>Annual Total (₹)</th><th className="text-center">Actions</th></tr>
            )}
          </thead>
          <tbody className="bg-white">
            {activeTab === 'payments' ? (
              payments.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-4"><p style={{ fontWeight: 600, fontSize: 13, margin: 0 }}>{p.name}</p><p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>{p.rollNo}</p></td>
                  <td className="px-4 py-4">{p.class}</td>
                  <td className="px-4 py-4">{p.term}</td>
                  <td className="px-4 py-4" style={{ fontWeight: 700 }}>₹{p.amount.toLocaleString()}</td>
                  <td className="px-4 py-4">{p.date || '--'}</td>
                  <td className="px-4 py-4"><span className={`badge ${p.status === 'Paid' ? 'badge-success' : p.status === 'Overdue' ? 'badge-error' : 'badge-warning'}`}>{p.status}</span></td>
                  <td className="px-4 py-4">
                     <div className="flex items-center justify-center h-full min-h-[44px]">
                       {p.status !== 'Paid' ? (
                         <button
                           className="px-4 py-1.5 text-sm font-semibold rounded-md bg-[#22C55E] text-white hover:bg-secondary transition-all duration-200 mx-auto block min-w-[90px] text-center shadow-sm"
                           onClick={() => openCollect(p)}
                         >
                           Collect
                         </button>
                       ) : (
                         <div
                           className="flex items-center justify-center w-full text-gray-500 hover:text-primary cursor-pointer transition-colors duration-200"
                           title="Print Receipt"
                           onClick={() => openReceipt(p)}
                         >
                           <FiPrinter className="w-5 h-5" />
                         </div>
                       )}
                     </div>
                   </td>
                </motion.tr>
              ))
            ) : (
              structure.map((f, i) => (
                <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-4" style={{ fontWeight: 700 }}>Class {f.class}</td>
                  <td className="px-4 py-4">₹{f.term1.toLocaleString()}</td>
                  <td className="px-4 py-4">₹{f.term2.toLocaleString()}</td>
                  <td className="px-4 py-4">₹{f.term3.toLocaleString()}</td>
                  <td className="px-4 py-4" style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{f.total.toLocaleString()}</td>
                  <td className="px-4 py-4">
                         <div className="flex items-center justify-center h-full min-h-[44px]">
                            <div 
                              className="flex items-center justify-center w-full text-gray-500 hover:text-primary cursor-pointer transition-colors duration-200" 
                              title="Edit Fee Structure"
                              onClick={() => openStructureEdit(f)}
                            >
                               <FiEdit2 className="w-5 h-5" />
                            </div>
                         </div>
                       </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
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
