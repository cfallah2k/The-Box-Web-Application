import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  ClockIcon,
  UserIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'programming', name: 'Programming' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      students: 15420,
      price: '$89',
      duration: '12 weeks',
      level: 'Intermediate',
      category: 'programming',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      description: 'Master React development with hands-on projects and real-world applications.',
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      instructor: 'Prof. Michael Chen',
      rating: 4.9,
      students: 8920,
      price: '$129',
      duration: '16 weeks',
      level: 'Advanced',
      category: 'data-science',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop',
      description: 'Learn the fundamentals of machine learning and artificial intelligence.',
    },
    {
      id: 3,
      title: 'Digital Marketing Masterclass',
      instructor: 'Emma Rodriguez',
      rating: 4.7,
      students: 12350,
      price: '$69',
      duration: '8 weeks',
      level: 'Beginner',
      category: 'marketing',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      description: 'Comprehensive digital marketing strategies for modern businesses.',
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      instructor: 'Alex Thompson',
      rating: 4.6,
      students: 6780,
      price: '$79',
      duration: '10 weeks',
      level: 'Intermediate',
      category: 'design',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
      description: 'Master the principles of user interface and user experience design.',
    },
    {
      id: 5,
      title: 'Business Strategy & Leadership',
      instructor: 'Dr. Lisa Wang',
      rating: 4.8,
      students: 9450,
      price: '$99',
      duration: '14 weeks',
      level: 'Advanced',
      category: 'business',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
      description: 'Develop strategic thinking and leadership skills for business success.',
    },
    {
      id: 6,
      title: 'Python for Data Science',
      instructor: 'David Kim',
      rating: 4.9,
      students: 18760,
      price: '$89',
      duration: '12 weeks',
      level: 'Beginner',
      category: 'data-science',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop',
      description: 'Learn Python programming for data analysis and visualization.',
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Explore Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover thousands of courses from top instructors worldwide
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
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses, instructors..."
                className="input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
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
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                  {course.price}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                      <PlayIcon className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded">
                    {course.level}
                  </span>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {course.rating}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <UserIcon className="w-4 h-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {course.students.toLocaleString()} students enrolled
                  </span>
                  <button className="btn btn-primary text-sm">
                    Enroll Now
                  </button>
                </div>
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
            <div className="text-gray-400 mb-4">
              <MagnifyingGlassIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No courses found
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

export default CoursesPage; 