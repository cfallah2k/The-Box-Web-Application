import {
  BeakerIcon,
  BellIcon,
  BookmarkIcon,
  CalendarIcon,
  ChartBarIcon,
  CloudIcon,
  CogIcon,
  CpuChipIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ServerIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ResearchLabPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('experiments');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Research', icon: BeakerIcon },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: CpuChipIcon },
    { id: 'data-science', name: 'Data Science', icon: ChartBarIcon },
    { id: 'biotech', name: 'Biotechnology', icon: BeakerIcon },
    { id: 'quantum', name: 'Quantum Computing', icon: BeakerIcon },
    { id: 'robotics', name: 'Robotics', icon: CogIcon },
  ];

  const experiments = [
    {
      id: 1,
      title:
        'Advanced Neural Network Architecture for Natural Language Processing',
      researcher: 'Dr. Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      category: 'ai-ml',
      status: 'active',
      participants: 12,
      duration: '6 months',
      funding: '$50,000',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=400',
      description:
        'Developing novel neural network architectures for improved NLP performance.',
      tags: ['Neural Networks', 'NLP', 'Deep Learning'],
      featured: true,
      progress: 75,
    },
    {
      id: 2,
      title: 'Quantum Computing Applications in Drug Discovery',
      researcher: 'Prof. Michael Chen',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      category: 'quantum',
      status: 'planning',
      participants: 8,
      duration: '12 months',
      funding: '$200,000',
      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      description:
        'Exploring quantum algorithms for pharmaceutical research and drug development.',
      tags: ['Quantum Computing', 'Drug Discovery', 'Pharmaceuticals'],
      featured: true,
      progress: 25,
    },
    {
      id: 3,
      title: 'CRISPR Gene Editing for Disease Treatment',
      researcher: 'Dr. Emily Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      category: 'biotech',
      status: 'active',
      participants: 15,
      duration: '18 months',
      funding: '$150,000',
      image:
        'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      description: 'Developing CRISPR-based therapies for genetic disorders.',
      tags: ['CRISPR', 'Gene Editing', 'Medical Research'],
      featured: false,
      progress: 60,
    },
    {
      id: 4,
      title: 'Autonomous Robot Navigation in Dynamic Environments',
      researcher: 'Dr. David Kim',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      category: 'robotics',
      status: 'completed',
      participants: 10,
      duration: '9 months',
      funding: '$75,000',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      description:
        'Advanced algorithms for robot navigation in complex, changing environments.',
      tags: ['Robotics', 'Navigation', 'AI'],
      featured: false,
      progress: 100,
    },
    {
      id: 5,
      title: 'Big Data Analytics for Climate Change Prediction',
      researcher: 'Prof. Alex Thompson',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      category: 'data-science',
      status: 'active',
      participants: 20,
      duration: '24 months',
      funding: '$300,000',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      description:
        'Using big data and machine learning to predict climate change patterns.',
      tags: ['Big Data', 'Climate Change', 'Predictive Analytics'],
      featured: true,
      progress: 45,
    },
    {
      id: 6,
      title: 'Quantum Machine Learning for Financial Modeling',
      researcher: 'Dr. Lisa Wang',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      category: 'quantum',
      status: 'planning',
      participants: 6,
      duration: '8 months',
      funding: '$100,000',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=400',
      description:
        'Applying quantum computing to financial risk assessment and modeling.',
      tags: ['Quantum ML', 'Finance', 'Risk Assessment'],
      featured: false,
      progress: 15,
    },
  ];

  const researchPapers = [
    {
      id: 1,
      title: 'Novel Approaches to Transformer Architecture Optimization',
      authors: ['Dr. Sarah Johnson', 'Prof. Michael Chen'],
      journal: 'Nature Machine Intelligence',
      year: 2024,
      citations: 45,
      downloads: 234,
      category: 'ai-ml',
      abstract:
        'This paper presents innovative methods for optimizing transformer architectures...',
    },
    {
      id: 2,
      title: 'Quantum Algorithms for Drug Discovery: A Comprehensive Review',
      authors: ['Dr. Emily Rodriguez', 'Dr. David Kim'],
      journal: 'Science Advances',
      year: 2024,
      citations: 23,
      downloads: 156,
      category: 'quantum',
      abstract:
        'A comprehensive review of quantum computing applications in pharmaceutical research...',
    },
    {
      id: 3,
      title: 'CRISPR-Cas9 Applications in Genetic Disease Treatment',
      authors: ['Prof. Alex Thompson', 'Dr. Lisa Wang'],
      journal: 'Cell',
      year: 2023,
      citations: 89,
      downloads: 567,
      category: 'biotech',
      abstract:
        'Exploring the therapeutic potential of CRISPR-Cas9 in treating genetic disorders...',
    },
  ];

  const collaborations = [
    {
      id: 1,
      title: 'MIT Research Partnership',
      partner: 'Massachusetts Institute of Technology',
      type: 'Academic',
      focus: 'AI & Machine Learning',
      duration: '2 years',
      funding: '$500,000',
      status: 'active',
    },
    {
      id: 2,
      title: 'Google AI Research Collaboration',
      partner: 'Google Research',
      type: 'Industry',
      focus: 'Quantum Computing',
      duration: '18 months',
      funding: '$750,000',
      status: 'active',
    },
    {
      id: 3,
      title: 'NIH Biomedical Research Grant',
      partner: 'National Institutes of Health',
      type: 'Government',
      focus: 'Biotechnology',
      duration: '3 years',
      funding: '$1,200,000',
      status: 'planning',
    },
  ];

  const tabs = [
    { id: 'experiments', name: 'Experiments', icon: BeakerIcon },
    { id: 'papers', name: 'Research Papers', icon: DocumentTextIcon },
    { id: 'collaborations', name: 'Collaborations', icon: UserGroupIcon },
    { id: 'resources', name: 'Resources', icon: GlobeAltIcon },
  ];

  const filteredExperiments = experiments.filter(experiment => {
    const matchesSearch =
      experiment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experiment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || experiment.category === selectedCategory;
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
              <h1 className="text-3xl font-bold text-gray-900">Research Lab</h1>
              <p className="text-gray-600 mt-2">
                Cutting-edge research, experiments, and scientific discoveries.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="w-5 h-5 mr-2 inline" />
                New Experiment
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <BellIcon className="w-5 h-5 mr-2 inline" />
                Research Updates
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
                placeholder="Search experiments..."
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
                <option>Highest Funding</option>
                <option>Most Participants</option>
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
            {activeTab === 'experiments' && (
              <div className="space-y-6">
                {filteredExperiments.map((experiment, index) => (
                  <motion.div
                    key={experiment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={experiment.image}
                          alt={experiment.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3 md:ml-6">
                        <div className="flex items-center space-x-2 mb-3">
                          {experiment.featured && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              experiment.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : experiment.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {experiment.status}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              experiment.category === 'ai-ml'
                                ? 'bg-purple-100 text-purple-800'
                                : experiment.category === 'quantum'
                                ? 'bg-indigo-100 text-indigo-800'
                                : experiment.category === 'biotech'
                                ? 'bg-green-100 text-green-800'
                                : experiment.category === 'robotics'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {experiment.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {experiment.title}
                        </h3>

                        <p className="text-gray-600 mb-4">
                          {experiment.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <UserIcon className="w-4 h-4 mr-1" />
                            {experiment.researcher}
                          </div>
                          <div className="flex items-center">
                            <UsersIcon className="w-4 h-4 mr-1" />
                            {experiment.participants} participants
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {experiment.duration}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {experiment.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div>
                              <span className="text-sm text-gray-500">
                                Progress
                              </span>
                              <div className="flex items-center">
                                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${experiment.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">
                                  {experiment.progress}%
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">
                                Funding
                              </span>
                              <div className="text-sm font-medium text-green-600">
                                {experiment.funding}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                              View Details
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <BookmarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'papers' && (
              <div className="space-y-6">
                {researchPapers.map((paper, index) => (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {paper.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {paper.authors.join(', ')}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          {paper.journal} • {paper.year}
                        </p>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {paper.abstract}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{paper.citations} citations</span>
                          <span>{paper.downloads} downloads</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Read Paper
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <BookmarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'collaborations' && (
              <div className="space-y-6">
                {collaborations.map((collaboration, index) => (
                  <motion.div
                    key={collaboration.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {collaboration.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {collaboration.partner}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              collaboration.type === 'Academic'
                                ? 'bg-blue-100 text-blue-800'
                                : collaboration.type === 'Industry'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {collaboration.type}
                          </span>
                          <span>Focus: {collaboration.focus}</span>
                          <span>Duration: {collaboration.duration}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Funding: </span>
                          <span className="font-medium text-green-600">
                            {collaboration.funding}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            collaboration.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {collaboration.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
                      <ServerIcon className="w-8 h-8 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Research Database
                        </h3>
                        <p className="text-sm text-gray-600">
                          Access to research papers and datasets
                        </p>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Access Database
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <ServerIcon className="w-8 h-8 text-green-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Computing Resources
                        </h3>
                        <p className="text-sm text-gray-600">
                          High-performance computing clusters
                        </p>
                      </div>
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                      Request Access
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <CloudIcon className="w-8 h-8 text-purple-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Cloud Computing
                        </h3>
                        <p className="text-sm text-gray-600">
                          Cloud-based research infrastructure
                        </p>
                      </div>
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                      Deploy Resources
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

export default ResearchLabPage;
