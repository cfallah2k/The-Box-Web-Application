import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ClockIcon,
  AcademicCapIcon,
  TagIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  FireIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

interface LearningMetrics {
  totalStudyTime: number;
  coursesCompleted: number;
  averageScore: number;
  streakDays: number;
  focusScore: number;
  retentionRate: number;
}

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  status: 'on-track' | 'behind' | 'ahead' | 'completed';
}

const AdvancedAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'learning' | 'goals'>('overview');
  const [metrics, setMetrics] = useState<LearningMetrics>({
    totalStudyTime: 156,
    coursesCompleted: 8,
    averageScore: 87,
    streakDays: 21,
    focusScore: 92,
    retentionRate: 78,
  });

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete 10 Courses',
      current: 8,
      target: 10,
      status: 'on-track',
    },
    {
      id: '2',
      title: 'Achieve 90% Average Score',
      current: 87,
      target: 90,
      status: 'behind',
    },
    {
      id: '3',
      title: 'Join 5 Study Groups',
      current: 3,
      target: 5,
      status: 'on-track',
    },
  ]);

  const getGoalProgress = (goal: Goal) => {
    return (goal.current / goal.target) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'behind':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'ahead':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'completed':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Advanced Analytics</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Learning insights & performance</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: ChartBarIcon },
          { id: 'learning', label: 'Learning', icon: AcademicCapIcon },
          { id: 'goals', label: 'Goals', icon: TagIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Study Hours', value: metrics.totalStudyTime, icon: ClockIcon, color: 'text-blue-500' },
                { label: 'Courses Completed', value: metrics.coursesCompleted, icon: AcademicCapIcon, color: 'text-green-500' },
                { label: 'Average Score', value: `${metrics.averageScore}%`, icon: StarIcon, color: 'text-yellow-500' },
                { label: 'Learning Streak', value: metrics.streakDays, icon: FireIcon, color: 'text-orange-500' },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Learning Metrics</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Focus Score', value: metrics.focusScore, color: 'text-green-500' },
                    { label: 'Retention Rate', value: metrics.retentionRate, color: 'text-blue-500' },
                  ].map((metric, index) => (
                    <div key={metric.label} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${metric.color.replace('text-', 'bg-')}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ delay: index * 0.1 }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${metric.color}`}>{metric.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Performance Insights</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Strong problem-solving skills</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Time management needs improvement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <InformationCircleIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Peak study time: 2-4 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Subject Breakdown</h4>
              <div className="space-y-3">
                {[
                  { subject: 'Mathematics', hours: 7, percentage: 35 },
                  { subject: 'Programming', hours: 6.3, percentage: 30 },
                  { subject: 'Data Science', hours: 5.3, percentage: 25 },
                  { subject: 'Business', hours: 2.4, percentage: 10 },
                ].map((subject, index) => (
                  <div key={subject.subject} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{subject.subject}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <motion.div
                          className="bg-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${subject.percentage}%` }}
                          transition={{ delay: index * 0.1 }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {subject.hours}h
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h5>
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(goal.status)}`}>
                    <span className="capitalize">{goal.status.replace('-', ' ')}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {goal.current} / {goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${getGoalProgress(goal)}%` }}
                      transition={{ delay: index * 0.1 }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                    {Math.round(getGoalProgress(goal))}% complete
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
