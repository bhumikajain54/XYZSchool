import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheckCircle, 
    FiShield, FiClock, FiSmartphone, FiChevronRight, FiCheck 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import securityIllus from '../assets/hero_illustration.png';

// Smooth curve transition constant (consistent with AuthPage)
const SMOOTH_CURVE = [0.4, 0, 0.2, 1];

export default function ForgotPassword() {
    const navigate = useNavigate();
    const { addToast } = useApp();
    const cardRef = useRef(null);
    
    // Core State
    const [step, setStep] = useState(1); // 1: Method, 2: OTP, 3: Reset
    const [method, setMethod] = useState('email'); // 'email' | 'phone'
    const [isLoading, setIsLoading] = useState(false);
    
    // Form Inputs
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [otp, setOtp] = useState(['', '', '', '']); // 4-digit OTP
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    
    // Aesthetic State
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [timer, setTimer] = useState(60);
    const [resendActive, setResendActive] = useState(false);

    // Sync Timer
    useEffect(() => {
        let interval;
        if (step === 2 && timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        } else if (timer === 0) {
            setResendActive(true);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    // Parallax Logic
    const handleMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setTilt({
            x: ((e.clientY - cy) / rect.height) * 4,
            y: ((e.clientX - cx) / rect.width) * -4,
        });
    };
    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setIsLoading(false);
        setStep(2);
        setTimer(60);
        setResendActive(false);
        addToast('success', 'OTP Sent!', `Verification code sent to your ${method === 'email' ? 'Email' : 'Phone'}`);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length < 4) {
            addToast('error', 'OTP Incomplete', 'Please enter the full 4-digit code.');
            return;
        }
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 800));
        setIsLoading(false);
        setStep(3);
        addToast('success', 'Verified!', 'Identity confirmed. Please set your new password.');
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPass.length < 6) {
            addToast('error', 'Weak Password', 'Password must be at least 6 characters.');
            return;
        }
        if (newPass !== confirmPass) {
            addToast('error', 'Mismatch', 'Passwords do not match.');
            return;
        }
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsLoading(false);
        addToast('success', 'Password Reset Successful!', 'Your account has been updated. Please login.');
        navigate('/login');
    };

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const floaters = [
        { id: 1, char: '+', top: '18%', left: '12%', delay: 0, size: 20, color: 'rgba(255,255,255,0.5)' },
        { id: 2, char: '●', top: '30%', left: '78%', delay: 0.8, size: 10, color: 'rgba(255,255,255,0.3)' },
        { id: 3, char: '✕', top: '65%', left: '15%', delay: 1.4, size: 14, color: '#60A5FA' },
        { id: 4, char: '●', top: '75%', left: '72%', delay: 0.4, size: 8, color: 'rgba(255,255,255,0.2)' },
        { id: 5, char: '◆', top: '50%', left: '88%', delay: 1.2, size: 12, color: '#3B82F6' },
        { id: 6, char: '+', top: '82%', left: '40%', delay: 0.6, size: 16, color: 'rgba(255,255,255,0.4)' },
    ];

    return (
        <div className="auth-root" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {/* Background Blobs */}
            <div className="auth-page-blobs">
                <div className="auth-pg-blob b1" />
                <div className="auth-pg-blob b2" />
                <div className="auth-pg-blob b3" />
            </div>

            <motion.div 
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="auth-card"
                style={{ 
                    maxWidth: '940px',
                    transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` 
                }}
            >
                <div className="auth-left">
                    <div className="auth-left-bg" />
                    <div className="auth-curve-mask on-right" />
                    
                    {/* Floating Ornaments */}
                    {floaters.map(f => (
                        <motion.span
                            key={f.id}
                            className="auth-floater"
                            style={{ position: 'absolute', top: f.top, left: f.left, fontSize: f.size, color: f.color, zIndex: 5, pointerEvents: 'none' }}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3.5 + f.delay * 0.5, repeat: Infinity, ease: 'easeInOut', delay: f.delay }}
                        >
                            {f.char}
                        </motion.span>
                    ))}

                    <div className="auth-left-inner">
                        <div className="auth-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                            <div className="auth-logo-icon">🛡️</div>
                            <div>
                                <span className="auth-logo-title">VIKRAM HIGHER</span>
                                <span className="auth-logo-sub">SECONDARY SCHOOL PORTAL</span>
                            </div>
                        </div>

                        <div className="auth-illus-wrap">
                            <motion.img 
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                src={securityIllus}
                                className="auth-illus-img"
                                alt="Security"
                                style={{ zIndex: 10 }}
                            />
                            <div className="auth-illus-glow" />
                        </div>

                        <div className="auth-tagline">
                            <h3>Secure Access Recovery</h3>
                            <p>We're here to help you regain access to your personal educational dashboard with high-grade security.</p>
                        </div>
                    </div>
                </div>

                <div className="auth-right">
                    <button className="auth-back" onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/login')}>
                        <FiArrowLeft />
                    </button>

                    <div className="form-container">
                        <div className="auth-avatar">
                            <FiLock size={20} />
                        </div>

                        <div className="auth-form-header">
                            <h2>Forgot Password</h2>
                            <p>Verification system for all institutional roles</p>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                    <div className="auth-tabs" style={{ marginBottom: 12 }}>
                                        <button className={`auth-tab ${method === 'email' ? 'active' : ''}`} onClick={() => setMethod('email')}>
                                            <FiMail /> <span>EMAIL</span>
                                            {method === 'email' && <motion.span layoutId="fg-underline" className="auth-tab-line" />}
                                        </button>
                                        <button className={`auth-tab ${method === 'phone' ? 'active' : ''}`} onClick={() => setMethod('phone')}>
                                            <FiSmartphone /> <span>PHONE</span>
                                            {method === 'phone' && <motion.span layoutId="fg-underline" className="auth-tab-line" />}
                                        </button>
                                    </div>
                                    
                                    <form onSubmit={handleSendOtp}>
                                        {method === 'email' ? (
                                            <div className="auth-field">
                                                <label>Institutional Email</label>
                                                <div className="auth-input-wrap">
                                                    <FiMail className="auth-icon-pre" />
                                                    <input type="email" placeholder="email@xyzschool.edu" value={email} onChange={e => setEmail(e.target.value)} required />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="auth-field">
                                                <label>Mobile Number</label>
                                                <div className="auth-input-wrap" style={{ gap: 8 }}>
                                                    <select 
                                                        style={{ width: '80px', height: '34px', background: '#F8FAFC', border: '1.5px solid #E8EAF6', borderRadius: '8px', fontSize: '10px', fontWeight: '800', outline: 'none' }}
                                                        value={countryCode} onChange={e => setCountryCode(e.target.value)}
                                                    >
                                                        <option value="+91">+91 🇮🇳</option>
                                                        <option value="+1">+1 🇺🇸</option>
                                                    </select>
                                                    <div className="auth-input-wrap" style={{ flex: 1 }}>
                                                        <FiPhone className="auth-icon-pre" />
                                                        <input type="tel" placeholder="Mobile number" value={phone} onChange={e => setPhone(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <button type="submit" className="auth-submit" disabled={isLoading} style={{ marginTop: 20 }}>
                                            {isLoading ? 'Processing...' : <>Send Verification Code <FiChevronRight /></>}
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                        <div style={{ fontSize: 11, color: '#94A3B8' }}>OTP sent to:</div>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: '#1E293B' }}>{method === 'email' ? email : `${countryCode} ${phone}`}</div>
                                    </div>

                                    <form onSubmit={handleVerifyOtp}>
                                        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
                                            {otp.map((digit, i) => (
                                                <input 
                                                    key={i} id={`otp-${i}`} type="text" maxLength="1" 
                                                    style={{ width: '42px', height: '48px', textAlign: 'center', fontSize: '18px', fontWeight: '900', border: '1.5px solid #E8EAF6', borderRadius: '10px', background: '#F8FAFC', outline: 'none', borderColor: digit ? '#2563EB' : '#E8EAF6' }}
                                                    value={digit} onChange={e => handleOtpChange(i, e.target.value)} required
                                                />
                                            ))}
                                        </div>
                                        <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                            <div style={{ fontSize: 10, color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                                                <FiClock /> {timer > 0 ? `Resend in ${timer}s` : 'Code expired?'}
                                            </div>
                                            {resendActive && (
                                                <button type="button" className="auth-link" style={{ marginTop: 4, fontSize: 11 }} onClick={() => { setTimer(60); setResendActive(false); addToast('info', 'Code Resent', 'Please check again'); }}>Resend Code</button>
                                            )}
                                        </div>
                                        <button type="submit" className="auth-submit" disabled={isLoading}>
                                            {isLoading ? 'Verifying...' : <>Confirm & Continue <FiCheckCircle /></>}
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <form onSubmit={handleResetPassword}>
                                        <div className="auth-field">
                                            <label>New Password</label>
                                            <div className="auth-input-wrap">
                                                <FiLock className="auth-icon-pre" />
                                                <input type={showPass ? 'text' : 'password'} placeholder="Min 6 characters" value={newPass} onChange={e => setNewPass(e.target.value)} required />
                                                <button type="button" className="auth-icon-post" onClick={() => setShowPass(!showPass)}>{showPass ? <FiEyeOff size={14} /> : <FiEye size={14} />}</button>
                                            </div>
                                        </div>
                                        <div className="auth-field" style={{ marginTop: 12 }}>
                                            <label>Confirm Password</label>
                                            <div className="auth-input-wrap">
                                                <FiLock className="auth-icon-pre" />
                                                <input type={showPass ? 'text' : 'password'} placeholder="Repeat password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} required />
                                            </div>
                                        </div>
                                        <button type="submit" className="auth-submit" style={{ background: '#10B981', marginTop: 24 }} disabled={isLoading}>
                                            {isLoading ? 'Updating...' : <>Reset Password <FiCheck /></>}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="auth-copy">© 2026 XYZ School</div>
                    </div>
                </div>
            </motion.div>
            
            <style>{`
                .auth-root {
                    min-height: 100vh; display: flex; align-items: center; justify-content: center;
                    background: linear-gradient(135deg, #e8eaf6 0%, #d1d5f0 40%, #c5cae9 100%);
                    font-family: 'Inter', sans-serif; overflow: hidden; position: relative; padding: 20px;
                }
                .auth-page-blobs { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
                .auth-pg-blob { position: absolute; border-radius: 50%; filter: blur(90px); animation: blob-drift 18s ease-in-out infinite alternate; }
                .b1 { width: 480px; height: 480px; background: rgba(99,102,241,0.15); top: -120px; left: -80px; }
                .b2 { width: 350px; height: 350px; background: rgba(139,92,246,0.12); bottom: -80px; right: -60px; }
                .b3 { width: 280px; height: 280px; background: rgba(59,130,246,0.1); top: 40%; left: 50%; }
                @keyframes blob-drift { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(30px,-40px) scale(1.1); } }

                .auth-card {
                    position: relative; z-index: 10; width: 100%; display: flex;
                    border-radius: 24px; overflow: hidden; background: #fff;
                    box-shadow: 0 32px 64px rgba(99,102,241,0.12);
                    transition: transform 0.1s ease-out;
                }
                .auth-left { flex: 0 0 45%; position: relative; overflow: hidden; display: flex; align-items: stretch; min-height: 520px; }
                .auth-left-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #5c6bc0 0%, #3949ab 35%, #1E293B 100%); animation: gradShift 8s ease infinite; background-size: 300% 300%; }
                .auth-curve-mask { position: absolute; top: 0; width: 80px; height: 100%; background: #fff; z-index: 10; }
                .auth-curve-mask.on-right { right: -1px; clip-path: ellipse(80px 60% at 100% 50%); }
                .auth-left-inner { position: relative; z-index: 6; display: flex; flex-direction: column; padding: 24px 32px; color: #fff; width: 100%; justify-content: space-between; }
                .auth-logo { display: flex; align-items: center; gap: 8px; }
                .auth-logo-title { display: block; font-size: 14px; font-weight: 900; letter-spacing: 1px; }
                .auth-logo-sub { display: block; font-size: 7px; color: rgba(255,255,255,0.6); }
                .auth-illus-wrap { position: relative; flex: 1; display: flex; align-items: center; justify-content: center; }
                .auth-illus-img { width: 65%; height: auto; z-index: 2; filter: drop-shadow(0 24px 48px rgba(0,0,0,0.4)); }
                .auth-illus-glow { position: absolute; width: 60%; height: 60%; background: radial-gradient(circle, rgba(99,102,241,0.25), transparent); filter: blur(30px); }
                .auth-tagline h3 { font-size: 16px; font-weight: 800; margin-bottom: 6px; }
                .auth-tagline p { font-size: 11px; color: rgba(255,255,255,0.7); max-width: 260px; line-height: 1.6; }

                .auth-right { flex: 1; display: flex; flex-direction: column; background: #fff; position: relative; }
                .form-container { padding: 24px 32px; display: flex; flex-direction: column; flex: 1; overflow-y: auto; }
                .auth-avatar { width: 36px; height: 36px; background: #f1f3f4; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #94A3B8; margin: 0 auto 8px; border: 2px solid #e8eaf6; }
                .auth-form-header { text-align: center; margin-bottom: 16px; }
                .auth-form-header h2 { font-size: 18px; font-weight: 900; color: #1E293B; }
                .auth-form-header p { font-size: 10px; color: #94A3B8; }
                
                .auth-tabs { display: flex; border-bottom: 1.5px solid #F1F5F9; margin-bottom: 12px; }
                .auth-tab { flex: 1; padding: 8px 0; border: none; background: transparent; color: #94A3B8; font-size: 10px; font-weight: 700; cursor: pointer; position: relative; display: flex; align-items: center; justify-content: center; gap: 4px; }
                .auth-tab.active { color: #2563EB; }
                .auth-tab-line { position: absolute; bottom: -1.5px; left: 0; right: 0; height: 2px; background: #2563EB; }

                .auth-field label { display: block; font-size: 9px; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 6px; }
                .auth-input-wrap { position: relative; display: flex; align-items: center; }
                .auth-input-wrap input { width: 100%; padding: 7px 10px 7px 32px; border: 1.5px solid #E8EAF6; border-radius: 9px; font-size: 12px; background: #F8FAFC; outline: none; transition: border-color 0.2s; }
                .auth-input-wrap input:focus { border-color: #5c6bc0; background: #fff; }
                .auth-icon-pre { position: absolute; left: 10px; font-size: 12px; color: #94A3B8; }
                .auth-icon-post { position: absolute; right: 10px; background: none; border: none; color: #94A3B8; cursor: pointer; }

                .auth-submit { width: 100%; padding: 10px; border-radius: 10px; border: none; background: #1E293B; color: #fff; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
                .auth-submit:hover { background: #0F172A; transform: translateY(-2px); }
                .auth-submit:disabled { opacity: 0.6; cursor: wait; }

                .auth-back { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 8px; border: 1px solid #E8EAF6; background: #FFF; display: flex; align-items: center; justify-content: center; color: #64748B; cursor: pointer; z-index: 20; }
                .auth-link { color: #2563EB; font-weight: 700; background: none; border: none; cursor: pointer; text-decoration: none; padding: 0; }
                .auth-link:hover { color: #1E4ED8; text-decoration: underline; }

                .auth-copy { margin-top: auto; padding-top: 8px; font-size: 8px; color: #CBD5E1; text-align: center; text-transform: uppercase; }
                @keyframes gradShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

                @media (max-width: 640px) {
                    .auth-card { flex-direction: column !important; height: auto; }
                    .auth-left { flex: none; min-height: 180px; }
                    .auth-illus-wrap, .auth-tagline, .auth-curve-mask { display: none; }
                }
            `}</style>
        </div>
    );
}

