import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PhotoIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  SparklesIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  PlayIcon,
  PauseIcon,
  MagnifyingGlassIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  DownloadIcon,
  BookmarkIcon,
  UserIcon,
  CalendarIcon,
  TagIcon,
  FireIcon,
  TrophyIcon,
  BoltIcon,
  GlobeAltIcon,
  CpuChipIcon,
  BeakerIcon,
  RocketLaunchIcon,
  BrainIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Badge } from '@/components/ui/Badge';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'project' | 'design' | 'code' | 'research' | 'achievement' | 'event';
  type: 'image' | 'video' | 'document' | 'interactive';
  thumbnail: string;
  fullImage?: string;
  videoUrl?: string;
  tags: string[];
  author: string;
  date: Date;
  likes: number;
  views: number;
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planned';
}

const GalleryPage: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', icon: PhotoIcon, count: 24 },
    { id: 'project', name: 'Projects', icon: CodeBracketIcon, count: 8 },
    { id: 'design', name: 'Designs', icon: SparklesIcon, count: 6 },
    { id: 'code', name: 'Code', icon: CpuChipIcon, count: 5 },
    { id: 'research', name: 'Research', icon: BeakerIcon, count: 3 },
    { id: 'achievement', name: 'Achievements', icon: TrophyIcon, count: 2 }
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: '🚀 Advanced AI Learning Platform',
      description: 'A comprehensive AI-powered learning platform with real-time analytics and personalized recommendations.',
      category: 'project',
      type: 'interactive',
      thumbnail: '/api/placeholder/400/300',
      tags: ['AI/ML', 'React', 'TypeScript', 'Node.js', 'MongoDB'],
      author: 'Dr. Sarah Chen',
      date: new Date('2024-01-15'),
      likes: 156,
      views: 1247,
      isFeatured: true,
      isNew: true,
      isPopular: true,
      difficulty: 'expert',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'TensorFlow'],
      status: 'completed'
    },
    {
      id: '2',
      title: '🎨 Modern UI/UX Design System',
      description: 'A comprehensive design system with reusable components and advanced theming capabilities.',
      category: 'design',
      type: 'image',
      thumbnail: '/api/placeholder/400/300',
      tags: ['UI/UX', 'Design System', 'Figma', 'Accessibility'],
      author: 'Mike Johnson',
      date: new Date('2024-01-12'),
      likes: 89,
      views: 567,
      isFeatured: true,
      isNew: false,
      isPopular: true,
      difficulty: 'advanced',
      technologies: ['Figma', 'React', 'Storybook', 'Tailwind CSS'],
      status: 'completed'
    },
    {
      id: '3',
      title: '🧠 Neural Network Architecture',
      description: 'Advanced neural network implementation with real-time training and visualization.',
      category: 'code',
      type: 'interactive',
      thumbnail: '/api/placeholder/400/300',
      tags: ['Python', 'TensorFlow', 'Neural Networks', 'Deep Learning'],
      author: 'AI Research Team',
      date: new Date('2024-01-10'),
      likes: 234,
      views: 1892,
      isFeatured: false,
      isNew: true,
      isPopular: true,
      difficulty: 'expert',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Jupyter'],
      status: 'completed'
    },
    {
      id: '4',
      title: '📊 Data Visualization Dashboard',
      description: 'Interactive dashboard for real-time data analysis and visualization.',
      category: 'project',
      type: 'interactive',
      thumbnail: '/api/placeholder/400/300',
      tags: ['Data Science', 'D3.js', 'React', 'Analytics'],
      author: 'Data Team',
      date: new Date('2024-01-08'),
      likes: 67,
      views: 423,
      isFeatured: false,
      isNew: false,
      isPopular: false,
      difficulty: 'advanced',
      technologies: ['React', 'D3.js', 'TypeScript', 'Node.js'],
      status: 'in-progress'
    },
    {
      id: '5',
      title: '🏆 Best Innovation Award 2024',
      description: 'Recognized for outstanding contribution to educational technology innovation.',
      category: 'achievement',
      type: 'image',
      thumbnail: '/api/placeholder/400/300',
      tags: ['Award', 'Innovation', 'Education', 'Technology'],
      author: 'The Box Team',
      date: new Date('2024-01-05'),
      likes: 445,
      views: 2156,
      isFeatured: true,
      isNew: false,
      isPopular: true,
      difficulty: 'expert',
      technologies: [],
      status: 'completed'
    },
    {
      id: '6',
      title: '🔬 Quantum Computing Research',
      description: 'Breakthrough research in quantum computing algorithms and applications.',
      category: 'research',
      type: 'document',
      thumbnail: '/api/placeholder/400/300',
      tags: ['Quantum Computing', 'Research', 'Algorithms', 'Physics'],
      author: 'Dr. Emily Rodriguez',
      date: new Date('2024-01-03'),
      likes: 178,
      views: 892,
      isFeatured: false,
      isNew: true,
      isPopular: false,
      difficulty: 'expert',
      technologies: ['Qiskit', 'Python', 'Quantum Algorithms'],
      status: 'completed'
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleLike = (itemId: string) => {
    addToast({
      type: 'success',
      title: 'Liked!',
      message: 'Item added to your favorites.'
    });
  };

  const handleShare = (item: GalleryItem) => {
    addToast({
      type: 'info',
      title: 'Shared!',
      message: 'Link copied to clipboard.'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-500';
      case 'intermediate': return 'text-yellow-500';
      case 'advanced': return 'text-orange-500';
      case 'expert': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in-progress': return 'text-yellow-500';
      case 'planned': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

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
                🎨 Advanced Gallery & Portfolio
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Showcase of innovative projects, designs, and achievements
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn btn-outline">
                <DownloadIcon className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="btn btn-primary">
                <ShareIcon className="w-4 h-4 mr-2" />
                Share Gallery
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="card p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search gallery items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10 w-full"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input w-full"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="input w-full"
                >
                  <option value="all">All Types</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="document">Documents</option>
                  <option value="interactive">Interactive</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                >
                  <GridIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="success">{filteredItems.filter(item => item.isFeatured).length} Featured</Badge>
                <Badge variant="warning">{filteredItems.filter(item => item.isNew).length} New</Badge>
                <Badge variant="error">{filteredItems.filter(item => item.isPopular).length} Popular</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  {/* Item Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'h-48'}`}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {item.isFeatured && (
                        <Badge variant="premium" className="text-xs">
                          <StarIcon className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {item.isNew && (
                        <Badge variant="success" className="text-xs">
                          <SparklesIcon className="w-3 h-3 mr-1" />
                          New
                        </Badge>
                      )}
                      {item.isPopular && (
                        <Badge variant="error" className="text-xs">
                          <FireIcon className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(item.id);
                        }}
                        className="p-1 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        <HeartIcon className="w-4 h-4 text-red-500" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(item);
                        }}
                        className="p-1 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        <ShareIcon className="w-4 h-4 text-blue-500" />
                      </button>
                    </div>
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayIcon className="w-12 h-12 text-white bg-black/50 rounded-full p-3" />
                      </div>
                    )}
                  </div>

                  {/* Item Content */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.author}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.date.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <HeartIcon className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.likes}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <EyeIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.views}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                          {item.difficulty}
                        </span>
                        <span className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedItem.title}
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={selectedItem.thumbnail}
                        alt={selectedItem.title}
                        className="w-full rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {selectedItem.description}
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Technologies Used
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Tags
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.tags.map((tag, index) => (
                              <Badge key={index} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button className="btn btn-primary">
                              <PlayIcon className="w-4 h-4 mr-2" />
                              View Project
                            </button>
                            <button className="btn btn-outline">
                              <ShareIcon className="w-4 h-4 mr-2" />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GalleryPage; 