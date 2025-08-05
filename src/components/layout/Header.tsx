import {
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BeakerIcon,
  BellIcon,
  BookOpenIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  CogIcon,
  DocumentTextIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  NewspaperIcon,
  PhotoIcon,
  RocketLaunchIcon,
  ShoppingBagIcon,
  SparklesIcon,
  StarIcon,
  SunIcon,
  TagIcon,
  UserCircleIcon,
  UserGroupIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useToast } from '../../contexts/ToastContext';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDashboardPath = () => {
    if (!user) return '/dashboard';
    if (hasRole('admin')) return '/admin-dashboard';
    if (hasRole('instructor')) return '/instructor-dashboard';
    if (hasRole('enterprise')) return '/enterprise-dashboard';
    return '/dashboard';
  };

  // Smart navigation that adapts to screen size
  const getNavigationItems = () => {
    const allItems = [
      { name: 'Home', href: '/', icon: HomeIcon, priority: 'high' },
      {
        name: 'Courses',
        href: '/courses',
        icon: BookOpenIcon,
        priority: 'high',
      },
      {
        name: 'AI Tutor',
        href: '/ai-tutor',
        icon: ChatBubbleLeftRightIcon,
        priority: 'high',
      },
      {
        name: 'Cohorts',
        href: '/cohorts',
        icon: UserGroupIcon,
        priority: 'medium',
      },
      {
        name: 'Analytics',
        href: '/analytics',
        icon: ChartBarIcon,
        priority: 'medium',
      },
      {
        name: 'Marketplace',
        href: '/marketplace',
        icon: ShoppingBagIcon,
        priority: 'medium',
      },
      {
        name: 'Research Lab',
        href: '/research-lab',
        icon: BeakerIcon,
        priority: 'low',
      },
      { name: 'Gallery', href: '/gallery', icon: PhotoIcon, priority: 'low' },
      { name: 'News', href: '/news', icon: NewspaperIcon, priority: 'low' },
      { name: 'Blog', href: '/blog', icon: DocumentTextIcon, priority: 'low' },
      {
        name: 'Community',
        href: '/community',
        icon: UsersIcon,
        priority: 'low',
      },
      { name: 'Pricing', href: '/pricing', icon: TagIcon, priority: 'low' },
      {
        name: 'Dashboard',
        href: getDashboardPath(),
        icon: AcademicCapIcon,
        protected: true,
        dynamicPath: true,
        priority: 'high',
      },
    ];

    return allItems.filter(item => !item.protected || isAuthenticated);
  };

  const handleLogout = () => {
    logout();
    addToast({ type: 'success', title: 'Successfully logged out' });
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const renderNavigationItem = (
    item: any,
    onClick?: () => void,
    variant: 'desktop' | 'mobile' | 'dropdown' = 'desktop'
  ) => {
    const baseClasses =
      'flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200';
    const activeClasses =
      'text-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-sm';
    const inactiveClasses =
      'text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800';

    const classes = `${baseClasses} ${
      isActive(item.href) ? activeClasses : inactiveClasses
    }`;

    return (
      <Link
        key={item.name}
        to={item.href}
        className={classes}
        onClick={onClick}
      >
        {item.icon && <item.icon className="w-4 h-4" />}
        <span>{item.name}</span>
      </Link>
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
    setIsSearchOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-700'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between h-20 px-6">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 flex-shrink-0 group"
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AcademicCapIcon className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                The Box
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-1">
              {getNavigationItems()
                .filter(item => item.priority === 'high')
                .map(item => renderNavigationItem(item))}

              {/* More dropdown for medium priority items */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <span>More</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isMoreMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isMoreMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
                    >
                      <div className="space-y-1">
                        {getNavigationItems()
                          .filter(item => item.priority !== 'high')
                          .map(item =>
                            renderNavigationItem(
                              item,
                              () => setIsMoreMenuOpen(false),
                              'dropdown'
                            )
                          )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-all duration-200"
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50"
                    >
                      <form onSubmit={handleSearch} className="space-y-3">
                        <div className="relative">
                          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search courses, topics..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            autoFocus
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Search
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Toggle theme"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'dark' ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </motion.button>

              {/* Auth Buttons */}
              {!isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 font-medium text-sm transition-colors"
                  >
                    Sign In
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/signup"
                      className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </div>
              ) : (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <div className="relative">
                      <UserCircleIcon className="w-6 h-6" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
                    </div>
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <UserCircleIcon className="w-10 h-10 text-primary-600" />
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {user?.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {user?.email}
                              </p>
                              <div className="flex items-center space-x-1 mt-1">
                                <SparklesIcon className="w-3 h-3 text-yellow-500" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Premium
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <UserCircleIcon className="w-4 h-4" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            to={getDashboardPath()}
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <AcademicCapIcon className="w-4 h-4" />
                            <span>Dashboard</span>
                          </Link>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200"
                          >
                            <ArrowRightOnRectangleIcon className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 flex-shrink-0 group"
            >
              <motion.div
                className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AcademicCapIcon className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                The Box
              </span>
            </Link>

            {/* Mobile menu button only */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Toggle mobile menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 safe-area-bottom"
          >
            <div className="px-4 py-6 space-y-6">
              {/* Enhanced Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search courses, topics, AI tutors..."
                  className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-base shadow-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <SparklesIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Theme Toggle and Search in Mobile Menu */}
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 p-3 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  {theme === 'dark' ? (
                    <SunIcon className="w-5 h-5" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>

                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="flex items-center space-x-2 p-3 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Search</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/ai-tutor"
                  className="flex items-center space-x-3 p-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl border border-primary-200 dark:border-primary-700 hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      AI Tutor
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Get help instantly
                    </p>
                  </div>
                </Link>
                <Link
                  to="/courses"
                  className="flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <BookOpenIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Courses
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Learn new skills
                    </p>
                  </div>
                </Link>
              </div>

              {/* Primary Navigation */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                  <RocketLaunchIcon className="w-3 h-3 mr-2" />
                  Main Navigation
                </h3>
                <div className="space-y-1">
                  {getNavigationItems()
                    .filter(item => item.priority === 'high')
                    .map(item =>
                      renderNavigationItem(
                        item,
                        () => setIsMobileMenuOpen(false),
                        'mobile'
                      )
                    )}
                </div>
              </div>

              {/* Secondary Navigation */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                  <StarIcon className="w-3 h-3 mr-2" />
                  More Options
                </h3>
                <div className="space-y-1">
                  {getNavigationItems()
                    .filter(item => item.priority !== 'high')
                    .map(item =>
                      renderNavigationItem(
                        item,
                        () => setIsMobileMenuOpen(false),
                        'mobile'
                      )
                    )}
                </div>
              </div>

              {/* Auth Section */}
              {!isAuthenticated ? (
                <div className="pt-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Join The Box
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Start your learning journey today
                    </p>
                  </div>
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-4 text-base font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 border-2 border-gray-300 dark:border-gray-600 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center px-4 py-4 text-base font-medium bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl hover:shadow-xl transition-all duration-200 hover:scale-105"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started Free
                  </Link>
                </div>
              ) : (
                <div className="pt-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl border border-primary-200 dark:border-primary-700">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="relative">
                        <UserCircleIcon className="w-12 h-12 text-primary-600" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <SparklesIcon className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Premium Member
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          4.9/5
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/profile"
                      className="flex flex-col items-center space-y-2 p-4 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <UserCircleIcon className="w-6 h-6" />
                      <span className="text-sm font-medium">Profile</span>
                    </Link>
                    <Link
                      to="/course-check"
                      className="flex flex-col items-center space-y-2 p-4 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <BookOpenIcon className="w-6 h-6" />
                      <span className="text-sm font-medium">Courses</span>
                    </Link>
                    <Link
                      to="/notifications"
                      className="flex flex-col items-center space-y-2 p-4 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <BellIcon className="w-6 h-6" />
                      <span className="text-sm font-medium">Notifications</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex flex-col items-center space-y-2 p-4 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <CogIcon className="w-6 h-6" />
                      <span className="text-sm font-medium">Settings</span>
                    </Link>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-4 text-base text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border-2 border-red-300 dark:border-red-600 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
