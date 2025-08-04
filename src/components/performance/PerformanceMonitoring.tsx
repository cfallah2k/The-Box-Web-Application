import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  CogIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  InformationCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'error';
  change: number;
}

interface ErrorLog {
  id: string;
  timestamp: Date;
  level: 'error' | 'warning' | 'info';
  message: string;
  component: string;
  userAgent: string;
  userId?: string;
  resolved: boolean;
}

interface PerformanceData {
  pageLoadTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  cpuUsage: number;
  activeUsers: number;
  errorRate: number;
}

const PerformanceMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'errors' | 'metrics'>(
    'overview'
  );
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    pageLoadTime: 1.2,
    apiResponseTime: 150,
    memoryUsage: 45,
    cpuUsage: 23,
    activeUsers: 1250,
    errorRate: 0.5,
  });

  const metrics: PerformanceMetric[] = [
    {
      name: 'Page Load Time',
      value: performanceData.pageLoadTime,
      unit: 's',
      trend: 'down',
      status: 'good',
      change: -15,
    },
    {
      name: 'API Response Time',
      value: performanceData.apiResponseTime,
      unit: 'ms',
      trend: 'stable',
      status: 'good',
      change: 2,
    },
    {
      name: 'Memory Usage',
      value: performanceData.memoryUsage,
      unit: '%',
      trend: 'up',
      status: 'warning',
      change: 8,
    },
    {
      name: 'CPU Usage',
      value: performanceData.cpuUsage,
      unit: '%',
      trend: 'down',
      status: 'good',
      change: -5,
    },
    {
      name: 'Active Users',
      value: performanceData.activeUsers,
      unit: '',
      trend: 'up',
      status: 'good',
      change: 12,
    },
    {
      name: 'Error Rate',
      value: performanceData.errorRate,
      unit: '%',
      trend: 'down',
      status: 'good',
      change: -25,
    },
  ];

  const errorLogs: ErrorLog[] = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      level: 'error',
      message: 'Failed to load course content',
      component: 'CoursePlayer',
      userAgent: 'Chrome/91.0.4472.124',
      userId: 'user123',
      resolved: false,
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      level: 'warning',
      message: 'Slow API response detected',
      component: 'AnalyticsAPI',
      userAgent: 'Firefox/89.0',
      resolved: true,
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      level: 'info',
      message: 'High memory usage detected',
      component: 'VideoPlayer',
      userAgent: 'Safari/14.1.1',
      resolved: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />;
      case 'down':
        return <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />;
      default:
        return <InformationCircleIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'info':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(prev => ({
        ...prev,
        pageLoadTime: prev.pageLoadTime + (Math.random() - 0.5) * 0.1,
        apiResponseTime: prev.apiResponseTime + (Math.random() - 0.5) * 10,
        memoryUsage: Math.max(
          0,
          Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 2)
        ),
        cpuUsage: Math.max(
          0,
          Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 3)
        ),
        activeUsers: Math.max(
          0,
          prev.activeUsers + Math.floor((Math.random() - 0.5) * 10)
        ),
        errorRate: Math.max(0, prev.errorRate + (Math.random() - 0.5) * 0.1),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Performance Monitoring
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Real-time system performance
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary">
            <EyeIcon className="w-4 h-4" />
            Live View
          </button>
          <button className="btn-primary">
            <Cog6ToothIcon className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: ChartBarIcon },
          { id: 'errors', label: 'Error Logs', icon: ExclamationTriangleIcon },
          { id: 'metrics', label: 'Metrics', icon: ArrowTrendingUpIcon },
        ].map(tab => (
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
            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      System Status
                    </p>
                    <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                      Healthy
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3">
                  <UserIcon className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Active Users
                    </p>
                    <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                      {performanceData.activeUsers.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="w-6 h-6 text-orange-500" />
                  <div>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Error Rate
                    </p>
                    <p className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                      {performanceData.errorRate.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Performance Metrics
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {metric.name}
                      </h5>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(metric.trend)}
                        <span
                          className={`text-xs ${
                            metric.change >= 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {metric.change >= 0 ? '+' : ''}
                          {metric.change}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {metric.value.toFixed(1)}
                        {metric.unit}
                      </p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          metric.status
                        )}`}
                      >
                        {metric.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Real-time Activity */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Real-time Activity
              </h4>
              <div className="space-y-3">
                {[
                  {
                    action: 'User logged in',
                    time: '2 seconds ago',
                    user: 'sarah.chen@company.com',
                  },
                  {
                    action: 'Course completed',
                    time: '5 seconds ago',
                    user: 'mike.johnson@company.com',
                  },
                  {
                    action: 'Quiz submitted',
                    time: '8 seconds ago',
                    user: 'emily.rodriguez@company.com',
                  },
                  {
                    action: 'Video started',
                    time: '12 seconds ago',
                    user: 'david.kim@company.com',
                  },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.user}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'errors' && (
          <div className="space-y-4">
            {errorLogs.map((error, index) => (
              <motion.div
                key={error.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${getLevelColor(
                          error.level
                        )}`}
                      >
                        {error.level.toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {error.timestamp.toLocaleTimeString()}
                      </span>
                      {error.resolved && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full">
                          Resolved
                        </span>
                      )}
                    </div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                      {error.message}
                    </h5>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <p>
                        <strong>Component:</strong> {error.component}
                      </p>
                      <p>
                        <strong>User Agent:</strong> {error.userAgent}
                      </p>
                      {error.userId && (
                        <p>
                          <strong>User ID:</strong> {error.userId}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                      <CogIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Server Performance
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      CPU Usage
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${performanceData.cpuUsage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {performanceData.cpuUsage}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Memory Usage
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${performanceData.memoryUsage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {performanceData.memoryUsage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Network Performance
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Page Load Time
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {performanceData.pageLoadTime.toFixed(2)}s
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      API Response Time
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {performanceData.apiResponseTime}ms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceMonitoring;
