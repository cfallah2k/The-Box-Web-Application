import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  EyeIcon,
  ClockIcon,
  PlayIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  category: string;
  image: string;
  progress: number;
  isEnrolled: boolean;
  price: string;
  originalPrice?: string;
  features: string[];
}

interface InteractiveCourseCardProps {
  course: Course;
  onEnroll?: (courseId: number) => void;
  onPreview?: (courseId: number) => void;
}

const InteractiveCourseCard: React.FC<InteractiveCourseCardProps> = ({
  course,
  onEnroll,
  onPreview,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Course Image */}
        <div className="relative overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {/* Level Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              {course.level}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <HeartIcon className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked(!isBookmarked);
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isBookmarked
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <BookmarkIcon className="w-5 h-5" />
            </motion.button>
          </div>
          
          {/* Play Button Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onPreview?.(course.id);
              }}
              className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
            >
              <PlayIcon className="w-8 h-8 text-blue-600" />
            </motion.button>
          </motion.div>
          
          {/* Course Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-1">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
              <span className="text-sm opacity-90">{course.students.toLocaleString()} students</span>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-600 font-medium">{course.category}</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">{course.duration}</span>
              <ClockIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            by {course.instructor}
          </p>

          {/* Course Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.features.map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Progress Bar */}
          {course.isEnrolled && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="text-gray-900 dark:text-white font-medium">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.div>
              </div>
            </div>
          )}

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {course.price}
              </span>
              {course.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {course.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEnroll?.(course.id);
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                {course.isEnrolled ? 'Continue' : 'Enroll Now'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Share functionality
                }}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <ShareIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveCourseCard; 