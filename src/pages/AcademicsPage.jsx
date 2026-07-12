import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight, FiCheckCircle, FiBookOpen, FiActivity,
  FiUsers, FiLayers, FiActivity as FiFeather, FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiStar, FiChevronDown
} from 'react-icons/fi';
import SchoolLogo from '../assets/image.png';
import heroImg from '../assets/hero.png';
import SEO from '../components/SEO';

const CURRICULUM = [
  {
    title: 'The Discovery Phase',
    age: 'Pre-Primary (3-5 Years)',
    desc: 'A nurturing Montessori-inspired environment where play-based learning sparks curiosity, develops motor skills, and fosters early social bonding.',
    subjects: ['Sensory Exploration', 'Social Discovery', 'Phonic Basics', 'Creative Play']
  },
  {
    title: 'The Foundation Phase',
    age: 'Primary School (6-11 Years)',
    desc: 'Moving beyond rote learning to conceptual clarity. We lay a strong foundation in literacy and numeracy while encouraging a "What" and "Why" mindset.',
    subjects: ['Conceptual Math', 'Applied Sciences', 'Global Languages', 'Value Education']
  },
  {
    title: 'The Mastery Phase',
    age: 'Middle & Secondary',
    desc: 'Intensive academic support integrated with scientific inquiry and critical analysis to prepare students for the global board challenges ahead.',
    subjects: ['Advanced Analytics', 'Scientific Research', 'Digital Literacy', 'Leadership Workshops']
  },
];

const FACULTY = [
  { name: 'Dr. Anita Roy', role: 'Head of Academics', expertise: 'Ph.D. in Pedagogy' },
  { name: 'Mr. Sameer Khanna', role: 'Senior Science Lead', expertise: 'M.Sc. Physics' },
  { name: 'Mrs. Arpita Das', role: 'Language Specialist', expertise: 'MA Literature' },
];

export default function AcademicsPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => scrollTo(id), 500);
    }
  }, [window.location.hash]);

  const academicSublinks = {
    'Curriculum': 'curriculum',
    'Co-curricular': 'co-curricular',
    'Faculty': 'faculty'
  };

  const navLinks = [
    { label: 'Home', id: 'home', path: '/' },
    { label: 'About Us', id: 'about', path: '/about' },
    { label: 'Academics', id: 'academics', path: '/academics', dropdown: ['Curriculum', 'Co-curricular', 'Faculty'] },
    { label: 'Admissions', id: 'admissions', path: '/admissions', dropdown: ['Process', 'Fee Structure', 'Inquiry'] },
    { label: 'Facilities', id: 'facilities', path: '/facilities' },
    { label: 'Gallery', id: 'gallery', path: '/gallery' },
    { label: 'Contact', id: 'contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans pt-20 selection:bg-blue-50">
      <SEO
        title="Academic Excellence"
        description="Explore the academic roadmap at XYZ School. From basic discovery to advanced mastery, our curriculum is designed for 21st-century success."
        keywords="XYZ School curriculum, secondary education, science lab school, academic excellence MP"
      />

      {/* 🟦 HERO HEADER */}
      <div className="pt-32 pb-12 sm:pt-48 sm:pb-20 bg-slate-900 relative overflow-hidden text-center">
        {/* Sub-page Hero Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/80 z-10" />
          <img src={heroImg} alt="Academics" className="w-full h-full object-cover opacity-40 blur-sm" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 py-2 bg-primary text-white rounded-full text-[11px] sm:text-[12px] font-black uppercase tracking-widest mb-6 inline-block"
          >
            Academic Excellence
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-tight"
          >
            Nurturing <span className="text-secondary">Global Minds</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-xl font-medium text-blue-50/80 max-w-3xl mx-auto leading-relaxed"
          >
            XYZ Higher Secondary School offers a multi-faceted curriculum designed to foster critical thinking, creativity, and a lifelong passion for learning.
          </motion.p>
        </div>
      </div>

      {/* 📚 CURRICULUM SECTIONS */}
      <section id="curriculum" className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {CURRICULUM.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-10 rounded-2xl md:rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary text-2xl shadow-sm mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                  <FiBookOpen />
                </div>
                <h4 className="text-[10px] md:text-[11px] font-black text-primary uppercase tracking-widest mb-1.5 md:mb-2">{level.age}</h4>
                <h3 className="text-xl md:text-2xl font-black text-primary mb-3 md:mb-4">{level.title}</h3>
                <p className="text-slate-500 font-medium mb-6 md:mb-8 text-sm md:text-base leading-relaxed italic">{level.desc}</p>
                <div className="space-y-4">
                  {level.subjects.map(sub => (
                    <div key={sub} className="flex items-center gap-4">
                      <FiCheckCircle className="text-blue-500" />
                      <span className="text-sm font-bold text-slate-700">{sub}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⛹️ CO-CURRICULAR */}
      <section id="co-curricular" className="pb-12 md:pb-16 lg:pb-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-primary rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-16 lg:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/20 -skew-x-12 translate-x-1/2" />
            <div className="relative z-10 max-w-3xl">
              <span className="text-secondary font-black text-[10px] md:text-xs uppercase tracking-widest mb-4 block">Beyond Textbooks</span>
              <h2 className="text-3xl lg:text-5xl font-black mb-6 md:mb-8 leading-tight">Empowering Talent <br />Through <span className="text-secondary italic">Activities</span></h2>
              <div className="grid sm:grid-cols-2 gap-8 md:gap-10 mt-10 md:mt-12">
                {[
                  { icon: <FiActivity />, title: 'Elite Sports', desc: 'Professional training in Cricket, Football, and Yoga to build physical resilience and team spirit.' },
                  { icon: <FiFeather />, title: 'Creative Hearts', desc: 'Music, Performing Arts, and Visual Design programs curated to unleash the creative potential of every child.' },
                  { icon: <FiUsers />, title: 'Leadership Clubs', desc: 'Debate, Coding, and Drama societies that foster collaboration, public speaking, and digital fluency.' },
                  { icon: <FiLayers />, title: 'EQ Workshops', desc: 'Nurturing emotional intelligence, ethics, and social responsibility to create balanced global citizens.' },
                ].map((act, i) => (
                  <div key={i} className="space-y-4">
                    <div className="text-secondary text-3xl">{act.icon}</div>
                    <h4 className="text-xl font-bold">{act.title}</h4>
                    <p className="text-blue-100/60 leading-relaxed font-medium text-sm">{act.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧑‍🏫 OUR FACULTY */}
      <section id="faculty" className="py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <span className="text-primary font-black text-[10px] md:text-xs uppercase tracking-widest mb-3 md:mb-4 block">Mentorship</span>
          <h2 className="text-3xl lg:text-5xl font-black text-primary mb-10 md:mb-12">Meet Our Expert Faculty</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {FACULTY.map((member, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center text-primary text-4xl font-black">
                  {member.name[0]}
                </div>
                <h4 className="text-xl font-black text-primary mb-1">{member.name}</h4>
                <p className="text-primary font-bold text-[12px] uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-slate-500 text-sm font-semibold">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

