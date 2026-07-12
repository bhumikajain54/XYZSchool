import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiUser, FiMail, FiLock, FiPhone, FiCalendar, 
  FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle,
  FiArrowRight, FiShield, FiHome
} from 'react-icons/fi';

import Navbar from '../components/auth/Navbar';
import InputField from '../components/auth/InputField';
import Button from '../components/auth/Button';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      if (formData.password.length < 6) newErrors.password = 'Min 6 characters required';
      if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Must contain one uppercase letter';
      if (!/[0-9]/.test(formData.password)) newErrors.password = 'Must contain at least one number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && 
                     formData.password && formData.confirmPassword && 
                     formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      <Navbar />

      <div className="flex justify-end px-4 md:px-12 mt-4 -mb-12 relative z-20">
        <Link to="/" className="flex items-center gap-2 bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md border border-white/10 text-slate-300 px-4 py-2 rounded-xl transition-all hover:text-indigo-400 group">
          <FiHome className="group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Back to Home</span>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-950">
        <div className="max-w-6xl w-full mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-white/5"
          >
            {/* Left Panel: Branding */}
            <div className="bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-800 p-8 md:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
              {/* Background Shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 relative z-10"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center shadow-xl mb-6 mx-auto group hover:scale-105 transition-transform duration-500 overflow-hidden">
                  <img src="/logo.png" alt="School Logo" className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                  XYZ Higher Secondary School
                </h1>
                <p className="text-indigo-100/80 font-medium italic mb-6">
                  "Empowering Education for Future Leaders"
                </p>
                <div className="w-16 h-1 bg-white/30 mx-auto rounded-full mb-6" />
                <p className="text-indigo-50/70 leading-relaxed max-w-sm mx-auto">
                  An institution dedicated to excellence in education, discipline, and innovation. Joining us means being part of a legacy of achievers.
                </p>
              </motion.div>

              <div className="hidden lg:flex absolute bottom-12 left-0 right-0 justify-center gap-2 px-12 opacity-40">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Excellence</span>
                <span className="text-white/30">•</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Discipline</span>
                <span className="text-white/30">•</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Innovation</span>
              </div>
            </div>

            {/* Right Panel: Form */}
            <div className="bg-[#1e293b] p-8 md:p-10 lg:p-12 relative">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                      <FiCheckCircle size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
                    <p className="text-slate-400 mb-8 max-w-xs">
                      Your account has been created. You can now login to the portal with your credentials.
                    </p>
                    <Button onClick={() => navigate('/login')} className="max-w-xs">
                      Go to Login
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-1">Join Our Community</h2>
                      <p className="text-slate-400 text-sm">Fill in the details below to register your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <InputField 
                          label="First Name" 
                          name="firstName" 
                          placeholder="Ex: John" 
                          required 
                          value={formData.firstName}
                          onChange={handleChange}
                          error={errors.firstName}
                          icon={FiUser}
                        />
                        <InputField 
                          label="Middle Name" 
                          name="middleName" 
                          placeholder="Ex: Michael" 
                          value={formData.middleName}
                          onChange={handleChange}
                          icon={FiUser}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <InputField 
                          label="Last Name" 
                          name="lastName" 
                          placeholder="Ex: Doe" 
                          required 
                          value={formData.lastName}
                          onChange={handleChange}
                          error={errors.lastName}
                          icon={FiUser}
                        />
                        <InputField 
                          label="Date of Birth" 
                          name="dob" 
                          type="date"
                          required 
                          value={formData.dob}
                          onChange={handleChange}
                          error={errors.dob}
                          icon={FiCalendar}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <InputField 
                          label="Mobile Number" 
                          name="mobile" 
                          placeholder="10-digit number" 
                          required 
                          value={formData.mobile}
                          onChange={handleChange}
                          error={errors.mobile}
                          icon={FiPhone}
                        />
                        <InputField 
                          label="Email Address" 
                          name="email" 
                          type="email"
                          placeholder="john@example.com" 
                          required 
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                          icon={FiMail}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <InputField 
                          label="Password" 
                          name="password" 
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••" 
                          required 
                          value={formData.password}
                          onChange={handleChange}
                          error={errors.password}
                          icon={FiLock}
                          rightElement={
                            <button 
                              type="button" 
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-slate-500 hover:text-indigo-400 transition-colors"
                            >
                              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                          }
                        />
                        <InputField 
                          label="Confirm Password" 
                          name="confirmPassword" 
                          type="password"
                          placeholder="••••••••" 
                          required 
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          error={errors.confirmPassword}
                          icon={FiLock}
                        />
                      </div>

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          loading={loading}
                          disabled={!isFormValid}
                          className="group"
                        >
                          Register 
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>

                      <div className="mt-8 text-center">
                        <p className="text-slate-400 text-sm">
                          Already have an account?{' '}
                          <Link to="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors border-b border-transparent hover:border-indigo-400">
                            Login here
                          </Link>
                        </p>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="py-6 px-8 bg-slate-950 border-t border-white/5 text-center">
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-medium">
          © {new Date().getFullYear()} XYZ Higher Secondary School • All Rights Reserved
        </p>
      </footer>

      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.8) sepia(100%) saturate(1000%) hue-rotate(190deg);
          cursor: pointer;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;

