import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiInfo, FiX
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';

const ICONS = {
  success: <FiCheckCircle style={{ color: 'var(--accent-success)' }} />,
  error: <FiAlertCircle style={{ color: 'var(--accent-error)' }} />,
  warning: <FiAlertTriangle style={{ color: 'var(--accent-warning)' }} />,
  info: <FiInfo style={{ color: 'var(--accent-info)' }} />,
};

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`toast toast-${t.type}`}
          >
            <span className="toast-icon">{ICONS[t.type]}</span>
            <div style={{ flex: 1 }}>
              <p className="toast-title">{t.title}</p>
              {t.message && <p className="toast-msg">{t.message}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              style={{
                background: 'none', border: 'none', color: 'var(--text-muted)',
                cursor: 'pointer', padding: 4, borderRadius: 4, display: 'flex',
              }}
            >
              <FiX size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
