import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

// Demo credentials
const DEMO_USERS = {
  admin: { email: 'superadmin@xyzschool.edu', password: 'SuperAdmin123', name: 'Rajesh Kumar', role: 'admin', avatar: 'RK', department: 'Administration' },
  teacher: { email: 'teacher@xyzschool.edu', password: 'teacher123', name: 'Priya Sharma', role: 'teacher', avatar: 'PS', department: 'Mathematics' },
  student: { email: 'student@xyzschool.edu', password: 'student123', name: 'Sneha Gupta', role: 'student', avatar: 'SG', department: 'Class 10-A' },

  // Staff Roles
  librarian: { email: 'librarian@xyzschool.edu', password: 'librarian123', name: 'Sonal Mehta', role: 'staff', subRole: 'librarian', avatar: 'SM', department: 'Library' },
  accountant: { email: 'accountant@xyzschool.edu', password: 'accountant123', name: 'Amit Patel', role: 'staff', subRole: 'accountant', avatar: 'AP', department: 'Finance' },
  receptionist: { email: 'receptionist@xyzschool.edu', password: 'receptionist123', name: 'Rohan Verma', role: 'staff', subRole: 'receptionist', avatar: 'RV', department: 'Front Desk' },
  inventory: { email: 'inventory@xyzschool.edu', password: 'inventory123', name: 'Vikram Singh', role: 'staff', subRole: 'inventory', avatar: 'VS', department: 'Logistics' },
  staff: { email: 'staff@xyzschool.edu', password: 'staff123', name: 'Vikram Staff', role: 'staff', avatar: 'ST', department: 'General Staff' },
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vikram_user')); } catch { return null; }
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('vikram_theme') || 'light');
  const [toasts, setToasts] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Theme
  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next = t === 'light' ? 'dark' : 'light';
      localStorage.setItem('vikram_theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Notifications
  React.useEffect(() => {
    const ROLE_NOTIFICATIONS = {
      admin: [
        { id: 101, notifType: 'settings', type: 'info', title: 'System Backup', msg: 'Full system backup completed successfully.', time: '10m ago', path: '/admin/settings' },
        { id: 102, notifType: 'staff', type: 'warning', title: 'Staff Update', msg: '2 new staff applications pending review.', time: '1h ago', path: '/admin/staff' },
        { id: 103, notifType: 'messages', type: 'info', title: 'Direct Message', msg: 'Priya Sharma (HOD) sent a report.', time: '2h ago', path: '/admin/messages' },
      ],
      teacher: [
        { id: 201, notifType: 'messages', type: 'info', title: 'New Message', msg: 'Aarav (Grade 10A) sent a query.', time: '5m ago', path: '/teacher/messages' },
        { id: 202, notifType: 'messages', type: 'info', title: 'Assignment Submission', msg: '5 students submitted Math homework.', time: '20m ago', path: '/teacher/messages' },
        { id: 203, notifType: 'messages', type: 'info', title: 'Group Chat', msg: 'Staff Room: Meeting moved to Hall B.', time: '1h ago', path: '/teacher/messages' },
        { id: 204, notifType: 'announcements', type: 'success', title: 'Fee Paid', msg: 'Term 2 fee payment confirmed', time: '1h ago', path: '/teacher/announcements' },
        { id: 205, notifType: 'announcements', type: 'warning', title: 'Exam Schedule', msg: 'Final exams start next week', time: '3h ago', path: '/teacher/test-schedule' },
        { id: 206, notifType: 'announcements', type: 'info', title: 'Cultural Fest', msg: 'Volunteer registration open.', time: '5h ago', path: '/teacher/announcements' },
      ],
      student: [
        { id: 301, notifType: 'results', type: 'success', title: 'Grade Released', msg: 'Physics results for Unit Test 1 are out.', time: '20m ago', path: '/student/results' },
        { id: 302, notifType: 'fees', type: 'info', title: 'Fee Reminder', msg: 'Term 2 fees due by April 15th.', time: '2h ago', path: '/student/fees' },
        { id: 303, notifType: 'messages', type: 'info', title: 'New Message', msg: 'Principal Rajesh Kumar sent a notice.', time: '3h ago', path: '/student/messages' },
      ]
    };

    if (user?.role && ROLE_NOTIFICATIONS[user.role]) {
      setNotifications(ROLE_NOTIFICATIONS[user.role]);
    } else {
      setNotifications([]);
    }
  }, [user]);

  const dismissNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearNotificationsByType = useCallback((type) => {
    setNotifications(prev => prev.filter(n => n.notifType !== type));
  }, []);

  // Auth
  const login = useCallback((email, password, role, subRole = null) => {
    // For demo: if use dummy staff email, we allow it with chosen subRole
    const demoUser = Object.values(DEMO_USERS).find(
      u => u.email === email && u.password === password && u.role === role
    );

    if (demoUser) {
      const finalUser = { ...demoUser, subRole: role === 'staff' ? subRole : null };
      setUser(finalUser);
      localStorage.setItem('vikram_user', JSON.stringify(finalUser));
      return { success: true, user: finalUser };
    }
    return { success: false, message: 'Invalid credentials. Please try again.' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('vikram_user');
  }, []);

  // Toasts
  const addToast = useCallback((type, title, message, duration = 4000) => {
    const id = Date.now();
    setToasts(t => [...t, { id, type, title, message }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      user, login, logout,
      theme, toggleTheme,
      toasts, addToast, removeToast,
      sidebarCollapsed, setSidebarCollapsed,
      mobileSidebarOpen, setMobileSidebarOpen,
      notifications, setNotifications, dismissNotification, clearNotificationsByType,
      DEMO_USERS,
    }}>
      {children}
    </AppContext.Provider>
  );
};

