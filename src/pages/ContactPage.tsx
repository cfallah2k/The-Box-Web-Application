import {
  AcademicCapIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CogIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ContactPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
  });

  const contactMethods = [
    {
      id: 1,
      title: 'Email Support',
      description: 'Get help via email',
      icon: EnvelopeIcon,
      contact: 'support@thebox.com',
      responseTime: 'Within 24 hours',
      color: 'bg-blue-500',
      available: true,
    },
    {
      id: 2,
      title: 'Phone Support',
      description: 'Speak with our team',
      icon: PhoneIcon,
      contact: '+1 (555) 123-4567',
      responseTime: 'Immediate',
      color: 'bg-green-500',
      available: true,
    },
    {
      id: 3,
      title: 'Live Chat',
      description: 'Real-time assistance',
      icon: ChatBubbleLeftRightIcon,
      contact: 'Available 24/7',
      responseTime: 'Within 5 minutes',
      color: 'bg-purple-500',
      available: true,
    },
    {
      id: 4,
      title: 'Office Visit',
      description: 'Visit our headquarters',
      icon: BuildingOfficeIcon,
      contact: '123 Learning St, Tech City',
      responseTime: 'By appointment',
      color: 'bg-orange-500',
      available: false,
    },
  ];

  const departments = [
    {
      id: 1,
      name: 'General Support',
      email: 'support@thebox.com',
      phone: '+1 (555) 123-4567',
      description: 'General inquiries and account support',
      icon: UserIcon,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'Academic Support',
      email: 'academic@thebox.com',
      phone: '+1 (555) 123-4568',
      description: 'Course content and learning assistance',
      icon: AcademicCapIcon,
      color: 'bg-green-500',
    },
    {
      id: 3,
      name: 'Technical Support',
      email: 'tech@thebox.com',
      phone: '+1 (555) 123-4569',
      description: 'Platform and technical issues',
      icon: CogIcon,
      color: 'bg-purple-500',
    },
    {
      id: 4,
      name: 'Enterprise Sales',
      email: 'enterprise@thebox.com',
      phone: '+1 (555) 123-4570',
      description: 'Corporate and enterprise solutions',
      icon: BuildingOfficeIcon,
      color: 'bg-orange-500',
    },
  ];

  const officeLocations = [
    {
      id: 1,
      name: 'Headquarters',
      address: '123 Learning Street, Tech City, TC 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@thebox.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      timezone: 'EST',
      icon: MapPinIcon,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'West Coast Office',
      address: '456 Innovation Drive, Silicon Valley, CA 94025',
      phone: '+1 (555) 123-4568',
      email: 'west@thebox.com',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      timezone: 'PST',
      icon: MapPinIcon,
      color: 'bg-green-500',
    },
    {
      id: 3,
      name: 'European Office',
      address: '789 Knowledge Lane, London, UK SW1A 1AA',
      phone: '+44 20 1234 5678',
      email: 'europe@thebox.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      timezone: 'GMT',
      icon: MapPinIcon,
      color: 'bg-purple-500',
    },
  ];

  const tabs = [
    { id: 'general', name: 'General Contact', icon: EnvelopeIcon },
    { id: 'departments', name: 'Departments', icon: BuildingOfficeIcon },
    { id: 'locations', name: 'Office Locations', icon: MapPinIcon },
    { id: 'support', name: 'Support Hours', icon: ClockIcon },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
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
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
            <p className="text-gray-600 mt-2">
              Get in touch with our team. We're here to help with any questions
              or concerns.
            </p>
          </div>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg ${method.color}`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">
                  {method.contact}
                </p>
                <p className="text-xs text-gray-500">
                  Response time: {method.responseTime}
                </p>
                {method.available ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Unavailable
                  </span>
                )}
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
            {activeTab === 'general' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Send us a Message
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>

                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />

                      <textarea
                        name="message"
                        rows={6}
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      ></textarea>

                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Get in Touch
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-gray-600">
                            support@thebox.com
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <PhoneIcon className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-gray-600">
                            +1 (555) 123-4567
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPinIcon className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-sm text-gray-600">
                            123 Learning Street, Tech City, TC 12345
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ClockIcon className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="font-medium">Business Hours</p>
                          <p className="text-sm text-gray-600">
                            Mon-Fri: 9:00 AM - 6:00 PM EST
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Response Times
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Email Support
                        </span>
                        <span className="text-sm font-medium">
                          Within 24 hours
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Phone Support
                        </span>
                        <span className="text-sm font-medium">Immediate</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Live Chat</span>
                        <span className="text-sm font-medium">
                          Within 5 minutes
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'departments' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {departments.map((department, index) => (
                    <motion.div
                      key={department.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-3 rounded-lg ${department.color}`}>
                          <department.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {department.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {department.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {department.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <PhoneIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {department.phone}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'locations' && (
              <div className="space-y-6">
                {officeLocations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`p-3 rounded-lg ${location.color}`}>
                            <location.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {location.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {location.timezone}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="md:w-2/3 md:ml-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <MapPinIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {location.address}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <PhoneIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {location.phone}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {location.email}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {location.hours}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Support Hours
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Monday - Friday
                        </span>
                        <span className="text-sm font-medium">
                          9:00 AM - 6:00 PM EST
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Saturday</span>
                        <span className="text-sm font-medium">
                          10:00 AM - 4:00 PM EST
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Sunday</span>
                        <span className="text-sm font-medium">Closed</span>
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
                      Holiday Schedule
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        We are closed on the following holidays:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• New Year's Day</li>
                        <li>• Memorial Day</li>
                        <li>• Independence Day</li>
                        <li>• Labor Day</li>
                        <li>• Thanksgiving Day</li>
                        <li>• Christmas Day</li>
                      </ul>
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
                    Emergency Support
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    For urgent technical issues affecting your learning
                    experience, we provide emergency support outside of regular
                    hours.
                  </p>
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium">Emergency Hotline</p>
                      <p className="text-sm text-gray-600">+1 (555) 123-9999</p>
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

export default ContactPage;
