import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  FilterIcon,
  StarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  BeakerIcon,
  SparklesIcon,
  RocketLaunchIcon,
  BrainIcon,
  CpuChipIcon,
  BookOpenIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  GlobeAltIcon,
  HeartIcon,
  ShoppingCartIcon,
  EyeIcon,
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  CogIcon,
  TagIcon,
  FireIcon,
  TrophyIcon,
  BoltIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Badge } from '@/components/ui/Badge';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'course' | 'tool' | 'service' | 'resource' | 'ai';
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tags: string[];
  image: string;
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;
  isDiscounted: boolean;
  features: string[];
  requirements: string[];
  outcomes: string[];
  aiPowered: boolean;
  interactive: boolean;
  certificate: boolean;
  lifetime: boolean;
  support: 'basic' | 'premium' | 'enterprise';
}

const MarketplacePage: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cart, setCart] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All Categories', icon: GlobeAltIcon, count: 156 },
    { id: 'programming', name: 'Programming', icon: CodeBracketIcon, count: 42 },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: BrainIcon, count: 28 },
    { id: 'data-science', name: 'Data Science', icon: BeakerIcon, count: 35 },
    { id: 'business', name: 'Business', icon: PresentationChartLineIcon, count: 23 },
    { id: 'design', name: 'Design', icon: SparklesIcon, count: 18 },
    { id: 'languages', name: 'Languages', icon: GlobeAltIcon, count: 15 },
    { id: 'tools', name: 'Tools & Services', icon: CogIcon, count: 12 }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
    { id: 'expert', name: 'Expert' }
  ];

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: '1',
      title: '🚀 Advanced AI Development Masterclass',
      description: 'Master the latest AI technologies including GPT-4, Claude, and custom neural networks. Build production-ready AI applications.',
      category: 'ai-ml',
      type: 'course',
      price: 299,
      originalPrice: 499,
      rating: 4.9,
      reviews: 1247,
      instructor: 'Dr. Sarah Chen',
      duration: '40 hours',
      level: 'advanced',
      tags: ['AI', 'Machine Learning', 'Neural Networks', 'GPT-4'],
      image: '/api/placeholder/400/300',
      isFeatured: true,
      isNew: true,
      isPopular: true,
      isDiscounted: true,
      features: [
        'Real-time AI model training',
        'Custom GPT-4 implementations',
        'Production deployment strategies',
        'Advanced prompt engineering',
        'AI ethics and safety'
      ],
      requirements: ['Python basics', 'Linear algebra', 'Calculus'],
      outcomes: [
        'Build custom AI models',
        'Deploy AI applications',
        'Optimize AI performance',
        'Understand AI ethics'
      ],
      aiPowered: true,
      interactive: true,
      certificate: true,
      lifetime: true,
      support: 'premium'
    },
    {
      id: '2',
      title: '💻 Full-Stack Development Bootcamp',
      description: 'Complete web development course covering React, Node.js, databases, and deployment. Build real-world applications.',
      category: 'programming',
      type: 'course',
      price: 199,
      originalPrice: 299,
      rating: 4.8,
      reviews: 2156,
      instructor: 'Mike Johnson',
      duration: '60 hours',
      level: 'intermediate',
      tags: ['React', 'Node.js', 'JavaScript', 'Full-Stack'],
      image: '/api/placeholder/400/300',
      isFeatured: true,
      isNew: false,
      isPopular: true,
      isDiscounted: true,
      features: [
        'Modern React with hooks',
        'Server-side development',
        'Database design',
        'Cloud deployment',
        'Real-time features'
      ],
      requirements: ['Basic JavaScript', 'HTML/CSS'],
      outcomes: [
        'Build full-stack applications',
        'Deploy to cloud platforms',
        'Implement real-time features',
        'Database optimization'
      ],
      aiPowered: false,
      interactive: true,
      certificate: true,
      lifetime: true,
      support: 'basic'
    },
    {
      id: '3',
      title: '🧠 AI-Powered Learning Assistant',
      description: 'Personal AI tutor that adapts to your learning style. Get personalized explanations, practice problems, and progress tracking.',
      category: 'ai-ml',
      type: 'service',
      price: 49,
      rating: 4.9,
      reviews: 892,
      instructor: 'AI Learning Systems',
      duration: 'Lifetime access',
      level: 'beginner',
      tags: ['AI Tutor', 'Personalized Learning', 'Adaptive'],
      image: '/api/placeholder/400/300',
      isFeatured: true,
      isNew: true,
      isPopular: true,
      isDiscounted: false,
      features: [
        'Personalized learning paths',
        'Real-time explanations',
        'Practice problem generation',
        'Progress analytics',
        '24/7 availability'
      ],
      requirements: ['None'],
      outcomes: [
        'Accelerated learning',
        'Better retention',
        'Personalized feedback',
        'Continuous improvement'
      ],
      aiPowered: true,
      interactive: true,
      certificate: false,
      lifetime: true,
      support: 'premium'
    },
    {
      id: '4',
      title: '📊 Data Science Professional Certificate',
      description: 'Comprehensive data science program covering statistics, machine learning, and data visualization. Industry-recognized certification.',
      category: 'data-science',
      type: 'course',
      price: 399,
      originalPrice: 599,
      rating: 4.7,
      reviews: 1567,
      instructor: 'Dr. Emily Rodriguez',
      duration: '80 hours',
      level: 'advanced',
      tags: ['Data Science', 'Statistics', 'Machine Learning', 'Python'],
      image: '/api/placeholder/400/300',
      isFeatured: false,
      isNew: false,
      isPopular: true,
      isDiscounted: true,
      features: [
        'Statistical analysis',
        'Machine learning algorithms',
        'Data visualization',
        'Big data processing',
        'Industry projects'
      ],
      requirements: ['Python basics', 'Statistics fundamentals'],
      outcomes: [
        'Data analysis skills',
        'ML model development',
        'Visualization expertise',
        'Industry certification'
      ],
      aiPowered: false,
      interactive: true,
      certificate: true,
      lifetime: true,
      support: 'premium'
    },
    {
      id: '5',
      title: '⚡ Performance Optimization Toolkit',
      description: 'Advanced tools and techniques for optimizing application performance. Includes profiling, monitoring, and optimization strategies.',
      category: 'tools',
      type: 'tool',
      price: 99,
      rating: 4.6,
      reviews: 423,
      instructor: 'Performance Labs',
      duration: 'Lifetime access',
      level: 'expert',
      tags: ['Performance', 'Optimization', 'Monitoring', 'Profiling'],
      image: '/api/placeholder/400/300',
      isFeatured: false,
      isNew: true,
      isPopular: false,
      isDiscounted: false,
      features: [
        'Performance profiling tools',
        'Real-time monitoring',
        'Optimization strategies',
        'Benchmarking tools',
        'Expert support'
      ],
      requirements: ['Advanced programming', 'System architecture'],
      outcomes: [
        'Performance optimization skills',
        'Monitoring expertise',
        'Profiling techniques',
        'System optimization'
      ],
      aiPowered: true,
      interactive: false,
      certificate: false,
      lifetime: true,
      support: 'enterprise'
    }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return a.isNew ? -1 : 1;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleAddToCart = (itemId: string) => {
    if (cart.includes(itemId)) {
      setCart(cart.filter(id => id !== itemId));
      addToast({
        type: 'info',
        title: 'Removed from cart',
        message: 'Item has been removed from your cart.'
      });
    } else {
      setCart([...cart, itemId]);
      addToast({
        type: 'success',
        title: 'Added to cart',
        message: 'Item has been added to your cart.'
      });
    }
  };

  const getDiscountPercentage = (item: MarketplaceItem) => {
    if (!item.originalPrice) return 0;
    return Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
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
                🛒 Advanced Learning Marketplace
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover cutting-edge courses, tools, and AI-powered learning resources
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn btn-outline">
                <ShoppingCartIcon className="w-4 h-4 mr-2" />
                Cart ({cart.length})
              </button>
              <button className="btn btn-primary">
                <HeartIcon className="w-4 h-4 mr-2" />
                Wishlist
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="card p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses, tools, and services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10 w-full"
                  />
                </div>
              </div>

              {/* Category Filter */}
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

              {/* Level Filter */}
              <div>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="input w-full"
                >
                  {levels.map(level => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="ai-powered"
                    className="checkbox"
                  />
                  <label htmlFor="ai-powered" className="text-sm text-gray-600 dark:text-gray-400">
                    AI-Powered
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="interactive"
                    className="checkbox"
                  />
                  <label htmlFor="interactive" className="text-sm text-gray-600 dark:text-gray-400">
                    Interactive
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="certificate"
                    className="checkbox"
                  />
                  <label htmlFor="certificate" className="text-sm text-gray-600 dark:text-gray-400">
                    Certificate
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                  >
                    <div className="grid grid-cols-2 gap-1 w-4 h-4">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                  >
                    <div className="space-y-1 w-4 h-4">
                      <div className="bg-current rounded-sm h-1"></div>
                      <div className="bg-current rounded-sm h-1"></div>
                      <div className="bg-current rounded-sm h-1"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {sortedItems.length} of {marketplaceItems.length} items
            </p>
            <div className="flex items-center space-x-2">
              <Badge variant="success">{sortedItems.filter(item => item.isFeatured).length} Featured</Badge>
              <Badge variant="warning">{sortedItems.filter(item => item.isNew).length} New</Badge>
              <Badge variant="error">{sortedItems.filter(item => item.isDiscounted).length} On Sale</Badge>
            </div>
          </div>

          {/* Items Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            <AnimatePresence>
              {sortedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}
                >
                  {/* Item Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'h-48'}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {item.isFeatured && (
                        <Badge variant="premium" className="text-xs">
                          <FireIcon className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {item.isNew && (
                        <Badge variant="success" className="text-xs">
                          <SparklesIcon className="w-3 h-3 mr-1" />
                          New
                        </Badge>
                      )}
                      {item.isDiscounted && (
                        <Badge variant="error" className="text-xs">
                          -{getDiscountPercentage(item)}%
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        className={`p-2 rounded-full ${
                          cart.includes(item.id)
                            ? 'bg-primary-500 text-white'
                            : 'bg-white/90 text-gray-600 hover:bg-primary-500 hover:text-white'
                        } transition-colors`}
                      >
                        <ShoppingCartIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Content */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-1 ml-2">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.rating}
                        </span>
                        <span className="text-sm text-gray-500">({item.reviews})</span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.instructor}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.duration}
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
                      <div className="flex items-center space-x-2">
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          ${item.price}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.aiPowered && (
                          <BrainIcon className="w-4 h-4 text-purple-500" title="AI-Powered" />
                        )}
                        {item.interactive && (
                          <PlayIcon className="w-4 h-4 text-blue-500" title="Interactive" />
                        )}
                        {item.certificate && (
                          <TrophyIcon className="w-4 h-4 text-yellow-500" title="Certificate" />
                        )}
                        {item.lifetime && (
                          <ShieldCheckIcon className="w-4 h-4 text-green-500" title="Lifetime Access" />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketplacePage; 