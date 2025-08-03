import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  ChartPieIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ClockIcon,
  AcademicCapIcon,
  TrophyIcon,
  FireIcon,
  StarIcon,
  BoltIcon,
  EyeIcon,
  BrainIcon,
  RocketLaunchIcon,
  CalendarIcon,
  UserGroupIcon,
  BookOpenIcon,
  CodeBracketIcon,
  BeakerIcon,
  SparklesIcon,
  GlobeAltIcon,
  CpuChipIcon,
  PresentationChartLineIcon,
  DocumentChartBarIcon,
  CogIcon,
  FilterIcon,
  CalendarDaysIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/Badge';
import ProgressRing from '@/components/ui/ProgressRing';

interface AnalyticsData {
  learningProgress: {
    totalHours: number;
    weeklyAverage: number;
    monthlyGrowth: number;
    completionRate: number;
    streakDays: number;
  };
  performanceMetrics: {
    accuracy: number;
    speed: number;
    retention: number;
    engagement: number;
    improvement: number;
  };
  subjectBreakdown: {
    programming: number;
    mathematics: number;
    science: number;
    languages: number;
    arts: number;
    business: number;
  };
  timeAnalysis: {
    daily: { [key: string]: number };
    weekly: { [key: string]: number };
    monthly: { [key: string]: number };
  };
  achievements: {
    total: number;
    recent: string[];
    upcoming: string[];
  };
  predictions: {
    nextMilestone: string;
    estimatedCompletion: string;
    recommendedTopics: string[];
    skillGaps: string[];
  };
}

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    learningProgress: {
      totalHours: 247,
      weeklyAverage: 12.5,
      monthlyGrowth: 23.4,
      completionRate: 87.3,
      streakDays: 18
    },
    performanceMetrics: {
      accuracy: 94.2,
      speed: 88.7,
      retention: 91.5,
      engagement: 96.8,
      improvement: 15.3
    },
    subjectBreakdown: {
      programming: 35,
      mathematics: 25,
      science: 20,
      languages: 12,
      arts: 5,
      business: 3
    },
    timeAnalysis: {
      daily: {
        'Mon': 2.5, 'Tue': 3.2, 'Wed': 1.8, 'Thu': 4.1, 'Fri': 2.9, 'Sat': 5.2, 'Sun': 3.7
      },
      weekly: {
        'Week 1': 18.5, 'Week 2': 22.3, 'Week 3': 19.8, 'Week 4': 25.1
      },
      monthly: {
        'Jan': 85, 'Feb': 92, 'Mar': 78, 'Apr': 95, 'May': 103, 'Jun': 89
      }
    },
    achievements: {
      total: 47,
      recent: [
        'First Perfect Score',
        '7-Day Streak',
        'Advanced Python',
        'Math Master',
        'Creative Thinker'
      ],
      upcoming: [
        '30-Day Streak',
        'Expert Level',
        'Project Completion',
        'Peer Mentor',
        'Innovation Award'
      ]
    },
    predictions: {
      nextMilestone: 'Advanced Machine Learning',
      estimatedCompletion: '2 weeks',
      recommendedTopics: [
        'Neural Networks',
        'Deep Learning',
        'Computer Vision',
        'Natural Language Processing'
      ],
      skillGaps: [
        'Advanced Statistics',
        'Data Visualization',
        'Algorithm Optimization'
      ]
    }
  });

  const metrics = [
    { name: 'Learning Hours', value: analyticsData.learningProgress.totalHours, unit: 'hrs', change: '+12.5%', trend: 'up', icon: ClockIcon, color: 'text-blue-500' },
    { name: 'Weekly Average', value: analyticsData.learningProgress.weeklyAverage, unit: 'hrs/week', change: '+8.2%', trend: 'up', icon: TrendingUpIcon, color: 'text-green-500' },
    { name: 'Completion Rate', value: analyticsData.learningProgress.completionRate, unit: '%', change: '+3.1%', trend: 'up', icon: TrophyIcon, color: 'text-yellow-500' },
    { name: 'Current Streak', value: analyticsData.learningProgress.streakDays, unit: 'days', change: '+5', trend: 'up', icon: FireIcon, color: 'text-red-500' },
    { name: 'Accuracy Score', value: analyticsData.performanceMetrics.accuracy, unit: '%', change: '+2.4%', trend: 'up', icon: StarIcon, color: 'text-purple-500' },
    { name: 'Engagement Rate', value: analyticsData.performanceMetrics.engagement, unit: '%', change: '+1.8%', trend: 'up', icon: BoltIcon, color: 'text-indigo-500' }
  ];

  const performanceIndicators = [
    { name: 'Speed', value: analyticsData.performanceMetrics.speed, color: 'bg-green-500' },
    { name: 'Retention', value: analyticsData.performanceMetrics.retention, color: 'bg-blue-500' },
    { name: 'Improvement', value: analyticsData.performanceMetrics.improvement, color: 'bg-purple-500' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpIcon className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDownIcon className="w-4 h-4 text-red-500" />;
      default: return <MinusIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
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
                📊 Advanced Learning Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Deep insights into your learning journey and performance optimization
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="input"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="btn btn-outline">
                <CogIcon className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {metrics.map((metric, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {metric.name}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metric.value}{metric.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                  style={{ width: `${Math.min(metric.value / 100 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Performance Overview
                </h2>
                <div className="flex items-center space-x-2">
                  <Badge variant="success">+15.3%</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">vs last month</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {performanceIndicators.map((indicator, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <ProgressRing
                        progress={indicator.value}
                        size={80}
                        strokeWidth={8}
                        color={indicator.color}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {indicator.value}%
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {indicator.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Time Analysis Chart */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Learning Time Distribution
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {Object.entries(analyticsData.timeAnalysis.daily).map(([day, hours]) => (
                    <div key={day} className="text-center">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 mb-2">
                        <div 
                          className="bg-gradient-to-t from-primary-500 to-secondary-500 rounded"
                          style={{ height: `${(hours / 6) * 100}px` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subject Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Subject Breakdown
              </h2>
              <div className="space-y-4">
                {Object.entries(analyticsData.subjectBreakdown).map(([subject, percentage]) => (
                  <div key={subject} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {subject}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recent Achievements
              </h2>
              <div className="space-y-3">
                {analyticsData.achievements.recent.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <TrophyIcon className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-900 dark:text-white">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Predictions & Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* AI Predictions */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <BrainIcon className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                AI Predictions
              </h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Next Milestone
                </h3>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-purple-800 dark:text-purple-200 font-semibold">
                    {analyticsData.predictions.nextMilestone}
                  </p>
                  <p className="text-sm text-purple-600 dark:text-purple-300">
                    Estimated completion: {analyticsData.predictions.estimatedCompletion}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Recommended Topics
                </h3>
                <div className="space-y-2">
                  {analyticsData.predictions.recommendedTopics.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <RocketLaunchIcon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-900 dark:text-white">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skill Gaps */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <EyeIcon className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Skill Gaps Analysis
              </h2>
            </div>
            
            <div className="space-y-4">
              {analyticsData.predictions.skillGaps.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BeakerIcon className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{skill}</span>
                  </div>
                  <Badge variant="warning">Needs Focus</Badge>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white">
              <h3 className="font-semibold mb-2">AI Recommendation</h3>
              <p className="text-sm opacity-90">
                Focus on Advanced Statistics and Data Visualization to bridge your skill gaps and accelerate your learning progress.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 