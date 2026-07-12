import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiDownload, FiCheckCircle, FiFileText, FiPrinter, FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

export default function StaffSalary() {
  const { addToast } = useApp();
  const [selectedYear, setSelectedYear] = useState('2024');

  const salaryStructure = {
    gross: 45000,
    breakdown: [
      { label: 'Basic Salary', val: 28000, icon: <FiPlusCircle />, color: 'blue' },
      { label: 'House Rent Allowance (HRA)', val: 8500, icon: <FiPlusCircle />, color: 'green' },
      { label: 'Transport Allowance', val: 3500, icon: <FiPlusCircle />, color: 'teal' },
      { label: 'Medical Allowance', val: 5000, icon: <FiPlusCircle />, color: 'cyan' },
    ],
    deductions: [
      { label: 'Provident Fund (PF)', val: 3360, icon: <FiMinusCircle />, color: 'red' },
      { label: 'Professional Tax', val: 200, icon: <FiMinusCircle />, color: 'amber' },
      { label: 'Income Tax (TDS)', val: 1500, icon: <FiMinusCircle />, color: 'red' },
    ],
    net: 39940
  };

  const paymentHistory = [
    { id: 1, month: 'March 2024', date: '2024-03-31', amount: 39940, status: 'Credited', method: 'Bank Transfer' },
    { id: 2, month: 'February 2024', date: '2024-02-29', amount: 39940, status: 'Credited', method: 'Bank Transfer' },
    { id: 3, month: 'January 2024', date: '2024-01-31', amount: 38500, status: 'Credited', method: 'Bank Transfer' },
    { id: 4, month: 'December 2023', date: '2023-12-30', amount: 38500, status: 'Credited', method: 'Direct Deposit' },
  ];

  const handleDownload = (month) => {
    addToast('success', 'Payslip Generated', `Your payslip for ${month} has been downloaded successfully.`);
  };

  const currencyFormat = new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', minimumFractionDigits: 0
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Financial Ledger</h3>
          <p className="text-[10px] md:text-xs font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">Comprehensive Earnings & Institutional Records</p>
        </div>
        <button className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-slate-600 hover:bg-slate-50 transition shadow-sm active:scale-95 flex items-center justify-center gap-3" onClick={() => window.print()}>
          <FiPrinter size={14} className="text-indigo-600" /> Print Annual Dossier
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm ring-1 ring-slate-100 flex items-center gap-6 group hover:shadow-xl hover:shadow-indigo-100/30 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform"><FiDollarSign /></div>
          <div>
            <div className="text-2xl font-black text-slate-800 tracking-tighter leading-none mb-1.5">{currencyFormat.format(salaryStructure.gross)}</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Gross Cumulative Vol.</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm ring-1 ring-slate-100 flex items-center gap-6 group hover:shadow-xl hover:shadow-emerald-110/30 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform"><FiCheckCircle /></div>
          <div>
            <div className="text-2xl font-black text-slate-800 tracking-tighter leading-none mb-1.5">{currencyFormat.format(salaryStructure.net)}</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Net Residual Transfer</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm ring-1 ring-slate-100 flex items-center gap-6 group hover:shadow-xl hover:shadow-amber-100/30 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform"><FiFileText /></div>
          <div>
            <div className="text-2xl font-black text-slate-800 tracking-tighter leading-none mb-1.5">12</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Verified Slips</div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col ring-1 ring-slate-100 h-full">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
            <div>
              <h5 className="font-black text-slate-800 uppercase tracking-tight text-sm">Earnings Matrix</h5>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Component segregation</p>
            </div>
          </div>
          <div className="p-8 space-y-4 grow">
             {salaryStructure.breakdown.map((item, i) => (
                <div key={item.label} className="flex justify-between items-center py-4 border-b border-slate-50 last:border-none">
                   <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-indigo-500 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">{item.icon}</div>
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                   </div>
                   <div className="text-base font-black text-slate-800 tracking-tight">{currencyFormat.format(item.val)}</div>
                </div>
             ))}
             <div className="mt-8 p-6 bg-rose-50/50 rounded-2xl border border-rose-100/50 flex justify-between items-center ring-1 ring-white">
                <span className="text-[10px] font-black text-rose-700 uppercase tracking-widest">Total Deductions</span>
                <span className="text-xl font-black text-rose-800 tracking-tighter">- {currencyFormat.format(salaryStructure.deductions.reduce((a, b) => a + b.val, 0))}</span>
             </div>
          </div>
        </div>

        <div className="flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden ring-1 ring-slate-100">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div>
              <h5 className="font-black text-slate-800 uppercase tracking-tight text-sm">Transfer History</h5>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Institutional Disbursement Log</p>
            </div>
          </div>
          <div className="divide-y divide-slate-50 grow">
             {paymentHistory.map(p => (
               <div key={p.id} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 border border-indigo-100">
                       {p.month.split(' ')[0].substring(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <h6 className="font-black text-slate-800 uppercase italic tracking-tight">{p.month}</h6>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{p.method} • {p.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="text-right">
                      <div className="text-lg font-black text-slate-800 tracking-tighter">{currencyFormat.format(p.amount)}</div>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 text-[8px] font-black uppercase tracking-widest">{p.status}</span>
                    </div>
                    <button className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-all shadow-sm active:scale-90" onClick={() => handleDownload(p.month)}>
                       <FiDownload size={16} />
                    </button>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
