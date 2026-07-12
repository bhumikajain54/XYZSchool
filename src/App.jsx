import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { HelmetProvider } from 'react-helmet-async';

// Common
import ToastContainer from './components/ToastContainer';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';

// Loading Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-slate-500 animate-pulse">Loading experience...</p>
    </div>
  </div>
);

// Auth & Shared
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SalaryOverview = lazy(() => import('./pages/SalaryOverview'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const AcademicsPage = lazy(() => import('./pages/AcademicsPage'));
const AdmissionsPage = lazy(() => import('./pages/AdmissionsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const FacilitiesPage = lazy(() => import('./pages/FacilitiesPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const MandatoryDisclosure = lazy(() => import('./pages/MandatoryDisclosure'));

// Admin
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const StudentManagement = lazy(() => import('./pages/admin/StudentManagement'));
const TeacherManagement = lazy(() => import('./pages/admin/TeacherManagement'));
const StaffManagement = lazy(() => import('./pages/admin/StaffManagement'));
const ClassSection = lazy(() => import('./pages/admin/ClassSection'));
const FeesManagement = lazy(() => import('./pages/admin/FeesManagement'));
const AcademicSettings = lazy(() => import('./pages/admin/AcademicSettings'));
const AttendanceOverview = lazy(() => import('./pages/admin/AttendanceOverview'));
const Announcements = lazy(() => import('./pages/admin/Announcements'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const UserSettings = lazy(() => import('./pages/UserSettings'));
const InventoryList = lazy(() => import('./pages/admin/InventoryList'));
const AddInventoryItem = lazy(() => import('./pages/admin/AddInventoryItem'));
const Calendar = lazy(() => import('./pages/admin/Calendar'));
const Finance = lazy(() => import('./pages/admin/Finance'));
const Library = lazy(() => import('./pages/admin/Library'));
const Reception = lazy(() => import('./pages/admin/Reception'));
const AdminTimetable = lazy(() => import('./pages/admin/Timetable'));

// Teacher
const TeacherDashboard = lazy(() => import('./pages/teacher/TeacherDashboard'));
const TeacherStudentList = lazy(() => import('./pages/teacher/TeacherStudentList'));
const Assignments = lazy(() => import('./pages/teacher/Assignments'));
const ExamsMarks = lazy(() => import('./pages/teacher/ExamsMarks'));
const AttendanceTaking = lazy(() => import('./pages/teacher/AttendanceTaking'));
const ExamScheduleCreator = lazy(() => import('./pages/teacher/ExamScheduleCreator'));
const TeacherAnnouncements = lazy(() => import('./pages/teacher/TeacherAnnouncements'));

// Student
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const StudentAttendance = lazy(() => import('./pages/student/StudentAttendance'));
const StudentResults = lazy(() => import('./pages/student/StudentResults'));
const Timetable = lazy(() => import('./pages/student/Timetable'));
const StudentFees = lazy(() => import('./pages/student/StudentFees'));
const StudentAssignments = lazy(() => import('./pages/student/StudentAssignments'));

// Staff
const StaffDashboard = lazy(() => import('./pages/staff/StaffDashboard'));
const StaffAttendance = lazy(() => import('./pages/staff/StaffAttendance'));
const StaffLeave = lazy(() => import('./pages/staff/StaffLeave'));
const StaffSalary = lazy(() => import('./pages/staff/StaffSalary'));
const StaffProfile = lazy(() => import('./pages/staff/StaffProfile'));
const StaffNotices = lazy(() => import('./pages/staff/StaffNotices'));
const StaffDocuments = lazy(() => import('./pages/staff/StaffDocuments'));
const StaffMessages = lazy(() => import('./pages/staff/StaffMessages'));
const MessagingPage = lazy(() => import('./pages/MessagingPage'));

// Icons
import { FiDollarSign, FiBook, FiUsers, FiClock, FiGrid, FiSettings, FiUser, FiCalendar, FiBell, FiPackage, FiCheckSquare, FiHome, FiSend } from 'react-icons/fi';

// -------------------------------------------------------
// NAV DEFINITIONS
// -------------------------------------------------------
const ADMIN_NAV = [
  {
    label: 'Main',
    items: [
      { path: '/admin/dashboard', icon: <FiGrid />, label: 'Dashboard' },
      { path: '/admin/students', icon: <FiUser />, label: 'Students' },
      { path: '/admin/teachers', icon: <FiUsers />, label: 'Teachers' },
      { path: '/admin/staff', icon: <FiUsers />, label: 'Staff' },
      { path: '/admin/classes', icon: <FiHome />, label: 'Classes' },
      { path: '/admin/timetable', icon: <FiClock />, label: 'Timetable' },
      { path: '/admin/messages', icon: <FiSend />, label: 'Messages', notifType: 'messages' },
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
      { path: '/admin/calendar', icon: <FiCalendar />, label: 'Calendar' },
      { path: '/admin/academics', icon: <FiSettings />, label: 'Academic Settings' },
      { path: '/admin/announcements', icon: <FiBell />, label: 'Announcements', notifType: 'announcements' },
    ],
  },
  {
    label: 'System',
    items: [
      { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' },
      { path: '/admin/profile', icon: <FiUser />, label: 'Profile' },
    ],
  },
];

const TEACHER_NAV = [
  {
    label: 'Main',
    items: [
      { path: '/teacher/dashboard', icon: '🏠', label: 'Dashboard' },
      { path: '/teacher/test-schedule', icon: '📅', label: 'Test Schedule' },
      { path: '/teacher/my-class', icon: '🎓', label: 'My Class' },
      { path: '/teacher/assignments', icon: '📝', label: 'Assignments' },
      { path: '/teacher/exams', icon: '📊', label: 'Exams & Marks' },
    ],
  },
  {
    label: 'Communication',
    items: [
      { path: '/teacher/announcements', icon: '📢', label: 'Announcements', notifType: 'announcements' },
      { path: '/teacher/messages', icon: '✉️', label: 'Messages', notifType: 'messages' },
    ],
  },
  {
    label: 'Account',
    items: [
      { path: '/teacher/salary', icon: '💰', label: 'Salary' },
      { path: '/teacher/profile', icon: '👤', label: 'Profile' },
    ],
  },
];

const getStaffNav = () => {
  return [
    {
      label: 'Operational',
      items: [
        { path: '/staff/dashboard', icon: '🏠', label: 'Dashboard' },
      ],
    },
    {
      label: 'Personal',
      items: [
        { path: '/staff/attendance', icon: '📅', label: 'Attendance' },
        { path: '/staff/leave', icon: '📝', label: 'Leave' },
        { path: '/staff/salary', icon: '💰', label: 'Salary / Payslip' },
      ],
    },
    {
      label: 'Communication',
      items: [
        { path: '/staff/notices', icon: '📢', label: 'Notice Board', notifType: 'announcements' },
        { path: '/staff/messages', icon: '✉️', label: 'Messages', notifType: 'messages' },
      ],
    },
    {
      label: 'General',
      items: [
        { path: '/staff/documents', icon: '📄', label: 'Documents' },
        { path: '/staff/settings', icon: '⚙️', label: 'Settings' },
        { path: '/staff/profile', icon: '👤', label: 'My Profile' },
      ],
    },
  ];
};

const STUDENT_NAV = [
  {
    items: [
      { path: '/student/dashboard', icon: '🏠', label: 'Dashboard' },
      { path: '/student/attendance', icon: '📅', label: 'Attendance' },
      { path: '/student/results', icon: '📊', label: 'Results' },
      { path: '/student/assignments', icon: '📝', label: 'Assignments' },
      { path: '/student/timetable', icon: '🕐', label: 'Timetable' },
      { path: '/student/calendar', icon: '📅', label: 'Calendar' },
      { path: '/student/fees', icon: '💰', label: 'Fees' },
      { path: '/student/messages', icon: '💬', label: 'Messages', notifType: 'messages' },
      { path: '/student/profile', icon: '👤', label: 'Profile' },
    ],
  },
];

function AppRoutes() {
  const { user } = useApp();

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/mandatory-disclosure" element={<MandatoryDisclosure />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRole="admin">
              <DashboardLayout navItems={ADMIN_NAV} role="admin" roleLabel="Admin Panel" title="Admin Dashboard" />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="teachers" element={<TeacherManagement />} />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="classes" element={<ClassSection />} />
            <Route path="attendance" element={<AttendanceOverview />} />
            <Route path="fees" element={<FeesManagement />} />
            <Route path="finance" element={<Finance />} />
            <Route path="library" element={<Library />} />
            <Route path="reception" element={<Reception />} />
            <Route path="timetable" element={<AdminTimetable />} />
            <Route path="academics" element={<AcademicSettings />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="inventory" element={<InventoryList />} />
            <Route path="inventory/add" element={<AddInventoryItem />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="messages" element={<MessagingPage />} />
          </Route>

          {/* TEACHER ROUTES */}
          <Route path="/teacher" element={
            <ProtectedRoute allowedRole="teacher">
              <DashboardLayout navItems={TEACHER_NAV} role="teacher" roleLabel="Teacher Panel" title="Teacher Dashboard" />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="test-schedule" element={<ExamScheduleCreator />} />
            <Route path="my-class" element={<TeacherStudentList />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="exams" element={<ExamsMarks />} />
            <Route path="salary" element={<SalaryOverview />} />
            <Route path="announcements" element={<TeacherAnnouncements />} />
            <Route path="messages" element={<MessagingPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* STAFF ROUTES */}
          <Route path="/staff" element={
            <ProtectedRoute allowedRole="staff">
              <DashboardLayout
                navItems={getStaffNav()}
                role="staff"
                roleLabel={user?.subRole ? `${user.subRole.charAt(0).toUpperCase() + user.subRole.slice(1)} Panel` : 'Staff Panel'}
                title={user?.subRole ? `${user.subRole.charAt(0).toUpperCase() + user.subRole.slice(1)} Dashboard` : 'Staff Dashboard'}
              />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StaffDashboard />} />

            {/* Personal */}
            <Route path="profile" element={<StaffProfile />} />
            <Route path="attendance" element={<StaffAttendance />} />
            <Route path="leave" element={<StaffLeave />} />
            <Route path="salary" element={<StaffSalary />} />

            {/* Communication */}
            <Route path="notices" element={<StaffNotices />} />
            <Route path="messages" element={<StaffMessages />} />

            {/* General */}
            <Route path="documents" element={<StaffDocuments />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>

          {/* STUDENT ROUTES */}
          <Route path="/student" element={
            <ProtectedRoute allowedRole="student">
              <DashboardLayout navItems={STUDENT_NAV} role="student" roleLabel="Student Portal" title="Student Dashboard" />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="fees" element={<StudentFees />} />
            <Route path="messages" element={<MessagingPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
