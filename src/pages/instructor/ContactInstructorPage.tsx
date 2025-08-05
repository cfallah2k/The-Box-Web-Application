import {
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  specialization: string[];
  rating: number;
  totalStudents: number;
  totalCourses: number;
  availability: Availability[];
  languages: string[];
  location: string;
}

interface Availability {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface Message {
  id: string;
  sender: 'student' | 'instructor';
  content: string;
  timestamp: string;
  isRead: boolean;
}

const ContactInstructorPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState<
    'email' | 'chat' | 'phone'
  >('email');
  const [messages, setMessages] = useState<Message[]>([]);

  const instructors: Instructor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@thebox.com',
      phone: '+1 (555) 123-4567',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Senior Software Engineer with 8+ years of experience in React and modern web development. Passionate about teaching and helping students master frontend technologies.',
      specialization: ['React', 'JavaScript', 'TypeScript', 'Web Development'],
      rating: 4.8,
      totalStudents: 1250,
      totalCourses: 12,
      availability: [
        {
          day: 'Monday',
          startTime: '09:00',
          endTime: '17:00',
          isAvailable: true,
        },
        {
          day: 'Tuesday',
          startTime: '09:00',
          endTime: '17:00',
          isAvailable: true,
        },
        {
          day: 'Wednesday',
          startTime: '09:00',
          endTime: '17:00',
          isAvailable: true,
        },
        {
          day: 'Thursday',
          startTime: '09:00',
          endTime: '17:00',
          isAvailable: true,
        },
        {
          day: 'Friday',
          startTime: '09:00',
          endTime: '17:00',
          isAvailable: true,
        },
        {
          day: 'Saturday',
          startTime: '10:00',
          endTime: '14:00',
          isAvailable: true,
        },
        { day: 'Sunday', startTime: '', endTime: '', isAvailable: false },
      ],
      languages: ['English', 'Spanish'],
      location: 'San Francisco, CA',
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@thebox.com',
      phone: '+1 (555) 987-6543',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Data Science expert with PhD in Computer Science. Specializes in machine learning, AI, and statistical analysis.',
      specialization: ['Machine Learning', 'Python', 'Data Science', 'AI'],
      rating: 4.9,
      totalStudents: 2100,
      totalCourses: 18,
      availability: [
        {
          day: 'Monday',
          startTime: '10:00',
          endTime: '18:00',
          isAvailable: true,
        },
        {
          day: 'Tuesday',
          startTime: '10:00',
          endTime: '18:00',
          isAvailable: true,
        },
        {
          day: 'Wednesday',
          startTime: '10:00',
          endTime: '18:00',
          isAvailable: true,
        },
        {
          day: 'Thursday',
          startTime: '10:00',
          endTime: '18:00',
          isAvailable: true,
        },
        {
          day: 'Friday',
          startTime: '10:00',
          endTime: '18:00',
          isAvailable: true,
        },
        { day: 'Saturday', startTime: '', endTime: '', isAvailable: false },
        { day: 'Sunday', startTime: '', endTime: '', isAvailable: false },
      ],
      languages: ['English', 'Mandarin'],
      location: 'New York, NY',
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'student',
        content: message,
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const handleContactInstructor = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/courses')}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Contact Instructors
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Get in touch with our expert instructors
              </p>
            </div>
          </div>
        </div>

        {!selectedInstructor ? (
          /* Instructor List */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {instructors.map(instructor => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {instructor.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(instructor.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {instructor.rating} ({instructor.totalStudents}{' '}
                        students)
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {instructor.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {instructor.specialization.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {instructor.totalCourses}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Courses
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {instructor.totalStudents}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Students
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <MapPinIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {instructor.location}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleContactInstructor(instructor)}
                    className="flex-1 btn-primary"
                  >
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    Contact
                  </button>
                  <button className="btn-secondary">
                    <EnvelopeIcon className="w-4 h-4" />
                    Email
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Contact Form */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedInstructor.avatar}
                    alt={selectedInstructor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {selectedInstructor.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedInstructor.specialization.join(', ')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInstructor(null)}
                  className="btn-secondary"
                >
                  Back to List
                </button>
              </div>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <EnvelopeIcon className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Email
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedInstructor.email}
                  </p>
                  <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm">
                    Send Email
                  </button>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <PhoneIcon className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Phone
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedInstructor.phone}
                  </p>
                  <button className="mt-2 text-green-600 hover:text-green-700 text-sm">
                    Call Now
                  </button>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Live Chat
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Available now
                  </p>
                  <button className="mt-2 text-purple-600 hover:text-purple-700 text-sm">
                    Start Chat
                  </button>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Availability
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {selectedInstructor.availability.map(day => (
                    <div
                      key={day.day}
                      className={`p-3 rounded-lg text-center ${
                        day.isAvailable
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {day.day.slice(0, 3)}
                      </div>
                      {day.isAvailable && (
                        <div className="text-xs mt-1">
                          {day.startTime} - {day.endTime}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Interface */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Message {selectedInstructor.name}
                  </h3>
                </div>

                <div className="h-64 overflow-y-auto p-4 space-y-4">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === 'student'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.sender === 'student'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <PaperAirplaneIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInstructorPage;
