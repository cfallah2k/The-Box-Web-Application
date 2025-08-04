import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserGroupIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  PlusIcon,
  CogIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XMarkIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  members: number;
  maxMembers: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  meetingTime: string;
  meetingDay: string;
  isOnline: boolean;
  isActive: boolean;
  rating: number;
  topics: string[];
  leader: {
    name: string;
    avatar: string;
    expertise: string;
  };
}

interface PeerTutor {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  rating: number;
  sessionsCompleted: number;
  hourlyRate: number;
  isAvailable: boolean;
  expertise: string;
}

const StudyGroups: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'groups' | 'tutors' | 'forums'>('groups');
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'Advanced Mathematics Study Group',
      description: 'Deep dive into calculus, linear algebra, and advanced mathematical concepts',
      subject: 'Mathematics',
      members: 12,
      maxMembers: 15,
      level: 'advanced',
      meetingTime: '7:00 PM',
      meetingDay: 'Tuesday',
      isOnline: true,
      isActive: true,
      rating: 4.8,
      topics: ['Calculus', 'Linear Algebra', 'Differential Equations'],
      leader: {
        name: 'Dr. Sarah Chen',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        expertise: 'PhD Mathematics, 10+ years teaching',
      },
    },
    {
      id: '2',
      name: 'Programming Fundamentals',
      description: 'Learn Python, JavaScript, and web development basics',
      subject: 'Programming',
      members: 8,
      maxMembers: 12,
      level: 'beginner',
      meetingTime: '6:30 PM',
      meetingDay: 'Thursday',
      isOnline: true,
      isActive: true,
      rating: 4.6,
      topics: ['Python', 'JavaScript', 'HTML/CSS'],
      leader: {
        name: 'Mike Johnson',
        avatar: 'https://i.pravatar.cc/150?u=mike',
        expertise: 'Senior Developer, 8+ years experience',
      },
    },
    {
      id: '3',
      name: 'Data Science Cohort',
      description: 'Master data analysis, machine learning, and statistical modeling',
      subject: 'Data Science',
      members: 15,
      maxMembers: 20,
      level: 'intermediate',
      meetingTime: '8:00 PM',
      meetingDay: 'Monday',
      isOnline: true,
      isActive: true,
      rating: 4.9,
      topics: ['Machine Learning', 'Statistics', 'Data Visualization'],
      leader: {
        name: 'Emily Rodriguez',
        avatar: 'https://i.pravatar.cc/150?u=emily',
        expertise: 'Data Scientist, 6+ years experience',
      },
    },
  ];

  const peerTutors: PeerTutor[] = [
    {
      id: '1',
      name: 'David Kim',
      avatar: 'https://i.pravatar.cc/150?u=david',
      subjects: ['Mathematics', 'Physics'],
      rating: 4.9,
      sessionsCompleted: 45,
      hourlyRate: 25,
      isAvailable: true,
      expertise: 'PhD Physics, 5+ years tutoring',
    },
    {
      id: '2',
      name: 'Lisa Wang',
      avatar: 'https://i.pravatar.cc/150?u=lisa',
      subjects: ['Programming', 'Computer Science'],
      rating: 4.7,
      sessionsCompleted: 32,
      hourlyRate: 30,
      isAvailable: true,
      expertise: 'Software Engineer, 7+ years experience',
    },
    {
      id: '3',
      name: 'Alex Thompson',
      avatar: 'https://i.pravatar.cc/150?u=alex',
      subjects: ['Data Science', 'Statistics'],
      rating: 4.8,
      sessionsCompleted: 28,
      hourlyRate: 35,
      isAvailable: false,
      expertise: 'Data Scientist, 4+ years experience',
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <UserGroupIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Study Groups & Community</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Connect, learn, and grow together</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateGroup(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Create Group</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'groups', label: 'Study Groups', icon: UserGroupIcon },
          { id: 'tutors', label: 'Peer Tutors', icon: AcademicCapIcon },
          { id: 'forums', label: 'Discussion Forums', icon: ChatBubbleLeftRightIcon },
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
        {activeTab === 'groups' && (
          <div className="space-y-4">
            {studyGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedGroup(group)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{group.name}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs ${getLevelColor(group.level)}`}>
                        {group.level}
                      </div>
                      {group.isActive && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{group.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{group.members}/{group.maxMembers} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{group.meetingDay}s at {group.meetingTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <span>{group.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                      <HeartIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                      <ShareIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-3">
                    <img
                      src={group.leader.avatar}
                      alt={group.leader.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {group.leader.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {group.leader.expertise}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'tutors' && (
          <div className="space-y-4">
            {peerTutors.map((tutor, index) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{tutor.name}</h4>
                      <div className="flex items-center space-x-2">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {tutor.rating}
                        </span>
                        {tutor.isAvailable && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{tutor.expertise}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tutor.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{tutor.sessionsCompleted} sessions</span>
                        <span>${tutor.hourlyRate}/hour</span>
                      </div>
                      <button className="btn-primary text-sm">
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'forums' && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Discussion Forums</h4>
              <div className="space-y-3">
                {[
                  { title: 'General Discussion', posts: 156, lastActive: '2 hours ago' },
                  { title: 'Study Tips & Tricks', posts: 89, lastActive: '1 day ago' },
                  { title: 'Course Reviews', posts: 234, lastActive: '3 hours ago' },
                  { title: 'Career Advice', posts: 67, lastActive: '5 hours ago' },
                ].map((forum, index) => (
                  <motion.div
                    key={forum.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg cursor-pointer hover:shadow-sm transition-shadow"
                  >
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">{forum.title}</h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {forum.posts} posts • Last active {forum.lastActive}
                      </p>
                    </div>
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Group Details Modal */}
      <AnimatePresence>
        {selectedGroup && (
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedGroup.name}
                  </h2>
                  <button
                    onClick={() => setSelectedGroup(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">About</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedGroup.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Meeting Details</h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{selectedGroup.meetingDay}s at {selectedGroup.meetingTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <VideoCameraIcon className="w-4 h-4" />
                        <span>{selectedGroup.isOnline ? 'Online' : 'In-person'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Group Info</h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{selectedGroup.members}/{selectedGroup.maxMembers} members</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StarIcon className="w-4 h-4" />
                        <span>Rating: {selectedGroup.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="btn-primary flex-1">Join Group</button>
                  <button className="btn-secondary flex-1">Contact Leader</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyGroups; 