import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BeakerIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  GlobeAltIcon as GlobeIcon,
  MapPinIcon,
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
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePWA } from '../hooks/usePWA';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { isInstallable, install } = usePWA();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOffline, setIsOffline] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Offline Notification */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-4 right-4 z-50 bg-yellow-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-between"
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
            className="fixed top-4 left-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DevicePhoneMobileIcon className="h-6 w-6 mr-3" />
                <div>
                  <div className="font-semibold">Install The Box App</div>
                  <div className="text-sm text-blue-100">
                    Get the full experience on your device
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowInstallPrompt(false)}
                  className="px-3 py-1 text-sm border border-white/30 rounded hover:bg-white/10"
                >
                  Later
                </button>
                <button
                  onClick={install}
                  className="px-4 py-2 bg-white text-blue-600 rounded font-semibold hover:bg-gray-100"
                >
                  Install
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mr-4">
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  AI-Powered Learning
                </div>
                <div className="flex items-center text-gray-600">
                  <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm">4.9/5 Rating</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                The Future of
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Education
                </span>
                is Here
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                World-class AI-powered education platform designed to transform
                learning and unlock your full potential. Learn anywhere,
                anytime, offline or online.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/signup"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                    >
                      <RocketLaunchIcon className="w-5 h-5 mr-2" />
                      Get Started Free
                    </Link>
                    <button
                      onClick={() => setShowTutorial(true)}
                      className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center"
                    >
                      <PlayIcon className="w-5 h-5 mr-2" />
                      Watch Demo
                    </button>
                  </>
                ) : (
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                  >
                    <RocketLaunchIcon className="w-5 h-5 mr-2" />
                    Go to Dashboard
                  </Link>
                )}
              </div>

              {/* Trusted By Section */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-4">
                  Trusted by leading institutions worldwide
                </p>
                <div className="flex flex-wrap gap-4">
                  {trustedBy.slice(0, 6).map((company, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-2">
                          {company.logo}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {company.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">AI Tutor Demo</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <CpuChipIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">
                        Hello! I'm your AI tutor. How can I help you learn
                        today?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                      <p className="text-sm">
                        Can you help me understand machine learning?
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <UserGroupIcon className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <CpuChipIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">
                        Absolutely! Let me create a personalized learning path
                        for you...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowTutorial(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Platform Tutorial
                </h2>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {tutorialSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowTutorial(false)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose The Box?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with proven
              educational methodologies to deliver an unparalleled learning
              experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
              >
                <div
                  className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="text-sm text-blue-600 font-semibold">
                  {feature.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Global Presence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our global community of learners and educators from around
              the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <GlobeIcon className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold">Live Global Map</h3>
                </div>
                <div className="space-y-4">
                  {locations.map((location, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between bg-white/10 rounded-lg p-4"
                    >
                      <div className="flex items-center">
                        <MapPinIcon className="w-5 h-5 mr-3" />
                        <div>
                          <div className="font-semibold">{location.city}</div>
                          <div className="text-sm text-blue-100">
                            {location.country}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-sm">Active</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <GlobeIcon className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive World Map</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Showing real-time learner activity
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already experiencing the future
              of education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={isAuthenticated ? '/dashboard' : '/signup'}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 inline-flex items-center justify-center"
              >
                <RocketLaunchIcon className="w-5 h-5 mr-2" />
                {isAuthenticated ? 'Go to Dashboard' : 'Start Learning Today'}
              </Link>
              {isInstallable && (
                <button
                  onClick={install}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 inline-flex items-center justify-center"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                  Install App
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
