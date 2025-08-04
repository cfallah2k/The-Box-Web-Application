import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  XMarkIcon,
  FunnelIcon,
  ClockIcon,
  StarIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BeakerIcon,
  GlobeAltIcon,
  FireIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'course' | 'instructor' | 'topic' | 'category';
  icon: React.ComponentType<any>;
  color: string;
}

interface EnhancedSearchProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
  className?: string;
}

interface SearchFilters {
  category: string[];
  level: string[];
  duration: string[];
  price: string[];
  rating: number;
}

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({
  onSearch,
  placeholder = "Search courses, topics, instructors...",
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: [],
    level: [],
    duration: [],
    price: [],
    rating: 0,
  });
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: 'Programming', icon: AcademicCapIcon, color: 'from-blue-500 to-cyan-500' },
    { name: 'AI & ML', icon: BeakerIcon, color: 'from-purple-500 to-pink-500' },
    { name: 'Data Science', icon: ClockIcon, color: 'from-green-500 to-emerald-500' },
    { name: 'Business', icon: UserGroupIcon, color: 'from-orange-500 to-red-500' },
    { name: 'Design', icon: GlobeAltIcon, color: 'from-indigo-500 to-purple-500' },
    { name: 'Marketing', icon: FireIcon, color: 'from-yellow-500 to-orange-500' },
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = ['< 1 hour', '1-3 hours', '3-6 hours', '6+ hours'];
  const prices = ['Free', 'Paid', 'Subscription'];

  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', title: 'Machine Learning Fundamentals', type: 'course', icon: AcademicCapIcon, color: 'from-blue-500 to-cyan-500' },
    { id: '2', title: 'Python Programming', type: 'course', icon: AcademicCapIcon, color: 'from-green-500 to-emerald-500' },
    { id: '3', title: 'Dr. Sarah Chen', type: 'instructor', icon: UserGroupIcon, color: 'from-purple-500 to-pink-500' },
    { id: '4', title: 'Data Analysis', type: 'topic', icon: BeakerIcon, color: 'from-orange-500 to-red-500' },
    { id: '5', title: 'Web Development', type: 'category', icon: GlobeAltIcon, color: 'from-indigo-500 to-purple-500' },
  ];

  useEffect(() => {
    if (query.length > 2) {
      // Simulate search suggestions
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    onSearch?.(query, filters);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setIsFocused(false);
    onSearch?.(suggestion.title, filters);
  };

  const toggleFilter = (filterType: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: Array.isArray(prev[filterType]) 
        ? (prev[filterType] as string[]).includes(value)
          ? (prev[filterType] as string[]).filter(v => v !== value)
          : [...(prev[filterType] as string[]), value]
        : prev[filterType],
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      level: [],
      duration: [],
      price: [],
      rating: 0,
    });
  };

  const activeFiltersCount = Object.values(filters).reduce((count, filter) => {
    if (Array.isArray(filter)) {
      return count + filter.length;
    }
    return count + (typeof filter === 'number' && filter > 0 ? 1 : 0);
  }, 0);

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-20 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white shadow-lg transition-all duration-200"
        />
        
        {/* Action Buttons */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters
                ? 'bg-blue-500 text-white'
                : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FunnelIcon className="w-5 h-5" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <SparklesIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <div className={`w-8 h-8 bg-gradient-to-r ${suggestion.color} rounded-lg flex items-center justify-center`}>
                  <suggestion.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {suggestion.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {suggestion.type}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Advanced Filters
              </h3>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => toggleFilter('category', category.name)}
                      className={`flex items-center space-x-2 p-2 rounded-lg text-sm transition-colors ${
                        filters.category.includes(category.name)
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-gradient-to-r ${category.color} rounded flex items-center justify-center`}>
                        <category.icon className="w-2 h-2 text-white" />
                      </div>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Level</h4>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => toggleFilter('level', level)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        filters.level.includes(level)
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Duration</h4>
                <div className="flex flex-wrap gap-2">
                  {durations.map((duration) => (
                    <button
                      key={duration}
                      onClick={() => toggleFilter('duration', duration)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        filters.duration.includes(duration)
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Price</h4>
                <div className="flex flex-wrap gap-2">
                  {prices.map((price) => (
                    <button
                      key={price}
                      onClick={() => toggleFilter('price', price)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        filters.price.includes(price)
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Minimum Rating</h4>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters(prev => ({ ...prev, rating }))}
                      className={`p-2 rounded-lg transition-colors ${
                        filters.rating >= rating
                          ? 'text-yellow-500'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    >
                      <StarIcon className="w-5 h-5" />
                    </button>
                  ))}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    {filters.rating}+ stars
                  </span>
                </div>
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedSearch; 