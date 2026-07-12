import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiX, FiChevronDown, FiArrowRight, FiPhone, FiCheckCircle, FiMail, FiUser, FiChevronRight
} from 'react-icons/fi';
import SchoolLogo from '../../assets/image.png';

const NAV_LINKS = [
  { label: 'Home', id: 'home', path: '/' },
  {
    label: 'About Us',
    id: 'about',
    path: '/about',
    dropdown: [
      { label: 'History', section: 'history' },
      { label: 'Mission', section: 'mission' },
      { label: 'Leadership', section: 'leadership' }
    ]
  },
  {
    label: 'Academics',
    id: 'academics',
    path: '/academics',
    dropdown: [
      { label: 'Curriculum', section: 'curriculum' },
      { label: 'Co-curricular', section: 'co-curricular' },
      { label: 'Faculty', section: 'faculty' }
    ]
  },
  {
    label: 'Admissions',
    id: 'admissions',
    path: '/admissions',
    dropdown: [
      { label: 'Process', section: 'process' },
      { label: 'Fee Structure', section: 'fees' },
      { label: 'Inquiry', section: 'inquiry' }
    ]
  },
  { label: 'Facilities', id: 'facilities', path: '/facilities' },
  { label: 'Mandatory Disclosure', id: 'mandatory-disclosure', path: '/mandatory-disclosure' },
  { label: 'Gallery', id: 'gallery', path: '/gallery' },
  { label: 'Contact', id: 'contact', path: '/contact' }
];

const PublicNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const isHomePage = location.pathname === '/';
  const isNavSolid = scrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Body scroll lock
    if (mobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenu]);

  const handleNavClick = (link) => {
    const isHomePage = location.pathname === '/';

    if (isHomePage && link.id && !link.path.startsWith('/')) {
      scrollToSection(link.id);
    } else if (location.pathname === link.path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(link.path);
    }
    setMobileMenu(false);
  };

  const scrollToSection = (id) => {
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
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-4 sm:px-6 lg:px-12 py-2 sm:py-3 ${isNavSolid
        ? 'bg-white/90 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-1.5 sm:py-2 border-b border-blue-50/50'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo Section */}
          <div
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => handleNavClick({ path: '/' })}
          >
            <div className={`relative transition-all duration-700 ${isNavSolid ? 'scale-90' : 'scale-100'}`}>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center p-1.5 border border-slate-100/50 group-hover:rotate-6 transition-transform`}>
                                <img src={SchoolLogo} alt="XYZ School Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className={`text-base sm:text-lg lg:text-xl font-extrabold tracking-tight uppercase leading-tight transition-colors duration-500 whitespace-nowrap ${isNavSolid ? 'text-blue-900' : 'text-white'
                }`}>
                                XYZ <span className="font-light">H. S. School</span>
              </h1>
              <p className={`text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.25em] leading-none mt-0.5 transition-colors duration-500 ${isNavSolid ? 'text-blue-500/80' : 'text-blue-300'
                }`}>
                Nurturing Future Leaders
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-2 xl:gap-4">
            <div className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.id}
                  className="relative group py-2"
                  onMouseEnter={() => setActiveDropdown(link.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick(link)}
                    className={`px-3 xl:px-3 py-1.5 text-[10px] xl:text-[11px] font-bold uppercase tracking-widest flex items-center gap-1 transition-all duration-300 rounded-xl ${isNavSolid
                      ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      } ${location.pathname === link.path ? (isNavSolid ? 'text-blue-600' : 'text-white') : ''}`}
                  >
                    <span className="whitespace-nowrap">{link.label}</span>
                    {link.dropdown && (
                      <FiChevronDown className={`text-[10px] opacity-50 transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180 opacity-100' : ''}`} />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[110]"
                        >
                          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 min-w-[200px] overflow-hidden">
                            {link.dropdown.map(item => (
                              <button
                                key={item.label}
                                onClick={() => {
                                  navigate(`${link.path}#${item.section}`);
                                }}
                                className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all group/item"
                              >
                                {item.label}
                                <FiArrowRight className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-blue-500" />
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
            
            {/* Desktop Portal Access */}
            <div className="ml-4">
              <button
                onClick={() => navigate('/login')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all duration-500 ${isNavSolid
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 hover:-translate-y-0.5'
                  : 'bg-white/15 text-white backdrop-blur-md border border-white/20 hover:bg-white/25 hover:-translate-y-0.5'
                  }`}
              >
                <FiUser className="text-sm" /> Portal
              </button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="xl:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenu(true)}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl transition-all duration-500 ${isNavSolid
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'bg-white/10 text-white backdrop-blur-md border border-white/20'
                }`}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar - Outside <nav> to escape stacking context */}
      <AnimatePresence mode="wait">
        {mobileMenu && (
          <div className="fixed inset-0 z-[1000]">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm"
            />

            {/* Sidebar content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                backgroundColor: '#ffffff',
                height: '100dvh', // Use dynamic viewport height
                top: 0
              }}
              className="absolute right-0 bottom-0 w-[85%] max-w-[320px] flex flex-col shadow-[-20px_0_100px_rgba(0,0,0,0.2)]"
            >
              {/* Header - Stays at top */}
              <div className="flex-none p-6 border-b border-slate-100 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center p-2 shadow-lg">
                      <img src={SchoolLogo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
                    </div>
                    <div className="flex flex-col">
                                            <h4 className="font-black text-blue-900 text-sm uppercase tracking-tight leading-none">XYZ School</h4>
                      <p className="text-[7px] font-bold text-blue-500 uppercase tracking-widest mt-1">Institute of Excellence</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenu(false)}
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"
                  >
                    <FiX />
                  </button>
                </div>
              </div>

              {/* Primary Navigation - Scrollable only if needed */}
              <div className="flex-1 overflow-y-auto px-6 py-8 bg-white custom-scrollbar">
                <p className="text-[10px] font-black text-blue-600/40 uppercase tracking-[0.4em] mb-8">Navigation Menu</p>
                <div className="flex flex-col gap-2 pb-10">
                  {NAV_LINKS.map(link => (
                    <div key={link.id} className="relative">
                      <div
                        className={`w-full flex items-center justify-between py-4 text-sm font-black uppercase tracking-widest transition-all ${location.pathname === link.path || activeDropdown === link.id
                            ? 'text-blue-600'
                            : 'text-slate-800'
                          }`}
                      >
                        <button 
                          onClick={() => {
                            handleNavClick(link);
                            setMobileMenu(false);
                          }}
                          className="flex-1 text-left"
                        >
                          {link.label}
                        </button>
                        
                        {link.dropdown && (
                          <button 
                            onClick={() => setActiveDropdown(activeDropdown === link.id ? null : link.id)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeDropdown === link.id ? 'bg-blue-50 text-blue-600 rotate-180' : 'bg-slate-50 text-slate-300'}`}
                          >
                            <FiChevronDown />
                          </button>
                        )}
                        {!link.dropdown && <FiArrowRight className="text-slate-200" />}
                      </div>
                      
                      <AnimatePresence>
                        {link.dropdown && activeDropdown === link.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pt-1 pl-4 space-y-1">
                              {link.dropdown.map(item => (
                                <button
                                  key={item.label}
                                  onClick={() => {
                                    navigate(`${link.path}#${item.section}`);
                                    setMobileMenu(false);
                                  }}
                                  className="w-full text-left px-5 py-3.5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-blue-600 transition-colors bg-slate-50/50 rounded-xl flex items-center gap-3 mb-1"
                                >
                                  <div className="w-1 h-1 rounded-full bg-blue-300" />
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Sidebar Footer - Persistently visible Portal Access */}
              <div className="flex-none p-6 border-t border-slate-50 bg-slate-50/30">
                <button
                  onClick={() => { navigate('/login'); setMobileMenu(false); }}
                  className="w-full group relative flex items-center justify-between px-6 py-5 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 active:from-blue-700 active:to-blue-800" />
                  <div className="relative flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                      <FiUser size={18} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-white text-[11px] font-black uppercase tracking-widest">Portal Access</span>
                      <span className="text-blue-100/60 text-[8px] font-bold uppercase tracking-tight">Student & Staff Login</span>
                    </div>
                  </div>
                  <div className="relative w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                    <FiChevronRight size={18} />
                  </div>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic spacing spacer for sticky nav if needed (optional) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}</style>
    </>
  );
};

export default PublicNavbar;
