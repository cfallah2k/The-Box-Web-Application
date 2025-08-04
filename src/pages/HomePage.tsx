import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  BeakerIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  GlobeAltIcon as GlobeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  RocketLaunchIcon,
  SparklesIcon,
  StarIcon,
  TrophyIcon,
  UserGroupIcon,
  UsersIcon,
  WifiIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LiveAITutorDemo from '../components/ai/LiveAITutorDemo';
import InteractiveMap from '../components/ui/InteractiveMap';
import LiveUserActivity from '../components/ui/LiveUserActivity';
import GamificationSystem from '../components/gamification/GamificationSystem';
import AdvancedAnalytics from '../components/analytics/AdvancedAnalytics';
import StudyGroups from '../components/social/StudyGroups';
import CourseBuilder from '../components/content/CourseBuilder';
import PersonalizedLearningPaths from '../components/ai/PersonalizedLearningPaths';
import SmartContentCuration from '../components/ai/SmartContentCuration';
import AdaptiveAssessments from '../components/ai/AdaptiveAssessments';
import VoiceCommands from '../components/ai/VoiceCommands';
import TeamManagement from '../components/enterprise/TeamManagement';
import CustomBranding from '../components/enterprise/CustomBranding';
import PerformanceMonitoring from '../components/performance/PerformanceMonitoring';
import { useAuth } from '../contexts/AuthContext';
import { usePWA } from '../hooks/usePWA';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { isInstallable, install } = usePWA();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOffline, setIsOffline] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [activeCourse, setActiveCourse] = useState<number | null>(null);
  const [liveStats, setLiveStats] = useState({
    activeUsers: 0,
    coursesCompleted: 0,
    aiConversations: 0,
    countriesReached: 0,
  });

  // Scroll animations
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -100]);
  const y2 = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Live statistics animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10),
        coursesCompleted: prev.coursesCompleted + Math.floor(Math.random() * 5),
        aiConversations: prev.aiConversations + Math.floor(Math.random() * 20),
        countriesReached: prev.countriesReached + Math.floor(Math.random() * 2),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Check online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    handleOnlineStatus();

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Show install prompt after 3 seconds
  useEffect(() => {
    if (isInstallable) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable]);

  const tutorialSteps = [
    {
      title: 'AI-Powered Learning',
      description: 'Your personal AI tutor adapts to your learning style',
      icon: CpuChipIcon,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Interactive Features',
      description: 'Voice, vision, and code execution capabilities',
      icon: ChatBubbleLeftRightIcon,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Offline Access',
      description: 'Learn anywhere, even without internet',
      icon: WifiIcon,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Install App',
      description: 'Get the full experience on your device',
      icon: DevicePhoneMobileIcon,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const trustedBy = [
    { name: 'Stanford University', logo: 'SU', type: 'University' },
    { name: 'MIT', logo: 'MIT', type: 'University' },
    { name: 'Google', logo: 'G', type: 'Tech Company' },
    { name: 'Microsoft', logo: 'MS', type: 'Tech Company' },
    { name: 'Amazon', logo: 'A', type: 'Tech Company' },
    { name: 'IBM', logo: 'IBM', type: 'Tech Company' },
    { name: 'Harvard', logo: 'H', type: 'University' },
    { name: 'Yale', logo: 'Y', type: 'University' },
  ];

  const features = [
    {
      icon: AcademicCapIcon,
      title: 'AI-Powered Learning',
      description:
        'Personalized education with advanced AI tutors that adapt to your learning style.',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      stats: '95% improvement in learning outcomes',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Interactive AI Tutor',
      description:
        '24/7 AI assistance with voice, vision, and code execution capabilities.',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      stats: '2M+ conversations daily',
    },
    {
      icon: UserGroupIcon,
      title: 'Cohort Management',
      description:
        'Collaborate with peers in structured learning cohorts and group projects.',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      stats: '50K+ active cohorts',
    },
    {
      icon: ChartBarIcon,
      title: 'Advanced Analytics',
      description:
        'Track your progress with detailed analytics and performance insights.',
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      stats: 'Real-time insights',
    },
    {
      icon: BeakerIcon,
      title: 'Research Lab',
      description:
        'Access cutting-edge research tools and experimental learning features.',
      color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      stats: '100+ research tools',
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Community',
      description: 'Connect with learners and educators from around the world.',
      color: 'bg-gradient-to-r from-teal-500 to-blue-500',
      stats: '150+ countries',
    },
  ];

  const stats = [
    { number: '2M+', label: 'Active Learners', icon: UsersIcon },
    { number: '150+', label: 'Countries', icon: GlobeIcon },
    { number: '95%', label: 'Success Rate', icon: TrophyIcon },
    { number: '24/7', label: 'AI Support', icon: CpuChipIcon },
  ];

  const locations = [
    {
      city: 'San Francisco',
      country: 'USA',
      coordinates: [37.7749, -122.4194],
    },
    { city: 'New York', country: 'USA', coordinates: [40.7128, -74.006] },
    { city: 'London', country: 'UK', coordinates: [51.5074, -0.1278] },
    { city: 'Berlin', country: 'Germany', coordinates: [52.52, 13.405] },
    { city: 'Tokyo', country: 'Japan', coordinates: [35.6762, 139.6503] },
    { city: 'Sydney', country: 'Australia', coordinates: [-33.8688, 151.2093] },
  ];

  // Interactive Course Cards
  const featuredCourses = [
    {
      id: 1,
      title: 'Advanced Machine Learning',
      instructor: 'Dr. Sarah Chen',
      rating: 4.9,
      students: 15420,
      duration: '12 weeks',
      level: 'Advanced',
      category: 'AI & ML',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400',
      progress: 0,
      isEnrolled: false,
      price: '$299',
      originalPrice: '$399',
      features: ['Live Sessions', 'Certificate', '1-on-1 Mentoring'],
    },
    {
      id: 2,
      title: 'Web Development Bootcamp',
      instructor: 'Mike Johnson',
      rating: 4.8,
      students: 23450,
      duration: '8 weeks',
      level: 'Beginner',
      category: 'Programming',
      image:
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
      progress: 0,
      isEnrolled: false,
      price: '$199',
      originalPrice: '$299',
      features: ['Project-Based', 'Portfolio', 'Job Support'],
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
      rating: 4.9,
      students: 18760,
      duration: '10 weeks',
      level: 'Intermediate',
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      progress: 0,
      isEnrolled: false,
      price: '$249',
      originalPrice: '$349',
      features: ['Real Projects', 'Industry Tools', 'Career Guidance'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Offline Notification */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-4 right-4 z-50 bg-yellow-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center">
              <WifiIcon className="h-5 w-5 mr-2" />
              <span className="font-semibold">
                You're offline - but you can still learn!
              </span>
            </div>
            <button className="text-white hover:text-yellow-100">
              <CheckCircleIcon className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Install Prompt */}
      <AnimatePresence>
        {showInstallPrompt && isInstallable && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DevicePhoneMobileIcon className="h-6 w-6 mr-3" />
                <div>
                  <h3 className="font-semibold">Install The Box</h3>
                  <p className="text-sm opacity-90">
                    Get the full experience on your device
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => install()}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Install
                </button>
                <button
                  onClick={() => setShowInstallPrompt(false)}
                  className="text-white hover:text-gray-200"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Parallax */}
      <section className="relative overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-10"
        ></motion.div>

        <div className="container-responsive pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium"
                >
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  AI-Powered Learning Platform
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                >
                  Transform Your
                  <span className="gradient-text block">Learning Journey</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl"
                >
                  Experience personalized education with AI tutors, interactive
                  features, and a global community of learners.
                </motion.p>
              </div>

              {/* Live Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  {
                    label: 'Active Users',
                    value: liveStats.activeUsers.toLocaleString(),
                    icon: UsersIcon,
                  },
                  {
                    label: 'Courses Completed',
                    value: liveStats.coursesCompleted.toLocaleString(),
                    icon: TrophyIcon,
                  },
                  {
                    label: 'AI Conversations',
                    value: liveStats.aiConversations.toLocaleString(),
                    icon: ChatBubbleLeftRightIcon,
                  },
                  {
                    label: 'Countries',
                    value: liveStats.countriesReached.toString(),
                    icon: GlobeAltIcon,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/courses"
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <RocketLaunchIcon className="w-5 h-5" />
                  <span>Start Learning</span>
                </Link>
                <button
                  onClick={() => setShowTutorial(true)}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <PlayIcon className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </motion.div>
            </motion.div>

            {/* AI Tutor Demo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <LiveAITutorDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Search Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Find Your Perfect Course
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Search through thousands of courses, filter by category, level,
              and instructor
            </p>
          </motion.div>

          {/* Advanced Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses, topics, instructors..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white shadow-lg"
              />
              <button className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <SparklesIcon className="h-6 w-6 text-blue-600" />
              </button>
            </div>

            {/* Search Filters */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              {[
                'All',
                'Programming',
                'AI & ML',
                'Data Science',
                'Business',
                'Design',
                'Marketing',
              ].map(filter => (
                <button
                  key={filter}
                  className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Course Cards */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Courses
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our most popular courses with interactive previews
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                  {/* Course Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <HeartIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {course.rating}
                          </span>
                        </div>
                        <span className="text-sm opacity-90">
                          {course.students.toLocaleString()} students
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 font-medium">
                        {course.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {course.duration}
                        </span>
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      by {course.instructor}
                    </p>

                    {/* Course Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.features.map(feature => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    {course.isEnrolled && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">
                            Progress
                          </span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {course.price}
                        </span>
                        {course.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            {course.originalPrice}
                          </span>
                        )}
                      </div>
                      <button className="btn-primary">
                        {course.isEnrolled ? 'Continue' : 'Enroll Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Trusted by Leading Institutions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of learners from top universities and companies
              worldwide
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {trustedBy.map((institution, index) => (
              <motion.div
                key={institution.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-3 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {institution.logo}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {institution.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {institution.type}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Why Choose The Box?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of education with our cutting-edge features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {feature.description}
                  </p>

                  <div className="flex items-center space-x-2">
                    <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {feature.stats}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Global Map */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Global Learning Community
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See where our learners are located around the world
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {locations.map((location, index) => (
                      <motion.div
                        key={location.city}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                      >
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {location.city}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {location.country}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Active Learners
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        New This Week
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <InteractiveMap />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live User Activity Feed */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Live Community Activity
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what's happening in real-time across our global learning community
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <LiveUserActivity />
          </motion.div>
        </div>
      </section>

      {/* Gamification System */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Gamified Learning Experience
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Earn achievements, build streaks, and level up your learning journey
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <GamificationSystem />
          </motion.div>
        </div>
      </section>

      {/* Advanced Analytics Dashboard */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Advanced Analytics & Insights
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Track your learning progress with detailed analytics and performance insights
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <AdvancedAnalytics />
          </motion.div>
        </div>
      </section>

      {/* Social & Community Features */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Connect & Collaborate
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join study groups, find peer tutors, and participate in discussion forums
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <StudyGroups />
          </motion.div>
        </div>
      </section>

      {/* Content Creation Tools */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Create & Share Knowledge
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Build courses, create interactive quizzes, and share your expertise with the community
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <CourseBuilder />
          </motion.div>
        </div>
      </section>

      {/* AI-Powered Features */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              AI-Powered Learning Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of learning with advanced AI capabilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <PersonalizedLearningPaths />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SmartContentCuration />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AdaptiveAssessments />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <VoiceCommands />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Enterprise Solutions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful tools for organizations and teams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <TeamManagement />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CustomBranding />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance & Monitoring */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Performance & Monitoring
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real-time insights and system monitoring
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <PerformanceMonitoring />
          </motion.div>
        </div>
      </section>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome to The Box
                  </h2>
                  <button
                    onClick={() => setShowTutorial(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {tutorialSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start space-x-4"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowTutorial(false)}
                    className="flex-1 btn-secondary"
                  >
                    Got it
                  </button>
                  <Link
                    to="/courses"
                    className="flex-1 btn-primary"
                    onClick={() => setShowTutorial(false)}
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
