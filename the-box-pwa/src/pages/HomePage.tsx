import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  GlobeAltIcon,
  SparklesIcon,
  PlayIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import CookieConsent from '@/components/ui/CookieConsent';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieChoice = localStorage.getItem('cookieChoice');
    if (!cookieChoice) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleCookieAccept = (preferences: any) => {
    localStorage.setItem('cookieChoice', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setShowCookieConsent(false);
  };

  const handleCookieDecline = () => {
    localStorage.setItem('cookieChoice', 'declined');
    setShowCookieConsent(false);
  };

  const handleCookieCustomize = () => {
    // Navigate to cookies page
    window.location.href = '/cookies';
  };

  const features = [
    {
      icon: AcademicCapIcon,
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths adapted to your pace and style with advanced AI algorithms.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
    },
    {
      icon: BookOpenIcon,
      title: 'Expert-Led Courses',
      description: 'Learn from world-class instructors and industry experts from top universities.',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: '24/7 AI Tutor',
      description: 'Get instant help and answers to your questions with our intelligent AI tutor.',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50 dark:bg-accent-900/20',
    },
    {
      icon: UserGroupIcon,
      title: 'Global Community',
      description: 'Connect with learners worldwide and collaborate on projects and discussions.',
      color: 'text-success-600',
      bgColor: 'bg-success-50 dark:bg-success-900/20',
    },
    {
      icon: GlobeAltIcon,
      title: 'Multi-Platform Access',
      description: 'Learn anywhere, anytime with our responsive web and mobile applications.',
      color: 'text-warning-600',
      bgColor: 'bg-warning-50 dark:bg-warning-900/20',
    },
    {
      icon: SparklesIcon,
      title: 'Advanced Analytics',
      description: 'Track your progress with detailed analytics and performance insights.',
      color: 'text-error-600',
      bgColor: 'bg-error-50 dark:bg-error-900/20',
    },
  ];

  const stats = [
    { number: '1M+', label: 'Active Students' },
    { number: '500+', label: 'Expert Instructors' },
    { number: '10K+', label: 'Courses Available' },
    { number: '95%', label: 'Success Rate' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                World-Class{' '}
                <span className="gradient-text bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  AI-Powered
                </span>{' '}
                Education
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Experience a smarter way to learn with adaptive courses, expert instructors, 
                and a global community. Unlock your potential with The Box.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/signup"
                      className="btn btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2"
                    >
                      <span>Get Started Free</span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/courses"
                      className="btn btn-outline text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
                    >
                      <PlayIcon className="w-5 h-5 mr-2" />
                      Explore Courses
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/dashboard"
                    className="btn btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Hero Image/Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <AcademicCapIcon className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">AI Learning</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <BookOpenIcon className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Expert Courses</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <ChatBubbleLeftRightIcon className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">24/7 Support</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <UserGroupIcon className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Global Community</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3"
              >
                <SparklesIcon className="w-6 h-6 text-yellow-900" />
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-accent-500 rounded-full p-3"
              >
                <GlobeAltIcon className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose The Box?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with world-class education 
              to deliver an unparalleled learning experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join millions of learners worldwide and start your journey towards 
              success with The Box today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/signup"
                    className="btn btn-secondary text-lg px-8 py-4"
                  >
                    Start Learning Free
                  </Link>
                  <Link
                    to="/courses"
                    className="btn btn-outline text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
                  >
                    Browse Courses
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="btn btn-secondary text-lg px-8 py-4"
                >
                  Continue Learning
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cookie Consent */}
      <CookieConsent
        isVisible={showCookieConsent}
        onAccept={handleCookieAccept}
        onDecline={handleCookieDecline}
        onCustomize={handleCookieCustomize}
      />
    </div>
  );
};

export default HomePage; 