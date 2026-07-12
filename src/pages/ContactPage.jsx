import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight, FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheckCircle,
  FiMenu, FiX, FiFacebook, FiTwitter, FiInstagram, FiStar, FiActivity
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import SchoolLogo from '../assets/image.png';
import SEO from '../components/SEO';

const ContactPage = () => {
  const navigate = useNavigate();
  const { addToast } = useApp();
  const [activeSection, setActiveSection] = useState('contact');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Support',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    // Pre-submission validation
    if (!formState.name || !formState.phone || !formState.message) {
      setFormError('⚠️ All mandatory fields must be filled.');
      addToast('warning', 'Validation Error', 'Please complete the name, phone, and message fields.');
      setIsSubmitting(false);
      return;
    }

    if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      setFormError('⚠️ Invalid email address.');
      addToast('warning', 'Invalid Email', 'The email format provided is incorrect.');
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setSubmitted(true);
      addToast('success', 'Thank You!', 'Your message has been received. We will contact you shortly.');
      setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      setFormError('🚫 Submission failed. Please try again.');
      addToast('error', 'Critical Error', 'There was a problem submitting your request.');
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Academics', path: '/academics' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans pt-20">
      <SEO 
        title="Contact & Careers" 
        description="Get in touch with XYZ Higher Secondary School. Find our address in , MP, or send us an inquiry for admissions and campus tours."
        keywords="contact XYZ School,  school map, school phone number , school email address "
      />

      {/* 🟦 HERO */}
      <section className="relative h-[30vh] md:h-[35vh] min-h-[280px] md:min-h-[320px] flex items-center justify-center bg-primary overflow-hidden text-center pt-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px] z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-transparent to-white z-10" />
        </div>
        <div className="container mx-auto px-6 relative z-20">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-tight">Contact <span className="text-secondary">Us</span></motion.h1>
          <p className="text-base md:text-lg font-medium text-white/80 max-w-2xl mx-auto italic">We are here to answer your questions and guide you through the XYZ School experience.</p>
        </div>
      </section>

      {/* 📬 CONTACT INFO & FORM */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side: Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-primary font-black text-[10px] uppercase tracking-widest mb-3 block animate-pulse">Connect with us</span>
              <h2 className="text-3xl lg:text-5xl font-black text-primary mb-8 md:mb-10 tracking-tighter italic">Let's Start a <span className="text-primary">Conversation</span></h2>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex gap-4 sm:gap-6 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white shrink-0 shadow-lg shadow-blue-100">
                    <FiClock className="text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-primary mb-1.5">School Hours</h4>
                    <p className="text-slate-500 font-semibold leading-relaxed text-xs sm:text-sm">Mon – Sat: 8:00 AM – 4:00 PM <br /> Sun: Closed (Holiday)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-blue-50/50 p-8 lg:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-blue-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />

              <h3 className="text-2xl md:text-3xl font-black text-primary mb-6 md:mb-8">Send a Message</h3>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-200">
                    <FiCheckCircle className="text-4xl" />
                  </div>
                  <h4 className="text-2xl font-black text-primary mb-2">Message Sent!</h4>
                  <p className="text-slate-500 font-medium italic">Our team will get back to you within 24 business hours.</p>
                </motion.div>
              ) : (
                <form 
                  name="contact-form" 
                  method="POST" 
                  data-netlify="true" 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact-form" />
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-4">Full Name</label>
                      <input
                        name="name"
                        required
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-blue-600 focus:shadow-lg transition-all font-semibold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-4">Phone Number</label>
                      <input
                        name="phone"
                        required
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-blue-600 focus:shadow-lg transition-all font-semibold"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-4">Email Address (Optional)</label>
                    <input
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-blue-600 focus:shadow-lg transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-4">Subject</label>
                    <select
                      name="subject"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-blue-600 focus:shadow-lg transition-all font-semibold appearance-none"
                    >
                      <option>General Support</option>
                      <option>Admissions Inquiry</option>
                      <option>Feedback</option>
                      <option>Career Opportunity</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-4">Your Message</label>
                    <textarea
                      name="message"
                      rows="3"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-blue-600 focus:shadow-lg transition-all resize-none font-semibold"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-4 md:py-5 rounded-xl font-black text-[12px] md:text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 disabled:bg-slate-300 disabled:shadow-none transition-all flex items-center justify-center gap-4"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <FiSend className={isSubmitting ? 'animate-bounce' : ''} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ContactPage;

