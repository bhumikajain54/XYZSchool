import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiCalendar, FiEdit3, FiShield, FiCamera, FiLock, FiAlertCircle, FiTrash2, FiX, FiCheck, FiArrowRight, FiInfo } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

export default function StaffProfile() {
  const { user, addToast } = useApp();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [passData, setPassData] = useState({ current: '', new: '', confirm: '' });
  const [privacySettings, setPrivacySettings] = useState({ showPhone: true, showEmail: true, allowMessages: true });
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('staff_pfp') || null);

  const [staffDetails, setStaffDetails] = useState({
    id: 'STF-2024-089',
    designation: 'Senior Librarian',
    department: 'Library & Information Science',
    joining: 'August 14, 2022',
    phone: '+91 98765 43210',
    email: user?.email || 'librarian@xyzschool.edu',
    address: 'Flat 402, Royal Residency, Hawa Mahal Road, Jaipur, Rajasthan',
    emergency: 'Sunita Mehra (Spouse) - +91 98765 11223',
    qualification: 'M.Lib.Sc, NET Qualified',
    experience: '8 Years in Academic Institutions'
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
        localStorage.setItem('staff_pfp', reader.result);
        addToast('success', 'Profile Updated', 'Your institutional photo has been synchronized.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoDelete = () => {
    setProfilePhoto(null);
    localStorage.removeItem('staff_pfp');
    addToast('info', 'Photo Removed', 'Your institutional avatar has been reset.');
  };

  const handleSave = () => {
    setIsEditing(false);
    addToast('success', 'Profile Updated', 'Your institutional record has been successfully modified.');
  };

  return (
    <div className="page-enter py-4 sm:py-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight italic uppercase">Professional Dossier</h3>
          <p className="text-[10px] sm:text-xs font-black text-slate-400 mt-1 uppercase tracking-widest">Management of institutional records and credentials</p>
        </div>
        <button 
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95 italic
            ${isEditing ? 'bg-emerald-600 text-white shadow-emerald-100 hover:bg-emerald-700' : 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700'}`} 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? <FiCheck size={16} /> : <FiEdit3 size={16} />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Card & Quick Actions */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-10 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
            
            <div className="relative mb-8">
               <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2.5rem] bg-indigo-600 text-white flex items-center justify-center font-black text-4xl sm:text-5xl shadow-2xl shadow-indigo-200 overflow-hidden ring-4 ring-white relative">
                 {profilePhoto ? (
                   <img src={profilePhoto} alt="Staff" className="w-full h-full object-cover" />
                 ) : (
                   <span className="italic uppercase tracking-tighter">{user?.name?.split(' ').map(n=>n[0]).join('') || 'SM'}</span>
                 )}
               </div>
               <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
               <div className="absolute -bottom-2 -right-2 flex gap-2">
                 <button 
                   onClick={() => fileInputRef.current.click()}
                   className="w-10 h-10 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all active:scale-90"
                 >
                   <FiCamera size={18} />
                 </button>
                 {profilePhoto && (
                   <button 
                     onClick={handlePhotoDelete}
                     className="w-10 h-10 bg-rose-50 rounded-xl shadow-lg border border-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white hover:scale-110 transition-all active:scale-90"
                   >
                     <FiTrash2 size={18} />
                   </button>
                 )}
               </div>
            </div>

            <h3 className="font-black text-2xl text-slate-800 tracking-tight italic uppercase mb-1">{user?.name || 'Sonal Mehta'}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{staffDetails.designation} • {staffDetails.id}</p>
            
            <div className="flex flex-wrap justify-center gap-2">
               <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[8px] font-black uppercase tracking-widest shadow-sm">Permanent Staff</span>
               <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-[8px] font-black uppercase tracking-widest shadow-sm">{staffDetails.department}</span>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-8 space-y-4">
            <h5 className="font-black text-slate-800 uppercase italic tracking-tighter text-sm mb-6 flex items-center gap-2">
               <FiShield className="text-indigo-600" /> Administrative Controls
            </h5>
            <button 
              onClick={() => setShowPassModal(true)}
              className="w-full py-4 px-6 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-indigo-400 hover:bg-white transition-all flex items-center gap-4 group italic shadow-inner"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform"><FiLock size={14} /></div>
              Change Password
            </button>
            <button 
              onClick={() => setShowPrivacyModal(true)}
              className="w-full py-4 px-6 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-indigo-400 hover:bg-white transition-all flex items-center gap-4 group italic shadow-inner"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform"><FiShield size={14} /></div>
              Privacy Settings
            </button>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden ring-1 ring-slate-50 flex flex-col">
          <div className="p-8 sm:p-10 border-b border-slate-50 bg-slate-50/20">
             <h5 className="font-black text-slate-800 uppercase italic tracking-tighter text-lg">Personal & Academic Details</h5>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Verified institutional data registry</p>
          </div>
          
          <div className="p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
             <DetailItem isEditing={isEditing} icon={<FiBriefcase />} label="Staff ID" value={staffDetails.id} onChange={v => setStaffDetails({...staffDetails, id: v})} />
             <DetailItem isEditing={isEditing} icon={<FiBriefcase />} label="Designation" value={staffDetails.designation} onChange={v => setStaffDetails({...staffDetails, designation: v})} />
             <DetailItem isEditing={isEditing} icon={<FiBriefcase />} label="Department" value={staffDetails.department} onChange={v => setStaffDetails({...staffDetails, department: v})} />
             <DetailItem isEditing={isEditing} icon={<FiCalendar />} label="Joining Date" value={staffDetails.joining} onChange={v => setStaffDetails({...staffDetails, joining: v})} />
             <DetailItem isEditing={isEditing} icon={<FiPhone />} label="Phone Number" value={staffDetails.phone} onChange={v => setStaffDetails({...staffDetails, phone: v})} />
             <DetailItem isEditing={isEditing} icon={<FiMail />} label="Email Address" value={staffDetails.email} onChange={v => setStaffDetails({...staffDetails, email: v})} />
             <div className="md:col-span-2 bg-slate-50/50 p-6 rounded-3xl border border-slate-100 shadow-inner">
               <DetailItem isEditing={isEditing} icon={<FiMapPin />} label="Residential Address" value={staffDetails.address} onChange={v => setStaffDetails({...staffDetails, address: v})} />
             </div>
             <DetailItem isEditing={isEditing} icon={<FiCalendar />} label="Highest Qualification" value={staffDetails.qualification} onChange={v => setStaffDetails({...staffDetails, qualification: v})} />
             <DetailItem isEditing={isEditing} icon={<FiBriefcase />} label="Work Experience" value={staffDetails.experience} onChange={v => setStaffDetails({...staffDetails, experience: v})} />
             <div className="md:col-span-2">
               <DetailItem isEditing={isEditing} icon={<FiAlertCircle className="text-rose-500" />} label="Emergency Contact Info" value={staffDetails.emergency} onChange={v => setStaffDetails({...staffDetails, emergency: v})} />
             </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {/* PRIVACY MODAL */}
        {showPrivacyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl border border-white overflow-hidden"
             >
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                   <h5 className="font-black text-slate-800 uppercase italic tracking-tighter text-xl">Privacy & Security</h5>
                   <button onClick={() => setShowPrivacyModal(false)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-inner"><FiX /></button>
                </div>
                <div className="p-8 space-y-6">
                   {[
                     { id: 'showPhone', label: 'Profile Visibility', desc: 'Show phone number to other staff', val: privacySettings.showPhone },
                     { id: 'showEmail', label: 'Email Security', desc: 'Show institutional email on public portal', val: privacySettings.showEmail },
                     { id: 'allowMessages', label: 'Messaging', desc: 'Allow direct messages from students', val: privacySettings.allowMessages }
                   ].map(item => (
                     <div key={item.id} className="flex items-center justify-between group">
                        <div className="pr-6">
                           <div className="text-[11px] font-black text-slate-800 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{item.label}</div>
                           <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{item.desc}</div>
                        </div>
                        <button 
                          onClick={() => setPrivacySettings({...privacySettings, [item.id]: !item.val})}
                          className={`w-14 h-8 rounded-full transition-all relative p-1 shadow-inner
                            ${item.val ? 'bg-indigo-600' : 'bg-slate-200'}`}
                        >
                           <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-all
                             ${item.val ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                     </div>
                   ))}
                </div>
                <div className="p-8 pt-0">
                   <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all italic active:scale-95" onClick={() => {
                      addToast('success', 'Settings Saved', 'Your privacy preferences have been updated.');
                      setShowPrivacyModal(false);
                   }}>Save Preferences</button>
                </div>
             </motion.div>
          </div>
        )}

        {/* PASSWORD MODAL */}
        {showPassModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="bg-white rounded-[2.5rem] w-full max-w-sm shadow-2xl border border-white overflow-hidden"
             >
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                   <h5 className="font-black text-slate-800 uppercase italic tracking-tighter text-xl">Change Password</h5>
                   <button onClick={() => setShowPassModal(false)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-inner"><FiX /></button>
                </div>
                <div className="p-8 space-y-6">
                   {[
                     { id: 'current', label: 'Current Password', val: passData.current },
                     { id: 'new', label: 'New Password', val: passData.new },
                     { id: 'confirm', label: 'Confirm New Password', val: passData.confirm }
                   ].map(field => (
                     <div key={field.id}>
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-2 italic">{field.label}</label>
                        <input 
                          type="password" 
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-400 focus:bg-white transition-all text-sm font-black italic shadow-inner ring-1 ring-slate-100/50" 
                          value={field.val} 
                          onChange={e => setPassData({...passData, [field.id]: e.target.value})} 
                        />
                     </div>
                   ))}
                </div>
                <div className="p-8 pt-0 flex gap-4">
                   <button className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-100 hover:text-slate-600 transition-all italic active:scale-95" onClick={() => setShowPassModal(false)}>Cancel</button>
                   <button className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all italic active:scale-95" onClick={() => {
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

function DetailItem({ icon, label, value, isEditing, onChange }) {
  return (
    <div className="flex gap-6 group">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-xl shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 italic px-1 transition-colors group-hover:text-indigo-400">{label}</label>
        {isEditing ? (
          <input 
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-indigo-400 focus:bg-white transition-all text-xs font-black italic shadow-inner" 
            value={value} 
            onChange={e => onChange(e.target.value)} 
          />
        ) : (
          <div className="text-sm font-black text-slate-800 tracking-tight italic uppercase truncate leading-snug">{value || 'N/A'}</div>
        )}
      </div>
    </div>
  );
}

