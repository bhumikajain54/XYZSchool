import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight, FiMaximize2, FiActivity, FiStar, FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiChevronDown
} from 'react-icons/fi';
// Assets from public folder
import SchoolLogo from '../assets/image.png';

import AnnualCelebrationImg from '../assets/annual_celebration.png';
import ScienceFairImg from '../assets/science_fair.png';
import SportsAchievementImg from '../assets/sports_achievement.png';
import smartClassImg from '../assets/smart_class.png';
import SEO from '../components/SEO';

const EVENTS = [
  { 
    date: 'Dec 15', 
    title: 'Annual Sports Meet 2024', 
    desc: 'Join us for a day of athletic excellence and team spirit. Highlights include inter-house matches and the parent-teacher relay.', 
    image: SportsAchievementImg 
  },
  { 
    date: 'Jan 10', 
    title: 'Science & Innovation Fair', 
    desc: 'Students from Classes VI–XII will showcase their breakthrough projects in robotics, sustainable energy, and AI.', 
    image: ScienceFairImg 
  },
  { 
    date: 'Feb 20', 
    title: 'Grand Cultural Night', 
    desc: 'A spectacular evening of dance, drama, and musical performances celebrating India’s rich cultural diversity.', 
    image: AnnualCelebrationImg 
  }
];

const GALLERY_CATEGORIES = ['All', 'Campus', 'Events', 'Academic', 'Sports'];

const GALLERY_IMAGES = [
  { id: 1, category: 'Campus', title: 'Institutional Gateway', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80' },
  { id: 2, category: 'Academic', title: 'Advanced Research Lab', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80' },
  { id: 3, category: 'Events', title: 'Grand Convocation', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80' },
  { id: 4, category: 'Sports', title: 'Championship Court', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80' },
  { id: 5, category: 'Campus', title: 'Scholarly Archive', url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80' },
  { id: 6, category: 'Academic', title: 'Knowledge Symposium', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80' },
  { id: 7, category: 'Events', title: 'Annual Celebration', url: AnnualCelebrationImg },
  { id: 8, category: 'Sports', title: 'Athletic Arena', url: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80' },
  { id: 9, category: 'Campus', title: 'Digital Learning Hub', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80' }
];

const GalleryPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Scroll behavior handled globally or locally if needed
  }, []);

  const filteredImages = activeCategory === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);


  return (
    <div className="min-h-screen bg-white font-sans">
            <SEO 
        title="School Gallery & Events" 
        description="A visual journey of student life at XYZ Higher Secondary School. Explore our campus, academic events, and sports milestones."
        keywords="XYZ School photos, school events, sports day, campus gallery"
      />

      {/* 🟦 HERO */}
      <section className="relative min-h-[50vh] lg:h-[60vh] flex items-center justify-center bg-[#0a192f] overflow-hidden pt-32 pb-20 lg:pt-20 lg:pb-0">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-30 brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/80 via-transparent to-white/10 z-10" />
          {/* Animated particles or decor */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>
        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <span className="text-secondary font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-4 block">Our Visual Journey</span>
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white mb-6 tracking-tighter leading-[0.9] sm:leading-tight">School <br className="sm:hidden" /><span className="text-blue-500">Gallery</span></h1>
            <p className="text-base sm:text-lg lg:text-xl font-medium text-white/60 max-w-2xl mx-auto leading-relaxed">Capturing the vibrant moments, academic milestones, and lifelong memories at XYZ Higher Secondary School.</p>
          </motion.div>
        </div>
      </section>

      {/* 🖼️ FILTER & GRID */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Filter Categories */}
          <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-16 sm:mb-24 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0">
            {GALLERY_CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group flex-none ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200' 
                    : 'bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 border border-slate-100'
                }`}
              >
                <span className="relative z-10">{cat}</span>
              </motion.button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode='popLayout'>
              {filteredImages.map((img, i) => (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative h-[450px]"
                  onClick={() => setSelectedImage(img)}
                >
                  <div className="h-full w-full overflow-hidden rounded-[2rem] sm:rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative bg-slate-100">
                    <img 
                      src={img.url} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt={img.title} 
                    />
                    
                    {/* Glassmorphic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/40 to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[1px] sm:backdrop-blur-[2px] flex flex-col justify-end p-6 sm:p-12">
                      <div className="sm:translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-3 mb-2 sm:mb-4">
                          <span className="h-1 w-8 bg-blue-500 rounded-full" />
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">{img.category}</p>
                        </div>
                        <h5 className="text-xl sm:text-3xl font-black text-white leading-tight mb-4 sm:mb-6 tracking-tight">{img.title}</h5>
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center text-blue-900 shadow-xl self-start active:scale-95 transition-transform">
                          <FiMaximize2 className="text-lg sm:text-2xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 🖼️ LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-blue-950/98 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              className="absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl sm:text-3xl transition-colors z-[1010]"
            >
              <FiX />
            </motion.button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-7xl max-h-full"
            >
              <img
                src={selectedImage.url} className="w-full h-full rounded-[2rem] sm:rounded-[3rem] shadow-2xl object-contain border border-white/10"
              />
              <div className="absolute -bottom-16 md:-bottom-24 left-0 right-0 text-center">
                <h3 className="text-white text-2xl md:text-4xl font-black mb-2 md:mb-4 tracking-tighter italic">{selectedImage.title}</h3>
                <div className="flex items-center justify-center gap-4">
                   <span className="px-6 py-2 bg-blue-600 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">{selectedImage.category}</span>
                                      <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">XYZ Collection © 2026</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📅 EVENTS & NEWS SECTION */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div>
                            <span className="text-secondary font-black text-xs uppercase tracking-[0.4em] mb-4 block underline underline-offset-8 decoration-white/20">The School Bulletin</span>
              <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter italic uppercase">Events <span className="text-secondary">& Milestones</span></h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {EVENTS.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/5 rounded-[2.5rem] sm:rounded-[4rem] border border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-700"
              >
                <div className="h-56 sm:h-64 relative overflow-hidden">
                   <img src={event.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={event.title} />
                   <div className="absolute top-6 left-6 px-4 py-2 bg-secondary text-primary font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl">
                      {event.date}
                   </div>
                </div>
                <div className="p-8 sm:p-10">
                   <h4 className="text-xl sm:text-2xl font-black text-white mb-4 italic truncate">{event.title}</h4>
                   <p className="text-blue-100/60 font-semibold text-xs leading-relaxed italic">{event.desc}</p>
                   <div className="mt-8 flex items-center gap-4 text-blue-400 font-black text-[10px] uppercase tracking-widest cursor-pointer group/btn">
                      Read full update <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 p-8 sm:p-12 bg-white rounded-[2.5rem] sm:rounded-[4rem] flex flex-col lg:flex-row items-center justify-between gap-10">
             <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-6 sm:gap-8 text-center sm:text-left">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 text-blue-600 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center text-3xl sm:text-4xl">
                   <FiMail />
                </div>
                <div>
                   <h4 className="text-xl sm:text-2xl font-black text-primary italic uppercase">School Newsletter</h4>
                   <p className="text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest italic">Get the latest updates delivered to your inbox.</p>
                </div>
             </div>
             <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
                <input type="email" placeholder="Enter your email" className="bg-slate-50 px-6 sm:px-8 py-4 sm:py-6 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none flex-1 lg:w-80 font-bold text-sm sm:text-base" />
                <button className="px-8 sm:px-10 py-4 sm:py-6 bg-primary text-white rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Subscribe</button>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default GalleryPage;

