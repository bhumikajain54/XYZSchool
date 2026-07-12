import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FiMenu, FiSearch, FiBell, FiSun, FiMoon, FiChevronDown,
  FiUser, FiSettings, FiLogOut, FiX, FiActivity, FiUserCheck, FiTarget
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const SEARCH_DATA = [
  { id: 1, type: 'student', name: 'Aarav Sharma', detail: 'Class 12-A', icon: '🎓' },
  { id: 2, type: 'student', name: 'Diya Patel', detail: 'Class 11-B', icon: '🎓' },
  { id: 3, type: 'teacher', name: 'Mrs. Priya Singh', detail: 'Mathematics', icon: '🧑‍🏫' },
  { id: 4, type: 'setting', name: 'Fee Configuration', detail: 'Academic Settings', icon: '⚙️' },
  { id: 5, type: 'module', name: 'Attendance Register', detail: 'Main Module', icon: '📅' },
];

export default function Navbar({ title }) {
  const { user, logout, theme, toggleTheme, sidebarCollapsed, setSidebarCollapsed, setMobileSidebarOpen, notifications, dismissNotification } = useApp();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const dropRef = useRef(null);
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchVal('');
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const searchResults = searchVal.length > 1
    ? SEARCH_DATA.filter(i => i.name.toLowerCase().includes(searchVal.toLowerCase()))
    : [];

  const avatarColors = { admin: '#2563EB', teacher: '#7C3AED', staff: '#059669', student: '#D97706' };

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchVal('');
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className={`navbar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="navbar-left flex items-center gap-3">
        <button
          className="icon-btn md:hidden"
          onClick={() => setMobileSidebarOpen(true)}
          id="mobile-menu-btn"
        >
          <FiMenu />
        </button>
        {title && <h1 className="navbar-title hidden sm:block truncate max-w-[200px] lg:max-w-none">{title}</h1>}
      </div>

      <div className="navbar-right">
        {/* Search */}
        <div ref={searchRef} className="relative group">
          <div className="search-bar hidden md:flex">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchVal}
              className="w-48 lg:w-80 transition-all duration-300 focus:w-96"
              onChange={e => setSearchVal(e.target.value)}
            />
          </div>
          {/* Mobile search toggle */}
          <button className="icon-btn md:hidden" onClick={() => setSearchVal(' ')}>
            <FiSearch />
          </button>

          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="dropdown w-[300px] sm:w-[350px] right-0 sm:right-auto sm:left-0 top-full mt-2">
                <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Search Results</div>
                <div className="max-h-[350px] overflow-y-auto">
                  {searchResults.map(s => (
                    <div key={s.id} className="dropdown-item flex items-center gap-4 hover:bg-slate-50" onClick={() => setSearchVal('')}>
                      <span className="text-xl bg-slate-100 w-10 h-10 rounded-lg flex items-center justify-center">{s.icon}</span>
                      <div>
                        <p className="font-bold text-sm text-slate-800">{s.name}</p>
                        <p className="text-[11px] text-slate-500">{s.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme toggle */}
        <button className="icon-btn" onClick={toggleTheme}>{theme === 'light' ? <FiMoon /> : <FiSun />}</button>

        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button className="icon-btn" onClick={() => setNotifOpen(o => !o)} style={{ position: 'relative' }}>
            <FiBell />
            {notifications.length > 0 && <span className="notif-badge" />}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="dropdown" style={{ minWidth: 320, right: 0 }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-primary)' }}>Notifications</span>
                  <span className="badge badge-primary">{notifications.length}</span>
                </div>
                <div style={{ padding: '8px', maxHeight: '400px', overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <FiBell style={{ fontSize: 24, marginBottom: 8, opacity: 0.5 }} />
                      <p style={{ fontSize: 13 }}>No new notifications</p>
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        className="dropdown-item"
                        style={{ gap: 14, alignItems: 'flex-start', padding: '12px', borderRadius: '10px', marginBottom: '4px' }}
                        onClick={() => {
                          if (n.path) navigate(n.path);
                          dismissNotification(n.id);
                          setNotifOpen(false);
                        }}
                      >
                        <div style={{
                          width: 10, height: 10, borderRadius: '50%',
                          background: n.type === 'success' ? '#22C55E' : '#2563EB',
                          marginTop: 5, flexShrink: 0,
                          boxShadow: `0 0 0 4px ${n.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(37, 99, 235, 0.1)'}`
                        }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', margin: 0 }}>{n.title}</p>
                          <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0', lineHeight: 1.4 }}>{n.msg}</p>
                          <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>{n.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User menu */}
        <div ref={dropRef} className="relative">
          <div className="user-menu flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-slate-50 transition-all" onClick={() => setDropdownOpen(o => !o)}>
            <div className="avatar avatar-sm flex-shrink-0" style={{ background: avatarColors[user?.role] || 'var(--primary)', width: 36, height: 36, fontSize: 14 }}>{user?.avatar}</div>
            <div className="user-menu-info hidden md:block">
              <div className="user-menu-name font-bold text-sm text-slate-800 leading-none">{user?.name}</div>
              <div className="user-menu-role text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{user?.role}</div>
            </div>
            <FiChevronDown className="text-slate-400 text-xs" />
          </div>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="dropdown" style={{ right: 0 }}>
                <div style={{ padding: '12px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div className="avatar avatar-md" style={{ background: avatarColors[user?.role] || 'var(--primary)' }}>{user?.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 14 }}>{user?.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{user?.email || (user?.role + '@xyzschool.edu')}</p>
                  </div>
                </div>
                <div style={{ padding: '8px' }}>
                  <button className="dropdown-item" onClick={() => { navigate(`/${user?.role}/profile`); setDropdownOpen(false); }}><FiUser /> My Profile</button>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item danger" onClick={handleLogout}><FiLogOut /> Sign Out</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .navbar { height: 60px; padding: 0 12px; }
          .icon-btn { width: 36px; height: 36px; border-radius: 10px; font-size: 16px; }
        }
      `}</style>
    </nav>
  );
}

