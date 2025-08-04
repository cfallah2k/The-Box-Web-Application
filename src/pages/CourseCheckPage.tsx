import {
  AcademicCapIcon,
  BellIcon,
  BookmarkIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  FireIcon,
  BeakerIcon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  ShareIcon,
  TrophyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CourseCheckPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('assessments');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Assessments', icon: AcademicCapIcon },
    { id: 'quiz', name: 'Quizzes', icon: QuestionMarkCircleIcon },
    { id: 'project', name: 'Projects', icon: CodeBracketIcon },
    { id: 'exam', name: 'Exams', icon: DocumentTextIcon },
    { id: 'practical', name: 'Practical Tests', icon: BeakerIcon },
    { id: 'presentation', name: 'Presentations', icon: MicrophoneIcon },
  ];

  const assessments = [
    {
      id: 1,
      title: 'React Fundamentals Quiz',
      course: 'Advanced React Development',
      instructor: 'Dr. Sarah Johnson',
      type: 'quiz',
      status: 'completed',
      score: 85,
      maxScore: 100,
      timeLimit: '30 minutes',
      questions: 25,
      dueDate: '2024-02-15',
      completedDate: '2024-02-14',
      feedback:
        'Great work! You demonstrated strong understanding of React fundamentals.',
      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      description:
        'Test your knowledge of React fundamentals including components, props, and state.',
      tags: ['React', 'JavaScript', 'Frontend'],
      featured: true,
      level: 'Intermediate',
    },
    {
      id: 2,
      title: 'Machine Learning Project',
      course: 'Machine Learning Fundamentals',
      instructor: 'Prof. Michael Chen',
      type: 'project',
      status: 'active',
      score: null,
      maxScore: 100,
      timeLimit: '2 weeks',
      questions: null,
      dueDate: '2024-02-28',
      completedDate: null,
      feedback: null,
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=400',
      description:
        'Build a machine learning model to predict housing prices using Python and scikit-learn.',
      tags: ['Machine Learning', 'Python', 'Data Science'],
      featured: false,
      level: 'Advanced',
    },
    {
      id: 3,
      title: 'UI/UX Design Portfolio',
      course: 'UI/UX Design Principles',
      instructor: 'Emily Rodriguez',
      type: 'project',
      status: 'completed',
      score: 92,
      maxScore: 100,
      timeLimit: '3 weeks',
      questions: null,
      dueDate: '2024-01-30',
      completedDate: '2024-01-28',
      feedback:
        'Excellent portfolio! Your design thinking and user-centered approach are outstanding.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      description:
        'Create a comprehensive UI/UX design portfolio showcasing your skills and projects.',
      tags: ['UI/UX', 'Design', 'Portfolio'],
      featured: true,
      level: 'Intermediate',
    },
    {
      id: 4,
      title: 'Data Science Final Exam',
      course: 'Data Science with Python',
      instructor: 'Dr. David Kim',
      type: 'exam',
      status: 'upcoming',
      score: null,
      maxScore: 100,
      timeLimit: '2 hours',
      questions: 50,
      dueDate: '2024-03-05',
      completedDate: null,
      feedback: null,
      image:
        'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      description:
        'Comprehensive final exam covering all data science concepts and Python programming.',
      tags: ['Data Science', 'Python', 'Analytics'],
      featured: false,
      level: 'Advanced',
    },
  ];

  const progressReports = [
    {
      id: 1,
      course: 'Advanced React Development',
      overallProgress: 75,
      assessmentsCompleted: 3,
      totalAssessments: 5,
      averageScore: 87,
      timeSpent: '45 hours',
      nextAssessment: 'State Management Quiz',
      nextDueDate: '2024-02-25',
      strengths: ['Component Architecture', 'Hooks Usage', 'State Management'],
      areasForImprovement: ['Performance Optimization', 'Testing'],
    },
    {
      id: 2,
      course: 'Machine Learning Fundamentals',
      overallProgress: 60,
      assessmentsCompleted: 2,
      totalAssessments: 4,
      averageScore: 82,
      timeSpent: '38 hours',
      nextAssessment: 'Neural Networks Project',
      nextDueDate: '2024-03-01',
      strengths: ['Data Preprocessing', 'Model Selection'],
      areasForImprovement: ['Deep Learning', 'Model Evaluation'],
    },
  ];

  const certificates = [
    {
      id: 1,
      title: 'React Development Certificate',
      course: 'Advanced React Development',
      issueDate: '2024-01-15',
      expiryDate: '2026-01-15',
      score: 87,
      status: 'active',
      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    },
    {
      id: 2,
      title: 'UI/UX Design Certificate',
      course: 'UI/UX Design Principles',
      issueDate: '2024-01-30',
      expiryDate: '2026-01-30',
      score: 92,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    },
  ];

  const tabs = [
    { id: 'assessments', name: 'Assessments', icon: AcademicCapIcon },
    { id: 'progress', name: 'Progress Reports', icon: ChartBarIcon },
    { id: 'certificates', name: 'Certificates', icon: TrophyIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
  ];

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch =
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || assessment.type === selectedCategory;
    return matchesSearch && matchesCategory;
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Course Check</h1>
              <p className="text-gray-600 mt-2">
                Track your assessments, progress, and achievements.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="w-5 h-5 mr-2 inline" />
                New Assessment
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <BellIcon className="w-5 h-5 mr-2 inline" />
                Notifications
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search assessments..."
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

            {/* Sort */}
            <div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Most Recent</option>
                <option>Due Date</option>
                <option>Score</option>
                <option>Status</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
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
            {activeTab === 'assessments' && (
              <div className="space-y-6">
                {filteredAssessments.map((assessment, index) => (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={assessment.image}
                          alt={assessment.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3 md:ml-6">
                        <div className="flex items-center space-x-2 mb-3">
                          {assessment.featured && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              assessment.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : assessment.status === 'active'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {assessment.status}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              assessment.type === 'quiz'
                                ? 'bg-blue-100 text-blue-800'
                                : assessment.type === 'project'
                                ? 'bg-green-100 text-green-800'
                                : assessment.type === 'exam'
                                ? 'bg-red-100 text-red-800'
                                : assessment.type === 'practical'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {assessment.type}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {assessment.level}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {assessment.title}
                        </h3>

                        <p className="text-gray-600 mb-4">
                          {assessment.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <UserIcon className="w-4 h-4 mr-1" />
                            {assessment.instructor}
                          </div>
                          <div className="flex items-center">
                            <AcademicCapIcon className="w-4 h-4 mr-1" />
                            {assessment.course}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {assessment.timeLimit}
                          </div>
                          {assessment.questions && (
                            <div className="flex items-center">
                              <QuestionMarkCircleIcon className="w-4 h-4 mr-1" />
                              {assessment.questions} questions
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {assessment.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {assessment.score !== null ? (
                              <div>
                                <span className="text-sm text-gray-500">
                                  Score
                                </span>
                                <div className="flex items-center">
                                  <div className="text-lg font-bold text-green-600">
                                    {assessment.score}/{assessment.maxScore}
                                  </div>
                                  <div className="ml-2 text-sm text-gray-500">
                                    (
                                    {Math.round(
                                      (assessment.score / assessment.maxScore) *
                                        100
                                    )}
                                    %)
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <span className="text-sm text-gray-500">
                                  Due Date
                                </span>
                                <div className="text-sm font-medium">
                                  {assessment.dueDate}
                                </div>
                              </div>
                            )}
                            {assessment.completedDate && (
                              <div>
                                <span className="text-sm text-gray-500">
                                  Completed
                                </span>
                                <div className="text-sm font-medium">
                                  {assessment.completedDate}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {assessment.status === 'completed' ? (
                              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                View Results
                              </button>
                            ) : assessment.status === 'active' ? (
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Continue
                              </button>
                            ) : (
                              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                                Start
                              </button>
                            )}
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <BookmarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {assessment.feedback && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">
                              Feedback
                            </h4>
                            <p className="text-blue-800 text-sm">
                              {assessment.feedback}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                {progressReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {report.course}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {report.timeSpent}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <span className="text-sm text-gray-500">
                          Overall Progress
                        </span>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-3 mr-2">
                            <div
                              className="bg-blue-600 h-3 rounded-full"
                              style={{ width: `${report.overallProgress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {report.overallProgress}%
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-gray-500">
                          Assessments
                        </span>
                        <div className="text-lg font-medium">
                          {report.assessmentsCompleted}/
                          {report.totalAssessments}
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-gray-500">
                          Average Score
                        </span>
                        <div className="text-lg font-medium text-green-600">
                          {report.averageScore}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Strengths
                        </h4>
                        <div className="space-y-1">
                          {report.strengths.map((strength, strengthIndex) => (
                            <div
                              key={strengthIndex}
                              className="flex items-center text-sm text-green-700"
                            >
                              <CheckCircleIcon className="w-4 h-4 mr-2" />
                              {strength}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Areas for Improvement
                        </h4>
                        <div className="space-y-1">
                          {report.areasForImprovement.map((area, areaIndex) => (
                            <div
                              key={areaIndex}
                              className="flex items-center text-sm text-orange-700"
                            >
                              <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
                              {area}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">
                            Next Assessment
                          </span>
                          <div className="text-sm font-medium">
                            {report.nextAssessment}
                          </div>
                          <div className="text-xs text-gray-500">
                            Due: {report.nextDueDate}
                          </div>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((certificate, index) => (
                    <motion.div
                      key={certificate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              certificate.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {certificate.status}
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            {certificate.score}%
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {certificate.title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-4">
                          {certificate.course}
                        </p>

                        <div className="space-y-2 text-sm text-gray-500 mb-4">
                          <div>Issued: {certificate.issueDate}</div>
                          <div>Expires: {certificate.expiryDate}</div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            Download
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <ShareIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Total Assessments
                        </p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Completed
                        </p>
                        <p className="text-2xl font-bold text-gray-900">8</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <TrophyIcon className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Average Score
                        </p>
                        <p className="text-2xl font-bold text-gray-900">87%</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <FireIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Learning Streak
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          15 days
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Performance Trends
                  </h3>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                      Chart visualization would go here
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCheckPage;
