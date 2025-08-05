import React from 'react';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  EyeIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';

const ViewCourseDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const courseData = {
    id: courseId || '1',
    title: 'Advanced React Development',
    description: 'Master React with hooks, context, and advanced patterns. Build real-world applications with modern React best practices.',
    category: 'Programming',
    level: 'intermediate',
    price: 99.99,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    language: 'English',
    maxStudents: 100,
    isPublished: true,
    sections: [
      { id: '1', title: 'Introduction to React Hooks', type: 'video', duration: 45, isPublished: true },
      { id: '2', title: 'Context API Deep Dive', type: 'video', duration: 60, isPublished: true },
      { id: '3', title: 'Advanced Patterns Quiz', type: 'quiz', duration: 30, isPublished: false },
    ],
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    enrolledStudents: 45,
    rating: 4.7,
    totalReviews: 23,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/instructor/courses')}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Course Details</h1>
              <p className="text-gray-600 dark:text-gray-400">View and manage your course</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/instructor/edit-course/${courseId}`)}
              className="btn-secondary"
            >
              <PencilIcon className="w-4 h-4" />
              Edit Course
            </button>
            <button className="btn-primary">
              <PlayIcon className="w-4 h-4" />
              Start Session
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-start space-x-6">
                <img
                  src={courseData.thumbnail}
                  alt={courseData.title}
                  className="w-32 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {courseData.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {courseData.description}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                      {courseData.category}
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm">
                      {courseData.level}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                      {courseData.language}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Course Sections</h3>
              <div className="space-y-4">
                {courseData.sections.map((section, index) => (
                  <div key={section.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{section.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{section.type}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{section.duration} min</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            section.isPublished 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {section.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {courseData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <UserGroupIcon className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Enrolled Students</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{courseData.enrolledStudents}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Rating</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{courseData.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <DocumentTextIcon className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Sections</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{courseData.sections.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CurrencyDollarIcon className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Price</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">${courseData.price}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary">
                  <PlayIcon className="w-4 h-4" />
                  Start Live Session
                </button>
                <button className="w-full btn-secondary">
                  <ChartBarIcon className="w-4 h-4" />
                  View Analytics
                </button>
                <button className="w-full btn-secondary">
                  <UserGroupIcon className="w-4 h-4" />
                  Manage Students
                </button>
                <button className="w-full btn-secondary">
                  <DocumentTextIcon className="w-4 h-4" />
                  Export Course
                </button>
              </div>
            </div>

            {/* Course Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Created:</span>
                  <span className="text-gray-900 dark:text-white">
                    {new Date(courseData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                  <span className="text-gray-900 dark:text-white">
                    {new Date(courseData.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    courseData.isPublished 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {courseData.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Max Students:</span>
                  <span className="text-gray-900 dark:text-white">{courseData.maxStudents}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourseDetailsPage; 