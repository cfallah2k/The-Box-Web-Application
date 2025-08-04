import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CpuChipIcon,
  AcademicCapIcon,
  StarIcon,
  ClockIcon,
  UserIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PlusIcon,
  TagIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number;
  progress: number;
  isRecommended: boolean;
  aiReason: string;
}

const PersonalizedLearningPaths: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'paths' | 'progress'>('paths');
  const [showAssessment, setShowAssessment] = useState(false);

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'Full-Stack Web Development',
      description: 'Master modern web development from frontend to backend',
      difficulty: 'intermediate',
      estimatedDuration: 480,
      progress: 65,
      isRecommended: true,
      aiReason: 'Matches your programming interests and current skill level',
    },
    {
      id: '2',
      title: 'Data Science & AI',
      description: 'Learn data analysis, machine learning, and AI fundamentals',
      difficulty: 'advanced',
      estimatedDuration: 600,
      progress: 30,
      isRecommended: true,
      aiReason: 'Aligns with your AI/ML interests and career goals',
    },
    {
      id: '3',
      title: 'UI/UX Design',
      description: 'Create beautiful and functional user interfaces',
      difficulty: 'beginner',
      estimatedDuration: 360,
      progress: 0,
      isRecommended: false,
      aiReason: 'Complements your programming skills for full-stack development',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <CpuChipIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Personalized Learning Paths</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered learning recommendations</p>
          </div>
        </div>
        <button
          onClick={() => setShowAssessment(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Update Profile</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'paths', label: 'Learning Paths', icon: TagIcon },
          { id: 'progress', label: 'Progress', icon: ArrowTrendingUpIcon },
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
        {activeTab === 'paths' && (
          <div className="space-y-4">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{path.title}</h4>
                      {path.isRecommended && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full">
                          AI Recommended
                        </span>
                      )}
                      <div className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(path.difficulty)}`}>
                        {path.difficulty}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{path.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <InformationCircleIcon className="w-4 h-4 inline mr-1" />
                      {path.aiReason}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">{path.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${path.progress}%` }}
                      transition={{ delay: index * 0.1 }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{path.estimatedDuration} hours</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="btn-primary text-sm flex-1">
                      Continue Path
                    </button>
                    <button className="btn-secondary text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
                <div className="flex items-center space-x-3">
                  <TagIcon className="w-6 h-6" />
                  <div>
                    <p className="text-sm opacity-90">Active Paths</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                <div className="flex items-center space-x-3">
                  <ArrowTrendingUpIcon className="w-6 h-6" />
                  <div>
                    <p className="text-sm opacity-90">Avg. Progress</p>
                    <p className="text-2xl font-bold">32%</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-6 h-6" />
                  <div>
                    <p className="text-sm opacity-90">Study Time</p>
                    <p className="text-2xl font-bold">45h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Learning Insights</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    You're making excellent progress in Web Development
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Consider spending more time on Data Science fundamentals
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <InformationCircleIcon className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Your learning pace is optimal for your schedule
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedLearningPaths; 