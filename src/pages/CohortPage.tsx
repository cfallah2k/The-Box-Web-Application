import {
  AcademicCapIcon,
  BellIcon,
  BookmarkIcon,
  BrainIcon,
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
  CodeBracketIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrendingUpIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CohortPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-cohorts');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Cohorts', icon: UserGroupIcon },
    { id: 'programming', name: 'Programming', icon: CodeBracketIcon },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: BrainIcon },
    { id: 'design', name: 'Design', icon: LightBulbIcon },
    { id: 'business', name: 'Business', icon: TrendingUpIcon },
    { id: 'data-science', name: 'Data Science', icon: ChartBarIcon },
  ];

  const myCohorts = [
    {
      id: 1,
      name: 'Advanced React Development Cohort',
      instructor: 'Dr. Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      category: 'programming',
      status: 'active',
      members: 24,
      maxMembers: 30,
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      progress: 75,
      nextSession: '2024-02-20',
      time: '6:00 PM EST',
      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      description:
        'Master React with advanced patterns, hooks, and state management.',
      tags: ['React', 'JavaScript', 'Frontend'],
      featured: true,
      level: 'Advanced',
    },
    {
      id: 2,
      name: 'Machine Learning Fundamentals',
      instructor: 'Prof. Michael Chen',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      category: 'ai-ml',
      status: 'active',
      members: 18,
      maxMembers: 25,
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      progress: 45,
      nextSession: '2024-02-22',
      time: '7:00 PM EST',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=400',
      description: 'Learn the fundamentals of machine learning and AI.',
      tags: ['Machine Learning', 'Python', 'AI'],
      featured: false,
      level: 'Intermediate',
    },
    {
      id: 3,
      name: 'UI/UX Design Principles',
      instructor: 'Emily Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      category: 'design',
      status: 'completed',
      members: 20,
      maxMembers: 20,
      startDate: '2023-10-01',
      endDate: '2024-01-01',
      progress: 100,
      nextSession: null,
      time: null,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      description: 'Comprehensive UI/UX design course with hands-on projects.',
      tags: ['UI/UX', 'Design', 'Figma'],
      featured: false,
      level: 'Beginner',
    },
  ];

  const availableCohorts = [
    {
      id: 4,
      name: 'Data Science with Python',
      instructor: 'Dr. David Kim',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      category: 'data-science',
      status: 'enrolling',
      members: 15,
      maxMembers: 30,
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      progress: 0,
      nextSession: '2024-03-01',
      time: '6:30 PM EST',
      image:
        'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      description:
        'Comprehensive data science course covering Python, pandas, and machine learning.',
      tags: ['Data Science', 'Python', 'Pandas'],
      featured: true,
      level: 'Intermediate',
    },
    {
      id: 5,
      name: 'Business Strategy & Analytics',
      instructor: 'Prof. Alex Thompson',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      category: 'business',
      status: 'enrolling',
      members: 12,
      maxMembers: 25,
      startDate: '2024-03-15',
      endDate: '2024-06-15',
      progress: 0,
      nextSession: '2024-03-15',
      time: '7:30 PM EST',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      description:
        'Learn business strategy and analytics for modern organizations.',
      tags: ['Business', 'Analytics', 'Strategy'],
      featured: false,
      level: 'Advanced',
    },
  ];

  const cohortActivities = [
    {
      id: 1,
      cohortId: 1,
      type: 'session',
      title: 'State Management with Redux',
      date: '2024-02-20',
      time: '6:00 PM EST',
      duration: '90 minutes',
      instructor: 'Dr. Sarah Johnson',
      description:
        'Learn advanced state management patterns with Redux Toolkit.',
      materials: ['Slides', 'Code Examples', 'Practice Exercises'],
      status: 'upcoming',
    },
    {
      id: 2,
      cohortId: 1,
      type: 'assignment',
      title: 'Build a Todo App with Redux',
      date: '2024-02-25',
      time: null,
      duration: '1 week',
      instructor: 'Dr. Sarah Johnson',
      description:
        'Create a complete todo application using Redux for state management.',
      materials: ['Requirements', 'Starter Code', 'Rubric'],
      status: 'active',
    },
    {
      id: 3,
      cohortId: 2,
      type: 'session',
      title: 'Neural Networks Basics',
      date: '2024-02-22',
      time: '7:00 PM EST',
      duration: '90 minutes',
      instructor: 'Prof. Michael Chen',
      description:
        'Introduction to neural networks and deep learning fundamentals.',
      materials: ['Slides', 'Jupyter Notebooks', 'Datasets'],
      status: 'upcoming',
    },
  ];

  const cohortMembers = [
    {
      id: 1,
      name: 'John Smith',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      role: 'student',
      progress: 85,
      lastActive: '2 hours ago',
      contributions: 12,
      achievements: 5,
    },
    {
      id: 2,
      name: 'Lisa Wang',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: 'student',
      progress: 92,
      lastActive: '1 hour ago',
      contributions: 18,
      achievements: 7,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'student',
      progress: 78,
      lastActive: '3 hours ago',
      contributions: 8,
      achievements: 3,
    },
  ];

  const tabs = [
    { id: 'my-cohorts', name: 'My Cohorts', icon: UserGroupIcon },
    { id: 'available', name: 'Available Cohorts', icon: AcademicCapIcon },
    { id: 'activities', name: 'Activities', icon: CalendarIcon },
    { id: 'members', name: 'Members', icon: UsersIcon },
  ];

  const filteredCohorts = myCohorts.filter(cohort => {
    const matchesSearch =
      cohort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cohort.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || cohort.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cohorts</h1>
              <p className="text-gray-600 mt-2">
                Join learning communities and collaborate with peers.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="w-5 h-5 mr-2 inline" />
                Create Cohort
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <BellIcon className="w-5 h-5 mr-2 inline" />
                Notifications
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cohorts..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Progress</option>
                <option>Start Date</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'my-cohorts' && (
              <div className="space-y-6">
                {filteredCohorts.map((cohort, index) => (
                  <motion.div
                    key={cohort.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={cohort.image}
                          alt={cohort.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3 md:ml-6">
                        <div className="flex items-center space-x-2 mb-3">
                          {cohort.featured && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              cohort.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : cohort.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {cohort.status}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              cohort.category === 'programming'
                                ? 'bg-blue-100 text-blue-800'
                                : cohort.category === 'ai-ml'
                                ? 'bg-purple-100 text-purple-800'
                                : cohort.category === 'design'
                                ? 'bg-pink-100 text-pink-800'
                                : cohort.category === 'business'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {cohort.category}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {cohort.level}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {cohort.name}
                        </h3>

                        <p className="text-gray-600 mb-4">
                          {cohort.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <UserIcon className="w-4 h-4 mr-1" />
                            {cohort.instructor}
                          </div>
                          <div className="flex items-center">
                            <UsersIcon className="w-4 h-4 mr-1" />
                            {cohort.members}/{cohort.maxMembers} members
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {cohort.startDate} - {cohort.endDate}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {cohort.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div>
                              <span className="text-sm text-gray-500">
                                Progress
                              </span>
                              <div className="flex items-center">
                                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${cohort.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">
                                  {cohort.progress}%
                                </span>
                              </div>
                            </div>
                            {cohort.nextSession && (
                              <div>
                                <span className="text-sm text-gray-500">
                                  Next Session
                                </span>
                                <div className="text-sm font-medium">
                                  {cohort.nextSession}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {cohort.time}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                              View Cohort
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <BookmarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'available' && (
              <div className="space-y-6">
                {availableCohorts.map((cohort, index) => (
                  <motion.div
                    key={cohort.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={cohort.image}
                          alt={cohort.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3 md:ml-6">
                        <div className="flex items-center space-x-2 mb-3">
                          {cohort.featured && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Enrolling
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              cohort.category === 'programming'
                                ? 'bg-blue-100 text-blue-800'
                                : cohort.category === 'ai-ml'
                                ? 'bg-purple-100 text-purple-800'
                                : cohort.category === 'design'
                                ? 'bg-pink-100 text-pink-800'
                                : cohort.category === 'business'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {cohort.category}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {cohort.level}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {cohort.name}
                        </h3>

                        <p className="text-gray-600 mb-4">
                          {cohort.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <UserIcon className="w-4 h-4 mr-1" />
                            {cohort.instructor}
                          </div>
                          <div className="flex items-center">
                            <UsersIcon className="w-4 h-4 mr-1" />
                            {cohort.members}/{cohort.maxMembers} members
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {cohort.startDate} - {cohort.endDate}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {cohort.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div>
                              <span className="text-sm text-gray-500">
                                Spots Available
                              </span>
                              <div className="text-sm font-medium text-green-600">
                                {cohort.maxMembers - cohort.members} spots left
                              </div>
                            </div>
                            {cohort.nextSession && (
                              <div>
                                <span className="text-sm text-gray-500">
                                  First Session
                                </span>
                                <div className="text-sm font-medium">
                                  {cohort.nextSession}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {cohort.time}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                              Join Cohort
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <BookmarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="space-y-6">
                {cohortActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              activity.type === 'session'
                                ? 'bg-blue-100 text-blue-800'
                                : activity.type === 'assignment'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {activity.type}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              activity.status === 'upcoming'
                                ? 'bg-yellow-100 text-yellow-800'
                                : activity.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {activity.status}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {activity.title}
                        </h3>

                        <p className="text-gray-600 mb-4">
                          {activity.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <UserIcon className="w-4 h-4 mr-1" />
                            {activity.instructor}
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {activity.date}
                          </div>
                          {activity.time && (
                            <div className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {activity.time}
                            </div>
                          )}
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {activity.duration}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {activity.materials.map((material, materialIndex) => (
                            <span
                              key={materialIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <BookmarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cohortMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {member.name}
                          </h3>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500">
                            Progress
                          </span>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${member.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">
                              {member.progress}%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{member.contributions} contributions</span>
                          <span>{member.achievements} achievements</span>
                        </div>

                        <div className="text-xs text-gray-500">
                          Last active: {member.lastActive}
                        </div>

                        <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                          View Profile
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortPage;
