import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AcademicCapIcon,
  PlusIcon,
  PencilIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  CogIcon,
  EyeIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  MicrophoneIcon,
  CameraIcon,
  ComputerDesktopIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

interface CourseSection {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: number;
  isPublished: boolean;
  content?: string;
  videoUrl?: string;
  questions?: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  sections: CourseSection[];
  totalDuration: number;
  isPublished: boolean;
  rating: number;
  enrolledStudents: number;
  price: number;
  instructor: {
    name: string;
    avatar: string;
    expertise: string;
  };
}

const CourseBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'builder' | 'editor' | 'preview'>('builder');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showQuizBuilder, setShowQuizBuilder] = useState(false);

  const sampleCourse: Course = {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch to advanced concepts',
    category: 'Programming',
    level: 'beginner',
    sections: [
      {
        id: '1',
        title: 'Introduction to Web Development',
        type: 'video',
        duration: 15,
        isPublished: true,
        videoUrl: 'https://example.com/video1.mp4',
      },
      {
        id: '2',
        title: 'HTML Fundamentals',
        type: 'video',
        duration: 45,
        isPublished: true,
        videoUrl: 'https://example.com/video2.mp4',
      },
      {
        id: '3',
        title: 'CSS Styling Basics',
        type: 'video',
        duration: 60,
        isPublished: false,
        videoUrl: 'https://example.com/video3.mp4',
      },
      {
        id: '4',
        title: 'HTML & CSS Quiz',
        type: 'quiz',
        duration: 20,
        isPublished: true,
        questions: [
          {
            id: '1',
            question: 'What does HTML stand for?',
            type: 'multiple-choice',
            options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language'],
            correctAnswer: 'Hyper Text Markup Language',
            points: 10,
          },
          {
            id: '2',
            question: 'Which CSS property controls the text size?',
            type: 'multiple-choice',
            options: ['font-size', 'text-size', 'size'],
            correctAnswer: 'font-size',
            points: 10,
          },
        ],
      },
    ],
    totalDuration: 140,
    isPublished: false,
    rating: 4.8,
    enrolledStudents: 1250,
    price: 99,
    instructor: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      expertise: 'Senior Web Developer, 8+ years experience',
    },
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoCameraIcon className="w-5 h-5" />;
      case 'text':
        return <DocumentTextIcon className="w-5 h-5" />;
      case 'quiz':
        return <AcademicCapIcon className="w-5 h-5" />;
      case 'assignment':
        return <PencilIcon className="w-5 h-5" />;
      default:
        return <DocumentTextIcon className="w-5 h-5" />;
    }
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'text':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'quiz':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'assignment':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <AcademicCapIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Course Builder</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Create engaging learning content</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary">
            <EyeIcon className="w-4 h-4" />
            Preview
          </button>
          <button className="btn-primary">
            <PlusIcon className="w-4 h-4" />
            New Course
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'builder', label: 'Course Builder', icon: AcademicCapIcon },
          { id: 'editor', label: 'Video Editor', icon: VideoCameraIcon },
          { id: 'preview', label: 'Preview', icon: EyeIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Course Overview */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Course Overview</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Course Title
                    </label>
                    <input
                      type="text"
                      defaultValue={sampleCourse.title}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      defaultValue={sampleCourse.description}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        <option>Programming</option>
                        <option>Design</option>
                        <option>Business</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Level
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Sections */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Course Sections</h4>
                  <button className="btn-primary text-sm">
                    <PlusIcon className="w-4 h-4" />
                    Add Section
                  </button>
                </div>
                <div className="space-y-3">
                  {sampleCourse.sections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getSectionColor(section.type)}`}>
                          {getSectionIcon(section.type)}
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">{section.title}</h5>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {section.duration} minutes • {section.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {section.isPublished ? (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs rounded-full">
                            Draft
                          </span>
                        )}
                        <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Course Statistics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Duration</span>
                    <span className="font-medium text-gray-900 dark:text-white">{sampleCourse.totalDuration} min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Sections</span>
                    <span className="font-medium text-gray-900 dark:text-white">{sampleCourse.sections.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Published</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {sampleCourse.sections.filter(s => s.isPublished).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Drafts</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {sampleCourse.sections.filter(s => !s.isPublished).length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full btn-secondary text-sm">
                    <VideoCameraIcon className="w-4 h-4" />
                    Record Video
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    <DocumentTextIcon className="w-4 h-4" />
                    Add Text Content
                  </button>
                  <button 
                    className="w-full btn-secondary text-sm"
                    onClick={() => setShowQuizBuilder(true)}
                  >
                    <AcademicCapIcon className="w-4 h-4" />
                    Create Quiz
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    <PencilIcon className="w-4 h-4" />
                    Add Assignment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Video Editor</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-3 rounded-lg ${
                      isRecording 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {isRecording ? <StopIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                  </button>
                  <button className="p-3 bg-gray-200 dark:bg-gray-600 rounded-lg">
                    <MicrophoneIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button className="p-3 bg-gray-200 dark:bg-gray-600 rounded-lg">
                    <CameraIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button className="p-3 bg-gray-200 dark:bg-gray-600 rounded-lg">
                    <ComputerDesktopIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
                
                <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-white text-center">
                    <VideoCameraIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Video preview area</p>
                    {isRecording && (
                      <div className="mt-4 flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Recording...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Course Preview</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={sampleCourse.instructor.avatar}
                    alt={sampleCourse.instructor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">{sampleCourse.title}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">by {sampleCourse.instructor.name}</p>
                  </div>
                  <div className="ml-auto flex items-center space-x-2">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{sampleCourse.rating}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{sampleCourse.totalDuration}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Minutes</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{sampleCourse.sections.length}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sections</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{sampleCourse.enrolledStudents}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quiz Builder Modal */}
      <AnimatePresence>
        {showQuizBuilder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Quiz</h2>
                  <button
                    onClick={() => setShowQuizBuilder(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter quiz title"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>Multiple Choice</option>
                    <option>True/False</option>
                    <option>Short Answer</option>
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button className="btn-secondary flex-1">Cancel</button>
                  <button className="btn-primary flex-1">Create Quiz</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseBuilder; 