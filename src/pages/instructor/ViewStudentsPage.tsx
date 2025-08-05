import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
  StarIcon,
  ClockIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledDate: string;
  progress: number;
  lastActive: string;
  rating: number;
  coursesEnrolled: number;
  totalHours: number;
  isOnline: boolean;
}

const ViewStudentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'recent'>('all');

  const students: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      enrolledDate: '2024-01-15',
      progress: 85,
      lastActive: '2024-01-20T14:30:00Z',
      rating: 4.8,
      coursesEnrolled: 3,
      totalHours: 24,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      enrolledDate: '2024-01-10',
      progress: 92,
      lastActive: '2024-01-20T16:45:00Z',
      rating: 4.9,
      coursesEnrolled: 5,
      totalHours: 42,
      isOnline: true,
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      enrolledDate: '2024-01-05',
      progress: 67,
      lastActive: '2024-01-19T09:15:00Z',
      rating: 4.5,
      coursesEnrolled: 2,
      totalHours: 18,
      isOnline: false,
    },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'online') return matchesSearch && student.isOnline;
    if (filterStatus === 'recent') {
      const lastActive = new Date(student.lastActive);
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return matchesSearch && lastActive > oneDayAgo;
    }
    return matchesSearch;
  });

  const handleSendMessage = () => {
    if (message.trim() && selectedStudent) {
      // Simulate sending message
      console.log(`Sending message to ${selectedStudent.name}: ${message}`);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/instructor/dashboard')}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Students</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage and communicate with your students</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <EnvelopeIcon className="w-4 h-4" />
              Send Bulk Email
            </button>
            <button className="btn-primary">
              <UserGroupIcon className="w-4 h-4" />
              Export List
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              {/* Search and Filters */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Students</option>
                  <option value="online">Online Now</option>
                  <option value="recent">Recently Active</option>
                </select>
              </div>

              {/* Students Grid */}
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedStudent?.id === student.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                          student.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{student.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{student.email}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {student.rating}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">
                              {student.coursesEnrolled} courses
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>Progress: {student.progress}%</span>
                            <span>•</span>
                            <span>{student.totalHours}h</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            Last active: {new Date(student.lastActive).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Student Details & Chat */}
          <div className="space-y-6">
            {selectedStudent ? (
              <>
                {/* Student Details */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <div className="text-center mb-6">
                    <img
                      src={selectedStudent.avatar}
                      alt={selectedStudent.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedStudent.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedStudent.email}</p>
                    <div className="flex items-center justify-center space-x-1 mt-2">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{selectedStudent.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Enrolled:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(selectedStudent.enrolledDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Progress:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedStudent.progress}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Courses:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedStudent.coursesEnrolled}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Hours:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedStudent.totalHours}h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                      <span className={`text-sm px-2 py-1 rounded ${
                        selectedStudent.isOnline
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {selectedStudent.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chat */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Message {selectedStudent.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSendMessage}
                        className="flex-1 btn-primary"
                      >
                        <PaperAirplaneIcon className="w-4 h-4" />
                        Send Message
                      </button>
                      <button className="btn-secondary">
                        <EnvelopeIcon className="w-4 h-4" />
                        Email
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center">
                <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Select a Student
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a student from the list to view details and send messages
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentsPage; 