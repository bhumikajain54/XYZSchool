import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiCheckCircle, FiPhone, FiMail,
  FiMenu, FiX, FiArrowRight, FiStar,
  FiUsers, FiAward, FiShield, FiMonitor, FiActivity, FiTarget, FiHeart
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import SEO from '../components/SEO';

// Assets from assets folder
import labsImg from '../assets/labs.png';
import libraryImg from '../assets/library.png';
import sportsImg from '../assets/sports.png';
import topperImg from '../assets/board_topper.png';
import sportsAwardImg from '../assets/sports_achievement.png';

const HERO_BG = '/hero_new.png'; // from public
const PRINCIPAL_IMG = '/principal.png'; // from public
const GALLERY_LAB = labsImg;
const GALLERY_LIB = libraryImg;
const GALLERY_SPORTS = sportsImg;

const USPs = [
  { icon: <FiUsers />, title: 'Veteran Faculty', desc: 'Over 3 decades of pedagogical excellence with educators who mentor, not just teach.' },
  { icon: <FiShield />, title: 'Safe & Secure', desc: '24/7 CCTV surveillance and a dedicated child safety committee for a sanctuary of learning.' },
  { icon: <FiMonitor />, title: 'Smart Classrooms', desc: 'Interactive digital boards and technology-integrated learning that engage every student.' },
  { icon: <FiTarget />, title: 'Holistic Growth', desc: 'A rich ecosystem of sports, arts, and ethics to uncover the unique spark within every child.' },
  { icon: <FiCheckCircle />, title: 'Academic Mastery', desc: 'Consistent 100% board results with structured revision blocks and personalized attention.' },
  { icon: <FiActivity />, title: 'Global Infrastructure', desc: 'Advanced science labs and digital libraries that meet international standards of excellence.' },
];

const TestimonialCarousel = ({ testimonials }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative overflow-hidden px-4">
      <AnimatePresence mode="wait">
        <motion.div
           key={index}
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.95 }}
           transition={{ duration: 0.5 }}
           className="bg-white p-8 md:p-16 lg:p-24 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 relative group"
        >
           <FiStar className="text-sky-400 text-5xl opacity-10 absolute top-10 right-10" />
           <p className="text-xl md:text-3xl font-medium text-slate-700 leading-relaxed mb-10 italic">
              "{testimonials[index].comment}"
           </p>
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-black shadow-xl shadow-blue-500/20">
                {testimonials[index].initial}
              </div>
              <div>
                <h5 className="text-xl md:text-2xl font-black text-primary">{testimonials[index].name}</h5>
                <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{testimonials[index].role}</p>
              </div>
           </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { addToast } = useApp();
  const [activeSection, setActiveSection] = useState('home');
  const sections = ['home', 'about', 'facilities', 'academics', 'gallery', 'admissions', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY + 150;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= currentScroll && (el.offsetTop + el.offsetHeight) > currentScroll) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-poppins text-slate-900 overflow-x-hidden">
                        <SEO title="XYZ Higher Secondary School | Premier Institution in MP" />

      {/* 🟦 HERO SECTION */}
      <section id="home" className="relative min-h-[110vh] lg:min-h-screen flex flex-col items-center justify-start lg:justify-center overflow-hidden bg-slate-900 pt-32 pb-96 lg:pb-64">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1.5 }}
            src={HERO_BG}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-transparent to-slate-900" />
        </div>
        
        <div className="relative z-20 container mx-auto px-6 text-center lg:text-left pt-12 lg:pt-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mb-8 border border-blue-400/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> Excellence Since 1991
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.9] mb-10 tracking-tighter uppercase whitespace-pre-line">
                              XYZ <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-300 to-indigo-300 italic">SCHOOL</span>
            </h1>
            <p className="text-lg md:text-2xl text-blue-50/70 mb-12 font-medium max-w-2xl leading-relaxed">
                            Shaping future leaders with excellence, discipline, and modern innovation right in the heart of the region.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button 
                onClick={() => scrollTo('admissions')} 
                className="w-full sm:w-auto px-12 py-6 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-50 transition-all hover:-translate-y-1 active:scale-95"
              >
                Enroll Now 2026
              </button>
              <button 
                onClick={() => scrollTo('about')} 
                className="w-full sm:w-auto px-12 py-6 bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all"
              >
                Our Legacy
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Container - Adjusted for better spacing on all screens */}
        <div className="absolute bottom-12 lg:bottom-16 left-0 w-full px-6 z-30">
           <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {[
                { l: 'Students', v: '1500+', i: '🎓' },
                { l: 'Results', v: '100%', i: '🏆' },
                { l: 'Teachers', v: '75+', i: '🧑‍🏫' },
                { l: 'Labs', v: '12+', i: '🔬' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-[2rem] text-center group hover:bg-white/20 transition-all duration-500 shadow-2xl shadow-blue-950/20">
                   <div className="text-3xl md:text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform">{stat.i}</div>
                   <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.v}</div>
                   <div className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-blue-300/60">{stat.l}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 🏫 ABOUT SECTION */}
      <section id="about" className="py-24 px-6 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
            <span className="text-primary font-black text-[10px] uppercase tracking-widest mb-6 block border-l-4 border-primary pl-4">Discover Us</span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 leading-tight tracking-tighter uppercase italic">
              Nurturing <br /><span className="text-primary not-italic">Potential Since 1991</span>
            </h2>
            <div className="space-y-6 text-slate-600 font-bold leading-relaxed text-lg">
                                                        <p>Welcome to XYZ Higher Secondary School, a leading campus for holistic development. We believe in providing a sanctuary where every child can flourish.</p>
              <p>Our curriculum balances strict academic discipline with moral integrity, preparing students not just for exams, but for global leadership.</p>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/about')} 
                className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:-translate-y-1 transition-all"
              >
                Learn Our History
              </button>
            </div>
          </motion.div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] -rotate-3 transition-transform group-hover:rotate-0" />
            <div className="relative rounded-[3.5rem] overflow-hidden shadow-3xl aspect-square border-8 border-white">
              <img src={GALLERY_LIB} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-8 left-8 bg-primary/95 backdrop-blur-md p-8 rounded-3xl text-white shadow-2xl">
                 <h4 className="text-5xl font-black mb-1">35+</h4>
                 <p className="text-[11px] uppercase tracking-widest font-black text-blue-200">Years of Educational Growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎓 ADVANTAGES (USPs) */}
      <section id="facilities" className="py-24 px-6 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto text-center mb-20 px-6">
                    <span className="inline-block px-4 py-2 bg-blue-100 text-primary rounded-full font-black text-[10px] uppercase tracking-widest mb-6">Why XYZ?</span>
          <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter uppercase italic">Institutional Edge</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {USPs.map((usp, i) => (
            <div key={i} className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-blue-100 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                {usp.icon}
              </div>
              <h4 className="text-2xl font-black mb-4 text-primary">{usp.title}</h4>
              <p className="text-slate-500 font-semibold leading-relaxed text-sm">{usp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🖼️ CAMPUS LIFE (GALLERY) */}
      <section id="gallery" className="py-24 px-6 bg-white">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
            <div>
               <span className="text-primary font-black text-[10px] uppercase tracking-widest mb-4 block">Visual Tour</span>
               <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter uppercase italic">Campus Life</h2>
            </div>
            <button 
              onClick={() => navigate('/gallery')}
              className="px-10 py-5 bg-white border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all flex items-center gap-3"
            >
              Explore Full Gallery <FiArrowRight />
            </button>
         </div>

         <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 h-auto md:h-[500px] overflow-hidden group">
            {[
              { url: HERO_BG, title: 'Main Campus' },
              { url: GALLERY_LAB, title: 'Science Lab' },
              { url: GALLERY_LIB, title: 'Library' },
              { url: GALLERY_SPORTS, title: 'Sports' },
              { url: PRINCIPAL_IMG, title: 'Admin Block' }
            ].map((img, i) => (
              <div
                key={i}
                className="relative h-[250px] md:h-full flex-none md:flex-1 rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer bg-cover bg-center transition-all duration-700 md:group-hover:flex-[0.5] md:hover:flex-[4] shadow-2xl"
                style={{ backgroundImage: `url(${img.url})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-transparent opacity-100 md:opacity-0 hover:opacity-100 transition-all flex flex-col justify-end p-8">
                   <h4 className="text-white text-3xl font-black mb-2">{img.title}</h4>
                                      <p className="text-blue-300 text-[10px] font-black uppercase tracking-widest">Experience XYZ</p>
                </div>
              </div>
            ))}
         </div>
      </section>

      {/* 👨‍🏫 PRINCIPAL SECTION */}
      <section className="py-24 px-6 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-16 relative z-10">
           <div className="relative">
              <div className="absolute -inset-6 bg-white/5 rounded-[4rem] rotate-3" />
              <div className="relative rounded-[3.5rem] overflow-hidden shadow-3xl border-4 border-white/10 aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                 <img src={PRINCIPAL_IMG} className="w-full h-full object-cover" />
              </div>
           </div>
           <div>
              <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-8 block">Leadership Vision</span>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-tight tracking-tighter uppercase italic">
                 Commitment to <br /><span className="text-blue-400 not-italic">Holistic Growth</span>
              </h2>
              <p className="text-blue-100/70 font-bold text-xl md:text-2xl leading-relaxed italic mb-12">
                "We believe that every child is a unique universe of untapped potential. Our mission is to provide the wings and the roots to fly beyond horizons."
              </p>
              <div>
                 <h4 className="text-2xl font-black text-white">Mr. Vikramaditya Singh</h4>
                 <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-xs">Head of Institution</p>
              </div>
           </div>
        </div>
      </section>

      {/* 🏆 ACHIEVEMENTS */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
           <div>
              <span className="text-primary font-black text-[10px] uppercase tracking-widest mb-6 block">Hall of Fame</span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 leading-tight tracking-tighter uppercase italic">
                 Excellence in <br /><span className="text-primary not-italic">Every Block</span>
              </h2>
              <p className="text-slate-600 font-bold leading-relaxed text-lg mb-12">Celebrating our students who set high benchmarks in academic and athletic arenas across the state.</p>
              
              <div className="space-y-8">
                 {[
                   { l: 'Board Result 2024', v: '98.2% Class Average', i: topperImg },
                   { l: 'Sports Merit', v: 'State Championship Gold', i: sportsAwardImg }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-blue-50 transition-all cursor-pointer">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                         <img src={item.i} className="w-full h-full object-cover group-hover:scale-110 transition-all" />
                      </div>
                      <div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">{item.l}</span>
                         <h5 className="text-xl font-black text-primary">{item.v}</h5>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="grid grid-cols-2 gap-6">
              {[
                { v: '150+', l: 'Distinctions', c: 'bg-blue-600' },
                { v: '25+', l: 'State Awards', c: 'bg-indigo-600' },
                { v: '100', l: 'Pass Rate', c: 'bg-sky-600' },
                { v: '15+', l: 'Smart Labs', c: 'bg-blue-900' }
              ].map((box, i) => (
                <div key={i} className={`${box.c} p-10 rounded-[3rem] text-white flex flex-col justify-center shadow-2xl transform transition-transform hover:-translate-y-2`}>
                   <div className="text-4xl md:text-5xl font-black mb-2">{box.v}</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-white/60">{box.l}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 🛡️ SEALS OF TRUST */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { l: 'Board Affiliation', v: 'MP Board ()', i: <FiAward /> },
            { l: 'Quality Standard', v: 'ISO 9001:2015', i: <FiCheckCircle /> },
            { l: 'Safety First', v: 'CCTV Secure', i: <FiShield /> },
            { l: 'Academics', v: '1500+ Alums', i: <FiUsers /> }
          ].map((seal, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-primary text-3xl mb-6 shadow-xl group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110">
                {seal.i}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{seal.l}</span>
              <h4 className="text-xl font-black text-primary">{seal.v}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 📅 ADMISSIONS & INQUIRY FORM */}
      <section id="admissions" className="py-24 px-6 bg-slate-900 relative">
        <div className="absolute inset-0 z-0 opacity-20">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
           <div>
              <span className="px-5 py-2 bg-blue-500/10 text-blue-400 border border-blue-400/20 rounded-full font-black text-[10px] uppercase tracking-[0.3em] mb-8 inline-block">Enrollment 2026</span>
              <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-tight italic uppercase">
                 Join the <br /><span className="text-blue-400 not-italic">Lions Elite</span>
              </h2>
              <p className="text-blue-100/60 font-bold text-xl leading-relaxed max-w-md mb-12">
                                Secure your child's future at XYZ Higher Secondary School. Limited seats available for Session 2026-27.
              </p>
              

           </div>

           <div className="bg-white/10 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-3xl">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); addToast('success', 'Inquiry Sent!', 'Our team will contact you shortly.'); }}>
                 <div className="grid md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Guardian Name" required className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-blue-400/60 transition-all font-bold placeholder-white/20" />
                    <input type="tel" placeholder="Phone" required className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-blue-400/60 transition-all font-bold placeholder-white/20" />
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Student Name" required className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-blue-400/60 transition-all font-bold placeholder-white/20" />
                    <select className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-blue-400/60 font-bold appearance-none">
                       <option className="bg-slate-900">Desired Class</option>
                       <option className="bg-slate-900">Nursery - UKG</option>
                       <option className="bg-slate-900">Class 1 - 5</option>
                       <option className="bg-slate-900">Class 6 - 8</option>
                       <option className="bg-slate-900">Class 9 - 10</option>
                       <option className="bg-slate-900">Class 11 - 12 (Science)</option>
                       <option className="bg-slate-900">Class 11 - 12 (Commerce)</option>
                    </select>
                 </div>
                 <button type="submit" className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all shadow-blue-900/60 hover:-translate-y-1">
                   Submit Enrollment Inquiry
                 </button>
              </form>
           </div>
        </div>
      </section>

      {/* ⭐️ TESTIMONIALS */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
           <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4 block underline underline-offset-8">Testimonials</span>
           <h2 className="text-5xl lg:text-7xl font-black text-primary tracking-tighter italic uppercase mb-12">Voices of Success</h2>
           <div className="max-w-6xl mx-auto">
              <TestimonialCarousel testimonials={[
                 { name: "Priyanka Das", role: "Parent (Class 8)", comment: "The individual development here is outstanding. My child loves the science labs.", initial: 'P' },
                 { name: "Sameer Khanna", role: "Parent (Class 12)", comment: "Excellent infrastructure combined with deep moral values. Truly a premium institution.", initial: 'S' },
                 { name: "Rohan Roy", role: "Alumnus (IIT Delhi)", comment: "The mentorship I received helped me clear competitive exams with ease.", initial: 'R' }
              ]} />
           </div>
        </div>
      </section>

    </div>
  );
}
