import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Icon = ({ d, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const MailIcon = ({ size = 14 }) => <Icon size={size} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />;
const LockIcon = ({ size = 14 }) => <Icon size={size} d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M7 11V7a5 5 0 0110 0v4" />;
const UserIcon = ({ size = 14 }) => <Icon size={size} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z" />;
const PhoneIcon = ({ size = 14 }) => <Icon size={size} d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />;
const ShieldIcon = ({ size = 14 }) => <Icon size={size} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
const ChevronIcon = ({ size = 14 }) => <Icon size={size} d="M9 18l6-6-6-6" />;
const CheckIcon = ({ size = 14 }) => <Icon size={size} d="M20 6L9 17l-5-5" />;

const Spinner = () => (
  <svg style={{ animation: "spin 1s linear infinite" }} width="15" height="15" viewBox="0 0 24 24" fill="none">
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
    <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

const inputStyle = {
  width: "100%", boxSizing: "border-box",
  paddingTop: 10, paddingBottom: 10, paddingRight: 12,
  fontSize: 13, border: "1px solid #e2e8f0", borderRadius: 12,
  background: "rgba(248,250,252,0.95)", outline: "none", color: "#1e293b",
  fontFamily: "inherit", transition: "all 0.2s"
};

export default function AuthPage() {
  const navigate = useNavigate();
  const { addToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', role: 'student'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
    addToast('success', 'Request Sent!', 'Your registration is under review by admin.');
    setTimeout(() => {
        navigate('/login');
    }, 3000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Segoe UI',Tahoma,Geneva,Verdana,sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background school photo (Consistent with LoginPage) */}
      <div style={{ position: "absolute", inset: 0, background: "#1a2744" }}>
        <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#87CEEB"/>
              <stop offset="100%" stopColor="#b8dff0"/>
            </linearGradient>
            <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a7c4e"/>
              <stop offset="100%" stopColor="#2d5a31"/>
            </linearGradient>
            <linearGradient id="building" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8e0d0"/>
              <stop offset="100%" stopColor="#d4c8b0"/>
            </linearGradient>
          </defs>
          <rect width="1200" height="700" fill="url(#sky)"/>
          <ellipse cx="200" cy="80" rx="80" ry="30" fill="white" opacity="0.8"/>
          <ellipse cx="240" cy="70" rx="60" ry="28" fill="white" opacity="0.9"/>
          <ellipse cx="160" cy="85" rx="50" ry="22" fill="white" opacity="0.7"/>
          <ellipse cx="700" cy="60" rx="70" ry="25" fill="white" opacity="0.7"/>
          <ellipse cx="740" cy="50" rx="55" ry="22" fill="white" opacity="0.8"/>
          <ellipse cx="1000" cy="90" rx="90" ry="32" fill="white" opacity="0.6"/>
          <ellipse cx="1050" cy="78" rx="65" ry="26" fill="white" opacity="0.75"/>
          <rect x="150" y="200" width="900" height="380" fill="url(#building)" rx="4"/>
          {[200,280,360,440,520,600,680,760,840,920,1000].map((x,i) => (
            <rect key={i} x={x} y="220" width="18" height="340" fill="#c8bfa8" rx="4"/>
          ))}
          {[180,280,380,480,580,680,780,880,980].map((x,i) => (
            <rect key={i} x={x} y="240" width="70" height="90" fill="#8ab4d4" opacity="0.7" rx="3"/>
          ))}
          {[180,280,380,480,580,680,780,880,980].map((x,i) => (
            <rect key={i} x={x} y="360" width="70" height="90" fill="#8ab4d4" opacity="0.65" rx="3"/>
          ))}
          <rect x="150" y="340" width="900" height="8" fill="#c0b090"/>
          <rect x="150" y="460" width="900" height="8" fill="#c0b090"/>
          <rect x="140" y="190" width="920" height="20" fill="#c8bfa8" rx="3"/>
          <rect x="590" y="100" width="4" height="100" fill="#888"/>
          <rect x="594" y="100" width="40" height="28" fill="#FF6B35" opacity="0.9"/>
          <rect x="0" y="580" width="1200" height="120" fill="url(#grass)"/>
          {[120, 350, 820, 1050].map((x, i) => (
            <g key={i}>
              <rect x={x+18} y="440" width="14" height="140" fill="#7a5c3a"/>
              <ellipse cx={x+25} cy="420" rx="42" ry="60" fill="#2d7a2d" opacity="0.85"/>
              <ellipse cx={x+25} cy="400" rx="30" ry="45" fill="#3a9a3a" opacity="0.8"/>
            </g>
          ))}
          <ellipse cx="600" cy="630" rx="55" ry="18" fill="#6ba8c8" opacity="0.6"/>
          <rect x="594" y="600" width="12" height="30" fill="#9ab8cc"/>
          <ellipse cx="600" cy="598" rx="18" ry="6" fill="#6ba8c8" opacity="0.7"/>
          <rect width="1200" height="700" fill="rgba(15,23,42,0.45)"/>
        </svg>
      </div>

      {/* Top navbar */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 24px",
        background: "rgba(15,23,42,0.75)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: "rgba(255,255,255,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "1px solid rgba(255,255,255,0.2)", color: "#fff"
        }}>
          <ShieldIcon size={16} />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 12, letterSpacing: 1.5, color: "#fff", textTransform: "uppercase" }}>
            XYZ Higher Secondary School
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: 2, textTransform: "uppercase" }}>
            Nurturing Future Leaders
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{
        position: "relative", zIndex: 10, flex: 1,
        display: "flex", alignItems: "center", justifyContent: "flex-end",
        padding: "20px 48px 20px 20px",
        minHeight: "calc(100vh - 58px)"
      }}>
        <div style={{
          width: "100%", maxWidth: 440,
          background: "rgba(255,255,255,0.97)",
          borderRadius: 24,
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          padding: "36px 40px",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)"
        }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ 
                width: 70, height: 70, borderRadius: '50%', background: '#f0fdf4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', color: '#16a34a'
              }}>
                <CheckIcon size={32} />
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#1e293b" }}>Request Received!</h2>
              <p style={{ margin: "12px 0 24px", fontSize: 14, color: "#64748b", lineHeight: '1.6' }}>
                Thank you for applying. Your institutional account check is being conducted. You will receive a notification once approved.
              </p>
              <button 
                onClick={() => navigate('/login')}
                style={{
                  width: "100%", background: "#4f46e5",
                  color: "#fff", border: "none", borderRadius: 14, padding: "14px 0",
                  fontSize: 14, fontWeight: 800, cursor: "pointer",
                  transition: "all 0.3s", letterSpacing: 0.5, fontFamily: "inherit"
                }}>
                Back to Login
              </button>
            </div>
          ) : (
            <>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%", background: "#f1f5f9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 12px", color: "#6366f1"
                }}>
                  <UserIcon size={22} />
                </div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "#1e293b" }}>Create Account</h2>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94a3b8" }}>Campus Entry Portal</p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                    <label style={{ fontSize: 10, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Full Name</label>
                    <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" }}><UserIcon /></span>
                        <input type="text" placeholder="John Doe" style={{ ...inputStyle, paddingLeft: 38 }} required onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                </div>

                <div>
                    <label style={{ fontSize: 10, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Email Address</label>
                    <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" }}><MailIcon /></span>
                        <input type="email" placeholder="john@xyzschool.edu" style={{ ...inputStyle, paddingLeft: 38 }} required onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                        <label style={{ fontSize: 10, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Phone</label>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" }}><PhoneIcon /></span>
                            <input type="tel" placeholder="+91" style={{ ...inputStyle, paddingLeft: 38 }} required onChange={e => setForm({...form, phone: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <label style={{ fontSize: 10, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Password</label>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" }}><LockIcon /></span>
                            <input type="password" placeholder="••••" style={{ ...inputStyle, paddingLeft: 38 }} required onChange={e => setForm({...form, password: e.target.value})} />
                        </div>
                    </div>
                </div>

                <button type="submit" disabled={loading}
                  style={{
                    width: "100%", background: loading ? "#475569" : "#4f46e5",
                    color: "#fff", border: "none", borderRadius: 14, padding: "14px 0",
                    fontSize: 14, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    transition: "all 0.3s", letterSpacing: 0.5, fontFamily: "inherit",
                    marginTop: 8, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.2)"
                  }}>
                  {loading ? <Spinner /> : <>Register Now <ChevronIcon /></>}
                </button>

                <p style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", marginTop: 8 }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#6366f1", fontWeight: 700, textDecoration: "none" }}>Sign In</Link>
                </p>
              </form>
            </>
          )}

          <div style={{ 
            marginTop: 24, pt: 16, borderTop: '1px solid #f1f5f9', 
            textAlign: 'center', fontSize: 9, color: '#cbd5e1', fontWeight: 800, textTransform: 'uppercase', tracking: '1px' 
          }}>
            © 2026 XYZ Higher Secondary School
          </div>
        </div>
      </div>
    </div>
  );
}

