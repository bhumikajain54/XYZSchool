import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiDownload, FiFilter } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const INVENTORY_DATA = [
  { id: 1, name: 'Whiteboard Markers', category: 'Stationery', quantity: 150, price: 20, status: 'In Stock' },
  { id: 2, name: 'A4 Paper Reams', category: 'Stationery', quantity: 45, price: 450, status: 'Low Stock' },
  { id: 3, name: 'Science Lab Beakers', category: 'Lab Equipment', quantity: 30, price: 120, status: 'In Stock' },
  { id: 4, name: 'Basketballs', category: 'Sports', quantity: 12, price: 800, status: 'In Stock' },
  { id: 5, name: 'Projector Lamps', category: 'IT Assets', quantity: 5, price: 3500, status: 'Low Stock' },
];

export default function InventoryList() {
  const navigate = useNavigate();
  const [items, setItems] = useState(INVENTORY_DATA);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'Inventory_Report.xlsx');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Inventory Oracle</h1>
          <p className="text-[10px] md:text-xs font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">Institutional Asset Management & Logistical Registry</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={exportToExcel}
            className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 transition shadow-sm active:scale-95"
          >
            <FiDownload size={14} className="text-indigo-600" /> Export Dossier
          </button>
          <button 
            onClick={() => navigate('/admin/inventory/add')}
            className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95"
          >
            <FiPlus size={14} /> Add Registry
          </button>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 ring-1 ring-slate-100 bg-slate-50/20">
        <div className="relative flex-1 group">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search items by designation..." 
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-black transition-all text-[11px] uppercase tracking-widest shadow-inner placeholder:text-slate-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 h-14 px-5 border border-slate-100 rounded-2xl bg-white text-slate-500 shadow-inner group transition-all focus-within:ring-2 focus-within:ring-indigo-100">
          <FiFilter className="group-focus-within:text-indigo-600" />
          <select 
            className="bg-transparent outline-none w-full text-[10px] font-black uppercase tracking-widest text-slate-700 cursor-pointer appearance-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Classifications</option>
            <option value="Stationery">Stationery</option>
            <option value="Lab Equipment">Lab Equipment</option>
            <option value="Sports">Sports</option>
            <option value="IT Assets">IT Assets</option>
          </select>
        </div>
      </div>

      {/* Desktop Matrix View */}
      <div className="hidden lg:block bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden ring-1 ring-slate-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Item Designation</th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Classification</th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Qty Vol.</th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Unit Val.</th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Audit Status</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-indigo-50/30 transition-all group">
                <td className="px-8 py-6">
                  <span className="font-black text-slate-800 text-[13px] uppercase tracking-tight group-hover:text-indigo-600 transition-colors italic">{item.name}</span>
                </td>
                <td className="px-6 py-6">
                  <span className="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100">{item.category}</span>
                </td>
                <td className="px-6 py-6 text-center">
                  <span className="font-black text-slate-700 text-sm tracking-tighter">{item.quantity}</span>
                </td>
                <td className="px-6 py-6 text-center">
                  <span className="font-black text-slate-700 text-sm tracking-tighter">₹{item.price}</span>
                </td>
                <td className="px-6 py-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all shadow-sm block ${
                    item.status === 'In Stock' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-rose-50 text-rose-600 border-rose-100'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-all shadow-sm active:scale-90"><FiEdit2 size={14} /></button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm active:scale-90"
                    ><FiTrash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 relative overflow-hidden group active:bg-indigo-50/30 transition-all">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-[18px] flex items-center justify-center shrink-0 border border-indigo-100 italic font-black text-xs">
                    {item.name.substring(0, 2).toUpperCase()}
                 </div>
                 <div>
                    <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight italic">{item.name}</h3>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{item.category}</p>
                 </div>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
              }`}>
                {item.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-center">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Quantity</div>
                  <div className="text-xl font-black text-slate-800 tracking-tighter">{item.quantity}</div>
               </div>
               <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-center">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Unit Price</div>
                  <div className="text-xl font-black text-slate-800 tracking-tighter">₹{item.price}</div>
               </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95">
                 <FiEdit2 size={14} /> Update
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-rose-50 hover:border-rose-100 transition-all active:scale-95"
              >
                 <FiTrash2 size={14} /> Purge
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-24 text-center bg-white rounded-[2.5rem] border border-slate-100 italic text-slate-400 font-black uppercase tracking-widest text-[10px]">
          The institutional archive contains no assets matching this query.
        </div>
      )}
    </div>
  );
}
