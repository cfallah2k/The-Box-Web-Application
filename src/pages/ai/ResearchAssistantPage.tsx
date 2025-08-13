import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ResearchQuery {
  id: string;
  topic: string;
  query: string;
  results: ResearchResult[];
  summary: string;
  sources: Source[];
  timestamp: Date;
  status: 'searching' | 'analyzing' | 'completed' | 'error';
}

interface ResearchResult {
  id: string;
  title: string;
  content: string;
  source: string;
  url: string;
  relevance: number; // 0-100
  credibility: number; // 0-100
  date: string;
  tags: string[];
}

interface Source {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'paper' | 'book' | 'video' | 'website';
  author: string;
  date: string;
  credibility: number;
  summary: string;
}

interface ResearchTopic {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  prerequisites: string[];
  resources: string[];
}

const ResearchAssistantPage: React.FC = () => {
  const { user } = useAuth();
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [researchQuery, setResearchQuery] = useState<ResearchQuery | null>(null);
  const [recentQueries, setRecentQueries] = useState<ResearchQuery[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'topics' | 'history'>('search');

  useEffect(() => {
    // Load mock recent queries
    const mockQueries: ResearchQuery[] = [
      {
        id: '1',
        topic: 'Machine Learning Fundamentals',
        query: 'What are the basic concepts of machine learning?',
        results: [
          {
            id: '1',
            title: 'Introduction to Machine Learning',
            content: 'Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions without being explicitly programmed...',
            source: 'Stanford University',
            url: 'https://example.com/ml-intro',
            relevance: 95,
            credibility: 90,
            date: '2024-01-15',
            tags: ['machine learning', 'AI', 'fundamentals']
          }
        ],
        summary: 'Machine learning is a powerful subset of AI that enables computers to learn patterns from data and make predictions. Key concepts include supervised learning, unsupervised learning, and reinforcement learning.',
        sources: [
          {
            id: '1',
            title: 'Machine Learning: A Probabilistic Perspective',
            url: 'https://example.com/book',
            type: 'book',
            author: 'Kevin Murphy',
            date: '2012',
            credibility: 95,
            summary: 'Comprehensive textbook covering fundamental ML concepts'
          }
        ],
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'completed'
      }
    ];
    setRecentQueries(mockQueries);
  }, []);

  const startResearch = async () => {
    if (!currentQuery.trim()) return;

    setIsResearching(true);
    const query: ResearchQuery = {
      id: Date.now().toString(),
      topic: selectedTopic || 'General Research',
      query: currentQuery,
      results: [],
      summary: '',
      sources: [],
      timestamp: new Date(),
      status: 'searching'
    };

    setResearchQuery(query);

    // Simulate research process
    setTimeout(() => {
      query.status = 'analyzing';
      setResearchQuery({ ...query });

      setTimeout(() => {
        const mockResults: ResearchResult[] = [
          {
            id: '1',
            title: 'Understanding ' + currentQuery,
            content: `Based on the latest research, ${currentQuery} involves several key concepts and methodologies. Recent studies have shown significant developments in this area...`,
            source: 'Research Institute',
            url: 'https://example.com/research1',
            relevance: 92,
            credibility: 88,
            date: '2024-01-20',
            tags: [currentQuery.toLowerCase(), 'research', 'analysis']
          },
          {
            id: '2',
            title: 'Advanced Approaches to ' + currentQuery,
            content: `Modern approaches to ${currentQuery} have evolved significantly. Researchers have identified several innovative methods...`,
            source: 'Academic Journal',
            url: 'https://example.com/research2',
            relevance: 85,
            credibility: 92,
            date: '2024-01-18',
            tags: [currentQuery.toLowerCase(), 'advanced', 'methods']
          }
        ];

        const mockSources: Source[] = [
          {
            id: '1',
            title: 'Comprehensive Guide to ' + currentQuery,
            url: 'https://example.com/guide',
            type: 'article',
            author: 'Dr. Jane Smith',
            date: '2024-01-15',
            credibility: 90,
            summary: 'In-depth analysis of current trends and methodologies'
          }
        ];

        const mockSummary = `Research on "${currentQuery}" reveals several important findings. The topic encompasses multiple disciplines and has seen significant advancement in recent years. Key areas include theoretical foundations, practical applications, and future directions.`;

        query.results = mockResults;
        query.sources = mockSources;
        query.summary = mockSummary;
        query.status = 'completed';

        setResearchQuery({ ...query });
        setRecentQueries(prev => [query, ...prev.slice(0, 4)]);
        setIsResearching(false);
      }, 2000);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'searching': return 'text-blue-600 bg-blue-100';
      case 'analyzing': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const researchTopics: ResearchTopic[] = [
    {
      id: '1',
      name: 'Artificial Intelligence Fundamentals',
      description: 'Learn the basics of AI, machine learning, and neural networks',
      difficulty: 'beginner',
      estimatedTime: 120,
      prerequisites: ['Basic programming knowledge'],
      resources: ['Online courses', 'Textbooks', 'Research papers']
    },
    {
      id: '2',
      name: 'Web Development Best Practices',
      description: 'Modern web development techniques and frameworks',
      difficulty: 'intermediate',
      estimatedTime: 90,
      prerequisites: ['HTML/CSS', 'JavaScript basics'],
      resources: ['Documentation', 'Tutorials', 'Code examples']
    },
    {
      id: '3',
      name: 'Data Science and Analytics',
      description: 'Advanced data analysis and statistical methods',
      difficulty: 'advanced',
      estimatedTime: 180,
      prerequisites: ['Statistics', 'Python programming'],
      resources: ['Research papers', 'Academic courses', 'Industry reports']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Research Assistant</h1>
          <p className="text-gray-600">Intelligent research, source finding, and content analysis powered by AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Research Area */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-lg mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {(['search', 'topics', 'history'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'search' && (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Research Query</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Research Topic (Optional)
                          </label>
                          <select
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select a topic or enter custom</option>
                            <option value="AI and Machine Learning">AI and Machine Learning</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Software Engineering">Software Engineering</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Research Question
                          </label>
                          <textarea
                            value={currentQuery}
                            onChange={(e) => setCurrentQuery(e.target.value)}
                            placeholder="What would you like to research? Be specific for better results..."
                            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={startResearch}
                            disabled={isResearching || !currentQuery.trim()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isResearching ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Researching...
                              </div>
                            ) : (
                              'Start Research'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Research Results */}
                    {researchQuery && (
                      <div className="space-y-6">
                        {/* Status */}
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">Research Progress</h3>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(researchQuery.status)}`}>
                            {researchQuery.status.charAt(0).toUpperCase() + researchQuery.status.slice(1)}
                          </span>
                        </div>

                        {/* Summary */}
                        {researchQuery.summary && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-medium text-blue-900 mb-2">Research Summary</h4>
                            <p className="text-blue-800">{researchQuery.summary}</p>
                          </div>
                        )}

                        {/* Results */}
                        {researchQuery.results.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Research Results</h4>
                            <div className="space-y-4">
                              {researchQuery.results.map((result) => (
                                <div key={result.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <h5 className="font-medium text-gray-900">{result.title}</h5>
                                    <div className="flex items-center space-x-2">
                                      <span className={`text-sm font-medium ${getCredibilityColor(result.credibility)}`}>
                                        {result.credibility}% credible
                                      </span>
                                      <span className="text-sm text-gray-500">
                                        {result.relevance}% relevant
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-gray-600 text-sm mb-3">{result.content}</p>
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Source: {result.source}</span>
                                    <span>{result.date}</span>
                                  </div>
                                  <div className="flex items-center mt-2">
                                    {result.tags.map((tag, index) => (
                                      <span
                                        key={index}
                                        className="mr-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Sources */}
                        {researchQuery.sources.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Sources & References</h4>
                            <div className="space-y-3">
                              {researchQuery.sources.map((source) => (
                                <div key={source.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h5 className="font-medium text-gray-900">{source.title}</h5>
                                      <p className="text-sm text-gray-600">by {source.author}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className={`text-sm font-medium ${getCredibilityColor(source.credibility)}`}>
                                        {source.credibility}% credible
                                      </span>
                                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                        {source.type}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{source.summary}</p>
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{source.date}</span>
                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800"
                                    >
                                      View Source
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'topics' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Research Topics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {researchTopics.map((topic) => (
                        <div key={topic.id} className="bg-white border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-medium text-gray-900">{topic.name}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              topic.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                              topic.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {topic.difficulty.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{topic.description}</p>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Time:</span> {topic.estimatedTime} minutes
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Prerequisites:</span>
                              <ul className="ml-4 mt-1">
                                {topic.prerequisites.map((prereq, index) => (
                                  <li key={index} className="text-gray-600">• {prereq}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Resources:</span>
                              <ul className="ml-4 mt-1">
                                {topic.resources.map((resource, index) => (
                                  <li key={index} className="text-gray-600">• {resource}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setActiveTab('search');
                              setSelectedTopic(topic.name);
                              setCurrentQuery(`Tell me about ${topic.name.toLowerCase()}`);
                            }}
                            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Research This Topic
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Research History</h2>
                    <div className="space-y-4">
                      {recentQueries.map((query) => (
                        <div
                          key={query.id}
                          className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setActiveTab('search');
                            setResearchQuery(query);
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-gray-900">{query.topic}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(query.status)}`}>
                              {query.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{query.query}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{query.results.length} results found</span>
                            <span>{query.timestamp.toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Research */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Research</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setActiveTab('search');
                    setCurrentQuery('What are the latest trends in artificial intelligence?');
                  }}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">AI Trends</div>
                  <div className="text-sm text-gray-600">Latest developments</div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('search');
                    setCurrentQuery('Best practices for modern web development');
                  }}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Web Development</div>
                  <div className="text-sm text-gray-600">Best practices</div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('search');
                    setCurrentQuery('Data science methodologies and tools');
                  }}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Data Science</div>
                  <div className="text-sm text-gray-600">Methodologies</div>
                </button>
              </div>
            </div>

            {/* Research Tips */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></div>
                  <span className="text-gray-700">Be specific in your research questions</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2"></div>
                  <span className="text-gray-700">Check source credibility scores</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2"></div>
                  <span className="text-gray-700">Use multiple sources for verification</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 mt-2"></div>
                  <span className="text-gray-700">Consider recent publications</span>
                </div>
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Research Features</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Intelligent Source Finding</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Content Summarization</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Credibility Assessment</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Topic Exploration</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Research Planning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchAssistantPage;
