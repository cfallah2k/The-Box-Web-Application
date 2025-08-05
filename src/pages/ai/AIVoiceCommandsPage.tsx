import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MicrophoneIcon,
  SpeakerWaveIcon,
  CpuChipIcon,
  CommandLineIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  CogIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface VoiceCommand {
  id: string;
  command: string;
  action: string;
  isActive: boolean;
  category: 'navigation' | 'learning' | 'control' | 'custom';
}

interface VoiceSession {
  id: string;
  title: string;
  duration: number;
  commandsUsed: number;
  accuracy: number;
  timestamp: string;
}

const AIVoiceCommandsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [transcript, setTranscript] = useState('');
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  const voiceCommands: VoiceCommand[] = [
    {
      id: '1',
      command: 'Start learning session',
      action: 'Initiates a new study session',
      isActive: true,
      category: 'learning',
    },
    {
      id: '2',
      command: 'Navigate to courses',
      action: 'Opens the courses page',
      isActive: true,
      category: 'navigation',
    },
    {
      id: '3',
      command: 'Explain React hooks',
      action: 'Provides detailed explanation of React hooks',
      isActive: true,
      category: 'learning',
    },
    {
      id: '4',
      command: 'Pause session',
      action: 'Pauses current learning session',
      isActive: true,
      category: 'control',
    },
    {
      id: '5',
      command: 'Show progress',
      action: 'Displays learning progress',
      isActive: true,
      category: 'learning',
    },
    {
      id: '6',
      command: 'Go to dashboard',
      action: 'Navigates to main dashboard',
      isActive: true,
      category: 'navigation',
    },
  ];

  const recentSessions: VoiceSession[] = [
    {
      id: '1',
      title: 'React Learning Session',
      duration: 45,
      commandsUsed: 12,
      accuracy: 95,
      timestamp: '2024-01-20T14:30:00Z',
    },
    {
      id: '2',
      title: 'JavaScript Review',
      duration: 30,
      commandsUsed: 8,
      accuracy: 88,
      timestamp: '2024-01-19T10:15:00Z',
    },
  ];

  const handleStartListening = () => {
    setIsListening(true);
    setSessionActive(true);
    setSessionStartTime(new Date());
    // Simulate voice recognition
    setTimeout(() => {
      setCurrentCommand('Start learning session');
      setTranscript('I heard: "Start learning session"');
    }, 2000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setSessionActive(false);
    setCurrentCommand('');
    setTranscript('');
  };

  const handleExecuteCommand = (command: string) => {
    setCurrentCommand(command);
    setIsSpeaking(true);
    // Simulate command execution
    setTimeout(() => {
      setIsSpeaking(false);
      setCurrentCommand('');
    }, 2000);
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      handleStartListening();
    } else {
      handleStopListening();
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Voice Commands
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Control your learning with voice
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <CogIcon className="w-4 h-4" />
              Settings
            </button>
            <button className="btn-primary">
              <CommandLineIcon className="w-4 h-4" />
              Custom Commands
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Voice Control Center */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Voice Control Center
              </h2>

              {/* Voice Input Area */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <button
                    onClick={handleVoiceInput}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                      isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <MicrophoneIcon className="w-8 h-8" />
                  </button>
                  {isListening && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
                  )}
                </div>

                <div className="mt-4">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {isListening ? 'Listening...' : 'Click to start listening'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Speak clearly and naturally
                  </p>
                </div>
              </div>

              {/* Current Command Display */}
              {currentCommand && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <CpuChipIcon className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Executing: {currentCommand}
                      </p>
                      {isSpeaking && (
                        <div className="flex items-center space-x-2 mt-1">
                          <SpeakerWaveIcon className="w-4 h-4 text-blue-500 animate-pulse" />
                          <span className="text-sm text-blue-600 dark:text-blue-400">
                            Speaking...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Transcript */}
              {transcript && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Transcript
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {transcript}
                  </p>
                </div>
              )}

              {/* Session Timer */}
              {sessionActive && sessionStartTime && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ClockIcon className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Session Active
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Started at {sessionStartTime.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Available Commands */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Available Commands
              </h3>

              <div className="space-y-3">
                {voiceCommands.map(command => (
                  <div
                    key={command.id}
                    className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        "{command.command}"
                      </h4>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          command.category === 'learning'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                            : command.category === 'navigation'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                            : command.category === 'control'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                            : 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
                        }`}
                      >
                        {command.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {command.action}
                    </p>
                    <button
                      onClick={() => handleExecuteCommand(command.command)}
                      className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Test command
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Sessions
              </h3>

              <div className="space-y-3">
                {recentSessions.map(session => (
                  <div
                    key={session.id}
                    className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {session.title}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {new Date(session.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>{session.duration} min</span>
                      <span>{session.commandsUsed} commands</span>
                      <span>{session.accuracy}% accuracy</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Voice Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Voice Recognition
                  </span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Text-to-Speech
                  </span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Auto-Execute
                  </span>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white text-center">
            <AcademicCapIcon className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Start Learning</p>
            <p className="text-xs opacity-80">Begin a new session</p>
          </button>

          <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white text-center">
            <BookOpenIcon className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Browse Courses</p>
            <p className="text-xs opacity-80">Explore available courses</p>
          </button>

          <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white text-center">
            <ClockIcon className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">View Progress</p>
            <p className="text-xs opacity-80">Check your learning stats</p>
          </button>

          <button className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white text-center">
            <CogIcon className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Settings</p>
            <p className="text-xs opacity-80">Configure voice options</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIVoiceCommandsPage;
