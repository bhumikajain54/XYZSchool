import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit3, FiX, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const FloatingEnrollmentCTA = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {/* Sticky Button */}
      <div className="fixed bottom-10 right-10 z-[100] hidden sm:block">
        <motion.button
          initial="initial"
          whileHover="hover"
          onClick={() => navigate('/admissions#inquiry')}
          className="flex items-center bg-primary text-white rounded-full shadow-[0_15px_40px_rgba(30,58,138,0.25)] hover:bg-blue-700 transition-colors group relative overflow-hidden"
        >
          <div className="w-12 h-12 flex items-center justify-center text-lg shrink-0 bg-white/10 group-hover:bg-transparent transition-colors">
            <FiEdit3 />
          </div>
          
          <motion.div
            variants={{
              initial: { width: 0, opacity: 0, marginLeft: 0 },
              hover: { width: 'auto', opacity: 1, marginLeft: 6, paddingRight: 24 }
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="overflow-hidden whitespace-nowrap flex items-center"
          >
            <span className="font-black text-[9px] uppercase tracking-[0.3em]">Apply Now</span>
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Floating Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] sm:hidden bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 flex gap-4">
         <a href="tel:+917314200001" className="flex-1 bg-slate-100 text-primary py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-[9px] uppercase tracking-widest">
            <FiPhone /> Call Us
         </a>
         <button onClick={() => navigate('/admissions#inquiry')} className="flex-[2] bg-primary text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-[9px] uppercase tracking-widest shadow-xl">
            <FiCheckCircle /> Apply Online
         </button>
      </div>
    </>
  );
};

export default FloatingEnrollmentCTA;
