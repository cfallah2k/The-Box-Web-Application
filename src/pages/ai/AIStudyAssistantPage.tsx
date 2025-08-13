import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  codeBlocks?: CodeBlock[];
  attachments?: Attachment[];
  isTyping?: boolean;
}

interface CodeBlock {
  language: string;
  code: string;
  explanation?: string;
}

interface Attachment {
  type: 'image' | 'file' | 'link';
  name: string;
  url: string;
}

interface StudySession {
  id: string;
  title: string;
  subject: string;
  duration: number;
  startTime: Date;
  endTime?: Date;
  notes: string[];
  questions: string[];
}

const AIStudyAssistantPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<
    'chat' | 'code' | 'study' | 'research'
  >('chat');
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(
    null
  );
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: `Hello ${
          user?.name || 'Student'
        }! I'm your AI Study Assistant. I can help you with:\n\n• **Learning & Explanations**: Complex concepts, step-by-step guidance\n• **Code Assistance**: Debugging, optimization, best practices\n• **Study Planning**: Create study sessions, track progress\n• **Research**: Find resources, summarize content\n• **Problem Solving**: Break down complex problems\n\nWhat would you like to work on today?`,
        timestamp: new Date(),
        codeBlocks: [],
      },
    ]);

    // Load mock study sessions
    const mockSessions: StudySession[] = [
      {
        id: '1',
        title: 'React Hooks Deep Dive',
        subject: 'React Development',
        duration: 45,
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 1.25 * 60 * 60 * 1000),
        notes: [
          'useState vs useReducer',
          'Custom hooks best practices',
          'Performance optimization',
        ],
        questions: [
          'When to use useCallback?',
          'How to avoid infinite re-renders?',
        ],
      },
      {
        id: '2',
        title: 'JavaScript Async Patterns',
        subject: 'JavaScript',
        duration: 30,
        startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
        notes: [
          'Promise chaining',
          'Async/await error handling',
          'Event loop understanding',
        ],
        questions: ['Difference between Promise.all and Promise.race?'],
      },
    ];
    setStudySessions(mockSessions);
  }, [user?.name]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const responses = {
      help: {
        content: `I'm here to help! Here are some things I can assist you with:\n\n**📚 Learning Support**\n• Explain complex concepts in simple terms\n• Provide step-by-step tutorials\n• Create study guides and summaries\n\n**💻 Code Assistance**\n• Debug and optimize your code\n• Suggest best practices\n• Explain programming concepts\n\n**📖 Research Help**\n• Find relevant resources\n• Summarize articles and papers\n• Generate study questions\n\n**🎯 Study Planning**\n• Create study schedules\n• Track your progress\n• Set learning goals\n\nWhat specific topic or problem would you like to work on?`,
        codeBlocks: [],
      },
      react: {
        content: `Great! Let's dive into React. Here are some key concepts to understand:\n\n**1. Components & JSX**\nReact components are reusable UI pieces that can contain both logic and presentation.\n\n**2. State Management**\nState allows components to manage and update their data over time.\n\n**3. Props**\nProps are how components communicate with each other.\n\nWould you like me to explain any of these concepts in detail, or do you have a specific React question?`,
        codeBlocks: [
          {
            language: 'jsx',
            code: `// Example React Component
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
            explanation:
              'This is a simple React component using the useState hook to manage a counter.',
          },
        ],
      },
      javascript: {
        content: `JavaScript is a powerful programming language! Here are some advanced concepts:\n\n**1. Closures**\nFunctions that have access to variables in their outer scope.\n\n**2. Promises & Async/Await**\nModern ways to handle asynchronous operations.\n\n**3. Event Loop**\nHow JavaScript handles non-blocking operations.\n\nWhat specific JavaScript topic would you like to explore?`,
        codeBlocks: [
          {
            language: 'javascript',
            code: `// Example: Async/Await with Error Handling
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}`,
            explanation:
              'This example shows proper async/await usage with error handling.',
          },
        ],
      },
    };

    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: responses.help.content,
        timestamp: new Date(),
        codeBlocks: responses.help.codeBlocks,
      };
    } else if (lowerInput.includes('react')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: responses.react.content,
        timestamp: new Date(),
        codeBlocks: responses.react.codeBlocks,
      };
    } else if (lowerInput.includes('javascript') || lowerInput.includes('js')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: responses.javascript.content,
        timestamp: new Date(),
        codeBlocks: responses.javascript.codeBlocks,
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `I understand you're asking about "${userInput}". Let me help you with that!\n\nCould you provide more specific details about what you'd like to learn or what problem you're trying to solve? This will help me give you the most relevant and helpful response.`,
      timestamp: new Date(),
      codeBlocks: [],
    };
  };

  const startStudySession = () => {
    const session: StudySession = {
      id: Date.now().toString(),
      title: 'New Study Session',
      subject: 'General',
      duration: 0,
      startTime: new Date(),
      notes: [],
      questions: [],
    };
    setCurrentSession(session);
    setStudySessions(prev => [...prev, session]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Study Assistant
          </h1>
          <p className="text-gray-600">
            Your intelligent learning companion with advanced AI capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
              {/* Mode Selector */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex space-x-2">
                  {(['chat', 'code', 'study', 'research'] as const).map(
                    mode => (
                      <button
                        key={mode}
                        onClick={() => setActiveMode(mode)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          activeMode === mode
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-3xl rounded-lg p-4 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>

                      {message.codeBlocks &&
                        message.codeBlocks.map((block, index) => (
                          <div key={index} className="mt-4">
                            <div className="bg-gray-800 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-300">
                                  {block.language}
                                </span>
                                <button className="text-gray-400 hover:text-white text-sm">
                                  Copy
                                </button>
                              </div>
                              <pre className="text-green-400 text-sm overflow-x-auto">
                                <code>{block.code}</code>
                              </pre>
                            </div>
                            {block.explanation && (
                              <p className="text-sm text-gray-600 mt-2">
                                {block.explanation}
                              </p>
                            )}
                          </div>
                        ))}

                      <div className="text-xs opacity-70 mt-2">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-gray-600">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <textarea
                      value={inputMessage}
                      onChange={e => setInputMessage(e.target.value)}
                      onKeyPress={e =>
                        e.key === 'Enter' && !e.shiftKey && sendMessage()
                      }
                      placeholder="Ask me anything about your studies, code, or research..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={2}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={sendMessage}
                      disabled={isLoading || !inputMessage.trim()}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => setShowCodeEditor(!showCodeEditor)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Code
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            {showCodeEditor && (
              <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Code Editor
                  </h3>
                  <select
                    value={selectedLanguage}
                    onChange={e => setSelectedLanguage(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                  </select>
                </div>
                <textarea
                  placeholder={`Write your ${selectedLanguage} code here...`}
                  className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Run
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Ask AI
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() =>
                    setInputMessage('Help me understand React hooks')
                  }
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">
                    Learn React Hooks
                  </div>
                  <div className="text-sm text-gray-600">
                    Step-by-step guide
                  </div>
                </button>
                <button
                  onClick={() => setInputMessage('Debug this JavaScript code')}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">
                    Code Debugging
                  </div>
                  <div className="text-sm text-gray-600">Find and fix bugs</div>
                </button>
                <button
                  onClick={() =>
                    setInputMessage('Create a study plan for JavaScript')
                  }
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">
                    Study Planning
                  </div>
                  <div className="text-sm text-gray-600">
                    Create learning roadmap
                  </div>
                </button>
                <button
                  onClick={() =>
                    setInputMessage(
                      'Research best practices for web development'
                    )
                  }
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Research</div>
                  <div className="text-sm text-gray-600">
                    Find resources & best practices
                  </div>
                </button>
              </div>
            </div>

            {/* Study Sessions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Study Sessions
                </h3>
                <button
                  onClick={startStudySession}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  New
                </button>
              </div>
              <div className="space-y-3">
                {studySessions.map(session => (
                  <div
                    key={session.id}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setCurrentSession(session)}
                  >
                    <div className="font-medium text-gray-900">
                      {session.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {session.subject}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatTime(session.startTime)} • {session.duration}min
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                AI Capabilities
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">
                    Natural Language Processing
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">
                    Code Analysis & Debugging
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">
                    Study Planning & Scheduling
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">
                    Research & Resource Finding
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">
                    Problem Solving & Explanations
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

export default AIStudyAssistantPage;
