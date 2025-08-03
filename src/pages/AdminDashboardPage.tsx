import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { Badge } from '../components/ui/Badge';

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'users', name: 'Users', icon: UserGroupIcon },
    { id: 'courses', name: 'Courses', icon: BookOpenIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'system', name: 'System', icon: Cog6ToothIcon },
  ];

  const stats = [
    { name: 'Total Users', value: '12,847', icon: UserGroupIcon, color: 'text-primary-600', bgColor: 'bg-primary-50', change: '+12%' },
    { name: 'Active Courses', value: '156', icon: BookOpenIcon, color: 'text-secondary-600', bgColor: 'bg-secondary-50', change: '+8%' },
    { name: 'Monthly Revenue', value: '$45,230', icon: CurrencyDollarIcon, color: 'text-success-600', bgColor: 'bg-success-50', change: '+23%' },
    { name: 'System Health', value: '99.9%', icon: ShieldCheckIcon, color: 'text-warning-600', bgColor: 'bg-warning-50', change: 'Stable' },
  ];

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'student',
      status: 'active',
      joinedDate: '2024-01-15',
      lastLogin: '2024-01-20',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      email: 'sarah@example.com',
      role: 'instructor',
      status: 'active',
      joinedDate: '2024-01-10',
      lastLogin: '2024-01-20',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    },
    {
      id: 3,
      name: 'Enterprise Manager',
      email: 'enterprise@example.com',
      role: 'enterprise',
      status: 'active',
      joinedDate: '2024-01-05',
      lastLogin: '2024-01-19',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    },
    {
      id: 4,
      name: 'Suspended User',
      email: 'suspended@example.com',
      role: 'student',
      status: 'suspended',
      joinedDate: '2024-01-01',
      lastLogin: '2024-01-15',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    },
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete React Developer Course 2024',
      instructor: 'Dr. Sarah Johnson',
      status: 'published',
      students: 1247,
      revenue: 28450,
      rating: 4.8,
      category: 'Programming',
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      instructor: 'Prof. Michael Chen',
      status: 'published',
      students: 892,
      revenue: 15680,
      rating: 4.9,
      category: 'Programming',
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Alex Thompson',
      status: 'pending',
      students: 0,
      revenue: 0,
      rating: 0,
      category: 'Data Science',
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High CPU Usage',
      message: 'Server CPU usage is at 85%',
      time: '2 minutes ago',
    },
    {
      id: 2,
      type: 'info',
      title: 'Backup Completed',
      message: 'Daily backup completed successfully',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'error',
      title: 'Payment Gateway Issue',
      message: 'Stripe API connection timeout',
      time: '3 hours ago',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'suspended': return 'destructive';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircleIcon;
      case 'suspended': return XCircleIcon;
      case 'pending': return ExclamationTriangleIcon;
      default: return EyeIcon;
    }
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
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Platform overview and system management
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn btn-outline">
                <GlobeAltIcon className="w-4 h-4" />
                System Status
              </button>
              <button className="btn btn-primary">
                <PlusIcon className="w-4 h-4" />
                Add User
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
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between">
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
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    stat.change.includes('+') ? 'text-success-600' : 
                    stat.change.includes('-') ? 'text-error-600' : 
                    'text-gray-600 dark:text-gray-400'
                  }`}>
                    {stat.change}
                  </span>
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
              {/* System Alerts */}
              <div className="lg:col-span-2">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    System Alerts
                  </h3>
                  <div className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className={`p-2 rounded-full ${
                          alert.type === 'error' ? 'bg-error-100 text-error-600' :
                          alert.type === 'warning' ? 'bg-warning-100 text-warning-600' :
                          'bg-success-100 text-success-600'
                        }`}>
                          {alert.type === 'error' ? <XCircleIcon className="w-4 h-4" /> :
                           alert.type === 'warning' ? <ExclamationTriangleIcon className="w-4 h-4" /> :
                           <CheckCircleIcon className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {alert.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {alert.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full btn btn-outline justify-start">
                    <UserGroupIcon className="w-4 h-4 mr-2" />
                    Manage Users
                  </button>
                  <button className="w-full btn btn-outline justify-start">
                    <BookOpenIcon className="w-4 h-4 mr-2" />
                    Review Courses
                  </button>
                  <button className="w-full btn btn-outline justify-start">
                    <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                    View Revenue
                  </button>
                  <button className="w-full btn btn-outline justify-start">
                    <Cog6ToothIcon className="w-4 h-4 mr-2" />
                    System Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  User Management
                </h3>
                <button className="btn btn-primary flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>Add User</span>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Joined</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Last Login</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      const StatusIcon = getStatusIcon(user.status);
                      return (
                        <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <StatusIcon className={`w-4 h-4 ${
                                user.status === 'active' ? 'text-success-600' :
                                user.status === 'suspended' ? 'text-error-600' :
                                'text-warning-600'
                              }`} />
                              <Badge variant={getStatusColor(user.status) as any}>
                                {user.status}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {new Date(user.joinedDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-primary-600">
                                <EyeIcon className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-warning-600">
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-error-600">
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Course Management
                </h3>
                <button className="btn btn-primary flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>Add Course</span>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Course</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Instructor</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Students</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Rating</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{course.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{course.category}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {course.instructor}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={course.status === 'published' ? 'success' : 'warning'}>
                            {course.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {course.students}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                          ${course.revenue}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm">{course.rating}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-primary-600">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-warning-600">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-error-600">
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
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
                  Platform Analytics
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Users</span>
                    <span className="font-bold text-gray-900 dark:text-white">12,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Active Courses</span>
                    <span className="font-bold text-gray-900 dark:text-white">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Monthly Revenue</span>
                    <span className="font-bold text-gray-900 dark:text-white">$45,230</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Avg Course Rating</span>
                    <span className="font-bold text-gray-900 dark:text-white">4.7</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  User Growth
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">New Users</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">This month</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">1,234</div>
                      <div className="text-sm text-success-600">+12%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Active Users</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Last 30 days</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">8,456</div>
                      <div className="text-sm text-success-600">+8%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  System Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-success-50 dark:bg-success-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-success-600" />
                      <span className="font-medium text-gray-900 dark:text-white">API Services</span>
                    </div>
                    <Badge variant="success">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-success-50 dark:bg-success-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-success-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Database</span>
                    </div>
                    <Badge variant="success">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-warning-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Payment Gateway</span>
                    </div>
                    <Badge variant="warning">Degraded</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-success-50 dark:bg-success-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-success-600" />
                      <span className="font-medium text-gray-900 dark:text-white">CDN</span>
                    </div>
                    <Badge variant="success">Operational</Badge>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  System Settings
                </h3>
                <div className="space-y-4">
                  <button className="w-full btn btn-outline justify-start">
                    <Cog6ToothIcon className="w-4 h-4 mr-2" />
                    General Settings
                  </button>
                  <button className="w-full btn btn-outline justify-start">
                    <ShieldCheckIcon className="w-4 h-4 mr-2" />
                    Security Settings
                  </button>
                  <button className="w-full btn btn-outline justify-start">
                    <GlobeAltIcon className="w-4 h-4 mr-2" />
                    Domain Settings
                  </button>
                  <button className="w-full btn btn-outline justify-start">
                    <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                    Payment Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 