import {
    AcademicCapIcon,
    BrainIcon,
    CalendarIcon,
    FlagIcon,
    GlobeAltIcon,
    HeartIcon,
    LightBulbIcon,
    RocketLaunchIcon,
    StarIcon,
    TrendingUpIcon,
    TrophyIcon,
    UserGroupIcon,
    UsersIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AboutPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('mission');

  const companyStats = [
    {
      id: 1,
      metric: 'Students Worldwide',
      value: '50,000+',
      change: '+15%',
      changeType: 'increase',
      icon: UsersIcon,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      metric: 'Courses Available',
      value: '500+',
      change: '+25%',
      changeType: 'increase',
      icon: AcademicCapIcon,
      color: 'bg-green-500'
    },
    {
      id: 3,
      metric: 'Expert Instructors',
      value: '200+',
      change: '+10%',
      changeType: 'increase',
      icon: UserGroupIcon,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      metric: 'Countries Reached',
      value: '150+',
      change: '+5%',
      changeType: 'increase',
      icon: GlobeAltIcon,
      color: 'bg-orange-500'
    }
  ];

  const values = [
    {
      id: 1,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what's possible in education technology.',
      icon: LightBulbIcon,
      color: 'bg-yellow-500'
    },
    {
      id: 2,
      title: 'Accessibility',
      description: 'Making quality education available to everyone, regardless of their background or location.',
      icon: GlobeAltIcon,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Excellence',
      description: 'We maintain the highest standards in our content, technology, and support.',
      icon: StarIcon,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Community',
      description: 'Building a supportive learning community where everyone can grow together.',
      icon: UserGroupIcon,
      color: 'bg-green-500'
    }
  ];

  const team = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'CEO & Founder',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      bio: 'Former professor at MIT with 15+ years in education technology. Passionate about making learning accessible to everyone.',
      expertise: ['Education Technology', 'AI in Education', 'Leadership'],
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      bio: 'Tech veteran with experience at Google and Microsoft. Leads our engineering team in building cutting-edge learning platforms.',
      expertise: ['Software Engineering', 'AI/ML', 'Product Development'],
      linkedin: 'https://linkedin.com/in/michaelchen',
      twitter: 'https://twitter.com/michaelchen'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Head of Content',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      bio: 'Curriculum expert with a PhD in Education. Ensures our courses meet the highest academic standards.',
      expertise: ['Curriculum Design', 'Educational Psychology', 'Content Strategy'],
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      twitter: 'https://twitter.com/emilyrodriguez'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Head of Product',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      bio: 'Product leader focused on creating exceptional user experiences. Previously at Apple and Netflix.',
      expertise: ['Product Management', 'UX Design', 'User Research'],
      linkedin: 'https://linkedin.com/in/davidkim',
      twitter: 'https://twitter.com/davidkim'
    }
  ];

  const milestones = [
    {
      id: 1,
      year: '2020',
      title: 'Company Founded',
      description: 'The Box was founded with a mission to democratize education through technology.',
      icon: RocketLaunchIcon
    },
    {
      id: 2,
      year: '2021',
      title: 'First 10,000 Students',
      description: 'Reached our first major milestone with 10,000 active students worldwide.',
      icon: UsersIcon
    },
    {
      id: 3,
      year: '2022',
      title: 'AI Integration',
      description: 'Launched our AI-powered learning platform with personalized tutoring.',
      icon: BrainIcon
    },
    {
      id: 4,
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded to 150+ countries with localized content and support.',
      icon: GlobeAltIcon
    },
    {
      id: 5,
      year: '2024',
      title: '50,000+ Students',
      description: 'Reached 50,000 students and launched enterprise solutions.',
      icon: TrophyIcon
    }
  ];

  const tabs = [
    { id: 'mission', name: 'Mission & Vision', icon: FlagIcon },
    { id: 'team', name: 'Our Team', icon: UserGroupIcon },
    { id: 'values', name: 'Values', icon: HeartIcon },
    { id: 'history', name: 'History', icon: CalendarIcon }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">About The Box</h1>
            <p className="text-gray-600 mt-2">
              Transforming education through technology and innovation.
            </p>
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {companyStats.map((stat, index) => (
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
                  <p className="text-sm font-medium text-gray-600">{stat.metric}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
              {tabs.map((tab) => (
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
            {activeTab === 'mission' && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    To democratize education by making high-quality learning accessible to everyone, 
                    everywhere, through innovative technology and personalized learning experiences.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    A world where quality education is accessible to every individual, 
                    empowering them to achieve their full potential and contribute to a better society.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">What We Do</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Provide cutting-edge online courses</li>
                      <li>• Develop AI-powered learning tools</li>
                      <li>• Create personalized learning experiences</li>
                      <li>• Build global learning communities</li>
                      <li>• Support lifelong learning journeys</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">How We Do It</h3>
                    <ul className="space-y-2 text-green-800">
                      <li>• Advanced AI and machine learning</li>
                      <li>• Expert-led content creation</li>
                      <li>• Interactive learning experiences</li>
                      <li>• Global accessibility standards</li>
                      <li>• Continuous innovation</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our diverse team of experts is passionate about education and technology, 
                    working together to create the future of learning.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {team.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                          <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {member.expertise.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 mt-4">
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              LinkedIn
                            </a>
                            <a
                              href={member.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Twitter
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    These core values guide everything we do and shape our culture.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <motion.div
                      key={value.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-3 rounded-lg ${value.color}`}>
                          <value.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                      </div>
                      <p className="text-gray-600">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Journey</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    From a small startup to a global education platform, here's our story.
                  </p>
                </motion.div>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-8">
                    {milestones.map((milestone, index) => (
                      <motion.div
                        key={milestone.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative flex items-start space-x-4"
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-6 top-2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                        
                        <div className="ml-16 flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <milestone.icon className="w-5 h-5 text-blue-600" />
                            <span className="text-lg font-semibold text-gray-900">{milestone.year}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 