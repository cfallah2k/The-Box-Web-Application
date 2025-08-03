import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlayIcon,
  ClockIcon,
  UserIcon,
  StarIcon,
  BookOpenIcon,
  CheckIcon,
  HeartIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const course = {
    id: id || '1',
    title: 'Complete React Developer Course 2024',
    instructor: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      students: 15420,
    },
    description: 'Master React development from beginner to advanced with hands-on projects and real-world applications.',
    price: 89,
    originalPrice: 199,
    rating: 4.8,
    reviews: 3247,
    students: 15420,
    duration: '42 hours',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    outcomes: [
      'Build real-world React applications',
      'Master React hooks and modern patterns',
      'Understand state management with Redux',
      'Deploy React apps to production',
    ],
    requirements: [
      'Basic knowledge of HTML, CSS, and JavaScript',
      'A computer with internet connection',
    ],
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'curriculum', name: 'Curriculum' },
    { id: 'instructor', name: 'Instructor' },
    { id: 'reviews', name: 'Reviews' },
  ];

  const handleEnroll = () => {
    if (!isAuthenticated) {
      addToast({
        type: 'error',
        title: 'Please sign in',
        message: 'You need to be signed in to enroll in this course.'
      });
      return;
    }
    
    setIsEnrolled(true);
    addToast({
      type: 'success',
      title: 'Enrolled successfully!',
      message: 'You can now access all course content.'
    });
  };

  const discountPercentage = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {course.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {course.description}
            </p>
            
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-700 dark:text-gray-300">{course.rating}</span>
                <span className="text-gray-500">({course.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserIcon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{course.duration}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="card p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      What you'll learn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckIcon className="w-5 h-5 text-success-600 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2" />
                          <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Course Content
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Curriculum details will be displayed here...
                  </p>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="flex items-start space-x-6">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {course.instructor.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Senior Software Engineer with 8+ years of experience in React and modern web development.
                    </p>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {course.instructor.rating} Instructor Rating
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <UserIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {course.instructor.students.toLocaleString()} Students
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Student Reviews
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Reviews will be displayed here...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Course Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-8">
              <div className="relative mb-6">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg hover:bg-opacity-60 transition-colors">
                  <PlayIcon className="w-12 h-12 text-white" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${course.price}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${course.originalPrice}
                  </span>
                  <span className="bg-error-100 text-error-800 px-2 py-1 rounded text-sm font-medium">
                    {discountPercentage}% OFF
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {isEnrolled ? (
                  <button className="w-full btn btn-primary">
                    Continue Learning
                  </button>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="w-full btn btn-primary"
                  >
                    Enroll Now
                  </button>
                )}
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex-1 btn ${isWishlisted ? 'btn-primary' : 'btn-outline'}`}
                  >
                    <HeartIcon className="w-4 h-4" />
                    {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                  </button>
                  <button className="flex-1 btn btn-outline">
                    <ShareIcon className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckIcon className="w-5 h-5 text-success-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Full lifetime access
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckIcon className="w-5 h-5 text-success-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Certificate of completion
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckIcon className="w-5 h-5 text-success-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    30-Day Money-back guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage; 