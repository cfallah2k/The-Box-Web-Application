import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  AcademicCapIcon,
  TrophyIcon,
  StarIcon,
  ClockIcon,
  BookOpenIcon,
  CogIcon,
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
  CameraIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'achievements', name: 'Achievements', icon: TrophyIcon },
    { id: 'learning', name: 'Learning History', icon: BookOpenIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Course Completed',
      description: 'Completed your first course on the platform',
      icon: '🎓',
      date: '2024-01-15',
      points: 100
    },
    {
      id: 2,
      title: 'Learning Streak',
      description: 'Maintained a 7-day learning streak',
      icon: '🔥',
      date: '2024-01-20',
      points: 250
    },
    {
      id: 3,
      title: 'Perfect Score',
      description: 'Achieved 100% on a course assessment',
      icon: '⭐',
      date: '2024-01-25',
      points: 500
    },
    {
      id: 4,
      title: 'Community Helper',
      description: 'Helped 10 other learners in the community',
      icon: '🤝',
      date: '2024-02-01',
      points: 300
    }
  ];

  const learningHistory = [
    {
      id: 1,
      course: 'Advanced React Development',
      progress: 75,
      lastAccessed: '2 hours ago',
      nextLesson: 'State Management with Redux',
      instructor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      course: 'Machine Learning Fundamentals',
      progress: 45,
      lastAccessed: '1 day ago',
      nextLesson: 'Neural Networks Basics',
      instructor: 'Prof. Michael Chen'
    },
    {
      id: 3,
      course: 'Data Science with Python',
      progress: 90,
      lastAccessed: '3 days ago',
      nextLesson: 'Final Project Submission',
      instructor: 'Dr. Emily Rodriguez'
    }
  ];

  const stats = [
    { name: 'Courses Enrolled', value: '12', icon: BookOpenIcon },
    { name: 'Courses Completed', value: '8', icon: AcademicCapIcon },
    { name: 'Learning Hours', value: '156', icon: ClockIcon },
    { name: 'Achievement Points', value: '2,450', icon: StarIcon }
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
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and view your learning progress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <CameraIcon className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mt-4">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                  user?.role === 'student' ? 'bg-blue-100 text-blue-800' :
                  user?.role === 'instructor' ? 'bg-green-100 text-green-800' :
                  user?.role === 'admin' ? 'bg-red-100 text-red-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                {stats.map((stat) => (
                  <div key={stat.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <stat.icon className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{stat.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <PencilIcon className="w-4 h-4 mr-2 inline" />
                Edit Profile
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Tabs */}
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
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            defaultValue={user?.name}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue={user?.email}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                          <input
                            type="text"
                            placeholder="City, Country"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Bio</h3>
                      <textarea
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'JavaScript', 'Python', 'Machine Learning'].map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                        <button className="px-3 py-1 border border-gray-300 text-gray-600 rounded-full text-sm hover:bg-gray-50">
                          + Add Skill
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{achievement.icon}</span>
                              <div>
                                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                                <p className="text-sm text-gray-600">{achievement.description}</p>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-blue-600">+{achievement.points} pts</span>
                          </div>
                          <div className="text-xs text-gray-500">{achievement.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'learning' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning History</h3>
                    <div className="space-y-4">
                      {learningHistory.map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">{course.course}</h4>
                            <span className="text-sm text-gray-500">by {course.instructor}</span>
                          </div>
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Next: {course.nextLesson}</span>
                            <span>Last accessed: {course.lastAccessed}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <BellIcon className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                              <h4 className="font-medium text-gray-900">Email Notifications</h4>
                              <p className="text-sm text-gray-600">Receive updates about your courses</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <GlobeAltIcon className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                              <h4 className="font-medium text-gray-900">Public Profile</h4>
                              <p className="text-sm text-gray-600">Allow others to see your profile</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <ShieldCheckIcon className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                              <p className="text-sm text-gray-600">Add an extra layer of security</p>
                            </div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h3>
                      <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
                        <p className="text-sm text-red-700 mb-3">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 