import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight, FiCheckCircle, FiBookOpen, FiActivity, FiLayers, FiTarget,
  FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiStar, FiChevronDown
} from 'react-icons/fi';
import SchoolLogo from '../assets/image.png';

import libraryImg from '../assets/library.png';
import labsImg from '../assets/labs.png';
import sportsImg from '../assets/sports.png';
import smartClassImg from '../assets/smart_class.png';
import SEO from '../components/SEO';

const FACILITIES = [
  {
    id: 'labs',
    title: 'Advanced Laboratories',
    desc: 'High-tech Physics, Chemistry, and Biology labs equipped with modern apparatus for hands-on scientific exploration.',
    image: labsImg,
    features: ['Modern Scientific Apparatus', 'Strict Safety Protocols', 'Expert Lab Assistants', 'Weekly Practical Sessions']
  },
  {
    id: 'library',
    title: 'Resource Library',
    desc: 'A vast collection of over 10,000+ books, journals, and digital resources in a quiet, air-conditioned environment.',
    image: libraryImg,
    features: ['E-Library Access', 'Current Affairs Section', 'Research Journals', 'Interactive Reading Pods']
  },
  {
    id: 'sports',
    title: 'Sports Complex',
    desc: 'Extensive outdoor and indoor sports facilities including basketball courts, cricket nets, and a specialized athletics track.',
    image: sportsImg,
    features: ['Professional Coaching', 'Multipurpose Gymnasium', 'Indoor Games Arena', 'Annual Sports Meet']
  },
  {
    id: 'smart-classes',
    title: 'Smart Classrooms',
    desc: 'Every classroom is equipped with interactive smart boards and high-speed internet to enable visual learning.',
    image: smartClassImg,
    features: ['Digital Courseware', 'Audio-Visual Systems', 'Ergonomic Furniture', 'Air-Conditioned Comfort']
  }
];

const FacilitiesPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Scroll behavior handled globally or locally if needed
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };


  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-primary">
      <SEO
        title="Modern Campus & Facilities"
        description="Explore the world-class infrastructure at XYZ School. From advanced smart labs to sprawling sports complexes, we provide the best environment for your child."
        keywords="XYZ School labs, smart classroom , school sports, e-library MP school"
      />

      {/* 🟦 HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-primary overflow-hidden text-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover opacity-20"
            alt="School Facilities"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-transparent to-white z-10" />
        </div>
        <div className="container mx-auto px-6 relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-tight"
          >
            World Class <span className="text-secondary">Campus</span>
          </motion.h1>
          <p className="text-lg sm:text-xl font-medium text-white/80 max-w-2xl mx-auto">
            Providing an environment that inspires learning, innovation, and holistic performance.
          </p>
        </div>
      </section>

      {/* 🏛️ FACILITIES SHOWCASE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          {FACILITIES.map((fac, i) => (
            <div
              key={fac.id}
              id={fac.id}
              className={`grid lg:grid-cols-2 gap-16 items-center mb-32 last:mb-0 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={i % 2 !== 0 ? 'lg:order-2' : ''}
              >
                <span className="text-primary font-black text-[11px] uppercase tracking-widest mb-4 block italic">Infrastructure</span>
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-primary mb-8 tracking-tighter leading-none">{fac.title}</h2>
                <p className="text-slate-600 font-semibold mb-8 text-base sm:text-lg leading-relaxed">{fac.desc}</p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {fac.features.map(f => (
                    <li key={f} className="flex items-center gap-4 text-[11px] font-black text-slate-800 uppercase tracking-tight">
                      <FiCheckCircle className="text-emerald-500 text-base sm:text-lg" /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group h-[400px] lg:h-[500px]"
              >
                <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -rotate-3 group-hover:rotate-0 transition-transform" />
                <img
                  src={fac.image}
                  className="w-full h-full object-cover rounded-[3rem] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                  alt={fac.title}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* 📞 CTA SECTION */}
      <section className="py-24 bg-slate-900 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tighter italic">Experience It <span className="text-secondary">Live</span></h2>
          <p className="text-blue-100/60 font-medium mb-12 max-w-xl mx-auto italic">Book a personalized campus tour to see our facilities in action and meet our expert subject heads.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button onClick={() => navigate('/admissions')} className="w-full sm:w-fit px-10 py-6 bg-primary text-white rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-4 shadow-xl shadow-blue-400/20 active:scale-95 transition-all">Schedule Tour <FiTarget /></button>
            <button onClick={() => navigate('/contact')} className="w-full sm:w-fit px-10 py-6 bg-white text-primary rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-4 active:bg-slate-50 transition-all">Contact Admissions</button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FacilitiesPage;

