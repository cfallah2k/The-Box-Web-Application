import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  CodeBracketIcon,
  CogIcon,
  CpuChipIcon,
  EnvelopeIcon,
  EyeIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  PlusIcon,
  StarIcon,
  TrophyIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const InstructorCohortPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-cohorts');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Cohorts', icon: UserGroupIcon },
    { id: 'programming', name: 'Programming', icon: CodeBracketIcon },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: CpuChipIcon },
    { id: 'design', name: 'Design', icon: LightBulbIcon },
    { id: 'business', name: 'Business', icon: ChartBarIcon },
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
      revenue: '$12,000',
      completionRate: 85,
      averageScore: 87,
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
      revenue: '$9,000',
      completionRate: 78,
      averageScore: 82,
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
      revenue: '$10,000',
      completionRate: 95,
      averageScore: 89,
    },
  ];

  const cohortAnalytics = [
    {
      id: 1,
      cohortId: 1,
      metric: 'Student Engagement',
      value: 92,
      change: '+5%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'bg-green-500',
    },
    {
      id: 2,
      cohortId: 1,
      metric: 'Assignment Completion',
      value: 87,
      change: '+3%',
      changeType: 'increase',
      icon: CheckCircleIcon,
      color: 'bg-blue-500',
    },
    {
      id: 3,
      cohortId: 1,
      metric: 'Average Score',
      value: 89,
      change: '+2%',
      changeType: 'increase',
      icon: StarIcon,
      color: 'bg-yellow-500',
    },
    {
      id: 4,
      cohortId: 1,
      metric: 'Revenue',
      value: '$12,000',
      change: '+8%',
      changeType: 'increase',
      icon: TrophyIcon,
      color: 'bg-purple-500',
    },
  ];

  const studentPerformance = [
    {
      id: 1,
      name: 'John Smith',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      email: 'john.smith@email.com',
      progress: 85,
      score: 92,
      assignments: 8,
      lastActive: '2 hours ago',
      status: 'active',
      attendance: 95,
    },
    {
      id: 2,
      name: 'Lisa Wang',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      email: 'lisa.wang@email.com',
      progress: 92,
      score: 96,
      assignments: 10,
      lastActive: '1 hour ago',
      status: 'active',
      attendance: 100,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      email: 'mike.johnson@email.com',
      progress: 78,
      score: 84,
      assignments: 6,
      lastActive: '3 hours ago',
      status: 'active',
      attendance: 88,
    },
    {
      id: 4,
      name: 'Sarah Davis',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      email: 'sarah.davis@email.com',
      progress: 65,
      score: 72,
      assignments: 4,
      lastActive: '1 day ago',
      status: 'at-risk',
      attendance: 75,
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'State Management with Redux',
      date: '2024-02-20',
      time: '6:00 PM EST',
      duration: '90 minutes',
      attendees: 24,
      maxAttendees: 30,
      status: 'scheduled',
      materials: ['Slides', 'Code Examples', 'Practice Exercises'],
    },
    {
      id: 2,
      title: 'Advanced Hooks and Custom Hooks',
      date: '2024-02-22',
      time: '6:00 PM EST',
      duration: '90 minutes',
      attendees: 22,
      maxAttendees: 30,
      status: 'scheduled',
      materials: ['Slides', 'Live Coding', 'Q&A Session'],
    },
    {
      id: 3,
      title: 'Performance Optimization',
      date: '2024-02-25',
      time: '6:00 PM EST',
      duration: '90 minutes',
      attendees: 0,
      maxAttendees: 30,
      status: 'planning',
      materials: ['Slides', 'Performance Tools', 'Best Practices'],
    },
  ];

  const tabs = [
    { id: 'my-cohorts', name: 'My Cohorts', icon: UserGroupIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'students', name: 'Students', icon: UsersIcon },
    { id: 'sessions', name: 'Sessions', icon: CalendarIcon },
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
              <h1 className="text-3xl font-bold text-gray-900">
                Instructor Cohorts
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your learning cohorts and track student progress.
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
                <option>Revenue</option>
                <option>Progress</option>
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

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-gray-500">
                              Members
                            </span>
                            <div className="text-lg font-medium">
                              {cohort.members}/{cohort.maxMembers}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">
                              Progress
                            </span>
                            <div className="text-lg font-medium">
                              {cohort.progress}%
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">
                              Revenue
                            </span>
                            <div className="text-lg font-medium text-green-600">
                              {cohort.revenue}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">
                              Completion Rate
                            </span>
                            <div className="text-lg font-medium">
                              {cohort.completionRate}%
                            </div>
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
                                Next Session
                              </span>
                              <div className="text-sm font-medium">
                                {cohort.nextSession}
                              </div>
                              <div className="text-xs text-gray-500">
                                {cohort.time}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">
                                Average Score
                              </span>
                              <div className="text-sm font-medium">
                                {cohort.averageScore}%
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                              Manage Cohort
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <CogIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {cohortAnalytics.map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg ${metric.color}`}>
                          <metric.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm font-medium text-gray-600">
                            {metric.metric}
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {metric.value}
                          </p>
                          <div className="flex items-center mt-1">
                            <ChartBarIcon className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm font-medium text-green-600">
                              {metric.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Performance Trends
                  </h3>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                      Chart visualization would go here
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Progress
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assignments
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Attendance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {studentPerformance.map((student, index) => (
                        <motion.tr
                          key={student.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={student.avatar}
                                alt={student.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {student.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {student.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-900">
                                {student.progress}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {student.score}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {student.assignments}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {student.attendance}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                student.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <EyeIcon className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <EnvelopeIcon className="w-4 h-4" />
                              </button>
                              <button className="text-purple-600 hover:text-purple-900">
                                <PhoneIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'sessions' && (
              <div className="space-y-6">
                {upcomingSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
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
                              session.status === 'scheduled'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {session.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {session.attendees}/{session.maxAttendees} attendees
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {session.title}
                        </h3>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {session.date}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {session.time}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {session.duration}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {session.materials.map((material, materialIndex) => (
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
                          Edit Session
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <CogIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCohortPage;
