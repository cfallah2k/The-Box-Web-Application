import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  PlayIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShareIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Mock course data - in real app this would come from API
  const course = {
    id: parseInt(id || '1'),
    title: 'Advanced React Development',
    instructor: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      bio: 'Senior Software Engineer at Google with 8+ years of experience in React development.',
      rating: 4.9,
      students: 1247,
      courses: 12
    },
    category: 'Programming',
    level: 'Advanced',
    rating: 4.9,
    students: 1247,
    duration: '12 weeks',
    price: 89,
    originalPrice: 129,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    description: 'Master React with advanced patterns, hooks, and state management. This comprehensive course covers everything from basic concepts to advanced techniques used in production applications.',
    whatYouWillLearn: [
      'Advanced React patterns and best practices',
      'State management with Redux and Context API',
      'Performance optimization techniques',
      'Testing strategies with Jest and React Testing Library',
      'Deployment and CI/CD pipelines',
      'Real-world project development'
    ],
    requirements: [
      'Basic JavaScript knowledge',
      'Familiarity with HTML and CSS',
      'Understanding of ES6+ features',
      'A computer with Node.js installed'
    ],
    curriculum: [
      {
        week: 1,
        title: 'React Fundamentals Review',
        lessons: [
          { title: 'Introduction to React', duration: '45 min', type: 'video', isFree: true },
          { title: 'Components and Props', duration: '60 min', type: 'video', isFree: true },
          { title: 'State and Lifecycle', duration: '75 min', type: 'video', isFree: false },
          { title: 'Hands-on Exercise', duration: '90 min', type: 'exercise', isFree: false }
        ]
      },
      {
        week: 2,
        title: 'Advanced Hooks',
        lessons: [
          { title: 'Custom Hooks', duration: '60 min', type: 'video', isFree: false },
          { title: 'useReducer Pattern', duration: '75 min', type: 'video', isFree: false },
          { title: 'useContext Deep Dive', duration: '60 min', type: 'video', isFree: false },
          { title: 'Project: Custom Hook Library', duration: '120 min', type: 'project', isFree: false }
        ]
      },
      {
        week: 3,
        title: 'State Management',
        lessons: [
          { title: 'Redux Toolkit', duration: '90 min', type: 'video', isFree: false },
          { title: 'Context API vs Redux', duration: '60 min', type: 'video', isFree: false },
          { title: 'State Persistence', duration: '45 min', type: 'video', isFree: false },
          { title: 'Quiz: State Management', duration: '30 min', type: 'quiz', isFree: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: 'Alex Thompson',
        rating: 5,
        date: '2 days ago',
        comment: 'Excellent course! Sarah explains complex concepts in a very clear way. The hands-on projects really helped me understand React better.'
      },
      {
        id: 2,
        user: 'Maria Garcia',
        rating: 5,
        date: '1 week ago',
        comment: 'This course exceeded my expectations. The advanced patterns section was particularly valuable for my work projects.'
      },
      {
        id: 3,
        user: 'David Kim',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Great content and well-structured. Would have liked more examples in the testing section, but overall very good.'
      }
    ]
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'curriculum', name: 'Curriculum' },
    { id: 'instructor', name: 'Instructor' },
    { id: 'reviews', name: 'Reviews' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/courses"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <HeartIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <ShareIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="ml-1 font-medium">{course.rating}</span>
                    <span className="ml-1 text-gray-600">({course.students.toLocaleString()} students)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="w-5 h-5 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <UserGroupIcon className="w-5 h-5 mr-1" />
                    {course.category}
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{course.description}</p>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="py-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">What you'll learn</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {course.whatYouWillLearn.map((item, index) => (
                            <div key={index} className="flex items-start">
                              <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                        <ul className="space-y-2">
                          {course.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'curriculum' && (
                    <div className="space-y-4">
                      {course.curriculum.map((week) => (
                        <div key={week.week} className="border border-gray-200 rounded-lg">
                          <div className="p-4 bg-gray-50 border-b border-gray-200">
                            <h4 className="font-semibold text-gray-900">Week {week.week}: {week.title}</h4>
                          </div>
                          <div className="p-4">
                            {week.lessons.map((lesson, index) => (
                              <div key={index} className="flex items-center justify-between py-2">
                                <div className="flex items-center">
                                  {lesson.type === 'video' ? (
                                    <PlayIcon className="w-4 h-4 text-blue-600 mr-3" />
                                  ) : lesson.type === 'exercise' ? (
                                    <BookOpenIcon className="w-4 h-4 text-green-600 mr-3" />
                                  ) : (
                                    <AcademicCapIcon className="w-4 h-4 text-purple-600 mr-3" />
                                  )}
                                  <span className="text-gray-700">{lesson.title}</span>
                                  {lesson.isFree && (
                                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                      Free
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                                  {!lesson.isFree && !isEnrolled && (
                                    <LockClosedIcon className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'instructor' && (
                    <div className="flex items-start space-x-4">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{course.instructor.name}</h3>
                        <p className="text-gray-600 mb-2">{course.instructor.bio}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                            {course.instructor.rating} Instructor Rating
                          </div>
                          <div className="flex items-center">
                            <UserGroupIcon className="w-4 h-4 mr-1" />
                            {course.instructor.students.toLocaleString()} Students
                          </div>
                          <div className="flex items-center">
                            <BookOpenIcon className="w-4 h-4 mr-1" />
                            {course.instructor.courses} Courses
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      {course.reviews.map((review) => (
                        <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{review.user}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{review.comment}</p>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ${course.price}
                </div>
                {course.originalPrice > course.price && (
                  <div className="text-lg text-gray-500 line-through mb-2">
                    ${course.originalPrice}
                  </div>
                )}
                <div className="text-sm text-green-600 font-medium">
                  {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Course includes:</span>
                  <span className="font-medium">12 weeks</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Video content:</span>
                  <span className="font-medium">15 hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Downloadable resources:</span>
                  <span className="font-medium">Yes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Certificate:</span>
                  <span className="font-medium">Yes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Lifetime access:</span>
                  <span className="font-medium">Yes</span>
                </div>
              </div>

              <div className="space-y-3">
                {isEnrolled ? (
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Continue Learning
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsEnrolled(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Enroll Now
                  </button>
                )}
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 inline" />
                  Contact Instructor
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">This course includes:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    Full lifetime access
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    Access on mobile and TV
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    Certificate of completion
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    Downloadable resources
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage; 