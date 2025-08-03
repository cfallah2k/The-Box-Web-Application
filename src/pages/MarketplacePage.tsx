import {
  AcademicCapIcon,
  BeakerIcon,
  BookOpenIcon,
  ClockIcon,
  CogIcon,
  EyeIcon,
  GlobeAltIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  StarIcon,
  TrophyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const MarketplacePage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', icon: BookOpenIcon },
    { id: 'courses', name: 'Courses', icon: AcademicCapIcon },
    { id: 'tools', name: 'Tools & Software', icon: CogIcon },
    { id: 'services', name: 'Services', icon: GlobeAltIcon },
    { id: 'certifications', name: 'Certifications', icon: TrophyIcon },
    { id: 'templates', name: 'Templates', icon: BeakerIcon },
  ];

  const marketplaceItems = [
    {
      id: 1,
      title: 'Advanced React Development Course',
      type: 'course',
      instructor: 'Dr. Sarah Johnson',
      price: 89,
      originalPrice: 129,
      rating: 4.9,
      students: 1247,
      duration: '12 weeks',
      level: 'Advanced',
      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      description:
        'Master React with advanced patterns, hooks, and state management.',
      tags: ['React', 'JavaScript', 'Frontend'],
      featured: true,
      bestSeller: true,
    },
    {
      id: 2,
      title: 'AI-Powered Code Review Tool',
      type: 'tool',
      creator: 'TechCorp Solutions',
      price: 29,
      originalPrice: 49,
      rating: 4.7,
      users: 892,
      category: 'Development',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=400',
      description:
        'Automated code review with AI-powered suggestions and best practices.',
      tags: ['AI', 'Code Review', 'Development'],
      featured: false,
      bestSeller: false,
    },
    {
      id: 3,
      title: 'Personal Learning Coach Service',
      type: 'service',
      provider: 'Learning Partners Inc.',
      price: 199,
      originalPrice: 299,
      rating: 4.8,
      clients: 156,
      duration: '3 months',
      category: 'Coaching',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
      description: 'One-on-one coaching to accelerate your learning journey.',
      tags: ['Coaching', 'Personal', 'Mentoring'],
      featured: true,
      bestSeller: false,
    },
    {
      id: 4,
      title: 'Data Science Certification',
      type: 'certification',
      issuer: 'Data Science Institute',
      price: 149,
      originalPrice: 199,
      rating: 4.6,
      certified: 734,
      duration: '6 months',
      level: 'Professional',
      image:
        'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      description:
        'Comprehensive data science certification with industry recognition.',
      tags: ['Data Science', 'Certification', 'Python'],
      featured: false,
      bestSeller: true,
    },
    {
      id: 5,
      title: 'React Component Library',
      type: 'template',
      creator: 'Design Systems Co.',
      price: 39,
      originalPrice: 59,
      rating: 4.5,
      downloads: 456,
      components: 50,
      category: 'UI/UX',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      description:
        'Professional React component library with 50+ reusable components.',
      tags: ['React', 'Components', 'UI/UX'],
      featured: false,
      bestSeller: false,
    },
    {
      id: 6,
      title: 'Machine Learning Workshop',
      type: 'service',
      provider: 'AI Academy',
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      participants: 89,
      duration: '2 days',
      level: 'Intermediate',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=400',
      description: 'Intensive 2-day workshop on machine learning fundamentals.',
      tags: ['Machine Learning', 'Workshop', 'AI'],
      featured: true,
      bestSeller: true,
    },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'newest', name: 'Newest' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'free', name: 'Free' },
    { id: 'under-50', name: 'Under $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: '100-200', name: '$100 - $200' },
    { id: 'over-200', name: 'Over $200' },
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.type === selectedCategory;
    const matchesPrice =
      priceRange === 'all' ||
      (priceRange === 'free' && item.price === 0) ||
      (priceRange === 'under-50' && item.price < 50) ||
      (priceRange === '50-100' && item.price >= 50 && item.price <= 100) ||
      (priceRange === '100-200' && item.price >= 100 && item.price <= 200) ||
      (priceRange === 'over-200' && item.price > 200);

    return matchesSearch && matchesCategory && matchesPrice;
  });

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
            Learning Marketplace
          </h1>
          <p className="text-xl text-gray-600">
            Discover premium courses, tools, and services to accelerate your
            learning journey.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search marketplace..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <select
                value={priceRange}
                onChange={e => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Featured Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceItems
              .filter(item => item.featured)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow relative"
                >
                  {item.bestSeller && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Best Seller
                    </div>
                  )}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <HeartIcon className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <EyeIcon className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === 'course'
                            ? 'bg-blue-100 text-blue-800'
                            : item.type === 'tool'
                            ? 'bg-green-100 text-green-800'
                            : item.type === 'service'
                            ? 'bg-purple-100 text-purple-800'
                            : item.type === 'certification'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.type}
                      </span>
                      <div className="flex items-center">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900 ml-1">
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-1" />
                        {item.instructor || item.creator || item.provider}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {item.duration}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          ${item.price}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                        <ShoppingCartIcon className="w-4 h-4 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* All Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Items</h2>
            <p className="text-gray-600">
              Showing {filteredItems.length} of {marketplaceItems.length} items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow relative"
              >
                {item.bestSeller && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Best Seller
                  </div>
                )}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <HeartIcon className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <EyeIcon className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.type === 'course'
                          ? 'bg-blue-100 text-blue-800'
                          : item.type === 'tool'
                          ? 'bg-green-100 text-green-800'
                          : item.type === 'service'
                          ? 'bg-purple-100 text-purple-800'
                          : item.type === 'certification'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.type}
                    </span>
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900 ml-1">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 mr-1" />
                      {item.instructor || item.creator || item.provider}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {item.duration}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${item.price}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                      <ShoppingCartIcon className="w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <ShoppingCartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No items found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or browse all items.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MarketplacePage;
