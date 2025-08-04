import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  BookmarkIcon,
  ClockIcon,
  CogIcon,
  FireIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  ShareIcon,
  SparklesIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'article' | 'video' | 'podcast' | 'quiz';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  rating: number;
  views: number;
  isRecommended: boolean;
  aiReason: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    expertise: string;
  };
}

const SmartContentCuration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'recommended' | 'trending' | 'discover'
  >('recommended');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      description:
        'Master advanced React concepts including hooks, context, and performance optimization',
      type: 'course',
      category: 'Programming',
      difficulty: 'advanced',
      duration: 180,
      rating: 4.9,
      views: 15420,
      isRecommended: true,
      aiReason: 'Based on your JavaScript expertise and learning goals',
      tags: ['React', 'JavaScript', 'Frontend'],
      author: {
        name: 'Sarah Chen',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        expertise: 'Senior React Developer',
      },
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals',
      description:
        'Introduction to ML algorithms, data preprocessing, and model evaluation',
      type: 'course',
      category: 'Data Science',
      difficulty: 'intermediate',
      duration: 240,
      rating: 4.7,
      views: 8920,
      isRecommended: true,
      aiReason: 'Matches your interest in AI and data analysis',
      tags: ['Python', 'ML', 'Data Science'],
      author: {
        name: 'Dr. Alex Kim',
        avatar: 'https://i.pravatar.cc/150?u=alex',
        expertise: 'ML Researcher',
      },
    },
    {
      id: '3',
      title: 'The Future of Web Development',
      description:
        'Explore emerging trends in web development and what to learn next',
      type: 'article',
      category: 'Programming',
      difficulty: 'intermediate',
      duration: 15,
      rating: 4.8,
      views: 5670,
      isRecommended: false,
      aiReason: 'Trending in your field of interest',
      tags: ['Web Development', 'Trends', 'Career'],
      author: {
        name: 'Mike Johnson',
        avatar: 'https://i.pravatar.cc/150?u=mike',
        expertise: 'Tech Writer',
      },
    },
    {
      id: '4',
      title: 'UI/UX Design Principles',
      description:
        'Learn the fundamentals of user interface and user experience design',
      type: 'video',
      category: 'Design',
      difficulty: 'beginner',
      duration: 90,
      rating: 4.6,
      views: 12340,
      isRecommended: true,
      aiReason: 'Complements your full-stack development skills',
      tags: ['Design', 'UI/UX', 'Visual'],
      author: {
        name: 'Emily Rodriguez',
        avatar: 'https://i.pravatar.cc/150?u=emily',
        expertise: 'UX Designer',
      },
    },
  ];

  const categories = [
    { id: 'all', name: 'All', icon: SparklesIcon },
    { id: 'programming', name: 'Programming', icon: AcademicCapIcon },
    { id: 'data-science', name: 'Data Science', icon: ArrowTrendingUpIcon },
    { id: 'design', name: 'Design', icon: CogIcon },
    { id: 'business', name: 'Business', icon: FireIcon },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <AcademicCapIcon className="w-5 h-5" />;
      case 'article':
        return <BookmarkIcon className="w-5 h-5" />;
      case 'video':
        return <PlayIcon className="w-5 h-5" />;
      case 'podcast':
        return <UserIcon className="w-5 h-5" />;
      case 'quiz':
        return <StarIcon className="w-5 h-5" />;
      default:
        return <SparklesIcon className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'article':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'video':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'podcast':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'quiz':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

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
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Smart Content Curation
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI-powered content recommendations
            </p>
          </div>
        </div>
        <button className="btn-secondary">
          <CogIcon className="w-4 h-4" />
          Preferences
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for content..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <category.icon className="w-4 h-4" />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'recommended', label: 'Recommended', icon: SparklesIcon },
          { id: 'trending', label: 'Trending', icon: FireIcon },
          { id: 'discover', label: 'Discover', icon: MagnifyingGlassIcon },
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

      {/* Content Grid */}
      <div className="space-y-4">
        {contentItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  {item.isRecommended && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full">
                      AI Recommended
                    </span>
                  )}
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(
                      item.difficulty
                    )}`}
                  >
                    {item.difficulty}
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {item.description}
                </p>

                {item.isRecommended && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <SparklesIcon className="w-4 h-4 inline mr-1" />
                    {item.aiReason}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{item.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <UserIcon className="w-4 h-4" />
                      <span>{item.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <HeartIcon className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <BookmarkIcon className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <ShareIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-3">
                <img
                  src={item.author.avatar}
                  alt={item.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.author.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.author.expertise}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SmartContentCuration;
