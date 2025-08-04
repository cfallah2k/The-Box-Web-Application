import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  MicrophoneIcon,
  SpeakerWaveIcon,
  CogIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CommandLineIcon,
  SparklesIcon,
  AcademicCapIcon,
  BookOpenIcon,
  UserIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence } from 'framer-motion';

interface VoiceCommand {
  id: string;
  command: string;
  action: string;
  category: 'navigation' | 'learning' | 'control' | 'search';
  isActive: boolean;
  description: string;
}

interface VoiceSession {
  id: string;
  timestamp: Date;
  command: string;
  response: string;
  success: boolean;
  duration: number;
}

const VoiceCommands: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [activeTab, setActiveTab] = useState<'commands' | 'history' | 'settings'>('commands');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info');

  const voiceCommands: VoiceCommand[] = [
    {
      id: '1',
      command: 'Start course',
      action: 'Opens the course selection page',
      category: 'learning',
      isActive: true,
      description: 'Begin a new learning session',
    },
    {
      id: '2',
      command: 'Search for',
      action: 'Initiates content search',
      category: 'search',
      isActive: true,
      description: 'Search for specific topics or courses',
    },
    {
      id: '3',
      command: 'Go to dashboard',
      action: 'Navigates to the main dashboard',
      category: 'navigation',
      isActive: true,
      description: 'Return to the main dashboard',
    },
    {
      id: '4',
      command: 'Pause learning',
      action: 'Pauses current learning session',
      category: 'control',
      isActive: true,
      description: 'Temporarily pause your learning',
    },
    {
      id: '5',
      command: 'Show progress',
      action: 'Displays learning progress',
      category: 'learning',
      isActive: true,
      description: 'View your learning progress',
    },
    {
      id: '6',
      command: 'Find tutor',
      action: 'Opens tutor search',
      category: 'learning',
      isActive: true,
      description: 'Search for available tutors',
    },
  ];

  const voiceHistory: VoiceSession[] = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      command: 'Start course',
      response: 'Opening course selection...',
      success: true,
      duration: 1.2,
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      command: 'Search for React',
      response: 'Found 12 React-related courses',
      success: true,
      duration: 2.1,
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      command: 'Show progress',
      response: 'Displaying your learning progress...',
      success: true,
      duration: 0.8,
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'navigation':
        return <CommandLineIcon className="w-5 h-5" />;
      case 'learning':
        return <AcademicCapIcon className="w-5 h-5" />;
      case 'control':
        return <CogIcon className="w-5 h-5" />;
      case 'search':
        return <SparklesIcon className="w-5 h-5" />;
      default:
        return <MicrophoneIcon className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'navigation':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'learning':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'control':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'search':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setShowFeedback(true);
    setFeedbackMessage('Listening... Speak now');
    setFeedbackType('info');

    // Simulate speech recognition
    setTimeout(() => {
      const commands = ['Start course', 'Search for React', 'Show progress', 'Go to dashboard'];
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setTranscript(randomCommand);
      setIsListening(false);
      
      setFeedbackMessage(`Command recognized: "${randomCommand}"`);
      setFeedbackType('success');
      
      setTimeout(() => {
        setShowFeedback(false);
      }, 3000);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
    setShowFeedback(false);
  };

  const speakResponse = (text: string) => {
    setIsSpeaking(true);
    setFeedbackMessage(`Speaking: "${text}"`);
    setFeedbackType('info');
    setShowFeedback(true);

    setTimeout(() => {
      setIsSpeaking(false);
      setShowFeedback(false);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <MicrophoneIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Voice Commands</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered voice interactions</p>
          </div>
        </div>
        <button className="btn-secondary">
          <CogIcon className="w-4 h-4" />
          Settings
        </button>
      </div>

      {/* Voice Control */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-6">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-4 rounded-full transition-all duration-300 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <MicrophoneIcon className="w-8 h-8" />
          </button>
          
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {isListening ? 'Listening...' : 'Voice Commands'}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isListening ? 'Speak your command' : 'Click to start listening'}
            </p>
          </div>

          <button
            onClick={() => speakResponse('Voice commands are ready')}
            disabled={isSpeaking}
            className={`p-4 rounded-full transition-all duration-300 ${
              isSpeaking
                ? 'bg-green-500 text-white'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            <SpeakerWaveIcon className="w-8 h-8" />
          </button>
        </div>

        {transcript && (
          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-400">Transcript:</p>
            <p className="font-medium text-gray-900 dark:text-white">"{transcript}"</p>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'commands', label: 'Commands', icon: CommandLineIcon },
          { id: 'history', label: 'History', icon: ClockIcon },
          { id: 'settings', label: 'Settings', icon: CogIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'commands' && (
          <div className="space-y-4">
            {voiceCommands.map((command, index) => (
              <motion.div
                key={command.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg ${getCategoryColor(command.category)}`}>
                        {getCategoryIcon(command.category)}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{command.command}</h4>
                      {command.isActive && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{command.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{command.action}</p>
                  </div>
                  <button
                    onClick={() => speakResponse(command.command)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <PlayIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {voiceHistory.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{session.command}</h4>
                      {session.success ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      ) : (
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{session.response}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>{session.timestamp.toLocaleTimeString()}</span>
                      <span>{session.duration}s</span>
                    </div>
                  </div>
                  <button
                    onClick={() => speakResponse(session.command)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <PlayIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Voice Settings</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Voice Recognition Language
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Voice Response Speed
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>Slow</option>
                    <option>Normal</option>
                    <option>Fast</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="voice-feedback" className="rounded" defaultChecked />
                  <label htmlFor="voice-feedback" className="text-sm text-gray-700 dark:text-gray-300">
                    Enable voice feedback
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="auto-listen" className="rounded" />
                  <label htmlFor="auto-listen" className="text-sm text-gray-700 dark:text-gray-300">
                    Auto-start listening
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Toast */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm ${
              feedbackType === 'success'
                ? 'bg-green-500 text-white'
                : feedbackType === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              {feedbackType === 'success' ? (
                <CheckCircleIcon className="w-5 h-5" />
              ) : feedbackType === 'error' ? (
                <ExclamationTriangleIcon className="w-5 h-5" />
              ) : (
                <InformationCircleIcon className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{feedbackMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceCommands; 