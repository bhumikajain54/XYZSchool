import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiSend } from 'react-icons/fi';

const InquiryPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeen = localStorage.getItem('hasSeenInquiryPopup');
            if (!hasSeen) {
                setIsOpen(true);
            }
        }, 15000); // Show after 15 seconds
        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenInquiryPopup', 'true');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(closePopup, 3000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-6 pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-blue-950/40 backdrop-blur-md pointer-events-auto"
                        onClick={closePopup}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl relative z-10 p-10 lg:p-16 pointer-events-auto overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <button onClick={closePopup} className="p-4 hover:bg-slate-100 rounded-full transition-colors">
                                <FiX className="text-2xl text-slate-400" />
                            </button>
                        </div>

                        {submitted ? (
                            <div className="text-center py-10">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-emerald-100">
                                    <FiCheckCircle className="text-5xl" />
                                </motion.div>
                                <h3 className="text-3xl font-black text-primary mb-4 italic">Success!</h3>
                                <p className="text-slate-500 font-bold italic">We've received your request. <br /> Talk to you soon!</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-10">
                                    <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4 block underline underline-offset-8 decoration-secondary">Enquiry Open</span>
                                    <h3 className="text-3xl lg:text-4xl font-black text-primary italic uppercase tracking-tighter">Plan a <span className="text-primary not-italic tracking-normal">Visit</span></h3>
                                    <p className="mt-4 text-slate-400 font-bold text-sm italic">Briefly share your details, and we'll arrange a personal campus tour for you.</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <input required type="text" placeholder="Your Full Name" className="w-full bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none font-bold" />
                                    <input required type="tel" placeholder="Phone Number" className="w-full bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none font-bold" />
                                    <button type="submit" className="w-full py-6 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-4 hover:bg-blue-800 transition-all">
                                        Request Tour <FiSend />
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default InquiryPopup;
