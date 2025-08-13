import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ContentProject {
  id: string;
  title: string;
  type: 'article' | 'video' | 'presentation' | 'infographic' | 'quiz';
  status: 'draft' | 'generating' | 'completed' | 'published';
  content: string;
  metadata: ContentMetadata;
  createdAt: Date;
  updatedAt: Date;
}

interface ContentMetadata {
  topic: string;
  targetAudience: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  keywords: string[];
  tags: string[];
  language: string;
}

interface GeneratedContent {
  id: string;
  type: 'text' | 'image' | 'video' | 'audio';
  content: string;
  prompt: string;
  style: string;
  timestamp: Date;
  status: 'generating' | 'completed' | 'failed';
}

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  preview: string;
  prompts: string[];
}

const ContentCreatorPage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ContentProject[]>([]);
  const [currentProject, setCurrentProject] = useState<ContentProject | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'projects' | 'templates' | 'gallery'>('create');
  const [contentPrompt, setContentPrompt] = useState('');
  const [selectedType, setSelectedType] = useState<'article' | 'video' | 'presentation' | 'infographic' | 'quiz'>('article');
  const [selectedStyle, setSelectedStyle] = useState('professional');

  useEffect(() => {
    // Load mock projects
    const mockProjects: ContentProject[] = [
      {
        id: '1',
        title: 'Introduction to React Hooks',
        type: 'article',
        status: 'completed',
        content: 'React Hooks are a powerful feature introduced in React 16.8 that allow you to use state and other React features without writing a class component...',
        metadata: {
          topic: 'React Development',
          targetAudience: 'Intermediate developers',
          difficulty: 'intermediate',
          estimatedTime: 15,
          keywords: ['react', 'hooks', 'javascript', 'frontend'],
          tags: ['react', 'javascript', 'tutorial'],
          language: 'English'
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'JavaScript Async Patterns',
        type: 'presentation',
        status: 'draft',
        content: 'Understanding asynchronous programming in JavaScript is crucial for modern web development...',
        metadata: {
          topic: 'JavaScript',
          targetAudience: 'Advanced developers',
          difficulty: 'advanced',
          estimatedTime: 25,
          keywords: ['javascript', 'async', 'promises', 'await'],
          tags: ['javascript', 'async', 'advanced'],
          language: 'English'
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ];
    setProjects(mockProjects);
  }, []);

  const createNewProject = () => {
    const project: ContentProject = {
      id: Date.now().toString(),
      title: 'New Content Project',
      type: selectedType,
      status: 'draft',
      content: '',
      metadata: {
        topic: '',
        targetAudience: '',
        difficulty: 'beginner',
        estimatedTime: 10,
        keywords: [],
        tags: [],
        language: 'English'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setCurrentProject(project);
    setProjects(prev => [project, ...prev]);
  };

  const generateContent = async () => {
    if (!contentPrompt.trim()) return;

    setIsGenerating(true);
    const content: GeneratedContent = {
      id: Date.now().toString(),
      type: 'text',
      content: '',
      prompt: contentPrompt,
      style: selectedStyle,
      timestamp: new Date(),
      status: 'generating'
    };

    setGeneratedContent(prev => [content, ...prev]);

    // Simulate AI content generation
    setTimeout(() => {
      const generatedText = `Based on your prompt "${contentPrompt}", here's a comprehensive ${selectedType}:

# ${contentPrompt}

## Introduction
This ${selectedType} explores the key concepts and practical applications of ${contentPrompt.toLowerCase()}. Whether you're a beginner or advanced learner, this content will provide valuable insights and actionable knowledge.

## Key Points
1. **Understanding the Basics**: Fundamental concepts that form the foundation
2. **Practical Applications**: Real-world examples and use cases
3. **Best Practices**: Industry-standard approaches and methodologies
4. **Advanced Techniques**: Cutting-edge developments and innovations

## Conclusion
${contentPrompt} represents a significant advancement in modern technology and learning. By understanding these concepts, you'll be better equipped to tackle complex challenges and drive innovation in your field.

---
*Generated with AI assistance for educational purposes*`;

      content.content = generatedText;
      content.status = 'completed';
      setGeneratedContent(prev => prev.map(c => c.id === content.id ? content : c));
      setIsGenerating(false);
    }, 3000);
  };

  const contentTemplates: ContentTemplate[] = [
    {
      id: '1',
      name: 'Technical Tutorial',
      description: 'Step-by-step guide for technical concepts',
      type: 'article',
      category: 'Education',
      preview: 'Learn complex technical concepts with clear explanations and examples',
      prompts: [
        'Create a tutorial about React hooks with practical examples',
        'Write a guide for JavaScript async programming',
        'Explain machine learning basics for beginners'
      ]
    },
    {
      id: '2',
      name: 'Interactive Quiz',
      description: 'Engaging quiz with multiple choice questions',
      type: 'quiz',
      category: 'Assessment',
      preview: 'Test knowledge with interactive questions and immediate feedback',
      prompts: [
        'Generate a quiz about web development fundamentals',
        'Create questions about JavaScript concepts',
        'Design a quiz for React development'
      ]
    },
    {
      id: '3',
      name: 'Visual Presentation',
      description: 'Slide-based presentation with visual elements',
      type: 'presentation',
      category: 'Visual',
      preview: 'Create engaging presentations with slides and visual aids',
      prompts: [
        'Design a presentation about modern web technologies',
        'Create slides for a coding workshop',
        'Build a presentation about AI in education'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'generating': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'published': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return '📝';
      case 'video': return '🎥';
      case 'presentation': return '📊';
      case 'infographic': return '📈';
      case 'quiz': return '❓';
      default: return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Content Creator</h1>
          <p className="text-gray-600">Generate engaging educational content with AI assistance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-lg mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {(['create', 'projects', 'templates', 'gallery'] as const).map((tab) => (
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
                {activeTab === 'create' && (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Content</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content Type
                          </label>
                          <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value as any)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="article">Article</option>
                            <option value="video">Video Script</option>
                            <option value="presentation">Presentation</option>
                            <option value="infographic">Infographic</option>
                            <option value="quiz">Quiz</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Writing Style
                          </label>
                          <select
                            value={selectedStyle}
                            onChange={(e) => setSelectedStyle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                            <option value="academic">Academic</option>
                            <option value="conversational">Conversational</option>
                            <option value="technical">Technical</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Content Prompt
                        </label>
                        <textarea
                          value={contentPrompt}
                          onChange={(e) => setContentPrompt(e.target.value)}
                          placeholder="Describe the content you want to create. Be specific about the topic, audience, and key points..."
                          className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>

                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={createNewProject}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Save as Draft
                        </button>
                        <button
                          onClick={generateContent}
                          disabled={isGenerating || !contentPrompt.trim()}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGenerating ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Generating...
                            </div>
                          ) : (
                            'Generate Content'
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Generated Content */}
                    {generatedContent.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Content</h3>
                        <div className="space-y-4">
                          {generatedContent.map((content) => (
                            <div key={content.id} className="bg-white border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h4 className="font-medium text-gray-900">Generated {content.type}</h4>
                                  <p className="text-sm text-gray-600">Prompt: {content.prompt}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  content.status === 'generating' ? 'text-blue-600 bg-blue-100' :
                                  content.status === 'completed' ? 'text-green-600 bg-green-100' :
                                  'text-red-600 bg-red-100'
                                }`}>
                                  {content.status}
                                </span>
                              </div>
                              
                              {content.status === 'generating' && (
                                <div className="flex items-center justify-center py-8">
                                  <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                    <p className="text-gray-600">AI is creating your content...</p>
                                  </div>
                                </div>
                              )}
                              
                              {content.status === 'completed' && (
                                <div>
                                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                                      {content.content}
                                    </pre>
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                      Copy
                                    </button>
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                      Use Content
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">Content Projects</h2>
                      <button
                        onClick={() => setActiveTab('create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        New Project
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => setCurrentProject(project)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{getTypeIcon(project.type)}</span>
                              <h3 className="font-medium text-gray-900">{project.title}</h3>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{project.metadata.topic}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Created {project.createdAt.toLocaleDateString()}</span>
                            <span>{project.metadata.estimatedTime} min</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-3">
                            {project.metadata.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
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

                {activeTab === 'templates' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Templates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {contentTemplates.map((template) => (
                        <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6">
                          <div className="text-3xl mb-3">{getTypeIcon(template.type)}</div>
                          <h3 className="font-medium text-gray-900 mb-2">{template.name}</h3>
                          <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                          
                          <div className="mb-4">
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                              {template.category}
                            </span>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <p className="text-xs text-gray-500">Quick Prompts:</p>
                            {template.prompts.slice(0, 2).map((prompt, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setActiveTab('create');
                                  setContentPrompt(prompt);
                                  setSelectedType(template.type as any);
                                }}
                                className="block w-full text-left text-xs text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50"
                              >
                                {prompt}
                              </button>
                            ))}
                          </div>
                          
                          <button
                            onClick={() => {
                              setActiveTab('create');
                              setSelectedType(template.type as any);
                            }}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Use Template
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Gallery</h2>
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <div className="text-4xl mb-4">🎨</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Visual Content Gallery</h3>
                      <p className="text-gray-600 mb-4">Browse and manage your generated images, infographics, and visual content</p>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Generate Visual Content
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setActiveTab('create');
                    setContentPrompt('Create a comprehensive tutorial about React hooks');
                    setSelectedType('article');
                  }}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">React Tutorial</div>
                  <div className="text-sm text-gray-600">Comprehensive guide</div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('create');
                    setContentPrompt('Generate a quiz about JavaScript fundamentals');
                    setSelectedType('quiz');
                  }}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">JavaScript Quiz</div>
                  <div className="text-sm text-gray-600">Interactive assessment</div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('create');
                    setContentPrompt('Create a presentation about modern web development');
                    setSelectedType('presentation');
                  }}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Web Dev Presentation</div>
                  <div className="text-sm text-gray-600">Slide deck</div>
                </button>
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Content Features</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Text Generation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Image Creation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Video Scripts</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Quiz Generation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Style Adaptation</span>
                </div>
              </div>
            </div>

            {/* Content Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Projects</span>
                  <span className="font-semibold text-gray-900">{projects.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Published</span>
                  <span className="font-semibold text-green-600">
                    {projects.filter(p => p.status === 'published').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Drafts</span>
                  <span className="font-semibold text-yellow-600">
                    {projects.filter(p => p.status === 'draft').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Generated Today</span>
                  <span className="font-semibold text-blue-600">
                    {generatedContent.filter(c => 
                      c.timestamp.toDateString() === new Date().toDateString()
                    ).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCreatorPage;
