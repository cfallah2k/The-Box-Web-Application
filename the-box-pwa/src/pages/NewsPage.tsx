import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  NewspaperIcon,
  MagnifyingGlassIcon,
  FilterIcon,
  CalendarIcon,
  UserIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  TagIcon,
  FireIcon,
  StarIcon,
  SparklesIcon,
  BoltIcon,
  GlobeAltIcon,
  CpuChipIcon,
  BeakerIcon,
  RocketLaunchIcon,
  BrainIcon,
  AcademicCapIcon,
  ClockIcon,
  ArrowRightIcon,
  PlayIcon,
  PauseIcon,
  XMarkIcon,
  GridIcon,
  ListIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Badge } from '@/components/ui/Badge';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'technology' | 'education' | 'ai' | 'research' | 'industry' | 'innovation';
  author: string;
  authorAvatar: string;
  publishDate: Date;
  readTime: number;
  image: string;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  isFeatured: boolean;
  isTrending: boolean;
  isNew: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const NewsPage: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'All News', icon: NewspaperIcon, count: 24 },
    { id: 'technology', name: 'Technology', icon: CpuChipIcon, count: 8 },
    { id: 'education', name: 'Education', icon: AcademicCapIcon, count: 6 },
    { id: 'ai', name: 'AI & ML', icon: BrainIcon, count: 5 },
    { id: 'research', name: 'Research', icon: BeakerIcon, count: 3 },
    { id: 'industry', name: 'Industry', icon: GlobeAltIcon, count: 2 }
  ];

  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: '🚀 Breakthrough in AI-Powered Learning: GPT-4 Integration Revolutionizes Education',
      excerpt: 'The latest integration of GPT-4 technology in educational platforms is transforming how students learn, with unprecedented personalization and adaptive learning capabilities.',
      content: 'The educational technology landscape is experiencing a revolutionary transformation with the integration of advanced AI models like GPT-4. This breakthrough technology is enabling unprecedented levels of personalization in learning, allowing educational platforms to adapt to each student\'s unique learning style, pace, and preferences.\n\nKey innovations include real-time content adaptation, intelligent tutoring systems, and predictive analytics that identify learning gaps before they become obstacles. Early results show a 40% improvement in learning outcomes and a 60% increase in student engagement.\n\nThe integration also brings advanced natural language processing capabilities, enabling students to ask complex questions and receive detailed, contextual responses that enhance their understanding of difficult concepts.',
      category: 'ai',
      author: 'Dr. Sarah Chen',
      authorAvatar: '/api/placeholder/100/100',
      publishDate: new Date('2024-01-15'),
      readTime: 8,
      image: '/api/placeholder/600/400',
      tags: ['AI', 'Education', 'GPT-4', 'Machine Learning', 'Innovation'],
      likes: 234,
      views: 1247,
      comments: 45,
      isFeatured: true,
      isTrending: true,
      isNew: true,
      difficulty: 'advanced'
    },
    {
      id: '2',
      title: '📊 The Future of Data Science: New Tools and Techniques for 2024',
      excerpt: 'Explore the cutting-edge tools and techniques that are shaping the future of data science and analytics.',
      content: 'Data science continues to evolve at an unprecedented pace, with new tools and techniques emerging that are fundamentally changing how we approach analytics and machine learning. This comprehensive overview explores the latest developments in the field.\n\nKey trends include the rise of automated machine learning (AutoML), the integration of real-time streaming analytics, and the emergence of explainable AI systems that provide transparency in decision-making processes.\n\nNew tools like advanced visualization platforms and collaborative data science environments are making it easier for teams to work together on complex analytical projects.',
      category: 'technology',
      author: 'Mike Johnson',
      authorAvatar: '/api/placeholder/100/100',
      publishDate: new Date('2024-01-12'),
      readTime: 6,
      image: '/api/placeholder/600/400',
      tags: ['Data Science', 'Analytics', 'Machine Learning', 'Tools'],
      likes: 156,
      views: 892,
      comments: 23,
      isFeatured: true,
      isTrending: false,
      isNew: false,
      difficulty: 'intermediate'
    },
    {
      id: '3',
      title: '🎓 How Online Learning is Reshaping Higher Education',
      excerpt: 'Universities worldwide are adopting hybrid learning models that combine the best of online and traditional education.',
      content: 'The COVID-19 pandemic accelerated the adoption of online learning technologies, but the transformation is far from complete. Universities are now developing sophisticated hybrid learning models that combine the flexibility of online education with the personal connection of traditional classroom settings.\n\nThese new models leverage advanced technologies like virtual reality for immersive learning experiences, AI-powered tutoring systems for personalized instruction, and collaborative platforms that enable global student interactions.\n\nThe results are promising: increased accessibility to quality education, improved learning outcomes through personalized instruction, and reduced costs for both institutions and students.',
      category: 'education',
      author: 'Prof. Emily Rodriguez',
      authorAvatar: '/api/placeholder/100/100',
      publishDate: new Date('2024-01-10'),
      readTime: 5,
      image: '/api/placeholder/600/400',
      tags: ['Online Learning', 'Higher Education', 'Technology', 'Innovation'],
      likes: 189,
      views: 1156,
      comments: 34,
      isFeatured: false,
      isTrending: true,
      isNew: false,
      difficulty: 'beginner'
    },
    {
      id: '4',
      title: '🔬 Quantum Computing Breakthrough: New Algorithm Solves Complex Problems',
      excerpt: 'Researchers have developed a novel quantum algorithm that can solve previously intractable computational problems.',
      content: 'A team of researchers has achieved a significant breakthrough in quantum computing with the development of a new algorithm that can efficiently solve complex optimization problems that were previously considered intractable for classical computers.\n\nThe algorithm leverages quantum superposition and entanglement to explore multiple solution paths simultaneously, dramatically reducing computation time for certain classes of problems.\n\nThis breakthrough has implications for fields ranging from cryptography and drug discovery to financial modeling and climate prediction. The research team is now working on implementing this algorithm on existing quantum hardware.',
      category: 'research',
      author: 'Dr. Alex Thompson',
      authorAvatar: '/api/placeholder/100/100',
      publishDate: new Date('2024-01-08'),
      readTime: 7,
      image: '/api/placeholder/600/400',
      tags: ['Quantum Computing', 'Research', 'Algorithms', 'Innovation'],
      likes: 267,
      views: 1892,
      comments: 67,
      isFeatured: true,
      isTrending: true,
      isNew: true,
      difficulty: 'expert'
    },
    {
      id: '5',
      title: '💼 Industry 4.0: The Future of Manufacturing and Automation',
      excerpt: 'Smart factories and intelligent automation are revolutionizing manufacturing processes worldwide.',
      content: 'Industry 4.0 represents the fourth industrial revolution, characterized by the integration of digital technologies into manufacturing processes. This transformation is creating smart factories that can operate with minimal human intervention while maximizing efficiency and quality.\n\nKey technologies driving this revolution include the Internet of Things (IoT), artificial intelligence, robotics, and advanced analytics. These technologies work together to create intelligent systems that can predict maintenance needs, optimize production schedules, and ensure consistent quality.\n\nThe impact extends beyond manufacturing, influencing supply chain management, product design, and customer service. Companies that embrace these technologies are seeing significant improvements in productivity and cost reduction.',
      category: 'industry',
      author: 'Lisa Wang',
      authorAvatar: '/api/placeholder/100/100',
      publishDate: new Date('2024-01-05'),
      readTime: 4,
      image: '/api/placeholder/600/400',
      tags: ['Industry 4.0', 'Manufacturing', 'Automation', 'IoT'],
      likes: 134,
      views: 756,
      comments: 18,
      isFeatured: false,
      isTrending: false,
      isNew: false,
      difficulty: 'intermediate'
    }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleLike = (articleId: string) => {
    addToast({
      type: 'success',
      title: 'Liked!',
      message: 'Article added to your favorites.'
    });
  };

  const handleShare = (article: NewsArticle) => {
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
                📰 Advanced News & Insights
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with the latest trends in technology, education, and innovation
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn btn-outline">
                <BookmarkIcon className="w-4 h-4 mr-2" />
                Saved Articles
              </button>
              <button className="btn btn-primary">
                <ShareIcon className="w-4 h-4 mr-2" />
                Subscribe
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
                    placeholder="Search articles..."
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
            </div>
          </div>
        </motion.div>

        {/* Featured Article */}
        {filteredArticles.filter(article => article.isFeatured).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="card overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={filteredArticles.find(article => article.isFeatured)?.image}
                    alt="Featured Article"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="premium">
                      <StarIcon className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge variant="success">Latest</Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {filteredArticles.find(article => article.isFeatured)?.publishDate.toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {filteredArticles.find(article => article.isFeatured)?.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {filteredArticles.find(article => article.isFeatured)?.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={filteredArticles.find(article => article.isFeatured)?.authorAvatar}
                        alt="Author"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {filteredArticles.find(article => article.isFeatured)?.author}
                      </span>
                    </div>
                    <button
                      onClick={() => handleArticleClick(filteredArticles.find(article => article.isFeatured)!)}
                      className="btn btn-primary"
                    >
                      Read More
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            <AnimatePresence>
              {filteredArticles.filter(article => !article.isFeatured).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                  onClick={() => handleArticleClick(article)}
                >
                  {/* Article Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'h-48'}`}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {article.isTrending && (
                        <Badge variant="error" className="text-xs">
                          <FireIcon className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      {article.isNew && (
                        <Badge variant="success" className="text-xs">
                          <SparklesIcon className="w-3 h-3 mr-1" />
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(article.id);
                        }}
                        className="p-1 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        <HeartIcon className="w-4 h-4 text-red-500" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(article);
                        }}
                        className="p-1 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        <ShareIcon className="w-4 h-4 text-blue-500" />
                      </button>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <span className={`text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                        {article.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <img
                          src={article.authorAvatar}
                          alt={article.author}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {article.author}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {article.publishDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 2).map((tag, index) => (
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
                            {article.likes}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <EyeIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {article.views}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {article.readTime} min read
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
          {isModalOpen && selectedArticle && (
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
                      {selectedArticle.title}
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      className="w-full rounded-lg"
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={selectedArticle.authorAvatar}
                          alt={selectedArticle.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {selectedArticle.author}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedArticle.publishDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedArticle.readTime} min read
                        </span>
                      </div>
                    </div>
                    
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {selectedArticle.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4">
                        <button className="btn btn-outline">
                          <ShareIcon className="w-4 h-4 mr-2" />
                          Share
                        </button>
                        <button className="btn btn-primary">
                          <BookmarkIcon className="w-4 h-4 mr-2" />
                          Save
                        </button>
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

export default NewsPage; 