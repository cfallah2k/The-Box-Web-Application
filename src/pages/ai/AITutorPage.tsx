import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CpuChipIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  AcademicCapIcon,
  BookOpenIcon,
  LightBulbIcon,
  ClockIcon,
  UserIcon,
  CogIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type: 'text' | 'code' | 'image';
  codeLanguage?: string;
}

interface LearningSession {
  id: string;
  topic: string;
  duration: number;
  progress: number;
  isActive: boolean;
}

const AITutorPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI tutor. I can help you with programming, explain concepts, debug code, and guide you through learning. What would you like to learn today?",
      sender: 'ai',
      timestamp: new Date().toISOString(),
      type: 'text',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeSession, setActiveSession] = useState<LearningSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const learningSessions: LearningSession[] = [
    {
      id: '1',
      topic: 'React Hooks Fundamentals',
      duration: 45,
      progress: 75,
      isActive: true,
    },
    {
      id: '2',
      topic: 'JavaScript ES6+ Features',
      duration: 30,
      progress: 60,
      isActive: false,
    },
    {
      id: '3',
      topic: 'TypeScript Basics',
      duration: 60,
      progress: 25,
      isActive: false,
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date().toISOString(),
        type: 'text',
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "That's a great question! Let me explain this concept step by step...",
      "I understand what you're asking. Here's how we can approach this...",
      "Excellent! This is a common topic. Let me break it down for you...",
      "I can help you with that! Here's what you need to know...",
      "That's an interesting point. Let me provide some insights...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => {
        setInputMessage("Can you explain React hooks in detail?");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Tutor</h1>
              <p className="text-gray-600 dark:text-gray-400">Your personalized learning assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-secondary">
              <CogIcon className="w-4 h-4" />
              Settings
            </button>
            <button className="btn-primary">
              <SparklesIcon className="w-4 h-4" />
              New Session
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Learning Sessions */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Learning Sessions</h2>
              
              <div className="space-y-4">
                {learningSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      session.isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setActiveSession(session)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">{session.topic}</h3>
                      {session.isActive && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{session.duration} min</span>
                      <span>{session.progress}%</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${session.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                <h3 className="font-semibold mb-2">Quick Actions</h3>
                <div className="space-y-2 text-sm">
                  <button className="w-full text-left hover:bg-white/10 p-2 rounded">
                    <AcademicCapIcon className="w-4 h-4 inline mr-2" />
                    Start New Topic
                  </button>
                  <button className="w-full text-left hover:bg-white/10 p-2 rounded">
                    <BookOpenIcon className="w-4 h-4 inline mr-2" />
                    Review Progress
                  </button>
                  <button className="w-full text-left hover:bg-white/10 p-2 rounded">
                    <LightBulbIcon className="w-4 h-4 inline mr-2" />
                    Get Recommendations
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <CpuChipIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">AI Tutor</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isTyping ? 'Typing...' : 'Online'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md p-4 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-2 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleVoiceInput}
                    className={`p-3 rounded-full transition-colors ${
                      isListening
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <MicrophoneIcon className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about programming, concepts, or get help with your code..."
                      rows={1}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>Press Enter to send, Shift+Enter for new line</span>
                  <span>{inputMessage.length} characters</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutorPage; 