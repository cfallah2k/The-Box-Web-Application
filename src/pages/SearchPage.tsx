import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  ChartBarIcon,
  TrophyIcon,
  FireIcon,
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  FlagIcon,
  MapPinIcon,
  UsersIcon,
  BellIcon,
  FilterIcon,
  LightBulbIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  CameraIcon,
  CodeBracketIcon,
  DatabaseIcon,
  ServerIcon,
  CloudIcon,
  ChipIcon,
  RocketLaunchIcon,
  FlaskIcon,
  TestTubeIcon,
  AtomIcon,
  CpuChipIcon,
  NetworkIcon,
  CircuitBoardIcon,
  SatelliteIcon,
  TelescopeIcon,
  MicroscopeIcon,
  DnaIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
  CogIcon,
  ClipboardDocumentIcon,
  PresentationChartLineIcon,
  UserPlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  KeyIcon,
  LockClosedIcon,
  EyeSlashIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  SwatchIcon,
  LanguageIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    level: 'all',
    duration: 'all',
    price: 'all',
    rating: 'all'
  });

  const categories = [
    { id: 'all', name: 'All Results', icon: MagnifyingGlassIcon },
    { id: 'courses', name: 'Courses', icon: AcademicCapIcon },
    { id: 'instructors', name: 'Instructors', icon: UserGroupIcon },
    { id: 'articles', name: 'Articles', icon: DocumentTextIcon },
    { id: 'projects', name: 'Projects', icon: CodeBracketIcon },
    { id: 'communities', name: 'Communities', icon: UsersIcon }
  ];

  const searchResults = [
    {
      id: 1,
      title: 'Advanced React Development',
      type: 'course',
      category: 'programming',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      students: 1247,
      duration: '12 weeks',
      level: 'Advanced',
      price: 89,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      description: 'Master React with advanced patterns, hooks, and state management.',
      tags: ['React', 'JavaScript', 'Frontend'],
      featured: true
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      type: 'course',
      category: 'ai-ml',
      instructor: 'Prof. Michael Chen',
      rating: 4.7,
      students: 892,
      duration: '8 weeks',
      level: 'Intermediate',
      price: 99,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=400',
      description: 'Learn the fundamentals of machine learning and AI.',
      tags: ['Machine Learning', 'Python', 'AI'],
      featured: false
    },
    {
      id: 3,
      title: 'Dr. Sarah Johnson',
      type: 'instructor',
      category: 'programming',
      rating: 4.9,
      students: 5000,
      courses: 12,
      experience: '15 years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      description: 'Former professor at MIT with expertise in React and modern web development.',
      tags: ['React', 'JavaScript', 'Web Development'],
      featured: true
    },
    {
      id: 4,
      title: 'Building Scalable Web Applications',
      type: 'article',
      category: 'programming',
      author: 'Tech Insights',
      views: 2340,
      readTime: '8 min',
      published: '2 days ago',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      description: 'Learn how to build scalable web applications using modern technologies.',
      tags: ['Web Development', 'Scalability', 'Architecture'],
      featured: false
    },
    {
      id: 5,
      title: 'React Community Hub',
      type: 'community',
      category: 'programming',
      members: 15420,
      posts: 2340,
      lastActive: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      description: 'A vibrant community of React developers sharing knowledge and best practices.',
      tags: ['React', 'Community', 'Development'],
      featured: true
    },
    {
      id: 6,
      title: 'E-commerce Platform Project',
      type: 'project',
      category: 'programming',
      creator: 'John Smith',
      downloads: 456,
      rating: 4.6,
      lastUpdated: '1 week ago',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      description: 'A complete e-commerce platform built with React and Node.js.',
      tags: ['React', 'Node.js', 'E-commerce'],
      featured: false
    }
  ];

  const tabs = [
    { id: 'all', name: 'All Results', icon: MagnifyingGlassIcon },
    { id: 'courses', name: 'Courses', icon: AcademicCapIcon },
    { id: 'instructors', name: 'Instructors', icon: UserGroupIcon },
    { id: 'articles', name: 'Articles', icon: DocumentTextIcon },
    { id: 'projects', name: 'Projects', icon: CodeBracketIcon },
    { id: 'communities', name: 'Communities', icon: UsersIcon }
  ];

  const sortOptions = [
    { id: 'relevance', name: 'Most Relevant' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' }
  ];

  const filteredResults = searchResults.filter(result => {
    const matchesSearch = result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || result.category === selectedCategory;
    const matchesTab = activeTab === 'all' || result.type === activeTab;
    return matchesSearch && matchesCategory && matchesTab;
  });

  useEffect(() => {
    if (searchTerm) {
      setSearchParams({ q: searchTerm });
    }
  }, [searchTerm, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    console.log('Search submitted:', searchTerm);
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Search</h1>
          <p className="text-gray-600 mt-2">
            Find courses, instructors, articles, and more.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for courses, instructors, articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <select
                value={filters.level}
                onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              
              <select
                value={filters.duration}
                onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Any Duration</option>
                <option value="short">Short (< 4 weeks)</option>
                <option value="medium">Medium (4-8 weeks)</option>
                <option value="long">Long (> 8 weeks)</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {filteredResults.length} results found
              </p>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {filteredResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3 md:ml-6">
                      <div className="flex items-center space-x-2 mb-3">
                        {result.featured && (
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.type === 'course' ? 'bg-blue-100 text-blue-800' :
                          result.type === 'instructor' ? 'bg-green-100 text-green-800' :
                          result.type === 'article' ? 'bg-purple-100 text-purple-800' :
                          result.type === 'project' ? 'bg-yellow-100 text-yellow-800' :
                          result.type === 'community' ? 'bg-pink-100 text-pink-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {result.type}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.category === 'programming' ? 'bg-blue-100 text-blue-800' :
                          result.category === 'ai-ml' ? 'bg-purple-100 text-purple-800' :
                          result.category === 'design' ? 'bg-pink-100 text-pink-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {result.category}
                        </span>
                        {result.level && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {result.level}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {result.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {result.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        {result.instructor && (
                          <div className="flex items-center">
                            <UserIcon className="w-4 h-4 mr-1" />
                            {result.instructor}
                          </div>
                        )}
                        {result.rating && (
                          <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                            {result.rating}
                          </div>
                        )}
                        {result.students && (
                          <div className="flex items-center">
                            <UsersIcon className="w-4 h-4 mr-1" />
                            {result.students} students
                          </div>
                        )}
                        {result.duration && (
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {result.duration}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        {result.price && (
                          <div className="text-2xl font-bold text-gray-900">
                            ${result.price}
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            View Details
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <BookmarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {filteredResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <MagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or filters.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage; 