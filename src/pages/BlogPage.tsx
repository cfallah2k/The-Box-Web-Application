import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  CalendarIcon,
  UserIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookOpenIcon,
  CodeBracketIcon,
  BeakerIcon,
  GlobeAltIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const BlogPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', icon: BookOpenIcon },
    { id: 'technology', name: 'Technology', icon: CodeBracketIcon },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: BeakerIcon },
    { id: 'education', name: 'Education', icon: AcademicCapIcon },
    { id: 'business', name: 'Business', icon: GlobeAltIcon }
  ];

  const articles = [
    {
      id: 1,
      title: 'The Future of AI in Education: How Machine Learning is Transforming Learning',
      excerpt: 'Discover how artificial intelligence is revolutionizing the way we learn and teach, from personalized learning paths to intelligent tutoring systems.',
      author: 'Dr. Sarah Johnson',
      date: '2024-02-15',
      category: 'ai-ml',
      readTime: '8 min read',
      views: 1247,
      likes: 89,
      comments: 23,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=600',
      featured: true
    },
    {
      id: 2,
      title: 'React 18: What\'s New and How to Upgrade Your Applications',
      excerpt: 'Explore the latest features in React 18, including concurrent rendering, automatic batching, and the new Suspense capabilities.',
      author: 'Mike Chen',
      date: '2024-02-12',
      category: 'technology',
      readTime: '12 min read',
      views: 892,
      likes: 67,
      comments: 18,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
      featured: false
    },
    {
      id: 3,
      title: 'Building Effective Learning Cohorts: A Guide for Educators',
      excerpt: 'Learn how to create and manage successful learning cohorts that foster collaboration and improve student outcomes.',
      author: 'Emily Rodriguez',
      date: '2024-02-10',
      category: 'education',
      readTime: '6 min read',
      views: 567,
      likes: 45,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
      featured: false
    },
    {
      id: 4,
      title: 'The Rise of EdTech: How Technology is Shaping the Future of Learning',
      excerpt: 'Explore the latest trends in educational technology and how they\'re transforming traditional learning models.',
      author: 'David Kim',
      date: '2024-02-08',
      category: 'technology',
      readTime: '10 min read',
      views: 734,
      likes: 56,
      comments: 15,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
      featured: false
    },
    {
      id: 5,
      title: 'Machine Learning for Beginners: A Comprehensive Guide',
      excerpt: 'Start your journey into machine learning with this comprehensive guide covering the fundamentals and practical applications.',
      author: 'Alex Thompson',
      date: '2024-02-05',
      category: 'ai-ml',
      readTime: '15 min read',
      views: 1234,
      likes: 92,
      comments: 31,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=600',
      featured: false
    },
    {
      id: 6,
      title: 'Digital Transformation in Education: Challenges and Opportunities',
      excerpt: 'Understand the challenges and opportunities presented by digital transformation in the education sector.',
      author: 'Lisa Wang',
      date: '2024-02-03',
      category: 'business',
      readTime: '9 min read',
      views: 456,
      likes: 34,
      comments: 8,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
      featured: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            The Box Blog
          </h1>
          <p className="text-xl text-gray-600">
            Insights, tutorials, and stories from the world of education and technology.
          </p>
        </motion.div>

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="text-gray-500 text-sm">{featuredArticle.category}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-1" />
                        {featuredArticle.author}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {new Date(featuredArticle.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <BookOpenIcon className="w-4 h-4 mr-1" />
                        {featuredArticle.readTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      {featuredArticle.views.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <HeartIcon className="w-4 h-4 mr-1" />
                      {featuredArticle.likes}
                    </div>
                    <div className="flex items-center">
                      <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                      {featuredArticle.comments}
                    </div>
                  </div>
                  <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Read Article
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-sm">{article.readTime}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <UserIcon className="w-4 h-4 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      {article.views.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <HeartIcon className="w-4 h-4 mr-1" />
                      {article.likes}
                    </div>
                    <div className="flex items-center">
                      <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                      {article.comments}
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    <ShareIcon className="w-4 h-4" />
                  </button>
                </div>
                
                <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all articles.
            </p>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">
            Stay Updated with Our Latest Insights
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest articles, tutorials, and insights delivered directly to your inbox. 
            Join thousands of learners who are already staying ahead of the curve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage; 