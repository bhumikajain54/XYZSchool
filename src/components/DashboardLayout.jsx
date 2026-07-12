import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

export default function DashboardLayout({ navItems, role, roleLabel, title }) {
  const { sidebarCollapsed } = useApp();

  return (
    <div className="app-layout">
      <Sidebar navItems={navItems} role={role} roleLabel={roleLabel} />
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Navbar title={title} />
        <div className="page-content">
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
