import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin, FiActivity, FiArrowRight, FiCheckCircle, FiStar
} from 'react-icons/fi';
import SchoolLogo from '../../assets/image.png';

const PublicFooter = () => {
  const navigate = useNavigate();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-blue-950 pt-10 sm:pt-14 pb-6 px-6 lg:px-12 relative overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 relative z-10">

        {/* Brand Section */}
        <div className="space-y-6 md:space-y-8">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={scrollToTop}>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl group-hover:rotate-6 transition-transform">
              <img src={SchoolLogo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
                            <h4 className="text-lg md:text-xl font-black leading-none text-white uppercase tracking-tighter text-wrap max-w-[200px]">XYZ Higher Secondary School</h4>
              <p className="text-[8px] font-bold text-blue-400 uppercase tracking-[0.3em] mt-1.5">Nurturing Leaders</p>
            </div>
          </div>

          <p className="text-blue-100/60 text-sm leading-relaxed font-semibold max-w-xs">
            Since 1991, we've been dedicated to providing a transformative educational experience that empowers students to excel and lead with integrity.
          </p>

          <div className="flex gap-3 md:gap-4">
            {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
              <div key={i} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-900 cursor-pointer transition-all opacity-80 hover:opacity-100 text-white shadow-lg">
                <Icon className="text-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="sm:pt-0 pt-4">
          <h5 className="font-black text-base mb-4 sm:mb-6 text-white uppercase tracking-widest text-[11px] flex items-center gap-3">
            <span className="w-6 h-1 bg-blue-500 rounded-full" /> Navigation
          </h5>
          <ul className="space-y-3 font-bold text-[10px] text-blue-100/60 uppercase tracking-widest">
            {footerLinks.map(link => (
              <li
                key={link.name}
                onClick={() => { navigate(link.path); scrollToTop(); }}
                className="flex items-center gap-3 hover:text-white cursor-pointer transition-all hover:translate-x-2 group"
              >
                <FiArrowRight className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                {link.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Accreditations */}
        <div className="sm:pt-0 pt-4">
          <h5 className="font-black text-base mb-4 sm:mb-6 text-white uppercase tracking-widest text-[11px] flex items-center gap-3">
            <span className="w-6 h-1 bg-blue-500 rounded-full" /> Excellence
          </h5>
          <ul className="space-y-3 font-bold text-[10px] text-blue-100/60 uppercase tracking-widest">
            <li className="flex items-center gap-3 py-2.5 px-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
              <FiCheckCircle className="text-emerald-400 text-lg" />
              <span>CBSE Affiliated</span>
            </li>
            <li className="flex items-center gap-3 py-2.5 px-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
              <FiCheckCircle className="text-emerald-400 text-lg" />
              <span>ISO 9001:2015</span>
            </li>
            <li className="flex items-center gap-3 py-2.5 px-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
              <FiStar className="text-amber-400 text-lg" />
              <span>Top Managed School</span>
            </li>
          </ul>
        </div>


      </div>

      <div className="max-w-7xl mx-auto mt-10 sm:mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
        <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] text-center md:text-left">
                    © 2026 XYZ Higher Secondary School. Crafted for Excellence.
        </p>
        <div className="flex items-center gap-6 sm:gap-8 text-[9px] font-black uppercase tracking-widest text-white/40">
          <Link to="/privacy-policy" className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-use" className="hover:text-blue-400 cursor-pointer transition-colors">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
