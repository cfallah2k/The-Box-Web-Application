import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  StarIcon,
  EyeIcon,
  PlayIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  BookOpenIcon,
  TrophyIcon,
  FireIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  ShareIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import ProgressRing from '@/components/ui/ProgressRing';
import { Badge } from '@/components/ui/Badge';

const CohortDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: EyeIcon },
    { id: 'sessions', name: 'Sessions', icon: VideoCameraIcon },
    { id: 'students', name: 'Students', icon: UserGroupIcon },
    { id: 'materials', name: 'Materials', icon: DocumentTextIcon },
    { id: 'discussions', name: 'Discussions', icon: ChatBubbleLeftRightIcon },
  ];

  const cohort = {
    id: id || '1',
    name: 'React Mastery 2024',
    description: 'Master React development with hands-on projects and real-world applications. This comprehensive cohort covers everything from fundamentals to advanced patterns, state management, and deployment.',
    instructor: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Senior Software Engineer with 8+ years of experience in React and modern web development. Previously worked at Google and Facebook.',
      rating: 4.8,
      students: 15420,
    },
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    status: 'active',
    enrolledStudents: 24,
    maxStudents: 30,
    progress: 65,
    category: 'Programming',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    rating: 4.8,
    totalHours: 120,
    sessionsPerWeek: 3,
    nextSession: '2024-01-25T14:00:00Z',
    price: 299,
    originalPrice: 499,
  };

  const sessions = [
    {
      id: 1,
      title: 'Introduction to React Fundamentals',
      description: 'Learn the basics of React components, JSX, and state management',
      date: '2024-02-01T14:00:00Z',
      duration: 90,
      type: 'live',
      status: 'completed',
      recording: 'https://example.com/recording1',
      materials: ['slides.pdf', 'exercises.zip'],
    },
    {
      id: 2,
      title: 'Advanced State Management with Redux',
      description: 'Deep dive into Redux patterns and best practices',
      date: '2024-02-08T14:00:00Z',
      duration: 120,
      type: 'live',
      status: 'completed',
      recording: 'https://example.com/recording2',
      materials: ['redux-guide.pdf', 'demo-code.zip'],
    },
    {
      id: 3,
      title: 'Building Real-World Applications',
      description: 'Apply your knowledge to build a complete React application',
      date: '2024-02-15T14:00:00Z',
      duration: 150,
      type: 'live',
      status: 'upcoming',
      recording: null,
      materials: ['project-specs.pdf'],
    },
    {
      id: 4,
      title: 'Performance Optimization',
      description: 'Learn techniques to optimize React application performance',
      date: '2024-02-22T14:00:00Z',
      duration: 90,
      type: 'live',
      status: 'upcoming',
      recording: null,
      materials: ['performance-checklist.pdf'],
    },
  ];

  const students = [
    {
      id: 1,
      name: 'Alex Chen',
      email: 'alex@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      progress: 85,
      attendance: 90,
      lastActive: '2024-01-24T10:30:00Z',
      status: 'active',
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      email: 'maria@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      progress: 72,
      attendance: 85,
      lastActive: '2024-01-23T15:45:00Z',
      status: 'active',
    },
    {
      id: 3,
      name: 'David Kim',
      email: 'david@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      progress: 95,
      attendance: 100,
      lastActive: '2024-01-24T09:15:00Z',
      status: 'active',
    },
  ];

  const materials = [
    {
      id: 1,
      name: 'React Fundamentals Guide',
      type: 'pdf',
      size: '2.4 MB',
      uploadedAt: '2024-01-20T10:00:00Z',
      downloads: 24,
    },
    {
      id: 2,
      name: 'Project Starter Template',
      type: 'zip',
      size: '15.7 MB',
      uploadedAt: '2024-01-21T14:30:00Z',
      downloads: 22,
    },
    {
      id: 3,
      name: 'Redux State Management',
      type: 'pdf',
      size: '1.8 MB',
      uploadedAt: '2024-01-22T09:15:00Z',
      downloads: 20,
    },
  ];

  const discussions = [
    {
      id: 1,
      title: 'Best practices for component structure',
      author: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      content: 'What are your thoughts on organizing components in large React applications?',
      replies: 8,
      views: 45,
      createdAt: '2024-01-24T08:30:00Z',
      isPinned: true,
    },
    {
      id: 2,
      title: 'Redux vs Context API for state management',
      author: 'Maria Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      content: 'When should we use Redux vs Context API? Looking for real-world examples.',
      replies: 12,
      views: 67,
      createdAt: '2024-01-23T16:45:00Z',
      isPinned: false,
    },
  ];

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

  const discountPercentage = Math.round(((cohort.originalPrice - cohort.price) / cohort.originalPrice) * 100);

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
                {cohort.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {cohort.description}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn btn-outline">
                <ShareIcon className="w-4 h-4" />
                Share
              </button>
              <button className="btn btn-outline">
                <BookmarkIcon className="w-4 h-4" />
                Save
              </button>
              <button className="btn btn-primary">
                <PlusIcon className="w-4 h-4" />
                Enroll Now
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Cohort Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-0 overflow-hidden mb-8"
            >
              <img
                src={cohort.thumbnail}
                alt={cohort.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant={getStatusColor(cohort.status) as any}>
                    {cohort.status}
                  </Badge>
                  <Badge variant={getLevelColor(cohort.level) as any}>
                    {cohort.level}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">{cohort.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Duration</span>
                    <p className="font-medium">{cohort.totalHours} hours</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Students</span>
                    <p className="font-medium">{cohort.enrolledStudents}/{cohort.maxStudents}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Sessions/Week</span>
                    <p className="font-medium">{cohort.sessionsPerWeek}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Start Date</span>
                    <p className="font-medium">{new Date(cohort.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 mb-8"
            >
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      About This Cohort
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {cohort.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          What you'll learn
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="w-5 h-5 text-success-600 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">React fundamentals and best practices</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="w-5 h-5 text-success-600 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">State management with Redux and Context API</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="w-5 h-5 text-success-600 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">Performance optimization techniques</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="w-5 h-5 text-success-600 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">Real-world project development</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2" />
                            <span className="text-gray-700 dark:text-gray-300">Basic knowledge of JavaScript</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2" />
                            <span className="text-gray-700 dark:text-gray-300">Familiarity with HTML and CSS</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2" />
                            <span className="text-gray-700 dark:text-gray-300">A computer with internet connection</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="card p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Cohort Progress
                    </h3>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex justify-center">
                        <ProgressRing progress={cohort.progress} size={80} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{cohort.progress}%</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">4</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Sessions Remaining</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">60</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Hours Completed</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sessions' && (
                <div className="space-y-4">
                  {sessions.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {session.title}
                            </h4>
                            <Badge variant={getStatusColor(session.status) as any}>
                              {session.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {session.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{new Date(session.date).toLocaleDateString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>{session.duration} minutes</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <VideoCameraIcon className="w-4 h-4" />
                              <span>{session.type}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {session.status === 'completed' && (
                            <button className="btn btn-outline btn-sm">
                              <EyeIcon className="w-4 h-4" />
                              Watch Recording
                            </button>
                          )}
                          {session.status === 'upcoming' && (
                            <button className="btn btn-primary btn-sm">
                              <PlayIcon className="w-4 h-4" />
                              Join Session
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'students' && (
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Cohort Students
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Student</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Progress</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Attendance</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Last Active</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={student.avatar}
                                  alt={student.name}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{student.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                  <div
                                    className="h-2 bg-primary-600 rounded-full"
                                    style={{ width: `${student.progress}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{student.progress}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                              {student.attendance}%
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                              {new Date(student.lastActive).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant={student.status === 'active' ? 'success' : 'secondary'}>
                                {student.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'materials' && (
                <div className="space-y-4">
                  {materials.map((material, index) => (
                    <motion.div
                      key={material.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                            <DocumentTextIcon className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {material.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {material.size} • {material.downloads} downloads
                            </p>
                          </div>
                        </div>
                        <button className="btn btn-outline btn-sm">
                          Download
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'discussions' && (
                <div className="space-y-4">
                  {discussions.map((discussion, index) => (
                    <motion.div
                      key={discussion.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card p-6"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={discussion.avatar}
                          alt={discussion.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {discussion.title}
                            </h4>
                            {discussion.isPinned && (
                              <Badge variant="warning">Pinned</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {discussion.content}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>By {discussion.author}</span>
                            <span>{discussion.replies} replies</span>
                            <span>{discussion.views} views</span>
                            <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button className="btn btn-outline btn-sm">
                          Reply
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Instructor Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Instructor
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={cohort.instructor.avatar}
                  alt={cohort.instructor.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {cohort.instructor.name}
                  </h4>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{cohort.instructor.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {cohort.instructor.bio}
              </p>
              <button className="btn btn-outline w-full">
                View Profile
              </button>
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Enrollment
              </h3>
              <div className="mb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${cohort.price}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${cohort.originalPrice}
                  </span>
                  <Badge variant="error">{discountPercentage}% OFF</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Limited time offer
                </p>
              </div>
              <button className="btn btn-primary w-full mb-3">
                Enroll Now
              </button>
              <p className="text-xs text-gray-500 text-center">
                30-day money-back guarantee
              </p>
            </motion.div>

            {/* Next Session */}
            {cohort.nextSession && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Next Session
                </h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {new Date(cohort.nextSession).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {new Date(cohort.nextSession).toLocaleTimeString()}
                  </div>
                  <button className="btn btn-primary w-full">
                    Join Session
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortDetailPage; 