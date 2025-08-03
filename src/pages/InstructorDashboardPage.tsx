import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  BookOpenIcon,
  ClockIcon,
  StarIcon,
  TrophyIcon,
  FireIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const InstructorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { name: 'Active Courses', value: '8', icon: BookOpenIcon, color: 'bg-blue-500', change: '+2 this month' },
    { name: 'Total Students', value: '1,247', icon: UserGroupIcon, color: 'bg-green-500', change: '+15% this week' },
    { name: 'Avg. Rating', value: '4.8/5', icon: StarIcon, color: 'bg-yellow-500', change: '+0.2 this month' },
    { name: 'Revenue', value: '$12,450', icon: TrophyIcon, color: 'bg-purple-500', change: '+23% this month' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Advanced React Development',
      students: 156,
      rating: 4.9,
      progress: 85,
      revenue: '$3,240',
      status: 'active',
      nextSession: 'Tomorrow, 2:00 PM'
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      students: 89,
      rating: 4.7,
      progress: 72,
      revenue: '$2,180',
      status: 'active',
      nextSession: 'Friday, 10:00 AM'
    },
    {
      id: 3,
      title: 'Data Science with Python',
      students: 203,
      rating: 4.8,
      progress: 95,
      revenue: '$4,560',
      status: 'active',
      nextSession: 'Today, 6:00 PM'
    }
  ];

  const recentStudents = [
    { name: 'Sarah Johnson', email: 'sarah@example.com', joined: '2 hours ago', course: 'React Development' },
    { name: 'Mike Chen', email: 'mike@example.com', joined: '4 hours ago', course: 'Machine Learning' },
    { name: 'Emily Rodriguez', email: 'emily@example.com', joined: '1 day ago', course: 'Data Science' },
    { name: 'David Kim', email: 'david@example.com', joined: '2 days ago', course: 'React Development' }
  ];

  const upcomingSessions = [
    {
      title: 'React Hooks Deep Dive',
      time: 'Today, 6:00 PM',
      students: 45,
      type: 'live'
    },
    {
      title: 'ML Model Deployment',
      time: 'Tomorrow, 2:00 PM',
      students: 32,
      type: 'workshop'
    },
    {
      title: 'Data Visualization',
      time: 'Friday, 10:00 AM',
      students: 28,
      type: 'tutorial'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'courses', name: 'Courses', icon: BookOpenIcon },
    { id: 'students', name: 'Students', icon: UserGroupIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'schedule', name: 'Schedule', icon: CalendarIcon }
  ];

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
                Instructor Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your courses, track student progress, and grow your teaching business.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="w-5 h-5 mr-2 inline" />
                Create Course
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <VideoCameraIcon className="w-5 h-5 mr-2 inline" />
                Start Live Session
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
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
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Courses */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Courses</h3>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{course.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>{course.students} students</span>
                            <span>⭐ {course.rating}</span>
                            <span className="text-green-600">{course.revenue}</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium text-gray-900">{course.progress}%</span>
                            </div>
                            <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Students & Upcoming Sessions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Students</h3>
                    <div className="space-y-3">
                      {recentStudents.map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.email}</p>
                            <p className="text-xs text-gray-500">{student.course}</p>
                          </div>
                          <span className="text-xs text-gray-500">{student.joined}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
                    <div className="space-y-3">
                      {upcomingSessions.map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <p className="font-medium text-gray-900">{session.title}</p>
                            <p className="text-sm text-gray-600">{session.time}</p>
                            <p className="text-xs text-gray-500">{session.students} students</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            session.type === 'live' ? 'bg-red-100 text-red-800' :
                            session.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {session.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">All Courses</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <PlusIcon className="w-5 h-5 mr-2 inline" />
                    Create New Course
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold text-gray-900">{course.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>📚 {course.students} students enrolled</p>
                        <p>⭐ {course.rating} average rating</p>
                        <p>💰 {course.revenue} revenue</p>
                        <p>📅 Next: {course.nextSession}</p>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700">
                          View Details
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Management</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentStudents.map((student, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                              </div>
                              <span className="text-sm text-gray-900">{Math.floor(Math.random() * 100)}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.joined}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-gray-600 hover:text-gray-900">Message</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Student Engagement</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Average Session Time</span>
                        <span className="text-sm font-medium">45 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Completion Rate</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Student Satisfaction</span>
                        <span className="text-sm font-medium">4.8/5</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Revenue Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Monthly Revenue</span>
                        <span className="text-sm font-medium">$12,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Growth Rate</span>
                        <span className="text-sm font-medium text-green-600">+23%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Average Course Price</span>
                        <span className="text-sm font-medium">$89</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Teaching Schedule</h3>
                <div className="space-y-4">
                  {upcomingSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          session.type === 'live' ? 'bg-red-100' :
                          session.type === 'workshop' ? 'bg-blue-100' :
                          'bg-green-100'
                        }`}>
                          <VideoCameraIcon className={`w-6 h-6 ${
                            session.type === 'live' ? 'text-red-600' :
                            session.type === 'workshop' ? 'text-blue-600' :
                            'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{session.title}</h4>
                          <p className="text-sm text-gray-600">{session.time}</p>
                          <p className="text-xs text-gray-500">{session.students} students registered</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                          Start Session
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50">
                          Edit
                        </button>
                      </div>
                    </div>
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

export default InstructorDashboardPage; 