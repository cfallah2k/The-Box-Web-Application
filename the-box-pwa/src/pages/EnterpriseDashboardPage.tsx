import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  BuildingOfficeIcon,
  UserPlusIcon,
  Cog6ToothIcon,
  AcademicCapIcon,
  TrendingUpIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import ProgressRing from '@/components/ui/ProgressRing';
import { Badge } from '@/components/ui/Badge';

const EnterpriseDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'team', name: 'Team Management', icon: UserGroupIcon },
    { id: 'learning', name: 'Learning Analytics', icon: AcademicCapIcon },
    { id: 'courses', name: 'Course Access', icon: BookOpenIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
  ];

  const stats = [
    { name: 'Team Members', value: '47', icon: UserGroupIcon, color: 'text-primary-600', bgColor: 'bg-primary-50', change: '+3' },
    { name: 'Active Learners', value: '42', icon: AcademicCapIcon, color: 'text-secondary-600', bgColor: 'bg-secondary-50', change: '+8' },
    { name: 'Courses Completed', value: '156', icon: BookOpenIcon, color: 'text-success-600', bgColor: 'bg-success-50', change: '+12' },
    { name: 'Avg Progress', value: '78%', icon: TrendingUpIcon, color: 'text-warning-600', bgColor: 'bg-warning-50', change: '+5%' },
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Manager',
      department: 'Engineering',
      status: 'active',
      progress: 85,
      coursesEnrolled: 8,
      coursesCompleted: 6,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'Developer',
      department: 'Engineering',
      status: 'active',
      progress: 92,
      coursesEnrolled: 12,
      coursesCompleted: 10,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@company.com',
      role: 'Designer',
      department: 'Design',
      status: 'active',
      progress: 67,
      coursesEnrolled: 5,
      coursesCompleted: 3,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'Product Manager',
      department: 'Product',
      status: 'inactive',
      progress: 45,
      coursesEnrolled: 3,
      coursesCompleted: 1,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    },
  ];

  const departments = [
    { name: 'Engineering', members: 18, avgProgress: 82, coursesCompleted: 89 },
    { name: 'Design', members: 8, avgProgress: 75, coursesCompleted: 34 },
    { name: 'Product', members: 12, avgProgress: 68, coursesCompleted: 45 },
    { name: 'Marketing', members: 9, avgProgress: 71, coursesCompleted: 28 },
  ];

  const popularCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Dr. Sarah Johnson',
      enrolled: 15,
      completed: 12,
      avgRating: 4.8,
      category: 'Programming',
    },
    {
      id: 2,
      title: 'UX Design Fundamentals',
      instructor: 'Emma Wilson',
      enrolled: 12,
      completed: 8,
      avgRating: 4.6,
      category: 'Design',
    },
    {
      id: 3,
      title: 'Product Management Essentials',
      instructor: 'David Kim',
      enrolled: 10,
      completed: 7,
      avgRating: 4.7,
      category: 'Business',
    },
  ];

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
                Enterprise Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {user?.name}! Here's your team's learning overview.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn btn-outline">
                <GlobeAltIcon className="w-4 h-4" />
                Brand Settings
              </button>
              <button className="btn btn-primary">
                <UserPlusIcon className="w-4 h-4" />
                Invite Team Member
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
                  <span className="text-sm font-medium text-success-600">
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
              {/* Team Overview */}
              <div className="lg:col-span-2">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Team Learning Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {departments.map((dept) => (
                      <div key={dept.name} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">{dept.name}</h4>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{dept.members} members</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</span>
                            <span className="font-medium text-gray-900 dark:text-white">{dept.avgProgress}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div
                              className="h-2 bg-primary-600 rounded-full"
                              style={{ width: `${dept.avgProgress}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Courses Completed</span>
                            <span className="font-medium text-gray-900 dark:text-white">{dept.coursesCompleted}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Quick Stats
                </h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <ProgressRing progress={78} size={80} />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Overall Team Progress</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Active Learners</span>
                      <span className="font-bold text-gray-900 dark:text-white">42/47</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Avg Completion Rate</span>
                      <span className="font-bold text-gray-900 dark:text-white">78%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Hours Learned</span>
                      <span className="font-bold text-gray-900 dark:text-white">1,247</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Team Management
                </h3>
                <button className="btn btn-primary flex items-center space-x-2">
                  <UserPlusIcon className="w-4 h-4" />
                  <span>Invite Member</span>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Member</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Department</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Progress</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Courses</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{member.role}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {member.department}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                              <div
                                className="h-2 bg-primary-600 rounded-full"
                                style={{ width: `${member.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{member.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {member.coursesCompleted}/{member.coursesEnrolled}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={member.status === 'active' ? 'success' : 'secondary'}>
                            {member.status}
                          </Badge>
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

          {activeTab === 'learning' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Learning Analytics
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Total Learning Hours</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">This month</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">1,247</div>
                      <div className="text-sm text-success-600">+15%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Course Completion Rate</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Team average</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">78%</div>
                      <div className="text-sm text-success-600">+5%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Certificates Earned</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">This quarter</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">89</div>
                      <div className="text-sm text-success-600">+12</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Department Performance
                </h3>
                <div className="space-y-4">
                  {departments.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{dept.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{dept.members} members</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {dept.avgProgress}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {dept.coursesCompleted} courses
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
                  Course Access & Analytics
                </h3>
                <button className="btn btn-primary flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>Add Course</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularCourses.map((course) => (
                  <div key={course.id} className="card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline">{course.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{course.avgRating}</span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {course.instructor}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Enrolled</span>
                        <span className="font-medium">{course.enrolled}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Completed</span>
                        <span className="font-medium">{course.completed}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
                        <span className="font-medium">{Math.round((course.completed / course.enrolled) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Enterprise Settings
                </h3>
                <div className="space-y-4">
                  <button className="w-full btn btn-outline justify-start">
                    <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                    Company Profile
                  </button>
                  <button className="w-full btn btn-outline justify-start">
                    <UserGroupIcon className="w-4 h-4 mr-2" />
                    Team Management
                  </button>
                  <button className="w-full btn btn-outline justify-start">
                    <GlobeAltIcon className="w-4 h-4 mr-2" />
                    Branding & Customization
                  </button>
                  <button className="w-full btn btn-outline justify-start">
                    <Cog6ToothIcon className="w-4 h-4 mr-2" />
                    Learning Settings
                  </button>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Subscription & Billing
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Current Plan</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise</p>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Team Members</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">47/50</p>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">94%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Monthly Cost</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">$2,500/month</p>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EnterpriseDashboardPage; 