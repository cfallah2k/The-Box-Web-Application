import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  CalendarIcon,
  UserIcon,
  EyeIcon,
  HeartIcon,
  BookmarkIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'programming', name: 'Programming' },
    { id: 'ai', name: 'Artificial Intelligence' },
    { id: 'career', name: 'Career Tips' },
    { id: 'education', name: 'Education' },
    { id: 'technology', name: 'Technology' },
  ];

  const articles = [
    {
      id: 1,
      title: 'The Future of AI in Education: What to Expect in 2024',
      excerpt: 'Discover how artificial intelligence is revolutionizing the way we learn and teach, from personalized learning paths to intelligent tutoring systems.',
      author: 'Dr. Sarah Johnson',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      date: '2024-01-15',
      category: 'ai',
      readTime: '8 min read',
      views: 1247,
      likes: 89,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
      tags: ['AI', 'Education', 'Technology'],
    },
    {
      id: 2,
      title: 'Mastering React Hooks: A Comprehensive Guide',
      excerpt: 'Learn how to use React hooks effectively to build modern, functional components with clean and maintainable code.',
      author: 'Alex Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      date: '2024-01-12',
      category: 'programming',
      readTime: '12 min read',
      views: 2156,
      likes: 156,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      tags: ['React', 'JavaScript', 'Web Development'],
    },
    {
      id: 3,
      title: 'How to Land Your First Tech Job: A Step-by-Step Guide',
      excerpt: 'Essential tips and strategies for breaking into the tech industry, from building your portfolio to acing technical interviews.',
      author: 'Maria Rodriguez',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      date: '2024-01-10',
      category: 'career',
      readTime: '15 min read',
      views: 3421,
      likes: 234,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
      tags: ['Career', 'Job Search', 'Tech'],
    },
    {
      id: 4,
      title: 'The Rise of Microlearning: Why Shorter is Better',
      excerpt: 'Explore the benefits of microlearning and how bite-sized educational content is improving retention and engagement.',
      author: 'David Kim',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      date: '2024-01-08',
      category: 'education',
      readTime: '6 min read',
      views: 987,
      likes: 67,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop',
      tags: ['Learning', 'Education', 'Microlearning'],
    },
    {
      id: 5,
      title: 'Machine Learning for Beginners: Getting Started',
      excerpt: 'A beginner-friendly introduction to machine learning concepts, algorithms, and practical applications.',
      author: 'Dr. Sarah Johnson',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      date: '2024-01-05',
      category: 'ai',
      readTime: '10 min read',
      views: 1876,
      likes: 123,
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop',
      tags: ['Machine Learning', 'AI', 'Data Science'],
    },
    {
      id: 6,
      title: 'The Impact of Remote Work on Education Technology',
      excerpt: 'How the shift to remote work has accelerated innovation in educational technology and online learning platforms.',
      author: 'Emma Wilson',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      date: '2024-01-03',
      category: 'technology',
      readTime: '9 min read',
      views: 1432,
      likes: 98,
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop',
      tags: ['Remote Work', 'EdTech', 'Technology'],
    },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            The Box Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Insights, tutorials, and stories from the world of education and technology
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="input"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="card overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                  <img
                    src={filteredArticles[0].image}
                    alt={filteredArticles[0].title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-primary-600 font-medium uppercase tracking-wide">
                      {filteredArticles[0].category}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{filteredArticles[0].readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {filteredArticles[0].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {filteredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={filteredArticles[0].authorAvatar}
                        alt={filteredArticles[0].author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {filteredArticles[0].author}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(filteredArticles[0].date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-primary">Read More</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <EyeIcon className="w-4 h-4" />
                    <span>{article.views}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={article.authorAvatar}
                      alt={article.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {article.author}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <HeartIcon className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                      <BookmarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <TagIcon className="w-4 h-4 text-gray-400" />
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag, tagIndex) => (
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
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <MagnifyingGlassIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage; 