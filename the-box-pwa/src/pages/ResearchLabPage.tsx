import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BeakerIcon,
  CodeBracketIcon,
  CpuChipIcon,
  BrainIcon,
  SparklesIcon,
  RocketLaunchIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  EyeIcon,
  ShareIcon,
  PlusIcon,
  StarIcon,
  FireIcon,
  BoltIcon,
  GlobeAltIcon,
  ServerIcon,
  CloudIcon,
  LockClosedIcon,
  LockOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Badge } from '@/components/ui/Badge';

interface Experiment {
  id: string;
  title: string;
  description: string;
  category: 'ai' | 'ml' | 'data' | 'web' | 'blockchain';
  status: 'running' | 'paused' | 'stopped' | 'completed';
  progress: number;
  duration: string;
  resources: { cpu: number; memory: number; gpu: number };
  tags: string[];
  framework: string;
  complexity: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  isPublic: boolean;
  collaborators: string[];
}

const ResearchLabPage: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'experiments' | 'playground' | 'templates'>('experiments');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const experiments: Experiment[] = [
    {
      id: '1',
      title: '🧠 Neural Network Architecture Search',
      description: 'Automated discovery of optimal neural network architectures using reinforcement learning.',
      category: 'ai',
      status: 'running',
      progress: 67,
      duration: '2h 15m',
      resources: { cpu: 85, memory: 72, gpu: 95 },
      tags: ['Neural Networks', 'AutoML', 'Reinforcement Learning'],
      framework: 'PyTorch',
      complexity: 'expert',
      isPublic: true,
      collaborators: ['Dr. Sarah Chen', 'Mike Johnson']
    },
    {
      id: '2',
      title: '📊 Real-time Data Pipeline',
      description: 'Building a scalable real-time data processing pipeline using Apache Kafka and Flink.',
      category: 'data',
      status: 'paused',
      progress: 34,
      duration: '4h 22m',
      resources: { cpu: 45, memory: 88, gpu: 0 },
      tags: ['Apache Kafka', 'Apache Flink', 'Real-time', 'Big Data'],
      framework: 'Apache Flink',
      complexity: 'advanced',
      isPublic: false,
      collaborators: ['Data Engineering Team']
    },
    {
      id: '3',
      title: '🔗 Smart Contract Optimization',
      description: 'Optimizing Ethereum smart contracts for gas efficiency and security.',
      category: 'blockchain',
      status: 'completed',
      progress: 100,
      duration: '6h 45m',
      resources: { cpu: 23, memory: 34, gpu: 0 },
      tags: ['Ethereum', 'Smart Contracts', 'Gas Optimization'],
      framework: 'Solidity',
      complexity: 'advanced',
      isPublic: true,
      collaborators: ['Blockchain Team']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-500';
      case 'paused': return 'text-yellow-500';
      case 'stopped': return 'text-gray-500';
      case 'completed': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <PlayIcon className="w-4 h-4" />;
      case 'paused': return <PauseIcon className="w-4 h-4" />;
      case 'stopped': return <StopIcon className="w-4 h-4" />;
      case 'completed': return <CheckCircleIcon className="w-4 h-4" />;
      default: return <XCircleIcon className="w-4 h-4" />;
    }
  };

  const categories = [
    { id: 'all', name: 'All Categories', count: experiments.length },
    { id: 'ai', name: 'Artificial Intelligence', count: experiments.filter(e => e.category === 'ai').length },
    { id: 'ml', name: 'Machine Learning', count: experiments.filter(e => e.category === 'ml').length },
    { id: 'data', name: 'Data Science', count: experiments.filter(e => e.category === 'data').length },
    { id: 'web', name: 'Web Development', count: experiments.filter(e => e.category === 'web').length },
    { id: 'blockchain', name: 'Blockchain', count: experiments.filter(e => e.category === 'blockchain').length }
  ];

  const filteredExperiments = experiments.filter(experiment => 
    selectedCategory === 'all' || experiment.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🔬 Advanced Research & Development Lab
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Cutting-edge experiments, AI research, and innovation playground
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn btn-primary">
                <PlusIcon className="w-4 h-4 mr-2" />
                New Experiment
              </button>
              <button className="btn btn-outline">
                <CodeBracketIcon className="w-4 h-4 mr-2" />
                New Playground
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {[
              { id: 'experiments', name: 'Experiments', icon: BeakerIcon },
              { id: 'playground', name: 'Code Playground', icon: CodeBracketIcon },
              { id: 'templates', name: 'Templates', icon: AcademicCapIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {activeTab === 'experiments' && (
            <div className="space-y-6">
              {filteredExperiments.map((experiment, index) => (
                <motion.div
                  key={experiment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {experiment.title}
                        </h3>
                        <div className={`flex items-center space-x-1 ${getStatusColor(experiment.status)}`}>
                          {getStatusIcon(experiment.status)}
                          <span className="text-sm font-medium capitalize">{experiment.status}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {experiment.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {experiment.duration}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AcademicCapIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {experiment.complexity}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CodeBracketIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {experiment.framework}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Progress
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {experiment.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${experiment.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Resource Usage */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            {experiment.resources.cpu}%
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">CPU</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            {experiment.resources.memory}%
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Memory</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            {experiment.resources.gpu}%
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">GPU</div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {experiment.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button className="btn btn-sm btn-primary">
                            <PlayIcon className="w-4 h-4 mr-1" />
                            Start
                          </button>
                          <button className="btn btn-sm btn-outline">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            View
                          </button>
                          <button className="btn btn-sm btn-outline">
                            <ShareIcon className="w-4 h-4 mr-1" />
                            Share
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          {experiment.isPublic ? (
                            <LockOpenIcon className="w-4 h-4 text-green-500" />
                          ) : (
                            <LockClosedIcon className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {experiment.collaborators.length} collaborators
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'playground' && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Code Playground
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Interactive coding environment for experimenting with AI, machine learning, and web technologies.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: '🤖 AI/ML Experiments', description: 'Python notebooks for AI research', icon: BrainIcon },
                  { title: '🌐 Web Development', description: 'React, Node.js, and modern web tech', icon: GlobeAltIcon },
                  { title: '📊 Data Science', description: 'Jupyter notebooks and data analysis', icon: ChartBarIcon },
                  { title: '🔗 Blockchain', description: 'Smart contracts and DeFi experiments', icon: ServerIcon },
                  { title: '⚡ Performance', description: 'Optimization and benchmarking tools', icon: BoltIcon },
                  { title: '🧪 Custom Lab', description: 'Create your own research environment', icon: BeakerIcon }
                ].map((playground, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <playground.icon className="w-8 h-8 text-primary-600" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {playground.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {playground.description}
                    </p>
                    <button className="btn btn-sm btn-primary w-full">
                      <PlayIcon className="w-4 h-4 mr-2" />
                      Launch
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Research Templates
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Pre-built templates for common research scenarios and experiments.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResearchLabPage; 