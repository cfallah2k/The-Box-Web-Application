import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  CalendarIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
  ];

  const achievements = [
    { name: 'First Course Completed', icon: '🎓', date: '2024-01-15' },
    { name: '5-Day Streak', icon: '🔥', date: '2024-01-20' },
    { name: 'Perfect Score', icon: '⭐', date: '2024-01-25' },
    { name: 'Community Helper', icon: '🤝', date: '2024-02-01' },
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Profile & Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Profile Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Full Name</label>
                      <input
                        type="text"
                        className="input"
                        defaultValue={user?.name}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="label">Email Address</label>
                      <input
                        type="email"
                        className="input"
                        defaultValue={user?.email}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="label">Role</label>
                      <select className="input" defaultValue={user?.role}>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Subscription</label>
                      <select className="input" defaultValue={user?.subscription}>
                        <option value="basic">Basic</option>
                        <option value="pro">Pro</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="btn btn-primary">Save Changes</button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Preferences
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Switch between light and dark themes
                        </p>
                      </div>
                      <select
                        className="input w-32"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Language</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Choose your preferred language
                        </p>
                      </div>
                      <select className="input w-32">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Time Zone</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Set your local time zone
                        </p>
                      </div>
                      <select className="input w-48">
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">UTC</option>
                        <option value="UTC+1">Central European Time (UTC+1)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    {[
                      { name: 'Course Updates', description: 'Get notified about new content and updates' },
                      { name: 'Achievement Alerts', description: 'Receive notifications for your achievements' },
                      { name: 'Study Reminders', description: 'Get daily study reminders' },
                      { name: 'Community Messages', description: 'Notifications from the community' },
                      { name: 'Email Notifications', description: 'Receive important updates via email' },
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{setting.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Change Password</h3>
                      <div className="space-y-3">
                        <input type="password" className="input" placeholder="Current password" />
                        <input type="password" className="input" placeholder="New password" />
                        <input type="password" className="input" placeholder="Confirm new password" />
                      </div>
                      <button className="btn btn-primary mt-3">Update Password</button>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Add an extra layer of security to your account
                      </p>
                      <button className="btn btn-outline">Enable 2FA</button>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Active Sessions</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Manage your active login sessions
                      </p>
                      <button className="btn btn-outline text-error-600 border-error-300 hover:bg-error-50">
                        Sign Out All Devices
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 mt-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <StarIcon className="w-5 h-5 mr-2" />
                Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{achievement.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 