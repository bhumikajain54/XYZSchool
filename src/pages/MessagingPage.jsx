import React, { useState, useEffect } from 'react';
import { FiSend, FiSearch, FiMessageSquare, FiPaperclip, FiInfo, FiArrowLeft } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

const CONTACTS = [
  { id: 1, name: 'Mrs. Priya Sharma', role: 'Class Teacher', last: 'See you tomorrow!', time: '10:30 AM', online: true },
  { id: 2, name: 'Math Study Group', role: 'Group', last: 'Sanjay: I found the notes.', time: '09:45 AM', online: false },
  { id: 3, name: 'Principal Office', role: 'Admin', last: 'Please check your email.', time: 'Yesterday', online: false },
  { id: 4, name: 'Aarav Sharma', role: 'Student', last: 'Can you share the physics homework?', time: 'Mar 25', online: true },
];

const MOCK_MESSAGES = {
  1: [
    { id: 1, sender: 'Priya', text: 'Good Morning! Please remember to bring your geometry boxes today.', time: '10:05 AM' },
    { id: 2, sender: 'You', text: 'Good morning ma\'am! I have it ready.', time: '10:10 AM' },
    { id: 3, sender: 'Priya', text: 'Excellent! See you in class.', time: '10:12 AM' },
  ],
  2: [
    { id: 1, sender: 'Sanjay', text: 'Hey guys, I found the Physics notes from last session.', time: '09:00 AM' },
    { id: 2, sender: 'You', text: 'Thanks Sanjay! Can you upload them to the portal?', time: '09:45 AM' },
  ],
  3: [
    { id: 1, sender: 'Admin', text: 'Please check your portal for the updated staff guidelines.', time: 'Yesterday' },
  ],
  4: [
    { id: 1, sender: 'Aarav', text: 'Ma\'am, can you share the physics homework?', time: 'Mar 25' },
  ]
};

const MessagingPage = () => {
  const { user } = useApp();
  const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);
  const [allMessages, setAllMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  
  // Responsive States
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  
  // Feature States
  const [showInChatSearch, setShowInChatSearch] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rawMessages = allMessages[selectedContact.id] || [];
  const messages = chatSearchQuery 
    ? rawMessages.filter(m => m.text.toLowerCase().includes(chatSearchQuery.toLowerCase()))
    : rawMessages;

  const filteredContacts = CONTACTS.filter(c => 
    c.name.toLowerCase().includes(sidebarSearch.toLowerCase()) || 
    c.role.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), sender: 'You', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setAllMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg]
    }));
    setInput('');

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: selectedContact.name.split(' ')[1] || selectedContact.name,
        text: `Got your message! I'll get back to you soon.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAllMessages(prev => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), reply]
      }));
    }, 1500);
  };

  const selectChat = (c) => {
    setSelectedContact(c);
    if (isMobile) setShowChatOnMobile(true);
    setShowInChatSearch(false);
    setChatSearchQuery('');
  };

  const handleFileClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) alert(`File selected: ${file.name}`);
    };
    input.click();
  };

  return (
    <div className="page-enter" style={{ 
      height: 'calc(100dvh - 120px)', 
      minHeight: isMobile ? 'auto' : 600,
      padding: isMobile ? '0' : '20px',
      margin: isMobile ? '0 -15px' : '0' // Neutralize dashboard padding on mobile if any
    }}>
       <SEO title="Communication Hub | XYZ School" description="Integrated messaging system for XYZ School members." />
       
       <div className="section-header" style={{ 
         marginBottom: isMobile ? 12 : 20, 
         padding: isMobile ? '0 15px' : '0' 
       }}>
        <div>
          <h3 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--text-primary), var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Communication Hub</h3>
          <p className="section-subtitle" style={{ fontSize: isMobile ? 10 : 13 }}>Real-time school network messaging</p>
        </div>
      </div>

      <div className="card" style={{ 
        height: isMobile ? 'calc(100% - 80px)' : 'calc(100% - 60px)', 
        display: 'flex', 
        overflow: 'hidden', 
        padding: 0, 
        border: isMobile ? 'none' : '1px solid var(--border)', 
        borderTop: isMobile ? '1px solid var(--border)' : '1px solid var(--border)',
        background: 'var(--bg-card)', 
        boxShadow: isMobile ? 'none' : 'var(--shadow-xl)',
        position: 'relative',
        borderRadius: isMobile ? 0 : 16
      }}>
        {/* Sidebar */}
        <div style={{ 
          width: isMobile ? '100%' : isTablet ? 280 : 340, 
          borderRight: isMobile ? 'none' : '1px solid var(--border)', 
          background: 'var(--bg-secondary)', 
          display: isMobile && showChatOnMobile ? 'none' : 'flex', 
          flexDirection: 'column' 
        }}>
           <div style={{ padding: isMobile ? '15px' : '20px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
             <div style={{ 
               display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '0 12px', border: '1px solid var(--border)' 
             }}>
               <FiSearch style={{ color: 'var(--text-muted)', fontSize: 16 }} />
               <input 
                 placeholder="Search contacts..." 
                 value={sidebarSearch}
                 onChange={(e) => setSidebarSearch(e.target.value)}
                 style={{ width: '100%', border: 'none', background: 'transparent', padding: isMobile ? '10px 8px' : '12px 10px', fontSize: 14, outline: 'none' }} 
               />
             </div>
           </div>
           
           <div style={{ flex: 1, overflowY: 'auto' }}>
             {filteredContacts.map(c => (
               <motion.div 
                 key={c.id} 
                 onClick={() => selectChat(c)}
                 style={{ 
                   padding: isMobile ? '14px 16px' : '16px 20px', 
                   cursor: 'pointer', transition: 'all 0.3s',
                   background: selectedContact.id === c.id ? 'rgba(37,99,235,0.08)' : 'transparent',
                   display: 'flex', gap: isTablet ? 10 : 14, alignItems: 'center',
                   borderBottom: '1px solid rgba(0,0,0,0.03)'
                 }}
               >
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                     <div className="avatar" style={{ 
                       width: windowWidth < 380 ? 34 : 40, 
                       height: windowWidth < 380 ? 34 : 40, 
                       background: c.id % 2 === 0 ? 'var(--primary)' : '#7C3AED', 
                       color: 'white', 
                       fontSize: windowWidth < 380 ? 12 : 14 
                     }}>
                       {c.name.split(' ').map(n => n[0]).join('')}
                     </div>
                     {c.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderRadius: '50%', background: '#22C55E', border: '2px solid var(--bg-card)' }} />}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                        <span style={{ fontWeight: 700, fontSize: windowWidth < 380 ? 12 : 13, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                        <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{c.time}</span>
                     </div>
                     <p style={{ fontSize: 10, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>{c.last}</p>
                  </div>
               </motion.div>
             ))}
           </div>
        </div>

        {/* Chat Main */}
        <div style={{ 
          flex: 1, display: isMobile && !showChatOnMobile ? 'none' : 'flex', flexDirection: 'column', background: 'var(--bg-card)', position: 'relative' 
        }}>
           {/* Header */}
           <div className="card-header" style={{ padding: isMobile ? '12px 16px' : '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ display: 'flex', gap: isMobile ? 10 : 12, alignItems: 'center', flex: 1 }}>
                {isMobile && <button onClick={() => setShowChatOnMobile(false)} className="btn btn-ghost btn-icon" style={{ width: 32, height: 32 }}><FiArrowLeft /></button>}
                
                {showInChatSearch ? (
                  <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 10 }}>
                    <FiSearch size={14} color="var(--primary)" />
                    <input autoFocus placeholder="Search..." value={chatSearchQuery} onChange={(e) => setChatSearchQuery(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: 13 }} />
                    <button onClick={() => { setShowInChatSearch(false); setChatSearchQuery(''); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 10, fontWeight: 800 }}>ESC</button>
                  </div>
                ) : (
                  <>
                    <div className="avatar" style={{ width: isMobile ? 36 : 40, height: isMobile ? 36 : 40, background: selectedContact.id % 2 === 0 ? 'var(--primary)' : '#7C3AED', fontSize: 12 }}>{selectedContact.name.split(' ').map(n => n[0]).join('')}</div>
                    <div style={{ minWidth: 0 }}>
                      <h5 style={{ margin: 0, fontSize: isMobile ? 14 : 15, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedContact.name}</h5>
                      <p style={{ fontSize: 10, color: 'var(--text-secondary)', margin: 0 }}>{isMobile ? selectedContact.role : `${selectedContact.role} • ${selectedContact.online ? 'Online' : 'Offline'}`}</p>
                    </div>
                  </>
                )}
             </div>
             
             {!showInChatSearch && (
               <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => setShowInChatSearch(true)} className="btn btn-ghost btn-icon" style={{ width: 32, height: 32 }}><FiSearch size={16} /></button>
                  <button onClick={() => setShowContactInfo(!showContactInfo)} className="btn btn-ghost btn-icon" style={{ width: 32, height: 32 }}><FiInfo size={16} /></button>
               </div>
             )}
           </div>

           {/* Info Panel Overlay */}
           <AnimatePresence>
             {showContactInfo && (
               <motion.div initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: isMobile ? '100%' : 280, background: 'var(--bg-card)', borderLeft: '1px solid var(--border)', zIndex: 60, display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 20px rgba(0,0,0,0.05)' }}>
                 <div style={{ padding: 20 }}><button onClick={() => setShowContactInfo(false)} className="btn btn-ghost btn-icon" style={{ width: 32, height: 32 }}><FiArrowLeft /></button></div>
                 <div style={{ padding: '0 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
                    <div className="avatar" style={{ width: 70, height: 70, fontSize: 24, background: selectedContact.id % 2 === 0 ? 'var(--primary)' : '#7C3AED', marginBottom: 12 }}>{selectedContact.name.split(' ').map(n => n[0]).join('')}</div>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>{selectedContact.name}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>{selectedContact.role}</p>
                 </div>
                 <div style={{ padding: 24 }}>
                    <h6 style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>Details</h6>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                       <div><p style={{ fontSize: 10, color: 'var(--text-muted)', margin: 0 }}>Email</p><p style={{ fontSize: 12, fontWeight: 600, margin: 0 }}>{selectedContact.name.toLowerCase().replace(' ', '.')}@school.edu</p></div>
                    </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
           
           {/* Messages */}
           <div style={{ flex: 1, padding: windowWidth < 380 ? '12px' : '18px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6, background: 'rgba(248, 250, 252, 0.4)' }}>
              {messages.map((m) => (
                <div key={m.id} style={{ alignSelf: m.sender === 'You' ? 'flex-end' : 'flex-start', maxWidth: windowWidth < 380 ? '92%' : '80%' }}>
                   <div style={{ 
                     padding: windowWidth < 380 ? '8px 12px' : '10px 16px', borderRadius: '14px', 
                     borderBottomRightRadius: m.sender === 'You' ? 2 : 14, borderBottomLeftRadius: m.sender === 'You' ? 14 : 2,
                     background: m.sender === 'You' ? 'var(--primary)' : 'white', color: m.sender === 'You' ? 'white' : 'var(--text-primary)',
                     boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: m.sender === 'You' ? 'none' : '1px solid var(--border)', 
                     fontSize: windowWidth < 380 ? 11 : 13, lineHeight: 1.4
                   }}>{m.text}</div>
                   <p style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 4, textAlign: m.sender === 'You' ? 'right' : 'left' }}>{m.time}</p>
                </div>
              ))}
           </div>

           {/* Input */}
           <div style={{ padding: windowWidth < 380 ? '8px' : '12px 16px 20px', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', background: 'var(--bg-secondary)', padding: '4px 4px 4px 12px', borderRadius: '25px', border: '1px solid var(--border)' }}>
                 <button onClick={handleFileClick} className="btn btn-ghost btn-icon" style={{ width: 28, height: 28 }}><FiPaperclip size={14} /></button>
                 <input placeholder="Message..." value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 12 }} />
                 <button onClick={handleSend} className="btn btn-primary btn-icon" style={{ width: 32, height: 32, borderRadius: '50%' }}><FiSend size={14} /></button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;

