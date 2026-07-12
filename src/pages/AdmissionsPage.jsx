import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
   FiArrowRight, FiCheckCircle, FiPhone, FiMail, FiMapPin, FiMenu, FiX,
   FiFileText, FiCreditCard, FiTarget, FiFacebook, FiTwitter, FiInstagram, FiChevronDown, FiActivity, FiStar, FiUsers
} from 'react-icons/fi';
import SchoolLogo from '../assets/image.png';
import heroImg from '../assets/hero.png';
import SEO from '../components/SEO';

const FEES = [
   { grade: 'Pre-Primary', registration: '₹5,000', tuition: '₹35,000 /yr', inclusions: ['Uniforms', 'Books', 'Activity Kit'] },
   { grade: 'Primary (I-V)', registration: '₹7,500', tuition: '₹45,000 /yr', inclusions: ['Language Lab', 'Sports kit', 'IT Lab'] },
   { grade: 'Middle (VI-VIII)', registration: '₹10,000', tuition: '₹55,000 /yr', inclusions: ['Science Kits', 'Digital Library', 'Workshops'] },
   { grade: 'Secondary (IX-X)', registration: '₹12,500', tuition: '₹65,000 /yr', inclusions: ['Board Prep', 'Career Counseling', 'Labs'] },
];

export default function AdmissionsPage() {
   const navigate = useNavigate();
   const { addToast } = useApp();
   const [submitted, setSubmitted] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [formError, setFormError] = useState('');

   const handleInquirySubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setFormError('');

      const formData = {
         studentName: document.getElementById('ad_stu_name')?.value?.trim(),
         class: document.getElementById('ad_stu_class')?.value,
         fatherName: document.getElementById('ad_f_name')?.value?.trim(),
         motherName: document.getElementById('ad_m_name')?.value?.trim(),
         phone: document.getElementById('ad_phone')?.value?.trim(),
         email: document.getElementById('ad_email')?.value?.trim(),
      };

      if (!formData.studentName || !formData.class || !formData.fatherName || !formData.motherName || !formData.phone) {
         setFormError('⚠️ Please fill out all required fields marked with *');
         addToast('warning', 'Form Incomplete', 'Please provide student, class, and parent details.');
         setIsSubmitting(false);
         return;
      }

      try {
         await new Promise(resolve => setTimeout(resolve, 1500));
         setIsSubmitting(false);
         setSubmitted(true);
         addToast('success', 'Enquiry Received', "Thank you! We'll contact you within 24 hours.");
         setTimeout(() => setSubmitted(false), 5000);
         e.target.reset();
      } catch (error) {
         setFormError('🚫 Connection error. Please try again.');
         setIsSubmitting(false);
      }
   };

   useEffect(() => {
      window.scrollTo(0, 0);
      if (window.location.hash) {
         const id = window.location.hash.replace('#', '');
         setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
               const offset = 80;
               const bodyRect = document.body.getBoundingClientRect().top;
               const elementRect = el.getBoundingClientRect().top;
               const elementPosition = elementRect - bodyRect;
               const offsetPosition = elementPosition - offset;
               window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
         }, 500);
      }
   }, []);

   return (
      <div className="min-h-screen bg-slate-50 font-poppins text-slate-900 overflow-x-hidden">
         <SEO
            title="Admissions 2026-27"
            description="Start your child's journey at XYZ Higher Secondary School. Easy admission process, transparent fee structure, and eligibility details for the 2026-27 academic session."
            keywords="school admission, XYZ School fees, how to apply XYZ School, best school admission"
         />

         {/* 🟦 HERO */}
         <div className="pt-24 pb-12 md:pt-32 md:pb-16 bg-primary relative overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img src={heroImg} alt="Admissions" className="w-full h-full object-cover opacity-20 blur-sm" />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 z-10" />
            </div>
            <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
               <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="text-secondary font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-3 md:mb-4 block italic">Session 2026–27 Now Open</span>
                  <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-tight italic uppercase">Secure Your <br /><span className="text-secondary not-italic uppercase tracking-widest">Global Future</span></h1>
                  <p className="text-base md:text-lg font-medium text-white/80 leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto italic">Nurturing curiosity and character since 1991. Discover the Vikram advantage today.</p>
                  <button onClick={() => {
                     const el = document.getElementById('inquiry');
                     el?.scrollIntoView({ behavior: 'smooth' });
                  }} className="px-10 py-5 bg-white text-primary rounded-xl font-black text-[11px] md:text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">Start Your Inquiry</button>
               </motion.div>
            </div>
         </div>

         {/* 📋 ADMISSION PROCESS (TIMELINE) */}
         <section id="process" className="py-12 md:py-20 bg-white relative">
            <div className="container mx-auto px-6 max-w-5xl">
               <div className="text-center mb-12 md:mb-16">
                  <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-3 block underline underline-offset-8 decoration-secondary">The Journey</span>
                  <h2 className="text-3xl lg:text-5xl font-black text-primary tracking-tighter italic uppercase underline-offset-[16px]">Step-by-Step <span className="text-primary italic transition-all duration-700 hover:text-blue-600">Enrolment</span></h2>
               </div>

               <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[30px] sm:left-1/2 top-4 bottom-4 w-1 bg-slate-100 -translate-x-1/2 rounded-full hidden sm:block opacity-50" />

                  <div className="space-y-8 sm:space-y-12">
                     {[
                        { title: 'Fill Form', icon: <FiMail />, desc: 'Submit a digital inquiry to express your interest—it only takes 2 minutes.', highlight: 'Step 01' },
                        { title: 'Document Verification', icon: <FiFileText />, desc: 'Our team will reach out to request original documents for secure verification.', highlight: 'Step 02' },
                        { title: 'Student Interview', icon: <FiUsers />, desc: 'A friendly interaction with our academic head to discuss aspirations.', highlight: 'Step 03' },
                        { title: 'Confirmation', icon: <FiCheckCircle />, desc: 'Secure your place after successful verification and fee deposition.', highlight: 'Step 04' }
                     ].map((step, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                        >
                           {/* Icon Node */}
                           <div className="z-10 w-12 h-12 bg-white rounded-xl border-4 border-slate-50 shadow-xl flex items-center justify-center text-xl text-primary sm:absolute sm:left-1/2 sm:-translate-x-1/2 group hover:bg-primary transition-all duration-500">
                              <span className="group-hover:text-white transition-colors">{step.icon}</span>
                           </div>

                           {/* Content Box */}
                           <div className={`w-full sm:w-[45%] p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:bg-white transition-all duration-700 ${i % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'}`}>
                              <span className="text-primary font-black text-[9px] uppercase tracking-widest opacity-40 mb-1.5 block">{step.highlight}</span>
                              <h4 className="text-lg font-black text-primary mb-2 italic">{step.title}</h4>
                              <p className="text-slate-500 font-semibold leading-relaxed text-[11px] italic">{step.desc}</p>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* 💰 FEE STRUCTURE */}
         <section id="fees" className="py-12 md:py-20 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
               <div className="text-center mb-12 md:mb-16">
                  <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-3 block underline underline-offset-8 decoration-secondary">Investment in Excellence</span>
                  <h2 className="text-3xl lg:text-5xl font-black text-primary italic uppercase">Tuition <span className="text-primary italic">& Structural</span> Fees</h2>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {FEES.map((tier, i) => (
                     <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
                     >
                        <h3 className="text-lg font-black text-primary mb-4 underline underline-offset-8 decoration-blue-100">{tier.grade}</h3>
                        <div className="mb-6">
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Tuition Fee</span>
                           <span className="text-2xl font-black text-primary tracking-tighter italic">{tier.tuition}</span>
                        </div>
                        <ul className="space-y-2 mb-6">
                           {tier.inclusions.map(inc => (
                              <li key={inc} className="flex items-center gap-3 text-[11px] font-bold text-slate-600">
                                 <FiCheckCircle className="text-emerald-500 flex-shrink-0" /> {inc}
                              </li>
                           ))}
                        </ul>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">One-time Registration</p>
                           <p className="text-lg font-black text-primary italic">{tier.registration}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* 🟦 ELIGIBILITY CRITERIA */}
         <section id="criteria" className="py-12 md:py-20 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
               <div className="text-center mb-12 md:mb-16">
                  <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-3 block underline underline-offset-8 decoration-secondary">Standard Guidelines</span>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-primary italic uppercase">Enrolment <span className="text-primary italic">Requirements</span></h2>
               </div>
               <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div whileHover={{ scale: 1.01 }} className="bg-slate-50 p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
                     <h4 className="text-xl md:text-2xl font-black text-primary mb-6 flex items-center gap-4 italic underline underline-offset-8 decoration-blue-200">
                        <FiTarget className="text-blue-600" /> Age Brackets
                     </h4>
                     <div className="space-y-3">
                        {[
                           { class: 'Nursery / LKG', age: '3.5 - 4.5 Years' },
                           { class: 'Class 1', age: '5.5 - 6.5 Years' },
                           { class: 'Class 5 & Above', age: 'Based on previous TC' }
                        ].map(item => (
                           <div key={item.class} className="flex justify-between items-center py-3 border-b border-slate-200 last:border-0 group">
                              <span className="font-bold text-slate-700 text-sm group-hover:text-primary transition-colors">{item.class}</span>
                              <span className="font-black text-primary bg-blue-100/50 px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest">{item.age}</span>
                           </div>
                        ))}
                     </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="bg-primary p-8 md:p-10 rounded-2xl shadow-2xl text-white relative overflow-hidden">
                     <h4 className="text-xl md:text-2xl font-black text-white mb-6 flex items-center gap-4 italic underline underline-offset-8 decoration-blue-800">
                        <FiFileText className="text-blue-300" /> Mandatory Checklist
                     </h4>
                     <ul className="space-y-3">
                        {[
                           'Original Birth Certificate',
                           'Transfer Certificate (Original) from previous school',
                           'Aadhar Card of Student & Parents',
                           'Recent Passport size photographs (5 copies)',
                           'Previous Year Marksheet (if applicable)'
                        ].map(doc => (
                           <li key={doc} className="flex items-center gap-4 text-blue-100 font-bold text-xs italic">
                              <FiCheckCircle className="text-secondary text-lg flex-shrink-0" /> {doc}
                           </li>
                        ))}
                     </ul>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* 📥 INQUIRY FORM */}
         <section id="inquiry" className="py-12 md:py-20 bg-slate-50">
            <div className="container mx-auto px-6 max-w-4xl">
               <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
                  <div className="mb-8 md:mb-10">
                     <span className="text-primary font-black text-[9px] uppercase tracking-[0.4em] mb-2 block">Session 2026-27</span>
                     <h2 className="text-3xl lg:text-4xl font-black text-primary mb-2 tracking-tighter italic">Quick <span className="text-primary not-italic uppercase tracking-widest">Enquiry</span></h2>
                     <p className="text-slate-400 font-bold text-[11px] md:text-xs italic">Fill in the details below to start your child’s journey at XYZ School.</p>
                  </div>
                  <form
                     name="admission-inquiry"
                     method="POST"
                     data-netlify="true"
                     className="space-y-6 relative z-10"
                     onSubmit={handleInquirySubmit}
                  >
                     <input type="hidden" name="form-name" value="admission-inquiry" />
                     <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-4">Student's Full Name *</label>
                           <input name="stu_name" id="ad_stu_name" type="text" className="w-full bg-slate-50/50 p-4 md:p-5 rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none transition-all font-bold text-slate-800" placeholder="Enter name" required />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-4">Applying for Class *</label>
                           <select name="class" id="ad_stu_class" className="w-full bg-slate-50/50 p-4 md:p-5 rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none transition-all font-bold text-slate-800 appearance-none" required>
                              <option value="">Select Class</option>
                              {['Pre-Primary', 'Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI Sci', 'XI Comm', 'XI Arts', 'XII Sci', 'XII Comm', 'XII Arts'].map(c => (
                                 <option key={c} value={`Class ${c}`}>Class {c}</option>
                              ))}
                           </select>
                        </div>
                     </div>
                     <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-4">Father's Full Name *</label>
                           <input name="father_name" id="ad_f_name" type="text" className="w-full bg-slate-50/50 p-4 md:p-5 rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none transition-all font-bold text-slate-800" placeholder="Father's name" required />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-4">Mother's Full Name *</label>
                           <input name="mother_name" id="ad_m_name" type="text" className="w-full bg-slate-50/50 p-4 md:p-5 rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none transition-all font-bold text-slate-800" placeholder="Mother's name" required />
                        </div>
                     </div>
                     <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-4">Phone Number *</label>
                           <input name="phone" id="ad_phone" type="tel" className="w-full bg-slate-50/50 p-4 md:p-5 rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none transition-all font-bold text-slate-800" placeholder="+91 XXXXX" required />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-4">Email Address</label>
                           <input name="email" id="ad_email" type="email" className="w-full bg-slate-50/50 p-4 md:p-5 rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none transition-all font-bold text-slate-800" placeholder="your@email.com" />
                        </div>
                     </div>

                     {formError && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-bounce">{formError}</p>}

                     {submitted ? (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 bg-green-50 text-green-700 rounded-2xl text-center font-black border-2 border-green-200 shadow-lg">
                           🎉 Inquiry Sent Successfully! <br /><span className="text-xs font-bold opacity-70">Our team will call you within 24 hours.</span>
                        </motion.div>
                     ) : (
                        <button
                           type="submit"
                           disabled={isSubmitting}
                           className={`w-full py-5 md:py-6 bg-blue-900 text-white rounded-2xl font-black text-[11px] md:text-sm uppercase tracking-[0.3em] hover:bg-blue-800 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-blue-200 mt-4 md:mt-6 active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                           {isSubmitting ? (
                              <div className="flex items-center gap-4">
                                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                 Processing Submission...
                              </div>
                           ) : (
                              <><FiCheckCircle className="text-lg md:text-xl" /> Submit Application</>
                           )}
                        </button>
                     )}
                  </form>
               </div>
            </div>
         </section>
      </div>
   );
}

