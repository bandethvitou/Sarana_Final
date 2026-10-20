// src/App.jsx - COMPLETE FIXED VERSION
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// ============================================================
// LAYOUTS
// ============================================================
import ProtectedLayout from './components/ProtectedLayout';
import DirectorLayout from './layouts/DirectorLayout';
import TopManagerLayout from './layouts/TopManagerLayout';
import ManagerLayout from './layouts/ManagerLayout';
import StaffLayout from './layouts/StaffLayout';
import OfficeLayout from './layouts/OfficeLayout';
import TeacherLayout from './layouts/TeacherLayout';
import StudentLayout from './layouts/StudentLayout';
import ParentLayout from './layouts/ParentLayout';
import Login from './pages/Login';

// ============================================================
// DIRECTOR PAGES
// ============================================================
import DirectorHome from './pages/director/DirectorDashboard';
import DirectorDashboard from './pages/director/DirectorDashboard';
import UserManagement from './pages/UserManagement';
import Roles from './pages/Roles';
import Goals from './pages/Goals';
import Tasks from './pages/Tasks';
import Meetings from './pages/Meetings';
import Bills from './pages/Bills';
import DirectorReports from './pages/Reports';
import Logs from './pages/Logs';
import Settings from './pages/Settings';

// ============================================================
// TOP MANAGER PAGES
// ============================================================
import TopManagerHome from './pages/topmanager/TopManagerDashboard';
import TopManagerDashboard from './pages/topmanager/TopManagerDashboard';
import TopManagerScoreManagement from './pages/topmanager/TopManagerScoreManagement';
import Managers from './pages/topmanager/Managers';
import PendingReviews from './pages/topmanager/PendingReviews';
import TaskAssignments from './pages/topmanager/TaskAssignments';
import TopManagerMeetings from './pages/topmanager/Meetings';
import ReportsToDirector from './pages/topmanager/ReportsToDirector';
import Enrollment from './pages/topmanager/Enrollment';
import Academic from './pages/topmanager/Academic';
import Placeholder from './pages/Placeholder';

// ============================================================
// MANAGER PAGES
// ============================================================
import ManagerHome from './pages/manager/ManagerDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import HiringRequests from './pages/manager/HiringRequests';
import Proposals from './pages/manager/Proposals';
import MyReports from './pages/manager/MyReports';
import LeaveRequests from './pages/manager/LeaveRequests';
import StaffReports from './pages/manager/StaffReports';
import MyTeam from './pages/manager/MyTeam';

// ============================================================
// STAFF PAGES
// ============================================================
import StaffHome from './pages/staff/StaffDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffTasks from './pages/staff/StaffTasks';
import StaffSchedule from './pages/staff/StaffSchedule';
import StaffMeetings from './pages/staff/StaffMeetings';
import StaffLeaves from './pages/staff/StaffLeaves';
import StaffPayments from './pages/staff/StaffPayments';
import StaffNotifications from './pages/staff/StaffNotifications';
import StaffReportsPage from './pages/staff/StaffReports';
import StaffAttendance from './pages/staff/StaffAttendance';

// ============================================================
// HR PAGES
// ============================================================
import HrHome from './pages/hr/HrHome';
import HRDashboard from './pages/hr/HRDashboard';
import StaffManagement from './pages/hr/StaffManagement';
import PositionManager from './pages/hr/PositionManager';
import TempRoles from './pages/hr/TempRoles';
import HRLeaveRequests from './pages/hr/LeaveRequests';
import SalaryOverview from './pages/hr/SalaryOverview';
import HrReports from './pages/hr/HrReports';
import HrMeetings from './pages/hr/HrMeetings';
import HrNotifications from './pages/hr/HrNotifications';

// ============================================================
// FINANCE PAGES
// ============================================================
import FinanceHome from './pages/finance/FinanceHome';
import FinanceDashboard from './pages/finance/FinanceDashboard';
import FeeCollection from './pages/finance/FeeCollection';
import FeeDefaulters from './pages/finance/FeeDefaulters';
import Expenses from './pages/finance/Expenses';
import Payments from './pages/finance/Payments';
import FinanceReports from './pages/finance/FinanceReports';
import FinanceMeetings from './pages/finance/FinanceMeetings';
import FinanceNotifications from './pages/finance/FinanceNotifications';

// ============================================================
// IT SUPPORT PAGES
// ============================================================
import ITHome from './pages/it/ITHome';
import ITDashboard from './pages/it/ITDashboard';
import ITTickets from './pages/it/ITTickets';
import ITInventory from './pages/it/ITInventory';
import ITMaintenance from './pages/it/ITMaintenance';
import ITReports from './pages/it/ITReports';
import ITNotifications from './pages/it/ITNotifications';
import ITStaff from './pages/it/ITStaff';
import ITSettings from './pages/it/ITSettings';

// ============================================================
// ADMISSIONS PAGES
// ============================================================
import AdmissionsHome from './pages/admissions/AdmissionsHome';
import AdmissionsDashboard from './pages/admissions/AdmissionsDashboard';
import NewRegistration from './pages/admissions/NewRegistration';
import Applications from './pages/admissions/Applications';
import EnrollmentList from './pages/admissions/EnrollmentList';
import EnrollmentStats from './pages/admissions/EnrollmentStats';
import CampusTours from './pages/admissions/CampusTours';
import AdmissionsReports from './pages/admissions/AdmissionsReports';
import AdmissionsNotifications from './pages/admissions/AdmissionsNotifications';
import AdmissionsStaff from './pages/admissions/AdmissionsStaff';
import AdmissionsSettings from './pages/admissions/AdmissionsSettings';

// ============================================================
// RECEPTION PAGES
// ============================================================
import ReceptionHome from './pages/reception/ReceptionHome';
import ReceptionDashboard from './pages/reception/ReceptionDashboard';
import StudentCheckIn from './pages/reception/StudentCheckIn';
import VisitorLog from './pages/reception/VisitorLog';
import ContactDirectory from './pages/reception/ContactDirectory';
import ReceptionMeetings from './pages/reception/ReceptionMeetings';
import DailyReport from './pages/reception/DailyReport';
import ReceptionNotifications from './pages/reception/ReceptionNotifications';

// ============================================================
// LIBRARY PAGES
// ============================================================
import LibraryHome from './pages/library/LibraryHome';
import LibraryDashboard from './pages/library/LibraryDashboard';
import BookCatalog from './pages/library/BookCatalog';
import CheckoutReturn from './pages/library/CheckoutReturn';
import OverdueBooks from './pages/library/OverdueBooks';
import LibraryStats from './pages/library/LibraryStats';
import LibraryReports from './pages/library/LibraryReports';
import LibraryNotifications from './pages/library/LibraryNotifications';

// ============================================================
// COUNSELLOR PAGES
// ============================================================
import CounsellorHome from './pages/counsellor/CounsellorHome';
import CounsellorDashboard from './pages/counsellor/CounsellorDashboard';
import StudentCases from './pages/counsellor/StudentCases';
import SessionLog from './pages/counsellor/SessionLog';
import CounsellorAtRiskStudents from './pages/counsellor/AtRiskStudents';
import ParentMeetings from './pages/counsellor/ParentMeetings';
import CounsellorReports from './pages/counsellor/CounsellorReports';
import CounsellorNotifications from './pages/counsellor/CounsellorNotifications';

// ============================================================
// SECRETARY PAGES
// ============================================================
import SecretaryHome from './pages/secretary/SecretaryHome';
import SecretaryDashboard from './pages/secretary/SecretaryDashboard';
import DirectorsCalendar from './pages/secretary/DirectorsCalendar';
import Correspondence from './pages/secretary/Correspondence';
import MeetingMinutes from './pages/secretary/MeetingMinutes';
import TaskTracker from './pages/secretary/TaskTracker';
import SecretaryNotifications from './pages/secretary/SecretaryNotifications';

// ============================================================
// TEACHER PAGES
// ============================================================
import TeacherHome from './pages/teacher/TeacherHome';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LessonPlans from './pages/teacher/LessonPlans';
import MySchedule from './pages/teacher/MySchedule';
import Attendance from './pages/teacher/Attendance';
import ScoreEntry from './pages/teacher/ScoreEntry';
import Homework from './pages/teacher/Homework';
import TeacherAtRiskStudents from './pages/teacher/AtRiskStudents';
import Messages from './pages/teacher/Messages';
import TeacherReports from './pages/teacher/Reports';
import Notifications from './pages/teacher/Notifications';

// ============================================================
// STUDENT PAGES
// ============================================================
import StudentHome from './pages/student/StudentHome';
import StudentDashboard from './pages/student/StudentDashboard';
import MyScores from './pages/student/MyScores';
import MyAttendance from './pages/student/MyAttendance';
import StudentHomework from './pages/student/Homework';
import StudentCalendar from './pages/student/Calendar';
import Gallery from './pages/student/Gallery';
import StudentReports from './pages/student/Reports';
import StudentNotifications from './pages/student/Notifications';

// ============================================================
// PARENT PAGES
// ============================================================
import ParentHome from './pages/parent/ParentHome';
import ParentDashboard from './pages/parent/ParentDashboard';
import MyChildren from './pages/parent/MyChildren';
import ParentScores from './pages/parent/Scores';
import ParentAttendance from './pages/parent/Attendance';
import ParentHomework from './pages/parent/Homework';
import Fees from './pages/parent/Fees';
import ParentMessages from './pages/parent/Messages';
import ParentReports from './pages/parent/Reports';
import Events from './pages/parent/Events';
import ParentNotifications from './pages/parent/Notifications';

// ============================================================
// 404 PAGE
// ============================================================
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md">
        <div className="text-7xl mb-4">🔍</div>
        <h1 className="text-6xl font-bold text-blue-900">404</h1>
        <p className="text-xl text-gray-600 mt-2">Page Not Found</p>
        <p className="text-sm text-gray-400 mt-2">The page you're looking for doesn't exist.</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          Go Home
        </a>
      </div>
    </div>
  );
}

// ============================================================
// ✅ FIXED: Helper - Map role to dashboard path
// ============================================================
function getDashboardPath(role) {
  const roleMap = {
    'director': 'director',
    'top-manager': 'top-manager',
    'manager': 'manager',
    'staff': 'staff',
    'hr': 'hr',
    'finance': 'finance',
    'it': 'it',
    'admissions': 'admissions',
    'reception': 'reception',
    'library': 'library',
    'counsellor': 'counsellor',
    'secretary': 'secretary',
    'teacher': 'teacher',
    'student': 'student',
    'parent': 'parent',
  };
  return roleMap[role] || role;
}

// ============================================================
// ✅ FIXED: PROTECTED ROUTE
// ============================================================
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    const path = location.pathname;
    const roleMap = {
      '/teacher': 'teacher',
      '/student': 'student',
      '/parent': 'parent',
      '/library': 'library',
      '/counsellor': 'counsellor',
      '/secretary': 'secretary',
      '/admissions': 'admissions',
      '/reception': 'reception',
      '/hr': 'hr',
      '/finance': 'finance',
      '/it': 'it',
      '/staff': 'staff',
      '/manager': 'manager',
      '/top-manager': 'top-manager',
      '/director': 'director',
    };
    
    let matchedRole = 'director';
    for (const [route, role] of Object.entries(roleMap)) {
      if (path.startsWith(route)) {
        matchedRole = role;
        break;
      }
    }
    return <Navigate to={`/login/${matchedRole}`} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to={`/${getDashboardPath(user.role)}`} replace />;
    }
  }

  return children;
}

// ============================================================
// ✅ FIXED: ROLE-BASED LAYOUT
// ============================================================
function RoleBasedLayout({ children }) {
  const { user } = useAuth();

  if (user?.role === 'director') return <DirectorLayout>{children}</DirectorLayout>;
  if (user?.role === 'top-manager') return <TopManagerLayout>{children}</TopManagerLayout>;
  if (user?.role === 'manager') return <ManagerLayout>{children}</ManagerLayout>;
  if (user?.role === 'staff') return <StaffLayout>{children}</StaffLayout>;
  if (user?.role === 'teacher') return <TeacherLayout>{children}</TeacherLayout>;
  if (user?.role === 'student') return <StudentLayout>{children}</StudentLayout>;
  if (user?.role === 'parent') return <ParentLayout>{children}</ParentLayout>;
  return <ProtectedLayout>{children}</ProtectedLayout>;
}

// ============================================================
// APP ROUTES - ALL 15 ROLES WORKING
// ============================================================
function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* ============================================================
          LOGIN ROUTES
          ============================================================ */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/:role" element={<Login />} />

      {/* ============================================================
          DASHBOARD ROUTES
          ============================================================ */}
      
      {/* DIRECTOR */}
      <Route path="/director" element={
        <ProtectedRoute allowedRoles={['director']}>
          <RoleBasedLayout><DirectorHome /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/director/dashboard" element={
        <ProtectedRoute allowedRoles={['director']}>
          <RoleBasedLayout><DirectorDashboard /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/director/users" element={
        <ProtectedRoute allowedRoles={['director']}>
          <RoleBasedLayout><UserManagement /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/director/roles" element={
        <ProtectedRoute allowedRoles={['director']}>
          <RoleBasedLayout><Roles /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/director/goals" element={
        <ProtectedRoute allowedRoles={['director']}>
          <RoleBasedLayout><Goals /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/director/tasks" element={
        <ProtectedRoute allowedRoles={['director']}>
          <RoleBasedLayout><Tasks /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/director/meetings" element={
        <ProtectedRoute allowedRoles={['director']}>
          <RoleBasedLayout><Meetings /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/director/bills" element={
        <ProtectedRoute allowedRoles={['director']}>
          <RoleBasedLayout><Bills /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/director/reports" element={
        <ProtectedRoute allowedRoles={['director']}>
          <RoleBasedLayout><DirectorReports /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/director/logs" element={
        <ProtectedRoute allowedRoles={['director']}>
          <RoleBasedLayout><Logs /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/director/settings" element={
        <ProtectedRoute allowedRoles={['director']}>
          <RoleBasedLayout><Settings /></RoleBasedLayout>
        </ProtectedRoute>
      } />

      {/* TOP MANAGER */}
      <Route path="/top-manager" element={
        <ProtectedRoute allowedRoles={['top-manager']}>
          <RoleBasedLayout><TopManagerHome /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/top-manager/dashboard" element={
        <ProtectedRoute allowedRoles={['top-manager']}>
          <RoleBasedLayout><TopManagerDashboard /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/top-manager/score-management" element={
        <ProtectedRoute allowedRoles={['top-manager']}>
          <RoleBasedLayout><TopManagerScoreManagement /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/top-manager/managers" element={
        <ProtectedRoute allowedRoles={['top-manager']}>
          <RoleBasedLayout><Managers /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/top-manager/reviews" element={
        <ProtectedRoute allowedRoles={['top-manager']}>
          <RoleBasedLayout><PendingReviews /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/top-manager/tasks" element={
        <ProtectedRoute allowedRoles={['top-manager']}>
          <RoleBasedLayout><TaskAssignments /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/top-manager/meetings" element={
        <ProtectedRoute allowedRoles={['top-manager']}>
          <RoleBasedLayout><TopManagerMeetings /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/top-manager/reports" element={
        <ProtectedRoute allowedRoles={['top-manager']}>
          <RoleBasedLayout><ReportsToDirector /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/top-manager/enrollment" element={
        <ProtectedRoute allowedRoles={['top-manager']}>
          <RoleBasedLayout><Enrollment /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/top-manager/academic" element={
        <ProtectedRoute allowedRoles={['top-manager']}>
          <RoleBasedLayout><Academic /></RoleBasedLayout>
        </ProtectedRoute>
      } />

      {/* MANAGER */}
      <Route path="/manager" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <RoleBasedLayout><ManagerHome /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/dashboard" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <RoleBasedLayout><ManagerDashboard /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/team" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <RoleBasedLayout><MyTeam /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/leaves" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <RoleBasedLayout><LeaveRequests /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/hiring" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <RoleBasedLayout><HiringRequests /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/proposals" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <RoleBasedLayout><Proposals /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/staff-reports" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <RoleBasedLayout><StaffReports /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/meetings" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <RoleBasedLayout><Placeholder title="Meetings" /></RoleBasedLayout>
        </ProtectedRoute>
      } />
      <Route path="/manager/reports" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <RoleBasedLayout><MyReports /></RoleBasedLayout>
        </ProtectedRoute>
      } />

      {/* STAFF */}
      <Route path="/staff" element={
        <ProtectedRoute allowedRoles={['staff']}>
          <StaffLayout><StaffHome /></StaffLayout>
        </ProtectedRoute>
      } />
      <Route path="/staff/dashboard" element={
        <ProtectedRoute allowedRoles={['staff']}>
          <StaffLayout><StaffDashboard /></StaffLayout>
        </ProtectedRoute>
      } />
      <Route path="/staff/tasks" element={
        <ProtectedRoute allowedRoles={['staff']}>
          <StaffLayout><StaffTasks /></StaffLayout>
        </ProtectedRoute>
      } />
      <Route path="/staff/schedule" element={
        <ProtectedRoute allowedRoles={['staff']}>
          <StaffLayout><StaffSchedule /></StaffLayout>
        </ProtectedRoute>
      } />
      <Route path="/staff/meetings" element={
        <ProtectedRoute allowedRoles={['staff']}>
          <StaffLayout><StaffMeetings /></StaffLayout>
        </ProtectedRoute>
      } />
      <Route path="/staff/leaves" element={
        <ProtectedRoute allowedRoles={['staff']}>
          <StaffLayout><StaffLeaves /></StaffLayout>
        </ProtectedRoute>
      } />
      <Route path="/staff/payments" element={
        <ProtectedRoute allowedRoles={['staff']}>
          <StaffLayout><StaffPayments /></StaffLayout>
        </ProtectedRoute>
      } />
      <Route path="/staff/notifications" element={
        <ProtectedRoute allowedRoles={['staff']}>
          <StaffLayout><StaffNotifications /></StaffLayout>
        </ProtectedRoute>
      } />
      <Route path="/staff/reports" element={
        <ProtectedRoute allowedRoles={['staff']}>
          <StaffLayout><StaffReportsPage /></StaffLayout>
        </ProtectedRoute>
      } />
      <Route path="/staff/attendance" element={
        <ProtectedRoute allowedRoles={['staff']}>
          <StaffLayout><StaffAttendance /></StaffLayout>
        </ProtectedRoute>
      } />

      {/* HR */}
      <Route path="/hr" element={
        <ProtectedRoute allowedRoles={['hr']}>
          <OfficeLayout role="hr"><HrHome /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/hr/dashboard" element={
        <ProtectedRoute allowedRoles={['hr']}>
          <OfficeLayout role="hr"><HRDashboard /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/hr/staff" element={
        <ProtectedRoute allowedRoles={['hr']}>
          <OfficeLayout role="hr"><StaffManagement /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/hr/positions" element={
        <ProtectedRoute allowedRoles={['hr']}>
          <OfficeLayout role="hr"><PositionManager /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/hr/temp-roles" element={
        <ProtectedRoute allowedRoles={['hr']}>
          <OfficeLayout role="hr"><TempRoles /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/hr/leaves" element={
        <ProtectedRoute allowedRoles={['hr']}>
          <OfficeLayout role="hr"><HRLeaveRequests /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/hr/salary" element={
        <ProtectedRoute allowedRoles={['hr']}>
          <OfficeLayout role="hr"><SalaryOverview /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/hr/reports" element={
        <ProtectedRoute allowedRoles={['hr']}>
          <OfficeLayout role="hr"><HrReports /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/hr/meetings" element={
        <ProtectedRoute allowedRoles={['hr']}>
          <OfficeLayout role="hr"><HrMeetings /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/hr/notifications" element={
        <ProtectedRoute allowedRoles={['hr']}>
          <OfficeLayout role="hr"><HrNotifications /></OfficeLayout>
        </ProtectedRoute>
      } />

      {/* FINANCE */}
      <Route path="/finance" element={
        <ProtectedRoute allowedRoles={['finance']}>
          <OfficeLayout role="finance"><FinanceHome /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/finance/dashboard" element={
        <ProtectedRoute allowedRoles={['finance']}>
          <OfficeLayout role="finance"><FinanceDashboard /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/finance/fees" element={
        <ProtectedRoute allowedRoles={['finance']}>
          <OfficeLayout role="finance"><FeeCollection /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/finance/defaulters" element={
        <ProtectedRoute allowedRoles={['finance']}>
          <OfficeLayout role="finance"><FeeDefaulters /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/finance/expenses" element={
        <ProtectedRoute allowedRoles={['finance']}>
          <OfficeLayout role="finance"><Expenses /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/finance/payments" element={
        <ProtectedRoute allowedRoles={['finance']}>
          <OfficeLayout role="finance"><Payments /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/finance/reports" element={
        <ProtectedRoute allowedRoles={['finance']}>
          <OfficeLayout role="finance"><FinanceReports /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/finance/meetings" element={
        <ProtectedRoute allowedRoles={['finance']}>
          <OfficeLayout role="finance"><FinanceMeetings /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/finance/notifications" element={
        <ProtectedRoute allowedRoles={['finance']}>
          <OfficeLayout role="finance"><FinanceNotifications /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/finance/staff" element={
        <ProtectedRoute allowedRoles={['finance']}>
          <OfficeLayout role="finance"><Placeholder title="Finance Staff" /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/finance/settings" element={
        <ProtectedRoute allowedRoles={['finance']}>
          <OfficeLayout role="finance"><Placeholder title="Finance Settings" /></OfficeLayout>
        </ProtectedRoute>
      } />

      {/* IT */}
      <Route path="/it" element={
        <ProtectedRoute allowedRoles={['it']}>
          <OfficeLayout role="it"><ITHome /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/it/dashboard" element={
        <ProtectedRoute allowedRoles={['it']}>
          <OfficeLayout role="it"><ITDashboard /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/it/tickets" element={
        <ProtectedRoute allowedRoles={['it']}>
          <OfficeLayout role="it"><ITTickets /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/it/inventory" element={
        <ProtectedRoute allowedRoles={['it']}>
          <OfficeLayout role="it"><ITInventory /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/it/maintenance" element={
        <ProtectedRoute allowedRoles={['it']}>
          <OfficeLayout role="it"><ITMaintenance /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/it/reports" element={
        <ProtectedRoute allowedRoles={['it']}>
          <OfficeLayout role="it"><ITReports /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/it/notifications" element={
        <ProtectedRoute allowedRoles={['it']}>
          <OfficeLayout role="it"><ITNotifications /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/it/staff" element={
        <ProtectedRoute allowedRoles={['it']}>
          <OfficeLayout role="it"><ITStaff /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/it/settings" element={
        <ProtectedRoute allowedRoles={['it']}>
          <OfficeLayout role="it"><ITSettings /></OfficeLayout>
        </ProtectedRoute>
      } />

      {/* ADMISSIONS */}
      <Route path="/admissions" element={
        <ProtectedRoute allowedRoles={['admissions']}>
          <OfficeLayout role="admissions"><AdmissionsHome /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/admissions/dashboard" element={
        <ProtectedRoute allowedRoles={['admissions']}>
          <OfficeLayout role="admissions"><AdmissionsDashboard /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/admissions/register" element={
        <ProtectedRoute allowedRoles={['admissions']}>
          <OfficeLayout role="admissions"><NewRegistration /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/admissions/applications" element={
        <ProtectedRoute allowedRoles={['admissions']}>
          <OfficeLayout role="admissions"><Applications /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/admissions/enrollment" element={
        <ProtectedRoute allowedRoles={['admissions']}>
          <OfficeLayout role="admissions"><EnrollmentList /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/admissions/stats" element={
        <ProtectedRoute allowedRoles={['admissions']}>
          <OfficeLayout role="admissions"><EnrollmentStats /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/admissions/tours" element={
        <ProtectedRoute allowedRoles={['admissions']}>
          <OfficeLayout role="admissions"><CampusTours /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/admissions/reports" element={
        <ProtectedRoute allowedRoles={['admissions']}>
          <OfficeLayout role="admissions"><AdmissionsReports /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/admissions/notifications" element={
        <ProtectedRoute allowedRoles={['admissions']}>
          <OfficeLayout role="admissions"><AdmissionsNotifications /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/admissions/staff" element={
        <ProtectedRoute allowedRoles={['admissions']}>
          <OfficeLayout role="admissions"><AdmissionsStaff /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/admissions/settings" element={
        <ProtectedRoute allowedRoles={['admissions']}>
          <OfficeLayout role="admissions"><AdmissionsSettings /></OfficeLayout>
        </ProtectedRoute>
      } />

      {/* RECEPTION */}
      <Route path="/reception" element={
        <ProtectedRoute allowedRoles={['reception']}>
          <OfficeLayout role="reception"><ReceptionHome /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/reception/dashboard" element={
        <ProtectedRoute allowedRoles={['reception']}>
          <OfficeLayout role="reception"><ReceptionDashboard /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/reception/checkin" element={
        <ProtectedRoute allowedRoles={['reception']}>
          <OfficeLayout role="reception"><StudentCheckIn /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/reception/visitors" element={
        <ProtectedRoute allowedRoles={['reception']}>
          <OfficeLayout role="reception"><VisitorLog /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/reception/contacts" element={
        <ProtectedRoute allowedRoles={['reception']}>
          <OfficeLayout role="reception"><ContactDirectory /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/reception/meetings" element={
        <ProtectedRoute allowedRoles={['reception']}>
          <OfficeLayout role="reception"><ReceptionMeetings /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/reception/report" element={
        <ProtectedRoute allowedRoles={['reception']}>
          <OfficeLayout role="reception"><DailyReport /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/reception/notifications" element={
        <ProtectedRoute allowedRoles={['reception']}>
          <OfficeLayout role="reception"><ReceptionNotifications /></OfficeLayout>
        </ProtectedRoute>
      } />

      {/* LIBRARY */}
      <Route path="/library" element={
        <ProtectedRoute allowedRoles={['library']}>
          <OfficeLayout role="library"><LibraryHome /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/library/dashboard" element={
        <ProtectedRoute allowedRoles={['library']}>
          <OfficeLayout role="library"><LibraryDashboard /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/library/catalog" element={
        <ProtectedRoute allowedRoles={['library']}>
          <OfficeLayout role="library"><BookCatalog /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/library/checkout" element={
        <ProtectedRoute allowedRoles={['library']}>
          <OfficeLayout role="library"><CheckoutReturn /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/library/overdue" element={
        <ProtectedRoute allowedRoles={['library']}>
          <OfficeLayout role="library"><OverdueBooks /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/library/stats" element={
        <ProtectedRoute allowedRoles={['library']}>
          <OfficeLayout role="library"><LibraryStats /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/library/reports" element={
        <ProtectedRoute allowedRoles={['library']}>
          <OfficeLayout role="library"><LibraryReports /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/library/notifications" element={
        <ProtectedRoute allowedRoles={['library']}>
          <OfficeLayout role="library"><LibraryNotifications /></OfficeLayout>
        </ProtectedRoute>
      } />

      {/* COUNSELLOR */}
      <Route path="/counsellor" element={
        <ProtectedRoute allowedRoles={['counsellor']}>
          <OfficeLayout role="counsellor"><CounsellorHome /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/counsellor/dashboard" element={
        <ProtectedRoute allowedRoles={['counsellor']}>
          <OfficeLayout role="counsellor"><CounsellorDashboard /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/counsellor/cases" element={
        <ProtectedRoute allowedRoles={['counsellor']}>
          <OfficeLayout role="counsellor"><StudentCases /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/counsellor/sessions" element={
        <ProtectedRoute allowedRoles={['counsellor']}>
          <OfficeLayout role="counsellor"><SessionLog /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/counsellor/at-risk" element={
        <ProtectedRoute allowedRoles={['counsellor']}>
          <OfficeLayout role="counsellor"><CounsellorAtRiskStudents /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/counsellor/meetings" element={
        <ProtectedRoute allowedRoles={['counsellor']}>
          <OfficeLayout role="counsellor"><ParentMeetings /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/counsellor/reports" element={
        <ProtectedRoute allowedRoles={['counsellor']}>
          <OfficeLayout role="counsellor"><CounsellorReports /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/counsellor/notifications" element={
        <ProtectedRoute allowedRoles={['counsellor']}>
          <OfficeLayout role="counsellor"><CounsellorNotifications /></OfficeLayout>
        </ProtectedRoute>
      } />

      {/* SECRETARY */}
      <Route path="/secretary" element={
        <ProtectedRoute allowedRoles={['secretary']}>
          <OfficeLayout role="secretary"><SecretaryHome /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/secretary/dashboard" element={
        <ProtectedRoute allowedRoles={['secretary']}>
          <OfficeLayout role="secretary"><SecretaryDashboard /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/secretary/calendar" element={
        <ProtectedRoute allowedRoles={['secretary']}>
          <OfficeLayout role="secretary"><DirectorsCalendar /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/secretary/correspondence" element={
        <ProtectedRoute allowedRoles={['secretary']}>
          <OfficeLayout role="secretary"><Correspondence /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/secretary/minutes" element={
        <ProtectedRoute allowedRoles={['secretary']}>
          <OfficeLayout role="secretary"><MeetingMinutes /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/secretary/tasks" element={
        <ProtectedRoute allowedRoles={['secretary']}>
          <OfficeLayout role="secretary"><TaskTracker /></OfficeLayout>
        </ProtectedRoute>
      } />
      <Route path="/secretary/notifications" element={
        <ProtectedRoute allowedRoles={['secretary']}>
          <OfficeLayout role="secretary"><SecretaryNotifications /></OfficeLayout>
        </ProtectedRoute>
      } />

      {/* TEACHER */}
      <Route path="/teacher" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout><TeacherHome /></TeacherLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/dashboard" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout><TeacherDashboard /></TeacherLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/plans" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout><LessonPlans /></TeacherLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/schedule" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout><MySchedule /></TeacherLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/attendance" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout><Attendance /></TeacherLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/scores" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout><ScoreEntry /></TeacherLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/homework" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout><Homework /></TeacherLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/at-risk" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout><TeacherAtRiskStudents /></TeacherLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/messages" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout><Messages /></TeacherLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/reports" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout><TeacherReports /></TeacherLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/notifications" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout><Notifications /></TeacherLayout>
        </ProtectedRoute>
      } />

      {/* STUDENT */}
      <Route path="/student" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentLayout><StudentHome /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/dashboard" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentLayout><StudentDashboard /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/scores" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentLayout><MyScores /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/attendance" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentLayout><MyAttendance /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/homework" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentLayout><StudentHomework /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/calendar" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentLayout><StudentCalendar /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/gallery" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentLayout><Gallery /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/reports" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentLayout><StudentReports /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/notifications" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentLayout><StudentNotifications /></StudentLayout>
        </ProtectedRoute>
      } />

      {/* PARENT */}
      <Route path="/parent" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentLayout><ParentHome /></ParentLayout>
        </ProtectedRoute>
      } />
      <Route path="/parent/dashboard" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentLayout><ParentDashboard /></ParentLayout>
        </ProtectedRoute>
      } />
      <Route path="/parent/children" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentLayout><MyChildren /></ParentLayout>
        </ProtectedRoute>
      } />
      <Route path="/parent/scores" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentLayout><ParentScores /></ParentLayout>
        </ProtectedRoute>
      } />
      <Route path="/parent/attendance" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentLayout><ParentAttendance /></ParentLayout>
        </ProtectedRoute>
      } />
      <Route path="/parent/homework" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentLayout><ParentHomework /></ParentLayout>
        </ProtectedRoute>
      } />
      <Route path="/parent/fees" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentLayout><Fees /></ParentLayout>
        </ProtectedRoute>
      } />
      <Route path="/parent/messages" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentLayout><ParentMessages /></ParentLayout>
        </ProtectedRoute>
      } />
      <Route path="/parent/reports" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentLayout><ParentReports /></ParentLayout>
        </ProtectedRoute>
      } />
      <Route path="/parent/events" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentLayout><Events /></ParentLayout>
        </ProtectedRoute>
      } />
      <Route path="/parent/notifications" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentLayout><ParentNotifications /></ParentLayout>
        </ProtectedRoute>
      } />

      {/* ============================================================
          404 - MUST BE LAST
          ============================================================ */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// ============================================================
// APP
// ============================================================
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;