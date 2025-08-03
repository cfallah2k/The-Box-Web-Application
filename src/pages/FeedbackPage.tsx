import {
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  CogIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  LightBulbIcon,
  PlusIcon,
  ChartBarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const FeedbackPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('submit');
  const [feedbackType, setFeedbackType] = useState('general');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    priority: 'medium',
    anonymous: false,
    contactEmail: user?.email || '',
  });

  const feedbackTypes = [
    {
      id: 'general',
      name: 'General Feedback',
      description: 'Share your thoughts about the platform',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-blue-500',
    },
    {
      id: 'bug',
      name: 'Bug Report',
      description: 'Report technical issues or problems',
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
    },
    {
      id: 'feature',
      name: 'Feature Request',
      description: 'Suggest new features or improvements',
      icon: LightBulbIcon,
      color: 'bg-green-500',
    },
    {
      id: 'course',
      name: 'Course Feedback',
      description: 'Feedback about specific courses',
      icon: AcademicCapIcon,
      color: 'bg-purple-500',
    },
    {
      id: 'instructor',
      name: 'Instructor Feedback',
      description: 'Feedback about instructors',
      icon: UserGroupIcon,
      color: 'bg-orange-500',
    },
    {
      id: 'technical',
      name: 'Technical Support',
      description: 'Get help with technical issues',
      icon: CogIcon,
      color: 'bg-gray-500',
    },
  ];

  const myFeedback = [
    {
      id: 1,
      title: 'Request for Dark Mode',
      type: 'feature',
      status: 'under-review',
      submitted: '2024-02-15',
      lastUpdated: '2024-02-16',
      description:
        'Would love to see a dark mode option for better accessibility.',
      priority: 'medium',
      responses: 2,
    },
    {
      id: 2,
      title: 'Video playback issues in React course',
      type: 'bug',
      status: 'in-progress',
      submitted: '2024-02-10',
      lastUpdated: '2024-02-14',
      description: 'Experiencing buffering issues with video content.',
      priority: 'high',
      responses: 3,
    },
    {
      id: 3,
      title: 'Great course content!',
      type: 'course',
      status: 'resolved',
      submitted: '2024-01-30',
      lastUpdated: '2024-02-01',
      description: 'Really enjoyed the React course. Very comprehensive.',
      priority: 'low',
      responses: 1,
    },
  ];

  const feedbackStats = [
    {
      id: 1,
      metric: 'Submitted',
      value: '12',
      change: '+3',
      changeType: 'increase',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      metric: 'Resolved',
      value: '8',
      change: '+2',
      changeType: 'increase',
      icon: CheckCircleIcon,
      color: 'bg-green-500',
    },
    {
      id: 3,
      metric: 'In Progress',
      value: '3',
      change: '+1',
      changeType: 'increase',
      icon: ClockIcon,
      color: 'bg-yellow-500',
    },
    {
      id: 4,
      metric: 'Response Time',
      value: '24h',
      change: '-2h',
      changeType: 'decrease',
      icon: ChartBarIcon,
      color: 'bg-purple-500',
    },
  ];

  const tabs = [
    { id: 'submit', name: 'Submit Feedback', icon: PlusIcon },
    { id: 'my-feedback', name: 'My Feedback', icon: ChatBubbleLeftRightIcon },
    { id: 'tracking', name: 'Track Status', icon: EyeIcon },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    console.log('Feedback submitted:', formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

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
              <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
              <p className="text-gray-600 mt-2">
                Share your thoughts, report issues, and help us improve.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="w-5 h-5 mr-2 inline" />
                New Feedback
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <EyeIcon className="w-5 h-5 mr-2 inline" />
                View All
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {feedbackStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.metric}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
            {activeTab === 'submit' && (
              <div className="space-y-8">
                {/* Feedback Types */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Select Feedback Type
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {feedbackTypes.map((type, index) => (
                      <motion.button
                        key={type.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => setFeedbackType(type.id)}
                        className={`p-4 border rounded-lg text-left transition-all ${
                          feedbackType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${type.color}`}>
                            <type.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {type.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Feedback Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Submit Feedback
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Brief description of your feedback"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority
                        </label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Please provide detailed information about your feedback..."
                        required
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Email (Optional)
                        </label>
                        <input
                          type="email"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="anonymous"
                          checked={formData.anonymous}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="text-sm font-medium text-gray-700">
                          Submit anonymously
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}

            {activeTab === 'my-feedback' && (
              <div className="space-y-6">
                {myFeedback.map((feedback, index) => (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              feedback.status === 'resolved'
                                ? 'bg-green-100 text-green-800'
                                : feedback.status === 'in-progress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : feedback.status === 'under-review'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {feedback.status}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              feedback.type === 'feature'
                                ? 'bg-green-100 text-green-800'
                                : feedback.type === 'bug'
                                ? 'bg-red-100 text-red-800'
                                : feedback.type === 'course'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {feedback.type}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              feedback.priority === 'high'
                                ? 'bg-red-100 text-red-800'
                                : feedback.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {feedback.priority}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {feedback.title}
                        </h3>

                        <p className="text-gray-600 mb-4">
                          {feedback.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Submitted: {feedback.submitted}</span>
                          <span>Updated: {feedback.lastUpdated}</span>
                          <span>{feedback.responses} responses</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'tracking' && (
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Feedback Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-900">
                          Under Review
                        </h4>
                        <p className="text-sm text-blue-700">
                          Your feedback is being reviewed by our team
                        </p>
                      </div>
                      <span className="text-sm text-blue-600">2 items</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-yellow-900">
                          In Progress
                        </h4>
                        <p className="text-sm text-yellow-700">
                          We're working on implementing your feedback
                        </p>
                      </div>
                      <span className="text-sm text-yellow-600">1 item</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-green-900">Resolved</h4>
                        <p className="text-sm text-green-700">
                          Your feedback has been addressed
                        </p>
                      </div>
                      <span className="text-sm text-green-600">8 items</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
