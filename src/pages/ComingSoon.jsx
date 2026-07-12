import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ComingSoon() {
  const navigate = useNavigate();
  const { logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card"
        style={{
          maxWidth: '500px',
          padding: '48px',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{
          width: '80px',
          height: '80px',
          background: 'rgba(99, 102, 241, 0.1)',
          color: '#6366f1',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          margin: '0 auto 24px'
        }}>
          <FiClock />
        </div>
        
        <h1 style={{ fontWeight: 900, fontSize: '2rem', color: '#1e293b', marginBottom: '16px' }}>
          Coming Soon
        </h1>
        
        <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '32px' }}>
          We are currently building this administrative module to provide a more integrated experience within the Super Admin portal. Please check back later!
        </p>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '14px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FiLogOut /> Logout and Exit
        </button>
      </motion.div>
    </div>
  );
}
