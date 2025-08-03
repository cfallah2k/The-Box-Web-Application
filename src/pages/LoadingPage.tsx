import {
  AcademicCapIcon,
  ChartBarIcon,
  CogIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React from 'react';

interface LoadingPageProps {
  type?: 'default' | 'course' | 'profile' | 'analytics' | 'settings';
  message?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  type = 'default',
  message = 'Loading...',
}) => {
  const loadingStates = {
    default: {
      icon: AcademicCapIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      messages: [
        'Preparing your learning experience...',
        'Loading your personalized content...',
        'Setting up your dashboard...',
        'Almost ready...',
      ],
    },
    course: {
      icon: AcademicCapIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      messages: [
        'Loading course content...',
        'Preparing interactive elements...',
        'Setting up your progress...',
        'Course ready in a moment...',
      ],
    },
    profile: {
      icon: UserGroupIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      messages: [
        'Loading your profile...',
        'Fetching your achievements...',
        'Preparing your statistics...',
        'Profile almost ready...',
      ],
    },
    analytics: {
      icon: ChartBarIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      messages: [
        'Calculating your progress...',
        'Generating insights...',
        'Preparing analytics...',
        'Analytics loading...',
      ],
    },
    settings: {
      icon: CogIcon,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      messages: [
        'Loading your preferences...',
        'Preparing settings...',
        'Configuring options...',
        'Settings almost ready...',
      ],
    },
  };

  const currentState =
    loadingStates[type as keyof typeof loadingStates] || loadingStates.default;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className={`inline-flex p-4 rounded-full ${currentState.bgColor} mb-6`}
          >
            <currentState.icon className={`w-12 h-12 ${currentState.color}`} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            {message}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex justify-center space-x-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                className="w-3 h-3 bg-blue-600 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="w-3 h-3 bg-blue-600 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="w-3 h-3 bg-blue-600 rounded-full"
              />
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-sm text-gray-500"
          >
            <p>Please wait while we prepare everything for you...</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingPage;
