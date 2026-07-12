import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiLogOut, FiX } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import SchoolLogo from '../assets/image.png';

export default function Sidebar({ navItems, role, roleLabel }) {
  const { sidebarCollapsed, mobileSidebarOpen, setMobileSidebarOpen, logout, notifications, clearNotificationsByType } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarBranding = ({ showClose = false }) => (
    <div className="sidebar-logo flex items-center justify-between bg-black/20 border-b border-white/5 h-14 md:h-16 shrink-0 overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="sidebar-logo-icon w-9 h-9 bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0 shadow-lg ring-1 ring-white/10">
          <img src={SchoolLogo} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <div className="sidebar-logo-text whitespace-nowrap">
          <h4 className="text-[12px] font-black text-white uppercase tracking-tight leading-none mb-1">VIKRAM H.S SCHOOL</h4>
          <p className="text-[9px] text-accent font-bold uppercase tracking-widest leading-none opacity-80">Academic Excellence</p>
        </div>
      </div>
      {showClose && (
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-all active:scale-95 border border-white/5"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );

  const SidebarContent = () => (
    <>
      <nav className="sidebar-nav flex-1">
        {navItems.map((section, si) => (
          <div key={si}>
            {section.label && (
              <div className="nav-section-title">{section.label}</div>
            )}
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item !py-1.5 !my-0.5 ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setMobileSidebarOpen(false);
                  if (item.notifType) clearNotificationsByType(item.notifType);
                }}
                title={sidebarCollapsed ? item.label : ''}
              >
                <span className="nav-item-icon" title={sidebarCollapsed ? item.label : ''}>{item.icon}</span>
                <span className="nav-item-text">{item.label}</span>
                {item.notifType && notifications.filter(n => n.notifType === item.notifType).length > 0 && (
                  <span className="nav-item-badge">
                    {notifications.filter(n => n.notifType === item.notifType).length}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer p-3 border-t border-white/10">
        <button
          className="nav-item nav-item-logout !m-0 !w-full flex items-center gap-3 !p-2 rounded-xl transition-all hover:bg-red-500/10"
          onClick={handleLogout}
        >
          <span className="nav-item-icon text-red-400 !w-auto"><FiLogOut /></span>
          <span className="nav-item-text text-red-400 font-bold">Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <SidebarBranding />
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-[1000] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-[280px] bg-gradient-to-b from-slate-900 to-blue-900 shadow-2xl flex flex-col"
            >
              <SidebarBranding showClose={true} />
              <div className="flex-1 overflow-y-auto no-scrollbar">
                <SidebarContent />
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
