import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BuildingOfficeIcon, 
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
  CalendarIcon,
  CogIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const EnterpriseDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { name: 'Total Employees', value: '2,847', icon: UserGroupIcon, color: 'bg-blue-500', change: '+12 this month' },
    { name: 'Active Courses', value: '156', icon: BookOpenIcon, color: 'bg-green-500', change: '+8 this week' },
    { name: 'Training Hours', value: '12,450', icon: ClockIcon, color: 'bg-orange-500', change: '+15% this month' },
    { name: 'Cost Savings', value: '$245K', icon: CurrencyDollarIcon, color: 'bg-purple-500', change: '+32% this quarter' }
  ];

  const departments = [
    {
      name: 'Engineering',
      employees: 456,
      courses: 23,
      completion: 89,
      budget: '$45,000',
      manager: 'Sarah Johnson'
    },
    {
      name: 'Sales',
      employees: 234,
      courses: 18,
      completion: 92,
      budget: '$32,000',
      manager: 'Mike Chen'
    },
    {
      name: 'Marketing',
      employees: 189,
      courses: 15,
      completion: 85,
      budget: '$28,000',
      manager: 'Emily Rodriguez'
    },
    {
      name: 'HR',
      employees: 67,
      courses: 12,
      completion: 78,
      budget: '$15,000',
      manager: 'David Kim'
    }
  ];

  const recentActivities = [
    { 
      type: 'course_completed', 
      user: 'Alex Thompson', 
      department: 'Engineering', 
      course: 'Advanced React Development',
      time: '2 hours ago'
    },
    { 
      type: 'certification_earned', 
      user: 'Maria Garcia', 
      department: 'Sales', 
      course: 'Sales Leadership',
      time: '4 hours ago'
    },
    { 
      type: 'team_created', 
      user: 'John Smith', 
      department: 'Marketing', 
      course: 'Digital Marketing',
      time: '1 day ago'
    },
    { 
      type: 'budget_allocated', 
      user: 'Lisa Wang', 
      department: 'HR', 
      course: 'Employee Training',
      time: '2 days ago'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Leadership Training Workshop',
      time: 'Today, 2:00 PM',
      attendees: 45,
      type: 'workshop',
      department: 'All Departments'
    },
    {
      title: 'Technical Skills Assessment',
      time: 'Tomorrow, 10:00 AM',
      attendees: 128,
      type: 'assessment',
      department: 'Engineering'
    },
    {
      title: 'Sales Training Session',
      time: 'Friday, 3:00 PM',
      attendees: 67,
      type: 'training',
      department: 'Sales'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'departments', name: 'Departments', icon: BuildingOfficeIcon },
    { id: 'employees', name: 'Employees', icon: UserGroupIcon },
    { id: 'training', name: 'Training', icon: AcademicCapIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon }
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
                Enterprise Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your organization's learning and development programs.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="w-5 h-5 mr-2 inline" />
                Add Department
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <CogIcon className="w-5 h-5 mr-2 inline" />
                Settings
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
                {/* Department Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
                  <div className="space-y-4">
                    {departments.map((dept) => (
                      <div key={dept.name} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                          <span className="text-sm text-gray-600">{dept.employees} employees</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Courses</p>
                            <p className="font-medium">{dept.courses}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Completion</p>
                            <p className="font-medium">{dept.completion}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Budget</p>
                            <p className="font-medium">{dept.budget}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500">Manager: {dept.manager}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities & Upcoming Events */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                    <div className="space-y-3">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                          <div className={`p-2 rounded-lg ${
                            activity.type === 'course_completed' ? 'bg-green-100' :
                            activity.type === 'certification_earned' ? 'bg-blue-100' :
                            activity.type === 'team_created' ? 'bg-purple-100' :
                            'bg-orange-100'
                          }`}>
                            <AcademicCapIcon className={`w-4 h-4 ${
                              activity.type === 'course_completed' ? 'text-green-600' :
                              activity.type === 'certification_earned' ? 'text-blue-600' :
                              activity.type === 'team_created' ? 'text-purple-600' :
                              'text-orange-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                            <p className="text-xs text-gray-600">{activity.course} • {activity.department}</p>
                          </div>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                    <div className="space-y-3">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <p className="font-medium text-gray-900">{event.title}</p>
                            <p className="text-sm text-gray-600">{event.time}</p>
                            <p className="text-xs text-gray-500">{event.department} • {event.attendees} attendees</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                            event.type === 'assessment' ? 'bg-red-100 text-red-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {event.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'departments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Department Management</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <PlusIcon className="w-5 h-5 mr-2 inline" />
                    Add Department
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {departments.map((dept) => (
                        <tr key={dept.name}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.employees}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.courses}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${dept.completion}%` }}></div>
                              </div>
                              <span className="text-sm text-gray-900">{dept.completion}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.budget}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.manager}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-gray-600 hover:text-gray-900">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'employees' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Employee Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Employees</span>
                        <span className="text-sm font-medium">2,847</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Learners</span>
                        <span className="text-sm font-medium">2,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Certifications Earned</span>
                        <span className="text-sm font-medium">1,567</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Learning Progress</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Average Completion</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Training Hours</span>
                        <span className="text-sm font-medium">12,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Skills Improved</span>
                        <span className="text-sm font-medium">156</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Productivity Increase</span>
                        <span className="text-sm font-medium text-green-600">+23%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Cost Savings</span>
                        <span className="text-sm font-medium">$245K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">ROI</span>
                        <span className="text-sm font-medium text-green-600">312%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'training' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Programs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Leadership Development</h4>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">Advanced leadership skills for managers and executives</p>
                      <div className="flex justify-between text-sm">
                        <span>Enrolled</span>
                        <span className="font-medium">234</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Completion</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700">
                        View Program
                      </button>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Technical Skills</h4>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">Programming, data science, and technical certifications</p>
                      <div className="flex justify-between text-sm">
                        <span>Enrolled</span>
                        <span className="font-medium">1,567</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Completion</span>
                        <span className="font-medium">76%</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700">
                        View Program
                      </button>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Soft Skills</h4>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">Communication, teamwork, and professional development</p>
                      <div className="flex justify-between text-sm">
                        <span>Enrolled</span>
                        <span className="font-medium">892</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Completion</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700">
                        View Program
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enterprise Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Learning ROI</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Investment</span>
                        <span className="text-sm font-medium">$78,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Savings</span>
                        <span className="text-sm font-medium">$245,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">ROI</span>
                        <span className="text-sm font-medium text-green-600">312%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Employee Engagement</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Participation Rate</span>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Satisfaction Score</span>
                        <span className="text-sm font-medium">4.7/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Retention Impact</span>
                        <span className="text-sm font-medium text-green-600">+18%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enterprise Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Security & Compliance</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">SSO Integration</span>
                        <span className="text-sm text-green-600">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Data Encryption</span>
                        <span className="text-sm text-green-600">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">GDPR Compliance</span>
                        <span className="text-sm text-green-600">Compliant</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Integration Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">HR System</span>
                        <span className="text-sm text-green-600">Connected</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">LMS Integration</span>
                        <span className="text-sm text-green-600">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Analytics Platform</span>
                        <span className="text-sm text-green-600">Connected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDashboardPage; 