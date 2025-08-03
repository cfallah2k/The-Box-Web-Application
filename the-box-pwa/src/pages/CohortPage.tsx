import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  ChartBarIcon,
  StarIcon,
  EyeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FilterIcon,
  BookOpenIcon,
  TrophyIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import ProgressRing from '@/components/ui/ProgressRing';
import { Badge } from '@/components/ui/Badge';

const CohortPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filters = [
    { id: 'all', name: 'All Cohorts' },
    { id: 'active', name: 'Active' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'completed', name: 'Completed' },
  ];

  const cohorts = [
    {
      id: 1,
      name: 'React Mastery 2024',
      description: 'Master React development with hands-on projects and real-world applications',
      instructor: 'Dr. Sarah Johnson',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      status: 'active',
      enrolledStudents: 24,
      maxStudents: 30,
      progress: 65,
      category: 'Programming',
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      rating: 4.8,
      totalHours: 120,
      sessionsPerWeek: 3,
      nextSession: '2024-01-25T14:00:00Z',
    },
    {
      id: 2,
      name: 'Data Science Bootcamp',
      description: 'Comprehensive data science program covering Python, ML, and analytics',
      instructor: 'Prof. Michael Chen',
      startDate: '2024-03-15',
      endDate: '2024-06-15',
      status: 'upcoming',
      enrolledStudents: 18,
      maxStudents: 25,
      progress: 0,
      category: 'Data Science',
      level: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop',
      rating: 4.9,
      totalHours: 180,
      sessionsPerWeek: 4,
      nextSession: '2024-03-15T10:00:00Z',
    },
    {
      id: 3,
      name: 'UX Design Fundamentals',
      description: 'Learn user experience design principles and practical applications',
      instructor: 'Emma Rodriguez',
      startDate: '2024-01-10',
      endDate: '2024-03-10',
      status: 'completed',
      enrolledStudents: 20,
      maxStudents: 20,
      progress: 100,
      category: 'Design',
      level: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      rating: 4.7,
      totalHours: 80,
      sessionsPerWeek: 2,
      nextSession: null,
    },
    {
      id: 4,
      name: 'Machine Learning Engineering',
      description: 'Advanced ML engineering with deployment and production systems',
      instructor: 'Dr. Alex Thompson',
      startDate: '2024-04-01',
      endDate: '2024-07-01',
      status: 'upcoming',
      enrolledStudents: 12,
      maxStudents: 20,
      progress: 0,
      category: 'Artificial Intelligence',
      level: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
      rating: 4.6,
      totalHours: 200,
      sessionsPerWeek: 3,
      nextSession: '2024-04-01T16:00:00Z',
    },
  ];

  const filteredCohorts = cohorts.filter(cohort => {
    const matchesSearch = cohort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cohort.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || cohort.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'upcoming': return 'warning';
      case 'completed': return 'secondary';
      default: return 'secondary';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'secondary';
    }
  };

  const stats = {
    total: cohorts.length,
    active: cohorts.filter(c => c.status === 'active').length,
    upcoming: cohorts.filter(c => c.status === 'upcoming').length,
    completed: cohorts.filter(c => c.status === 'completed').length,
    totalStudents: cohorts.reduce((acc, c) => acc + c.enrolledStudents, 0),
    avgRating: (cohorts.reduce((acc, c) => acc + c.rating, 0) / cohorts.length).toFixed(1),
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Learning Cohorts
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Join structured learning programs with peers and expert instructors
              </p>
            </div>
            <button className="btn btn-primary flex items-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>Create Cohort</span>
            </button>
          </div>
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
                <UserGroupIcon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Cohorts
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
                <FireIcon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Cohorts
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.active}
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
              <div className="p-3 rounded-lg bg-secondary-50 text-secondary-600">
                <AcademicCapIcon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalStudents}
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
              <div className="p-3 rounded-lg bg-warning-50 text-warning-600">
                <StarIcon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Avg Rating
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.avgRating}
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
                placeholder="Search cohorts..."
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
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Cohorts Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCohorts.map((cohort, index) => (
              <motion.div
                key={cohort.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={cohort.thumbnail}
                    alt={cohort.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <Badge variant={getStatusColor(cohort.status) as any}>
                      {cohort.status}
                    </Badge>
                    <Badge variant={getLevelColor(cohort.level) as any}>
                      {cohort.level}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">{cohort.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                    {cohort.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {cohort.description}
                  </p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Instructor</span>
                      <span className="font-medium">{cohort.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium">{cohort.totalHours} hours</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Students</span>
                      <span className="font-medium">{cohort.enrolledStudents}/{cohort.maxStudents}</span>
                    </div>
                  </div>

                  {cohort.status === 'active' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{cohort.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className="h-2 bg-primary-600 rounded-full transition-all duration-300"
                          style={{ width: `${cohort.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{new Date(cohort.startDate).toLocaleDateString()}</span>
                    </div>
                    <button className="btn btn-primary btn-sm">
                      <EyeIcon className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCohorts.map((cohort, index) => (
              <motion.div
                key={cohort.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={cohort.thumbnail}
                    alt={cohort.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {cohort.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {cohort.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(cohort.status) as any}>
                          {cohort.status}
                        </Badge>
                        <Badge variant={getLevelColor(cohort.level) as any}>
                          {cohort.level}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Instructor</span>
                        <p className="font-medium">{cohort.instructor}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration</span>
                        <p className="font-medium">{cohort.totalHours} hours</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Students</span>
                        <p className="font-medium">{cohort.enrolledStudents}/{cohort.maxStudents}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Rating</span>
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-4 h-4 text-yellow-400" />
                          <span className="font-medium">{cohort.rating}</span>
                        </div>
                      </div>
                    </div>

                    {cohort.status === 'active' && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{cohort.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div
                            className="h-2 bg-primary-600 rounded-full"
                            style={{ width: `${cohort.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <button className="btn btn-primary btn-sm">
                      <EyeIcon className="w-4 h-4" />
                      View Details
                    </button>
                    <div className="text-sm text-gray-500">
                      {new Date(cohort.startDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredCohorts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <UserGroupIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No cohorts found
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

export default CohortPage; 