import {
  AcademicCapIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CogIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  StarIcon,
  TrashIcon,
  TrophyIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Notifications', icon: BellIcon },
    { id: 'course', name: 'Course Updates', icon: AcademicCapIcon },
    { id: 'message', name: 'Messages', icon: ChatBubbleLeftRightIcon },
    { id: 'achievement', name: 'Achievements', icon: TrophyIcon },
    { id: 'reminder', name: 'Reminders', icon: ClockIcon },
    { id: 'system', name: 'System', icon: CogIcon },
  ];

  const notifications = [
    {
      id: 1,
      title: 'New Course Available',
      message:
        'Advanced React Development course is now available for enrollment.',
      type: 'course',
      status: 'unread',
      timestamp: '2 hours ago',
      priority: 'high',
      icon: AcademicCapIcon,
      color: 'bg-blue-500',
      action: 'View Course',
      courseId: 1,
    },
    {
      id: 2,
      title: 'Message from Instructor',
      message:
        'Dr. Sarah Johnson sent you a message about your recent assignment.',
      type: 'message',
      status: 'unread',
      timestamp: '4 hours ago',
      priority: 'medium',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-green-500',
      action: 'View Message',
      messageId: 1,
    },
    {
      id: 3,
      title: 'Achievement Unlocked',
      message:
        'Congratulations! You\'ve earned the "First Course Completed" badge.',
      type: 'achievement',
      status: 'read',
      timestamp: '1 day ago',
      priority: 'low',
      icon: TrophyIcon,
      color: 'bg-yellow-500',
      action: 'View Achievement',
      achievementId: 1,
    },
    {
      id: 4,
      title: 'Learning Reminder',
      message:
        "Don't forget to continue your React course. You're on a 7-day streak!",
      type: 'reminder',
      status: 'read',
      timestamp: '2 days ago',
      priority: 'medium',
      icon: ClockIcon,
      color: 'bg-purple-500',
      action: 'Continue Learning',
      courseId: 1,
    },
    {
      id: 5,
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur on Sunday at 2:00 AM EST.',
      type: 'system',
      status: 'read',
      timestamp: '3 days ago',
      priority: 'low',
      icon: CogIcon,
      color: 'bg-gray-500',
      action: 'Learn More',
      maintenanceId: 1,
    },
    {
      id: 6,
      title: 'New Cohort Starting',
      message:
        'Machine Learning Fundamentals cohort starts next week. Join now!',
      type: 'course',
      status: 'unread',
      timestamp: '5 hours ago',
      priority: 'high',
      icon: UserGroupIcon,
      color: 'bg-orange-500',
      action: 'Join Cohort',
      cohortId: 2,
    },
  ];

  const notificationStats = [
    {
      id: 1,
      metric: 'Unread',
      value: '3',
      change: '+1',
      changeType: 'increase',
      icon: BellIcon,
      color: 'bg-red-500',
    },
    {
      id: 2,
      metric: 'Today',
      value: '5',
      change: '+2',
      changeType: 'increase',
      icon: CalendarIcon,
      color: 'bg-blue-500',
    },
    {
      id: 3,
      metric: 'This Week',
      value: '12',
      change: '+3',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'bg-green-500',
    },
    {
      id: 4,
      metric: 'Total',
      value: '156',
      change: '+8',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'bg-purple-500',
    },
  ];

  const tabs = [
    { id: 'all', name: 'All', icon: BellIcon },
    { id: 'unread', name: 'Unread', icon: EyeIcon },
    { id: 'important', name: 'Important', icon: StarIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon },
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || notification.type === selectedCategory;
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'unread' && notification.status === 'unread') ||
      (activeTab === 'important' && notification.priority === 'high');
    return matchesSearch && matchesCategory && matchesTab;
  });

  const markAsRead = (notificationId: number) => {
    // Handle mark as read
    console.log('Mark as read:', notificationId);
  };

  const deleteNotification = (notificationId: number) => {
    // Handle delete notification
    console.log('Delete notification:', notificationId);
  };

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
                Notifications
              </h1>
              <p className="text-gray-600 mt-2">
                Stay updated with your learning progress and important updates.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Mark All Read
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <CogIcon className="w-5 h-5 mr-2 inline" />
                Settings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {notificationStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.metric}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-1">
                    <ChartBarIcon className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
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
                <option>Priority</option>
                <option>Type</option>
                <option>Status</option>
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
            <div className="space-y-4">
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow ${
                    notification.status === 'unread' ? 'bg-blue-50' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${notification.color}`}>
                      <notification.icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            {notification.status === 'unread' && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                notification.priority === 'high'
                                  ? 'bg-red-100 text-red-800'
                                  : notification.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {notification.priority}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                notification.type === 'course'
                                  ? 'bg-blue-100 text-blue-800'
                                  : notification.type === 'message'
                                  ? 'bg-green-100 text-green-800'
                                  : notification.type === 'achievement'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : notification.type === 'reminder'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {notification.type}
                            </span>
                          </div>

                          <p className="text-gray-600 mb-3">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{notification.timestamp}</span>
                              <button className="text-blue-600 hover:text-blue-800 font-medium">
                                {notification.action}
                              </button>
                            </div>

                            <div className="flex items-center space-x-2">
                              {notification.status === 'unread' && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-gray-400 hover:text-blue-600 transition-colors"
                                  title="Mark as read"
                                >
                                  <EyeIcon className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                className="text-gray-400 hover:text-red-600 transition-colors"
                                title="Delete notification"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredNotifications.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <BellIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No notifications found
                  </h3>
                  <p className="text-gray-600">
                    {activeTab === 'unread'
                      ? "You're all caught up!"
                      : 'Try adjusting your filters.'}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
