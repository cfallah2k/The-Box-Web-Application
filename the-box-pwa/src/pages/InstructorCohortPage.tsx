import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  StarIcon,
  EyeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  FilterIcon,
  ChartBarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import ProgressRing from '@/components/ui/ProgressRing';
import { Badge } from '@/components/ui/Badge';

const InstructorCohortPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filters = [
    { id: 'all', name: 'All Cohorts' },
    { id: 'active', name: 'Active' },
    { id: 'draft', name: 'Draft' },
    { id: 'completed', name: 'Completed' },
    { id: 'archived', name: 'Archived' },
  ];

  const cohorts = [
    {
      id: 1,
      name: 'React Mastery 2024',
      description: 'Master React development with hands-on projects and real-world applications',
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
      revenue: 7200,
      nextSession: '2024-01-25T14:00:00Z',
    },
    {
      id: 2,
      name: 'Advanced TypeScript Patterns',
      description: 'Deep dive into TypeScript advanced patterns and best practices',
      startDate: '2024-03-15',
      endDate: '2024-05-15',
      status: 'draft',
      enrolledStudents: 0,
      maxStudents: 25,
      progress: 0,
      category: 'Programming',
      level: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop',
      rating: 0,
      totalHours: 80,
      sessionsPerWeek: 2,
      revenue: 0,
      nextSession: null,
    },
    {
      id: 3,
      name: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js and Express',
      startDate: '2024-01-10',
      endDate: '2024-03-10',
      status: 'completed',
      enrolledStudents: 20,
      maxStudents: 20,
      progress: 100,
      category: 'Backend Development',
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
      rating: 4.7,
      totalHours: 100,
      sessionsPerWeek: 2,
      revenue: 6000,
      nextSession: null,
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
      case 'draft': return 'warning';
      case 'completed': return 'secondary';
      case 'archived': return 'error';
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
    draft: cohorts.filter(c => c.status === 'draft').length,
    completed: cohorts.filter(c => c.status === 'completed').length,
    totalStudents: cohorts.reduce((acc, c) => acc + c.enrolledStudents, 0),
    totalRevenue: cohorts.reduce((acc, c) => acc + c.revenue, 0),
    avgRating: (cohorts.reduce((acc, c) => acc + c.rating, 0) / cohorts.filter(c => c.rating > 0).length).toFixed(1),
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
                My Cohorts
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your learning cohorts and track student progress
              </p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary flex items-center space-x-2"
            >
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
                <PlayIcon className="w-6 h-6" />
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
                <CurrencyDollarIcon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${stats.totalRevenue.toLocaleString()}
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
          </div>
        </motion.div>

        {/* Cohorts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCohorts.map((cohort, index) => (
            <motion.div
              key={cohort.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={cohort.thumbnail}
                  alt={cohort.name}
                  className="w-full h-48 object-cover"
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {cohort.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {cohort.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Students</span>
                    <span className="font-medium">{cohort.enrolledStudents}/{cohort.maxStudents}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium">{cohort.totalHours} hours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Revenue</span>
                    <span className="font-medium">${cohort.revenue.toLocaleString()}</span>
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
                  <div className="flex items-center space-x-2">
                    <button className="btn btn-outline btn-sm">
                      <EyeIcon className="w-4 h-4" />
                      View
                    </button>
                    <button className="btn btn-outline btn-sm">
                      <PencilIcon className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="btn btn-outline btn-sm text-error-600 hover:text-error-700">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first cohort'
              }
            </p>
            {!searchTerm && selectedFilter === 'all' && (
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Create Your First Cohort
              </button>
            )}
          </motion.div>
        )}

        {/* Create Cohort Modal */}
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-8 max-w-2xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Create New Cohort
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="label">Cohort Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter cohort name"
                  />
                </div>

                <div>
                  <label className="label">Description</label>
                  <textarea
                    className="input"
                    rows={3}
                    placeholder="Describe your cohort"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Start Date</label>
                    <input
                      type="date"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">End Date</label>
                    <input
                      type="date"
                      className="input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="label">Category</label>
                    <select className="input">
                      <option>Programming</option>
                      <option>Design</option>
                      <option>Business</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Level</label>
                    <select className="input">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Max Students</label>
                    <input
                      type="number"
                      className="input"
                      placeholder="30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Total Hours</label>
                    <input
                      type="number"
                      className="input"
                      placeholder="120"
                    />
                  </div>
                  <div>
                    <label className="label">Sessions per Week</label>
                    <input
                      type="number"
                      className="input"
                      placeholder="3"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Price ($)</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="299"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Create Cohort
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InstructorCohortPage; 