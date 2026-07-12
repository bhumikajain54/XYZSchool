import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiSend, FiPlus, FiMoreVertical, FiPaperclip, FiArrowLeft, FiUser, FiInfo, FiFileText } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import SEO from '../../components/SEO';

export default function StaffMessages() {
  const { user } = useApp();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  
  // Responsive States
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  
  // Actions
  const [showInChatSearch, setShowInChatSearch] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chatList = [
    { id: 1, name: 'Rajesh Kumar', role: 'Principal / Admin', status: 'Online', last: 'Meeting scheduled at 2 PM.', time: '10:45 AM', unread: 2 },
    { id: 2, name: 'Priya Sharma', role: 'Teacher (Grade 10)', status: 'Offline', last: 'Sent the library books list.', time: 'Yesterday', unread: 0 },
    { id: 3, name: 'Amit Patel', role: 'Accountant', status: 'Online', last: 'Salary slip query resolved.', time: 'Yesterday', unread: 0 },
    { id: 4, name: 'Staff Common Room', role: 'Group Chat', status: 'Team', last: 'Lunch gathering in hall.', time: '2 days ago', unread: 5 },
  ];

  const MOCK_MESSAGES = [
    { id: 101, side: 'left', text: 'Hello, regarding the annual book fair catalog...', time: '10:30 AM' },
    { id: 102, side: 'right', text: 'Yes Sir, I am preparing the list categorially.', time: '10:32 AM' },
    { id: 103, side: 'left', text: 'Great. Please ensure all new arrivals are prioritized.', time: '10:35 AM' },
    { id: 104, side: 'left', text: 'Also, let\'s discuss the vendor coordination during the meeting at 2 PM today.', time: '10:36 AM' },
  ];

  const filteredContacts = chatList.filter(c => 
    c.name.toLowerCase().includes(sidebarSearch.toLowerCase()) || 
    c.role.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  const messages = chatSearchQuery 
    ? MOCK_MESSAGES.filter(m => m.text.toLowerCase().includes(chatSearchQuery.toLowerCase()))
    : MOCK_MESSAGES;

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;
    setMessage('');
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
    if (isMobile) setShowChatOnMobile(true);
    setShowInChatSearch(false);
    setChatSearchQuery('');
    setShowChatInfo(false);
  };

  const handleFileClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) alert(`Attaching: ${file.name}`);
    };
    input.click();
  };

  return (
    <div className="page-enter" style={{ 
      height: 'calc(100dvh - 120px)',
      padding: isMobile ? '0' : '20px',
      margin: isMobile ? '0 -15px' : '0' // To sit edge-to-edge on small mobile
    }}>
      <SEO title="Staff Communications | XYZ School" description="Internal staff messaging and collaboration center." />
      
      <div className="section-header" style={{ 
        marginBottom: isMobile ? 12 : 16,
        padding: isMobile ? '0 15px' : '0'
      }}>
         <div>
            <h3 style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--text-primary), var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Staff Communications</h3>
            <p className="section-subtitle" style={{ fontSize: isMobile ? 10 : 13 }}>Internal secure collaboration hub</p>
         </div>
      </div>

      <div className="card" style={{ 
        display: 'flex', 
        height: isMobile ? 'calc(100% - 70px)' : 'calc(100% - 60px)', 
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
          width: isMobile ? '100%' : isTablet ? 260 : 320, 
          borderRight: isMobile ? 'none' : '1px solid var(--border)', 
          display: isMobile && showChatOnMobile ? 'none' : 'flex', 
          flexDirection: 'column', background: 'var(--bg-secondary)' 
        }}>
          <div style={{ padding: '15px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: '10px', padding: '0 10px', border: '1px solid var(--border)' }}>
               <FiSearch style={{ color: 'var(--text-muted)', fontSize: 14 }} />
               <input placeholder="Search..." value={sidebarSearch} onChange={(e) => setSidebarSearch(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', padding: '10px 8px', fontSize: 13, outline: 'none' }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredContacts.map(chat => (
               <div key={chat.id} onClick={() => selectChat(chat)} style={{ padding: isMobile ? '14px' : '16px 20px', cursor: 'pointer', background: selectedChat?.id === chat.id && !isMobile ? 'var(--bg-card)' : 'transparent', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center' }}>
                 <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{ 
                      width: windowWidth < 380 ? 34 : 38, 
                      height: windowWidth < 380 ? 34 : 38, 
                      borderRadius: 10, 
                      background: 'var(--primary)', 
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 800, 
                      fontSize: windowWidth < 380 ? 11 : 13 
                    }}>{chat.name.split(' ').map(n=>n[0]).join('')}</div>
                    {chat.status === 'Online' && <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: '50%', background: '#22C55E', border: '2px solid var(--bg-card)' }} />}
                 </div>
                 <div style={{ flex: 1, minWidth: 0 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ fontWeight: 800, fontSize: windowWidth < 380 ? 11 : 12, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.name}</div>
                      <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{chat.time}</div>
                   </div>
                   <div style={{ fontSize: 9, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.last}</div>
                 </div>
               </div>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div style={{ flex: 1, display: isMobile && !showChatOnMobile ? 'none' : 'flex', flexDirection: 'column', background: 'var(--bg-card)', position: 'relative' }}>
          {selectedChat ? (
            <>
               <div style={{ padding: isMobile ? '12px 15px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                    {isMobile && <button onClick={() => setShowChatOnMobile(false)} style={{ background: 'var(--bg-secondary)', border: 'none', padding: 8, borderRadius: 8 }}><FiArrowLeft /></button>}
                    {showInChatSearch ? (
                       <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 10 }}>
                         <FiSearch size={14} color="var(--primary)" />
                         <input autoFocus placeholder="Search..." value={chatSearchQuery} onChange={(e) => setChatSearchQuery(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: 13 }} />
                         <button onClick={() => { setShowInChatSearch(false); setChatSearchQuery(''); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 10, fontWeight: 800 }}>X</button>
                       </div>
                    ) : (
                      <>
                        <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--bg-secondary)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>{selectedChat.name[0]}</div>
                        <div style={{ minWidth: 0 }}>
                           <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedChat.name}</div>
                           <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{selectedChat.status}</div>
                        </div>
                      </>
                    )}
                 </div>
                 {!showInChatSearch && (
                 <div style={{ display: 'flex', gap: 4 }}>
                    <button onClick={() => setShowInChatSearch(true)} className="icon-btn" style={{ width: 32, height: 32 }}><FiSearch size={14} /></button>
                    <button onClick={() => setShowChatInfo(true)} className="icon-btn" style={{ width: 32, height: 32 }}><FiInfo size={14} /></button>
                 </div>
                 )}
               </div>

               <AnimatePresence>
                 {showChatInfo && (
                   <motion.div initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: isMobile ? '100%' : 260, background: 'var(--bg-card)', borderLeft: '1px solid var(--border)', zIndex: 70, display: 'flex', flexDirection: 'column', boxShadow: '-5px 0 15px rgba(0,0,0,0.05)' }}>
                      <div style={{ padding: 15 }}><button onClick={() => setShowChatInfo(false)} className="icon-btn" style={{ width: 32, height: 32 }}><FiArrowLeft /></button></div>
                      <div style={{ padding: 20, textAlign: 'center' }}>
                         <div style={{ width: 60, height: 60, borderRadius: 15, background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, margin: '0 auto 12px' }}>{selectedChat.name[0]}</div>
                         <h5 style={{ margin: 0, fontWeight: 800 }}>{selectedChat.name}</h5>
                         <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Staff ID: #V-1029</p>
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
               
               <div style={{ flex: 1, overflowY: 'auto', padding: windowWidth < 380 ? '12px' : '20px', display: 'flex', flexDirection: 'column', gap: 8, background: 'rgba(240, 244, 248, 0.4)' }}>
                 {messages.length === 0 ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--text-muted)', gap: 12 }}>
                       <FiMessageSquare size={windowWidth < 380 ? 32 : 40} style={{ opacity: 0.2 }} />
                       <p style={{ fontSize: 13 }}>{chatSearchQuery ? 'No match found.' : 'No messages yet.'}</p>
                    </div>
                 ) : (
                   messages.map(m => (
                     <div key={m.id} style={{ alignSelf: m.side === 'right' ? 'flex-end' : 'flex-start', maxWidth: windowWidth < 380 ? '90%' : '75%' }}>
                        <div style={{ padding: windowWidth < 380 ? '8px 12px' : '10px 14px', borderRadius: '12px', background: m.side === 'right' ? 'var(--primary)' : 'white', color: m.side === 'right' ? 'white' : 'var(--text-primary)', fontSize: windowWidth < 380 ? 12 : 13, boxShadow: '0 2px 5px rgba(0,0,0,0.04)', border: m.side === 'right' ? 'none' : '1px solid var(--border)' }}>{m.text}</div>
                        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 4, textAlign: m.side === 'right' ? 'right' : 'left' }}>{m.time}</div>
                     </div>
                   ))
                 )}
               </div>

               <form onSubmit={handleSend} style={{ padding: windowWidth < 380 ? '8px 10px' : '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 6 }}>
                 <button onClick={handleFileClick} type="button" className="icon-btn" style={{ width: 30, height: 30, background: 'var(--bg-secondary)', flexShrink: 0 }}><FiPaperclip size={14} /></button>
                 <input placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)} style={{ flex: 1, border: '1px solid var(--border)', background: 'var(--bg-secondary)', padding: '6px 10px', borderRadius: '8px', fontSize: 12, outline: 'none' }} />
                 <button className="btn btn-primary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: 12 }}>
                    <FiSend size={14} />
                 </button>
               </form>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', color: 'var(--text-muted)', fontSize: 13 }}>Select a chat to start</div>
          )}
        </div>
      </div>
    </div>
  );
}

