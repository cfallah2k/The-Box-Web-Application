import {
  AcademicCapIcon,
  BeakerIcon,
  BellIcon,
  BookmarkIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  DocumentTextIcon,
  EyeIcon,
  FlagIcon,
  GlobeAltIcon,
  HeartIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MicrophoneIcon,
  PlusIcon,
  ShareIcon,
  TrophyIcon,
  UserGroupIcon,
  UsersIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CommunityPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: GlobeAltIcon },
    { id: 'programming', name: 'Programming', icon: AcademicCapIcon },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: BeakerIcon },
    { id: 'design', name: 'Design', icon: LightBulbIcon },
    { id: 'business', name: 'Business', icon: GlobeAltIcon },
    { id: 'career', name: 'Career Advice', icon: TrophyIcon },
  ];

  const discussions = [
    {
      id: 1,
      title: 'Best practices for React state management in 2024?',
      author: 'Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      category: 'programming',
      replies: 23,
      views: 1247,
      likes: 89,
      time: '2 hours ago',
      tags: ['React', 'State Management', 'Frontend'],
      featured: true,
      solved: false,
    },
    {
      id: 2,
      title: 'How to get started with Machine Learning as a beginner?',
      author: 'Mike Chen',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      category: 'ai-ml',
      replies: 45,
      views: 2341,
      likes: 156,
      time: '1 day ago',
      tags: ['Machine Learning', 'Python', 'Beginner'],
      featured: true,
      solved: true,
    },
    {
      id: 3,
      title: 'UI/UX design principles for modern web applications',
      author: 'Emily Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      category: 'design',
      replies: 12,
      views: 567,
      likes: 34,
      time: '3 days ago',
      tags: ['UI/UX', 'Design', 'Web'],
      featured: false,
      solved: false,
    },
    {
      id: 4,
      title: 'Career transition from marketing to data science',
      author: 'David Kim',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      category: 'career',
      replies: 67,
      views: 1892,
      likes: 234,
      time: '5 days ago',
      tags: ['Career', 'Data Science', 'Transition'],
      featured: false,
      solved: false,
    },
    {
      id: 5,
      title: 'Building scalable microservices architecture',
      author: 'Alex Thompson',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      category: 'programming',
      replies: 34,
      views: 892,
      likes: 78,
      time: '1 week ago',
      tags: ['Microservices', 'Architecture', 'Backend'],
      featured: false,
      solved: true,
    },
    {
      id: 6,
      title: 'Freelancing tips for developers in 2024',
      author: 'Lisa Wang',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      category: 'business',
      replies: 89,
      views: 3456,
      likes: 445,
      time: '1 week ago',
      tags: ['Freelancing', 'Business', 'Development'],
      featured: true,
      solved: false,
    },
  ];

  const events = [
    {
      id: 1,
      title: 'React Meetup - Advanced Patterns',
      organizer: 'React Community',
      date: '2024-02-20',
      time: '6:00 PM',
      location: 'San Francisco, CA',
      attendees: 45,
      type: 'meetup',
      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    },
    {
      id: 2,
      title: 'AI & ML Workshop',
      organizer: 'AI Academy',
      date: '2024-02-25',
      time: '10:00 AM',
      location: 'Online',
      attendees: 128,
      type: 'workshop',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=400',
    },
    {
      id: 3,
      title: 'Design Systems Conference',
      organizer: 'Design Collective',
      date: '2024-03-05',
      time: '9:00 AM',
      location: 'New York, NY',
      attendees: 234,
      type: 'conference',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    },
  ];

  const members = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      role: 'Senior Developer',
      company: 'Google',
      skills: ['React', 'TypeScript', 'Node.js'],
      posts: 45,
      reputation: 1250,
      online: true,
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      role: 'Data Scientist',
      company: 'Microsoft',
      skills: ['Python', 'Machine Learning', 'TensorFlow'],
      posts: 67,
      reputation: 1890,
      online: false,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      role: 'UX Designer',
      company: 'Apple',
      skills: ['UI/UX', 'Figma', 'Design Systems'],
      posts: 34,
      reputation: 890,
      online: true,
    },
  ];

  const tabs = [
    { id: 'discussions', name: 'Discussions', icon: ChatBubbleLeftRightIcon },
    { id: 'events', name: 'Events', icon: CalendarIcon },
    { id: 'members', name: 'Members', icon: UsersIcon },
    { id: 'resources', name: 'Resources', icon: DocumentTextIcon },
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || discussion.category === selectedCategory;
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
              <h1 className="text-3xl font-bold text-gray-900">Community</h1>
              <p className="text-gray-600 mt-2">
                Connect, learn, and grow with fellow learners and professionals.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="w-5 h-5 mr-2 inline" />
                Start Discussion
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <BellIcon className="w-5 h-5 mr-2 inline" />
                Notifications
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
                placeholder="Search discussions..."
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
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Most Replies</option>
                <option>Most Views</option>
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
            {activeTab === 'discussions' && (
              <div className="space-y-6">
                {filteredDiscussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={discussion.avatar}
                        alt={discussion.author}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {discussion.featured && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                          {discussion.solved && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Solved
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              discussion.category === 'programming'
                                ? 'bg-blue-100 text-blue-800'
                                : discussion.category === 'ai-ml'
                                ? 'bg-purple-100 text-purple-800'
                                : discussion.category === 'design'
                                ? 'bg-pink-100 text-pink-800'
                                : discussion.category === 'business'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {discussion.category}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {discussion.title}
                        </h3>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <UserGroupIcon className="w-4 h-4 mr-1" />
                            {discussion.author}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {discussion.time}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {discussion.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1" />
                              {discussion.replies} replies
                            </div>
                            <div className="flex items-center">
                              <EyeIcon className="w-4 h-4 mr-1" />
                              {discussion.views} views
                            </div>
                            <div className="flex items-center">
                              <HeartIcon className="w-4 h-4 mr-1" />
                              {discussion.likes} likes
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <BookmarkIcon className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                              <FlagIcon className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                              <ShareIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event.type === 'meetup'
                                ? 'bg-blue-100 text-blue-800'
                                : event.type === 'workshop'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {event.type}
                          </span>
                          <span className="text-sm text-gray-500">
                            {event.attendees} attending
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {event.title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-4">
                          by {event.organizer}
                        </p>

                        <div className="space-y-2 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {event.date} at {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-2" />
                            {event.location}
                          </div>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                          Join Event
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-16 h-16 rounded-full"
                          />
                          {member.online && (
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {member.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {member.role} at {member.company}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {member.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{member.posts} posts</span>
                          <span>{member.reputation} reputation</span>
                        </div>

                        <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                          View Profile
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <DocumentTextIcon className="w-8 h-8 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Community Guidelines
                        </h3>
                        <p className="text-sm text-gray-600">
                          Learn about our community standards
                        </p>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Read Guidelines
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <VideoCameraIcon className="w-8 h-8 text-green-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Video Tutorials
                        </h3>
                        <p className="text-sm text-gray-600">
                          Community-created tutorials
                        </p>
                      </div>
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                      Browse Videos
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <MicrophoneIcon className="w-8 h-8 text-purple-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Podcasts
                        </h3>
                        <p className="text-sm text-gray-600">
                          Listen to community discussions
                        </p>
                      </div>
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                      Listen Now
                    </button>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
