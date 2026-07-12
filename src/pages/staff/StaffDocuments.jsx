import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiDownload, FiSearch, FiFilter, FiFolder, FiPrinter, FiEye, FiMoreVertical, FiPaperclip } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

export default function StaffDocuments() {
   const [activeFolder, setActiveFolder] = useState('All');
   const [search, setSearch] = useState('');

   const folders = [
      { id: 'All', icon: '📁', count: 18 },
      { id: 'Personal', icon: '👤', count: 5 },
      { id: 'Financial', icon: '💰', count: 8 },
      { id: 'Academic', icon: '📚', count: 3 },
      { id: 'Policy', icon: '⚖️', count: 2 },
   ];

   const documents = [
      { id: 1, name: 'Appointment Letter - VIK-2022', category: 'Personal', date: 'Aug 14, 2022', size: '2.4 MB', type: 'PDF' },
      { id: 2, name: 'Salary Slip - March 2024', category: 'Financial', date: 'Mar 31, 2024', size: '1.1 MB', type: 'PDF' },
      { id: 3, name: 'Staff Code of Conduct 2024', category: 'Policy', date: 'Jan 05, 2024', size: '5.2 MB', type: 'PDF' },
      { id: 4, name: 'M.Lib.Sc Degree Certificate', category: 'Personal', date: 'Jan 20, 2022', size: '3.8 MB', type: 'JPG' },
      { id: 5, name: 'Professional Tax Record 23-24', category: 'Financial', date: 'Feb 15, 2024', size: '0.8 MB', type: 'PDF' },
      { id: 6, name: 'Provident Fund (PF) Statement', category: 'Financial', date: 'Mar 10, 2024', size: '1.4 MB', type: 'XLSX' },
      { id: 7, name: 'Library Resource Policy', category: 'Academic', date: 'Feb 20, 2024', size: '1.2 MB', type: 'PDF' },
   ];

   const filtered = documents.filter(d => (activeFolder === 'All' || d.category === activeFolder) && d.name.toLowerCase().includes(search.toLowerCase()));

   return (
      <div className="page-enter">
         <div className="section-header">
            <div>
               <h3>Digital Document Vault</h3>
               <p className="section-subtitle">Secure access to your institutional records and certifications</p>
            </div>
         </div>

         <div className="grid-2" style={{ gridTemplateColumns: '300px 1fr', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
               <div className="card" style={{ padding: '20px' }}>
                  <h5 style={{ marginBottom: 16 }}>Categories</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                     {folders.map(f => (
                        <button
                           key={f.id}
                           onClick={() => setActiveFolder(f.id)}
                           style={{
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px',
                              borderRadius: 14, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                              background: activeFolder === f.id ? 'var(--primary)' : 'var(--secondary)',
                              color: activeFolder === f.id ? 'white' : 'var(--text-primary)',
                              fontWeight: 800, fontSize: 13
                           }}
                        >
                           <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <span style={{ fontSize: 18 }}>{f.icon}</span>
                              {f.id} Documents
                           </span>
                           <span style={{
                              fontSize: 10, background: activeFolder === f.id ? 'rgba(255,255,255,0.2)' : 'var(--border)',
                              padding: '4px 8px', borderRadius: 8
                           }}>
                              {f.count}
                           </span>
                        </button>
                     ))}
                  </div>
               </div>

               <div className="card" style={{ padding: '20px', background: 'var(--primary)', color: 'white' }}>
                  <h5 style={{ color: 'white', marginBottom: 8 }}>Upload New</h5>
                  <p style={{ fontSize: 11, opacity: 0.8, marginBottom: 16 }}>Need to submit a document to the administration?</p>
                  <button className="btn btn-outline" style={{ width: '100%', background: 'white', color: 'var(--primary)', border: 'none' }}>
                     <FiPaperclip style={{ marginRight: 8 }} /> Select Files
                  </button>
               </div>
            </div>

            <div className="card" style={{ padding: '0' }}>
               <div className="card-header" style={{ padding: '20px 24px', flexWrap: 'wrap', gap: 16 }}>
                  <div className="search-bar" style={{ maxWidth: 320, flex: 1 }}>
                     <FiSearch className="search-icon" />
                     <input placeholder="Search files name..." value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                     <button className="icon-btn" title="Grid View"><FiPrinter /></button>
                     <button className="icon-btn" title="Filter"><FiFilter /></button>
                  </div>
               </div>

               <div className="table-wrapper">
                  <table className="data-table">
                     <thead>
                        <tr>
                           <th style={{ width: 400 }}>Document Name</th>
                           <th>Category</th>
                           <th>Upload Date</th>
                           <th>File Size</th>
                           <th style={{ textAlign: 'right' }}>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {filtered.map((d, i) => (
                           <tr key={d.id}>
                              <td>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{
                                       width: 40, height: 40, borderRadius: 12, background: 'var(--secondary)',
                                       display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)'
                                    }}>
                                       {d.type === 'PDF' ? '📄' : d.type === 'JPG' ? '🖼️' : '📊'}
                                    </div>
                                    <div>
                                       <div style={{ fontWeight: 800, fontSize: 13 }}>{d.name}</div>
                                       <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700 }}>.{d.type.toLowerCase()} format</div>
                                    </div>
                                 </div>
                              </td>
                              <td><span className="badge badge-gray">{d.category}</span></td>
                              <td style={{ fontSize: 12, fontWeight: 700 }}>{d.date}</td>
                              <td style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>{d.size}</td>
                              <td style={{ textAlign: 'right' }}>
                                 <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                    <button className="icon-btn" title="View"><FiEye /></button>
                                    <button className="icon-btn" title="Download"><FiDownload /></button>
                                    <button className="icon-btn"><FiMoreVertical /></button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                        {filtered.length === 0 && (
                           <tr>
                              <td colSpan={5} style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
                                 <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                                 <p style={{ fontWeight: 700 }}>No documents match your criteria.</p>
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   );
}
