import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-poppins">
      <div className="max-w-xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-[12rem] font-black text-primary/5 leading-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <FiAlertCircle className="text-8xl text-primary animate-pulse" />
            </div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black text-primary mb-6"
        >
          Lost in Knowledge?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-500 font-medium mb-12 text-lg"
        >
          The page you are looking for has either been moved, deleted, or never existed in our school's digital archive.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-fit px-10 py-6 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 shadow-xl shadow-blue-200 hover:-translate-y-1 transition-all"
          >
            <FiHome /> Back to Campus
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-fit px-10 py-6 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-slate-50 transition-all"
          >
            <FiArrowLeft /> Go Back
          </button>
        </motion.div>

        <div className="mt-20 pt-10 border-t border-slate-200">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">XYZ Higher Secondary School Portal</p>
        </div>
      </div>
    </div>
  );
}

