import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  FireIcon,
  ClockIcon,
  UserIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  PlusIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'trending', name: 'Trending', icon: FireIcon },
    { id: 'recent', name: 'Recent', icon: ClockIcon },
    { id: 'popular', name: 'Popular', icon: UserGroupIcon },
  ];

  const categories = [
    { id: 'all', name: 'All Topics', count: 1247 },
    { id: 'programming', name: 'Programming', count: 342 },
    { id: 'ai', name: 'AI & ML', count: 189 },
    { id: 'career', name: 'Career Advice', count: 156 },
    { id: 'courses', name: 'Course Discussion', count: 234 },
    { id: 'general', name: 'General', count: 326 },
  ];

  const discussions = [
    {
      id: 1,
      title: 'What\'s your favorite React state management solution in 2024?',
      content: 'I\'ve been using Redux for years, but I\'m curious about newer alternatives like Zustand and Jotai. What are your experiences?',
      author: {
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        reputation: 1250,
      },
      category: 'programming',
      replies: 23,
      views: 456,
      likes: 18,
      isBookmarked: false,
      isLiked: false,
      timestamp: '2 hours ago',
      tags: ['React', 'State Management', 'Redux'],
    },
    {
      id: 2,
      title: 'How to get started with Machine Learning as a beginner?',
      content: 'I\'m a web developer looking to transition into ML. What resources would you recommend for someone with no ML background?',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        reputation: 890,
      },
      category: 'ai',
      replies: 15,
      views: 234,
      likes: 12,
      isBookmarked: true,
      isLiked: true,
      timestamp: '4 hours ago',
      tags: ['Machine Learning', 'Career', 'Beginner'],
    },
    {
      id: 3,
      title: 'The Box Course Review: Complete React Developer Course',
      content: 'Just finished this course and wanted to share my experience. The instructor is excellent and the projects are very practical.',
      author: {
        name: 'Maria Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        reputation: 567,
      },
      category: 'courses',
      replies: 8,
      views: 123,
      likes: 7,
      isBookmarked: false,
      isLiked: false,
      timestamp: '6 hours ago',
      tags: ['Course Review', 'React', 'The Box'],
    },
    {
      id: 4,
      title: 'Tips for remote job interviews in tech',
      content: 'With the rise of remote work, what are some specific tips for acing remote technical interviews?',
      author: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        reputation: 432,
      },
      category: 'career',
      replies: 31,
      views: 789,
      likes: 25,
      isBookmarked: false,
      isLiked: false,
      timestamp: '1 day ago',
      tags: ['Remote Work', 'Interviews', 'Career'],
    },
    {
      id: 5,
      title: 'Best practices for TypeScript in large projects',
      content: 'What are your go-to TypeScript patterns and practices when working on large-scale applications?',
      author: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        reputation: 1100,
      },
      category: 'programming',
      replies: 19,
      views: 345,
      likes: 14,
      isBookmarked: false,
      isLiked: false,
      timestamp: '1 day ago',
      tags: ['TypeScript', 'Best Practices', 'Large Projects'],
    },
  ];

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Community
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Connect, learn, and grow with fellow learners
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Community Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Members</span>
                  <span className="font-semibold text-gray-900 dark:text-white">12,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Active Today</span>
                  <span className="font-semibold text-gray-900 dark:text-white">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Discussions</span>
                  <span className="font-semibold text-gray-900 dark:text-white">5,678</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Replies</span>
                  <span className="font-semibold text-gray-900 dark:text-white">23,456</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Search and Actions */}
            <div className="card p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    className="input pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>New Discussion</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="card p-6 mb-6">
              <div className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Discussions */}
            <div className="space-y-4">
              {filteredDiscussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={discussion.author.avatar}
                      alt={discussion.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded">
                          {discussion.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {discussion.timestamp}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {discussion.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {discussion.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <UserIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {discussion.author.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({discussion.author.reputation} rep)
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <ChatBubbleLeftRightIcon className="w-4 h-4" />
                              <span>{discussion.replies} replies</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <EyeIcon className="w-4 h-4" />
                              <span>{discussion.views} views</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              discussion.isLiked
                                ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                                : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                            }`}
                          >
                            <HeartIcon className="w-4 h-4" />
                          </button>
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              discussion.isBookmarked
                                ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                            }`}
                          >
                            <BookmarkIcon className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg transition-colors">
                            <ShareIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4">
                        {discussion.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredDiscussions.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <ChatBubbleLeftRightIcon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No discussions found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search criteria
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage; 