import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CodeBracketIcon,
  BeakerIcon,
  GlobeAltIcon,
  ChartBarIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const CoursesPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpenIcon },
    { id: 'programming', name: 'Programming', icon: CodeBracketIcon },
    { id: 'data-science', name: 'Data Science', icon: ChartBarIcon },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: BeakerIcon },
    { id: 'business', name: 'Business', icon: GlobeAltIcon },
    { id: 'design', name: 'Design', icon: CameraIcon },
    { id: 'marketing', name: 'Marketing', icon: ChartBarIcon }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'newest', name: 'Newest' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'price', name: 'Price' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Dr. Sarah Johnson',
      category: 'programming',
      level: 'advanced',
      rating: 4.9,
      students: 1247,
      duration: '12 weeks',
      price: 89,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      description: 'Master React with advanced patterns, hooks, and state management.',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      instructor: 'Prof. Michael Chen',
      category: 'ai-ml',
      level: 'intermediate',
      rating: 4.8,
      students: 892,
      duration: '16 weeks',
      price: 129,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=400',
      description: 'Learn the fundamentals of machine learning and neural networks.',
      tags: ['Python', 'ML', 'AI']
    },
    {
      id: 3,
      title: 'Data Science with Python',
      instructor: 'Dr. Emily Rodriguez',
      category: 'data-science',
      level: 'intermediate',
      rating: 4.7,
      students: 1567,
      duration: '14 weeks',
      price: 99,
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      description: 'Comprehensive data science course covering analysis and visualization.',
      tags: ['Python', 'Data Science', 'Pandas']
    },
    {
      id: 4,
      title: 'Digital Marketing Mastery',
      instructor: 'Lisa Wang',
      category: 'marketing',
      level: 'beginner',
      rating: 4.6,
      students: 734,
      duration: '8 weeks',
      price: 69,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      description: 'Learn modern digital marketing strategies and tools.',
      tags: ['Marketing', 'SEO', 'Social Media']
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      instructor: 'Alex Thompson',
      category: 'design',
      level: 'beginner',
      rating: 4.8,
      students: 456,
      duration: '10 weeks',
      price: 79,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      description: 'Master the principles of user interface and experience design.',
      tags: ['Design', 'UI/UX', 'Figma']
    },
    {
      id: 6,
      title: 'Business Strategy & Leadership',
      instructor: 'David Kim',
      category: 'business',
      level: 'advanced',
      rating: 4.9,
      students: 323,
      duration: '12 weeks',
      price: 149,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      description: 'Develop strategic thinking and leadership skills for business success.',
      tags: ['Leadership', 'Strategy', 'Management']
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Courses
          </h1>
          <p className="text-gray-600">
            Discover world-class courses taught by industry experts and advance your career.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    ${course.price}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900 ml-1">
                      {course.rating}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  by {course.instructor}
                </p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="w-4 h-4 mr-1" />
                    {course.students.toLocaleString()} students
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/courses/${course.id}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center block"
                >
                  View Course
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <AcademicCapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all courses.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage; 