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
import CohortDetailPage from './pages/CohortDetailPage';
import CohortPage from './pages/CohortPage';
import CommunityPage from './pages/CommunityPage';
import CookiesPage from './pages/CookiesPage';
import CourseCheckPage from './pages/CourseCheckPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CoursesPage from './pages/CoursesPage';
import DMCAPolicyPage from './pages/DMCAPolicyPage';
import DashboardPage from './pages/DashboardPage';
import EnterpriseDashboardPage from './pages/EnterpriseDashboardPage';
import GalleryPage from './pages/GalleryPage';
import HomePage from './pages/HomePage';
import InstructorCohortPage from './pages/InstructorCohortPage';
import InstructorDashboardPage from './pages/InstructorDashboardPage';
import LegalPage from './pages/LegalPage';
import LoginPage from './pages/LoginPage';
import MarketplacePage from './pages/MarketplacePage';
import NewsPage from './pages/NewsPage';
import NotFoundPage from './pages/NotFoundPage';
import PricingPage from './pages/PricingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ProfilePage from './pages/ProfilePage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import ResearchLabPage from './pages/ResearchLabPage';
import SignupPage from './pages/SignupPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import FeaturesPage from './pages/FeaturesPage';
import CompanyPage from './pages/CompanyPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Components
import OfflineStatus from './components/ui/OfflineStatus';
import PWAInstallPrompt from './components/ui/PWAInstallPrompt';
import PWAUpdateNotification from './components/ui/PWAUpdateNotification';
import ToastContainer from './components/ui/ToastContainer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

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
                    <Route
                      path="enterprise-dashboard"
                      element={
                        <ProtectedRoute allowedRoles={['enterprise', 'admin']}>
                          <EnterpriseDashboardPage />
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
                    <Route
                      path="profile"
                      element={
                        <ProtectedRoute>
                          <ProfilePage />
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

                    {/* 404 Route */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>

                {/* Global Components */}
                <ToastContainer />
                <PWAInstallPrompt />
                <PWAUpdateNotification />
              </div>
            </ToastProvider>
          </LoadingProvider>
        </AuthProvider>
      </PWAProvider>
    </ThemeProvider>
  );
}

export default App;
