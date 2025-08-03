import {
  AcademicCapIcon,
  BookOpenIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  CogIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  EyeIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
  UserIcon,
  VideoCameraIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const HelpCenterPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('faqs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: QuestionMarkCircleIcon },
    { id: 'account', name: 'Account & Billing', icon: UserIcon },
    { id: 'courses', name: 'Courses & Learning', icon: AcademicCapIcon },
    { id: 'technical', name: 'Technical Support', icon: CogIcon },
    { id: 'community', name: 'Community', icon: UserGroupIcon },
    { id: 'features', name: 'Features', icon: LightBulbIcon },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer:
        'To reset your password, go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your email. You can also contact support if you need additional help.',
      category: 'account',
      tags: ['password', 'security', 'login'],
      helpful: 45,
      notHelpful: 2,
    },
    {
      id: 2,
      question: 'How do I enroll in a course?',
      answer:
        'To enroll in a course, browse our course catalog and click on any course that interests you. Click the "Enroll" button and follow the payment process. Once enrolled, you\'ll have immediate access to all course materials.',
      category: 'courses',
      tags: ['enrollment', 'courses', 'payment'],
      helpful: 67,
      notHelpful: 1,
    },
    {
      id: 3,
      question: 'Can I download course materials for offline viewing?',
      answer:
        'Yes, most course materials can be downloaded for offline viewing. Look for the download icon next to video lessons and documents. Note that some interactive content may require an internet connection.',
      category: 'courses',
      tags: ['download', 'offline', 'materials'],
      helpful: 89,
      notHelpful: 3,
    },
    {
      id: 4,
      question: 'How do I contact my instructor?',
      answer:
        'You can contact your instructor through the course discussion forum, direct messaging within the platform, or by email if they provide their contact information. Most instructors respond within 24-48 hours.',
      category: 'community',
      tags: ['instructor', 'communication', 'support'],
      helpful: 34,
      notHelpful: 5,
    },
    {
      id: 5,
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. For enterprise customers, we also offer invoice-based billing with net 30 terms.',
      category: 'account',
      tags: ['payment', 'billing', 'credit-cards'],
      helpful: 56,
      notHelpful: 2,
    },
    {
      id: 6,
      question: 'How do I get a certificate of completion?',
      answer:
        'Certificates are automatically generated when you complete a course with a passing grade (usually 70% or higher). You can download your certificate from your dashboard under the "Certificates" section.',
      category: 'courses',
      tags: ['certificate', 'completion', 'achievement'],
      helpful: 78,
      notHelpful: 1,
    },
  ];

  const supportTickets = [
    {
      id: 1,
      title: 'Video playback issues in React course',
      category: 'technical',
      status: 'open',
      priority: 'high',
      createdAt: '2024-02-15',
      lastUpdated: '2024-02-16',
      description:
        "I'm experiencing issues with video playback in the React course. Videos are buffering constantly and sometimes fail to load completely.",
      assignedTo: 'Tech Support Team',
      responses: 2,
    },
    {
      id: 2,
      title: 'Payment processing error',
      category: 'account',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-02-14',
      lastUpdated: '2024-02-15',
      description:
        "I tried to enroll in the Machine Learning course but received a payment processing error. My card was charged but enrollment didn't complete.",
      assignedTo: 'Billing Team',
      responses: 3,
    },
    {
      id: 3,
      title: 'Certificate not generated after course completion',
      category: 'courses',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-02-10',
      lastUpdated: '2024-02-12',
      description:
        "I completed the UI/UX Design course with a 92% score but haven't received my certificate yet.",
      assignedTo: 'Course Support',
      responses: 4,
    },
  ];

  const resources = [
    {
      id: 1,
      title: 'Getting Started Guide',
      type: 'document',
      category: 'account',
      description:
        'Complete guide to getting started with your learning journey.',
      icon: BookOpenIcon,
      url: '/guides/getting-started',
      views: 1247,
    },
    {
      id: 2,
      title: 'Video Tutorial: Course Navigation',
      type: 'video',
      category: 'courses',
      description: 'Learn how to navigate courses and access all features.',
      icon: VideoCameraIcon,
      url: '/tutorials/navigation',
      views: 892,
    },
    {
      id: 3,
      title: 'Technical Requirements',
      type: 'document',
      category: 'technical',
      description: 'System requirements and technical specifications.',
      icon: DocumentTextIcon,
      url: '/docs/technical-requirements',
      views: 567,
    },
    {
      id: 4,
      title: 'Community Guidelines',
      type: 'document',
      category: 'community',
      description: 'Guidelines for participating in our learning community.',
      icon: UserGroupIcon,
      url: '/community/guidelines',
      views: 345,
    },
  ];

  const tabs = [
    { id: 'faqs', name: 'FAQs', icon: QuestionMarkCircleIcon },
    { id: 'tickets', name: 'Support Tickets', icon: ChatBubbleLeftRightIcon },
    { id: 'resources', name: 'Resources', icon: DocumentTextIcon },
    { id: 'contact', name: 'Contact Us', icon: EnvelopeIcon },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory;
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
              <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
              <p className="text-gray-600 mt-2">
                Find answers, get support, and access helpful resources.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="w-5 h-5 mr-2 inline" />
                New Ticket
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 inline" />
                Live Chat
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
                placeholder="Search help articles..."
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
                <option>Most Popular</option>
                <option>Most Recent</option>
                <option>Most Helpful</option>
                <option>Alphabetical</option>
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
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
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
                              faq.category === 'account'
                                ? 'bg-blue-100 text-blue-800'
                                : faq.category === 'courses'
                                ? 'bg-green-100 text-green-800'
                                : faq.category === 'technical'
                                ? 'bg-purple-100 text-purple-800'
                                : faq.category === 'community'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {faq.category}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            setExpandedFaq(
                              expandedFaq === faq.id ? null : faq.id
                            )
                          }
                          className="text-left w-full"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {faq.question}
                            </h3>
                            {expandedFaq === faq.id ? (
                              <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </button>

                        {expandedFaq === faq.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            className="mt-4"
                          >
                            <p className="text-gray-600 mb-4">{faq.answer}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {faq.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <button className="flex items-center space-x-1 hover:text-green-600">
                                  <CheckCircleIcon className="w-4 h-4" />
                                  <span>Helpful ({faq.helpful})</span>
                                </button>
                                <button className="flex items-center space-x-1 hover:text-red-600">
                                  <XCircleIcon className="w-4 h-4" />
                                  <span>Not Helpful ({faq.notHelpful})</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'tickets' && (
              <div className="space-y-6">
                {supportTickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
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
                              ticket.status === 'open'
                                ? 'bg-red-100 text-red-800'
                                : ticket.status === 'in-progress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {ticket.status}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              ticket.priority === 'high'
                                ? 'bg-red-100 text-red-800'
                                : ticket.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {ticket.priority}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              ticket.category === 'account'
                                ? 'bg-blue-100 text-blue-800'
                                : ticket.category === 'courses'
                                ? 'bg-green-100 text-green-800'
                                : ticket.category === 'technical'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {ticket.category}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {ticket.title}
                        </h3>

                        <p className="text-gray-600 mb-4">
                          {ticket.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <UserIcon className="w-4 h-4 mr-1" />
                            {ticket.assignedTo}
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            Created: {ticket.createdAt}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            Updated: {ticket.lastUpdated}
                          </div>
                          <div className="flex items-center">
                            <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1" />
                            {ticket.responses} responses
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          View Ticket
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

            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <resource.icon className="w-8 h-8 text-blue-600" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {resource.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {resource.views} views
                        </span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          View Resource
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Email Support</p>
                          <p className="text-sm text-gray-600">
                            support@thebox.com
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <PhoneIcon className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium">Phone Support</p>
                          <p className="text-sm text-gray-600">
                            +1 (555) 123-4567
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium">Live Chat</p>
                          <p className="text-sm text-gray-600">
                            Available 24/7
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Response Times
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-gray-600">Within 24 hours</p>
                      </div>
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-sm text-gray-600">Immediate</p>
                      </div>
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-sm text-gray-600">
                          Within 5 minutes
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Send us a Message
                  </h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Select Category</option>
                      <option>Account & Billing</option>
                      <option>Courses & Learning</option>
                      <option>Technical Support</option>
                      <option>Community</option>
                      <option>Features</option>
                    </select>
                    <textarea
                      rows={4}
                      placeholder="Your Message"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
