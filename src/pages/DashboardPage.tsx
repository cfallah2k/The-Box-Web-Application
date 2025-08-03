import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  BookOpenIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  ClockIcon,
  StarIcon,
  TrophyIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { name: 'Courses Enrolled', value: '12', icon: BookOpenIcon, color: 'bg-blue-500' },
    { name: 'Learning Streak', value: '7 days', icon: FireIcon, color: 'bg-orange-500' },
    { name: 'Points Earned', value: '2,450', icon: StarIcon, color: 'bg-yellow-500' },
    { name: 'Achievements', value: '8', icon: TrophyIcon, color: 'bg-purple-500' }
  ];

  const recentCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      nextLesson: 'State Management with Redux',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      instructor: 'Prof. Michael Chen',
      progress: 45,
      nextLesson: 'Neural Networks Basics',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=400'
    },
    {
      id: 3,
      title: 'Data Science with Python',
      instructor: 'Dr. Emily Rodriguez',
      progress: 90,
      nextLesson: 'Final Project Submission',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400'
    }
  ];

  const upcomingEvents = [
    {
      title: 'AI Tutor Session',
      time: '2:00 PM',
      type: 'session'
    },
    {
      title: 'Cohort Meeting',
      time: '4:30 PM',
      type: 'meeting'
    },
    {
      title: 'Assignment Due',
      time: '11:59 PM',
      type: 'deadline'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your learning journey with personalized recommendations and progress tracking.
          </p>
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
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Courses</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">by {course.instructor}</p>
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
                        <p className="text-xs text-gray-500 mt-2">
                          Next: {course.nextLesson}
                        </p>
                      </div>
                      <Link
                        to={`/courses/${course.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Continue →
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    to="/courses"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all courses →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions & Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <Link
                    to="/ai-tutor"
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <AcademicCapIcon className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900">Start AI Tutor Session</span>
                  </Link>
                  <Link
                    to="/cohorts"
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-colors"
                  >
                    <UserGroupIcon className="w-5 h-5 text-green-600 mr-3" />
                    <span className="font-medium text-gray-900">Join Cohort</span>
                  </Link>
                  <Link
                    to="/analytics"
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                  >
                    <ChartBarIcon className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="font-medium text-gray-900">View Analytics</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <ClockIcon className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-600">{event.time}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.type === 'session' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'meeting' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 