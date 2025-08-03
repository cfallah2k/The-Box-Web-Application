import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  StarIcon,
  EyeIcon,
  DownloadIcon,
  ShareIcon,
  BookOpenIcon,
  UserIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import ProgressRing from '@/components/ui/ProgressRing';
import { Badge } from '@/components/ui/Badge';

const CourseCheckPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Courses' },
    { id: 'completed', name: 'Completed' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'not-started', name: 'Not Started' },
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete React Developer Course 2024',
      instructor: 'Dr. Sarah Johnson',
      status: 'completed',
      progress: 100,
      grade: 95,
      certificate: true,
      completedDate: '2024-01-15',
      enrolledDate: '2024-01-01',
      totalHours: 42,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      category: 'Programming',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      instructor: 'Prof. Michael Chen',
      status: 'in-progress',
      progress: 75,
      grade: null,
      certificate: false,
      completedDate: null,
      enrolledDate: '2024-01-10',
      totalHours: 28,
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop',
      category: 'Programming',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Alex Thompson',
      status: 'not-started',
      progress: 0,
      grade: null,
      certificate: false,
      completedDate: null,
      enrolledDate: '2024-01-20',
      totalHours: 35,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
      category: 'Data Science',
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      instructor: 'Emma Rodriguez',
      status: 'completed',
      progress: 100,
      grade: 88,
      certificate: true,
      completedDate: '2024-01-12',
      enrolledDate: '2024-01-05',
      totalHours: 24,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      category: 'Marketing',
      rating: 4.6,
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || course.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'not-started': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircleIcon;
      case 'in-progress': return ClockIcon;
      case 'not-started': return BookOpenIcon;
      default: return BookOpenIcon;
    }
  };

  const stats = {
    total: courses.length,
    completed: courses.filter(c => c.status === 'completed').length,
    inProgress: courses.filter(c => c.status === 'in-progress').length,
    notStarted: courses.filter(c => c.status === 'not-started').length,
    avgGrade: Math.round(courses.filter(c => c.grade).reduce((acc, c) => acc + (c.grade || 0), 0) / courses.filter(c => c.grade).length),
    totalHours: courses.reduce((acc, c) => acc + c.totalHours, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Course Check & Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your learning progress and verify course completion
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-primary-50 text-primary-600">
                <BookOpenIcon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Courses
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-success-50 text-success-600">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Completed
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.completed}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-warning-50 text-warning-600">
                <ClockIcon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.inProgress}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-secondary-50 text-secondary-600">
                <AcademicCapIcon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Avg Grade
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.avgGrade}%
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="input"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {filters.map(filter => (
                <option key={filter.id} value={filter.id}>
                  {filter.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Course List */}
        <div className="space-y-6">
          {filteredCourses.map((course, index) => {
            const StatusIcon = getStatusIcon(course.status);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Course Image */}
                  <div className="lg:w-48">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Course Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {course.title}
                          </h3>
                          <Badge variant={getStatusColor(course.status) as any}>
                            {course.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Instructor: {course.instructor}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span>{course.rating}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <ClockIcon className="w-4 h-4" />
                            <span>{course.totalHours} hours</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>Enrolled: {new Date(course.enrolledDate).toLocaleDateString()}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex justify-center mb-2">
                          <ProgressRing progress={course.progress} size={60} />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
                      </div>

                      {course.grade && (
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {course.grade}%
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Grade</p>
                        </div>
                      )}

                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex justify-center mb-2">
                          <StatusIcon className={`w-6 h-6 ${
                            course.status === 'completed' ? 'text-success-600' :
                            course.status === 'in-progress' ? 'text-warning-600' :
                            'text-gray-400'
                          }`} />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                      </div>

                      {course.certificate && (
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex justify-center mb-2">
                            <AcademicCapIcon className="w-6 h-6 text-success-600" />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Certificate</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3 mt-6">
                      <button className="btn btn-outline btn-sm">
                        <EyeIcon className="w-4 h-4" />
                        View Course
                      </button>
                      {course.certificate && (
                        <button className="btn btn-outline btn-sm">
                          <DownloadIcon className="w-4 h-4" />
                          Download Certificate
                        </button>
                      )}
                      {course.status === 'completed' && (
                        <button className="btn btn-outline btn-sm">
                          <ShareIcon className="w-4 h-4" />
                          Share Achievement
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                {course.status === 'completed' && course.completedDate && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Completed on: {new Date(course.completedDate).toLocaleDateString()}
                      </span>
                      {course.grade && (
                        <span className="text-gray-600 dark:text-gray-400">
                          Final Grade: {course.grade}%
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <BookOpenIcon className="w-16 h-16 mx-auto" />
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

export default CourseCheckPage; 