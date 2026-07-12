import React from 'react';
import { 
  FiGrid, FiUsers, FiUser, FiHome, FiClock, FiDollarSign, 
  FiBook, FiPackage, FiCheckSquare, FiCalendar, FiSettings, FiBell, FiShield,
  FiActivity, FiFileText, FiMessageSquare, FiTrendingUp, FiMapPin
} from 'react-icons/fi';

export const ROLE_CONFIGS = {
  admin: {
    label: 'Admin Panel',
    theme: 'indigo',
    dashboard: '/admin/dashboard',
    nav: [
      {
        label: 'Main',
        items: [
          { path: '/admin/dashboard', icon: <FiGrid />, label: 'Dashboard' },
          { path: '/admin/students', icon: <FiUser />, label: 'Students' },
          { path: '/admin/teachers', icon: <FiUsers />, label: 'Teachers' },
          { path: '/admin/staff', icon: <FiBriefcase />, label: 'Staff' },
          { path: '/admin/classes', icon: <FiHome />, label: 'Classes' },
          { path: '/admin/timetable', icon: <FiClock />, label: 'Timetable' },
        ],
      },
      {
        label: 'Operations',
        items: [
          { path: '/admin/finance', icon: <FiDollarSign />, label: 'Finance' },
          { path: '/admin/library', icon: <FiBook />, label: 'Library' },
          { path: '/admin/reception', icon: <FiUsers />, label: 'Reception' },
          { path: '/admin/inventory', icon: <FiPackage />, label: 'Inventory' },
        ],
      },
      {
        label: 'Academics',
        items: [
          { path: '/admin/attendance', icon: <FiCheckSquare />, label: 'Attendance' },
          { path: '/admin/calendar', icon: <FiCalendar />, label: 'Academic Calendar' },
          { path: '/admin/academics', icon: <FiSettings />, label: 'Academic Settings' },
          { path: '/admin/announcements', icon: <FiBell />, label: 'Announcements' },
        ],
      },
      {
        label: 'System',
        items: [
          { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' },
          { path: '/admin/profile', icon: <FiUser />, label: 'Profile' },
        ],
      },
    ]
  },
  teacher: {
    label: 'Teacher Portal',
    theme: 'blue',
    dashboard: '/teacher/dashboard',
    nav: [
      {
        label: 'Management',
        items: [
          { path: '/teacher/dashboard', icon: <FiGrid />, label: 'Dashboard' },
          { path: '/teacher/my-class', icon: <FiUsers />, label: 'Class Students' },
          { path: '/teacher/attendance', icon: <FiCheckSquare />, label: 'Mark Attendance' },
          { path: '/teacher/assignments', icon: <FiFileText />, label: 'Daily Homework' },
          { path: '/teacher/exams', icon: <FiActivity />, label: 'Exams & Results' },
        ],
      },
      {
        label: 'Personal',
        items: [
          { path: '/teacher/salary', icon: <FiDollarSign />, label: 'Salary/Payslip' },
          { path: '/teacher/messages', icon: <FiMessageSquare />, label: 'Staff Messages' },
          { path: '/teacher/profile', icon: <FiUser />, label: 'My Profile' },
        ],
      },
    ]
  },
  student: {
    label: 'Student Portal',
    theme: 'emerald',
    dashboard: '/student/dashboard',
    nav: [
      {
        items: [
          { path: '/student/dashboard', icon: <FiGrid />, label: 'My Dashboard' },
          { path: '/student/attendance', icon: <FiActivity />, label: 'Attendance' },
          { path: '/student/results', icon: <FiTrendingUp />, label: 'Examination Results' },
          { path: '/student/assignments', icon: <FiFileText />, label: 'Assignments' },
          { path: '/student/timetable', icon: <FiClock />, label: 'Class Timetable' },
          { path: '/student/fees', icon: <FiDollarSign />, label: 'Fee Portal' },
          { path: '/student/calendar', icon: <FiCalendar />, label: 'School Calendar' },
          { path: '/student/profile', icon: <FiUser />, label: 'My Profile' },
        ],
      },
    ]
  },
  parent: {
    label: 'Parent Portal',
    theme: 'amber',
    dashboard: '/parent/dashboard',
    nav: [
      {
        items: [
          { path: '/parent/dashboard', icon: <FiGrid />, label: 'My Dashboard' },
          { path: '/parent/child-attendance', icon: <FiActivity />, label: 'Child Attendance' },
          { path: '/parent/child-results', icon: <FiTrendingUp />, label: 'Exam Results' },
          { path: '/parent/fees', icon: <FiDollarSign />, label: 'Fee Payments' },
          { path: '/parent/notices', icon: <FiBell />, label: 'Notices' },
          { path: '/parent/teacher-messages', icon: <FiMessageSquare />, label: 'Teacher Connect' },
          { path: '/parent/profile', icon: <FiUser />, label: 'Profile' },
        ],
      },
    ]
  },
  staff: {
    label: 'Staff Portal',
    theme: 'slate',
    dashboard: '/staff/dashboard',
    nav: [
      {
        label: 'Personal',
        items: [
          { path: '/staff/dashboard', icon: <FiGrid />, label: 'Dashboard' },
          { path: '/staff/profile', icon: <FiUser />, label: 'My Profile' },
          { path: '/staff/attendance', icon: <FiClock />, label: 'Attendance' },
          { path: '/staff/salary', icon: <FiDollarSign />, label: 'Salary/Leaves' },
        ],
      },
      {
        label: 'Communication',
        items: [
          { path: '/staff/messages', icon: <FiMessageSquare />, label: 'Messages' },
          { path: '/staff/notices', icon: <FiBell />, label: 'Notice Board' },
        ],
      },
    ]
  }
};

const FiBriefcase = () => <FiPackage />; // Fallback if FiBriefcase missing in icons package
