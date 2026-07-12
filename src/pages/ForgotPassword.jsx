import { useState, useEffect } from "react";
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
const ShieldIcon = ({ size = 14 }) => <Icon size={size} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
const UserIcon = ({ size = 14 }) => <Icon size={size} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z" />;
const ChevronIcon = ({ size = 14 }) => <Icon size={size} d="M9 18l6-6-6-6" />;
const PhoneIcon = ({ size = 14 }) => <Icon size={size} d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />;
const ArrowLeftIcon = ({ size = 14 }) => <Icon size={size} d="M19 12H5 M12 19l-7-7 7-7" />;

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
  fontSize: 13, border: "1px solid #e2e8f0", borderRadius: 10,
  background: "rgba(248,250,252,0.95)", outline: "none", color: "#1e293b",
  fontFamily: "inherit", transition: "border-color 0.2s"
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { addToast } = useApp();
  const [step, setStep] = useState(1); // 1: Input, 2: Success
  const [method, setMethod] = useState("email"); // email | phone
  const [recoveryInput, setRecoveryInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendReset = async (e) => {
    e.preventDefault();
    if (!recoveryInput) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setStep(2);
    addToast('info', 'Code Sent!', `Verification details sent to your registered ${method}.`);
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
          width: "100%", maxWidth: 400,
          background: "rgba(255,255,255,0.97)",
          borderRadius: 24,
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          padding: "32px 36px",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)"
        }}>
          {/* Back button */}
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 11, fontWeight: 700, color: '#6366f1',
              marginBottom: 20, padding: 0, textTransform: 'uppercase', tracking: '1px'
            }}>
            <ArrowLeftIcon /> Back to Login
          </button>

          {step === 1 ? (
            <>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%", background: "#f1f5f9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 12px", color: "#6366f1"
                }}>
                  <LockIcon size={22} />
                </div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1e293b" }}>Recovery Portal</h2>
                <p style={{ margin: "6px 0 0", fontSize: 12, color: "#94a3b8" }}>Select method to recover your account</p>
              </div>

              {/* Method Selection Tabs */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                <button
                  onClick={() => { setMethod("email"); setRecoveryInput(""); }}
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 12, fontSize: 11, fontWeight: 700,
                    border: '1.5px solid', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: method === "email" ? "#f5f3ff" : "white",
                    borderColor: method === "email" ? "#6366f1" : "#e2e8f0",
                    color: method === "email" ? "#6366f1" : "#64748b",
                    transition: 'all 0.2s'
                  }}>
                  <MailIcon size={14} /> Email
                </button>
                <button
                  onClick={() => { setMethod("phone"); setRecoveryInput(""); }}
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 12, fontSize: 11, fontWeight: 700,
                    border: '1.5px solid', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: method === "phone" ? "#f5f3ff" : "white",
                    borderColor: method === "phone" ? "#6366f1" : "#e2e8f0",
                    color: method === "phone" ? "#6366f1" : "#64748b",
                    transition: 'all 0.2s'
                  }}>
                  <PhoneIcon size={14} /> Mobile
                </button>
              </div>

              <form onSubmit={handleSendReset}>
                <div style={{ marginBottom: 24 }}>
                  <label style={{
                    fontSize: 10, fontWeight: 800, color: "#64748b",
                    textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 8
                  }}>
                    {method === "email" ? "Registered Email" : "Mobile Number"}
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" }}>
                      {method === "email" ? <MailIcon /> : <PhoneIcon />}
                    </span>
                    <input
                      type={method === "email" ? "email" : "tel"}
                      placeholder={method === "email" ? "teacher@xyzschool.edu" : "+91 XXXX XXXX"}
                      value={recoveryInput} onChange={e => setRecoveryInput(e.target.value)}
                      style={{ ...inputStyle, paddingLeft: 38 }} required />
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  style={{
                    width: "100%", background: loading ? "#475569" : "#4f46e5",
                    color: "#fff", border: "none", borderRadius: 14, padding: "14px 0",
                    fontSize: 14, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    transition: "all 0.3s", letterSpacing: 0.5, fontFamily: "inherit",
                    boxShadow: "0 10px 25px rgba(79, 70, 229, 0.2)"
                  }}>
                  {loading ? <Spinner /> : <>Send Reset Code <ChevronIcon /></>}
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{ fontSize: 50, marginBottom: 16 }}>{method === "email" ? "📧" : "📱"}</div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1e293b" }}>Code Sent!</h2>
              <p style={{ margin: "10px 0 24px", fontSize: 13, color: "#64748b", lineHeight: '1.6' }}>
                Your recovery instructions have been sent to <br />
                <strong style={{ color: '#4f46e5' }}>{recoveryInput}</strong>
              </p>
              <button
                onClick={() => navigate('/login')}
                style={{
                  width: "100%", background: "#1e293b",
                  color: "#fff", border: "none", borderRadius: 14, padding: "14px 0",
                  fontSize: 14, fontWeight: 800, cursor: "pointer",
                  transition: "all 0.3s", letterSpacing: 0.5, fontFamily: "inherit"
                }}>
                Return to Login
              </button>
              <p style={{ marginTop: 20, fontSize: 11, color: '#94a3b8' }}>
                Didn't receive it? <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: 700, cursor: 'pointer', padding: 0 }}>Try again</button>
              </p>
            </div>
          )}

          <div style={{
            marginTop: 32, pt: 16, borderTop: '1px solid #f1f5f9',
            textAlign: 'center', fontSize: 10, color: '#cbd5e1', fontWeight: 700, textTransform: 'uppercase', tracking: '1px'
          }}>
            © 2026 XYZ Higher Secondary School
          </div>
        </div>
      </div>
    </div>
  );
}

