import {
  ArrowDownTrayIcon,
  CpuChipIcon,
  SparklesIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const initialMessages = [
  {
    id: 1,
    sender: 'user',
    text: 'Can you help me understand machine learning?',
    timestamp: Date.now() - 60000,
  },
  {
    id: 2,
    sender: 'ai',
    text: 'Absolutely! Machine learning is a subset of AI that enables computers to learn from data. Let me explain the key concepts...',
    timestamp: Date.now() - 59000,
  },
];

const aiResponses = [
  "Sure! Let's break it down step by step.",
  'Think of machine learning as teaching computers to recognize patterns.',
  'Would you like a real-world example or a technical explanation?',
  'Great question! There are three main types: supervised, unsupervised, and reinforcement learning.',
  "Here's a simple analogy: Imagine teaching a child to identify animals by showing pictures and giving feedback.",
  'You can also try a hands-on tutorial in our AI Lab!',
  'Want to see some code? I can show you a basic ML algorithm in Python.',
  'Let me know if you want to dive deeper into neural networks or data preprocessing!',
];

const LiveAITutorDemo: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [aiTypingText, setAITypingText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAITyping]);

  // Simulate AI typing
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    if (isAITyping && aiTypingText) {
      typingTimeout = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            sender: 'ai',
            text: aiTypingText,
            timestamp: Date.now(),
          },
        ]);
        setIsAITyping(false);
        setAITypingText('');
      }, 1200 + Math.random() * 800);
    }
    return () => clearTimeout(typingTimeout);
  }, [isAITyping, aiTypingText]);

  const handleSend = () => {
    if (!input.trim() || isAITyping) return;
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setIsAITyping(true);
      setAITypingText(
        aiResponses[Math.floor(Math.random() * aiResponses.length)]
      );
    }, 800);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <CpuChipIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              AI Tutor
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Online now
            </p>
          </div>
        </div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      <div
        className="h-72 overflow-y-auto space-y-3 mb-4 px-1"
        style={{ scrollbarWidth: 'thin' }}
      >
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              msg.sender === 'user' ? 'justify-start' : 'justify-end'
            }`}
          >
            {msg.sender === 'user' ? (
              <div className="flex items-end space-x-2">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {msg.text}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-end space-x-2 justify-end">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-white">{msg.text}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <CpuChipIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
        {/* AI Typing Indicator */}
        <AnimatePresence>
          {isAITyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex justify-end"
            >
              <div className="flex items-end space-x-2 justify-end">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-3 max-w-xs flex items-center">
                  <div className="flex space-x-1">
                    <span
                      className="block w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: '0s' }}
                    ></span>
                    <span
                      className="block w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></span>
                    <span
                      className="block w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    ></span>
                  </div>
                  <span className="ml-2 text-white text-xs">
                    AI is typing...
                  </span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <CpuChipIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>
      <div className="mt-2 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Ask your AI tutor..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          disabled={isAITyping}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isAITyping}
          className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-2 flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
        <SparklesIcon className="w-4 h-4" />
        <span>AI Tutor is for demo purposes only</span>
      </div>
    </div>
  );
};

export default LiveAITutorDemo;
