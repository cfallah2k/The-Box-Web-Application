import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpenIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  TrendingUpIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import ProgressRing from '@/components/ui/ProgressRing';
import { Badge } from '@/components/ui/Badge';

const InstructorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'courses', name: 'My Courses', icon: BookOpenIcon },
    { id: 'cohorts', name: 'My Cohorts', icon: UserGroupIcon },
    { id: 'students', name: 'Students', icon: UserGroupIcon },
    { id: 'analytics', name: 'Analytics', icon: TrendingUpIcon },
    { id: 'earnings', name: 'Earnings', icon: CurrencyDollarIcon },
  ];

  const stats = [
    { name: 'Total Courses', value: '8', icon: BookOpenIcon, color: 'text-primary-600', bgColor: 'bg-primary-50' },
    { name: 'Active Students', value: '1,247', icon: UserGroupIcon, color: 'text-secondary-600', bgColor: 'bg-secondary-50' },
    { name: 'Total Revenue', value: '$12,450', icon: CurrencyDollarIcon, color: 'text-success-600', bgColor: 'bg-success-50' },
    { name: 'Avg Rating', value: '4.8', icon: StarIcon, color: 'text-warning-600', bgColor: 'bg-warning-50' },
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete React Developer Course 2024',
      students: 1247,
      revenue: 28450,
      rating: 4.8,
      status: 'published',
      lastUpdated: '2024-01-15',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      students: 892,
      revenue: 15680,
      rating: 4.9,
      status: 'published',
      lastUpdated: '2024-01-10',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      students: 567,
      revenue: 10240,
      rating: 4.7,
      status: 'draft',
      lastUpdated: '2024-01-05',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
    },
  ];

  const cohorts = [
    {
      id: 1,
      name: 'React Mastery 2024',
      enrolledStudents: 24,
      maxStudents: 30,
      revenue: 7200,
      rating: 4.8,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Advanced TypeScript Patterns',
      enrolledStudents: 0,
      maxStudents: 25,
      revenue: 0,
      rating: 0,
      status: 'draft',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Node.js Backend Development',
      enrolledStudents: 20,
      maxStudents: 20,
      revenue: 6000,
      rating: 4.7,
      status: 'completed',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
    },
  ];

  const recentStudents = [
    {
      id: 1,
      name: 'Alex Chen',
      email: 'alex@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      course: 'Complete React Developer Course 2024',
      progress: 85,
      joinedDate: '2024-01-20',
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      email: 'maria@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      course: 'Advanced TypeScript Patterns',
      progress: 62,
      joinedDate: '2024-01-18',
    },
    {
      id: 3,
      name: 'David Kim',
      email: 'david@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      course: 'Complete React Developer Course 2024',
      progress: 45,
      joinedDate: '2024-01-15',
    },
  ];

  const earnings = {
    thisMonth: 2840,
    lastMonth: 2150,
    total: 12450,
    growth: 32,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Instructor Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {user?.name}! Here's your teaching overview.
              </p>
            </div>
            <button className="btn btn-primary flex items-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>Create Course</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="card p-6 mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Earnings Overview */}
              <div className="lg:col-span-2">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Earnings Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                      <CurrencyDollarIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${earnings.thisMonth}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        This Month
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                      <TrendingUpIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        +{earnings.growth}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Growth
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                      <AcademicCapIcon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${earnings.total}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Earnings
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Students */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Recent Students
                </h3>
                <div className="space-y-4">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="flex items-center space-x-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {student.course}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {student.progress}%
                        </div>
                        <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                          <div
                            className="h-1 bg-primary-600 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  My Courses
                </h3>
                <button className="btn btn-primary flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>Create New Course</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="card overflow-hidden">
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-32 object-cover"
                      />
                      <Badge 
                        variant={course.status === 'published' ? 'success' : 'secondary'}
                        className="absolute top-2 left-2"
                      >
                        {course.status}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {course.title}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Students</span>
                          <span className="font-medium">{course.students}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Revenue</span>
                          <span className="font-medium">${course.revenue}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Rating</span>
                          <div className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="font-medium">{course.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-4">
                        <button className="flex-1 btn btn-outline btn-sm">
                          <EyeIcon className="w-4 h-4" />
                          View
                        </button>
                        <button className="flex-1 btn btn-outline btn-sm">
                          <PencilIcon className="w-4 h-4" />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cohorts' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  My Cohorts
                </h3>
                <button className="btn btn-primary flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>Create New Cohort</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cohorts.map((cohort) => (
                  <div key={cohort.id} className="card overflow-hidden">
                    <div className="relative">
                      <img
                        src={cohort.thumbnail}
                        alt={cohort.name}
                        className="w-full h-32 object-cover"
                      />
                      <Badge 
                        variant={cohort.status === 'active' ? 'success' : 'secondary'}
                        className="absolute top-2 left-2"
                      >
                        {cohort.status}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {cohort.name}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Students</span>
                          <span className="font-medium">{cohort.enrolledStudents}/{cohort.maxStudents}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Revenue</span>
                          <span className="font-medium">${cohort.revenue}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Rating</span>
                          <div className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="font-medium">{cohort.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-4">
                        <button className="flex-1 btn btn-outline btn-sm">
                          <EyeIcon className="w-4 h-4" />
                          View
                        </button>
                        <button className="flex-1 btn btn-outline btn-sm">
                          <PencilIcon className="w-4 h-4" />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Student Management
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Student</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Course</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Progress</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Joined</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {student.course}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                              <div
                                className="h-2 bg-primary-600 rounded-full"
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {new Date(student.joinedDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Course Performance
                </h3>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{course.students} students</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          ${course.revenue}
                        </div>
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Monthly Overview
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Revenue</span>
                    <span className="font-bold text-gray-900 dark:text-white">${earnings.total}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">This Month</span>
                    <span className="font-bold text-gray-900 dark:text-white">${earnings.thisMonth}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Growth</span>
                    <span className="font-bold text-success-600">+{earnings.growth}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Active Students</span>
                    <span className="font-bold text-gray-900 dark:text-white">1,247</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Earnings Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                  <CurrencyDollarIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ${earnings.thisMonth}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">This Month</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                  <TrendingUpIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    +{earnings.growth}%
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Growth Rate</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <AcademicCapIcon className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ${earnings.total}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Total Earnings</p>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Course</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Students</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                          {course.title}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {course.students}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                          ${course.revenue}
                        </td>
                        <td className="py-3 px-4 font-medium text-success-600">
                          ${Math.round(course.revenue * 0.7)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default InstructorDashboardPage; 