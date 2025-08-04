import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  UsersIcon,
  TrophyIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  FireIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface Stat {
  label: string;
  value: number;
  icon: React.ComponentType<any>;
  color: string;
  suffix?: string;
  prefix?: string;
}

interface LiveStatisticsProps {
  className?: string;
}

const LiveStatistics: React.FC<LiveStatisticsProps> = ({ className = '' }) => {
  const [stats, setStats] = useState({
    activeUsers: 0,
    coursesCompleted: 0,
    aiConversations: 0,
    countriesReached: 0,
    certificatesEarned: 0,
    studyHours: 0,
    newLearners: 0,
    averageRating: 0,
  });

  const controls = useAnimation();

  const statistics: Stat[] = [
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: UsersIcon,
      color: 'from-blue-500 to-cyan-500',
      suffix: '+',
    },
    {
      label: 'Courses Completed',
      value: stats.coursesCompleted,
      icon: TrophyIcon,
      color: 'from-green-500 to-emerald-500',
      suffix: '+',
    },
    {
      label: 'AI Conversations',
      value: stats.aiConversations,
      icon: ChatBubbleLeftRightIcon,
      color: 'from-purple-500 to-pink-500',
      suffix: '+',
    },
    {
      label: 'Countries',
      value: stats.countriesReached,
      icon: GlobeAltIcon,
      color: 'from-orange-500 to-red-500',
      suffix: '+',
    },
    {
      label: 'Certificates',
      value: stats.certificatesEarned,
      icon: SparklesIcon,
      color: 'from-indigo-500 to-purple-500',
      suffix: '+',
    },
    {
      label: 'Study Hours',
      value: stats.studyHours,
      icon: BoltIcon,
      color: 'from-yellow-500 to-orange-500',
      suffix: 'hrs',
    },
    {
      label: 'New Learners',
      value: stats.newLearners,
      icon: ArrowTrendingUpIcon,
      color: 'from-teal-500 to-blue-500',
      suffix: '+',
    },
    {
      label: 'Average Rating',
      value: stats.averageRating,
      icon: FireIcon,
      color: 'from-pink-500 to-rose-500',
      prefix: '',
      suffix: '/5',
    },
  ];

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 50),
        coursesCompleted: prev.coursesCompleted + Math.floor(Math.random() * 10),
        aiConversations: prev.aiConversations + Math.floor(Math.random() * 100),
        countriesReached: prev.countriesReached + Math.floor(Math.random() * 2),
        certificatesEarned: prev.certificatesEarned + Math.floor(Math.random() * 5),
        studyHours: prev.studyHours + Math.floor(Math.random() * 20),
        newLearners: prev.newLearners + Math.floor(Math.random() * 15),
        averageRating: Math.min(5, prev.averageRating + (Math.random() - 0.5) * 0.1),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animate counters when they come into view
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const Counter = ({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) => {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-2xl font-bold text-gray-900 dark:text-white"
      >
        {prefix}
        {value.toLocaleString()}
        {suffix}
      </motion.span>
    );
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {statistics.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
          </div>
          
          <div className="space-y-1">
            <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {stat.label}
            </p>
          </div>
          
          {/* Live indicator */}
          <div className="flex items-center space-x-1 mt-2">
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              Live
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LiveStatistics; 