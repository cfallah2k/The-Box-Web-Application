import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { PWAProvider } from './contexts/PWAContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';

// Layout Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';

// Pages
import AITutorPage from './pages/AITutorPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import CertificateVerificationPage from './pages/CertificateVerificationPage';
import CohortDetailPage from './pages/CohortDetailPage';
import CohortPage from './pages/CohortPage';
import CommunityPage from './pages/CommunityPage';
import CompanyPage from './pages/CompanyPage';
import CookiesPage from './pages/CookiesPage';
import CourseCheckPage from './pages/CourseCheckPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CoursesPage from './pages/CoursesPage';
import DMCAPolicyPage from './pages/DMCAPolicyPage';
import DashboardPage from './pages/DashboardPage';
import EnterpriseDashboardPage from './pages/EnterpriseDashboardPage';
import FeaturesPage from './pages/FeaturesPage';
import GalleryPage from './pages/GalleryPage';
import HomePage from './pages/HomePage';
import InstructorCohortPage from './pages/InstructorCohortPage';
import InstructorDashboardPage from './pages/InstructorDashboardPage';
import LegalPage from './pages/LegalPage';
import LoginPage from './pages/LoginPage';
import MarketplacePage from './pages/MarketplacePage';
import NewsPage from './pages/NewsPage';
import NotFoundPage from './pages/NotFoundPage';
import PressPage from './pages/PressPage';
import PricingPage from './pages/PricingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ProfilePage from './pages/ProfilePage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import ResearchLabPage from './pages/ResearchLabPage';
import SignupPage from './pages/SignupPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

// Instructor Pages
import CertificateGeneratorPage from './pages/instructor/CertificateGeneratorPage';
import InstructorAnalyticsPage from './pages/instructor/AnalyticsPage';
import ContactInstructorPage from './pages/instructor/ContactInstructorPage';
import CreateCoursePage from './pages/instructor/CreateCoursePage';
import GradeAssignmentsPage from './pages/instructor/GradeAssignmentsPage';
import ScheduleSessionPage from './pages/instructor/ScheduleSessionPage';
import StartLiveSessionPage from './pages/instructor/StartLiveSessionPage';
import ViewCourseDetailsPage from './pages/instructor/ViewCourseDetailsPage';
import ViewStudentsPage from './pages/instructor/ViewStudentsPage';

// AI Pages
import AIStudyAssistantPage from './pages/ai/AIStudyAssistantPage';
import AITutorPageNew from './pages/ai/AITutorPage';
import AIVoiceCommandsPage from './pages/ai/AIVoiceCommandsPage';
import CodeReviewPage from './pages/ai/CodeReviewPage';
import ResearchAssistantPage from './pages/ai/ResearchAssistantPage';
import ContentCreatorPage from './pages/ai/ContentCreatorPage';
import LearningPathGeneratorPage from './pages/ai/LearningPathGeneratorPage';

// Student Pages
import AchievementsPage from './pages/student/AchievementsPage';
import AssignmentsPage from './pages/student/AssignmentsPage';
import CalendarPage from './pages/student/CalendarPage';
import CertificatesPage from './pages/student/CertificatesPage';
import MyCoursesPage from './pages/student/MyCoursesPage';
import ProgressPage from './pages/student/ProgressPage';
import QuizzesPage from './pages/student/QuizzesPage';
import StudyGroupsPage from './pages/student/StudyGroupsPage';
import WishlistPage from './pages/student/WishlistPage';

// Admin Pages
import CertificateManagementPage from './pages/admin/CertificateManagementPage';
import AdvancedAnalyticsPage from './pages/admin/AdvancedAnalyticsPage';
import CourseManagementPage from './pages/admin/CourseManagementPage';
import UserManagementPage from './pages/admin/UserManagementPage';

// Enterprise Pages
import LearningAnalyticsPage from './pages/enterprise/LearningAnalyticsPage';
import TeamManagementPage from './pages/enterprise/TeamManagementPage';

// Components
import NotificationSettings from './components/ui/NotificationSettings';
import OfflineStatus from './components/ui/OfflineStatus';
import PWAInstallPrompt from './components/ui/PWAInstallPrompt';
import PWAUpdateNotification from './components/ui/PWAUpdateNotification';
import ToastContainer from './components/ui/ToastContainer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="spinner w-full h-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">The Box</h2>
          <p className="text-white/80">Loading your learning experience...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <PWAProvider>
        <AuthProvider>
          <LoadingProvider>
            <ToastProvider>
              <div className="App">
                <OfflineStatus />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />

                    {/* Protected Routes */}
                    <Route
                      path="dashboard"
                      element={
                        <ProtectedRoute>
                          <DashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="instructor-dashboard"
                      element={
                        <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                          <InstructorDashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="admin-dashboard"
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <AdminDashboardPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Routes */}
                    <Route
                      path="admin/users"
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <UserManagementPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="admin/courses"
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <CourseManagementPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="admin/certificates"
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <CertificateManagementPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="admin/analytics"
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <AdvancedAnalyticsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="enterprise-dashboard"
                      element={
                        <ProtectedRoute allowedRoles={['enterprise', 'admin']}>
                          <EnterpriseDashboardPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Enterprise Routes */}
                    <Route
                      path="enterprise/team"
                      element={
                        <ProtectedRoute allowedRoles={['enterprise', 'admin']}>
                          <TeamManagementPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="enterprise/analytics"
                      element={
                        <ProtectedRoute allowedRoles={['enterprise', 'admin']}>
                          <LearningAnalyticsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="courses"
                      element={
                        <ProtectedRoute>
                          <CoursesPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="courses/:id"
                      element={
                        <ProtectedRoute>
                          <CourseDetailPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="ai-tutor"
                      element={
                        <ProtectedRoute>
                          <AITutorPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* AI Routes */}
                    <Route
                      path="ai/tutor"
                      element={
                        <ProtectedRoute>
                          <AITutorPageNew />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="ai/study-assistant"
                      element={
                        <ProtectedRoute>
                          <AIStudyAssistantPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="ai/voice-commands"
                      element={
                        <ProtectedRoute>
                          <AIVoiceCommandsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="ai/code-review"
                      element={
                        <ProtectedRoute>
                          <CodeReviewPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="ai/research-assistant"
                      element={
                        <ProtectedRoute>
                          <ResearchAssistantPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="ai/content-creator"
                      element={
                        <ProtectedRoute>
                          <ContentCreatorPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="ai/learning-path-generator"
                      element={
                        <ProtectedRoute>
                          <LearningPathGeneratorPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="profile"
                      element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Student Routes */}
                    <Route
                      path="my-courses"
                      element={
                        <ProtectedRoute>
                          <MyCoursesPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="certificates"
                      element={
                        <ProtectedRoute>
                          <CertificatesPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="study-groups"
                      element={
                        <ProtectedRoute>
                          <StudyGroupsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="progress"
                      element={
                        <ProtectedRoute>
                          <ProgressPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="wishlist"
                      element={
                        <ProtectedRoute>
                          <WishlistPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="assignments"
                      element={
                        <ProtectedRoute>
                          <AssignmentsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="quizzes"
                      element={
                        <ProtectedRoute>
                          <QuizzesPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="calendar"
                      element={
                        <ProtectedRoute>
                          <CalendarPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="achievements"
                      element={
                        <ProtectedRoute>
                          <AchievementsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="course-check"
                      element={
                        <ProtectedRoute>
                          <CourseCheckPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="cohorts"
                      element={
                        <ProtectedRoute>
                          <CohortPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="cohorts/:id"
                      element={
                        <ProtectedRoute>
                          <CohortDetailPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="instructor-cohorts"
                      element={
                        <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                          <InstructorCohortPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Instructor Routes */}
                    <Route
                      path="instructor/create-course"
                      element={
                        <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                          <CreateCoursePage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="instructor/start-session"
                      element={
                        <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                          <StartLiveSessionPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="instructor/contact-instructor"
                      element={
                        <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                          <ContactInstructorPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="instructor/course/:courseId"
                      element={
                        <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                          <ViewCourseDetailsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="instructor/students"
                      element={
                        <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                          <ViewStudentsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="instructor/schedule-session"
                      element={
                        <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                          <ScheduleSessionPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="instructor/grade-assignments"
                      element={
                        <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                          <GradeAssignmentsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="instructor/analytics"
                      element={
                        <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                          <InstructorAnalyticsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="instructor/certificate-generator"
                      element={
                        <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                          <CertificateGeneratorPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="analytics"
                      element={
                        <ProtectedRoute>
                          <AnalyticsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="marketplace"
                      element={
                        <ProtectedRoute>
                          <MarketplacePage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="research-lab"
                      element={
                        <ProtectedRoute>
                          <ResearchLabPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="gallery"
                      element={
                        <ProtectedRoute>
                          <GalleryPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="news" element={<NewsPage />} />
                    <Route path="cookies" element={<CookiesPage />} />

                    {/* Legal Policy Routes */}
                    <Route
                      path="privacy-policy"
                      element={<PrivacyPolicyPage />}
                    />
                    <Route
                      path="terms-of-service"
                      element={<TermsOfServicePage />}
                    />
                    <Route
                      path="refund-policy"
                      element={<RefundPolicyPage />}
                    />
                    <Route path="dmca-policy" element={<DMCAPolicyPage />} />
                    <Route path="legal" element={<LegalPage />} />

                    {/* Public Routes */}
                    <Route path="blog" element={<BlogPage />} />
                    <Route path="community" element={<CommunityPage />} />
                    <Route path="pricing" element={<PricingPage />} />
                    <Route path="features" element={<FeaturesPage />} />
                    <Route path="company" element={<CompanyPage />} />
                    <Route path="careers" element={<CareersPage />} />
                    <Route path="press" element={<PressPage />} />
                    <Route path="verify-certificate" element={<CertificateVerificationPage />} />

                    {/* 404 Route */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>

                {/* Global Components */}
                <ToastContainer />
                <PWAInstallPrompt />
                <PWAUpdateNotification />
                <NotificationSettings
                  isOpen={showNotificationSettings}
                  onClose={() => setShowNotificationSettings(false)}
                />
              </div>
            </ToastProvider>
          </LoadingProvider>
        </AuthProvider>
      </PWAProvider>
    </ThemeProvider>
  );
}

export default App;
