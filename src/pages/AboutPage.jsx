import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight, FiCheckCircle, FiTarget, FiUsers, FiAward, FiEye,
  FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiStar, FiActivity, FiChevronDown
} from 'react-icons/fi';
import SchoolLogo from '../assets/image.png';
import SEO from '../components/SEO';

import founderImg from '../assets/founder.png';
import mdImg from '../assets/md.png';
import principalImg from '../assets/principal_new.png';
import sciHead from '../assets/faculty_science_head.png';
import mathHead from '../assets/faculty_math_head.png';

import libraryImg from '../assets/library.png';
import graduationImg from '../assets/graduation_celebration.png';

const LEADERSHIP = [
  {
    name: 'Dr. Vikram Singh',
    role: 'Founder & Chairman',
    desc: 'A visionary educationist with over 30 years of experience in institutional building.',
    image: founderImg
  },
  {
    name: 'Mrs. Sarita Singh',
    role: 'Managing Director',
    desc: 'Leading the school operations with a focus on holistic development and modern pedagogy.',
    image: mdImg
  },
  {
    name: 'Prof. Rajesh Khanna',
    role: 'Principal',
    desc: 'Academic leader committed to bringing global standards to local education.',
    image: principalImg
  }
];

const FACULTY = [
  {
    name: 'Dr. Meenakshi Iyer',
    role: 'Head of Science',
    qual: 'Ph.D. in Physics, M.Ed.',
    desc: 'Passionate about quantum mechanics and nurturing scientific curiosity.',
    image: sciHead
  },
  {
    name: 'Prof. Arvind Sharma',
    role: 'Head of Mathematics',
    qual: 'M.Sc. Statistics, B.Ed.',
    desc: 'Expert in logical reasoning and making complex calculus intuitive.',
    image: mathHead
  },
  {
    name: 'Mrs. Suman Rao',
    role: 'Head of Languages',
    qual: 'M.A. English Literature',
    desc: 'Dedicated to fostering linguistic brilliance and creative writing.',
    image: sciHead // Reusing for demo or I could generate more
  }
];

const AboutPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('about');

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


  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-primary pt-20">
      <SEO
        title="Our Faculty & Legacy | XYZ Higher Secondary School 2026-27"
        description="Established in 1991, XYZ School is built on a foundation of veteran mentorship and character building. Meet our leadership and academic heads for the 2026-27 session."
        keywords="XYZ School history, school leadership , best teachers, school legacy MP, 2026-27 admissions"
      />

      {/* 🟦 HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover opacity-30"
            alt="School Heritage"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-transparent to-white z-10" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-tight"
          >
            Our <span className="text-secondary">Legacy</span>
          </motion.h1>
          <p className="text-base md:text-lg font-medium text-white/80 max-w-2xl mx-auto">
            Established in 1991, XYZ Higher Secondary School has been a cornerstone of academic excellence and character building.
          </p>
        </div>
      </section>

      {/* 📜 HISTORY */}
      <section id="history" className="py-12 md:py-16 lg:py-20 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-primary font-black text-[10px] uppercase tracking-widest mb-3 block underline underline-offset-8 decoration-secondary">Empowering Generations Since 1991</span>
              <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-primary mb-4 md:mb-6 tracking-tighter leading-tight italic">Nurturing Leaders <br /><span className="text-primary">of Tomorrow</span></h2>
              <p className="text-slate-600 font-bold mb-6 text-base sm:text-lg leading-relaxed">
                Welcome to XYZ Higher Secondary School, where curiosity meets discipline. Since our inception in 1991, we have been more than just an institution; we are a sanctuary of learning committed to uncovering the unique spark within every child.
              </p>
              <p className="text-slate-600 font-semibold text-base sm:text-lg leading-relaxed">
                Founded with a humble strength of 50 students, we have evolved into a premier educational hub serving over 1500 students today. Our journey is defined by a relentless pursuit of character building and academic mastery.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-6 h-fit">
              <div className="space-y-4">
                <img src={libraryImg} className="rounded-2xl shadow-xl w-full h-auto" alt="School Life" />
                <div className="p-6 md:p-8 bg-primary rounded-2xl text-white">
                  <h4 className="text-2xl md:text-3xl font-black mb-1">30+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Years of Growth</p>
                </div>
              </div>
              <div className="space-y-4 pt-8 md:pt-12">
                <div className="p-6 md:p-8 bg-slate-100 rounded-2xl text-primary border border-slate-200">
                  <h4 className="text-2xl md:text-3xl font-black mb-1">1500+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Alumni Base</p>
                </div>
                <img src={graduationImg} className="rounded-2xl shadow-xl w-full h-auto" alt="Graduation" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 MISSION & VISION */}
      <section id="mission" className="py-12 md:py-16 lg:py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h3 className="text-3xl lg:text-5xl font-black text-primary tracking-tighter italic">Foundations of <span className="text-primary italic">Excellence</span></h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 lg:p-14 rounded-[2rem] shadow-xl border border-blue-50 group">
              <div className="w-14 h-14 bg-blue-100/50 rounded-xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary transition-colors duration-500">
                <FiTarget className="text-3xl text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-2xl font-black text-primary mb-4 italic">Our Mission</h4>
              <p className="text-slate-600 font-semibold leading-relaxed text-base md:text-lg">
                At XYZ School, our mission is to provide an ecosystem of excellence where cutting-edge technology, veteran mentorship, and values-based learning converge. We strive to create a safe, nurturing environment where every child feels empowered to realize their full academic and social potential.
              </p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-blue-900 p-8 lg:p-14 rounded-[2rem] shadow-xl text-white group">
              <div className="w-14 h-14 bg-blue-800 rounded-xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-white transition-colors duration-500">
                <FiEye className="text-3xl text-blue-200 group-hover:text-primary transition-colors" />
              </div>
              <h4 className="text-2xl font-black text-white mb-4 italic">Our Vision</h4>
              <p className="text-blue-100/80 font-semibold leading-relaxed italic text-lg md:text-xl text-wrap">
                "To be a global benchmark in holistic education, balancing academic rigor with deep character building. We envision a generation of responsible global citizens who lead with compassion and innovate with purpose."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🚀 UNIQUE SELLING POINTS (USPs) */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              {[
                { icon: <FiStar />, title: 'Veteran Faculty', desc: 'Over 3 decades of pedagogical excellence with educators who mentor, not just teach.' },
                { icon: <FiActivity />, title: 'Modern Infra', desc: 'Smart classrooms, advanced science labs, and a sprawling digital library.' },
                { icon: <FiAward />, title: 'Holistic Growth', desc: 'Balanced emphasis on sports, performing arts, and emotional intelligence.' },
                { icon: <FiCheckCircle />, title: 'Safety First', desc: 'CCTV-monitored campus with a strict focus on child safety and moral values.' }
              ].map((usp, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 md:p-8 bg-slate-50 rounded-[1.5rem] border border-slate-100"
                >
                  <div className="text-blue-600 text-2xl mb-3">{usp.icon}</div>
                  <h5 className="font-black text-primary text-[10px] uppercase tracking-widest mb-1.5">{usp.title}</h5>
                  <p className="text-slate-500 text-[9px] md:text-xs font-bold leading-relaxed">{usp.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-3 block">The Vikram Advantage</span>
              <h2 className="text-3xl lg:text-6xl font-black text-primary mb-4 md:mb-6 tracking-tighter leading-tight italic">Why Families <br /><span className="text-primary">Trust Us</span></h2>
              <p className="text-slate-600 font-semibold text-base md:text-lg leading-relaxed mb-8">
                Choosing the right school is the most important decision you'll make for your child. At XYZ School, we don't just provide an education; we provide a future built on the pillars of integrity, innovation, and excellence.
              </p>
              <button onClick={() => navigate('/admissions')} className="group flex items-center gap-4 text-primary font-black uppercase text-[10px] tracking-widest">
                Learn About Admissions <div className="p-3 bg-primary text-white rounded-full group-hover:translate-x-2 transition-transform"><FiArrowRight /></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 📜 PRINCIPAL'S MESSAGE */}
      <section className="py-12 md:py-16 lg:py-20 bg-white border-b border-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-14 lg:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/40 -skew-x-12 translate-x-1/2" />
            <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-14 relative z-10">
              <div className="w-full lg:w-1/3 aspect-[4/5] rounded-[2rem] overflow-hidden border-8 border-white/5 shadow-2xl">
                <img src={principalImg} className="w-full h-full object-cover" alt="Principal" />
              </div>
              <div className="w-full lg:w-2/3">
                <span className="text-secondary font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">From the Desk of the Principal</span>
                <h2 className="text-3xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight tracking-tighter uppercase italic">Empowering the <br /><span className="text-secondary not-italic uppercase tracking-widest">Leaders of tomorrow</span></h2>
                <div className="space-y-4 text-lg md:text-xl text-blue-50/80 font-medium leading-relaxed italic">
                  <p>"At XYZ Higher Secondary School, we believe that education is not just the filling of a pail, but the lighting of a fire. Every student who enters our gates is a universe of potential waiting to be explored."</p>
                  <p>"Our commitment goes beyond textbooks. we focus on character building, moral integrity, and the emotional intelligence needed to navigate the complexities of the 21st century."</p>
                </div>
                <div className="mt-8 flex items-center gap-5">
                  <div className="w-12 h-1 bg-secondary rounded-full" />
                  <div>
                    <h5 className="text-xl md:text-2xl font-black text-white">Prof. Rajesh Khanna</h5>
                    <p className="text-secondary font-bold uppercase text-[9px] tracking-widest mt-1">Head of Institution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 👥 LEADERSHIP */}
      <section id="leadership" className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-3 block">Our Pillars</span>
            <h2 className="text-3xl lg:text-5xl font-black text-primary tracking-tighter italic">The <span className="text-primary">Leadership</span> Team</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
            {LEADERSHIP.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-[4/5] shadow-2xl">
                  <img src={member.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={member.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-8 left-8">
                    <h5 className="text-xl md:text-2xl font-black text-white leading-none">{member.name}</h5>
                    <p className="text-secondary font-bold uppercase text-[10px] tracking-widest mt-2">{member.role}</p>
                  </div>
                </div>
                <p className="px-4 text-slate-500 font-semibold text-center leading-relaxed text-sm">
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧑‍🏫 ACADEMIC FACULTY */}
      <section id="faculty" className="py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-3 block">Our Mentors</span>
            <h2 className="text-3xl lg:text-5xl font-black text-primary tracking-tighter italic uppercase">Academic <span className="text-primary italic">Leadership</span></h2>
            <p className="text-slate-500 font-semibold mt-3 text-sm md:text-base">Meet the brilliant minds guiding our students toward excellence.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {FACULTY.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-2xl transition-all group"
              >
                <div className="relative mb-8 md:mb-10">
                  <div className="w-full aspect-square rounded-[2rem] overflow-hidden shadow-xl mb-6 md:mb-8">
                    <img src={member.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={member.name} />
                  </div>
                  <div className="absolute -bottom-3 right-3 bg-primary px-5 py-2 rounded-xl text-white font-black text-[9px] uppercase tracking-widest shadow-lg">
                    {member.role}
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-black text-primary mb-1.5 italic leading-tight">{member.name}</h4>
                <p className="text-blue-600 font-bold text-[9px] uppercase tracking-[0.2em] mb-3">{member.qual}</p>
                <div className="w-10 h-1 bg-slate-100 rounded-full mb-4 md:mb-6 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                <p className="text-slate-500 font-semibold italic text-xs leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📞 CTA SECTION */}
      <section className="py-12 md:py-16 lg:py-20 bg-blue-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white p-8 md:p-14 lg:p-20 rounded-[2.5rem] text-center shadow-[0_60px_120px_rgba(30,58,138,0.05)] border border-blue-100">
            <h3 className="text-3xl md:text-4xl font-black text-primary mb-4 md:mb-6">Join Our Growing Family</h3>
            <p className="text-slate-500 font-medium mb-8 md:mb-12 max-w-xl mx-auto text-sm md:text-base">Discover why generations of families have trusted XYZ Higher Secondary School for their children's education.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate('/admissions')} className="w-full sm:w-fit px-8 py-4 bg-primary text-white rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-200 active:scale-95 transition-all">Admissions 2026-27 <FiArrowRight /></button>
              <button onClick={() => navigate('/facilities')} className="w-full sm:w-fit px-8 py-4 bg-slate-100 text-slate-900 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 border border-slate-200 active:bg-slate-200 transition-all">Explore Campus</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

