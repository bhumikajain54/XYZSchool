import React, { useState, useRef } from 'react';
import { FiEdit2, FiSave, FiCamera, FiMail, FiPhone, FiMapPin, FiCalendar, FiBriefcase, FiLock, FiShield, FiX, FiTrash2 } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const avatarColors = { admin: '#2563EB', teacher: '#7C3AED', staff: '#059669', student: '#D97706' };

export default function ProfilePage() {
  const { user, addToast } = useApp();
  const fileInputRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [passData, setPassData] = useState({ current: '', new: '', confirm: '' });
  const [privacySettings, setPrivacySettings] = useState({ showPhone: true, showEmail: true, allowMessages: true });
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem(`pfp_${user?.id || user?.role}`) || null);

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || `${user?.role}@xyzschool.edu`,
    phone: '9876543210',
    dob: '1995-06-15',
    address: '456, Gandhi Nagar, Jaipur, Rajasthan',
    department: user?.department || '',
    joinDate: '2020-04-01',
    bio: 'Dedicated educator with a passion for making learning engaging and effective.',
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        addToast('error', 'File Too Large', 'Please upload an image smaller than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
        localStorage.setItem(`pfp_${user?.id || user?.role}`, reader.result);
        addToast('success', 'Profile Updated', 'Your institutional photo has been synchronized.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoDelete = () => {
    setProfilePhoto(null);
    localStorage.removeItem(`pfp_${user?.id || user?.role}`);
    addToast('info', 'Photo Removed', 'Your institutional avatar has been reset.');
  };

  const handleSave = () => {
    setEditing(false);
    addToast('success', 'Profile Updated', 'Your profile has been saved');
  };

  const fields = [
    { label: 'Full Name', key: 'name', icon: <FiEdit2 /> },
    { label: 'Email', key: 'email', icon: <FiMail /> },
    { label: 'Phone', key: 'phone', icon: <FiPhone /> },
    { label: 'Date of Birth', key: 'dob', icon: <FiCalendar />, type: 'date' },
    { label: 'Department / Class', key: 'department', icon: <FiBriefcase /> },
    { label: 'Address', key: 'address', icon: <FiMapPin /> },
  ];

  return (
    <div className="page-enter">
      <div className="section-header">
        <h3>My Profile</h3>
        {!editing ? (
          <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}><FiEdit2 size={13} /> Edit Profile</button>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={handleSave}><FiSave size={13} /> Save</button>
        )}
      </div>

      <div className="grid-2" style={{ gap: 24 }}>
        {/* Avatar & Overview */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card">
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <div className="avatar avatar-xl overflow-hidden" style={{ background: avatarColors[user?.role] || 'var(--primary)', width: 110, height: 110, fontSize: 36, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user?.avatar || user?.role?.charAt(0).toUpperCase()
                )}
              </div>
              <input 
                id="avatar-upload"
                type="file" 
                ref={fileInputRef}
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoUpload}
              />
              <div style={{ position: 'absolute', bottom: -5, right: -5, display: 'flex', gap: 6 }}>
                <button 
                  onClick={() => fileInputRef.current.click()}
                  style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: 'var(--bg-card)', border: '1.5px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--primary)', cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                    zIndex: 10
                  }}
                  title="Upload Photo"
                >
                  <FiCamera size={14} />
                </button>
                {profilePhoto && (
                  <button 
                    onClick={handlePhotoDelete}
                    style={{
                      width: 32, height: 32, borderRadius: 10,
                      background: 'var(--accent-error-light)', border: '1.5px solid var(--accent-error)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--accent-error)', cursor: 'pointer',
                      boxShadow: '0 4px 8px rgba(239, 68, 68, 0.1)',
                      zIndex: 10
                    }}
                    title="Delete Photo"
                  >
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>
            </div>
            <h3 style={{ marginBottom: 4 }}>{profile.name}</h3>
            <span className="badge badge-primary" style={{ textTransform: 'capitalize', marginBottom: 16, padding: '6px 16px', fontSize: 13 }}>
              {user?.role === 'admin' ? '🛡️' : user?.role === 'teacher' ? '👩‍🏫' : user?.role === 'staff' ? '👨‍💼' : '🎓'} {user?.role}
            </span>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 250 }}>{profile.bio}</p>

            <div className="divider" style={{ width: '100%' }} />

            <div style={{ width: '100%' }}>
              {[
                ['Department', profile.department],
                ['Member Since', new Date(profile.joinDate).getFullYear()],
                ['Status', 'Active'],
              ].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{l}</span>
                  <span style={{ fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ width: '100%', marginTop: 24, padding: '16px', background: 'var(--secondary)', borderRadius: 20, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>Quick Actions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button onClick={() => setShowPassModal(true)} className="btn btn-outline btn-full" style={{ justifyContent: 'flex-start', background: 'white', border: '1px solid var(--border)', fontSize: 13 }}>
                   <FiLock style={{ marginRight: 8 }} /> Change Password
                </button>
                <button onClick={() => setShowPrivacyModal(true)} className="btn btn-outline btn-full" style={{ justifyContent: 'flex-start', background: 'white', border: '1px solid var(--border)', fontSize: 13 }}>
                   <FiShield style={{ marginRight: 8 }} /> Privacy Settings
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card">
          <div className="card-header"><h5>Personal Information</h5></div>
          <div className="card-body">
            {fields.map(f => (
              <div key={f.key} className="form-group">
                <label className="form-label">{f.label}</label>
                {editing ? (
                  <div className="input-wrapper">
                    <span className="input-icon" style={{ color: 'var(--text-muted)' }}>{f.icon}</span>
                    <input
                      className="form-input has-icon"
                      type={f.type || 'text'}
                      value={profile[f.key]}
                      onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                    />
                  </div>
                ) : (
                  <div style={{ padding: '10px 0', fontSize: 15, color: 'var(--text-primary)', fontWeight: 500, borderBottom: '1px solid var(--border)' }}>
                    {profile[f.key] || '—'}
                  </div>
                )}
              </div>
            ))}
            {editing && (
              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea className="form-input" rows={3} value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>
            )}
          </div>
          {editing && (
            <div className="card-footer" style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}><FiSave size={13} /> Save Changes</button>
            </div>
          )}
        </motion.div>
      </div>
      {/* 🔐 PRIVACY MODAL */}
      <AnimatePresence>
        {showPrivacyModal && (
          <div className="modal-overlay" onClick={() => setShowPrivacyModal(false)} style={{ zIndex: 1000 }}>
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 450 }}>
                <div className="modal-header" style={{ padding: '24px 32px 12px' }}>
                   <h5 style={{ margin: 0 }}>Privacy & Security</h5>
                   <button className="modal-close" onClick={() => setShowPrivacyModal(false)}><FiX /></button>
                </div>
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 32px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                         <div style={{ fontWeight: 700, fontSize: 14 }}>Profile Visibility</div>
                         <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Show phone number on institutional directory</div>
                      </div>
                      <input type="checkbox" checked={privacySettings.showPhone} onChange={e => setPrivacySettings({...privacySettings, showPhone: e.target.checked})} style={{ width: 18, height: 18, accentColor: 'var(--primary)' }} />
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                         <div style={{ fontWeight: 700, fontSize: 14 }}>Messaging</div>
                         <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Allow direct messages from other roles</div>
                      </div>
                      <input type="checkbox" checked={privacySettings.allowMessages} onChange={e => setPrivacySettings({...privacySettings, allowMessages: e.target.checked})} style={{ width: 18, height: 18, accentColor: 'var(--primary)' }} />
                   </div>
                </div>
                <div className="modal-footer" style={{ padding: '0 32px 32px' }}>
                   <button className="btn btn-primary btn-full" onClick={() => {
                      addToast('success', 'Settings Saved', 'Your privacy preferences have been updated.');
                      setShowPrivacyModal(false);
                   }}>Save Preferences</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔐 PASSWORD MODAL */}
      <AnimatePresence>
        {showPassModal && (
          <div className="modal-overlay" onClick={() => setShowPassModal(false)} style={{ zIndex: 1000 }}>
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
                <div className="modal-header" style={{ padding: '24px 32px 12px' }}>
                   <h5 style={{ margin: 0 }}>Change Password</h5>
                   <button className="modal-close" onClick={() => setShowPassModal(false)}><FiX /></button>
                </div>
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '24px 32px' }}>
                   <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: 11 }}>Current Password</label>
                      <input type="password" className="form-input" value={passData.current} onChange={e => setPassData({...passData, current: e.target.value})} style={{ minHeight: 44 }} />
                   </div>
                   <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: 11 }}>New Password</label>
                      <input type="password" className="form-input" value={passData.new} onChange={e => setPassData({...passData, new: e.target.value})} style={{ minHeight: 44 }} />
                   </div>
                   <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: 11 }}>Confirm Password</label>
                      <input type="password" className="form-input" value={passData.confirm} onChange={e => setPassData({...passData, confirm: e.target.value})} style={{ minHeight: 44 }} />
                   </div>
                </div>
                <div className="modal-footer" style={{ padding: '0 32px 32px' }}>
                   <button className="btn btn-primary btn-full" onClick={() => {
                      addToast('success', 'Password Updated', 'Your security credentials have been refreshed.');
                      setShowPassModal(false);
                      setPassData({ current: '', new: '', confirm: '' });
                   }}>Update Password</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

