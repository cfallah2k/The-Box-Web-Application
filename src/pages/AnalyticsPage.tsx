import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  ArrowTrendingDownIcon,
  BeakerIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  FireIcon,
  HeartIcon,
  TrophyIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const metrics = [
    {
      name: 'Total Learning Hours',
      value: '156',
      change: '+12%',
      changeType: 'increase',
      icon: ClockIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Courses Completed',
      value: '8',
      change: '+2',
      changeType: 'increase',
      icon: AcademicCapIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Achievement Points',
      value: '2,450',
      change: '+15%',
      changeType: 'increase',
      icon: TrophyIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'Learning Streak',
      value: '7 days',
      change: '+3 days',
      changeType: 'increase',
      icon: FireIcon,
      color: 'bg-orange-500',
    },
    {
      name: 'Community Interactions',
      value: '23',
      change: '+5',
      changeType: 'increase',
      icon: UserGroupIcon,
      color: 'bg-purple-500',
    },
    {
      name: 'Skills Improved',
      value: '12',
      change: '+3',
      changeType: 'increase',
      icon: BeakerIcon,
      color: 'bg-indigo-500',
    },
  ];

  const learningData = [
    { day: 'Mon', hours: 2.5, courses: 1 },
    { day: 'Tue', hours: 3.2, courses: 2 },
    { day: 'Wed', hours: 1.8, courses: 1 },
    { day: 'Thu', hours: 4.1, courses: 3 },
    { day: 'Fri', hours: 2.9, courses: 2 },
    { day: 'Sat', hours: 5.2, courses: 4 },
    { day: 'Sun', hours: 3.7, courses: 2 },
  ];

  const courseProgress = [
    {
      name: 'Advanced React Development',
      progress: 75,
      timeSpent: '12.5 hours',
      lastAccessed: '2 hours ago',
      nextLesson: 'State Management with Redux',
    },
    {
      name: 'Machine Learning Fundamentals',
      progress: 45,
      timeSpent: '8.3 hours',
      lastAccessed: '1 day ago',
      nextLesson: 'Neural Networks Basics',
    },
    {
      name: 'Data Science with Python',
      progress: 90,
      timeSpent: '18.7 hours',
      lastAccessed: '3 days ago',
      nextLesson: 'Final Project Submission',
    },
    {
      name: 'UI/UX Design Principles',
      progress: 30,
      timeSpent: '4.2 hours',
      lastAccessed: '5 days ago',
      nextLesson: 'User Research Methods',
    },
  ];

  const skillBreakdown = [
    { skill: 'React', level: 85, projects: 3 },
    { skill: 'JavaScript', level: 78, projects: 5 },
    { skill: 'Python', level: 65, projects: 2 },
    { skill: 'Machine Learning', level: 45, projects: 1 },
    { skill: 'Data Analysis', level: 72, projects: 4 },
    { skill: 'UI/UX Design', level: 30, projects: 1 },
  ];

  const achievements = [
    {
      name: 'First Course Completed',
      description: 'Completed your first course on the platform',
      date: '2024-01-15',
      points: 100,
      icon: '🎓',
    },
    {
      name: 'Learning Streak',
      description: 'Maintained a 7-day learning streak',
      date: '2024-01-20',
      points: 250,
      icon: '🔥',
    },
    {
      name: 'Perfect Score',
      description: 'Achieved 100% on a course assessment',
      date: '2024-01-25',
      points: 500,
      icon: '⭐',
    },
    {
      name: 'Community Helper',
      description: 'Helped 10 other learners in the community',
      date: '2024-02-01',
      points: 300,
      icon: '🤝',
    },
  ];

  const timeRanges = [
    { id: '7d', name: 'Last 7 days' },
    { id: '30d', name: 'Last 30 days' },
    { id: '90d', name: 'Last 90 days' },
    { id: '1y', name: 'Last year' },
  ];

  const metricTabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'learning', name: 'Learning', icon: AcademicCapIcon },
    { id: 'skills', name: 'Skills', icon: BeakerIcon },
    { id: 'achievements', name: 'Achievements', icon: TrophyIcon },
    { id: 'community', name: 'Community', icon: UserGroupIcon },
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
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Track your learning progress and performance insights.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={e => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {timeRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <ArrowDownTrayIcon className="w-5 h-5 mr-2 inline" />
                Export Report
              </button>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    {metric.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <div className="flex items-center mt-1">
                    {metric.changeType === 'increase' ? (
                      <ChartBarIcon className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        metric.changeType === 'increase'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {metricTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedMetric(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    selectedMetric === tab.id
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
            {selectedMetric === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Learning Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Learning Activity
                  </h3>
                  <div className="space-y-4">
                    {learningData.map((day, index) => (
                      <div
                        key={day.day}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-gray-700 w-12">
                          {day.day}
                        </span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(day.hours / 6) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {day.hours}h
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Progress */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Course Progress
                  </h3>
                  <div className="space-y-4">
                    {courseProgress.map(course => (
                      <div
                        key={course.name}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">
                            {course.name}
                          </h4>
                          <span className="text-sm font-medium text-gray-600">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{course.timeSpent}</span>
                          <span>Next: {course.nextLesson}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'learning' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Learning Patterns
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Peak Learning Time
                      </h4>
                      <p className="text-blue-700">Saturday, 2:00 PM</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">
                        Average Session
                      </h4>
                      <p className="text-green-700">45 minutes</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">
                        Completion Rate
                      </h4>
                      <p className="text-purple-700">78%</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Learning Goals
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Complete React Course
                        </h4>
                        <p className="text-sm text-gray-600">
                          Target: March 15, 2024
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          75%
                        </div>
                        <div className="text-xs text-gray-500">On track</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Learn Machine Learning
                        </h4>
                        <p className="text-sm text-gray-600">
                          Target: April 30, 2024
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          45%
                        </div>
                        <div className="text-xs text-gray-500">
                          Behind schedule
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'skills' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Skill Development
                  </h3>
                  <div className="space-y-4">
                    {skillBreakdown.map(skill => (
                      <div
                        key={skill.skill}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">
                            {skill.skill}
                          </h4>
                          <span className="text-sm font-medium text-gray-600">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                          <div
                            className="bg-indigo-600 h-3 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{skill.projects} projects completed</span>
                          <span>Level {Math.floor(skill.level / 20) + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Skill Recommendations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-medium text-yellow-900 mb-2">
                        Next Skill to Learn
                      </h4>
                      <p className="text-yellow-700">TypeScript</p>
                      <p className="text-xs text-yellow-600 mt-1">
                        Based on your React progress
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">
                        Skill Gap
                      </h4>
                      <p className="text-green-700">Backend Development</p>
                      <p className="text-xs text-green-600 mt-1">
                        Complement your frontend skills
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'achievements' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Achievements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map(achievement => (
                      <div
                        key={achievement.name}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center mb-3">
                          <span className="text-2xl mr-3">
                            {achievement.icon}
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {achievement.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">
                            {achievement.date}
                          </span>
                          <span className="font-medium text-blue-600">
                            +{achievement.points} pts
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Achievement Progress
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Learning Streak Master
                        </h4>
                        <p className="text-sm text-gray-600">
                          Maintain a 30-day learning streak
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          7/30 days
                        </div>
                        <div className="text-xs text-gray-500">
                          23 days remaining
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Course Completionist
                        </h4>
                        <p className="text-sm text-gray-600">
                          Complete 10 courses
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          8/10 courses
                        </div>
                        <div className="text-xs text-gray-500">
                          2 courses remaining
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'community' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Community Engagement
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Questions Asked
                      </h4>
                      <p className="text-blue-700 text-2xl font-bold">12</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">
                        Answers Provided
                      </h4>
                      <p className="text-green-700 text-2xl font-bold">8</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">
                        Community Rating
                      </h4>
                      <p className="text-purple-700 text-2xl font-bold">
                        4.8/5
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Interactions
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <ChatBubbleLeftIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Helped with React question
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                      <span className="text-xs text-green-600">+10 pts</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <HeartIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Received helpful answer
                        </p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                      <span className="text-xs text-blue-600">+5 pts</span>
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

export default AnalyticsPage;
