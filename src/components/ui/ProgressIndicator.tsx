import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
  FireIcon,
  StarIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: React.ComponentType<any>;
  color: string;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: number;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex items-start space-x-4"
        >
          {/* Step Icon */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                step.status === 'completed'
                  ? 'bg-green-500'
                  : step.status === 'current'
                  ? 'bg-blue-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              {step.status === 'completed' ? (
                <CheckCircleIcon className="w-6 h-6 text-white" />
              ) : (
                <step.icon className={`w-6 h-6 ${
                  step.status === 'current' ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                }`} />
              )}
            </motion.div>
            
            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-300 dark:bg-gray-600"></div>
            )}
          </div>

          {/* Step Content */}
          <div className="flex-1 pt-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className={`font-semibold ${
                step.status === 'completed'
                  ? 'text-green-600 dark:text-green-400'
                  : step.status === 'current'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {step.title}
              </h3>
              
              {step.status === 'current' && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
              )}
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {step.description}
            </p>
            
            {step.status === 'current' && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Circular Progress Component
interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        
        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Progress Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            {Math.round(progress)}%
          </motion.div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Complete
          </div>
        </div>
      </div>
    </div>
  );
};

// Linear Progress Component
interface LinearProgressProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export const LinearProgress: React.FC<LinearProgressProps> = ({
  progress,
  label,
  showPercentage = true,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// Achievement Progress Component
interface AchievementProgressProps {
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    progress: number;
    total: number;
    color: string;
  }[];
}

export const AchievementProgress: React.FC<AchievementProgressProps> = ({
  achievements,
}) => {
  return (
    <div className="space-y-4">
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center`}>
              <achievement.icon className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {achievement.description}
              </p>
              
              <div className="mt-2">
                <LinearProgress
                  progress={(achievement.progress / achievement.total) * 100}
                  label={`${achievement.progress}/${achievement.total}`}
                  showPercentage={false}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProgressIndicator; 