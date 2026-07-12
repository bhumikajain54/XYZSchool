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

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <img src={SchoolLogo} alt="XYZ School" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div className="sidebar-logo-text">
          <h4 style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>Vikram Higher</h4>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Secondary School</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map((section, si) => (
          <div key={si}>
            {section.label && (
              <div className="nav-section-title">{section.label}</div>
            )}
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
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

      {/* Footer */}
      <div className="sidebar-footer">
        <button
          className="nav-item nav-item-logout"
          onClick={handleLogout}
          style={{ width: 'calc(100% - 16px)', border: 'none' }}
          title={sidebarCollapsed ? 'Logout' : ''}
        >
          <span className="nav-item-icon"><FiLogOut /></span>
          <span className="nav-item-text">Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 99,
                backdropFilter: 'blur(4px)',
              }}
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="sidebar mobile-open"
              style={{ zIndex: 101, transform: 'none' }}
            >
              <button
                onClick={() => setMobileSidebarOpen(false)}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'white',
                  border: 'none', borderRadius: 12,
                  color: '#333', padding: 4, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 42, height: 42,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <FiX />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

