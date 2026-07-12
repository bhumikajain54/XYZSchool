import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from '../components/auth/Navbar';

const Icon = ({ d, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const MailIcon = ({ size = 14 }) => <Icon size={size} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />;
const LockIcon = ({ size = 14 }) => <Icon size={size} d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M7 11V7a5 5 0 0110 0v4" />;
const EyeIcon = ({ size = 14 }) => <Icon size={size} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z" />;
const EyeOffIcon = ({ size = 14 }) => <Icon size={size} d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94 M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19 M1 1l22 22" />;
const AlertIcon = ({ size = 14 }) => <Icon size={size} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01" />;
const ShieldIcon = ({ size = 14 }) => <Icon size={size} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
const BookIcon = ({ size = 14 }) => <Icon size={size} d="M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />;
const BriefIcon = ({ size = 14 }) => <Icon size={size} d="M20 7H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />;
const UserIcon = ({ size = 14 }) => <Icon size={size} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z" />;
const DollarIcon = ({ size = 12 }) => <Icon size={size} d="M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />;
const BellIcon = ({ size = 12 }) => <Icon size={size} d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0" />;
const ChevronIcon = ({ size = 14 }) => <Icon size={size} d="M9 18l6-6-6-6" />;
const HomeIcon = ({ size = 14 }) => <Icon size={size} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" />;

const getStrength = (p) => {
  if (!p) return { score: 0, label: '', color: '' };
  let s = 0;
  if (p.length > 5) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  const map = [
    { label: '', color: '' },
    { label: 'Weak', color: '#EF4444' },
    { label: 'Fair', color: '#F59E0B' },
    { label: 'Good', color: '#10B981' },
    { label: 'Strong', color: '#2563EB' },
  ];
  return { score: s, ...map[s] };
};

const ROLES = [
  { key: "SuperAdmin", label: "Admin", Ico: ShieldIcon },
  { key: "teacher", label: "Teacher", Ico: BookIcon },
  { key: "staff", label: "Staff", Ico: BriefIcon },
  { key: "student", label: "Student", Ico: UserIcon },
];

const SuperAdmin_SUB = [
  { key: "SuperAdmin", label: "Super Admin", Ico: ShieldIcon },
  { key: "librarian", label: "Librarian", Ico: BookIcon },
  { key: "accountant", label: "Accountant", Ico: DollarIcon },
  { key: "receptionist", label: "Receptionist", Ico: BellIcon },
];

const Spinner = () => (
  <svg style={{ animation: "spin 1s linear infinite" }} width="15" height="15" viewBox="0 0 24 24" fill="none">
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
    <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

const inputStyle = {
  width: "100%", boxSizing: "border-box",
  paddingTop: 9, paddingBottom: 9, paddingRight: 12,
  fontSize: 13, border: "1px solid #e2e8f0", borderRadius: 10,
  background: "rgba(248,250,252,0.95)", outline: "none", color: "#1e293b",
  fontFamily: "inherit", transition: "border-color 0.2s"
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: appLogin, addToast } = useApp();
  const [role, setRole] = useState("");
  const [subRole, setSubRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [fEmail, setFEmail] = useState("");
  const [fSent, setFSent] = useState(false);

  const strength = getStrength(password);
  const activeRole = ROLES.find(r => r.key === role);

  const submit = async (e) => {
    e.preventDefault();
    if (!role) { setError("Please select a user role"); return; }
    if (!email || !password) { setError("Please fill all fields"); return; }
    setError(""); setLoading(true);

    try {
      await new Promise(r => setTimeout(r, 1200));

      let targetRole = role === 'SuperAdmin' ? 'admin' : role;
      let targetSubRole = subRole;

      // Map sub-roles to 'staff' internal role
      if (role === 'SuperAdmin' && ['librarian', 'accountant', 'receptionist'].includes(subRole)) {
        targetRole = 'staff';
      }

      const result = appLogin(email, password, targetRole, targetSubRole);

      if (result.success) {
        addToast('success', `Welcome back, ${result.user.name}!`);
        if (['librarian', 'accountant', 'receptionist'].includes(targetSubRole)) {
          navigate('/coming-soon');
        } else {
          navigate(`/${result.user.role}/dashboard`);
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendReset = async () => {
    if (!fEmail) return;
    await new Promise(r => setTimeout(r, 700));
    setFSent(true);
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
      {/* Background school photo */}
      <div style={{
        position: "absolute", inset: 0,
        zIndex: 0,
        background: "linear-gradient(rgba(15,23,42,0.5), rgba(15,23,42,0.5)), url('/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} />

      <Navbar />

      <div className="flex justify-end px-4 md:px-12 mt-4 -mb-12 relative z-20">
        <Link to="/" className="flex items-center gap-2 bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md border border-white/10 text-slate-300 px-4 py-2 rounded-xl transition-all hover:text-indigo-400 group">
          <HomeIcon />
          <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Back to Home</span>
        </Link>
      </div>

      {/* Main content: login card on right */}
      <div style={{
        position: 'relative', zIndex: 10, flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        minHeight: 'calc(100vh - 58px)',
      }}>
        <div style={{
          width: "100%", maxWidth: 360,
          background: "rgba(255,255,255,0.97)",
          borderRadius: 20,
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          padding: "24px 26px",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)"
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", background: "#f1f5f9",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 8px", color: "#94a3b8"
            }}>
              <UserIcon size={18} />
            </div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1e293b" }}>
              User Login
            </h2>
            <p style={{ margin: "3px 0 0", fontSize: 11, color: "#94a3b8" }}>Welcome to the portal</p>
          </div>

          {/* Role tabs */}
          <div className="grid grid-cols-4 border-b border-slate-100 mb-4">
            {ROLES.map(r => {
              const active = role === r.key;
              return (
                <button key={r.key} type="button"
                  onClick={() => { setRole(r.key); setSubRole(""); }}
                  style={{
                    border: "none", background: "none", cursor: "pointer",
                    padding: "7px 4px", display: "flex", flexDirection: "column",
                    alignItems: "center", gap: 3, fontSize: 10, fontWeight: 600,
                    color: active ? "#4f46e5" : "#94a3b8",
                    borderBottom: `2px solid ${active ? "#4f46e5" : "transparent"}`,
                    marginBottom: -1, transition: "color 0.2s", fontFamily: "inherit"
                  }}>
                  <r.Ico size={13} />
                  {r.label}
                </button>
              );
            })}
          </div>

          {/* Admin sub-roles */}
          {role === "SuperAdmin" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 6, marginBottom: 12 }}>
              {SuperAdmin_SUB.map(s => (
                <button key={s.key} type="button" onClick={() => setSubRole(s.key)}
                  style={{
                    border: `1px solid ${subRole === s.key ? "#6366f1" : "#e2e8f0"}`,
                    background: subRole === s.key ? "#eef2ff" : "#fff",
                    color: subRole === s.key ? "#4f46e5" : "#64748b",
                    borderRadius: 8, padding: "7px 6px", fontSize: 10, fontWeight: 500,
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 5, transition: "all 0.15s", fontFamily: "inherit"
                  }}>
                  <s.Ico size={12} /> {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              display: "flex", alignItems: "center", gap: 6, color: "#ef4444",
              fontSize: 11, background: "#fef2f2", border: "1px solid #fee2e2",
              borderRadius: 8, padding: "7px 10px", marginBottom: 10
            }}>
              <AlertIcon /> {error}
            </div>
          )}

          {/* Username */}
          <div style={{ marginBottom: 10 }}>
            <label style={{
              fontSize: 10, fontWeight: 700, color: "#64748b",
              textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 4
            }}>Username</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" }}>
                <MailIcon />
              </span>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder={activeRole ? `${activeRole.label.toLowerCase()}@xyzschool.edu` : "username@xyzschool.edu"}
                style={{ ...inputStyle, paddingLeft: 32 }} />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>
                Password
              </label>
              <button type="button" onClick={() => setModal(true)}
                style={{ fontSize: 10, color: "#6366f1", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
                Forgot password?
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" }}>
                <LockIcon />
              </span>
              <input type={showPass ? "text" : "password"} value={password}
                onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                style={{ ...inputStyle, paddingLeft: 32, paddingRight: 36 }} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0, display: "flex"
                }}>
                {showPass ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Strength Panel */}
          <div style={{
            background: '#f8fafc', border: '1.5px solid #e8eaf6',
            borderRadius: 10, padding: '9px 12px', marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ display: 'flex', gap: 4, flex: 1 }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{
                    flex: 1, height: 4, borderRadius: 99,
                    background: password.length === 0 ? '#e8eaf6' : (i <= strength.score ? strength.color : '#e8eaf6'),
                    transition: 'background 0.3s',
                  }} />
                ))}
              </div>
              <span style={{
                fontSize: 9, fontWeight: 800, textTransform: 'uppercase',
                letterSpacing: 0.5, color: password.length === 0 ? '#94a3b8' : strength.color, minWidth: 48, textAlign: 'right',
              }}>
                {password.length === 0 ? 'Strength' : strength.label}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
              {[
                { pass: password.length >= 6, text: 'Min 6 chars' },
                { pass: /[A-Z]/.test(password), text: 'Uppercase' },
                { pass: /[0-9]/.test(password), text: 'Number' },
                { pass: /[^A-Za-z0-9]/.test(password), text: 'Special char' },
              ].map((c, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 5, fontSize: 9.5, fontWeight: 600,
                  color: password.length === 0 ? '#94a3b8' : (c.pass ? '#10b981' : '#ef4444'),
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: 'currentColor', flexShrink: 0,
                  }} />
                  {c.text}
                </div>
              ))}
            </div>
          </div>

          {/* Remember me */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <input type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)}
              style={{ width: 14, height: 14, cursor: "pointer", accentColor: "#4f46e5" }} />
            <label htmlFor="remember" style={{ fontSize: 11, color: "#64748b", cursor: "pointer" }}>Remember me</label>
          </div>

          {/* Login button */}
          <button onClick={submit} disabled={loading}
            style={{
              width: "100%", background: loading ? "#475569" : "#4f46e5",
              color: "#fff", border: "none", borderRadius: 12, padding: "11px 0",
              fontSize: 13, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "background 0.2s", letterSpacing: 0.3, fontFamily: "inherit",
              marginBottom: 10
            }}>
            {loading ? <><Spinner /> Signing in...</> : <>Login <ChevronIcon /></>}
          </button>

          {/* Google login */}
          <button style={{
            width: "100%", background: "#dc2626", color: "#fff", border: "none",
            borderRadius: 12, padding: "10px 0", fontSize: 13, fontWeight: 600,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontFamily: "inherit"
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Login with Google
          </button>

          <p style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", marginTop: 12, marginBottom: 0 }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#6366f1", fontWeight: 600, textDecoration: "none" }}>Create an account</Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {modal && (
        <div onClick={() => { setModal(false); setFSent(false); setFEmail(""); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50
          }}>
          <div onClick={e => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 18, padding: "24px 28px",
              width: "100%", maxWidth: 320, boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              fontFamily: "'Segoe UI',sans-serif"
            }}>
            {fSent ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>📧</div>
                <h3 style={{ margin: 0, fontSize: 15, color: "#1e293b" }}>Reset link sent!</h3>
                <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>Check your email inbox.</p>
                <button onClick={() => { setModal(false); setFSent(false); setFEmail(""); }}
                  style={{
                    marginTop: 16, width: "100%", background: "#0f172a", color: "#fff",
                    border: "none", borderRadius: 10, padding: "10px 0", cursor: "pointer",
                    fontSize: 13, fontWeight: 600, fontFamily: "inherit"
                  }}>
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ margin: "0 0 4px", fontSize: 15, color: "#1e293b" }}>Forgot Password</h3>
                <p style={{ margin: "0 0 14px", fontSize: 12, color: "#94a3b8" }}>
                  Enter your email to receive a reset link.
                </p>
                <input type="email" value={fEmail} onChange={e => setFEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{ ...inputStyle, paddingLeft: 12, marginBottom: 10 }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setModal(false)}
                    style={{
                      flex: 1, border: "1px solid #e2e8f0", background: "#fff",
                      color: "#64748b", borderRadius: 10, padding: "9px 0", cursor: "pointer",
                      fontSize: 12, fontWeight: 600, fontFamily: "inherit"
                    }}>
                    Cancel
                  </button>
                  <button onClick={sendReset}
                    style={{
                      flex: 1, background: "#0f172a", color: "#fff", border: "none",
                      borderRadius: 10, padding: "9px 0", cursor: "pointer",
                      fontSize: 12, fontWeight: 600, fontFamily: "inherit"
                    }}>
                    Send Link
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

